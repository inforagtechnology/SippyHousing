import type { Property } from '@/lib/supabase';

/**
 * "Wild" property search.
 *
 * Works across EVERY field of a property (name, location, builder, remarks,
 * configuration, price text, JV terms, hotel operator, ...), not just a fixed
 * column list. Supports:
 *   - several words in any order  ........ "worli sea view 3bhk"   (all must match)
 *   - wildcards  ......................... "bha*"  "w?rli"          (* = any text, ? = one char)
 *   - exact phrases  ..................... "sea view"
 *   - exclusions  ........................ "bandra -rental"
 *   - BHK shorthand  ..................... "2 bhk" == "2bhk" == "2-bhk"
 *   - typo tolerance  .................... "worlli" still finds "Worli"
 *   - category words  .................... "plots", "hotel", "jv", "rental", "outright"
 * If nothing matches ALL words, properties matching SOME words are returned (best first).
 */

const SKIP_KEYS = new Set(['id', 'created_at', 'updated_at', 'unit_variants', 'lead_numbers', 'contact_number']);

/** Generic words that appear on every listing – they must not widen the match. */
const STOPWORDS = new Set([
  'property','properties','propertie','flat','flats','home','homes','house','houses','in','at','for','the','a','an','of','and','near','sale','buy','available','bhk',
]);

/**
 * Words that mean "show me this SECTION". e.g. "new property" / "new project" -> New Projects only,
 * "luxury" -> Luxury only. Matching properties are ranked first and, when any exist,
 * everything outside the section is dropped.
 */
const INTENT_WORDS: Record<string, string> = {
  new: 'new-project', launch: 'new-project', launches: 'new-project', newlaunch: 'new-project',
  luxury: 'luxury', luxurious: 'luxury',
  plot: 'plots-lands', plots: 'plots-lands', land: 'plots-lands', lands: 'plots-lands',
  hotel: 'hotels', hotels: 'hotels',
  commercial: 'commercial', office: 'commercial', shop: 'commercial',
  international: 'international', overseas: 'international', dubai: 'international',
  redevelopment: 'redevelopment-jv', jv: 'redevelopment-jv',
  independent: 'independent-buildings', bungalow: 'independent-buildings',
};

const CATEGORY_WORDS: Record<string, string> = {
  luxury: 'luxury',
  'new-project': 'new project residential',
  'resale-rental': 'resale rental outright residential',
  'plots-lands': 'plots lands plot land development',
  'redevelopment-jv': 'redevelopment joint venture jv development',
  hotels: 'hotel hotels commercial',
  'independent-buildings': 'independent building buildings',
  international: 'international overseas',
  commercial: 'commercial office shop',
};

const normalise = (s: string) =>
  s
    .toLowerCase()
    // "2 bhk", "2-bhk", "2.5 BHK" -> "2bhk", "2.5bhk"
    .replace(/(\d+(?:\.\d+)?)[\s-]+bhk/g, '$1bhk')
    // thousands separators in numbers: 1,50,000 -> 150000
    .replace(/(\d),(?=\d)/g, '$1');

const flatten = (value: unknown, out: string[]) => {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) { value.forEach(v => flatten(v, out)); return; }
  if (typeof value === 'object') { Object.values(value as Record<string, unknown>).forEach(v => flatten(v, out)); return; }
  if (typeof value === 'boolean') return;
  out.push(String(value));
};

export const buildHaystack = (p: Property): { text: string; primary: string; words: string[] } => {
  const parts: string[] = [];
  Object.entries(p as unknown as Record<string, unknown>).forEach(([k, v]) => {
    if (SKIP_KEYS.has(k)) return;
    if (k === 'primary_category' || k === 'category_assignments') return;
    flatten(v, parts);
  });
  const cats = [p.primary_category, ...(p.category_assignments || [])].filter(Boolean) as string[];
  cats.forEach(c => parts.push(CATEGORY_WORDS[c] || c.replace(/-/g, ' ')));
  if (p.is_jv) parts.push('jv joint venture');
  if (p.is_sale) parts.push('sale outright');
  if (p.property_type === 'Resale') parts.push('outright');

  const text = normalise(parts.join(' | '));
  const primary = normalise([p.header, p.building, p.real_property_name, p.society_property_name, p.location, p.sub_location, p.city, p.country]
    .filter(Boolean).join(' '));
  const words = Array.from(new Set(text.split(/[^a-z0-9.]+/).filter(Boolean)));
  return { text, primary, words };
};

interface Term {
  raw: string;
  negative: boolean;
  regex: RegExp | null;   // for wildcard / phrase / plain substring
  plain: string;          // normalised literal (no wildcards)
  hasWildcard: boolean;
}

const escapeRe = (s: string) => s.replace(/[.+^${}()|[\]\\]/g, '\\$&');

