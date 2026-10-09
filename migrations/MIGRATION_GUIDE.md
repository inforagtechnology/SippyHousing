# Database Migration Guide: Category-Based Properties

## Overview
This migration adds all necessary columns to support the 7 property categories with their specific fields.

## Migration File
`001_add_category_based_fields.sql`

## How to Run the Migration

### Option 1: Using Supabase Dashboard (Recommended)
1. Log in to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the entire contents of `001_add_category_based_fields.sql`
5. Click **Run** or press `Ctrl/Cmd + Enter`
6. Verify the migration completed successfully

### Option 2: Using Supabase CLI
```bash
# If you have Supabase CLI installed
supabase db push
# Or
psql -h your-db-host -U postgres -d postgres -f migrations/001_add_category_based_fields.sql
```

## What This Migration Does

### 1. Adds Common Fields (All Categories)
- `header` - Property title/header
- `description` - Property description
- `sub_location` - Sub-location within main location
- `city` - City name
- `country` - Country name

### 2. Adds Category-Specific Fields
- **Luxury**: view, size, configuration_type, price, is_plot_or_villa
- **New Project**: bhk_options, bhk_1_area through bhk_5_area, area, possession
- **Plots & Lands**: plot_size, plot_size_unit, road_width, road_width_unit, frontage, sale_price, is_sale, is_jv, availability_status, zoning_residential, zoning_commercial, state_country
- **Redevelopment & Joint Venture**: society_property_name, number_of_wings, number_of_members, existing_structure_details, total_permissible_fsi, fsi_consumed, balance_fsi, corpus_amount, corpus_amount_type, rent, rent_tenure, extra_amenities, stage
- **Hotels**: no_of_rooms, floors, built_up_area, monthly_revenue, ebitda_yield, is_pre_leased
- **Independent Buildings**: usage_type_category, commercial_type, constructed_area, floors_g_x, transaction_option, deposit, tenure, tenure_unit, escalation
- **International**: road_street_name, property_type_international, property_size, configuration_international, price_international, currency, transaction_type_international, furnishing_status

### 3. Adds Multi-Category Support
- `primary_category` - Main category slug
- `category_assignments` - Array of category slugs (for multi-category visibility)
- `video_links` - Array of video URLs

### 4. Creates Performance Indexes
- Indexes on primary_category, category_assignments, location, city, country, sub_location
- Indexes on commonly filtered fields (availability_status, stage, transaction_option)
- GIN index on category_assignments array for fast array queries

## Important Notes

### All Fields Are Optional
- **All new fields are nullable** (no NOT NULL constraints)
- This supports the requirement of "no required fields"
- Existing properties will have NULL values for new fields (expected behavior)

### Backward Compatibility
- **All existing columns remain unchanged**
- Existing properties will continue to work
- Legacy fields (building, builder, etc.) are preserved

### Data Types
- Text fields use `text` type (unlimited length)
- Boolean fields use `boolean` type
- Arrays use `text[]` type
- Numbers use `integer` or `numeric` as appropriate

## Verification Steps

After running the migration, verify it worked:

```sql
-- Check if new columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'properties'
  AND column_name IN (
    'header', 'description', 'sub_location', 'city', 'country',
    'primary_category', 'category_assignments', 'video_links',
    'view', 'size', 'configuration_type', 'price', 'is_plot_or_villa'
  )
ORDER BY column_name;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'properties'
  AND indexname LIKE 'idx_properties%';

-- Verify existing data is intact
SELECT COUNT(*) as total_properties FROM properties;
```

## Rollback (If Needed)

If you need to rollback this migration:

```sql
-- Remove indexes first
DROP INDEX IF EXISTS idx_properties_primary_category;
DROP INDEX IF EXISTS idx_properties_category_assignments;
DROP INDEX IF EXISTS idx_properties_city;
DROP INDEX IF EXISTS idx_properties_country;
DROP INDEX IF EXISTS idx_properties_sub_location;
DROP INDEX IF EXISTS idx_properties_availability_status;
DROP INDEX IF EXISTS idx_properties_stage;
DROP INDEX IF EXISTS idx_properties_transaction_option;

-- Remove columns (be careful - this will delete data!)
-- Only run if you're sure you want to remove these columns
-- ALTER TABLE properties DROP COLUMN IF EXISTS header;
-- ALTER TABLE properties DROP COLUMN IF EXISTS description;
-- ... (repeat for all new columns)
```

**⚠️ Warning**: Rolling back will delete all data in the new columns. Make sure you have a backup!

## Troubleshooting

### Error: "column already exists"
- This means the column was already added (maybe from a previous migration attempt)
- The migration uses `ADD COLUMN IF NOT EXISTS`, so it should be safe to run again
- You can safely ignore this error or comment out that line

### Error: "relation does not exist"
- Make sure the `properties` table exists
- Check that you're connected to the correct database

### Performance Issues
- The migration adds many columns but doesn't modify existing data
- It should complete quickly even on large tables
- If it's slow, check your database connection and server resources

## Next Steps

After running this migration:
1. ✅ Update TypeScript types (already done in `src/lib/supabase.ts`)
2. ⏭️ Proceed to Phase 2: Type Definitions & Configuration
3. ⏭️ Proceed to Phase 3: Dynamic Form Components

## Support

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify your database connection
3. Ensure you have proper permissions
4. Review the error messages carefully
