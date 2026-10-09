/**
 * Deletes only the properties added by seed-all-property-types.ts (identified by
 * description = "Sample listing added by seed script for testing.").
 * Run: npm run seed:delete  OR  npx tsx scripts/delete-seed-properties.ts
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SEED_DESCRIPTION = 'Sample listing added by seed script for testing.';

function loadEnv(): void {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const m = line.match(/^\s*([^#=]+)=(.*)$/);
        if (m) {
          const key = m[1].trim();
          const value = m[2].trim().replace(/^["']|["']$/g, '');
          if (!process.env[key]) process.env[key] = value;
        }
      }
    }
  } catch {
    // ignore
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set in .env or environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main(): Promise<void> {
  console.log('Finding properties created by seed script...\n');

  const { data: rows, error: selectError } = await supabase
    .from('properties')
    .select('id, header')
    .eq('description', SEED_DESCRIPTION);

  if (selectError) {
    console.error('Error fetching properties:', selectError.message);
    process.exit(1);
  }

  if (!rows?.length) {
    console.log('No seed-created properties found. Nothing to delete.');
    return;
  }

  console.log(`Found ${rows.length} seed property(ies):`);
  rows.forEach((r) => console.log(`  - ${r.id}  ${r.header}`));
  console.log('');

  // Delete related images first (if table exists and has FK without CASCADE)
  for (const row of rows) {
    await supabase.from('property_images').delete().eq('property_id', row.id);
  }

  const { error: deleteError } = await supabase
    .from('properties')
    .delete()
    .eq('description', SEED_DESCRIPTION);

  if (deleteError) {
    console.error('Error deleting properties:', deleteError.message);
    process.exit(1);
  }

  console.log(`Deleted ${rows.length} seed property(ies) and their images.`);
}

main();
