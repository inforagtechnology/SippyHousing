-- Migration: Add missing property columns used by current frontend forms
-- Date: 2026-02-18

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS storey text,
  ADD COLUMN IF NOT EXISTS price_1bhk text,
  ADD COLUMN IF NOT EXISTS price_2bhk text,
  ADD COLUMN IF NOT EXISTS price_3bhk text,
  ADD COLUMN IF NOT EXISTS price_4bhk text,
  ADD COLUMN IF NOT EXISTS price_5bhk text,
  ADD COLUMN IF NOT EXISTS penthouse_area text,
  ADD COLUMN IF NOT EXISTS price_penthouse text,
  ADD COLUMN IF NOT EXISTS duplex_area text,
  ADD COLUMN IF NOT EXISTS unit_variants jsonb,
  ADD COLUMN IF NOT EXISTS floor_number text,
  ADD COLUMN IF NOT EXISTS parking text,
  ADD COLUMN IF NOT EXISTS bathrooms integer,
  ADD COLUMN IF NOT EXISTS age_of_property text,
  ADD COLUMN IF NOT EXISTS maintenance text,
  ADD COLUMN IF NOT EXISTS pre_leased_sale_price text,
  ADD COLUMN IF NOT EXISTS pre_leased_rent_price text;

COMMENT ON COLUMN properties.duplex_area IS 'Duplex area (New Project category)';
COMMENT ON COLUMN properties.unit_variants IS 'JSON list of unit variants with type, area, price, and optional label';