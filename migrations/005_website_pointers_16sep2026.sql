-- Migration: changes from "Website pointers discussed with SS" (16.09.2026)
-- Run once in the Supabase SQL editor. Every statement is idempotent.

-- 12. Remarks: whole-property remark + per-field remarks
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS remarks text,
  ADD COLUMN IF NOT EXISTS field_remarks jsonb;

-- 1. Leads on multiple numbers: extra numbers per property
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS lead_numbers text;

-- 8. Plots / Lands: JV terms (two manual boxes)
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS jv_terms_1 text,
  ADD COLUMN IF NOT EXISTS jv_terms_2 text;

-- 10. Hotels: sale / rent (deposit, rent) / operating basis / pre-leased
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS operator_brand text,      -- e.g. Bloom, JW Marriott
  ADD COLUMN IF NOT EXISTS operating_terms text,
  ADD COLUMN IF NOT EXISTS operating_price text,
  ADD COLUMN IF NOT EXISTS transaction_option text,
  ADD COLUMN IF NOT EXISTS rent text,
  ADD COLUMN IF NOT EXISTS deposit text,
  ADD COLUMN IF NOT EXISTS tenure text,
  ADD COLUMN IF NOT EXISTS tenure_unit text,
  ADD COLUMN IF NOT EXISTS pre_leased_sale_price text,
  ADD COLUMN IF NOT EXISTS pre_leased_rent_price text;

-- Admin identification fields used by the form
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS property_code text,
  ADD COLUMN IF NOT EXISTS real_property_name text;

-- 1. Leads: remember which numbers each website lead was routed to
ALTER TABLE visitor_leads
  ADD COLUMN IF NOT EXISTS routed_numbers text;

COMMENT ON COLUMN properties.remarks IS 'Free-text remarks for the property';
COMMENT ON COLUMN properties.field_remarks IS 'Per-field remarks: { field_key: text }';
COMMENT ON COLUMN properties.lead_numbers IS 'Comma-separated extra numbers that receive leads for this property';
COMMENT ON COLUMN properties.jv_terms_1 IS 'Plots/Lands JV terms – box 1';
COMMENT ON COLUMN properties.jv_terms_2 IS 'Plots/Lands JV terms – box 2';
COMMENT ON COLUMN properties.operator_brand IS 'Hotels: operator / brand for operating-basis or pre-leased deals';
COMMENT ON COLUMN visitor_leads.routed_numbers IS 'Numbers the lead was routed to';

-- 14. Deal of the Year / Deal of the Month homepage banner
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS deal_highlight text;

-- Commercial now has Resale / Rental (uses existing property_type, rent, deposit, price columns)
