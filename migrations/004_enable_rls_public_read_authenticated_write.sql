-- Migration: Enable RLS with public read + authenticated write
-- Applies to core app tables used by services.

-- =========================
-- PROPERTIES
-- =========================
ALTER TABLE IF EXISTS properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "properties_select_public" ON properties;
CREATE POLICY "properties_select_public"
  ON properties
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "properties_insert_authenticated" ON properties;
CREATE POLICY "properties_insert_authenticated"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "properties_update_authenticated" ON properties;
CREATE POLICY "properties_update_authenticated"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "properties_delete_authenticated" ON properties;
CREATE POLICY "properties_delete_authenticated"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- =========================
-- CLIENTS
-- =========================
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;

-- Remove legacy policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read clients" ON clients;
DROP POLICY IF EXISTS "Allow anyone to insert clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated users to update clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated users to delete clients" ON clients;

DROP POLICY IF EXISTS "clients_select_public" ON clients;
CREATE POLICY "clients_select_public"
  ON clients
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "clients_insert_authenticated" ON clients;
CREATE POLICY "clients_insert_authenticated"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "clients_update_authenticated" ON clients;
CREATE POLICY "clients_update_authenticated"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "clients_delete_authenticated" ON clients;
CREATE POLICY "clients_delete_authenticated"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);

-- =========================
-- PROPERTY IMAGES
-- =========================
ALTER TABLE IF EXISTS property_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "property_images_select_public" ON property_images;
CREATE POLICY "property_images_select_public"
  ON property_images
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "property_images_insert_authenticated" ON property_images;
CREATE POLICY "property_images_insert_authenticated"
  ON property_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "property_images_update_authenticated" ON property_images;
CREATE POLICY "property_images_update_authenticated"
  ON property_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "property_images_delete_authenticated" ON property_images;
CREATE POLICY "property_images_delete_authenticated"
  ON property_images
  FOR DELETE
  TO authenticated
  USING (true);
