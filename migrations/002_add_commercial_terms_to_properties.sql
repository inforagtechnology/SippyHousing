-- Migration: Add commercial_terms for Redevelopment & JV properties
-- Date: 2026-02-18

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS commercial_terms text;

COMMENT ON COLUMN properties.commercial_terms IS 'Commercial terms for redevelopment and JV listings';
