import { Property } from "@/lib/supabase";

export const GENERAL_CONTACT_NUMBER = "7777030607";
export const SPECIAL_CONTACT_NUMBER = "9820053962";

const SPECIAL_CATEGORY_SLUGS = new Set([
  "luxury",
  "plots-lands",
  "independent-buildings",
  "hotels",
  "international",
]);

const GENERAL_CATEGORY_SLUGS = new Set(["new-project", "resale-rental"]);

/**
 * Every number that should receive leads. Add more numbers here and they are
 * shown / used automatically. Category groups below decide which numbers
 * are shown for which kind of property. A property can also carry its own
 * `lead_numbers` (set in the admin form) which are added on top.
 */
export const LEAD_NUMBERS = {
  general: [GENERAL_CONTACT_NUMBER],
  special: [SPECIAL_CONTACT_NUMBER],
};

/** Strip everything except digits and drop a leading 91 / 0 so we always store 10 digits. */
export const normalizeIndianPhone = (raw: string): string => {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) return digits.slice(-10);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const parseNumberList = (raw?: string | string[] | null): string[] => {
  if (!raw) return [];
  const parts = Array.isArray(raw) ? raw : String(raw).split(/[,;\n/]+/);
  return parts.map(normalizeIndianPhone).filter((n) => n.length >= 10);
};

const unique = (arr: string[]) => Array.from(new Set(arr));

export const formatIndianPhone = (phone: string): string => `+91 ${phone}`;

export const getPhoneHref = (phone: string): string => `tel:+91${phone}`;

export const getWhatsAppHref = (phone: string, message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const getContactNumberByType = (type?: string): string => {
  const text = (type || "").toLowerCase();

  if (
    text.includes("luxury") ||
    text.includes("plot") ||
    text.includes("independent") ||
    text.includes("hotel") ||
    text.includes("international")
  ) {
    return SPECIAL_CONTACT_NUMBER;
  }

  return GENERAL_CONTACT_NUMBER;
};

export const getContactNumberByProperty = (
  property?: Partial<Property> & { type?: string }
): string => {
  if (!property) {
    return GENERAL_CONTACT_NUMBER;
  }

  const primary = (property.primary_category || "").toLowerCase();
  const assignments = (property.category_assignments || []).map((item) =>
    item.toLowerCase()
  );
  const allCategories = [primary, ...assignments].filter(Boolean);

  if (allCategories.some((slug) => SPECIAL_CATEGORY_SLUGS.has(slug))) {
    return SPECIAL_CONTACT_NUMBER;
  }

  if (allCategories.some((slug) => GENERAL_CATEGORY_SLUGS.has(slug))) {
    return GENERAL_CONTACT_NUMBER;
  }

  const usageText = [
    property.usage_type,
    property.usage_type_category,
    property.property_type_international,
    property.type,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    usageText.includes("luxury") ||
    usageText.includes("plot") ||
    usageText.includes("independent") ||
    usageText.includes("hotel") ||
    usageText.includes("international")
  ) {
    return SPECIAL_CONTACT_NUMBER;
  }

  if (
    usageText.includes("new") ||
    usageText.includes("resale") ||
    usageText.includes("residential") ||
    usageText.includes("commercial")
  ) {
    return GENERAL_CONTACT_NUMBER;
  }

  return GENERAL_CONTACT_NUMBER;
};


/**
 * ALL numbers that should receive a lead for this property:
 *  - numbers typed on the property (lead_numbers / contact_number)
 *  - the category default group (general / special)
 */
export const getLeadNumbersByProperty = (
  property?: Partial<Property> & { type?: string }
): string[] => {
  const own = [
    ...parseNumberList(property?.lead_numbers),
    ...parseNumberList(property?.contact_number),
  ];
  const defaults =
    getContactNumberByProperty(property) === SPECIAL_CONTACT_NUMBER
      ? LEAD_NUMBERS.special
      : LEAD_NUMBERS.general;
  return unique([...own, ...defaults]);
};

/** Numbers for a plain category label (used by cart / search cards). */
export const getLeadNumbersByType = (type?: string): string[] =>
  getContactNumberByType(type) === SPECIAL_CONTACT_NUMBER
    ? LEAD_NUMBERS.special
    : LEAD_NUMBERS.general;
