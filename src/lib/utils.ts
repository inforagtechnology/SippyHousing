import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============ Price formatting (Indian style: figures with commas + words) ============

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function toWordsUnder1000(n: number): string {
  if (n === 0) return ''
  if (n < 20) return ONES[n]
  if (n < 100) return (TENS[Math.floor(n / 10)] + ' ' + ONES[n % 10]).trim()
  const h = Math.floor(n / 100)
  const rest = n % 100
  return (ONES[h] + ' Hundred' + (rest ? ' ' + toWordsUnder1000(rest) : '')).trim()
}

/** Convert a number to Indian Rupees in words (e.g. 15000000 -> "One Crore Fifty Lakh Only") */
export function numberToWordsIndian(num: number): string {
  if (num === 0) return 'Zero'
  if (num < 0 || !Number.isFinite(num)) return ''
  const crores = Math.floor(num / 1_00_00_000)
  const lakhs = Math.floor((num % 1_00_00_000) / 1_00_000)
  const thousands = Math.floor((num % 1_00_000) / 1000)
  const rest = num % 1000
  const parts: string[] = []
  if (crores > 0) parts.push(toWordsUnder1000(crores) + ' Crore')
  if (lakhs > 0) parts.push(toWordsUnder1000(lakhs) + ' Lakh')
  if (thousands > 0) parts.push(toWordsUnder1000(thousands) + ' Thousand')
  if (rest > 0) parts.push(toWordsUnder1000(rest))
  if (parts.length === 0) return 'Zero'
  return parts.join(' ') + ' Only'
}

/** Format number with Indian comma style (e.g. 15000000 -> "1,50,00,000") */
export function formatNumberIndian(num: number): string {
  if (!Number.isFinite(num) || num < 0) return String(num)
  const s = Math.floor(num).toString()
  if (s.length <= 3) return s
  const lastThree = s.slice(-3)
  const rest = s.slice(0, -3)
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return grouped + ',' + lastThree
}

/** Parse price string to number (handles "15 Cr", "50 L", "1.5 Cr", "₹15 Cr", plain numbers) */
export function parsePriceToNumber(priceStr: string | undefined): number | null {
  if (!priceStr || typeof priceStr !== 'string') return null
  const trimmed = priceStr.trim()
  if (!trimmed) return null
  const lower = trimmed.toLowerCase()
  if (lower.includes('request') || lower.includes('contact') || lower.includes('n/a')) return null
  const numPart = trimmed.replace(/[^\d.]/g, '')
  const num = parseFloat(numPart)
  if (Number.isNaN(num)) return null
  if (/\bcr(ore)?s?\b/i.test(trimmed)) return num * 1_00_00_000
  if (/\bl(akh)?s?\b|lac\b/i.test(trimmed)) return num * 1_00_000
  if (/\bk\b|thousand/i.test(trimmed)) return num * 1000
  return num
}

/** Get display object: { figures: "1,50,00,000", inWords: "One Crore Fifty Lakh Only" } or null if not parseable */
export function getPriceDisplay(priceStr: string | undefined): { figures: string; inWords: string } | null {
  const num = parsePriceToNumber(priceStr)
  if (num === null) return null
  return {
    figures: formatNumberIndian(num),
    inWords: numberToWordsIndian(num)
  }
}

/** Format price for display: figures with commas; if parseable also append " (In words: ...)" */
export function formatPriceWithCommas(priceStr: string | undefined): string {
  if (!priceStr || typeof priceStr !== 'string') return priceStr || ''
  const display = getPriceDisplay(priceStr)
  if (display) return display.figures
  return priceStr
}

/** Get price in words only, or empty string */
export function getPriceInWords(priceStr: string | undefined): string {
  const display = getPriceDisplay(priceStr)
  return display ? display.inWords : ''
}

/** Get the primary price string from a property (any of price, price_range, sale_price, price_international) */
export function getPropertyPriceStr(property: { price?: string; price_range?: string; sale_price?: string; price_international?: string; rent?: string; operating_price?: string; pre_leased_sale_price?: string; pre_leased_rent_price?: string } | undefined): string {
  if (!property) return ''
  return property.price || property.price_range || property.sale_price || property.price_international || property.rent || property.pre_leased_sale_price || property.operating_price || property.pre_leased_rent_price || ''
}

/** New Project: get "From ₹X" using minimum of unit_variants prices or single price_* fields. Returns display string or empty. */
export function getNewProjectFromPrice(property: {
  primary_category?: string;
  unit_variants?: { price?: string }[];
  price_1bhk?: string;
  price_2bhk?: string;
  price_3bhk?: string;
  price_4bhk?: string;
  price_5bhk?: string;
  price_penthouse?: string;
  price?: string;
  price_range?: string;
} | undefined): string {
  if (!property || property.primary_category !== 'new-project') return ''
  const prices: string[] = []
  if (property.unit_variants?.length) {
    property.unit_variants.forEach((v) => { if (v.price?.trim()) prices.push(v.price.trim()) })
  }
  if (!prices.length) {
    const single = [property.price_1bhk, property.price_2bhk, property.price_3bhk, property.price_4bhk, property.price_5bhk, property.price_penthouse]
    single.forEach((p) => { if (p?.trim()) prices.push(p.trim()) })
  }
  if (!prices.length) return property.price || property.price_range || ''
  const nums = prices.map(parsePriceToNumber).filter((n): n is number => n != null)
  if (nums.length === 0) return prices[0] ?? ''
  const min = Math.min(...nums)
  const formatted = formatNumberIndian(min)
  return formatted ? `From ₹ ${formatted}` : prices[0] ?? ''
}