export const parseQuery = (query: string): Term[] => {
  const terms: Term[] = [];
  // merge "2 bhk" -> "2bhk" before splitting into words
  const q = normalise((query || '').trim());
  if (!q) return terms;

  const re = /(-?)"([^"]+)"|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(q)) !== null) {
    let negative = false;
    let token = '';
    if (m[2] !== undefined) { negative = m[1] === '-'; token = m[2]; }
    else {
      token = m[3];
      if (token.startsWith('-') && token.length > 1) { negative = true; token = token.slice(1); }
    }
    token = normalise(token.replace(/[(),;]/g, ' ')).trim();
    if (!token) continue;
    const hasWildcard = /[*?%_]/.test(token);
    let regex: RegExp | null = null;
    if (hasWildcard) {
      const pattern = token
        .split('')
        .map(ch => (ch === '*' || ch === '%') ? '.*' : (ch === '?' || ch === '_') ? '.' : escapeRe(ch))
        .join('');
      try { regex = new RegExp(pattern, 'i'); } catch { regex = null; }
    }
    terms.push({ raw: token, negative, regex, plain: token, hasWildcard });
  }
  return terms;
};

const editDistanceAtMost1 = (a: string, b: string): boolean => {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (la > lb) i++;
    else if (lb > la) j++;
    else { i++; j++; }
  }
  return edits + (la - i) + (lb - j) <= 1;
};

const BHK_TOKEN = /^(\d+(?:\.\d+)?)bhk$/;

const termMatches = (term: Term, hay: { text: string; words: string[] }): { hit: boolean; fuzzy: boolean } => {
  if (term.regex) return { hit: term.regex.test(hay.text), fuzzy: false };
  // "2bhk" must match the whole configuration word – never "12bhk" or part of "2.5bhk"
  if (BHK_TOKEN.test(term.plain)) return { hit: hay.words.includes(term.plain), fuzzy: false };
  if (hay.text.includes(term.plain)) return { hit: true, fuzzy: false };
  // typo tolerance for reasonably long words
  if (term.plain.length >= 4 && !/\d/.test(term.plain)) {
    if (hay.words.some(w => w.length >= 3 && editDistanceAtMost1(term.plain, w))) return { hit: true, fuzzy: true };
  }
  return { hit: false, fuzzy: false };
};

/** Configuration words of a property ("1bhk", "2bhk", "jodi") in order – first = main configuration. */
const configWords = (p: Property): string[] => {
  const raw: unknown[] = [
    ...(Array.isArray(p.bhk_options) ? p.bhk_options : []),
    p.bhk,
    p.configuration_international,
  ];
  return raw
    .filter(Boolean)
    .map(v => normalise(String(v)).replace(/\s+/g, ''))
    .filter(Boolean);
};

const inCategory = (p: Property, cat: string) =>
  p.primary_category === cat || (p.category_assignments || []).includes(cat);

/** Filter + rank a list of properties for a wild-search query. */
export const wildSearchProperties = (properties: Property[], query: string): Property[] => {
  const allTerms = parseQuery(query);
  if (allTerms.length === 0) return [];

  // Section intent ("new property", "luxury", "plots" ...) and generic words are handled separately
  const intents = new Set<string>();
  const terms = allTerms.filter(t => {
    if (t.negative || t.hasWildcard) return true;
    if (INTENT_WORDS[t.plain]) { intents.add(INTENT_WORDS[t.plain]); return false; }
    if (STOPWORDS.has(t.plain)) return false;
    return true;
  });
  const positives = terms.filter(t => !t.negative);
  const negatives = terms.filter(t => t.negative);
  const bhkTerms = positives.filter(t => BHK_TOKEN.test(t.plain)).map(t => t.plain);

  // Only generic words (e.g. "property"): list everything, newest first
  if (positives.length === 0 && intents.size === 0) return negatives.length ? properties.filter(p => !negatives.some(n => termMatches(n, buildHaystack(p)).hit)) : [...properties];

  const scored = properties.map(p => {
    const hay = buildHaystack(p);
    if (negatives.some(n => termMatches(n, hay).hit)) return { p, score: -1, all: false, matched: 0, intent: false };

    let matched = 0;
    let score = 0;
    positives.forEach(t => {
      const r = termMatches(t, hay);
      if (r.hit) {
        matched++;
        score += r.fuzzy ? 1 : 2;
        // boost for hits in title / location fields
        if (t.regex ? t.regex.test(hay.primary) : hay.primary.includes(t.plain)) score += 3;
      }
    });

    // Configuration ranking: the closer the property is to ONLY the searched BHK, the higher it ranks
    if (bhkTerms.length) {
      const cfg = configWords(p);
      bhkTerms.forEach(b => {
        if (cfg.includes(b)) {
          score += 6;
          if (cfg[0] === b) score += 4;          // searched BHK is the main configuration
          if (cfg.length === 1) score += 2;      // property offers only this configuration
        }
      });
    }

    const intent = intents.size > 0 && [...intents].some(c => inCategory(p, c));
    if (intent) score += 10;
    // Properties whose MAIN section is the searched one come first
    if (intents.size > 0 && p.primary_category && intents.has(p.primary_category)) score += 5;

    return { p, score, all: positives.length === 0 || matched === positives.length, matched, intent };
  });

  let eligible = scored.filter(s => s.score >= 0);
  // If anything exists in the requested section, show only that section
  if (intents.size > 0 && eligible.some(s => s.intent)) eligible = eligible.filter(s => s.intent);

  const allMatch = eligible.filter(s => s.all).sort((a, b) => b.score - a.score);
  if (allMatch.length > 0) return allMatch.map(s => s.p);

  // Nothing matched every word – fall back to properties matching at least half of the words
  const need = Math.max(1, Math.ceil(positives.length / 2));
  return eligible
    .filter(s => s.matched >= need)
    .sort((a, b) => b.score - a.score)
    .map(s => s.p);
};
