-- Migration: Add Category-Based Property Fields
-- Description: Adds all fields required for the 7 property categories
-- All fields are optional (nullable) to support "no required fields" requirement
-- Date: 2024

-- ============================================
-- COMMON FIELDS (All Categories)
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS header text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS sub_location text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS country text;

-- ============================================
-- LUXURY CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS view text,
  ADD COLUMN IF NOT EXISTS size text,
  ADD COLUMN IF NOT EXISTS configuration_type text, -- Simplex, Duplex, Triplex, Bungalow
  ADD COLUMN IF NOT EXISTS price text,
  ADD COLUMN IF NOT EXISTS is_plot_or_villa boolean;

-- ============================================
-- NEW PROJECT CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS bhk_options text[], -- Array of selected BHKs: 1BHK, 2BHK, 3BHK, 4BHK, 5BHK
  ADD COLUMN IF NOT EXISTS bhk_1_area text, -- Area in sq.ft for 1BHK
  ADD COLUMN IF NOT EXISTS bhk_2_area text, -- Area in sq.ft for 2BHK
  ADD COLUMN IF NOT EXISTS bhk_3_area text, -- Area in sq.ft for 3BHK
  ADD COLUMN IF NOT EXISTS bhk_4_area text, -- Area in sq.ft for 4BHK
  ADD COLUMN IF NOT EXISTS bhk_5_area text, -- Area in sq.ft for 5BHK
  ADD COLUMN IF NOT EXISTS area text, -- General area field
  ADD COLUMN IF NOT EXISTS possession text; -- Possession date/info

-- Note: towers, units already exist in the table

-- ============================================
-- PLOTS & LANDS CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS state_country text, -- For future scalability
  ADD COLUMN IF NOT EXISTS plot_size text,
  ADD COLUMN IF NOT EXISTS plot_size_unit text, -- sq.ft / sq.m / sq.yd
  ADD COLUMN IF NOT EXISTS road_width text,
  ADD COLUMN IF NOT EXISTS road_width_unit text, -- feet / meters
  ADD COLUMN IF NOT EXISTS frontage text,
  ADD COLUMN IF NOT EXISTS sale_price text,
  ADD COLUMN IF NOT EXISTS is_sale boolean, -- Sale checkbox
  ADD COLUMN IF NOT EXISTS is_jv boolean, -- Joint Venture checkbox
  ADD COLUMN IF NOT EXISTS availability_status text, -- Available / On Hold / Sold
  ADD COLUMN IF NOT EXISTS zoning_residential boolean, -- Residential zoning checkbox
  ADD COLUMN IF NOT EXISTS zoning_commercial boolean; -- Commercial zoning checkbox

-- ============================================
-- REDEVELOPMENT AND JOINT VENTURE CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS society_property_name text,
  ADD COLUMN IF NOT EXISTS number_of_wings integer,
  ADD COLUMN IF NOT EXISTS number_of_members integer, -- Existing residents
  ADD COLUMN IF NOT EXISTS existing_structure_details text,
  ADD COLUMN IF NOT EXISTS total_permissible_fsi text,
  ADD COLUMN IF NOT EXISTS fsi_consumed text,
  ADD COLUMN IF NOT EXISTS balance_fsi text, -- Auto-calculated (optional enhancement)
  ADD COLUMN IF NOT EXISTS corpus_amount text,
  ADD COLUMN IF NOT EXISTS corpus_amount_type text, -- per member / total
  ADD COLUMN IF NOT EXISTS rent text,
  ADD COLUMN IF NOT EXISTS rent_tenure text, -- months
  ADD COLUMN IF NOT EXISTS extra_amenities text,
  ADD COLUMN IF NOT EXISTS stage text; -- Under Discussion / LOI Given / Agreement / Closed

-- ============================================
-- HOTELS CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS no_of_rooms integer,
  ADD COLUMN IF NOT EXISTS floors integer,
  ADD COLUMN IF NOT EXISTS built_up_area text,
  ADD COLUMN IF NOT EXISTS monthly_revenue text,
  ADD COLUMN IF NOT EXISTS ebitda_yield text,
  ADD COLUMN IF NOT EXISTS is_pre_leased boolean;

-- Note: plot_size already exists (can be reused)

