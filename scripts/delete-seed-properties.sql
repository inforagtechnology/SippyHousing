-- Run this in Supabase Dashboard → SQL Editor to delete only seed-created properties.
-- Seed entries have description = 'Sample listing added by seed script for testing.'

-- 1) Delete their images first (if property_images exists and has no ON DELETE CASCADE)
DELETE FROM property_images
WHERE property_id IN (
  SELECT id FROM properties
  WHERE description = 'Sample listing added by seed script for testing.'
);

-- 2) Delete the seed properties
DELETE FROM properties
WHERE description = 'Sample listing added by seed script for testing.';
