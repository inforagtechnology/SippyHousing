-- Optional migration: add Resale & Rental columns and New Project unit_variants to properties table (same table).
-- Run this in Supabase SQL editor if you want to persist the new fields.

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS floor_number text,
  ADD COLUMN IF NOT EXISTS parking text,
  ADD COLUMN IF NOT EXISTS bathrooms integer,
  ADD COLUMN IF NOT EXISTS age_of_property text,
  ADD COLUMN IF NOT EXISTS maintenance text;

-- New Project: optional unit variants (multiple sizes/prices per type). When set, display uses this; else single price_* columns.
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS unit_variants jsonb;