-- ============================================
-- INDEPENDENT BUILDINGS CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS usage_type_category text, -- Residential / Commercial
  ADD COLUMN IF NOT EXISTS commercial_type text, -- School, College, Hospital, Retail Office, Mall, Warehouse, Clubs, Others
  ADD COLUMN IF NOT EXISTS constructed_area text,
  ADD COLUMN IF NOT EXISTS floors_g_x text, -- G + X format
  ADD COLUMN IF NOT EXISTS transaction_option text, -- Rent / Sale / Pre-Leased
  ADD COLUMN IF NOT EXISTS deposit text,
  ADD COLUMN IF NOT EXISTS tenure text,
  ADD COLUMN IF NOT EXISTS tenure_unit text, -- years / months
  ADD COLUMN IF NOT EXISTS escalation text; -- Percentage

-- Note: plot_size, road_width already exist (can be reused)

-- ============================================
-- INTERNATIONAL CATEGORY FIELDS
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS road_street_name text,
  ADD COLUMN IF NOT EXISTS property_type_international text, -- Residential / Commercial
  ADD COLUMN IF NOT EXISTS property_size text, -- sq.ft
  ADD COLUMN IF NOT EXISTS configuration_international text, -- Studio / 1BHK / 2BHK / Villa / Office etc.
  ADD COLUMN IF NOT EXISTS price_international text,
  ADD COLUMN IF NOT EXISTS currency text, -- USD / AED / GBP / EUR etc.
  ADD COLUMN IF NOT EXISTS transaction_type_international text, -- Sale / Lease
  ADD COLUMN IF NOT EXISTS furnishing_status text;

-- ============================================
-- MULTI-CATEGORY ASSIGNMENT & MEDIA
-- ============================================
ALTER TABLE properties 
  ADD COLUMN IF NOT EXISTS primary_category text, -- Main category slug (luxury, new-project, etc.)
  ADD COLUMN IF NOT EXISTS category_assignments text[], -- Array of category slugs for multi-category visibility
  ADD COLUMN IF NOT EXISTS video_links text[]; -- Array of video URLs

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Index for primary category filtering
CREATE INDEX IF NOT EXISTS idx_properties_primary_category 
  ON properties(primary_category);

-- Index for category assignments (array contains queries)
CREATE INDEX IF NOT EXISTS idx_properties_category_assignments 
  ON properties USING GIN(category_assignments);

-- Index for location-based queries
CREATE INDEX IF NOT EXISTS idx_properties_location 
  ON properties(location);

CREATE INDEX IF NOT EXISTS idx_properties_city 
  ON properties(city);

CREATE INDEX IF NOT EXISTS idx_properties_country 
  ON properties(country);

-- Index for sub-location
CREATE INDEX IF NOT EXISTS idx_properties_sub_location 
  ON properties(sub_location);

-- Index for common filter fields
CREATE INDEX IF NOT EXISTS idx_properties_availability_status 
  ON properties(availability_status);

CREATE INDEX IF NOT EXISTS idx_properties_stage 
  ON properties(stage);

CREATE INDEX IF NOT EXISTS idx_properties_transaction_option 
  ON properties(transaction_option);

-- Index for created_at (already exists, but ensuring it's there)
CREATE INDEX IF NOT EXISTS idx_properties_created_at 
  ON properties(created_at);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN properties.header IS 'Property header/title - common field for all categories';
COMMENT ON COLUMN properties.description IS 'Property description - common field for all categories';
COMMENT ON COLUMN properties.sub_location IS 'Sub-location within the main location - common field';
COMMENT ON COLUMN properties.city IS 'City name - common field for all categories';
COMMENT ON COLUMN properties.country IS 'Country name - common field for all categories';
COMMENT ON COLUMN properties.primary_category IS 'Main category slug (luxury, new-project, plots-lands, redevelopment-jv, hotels, independent-buildings, international)';
COMMENT ON COLUMN properties.category_assignments IS 'Array of category slugs - allows property to appear in multiple category sections';
COMMENT ON COLUMN properties.video_links IS 'Array of video URLs for property videos';

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify the migration
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully. All category-based fields have been added.';
  RAISE NOTICE 'Total new columns added: ~50+';
  RAISE NOTICE 'All fields are optional (nullable) as per requirements.';
END $$;
