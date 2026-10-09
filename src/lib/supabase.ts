import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/** One unit variant for New Project (multiple sizes/prices per type). */
export interface UnitVariant {
  type: string // 1BHK | 2BHK | 3BHK | 4BHK | 5BHK | Penthouse
  area: string
  price: string
  label?: string // e.g. Type A
   is_top_project?: boolean |null;
}

// Property type definition based on your table structure
// All fields are optional (nullable) to support "no required fields" requirement

export interface Property {
  // Primary key and timestamps
  id: string
  created_at: string

  // for internal use and general identification for Admin can access all finders and user 
  property_code?: string;
  real_property_name?: string;

  // ============================================
  // COMMON FIELDS (All Categories)
  // ============================================
  header?: string
  description?: string
  location?: string
  sub_location?: string
  city?: string
  country?: string

  // ============================================
  // CATEGORY ASSIGNMENT & MEDIA
  // ============================================
  primary_category?: string // Main category slug (luxury, new-project, plots-lands, etc.)
  category_assignments?: string[] // Array of category slugs for multi-category visibility
  video_links?: string[] // Array of video URLs (YouTube / Instagram / Vimeo / mp4)

  // ============================================
  // GENERAL ADMIN ADDITIONS
  // ============================================
  /** Free-text remark / additional details for the whole property */
  remarks?: string
  /** Optional remark per form field: { [fieldKey]: "text" } */
  field_remarks?: Record<string, string>
  /** Extra numbers that should receive leads for this property (comma separated in the form) */
  lead_numbers?: string
  /** Flashes in the homepage banner: 'Deal of the Month' | 'Deal of the Year' | 'None' */
  deal_highlight?: string

  // ============================================
  // LUXURY CATEGORY FIELDS
  // ============================================
  view?: string
  size?: string
  configuration_type?: 'Simplex' | 'Duplex' | 'Triplex' | 'Bungalow' | 'Penthouse'
  price?: string
  is_plot_or_villa?: boolean

  // ============================================
  // NEW PROJECT CATEGORY FIELDS
  // ============================================
  bhk_options?: string[] // Array of selected BHKs: 1BHK, 2BHK, 3BHK, 4BHK, 5BHK
  bhk_1_area?: string // Area in sq.ft for 1BHK
  bhk_2_area?: string // Area in sq.ft for 2BHK
  bhk_3_area?: string // Area in sq.ft for 3BHK
  bhk_4_area?: string // Area in sq.ft for 4BHK
  bhk_5_area?: string // Area in sq.ft for 5BHK
  price_1bhk?: string // Price for 1BHK (e.g. ₹50 L)
  price_2bhk?: string
  price_3bhk?: string
  price_4bhk?: string
  price_5bhk?: string
  price_penthouse?: string
  /** When set, used for display (multiple sizes/prices per type). Else use single area/price columns. */
  unit_variants?: UnitVariant[]
  storey?: string // Storey details (e.g. G+20)
  area?: string // General area field
  possession?: string // Possession date/info
  penthouse_area?: string // Penthouse area in sq.ft
  duplex_area?: string // Duplex area in sq.ft
  towers?: number
  units?: number

  // ============================================
  // PLOTS & LANDS CATEGORY FIELDS
  // ============================================
  state_country?: string // For future scalability
  plot_size?: string
  plot_size_unit?: 'sq.ft' | 'sq.m' | 'sq.yd'
  road_width?: string
  road_width_unit?: 'feet' | 'meters'
  frontage?: string
  sale_price?: string
  is_sale?: boolean // Sale checkbox
  is_jv?: boolean // Joint Venture checkbox
  availability_status?: 'Available' | 'On Hold' | 'Sold'
  zoning_residential?: boolean // Residential zoning checkbox
  zoning_commercial?: boolean // Commercial zoning checkbox
  jv_terms_1?: string // JV terms (manually typed) – box 1
  jv_terms_2?: string // JV terms (manually typed) – box 2

  // ============================================
  // REDEVELOPMENT AND JOINT VENTURE CATEGORY FIELDS
  // ============================================
  society_property_name?: string
  number_of_wings?: number
  number_of_members?: number // Existing residents
  existing_structure_details?: string
  total_permissible_fsi?: string
  fsi_consumed?: string
  balance_fsi?: string // Auto-calculated (optional enhancement)
  corpus_amount?: string
  corpus_amount_type?: 'per member' | 'total'
  rent?: string
  commercial_terms?: string
  rent_tenure?: string // months
  extra_amenities?: string
  stage?: 'Under Discussion' | 'LOI Given' | 'Agreement' | 'Closed'

  // ============================================
  // HOTELS CATEGORY FIELDS
  // ============================================
  no_of_rooms?: number
  floors?: number
  built_up_area?: string
  monthly_revenue?: string
  ebitda_yield?: string
  is_pre_leased?: boolean | string
  operator_brand?: string // e.g. Bloom, JW Marriott (Operating Basis / Pre-Leased)
  operating_terms?: string
  operating_price?: string

  // ============================================
  // INDEPENDENT BUILDINGS CATEGORY FIELDS
  // ============================================
  usage_type_category?: 'Residential' | 'Commercial'
  commercial_type?: 'School' | 'College' | 'Hospital' | 'Retail Office' | 'Mall' | 'Warehouse' | 'Clubs' | 'Others'
  constructed_area?: string
  floors_g_x?: string // G + X format
  transaction_option?: 'Rent' | 'Sale' | 'Pre-Leased' | 'Operating Basis'
  deposit?: string
  tenure?: string
  tenure_unit?: 'years' | 'months'
  escalation?: string // Percentage
  /** Pre-Leased: sale price (when transaction_option is Pre-Leased) */
  pre_leased_sale_price?: string
  /** Pre-Leased: rent price (when transaction_option is Pre-Leased) */
  pre_leased_rent_price?: string

  // ============================================
  // INTERNATIONAL CATEGORY FIELDS
  // ============================================
  road_street_name?: string
  property_type_international?: 'Residential' | 'Commercial'
  property_size?: string // sq.ft
  configuration_international?: string // Studio / 1BHK / 2BHK / Villa / Office etc.
  price_international?: string
  currency?: 'USD' | 'AED' | 'GBP' | 'EUR' | string // Common currencies + others
  transaction_type_international?: 'Sale' | 'Lease'
  furnishing_status?: string

  // ============================================
  // RESALE & RENTAL CATEGORY FIELDS
  // ============================================
  floor_number?: string // Floor / storey (e.g. "5", "G+3")
  parking?: string // e.g. "2 Covered", "1 Open"
  bathrooms?: number
  age_of_property?: string // e.g. "5 years" (Resale)
  maintenance?: string // e.g. "₹5000/month" (Rental)

  // ============================================
  // LEGACY FIELDS (For Backward Compatibility)
  // ============================================
  building?: string
  builder?: string
  possession_date?: string
  acres?: number
  bhk?: string
  flat_size?: string
  price_range?: string
  rera_number?: string
  contact_number?: string
  property_type?: string // New / Rental / Resale
  usage_type?: string // Residential / Commercial
  additional_info?: string
} 
