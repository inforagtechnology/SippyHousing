/**
 * Seed script: adds one sample property per category for testing.
 * Run: npx tsx scripts/seed-all-property-types.ts
 * Requires .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or set in shell).
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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

type PropertyInsert = Record<string, unknown>;

const common = {
  header: 'Test Property',
  description: 'Sample listing added by seed script for testing.',
  location: 'Mumbai',
  sub_location: 'Bandra West',
  city: 'Mumbai',
  country: 'India',
};

const samples: { category: string; name: string; data: PropertyInsert }[] = [
  {
    category: 'luxury',
    name: 'Luxury',
    data: {
      ...common,
      header: 'Test Luxury Villa',
      primary_category: 'luxury',
      category_assignments: ['luxury'],
      view: 'Sea View',
      size: '5000 sq.ft',
      configuration_type: 'Penthouse',
      price: '₹15 Cr',
    },
  },
  {
    category: 'new-project',
    name: 'New Project',
    data: {
      ...common,
      header: 'Test New Project Tower',
      primary_category: 'new-project',
      category_assignments: ['new-project'],
      bhk_options: ['2BHK', '3BHK', '4BHK'],
      storey: 'G+20',
      towers: 2,
      units: 120,
      area: '2.5 Acres',
      possession: 'Dec 2026',
      rera_number: 'MahaRERA/P52100012345',
      // Optional: add price_1bhk, price_2bhk, etc. after running the New Project price migration
    },
  },
  {
    category: 'resale-rental',
    name: 'Resale & Rental (Resale)',
    data: {
      ...common,
      header: 'Test Resale 3BHK',
      primary_category: 'resale-rental',
      category_assignments: ['resale-rental'],
      property_type: 'Resale',
      price: '₹1.5 Cr',
      bhk_options: ['3BHK'],
      area: '1250',
      furnishing_status: 'Semi-Furnished',
      possession: 'Ready to move',
      floor_number: '8',
      parking: '2 Covered',
      bathrooms: 3,
      age_of_property: '5 years',
      rera_number: 'MahaRERA/A51234',
      contact_number: '+91 98765 43210',
    },
  },
  {
    category: 'resale-rental',
    name: 'Resale & Rental (Rental)',
    data: {
      ...common,
      header: 'Test Rental 2BHK',
      primary_category: 'resale-rental',
      category_assignments: ['resale-rental'],
      property_type: 'Rental',
      price: '₹45,000',
      bhk_options: ['2BHK'],
      area: '950',
      furnishing_status: 'Fully Furnished',
      possession: 'Immediate',
      floor_number: '5',
      parking: '1 Covered',
      bathrooms: 2,
      deposit: '₹90,000',
      tenure: '11',
      maintenance: '₹3,000/month',
      contact_number: '+91 98765 43211',
    },
  },
  {
    category: 'plots-lands',
    name: 'Plots & Lands',
    data: {
      ...common,
      header: 'Test Plot - Lonavala',
      primary_category: 'plots-lands',
      category_assignments: ['plots-lands'],
      state_country: 'Maharashtra',
      plot_size: '2400',
      plot_size_unit: 'sq.ft',
      road_width: '30',
      road_width_unit: 'feet',
      frontage: '40 ft',
      sale_price: '₹75 L',
      is_sale: true,
      is_jv: false,
      availability_status: 'Available',
      zoning_residential: true,
      zoning_commercial: false,
    },
  },
  {
    category: 'redevelopment-jv',
    name: 'Redevelopment and Joint Venture',
    data: {
      ...common,
      header: 'Test Society Redevelopment',
      primary_category: 'redevelopment-jv',
      category_assignments: ['redevelopment-jv'],
      society_property_name: 'Green Valley Co-op',
      plot_size: '15000 sq.ft',
      number_of_wings: 2,
      number_of_members: 48,
      road_width: '40 ft',
      existing_structure_details: 'G+3 existing, 30 years old',
      total_permissible_fsi: '2.5',
      fsi_consumed: '0.8',
      balance_fsi: '1.7',
      corpus_amount: '25 L',
      corpus_amount_type: 'per member',
      rent: 'N/A',
    },
  },
  {
    category: 'hotels',
    name: 'Hotels',
    data: {
      ...common,
      header: 'Test Boutique Hotel',
      primary_category: 'hotels',
      category_assignments: ['hotels'],
      society_property_name: 'Heritage Stay',
      no_of_rooms: 24,
      floors: 4,
      built_up_area: '18000 sq.ft',
      plot_size: '8000 sq.ft',
      sale_price: '₹12 Cr',
      monthly_revenue: '₹8.5 L',
      ebitda_yield: '12%',
      is_pre_leased: false,
    },
  },
  {
    category: 'independent-buildings',
    name: 'Independent Buildings (Residential)',
    data: {
      ...common,
      header: 'Test Independent Residential',
      primary_category: 'independent-buildings',
      category_assignments: ['independent-buildings'],
      society_property_name: 'Sunrise Villa',
      usage_type_category: 'Residential',
      plot_size: '4000 sq.ft',
      constructed_area: '3500 sq.ft',
      floors_g_x: 'G+2',
      road_width: '30 ft',
      transaction_option: 'Sale',
      price: '₹4.5 Cr',
    },
  },
  {
    category: 'independent-buildings',
    name: 'Independent Buildings (Commercial)',
    data: {
      ...common,
      header: 'Test Commercial Building',
      primary_category: 'independent-buildings',
      category_assignments: ['independent-buildings'],
      society_property_name: 'Tech Park Block A',
      usage_type_category: 'Commercial',
      commercial_type: 'Retail Office',
      plot_size: '10000 sq.ft',
      constructed_area: '25000 sq.ft',
      floors_g_x: 'G+5',
      road_width: '60 ft',
      transaction_option: 'Rent',
      price: '₹18 L/year',
      deposit: '₹50 L',
      tenure: '5',
      tenure_unit: 'years',
      escalation: '10%',
    },
  },
  {
    category: 'international',
    name: 'International',
    data: {
      ...common,
      header: 'Test Dubai Apartment',
      primary_category: 'international',
      category_assignments: ['international'],
      location: 'Dubai Marina',
      city: 'Dubai',
      country: 'UAE',
      society_property_name: 'Marina Heights',
      road_street_name: 'Marina Walk',
      property_type_international: 'Residential',
      property_size: '1200',
      configuration_international: '2BHK',
      price_international: '1.2M',
      currency: 'AED',
      transaction_type_international: 'Sale',
      furnishing_status: 'Semi-Furnished',
    },
  },
];

async function main(): Promise<void> {
  console.log('Seeding sample properties for all categories...\n');
  let ok = 0;
  let fail = 0;
  for (const { category, name, data } of samples) {
    try {
      const { data: inserted, error } = await supabase
        .from('properties')
        .insert([data])
        .select('id, header')
        .single();
      if (error) {
        console.error(`[${category}] ${name}: ${error.message}`);
        fail++;
      } else {
        console.log(`[${category}] ${name}: added id=${inserted?.id} – ${inserted?.header}`);
        ok++;
      }
    } catch (e) {
      console.error(`[${category}] ${name}:`, e);
      fail++;
    }
  }
  console.log(`\nDone. Added: ${ok}, Failed: ${fail}.`);
}

main();
