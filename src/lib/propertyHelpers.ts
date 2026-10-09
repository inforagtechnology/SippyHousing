import type { Property } from '@/lib/supabase';

/**
 * Returns true when a configuration value is meaningful.
 * Filters out empty strings, "0", "0 BHK", "0BHK", null, undefined, NaN.
 */
export const isValidConfiguration = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  const s = String(value).trim();
  if (!s) return false;
  if (/^0+(\.0+)?\s*(bhk)?$/i.test(s)) return false;
  return true;
};

/**
 * Format a single configuration for display.
 *  "2"      -> "2 BHK"
 *  "2BHK"   -> "2 BHK"
 *  "Jodi"   -> "Jodi"
 *  "Studio" -> "Studio"
 *  "0" / "0 BHK" / "" -> ""
 */
export const formatConfiguration = (value: unknown): string => {
  if (!isValidConfiguration(value)) return '';
  const s = String(value).trim();
  const numeric = s.match(/^(\d+(?:\.\d+)?)\s*(?:bhk)?$/i);
  if (numeric) return `${numeric[1]} BHK`;
  return s;
};

/** Format a list of configurations: ["1BHK","Jodi"] -> "1 BHK, Jodi". Empty string when nothing valid. */
export const formatConfigurationList = (values: unknown): string => {
  const arr = Array.isArray(values)
    ? values
    : typeof values === 'string'
      ? values.split(',')
      : [];
  return arr.map(formatConfiguration).filter(Boolean).join(', ');
};

/** Best configuration label for a property ("" if none / 0 BHK). */
export const getPropertyConfigurationLabel = (p: Partial<Property>): string => {
  const fromOptions = formatConfigurationList(p.bhk_options);
  if (fromOptions) return fromOptions;
  const fromLegacy = formatConfigurationList(p.bhk);
  if (fromLegacy) return fromLegacy;
  return formatConfiguration(p.configuration_international);
};

/** Is the Rental listing type? (handles "Rental", "Rent", "Lease"). */
export const isRentalListing = (p: Partial<Property>): boolean => {
  const t = (p.property_type || p.transaction_option || '').toString().toLowerCase();
  return t === 'rental' || t === 'rent' || t === 'lease';
};

/** Outright = sale / resale. */
export const isOutrightListing = (p: Partial<Property>): boolean => {
  const t = (p.property_type || p.transaction_option || '').toString().toLowerCase();
  return t === 'resale' || t === 'outright' || t === 'sale';
};
