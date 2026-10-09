# Supabase Setup Guide

This project uses Supabase as the backend database. Follow these steps to set up Supabase:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Note down your project URL and anon key

## 2. Create the Properties Table

Your table structure is already set up correctly. Here's the structure for reference:

```sql
CREATE TABLE public.properties (
  id uuid primary key default gen_random_uuid(),
  building text,
  builder text,
  location text,
  possession_date date,
  towers integer,
  acres numeric,
  units integer,
  bhk text,
  flat_size text,
  price_range text,
  rera_number text,
  contact_number text,
  property_type text, -- New / Rental / Resale
  usage_type text,    -- Residential / Commercial
  additional_info text,
  created_at timestamp with time zone default now()
);
```

If you need to create indexes for better performance, you can add:

```sql
-- Create indexes for better performance
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_usage_type ON properties(usage_type);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_created_at ON properties(created_at);

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for admin access)
CREATE POLICY "Allow all operations for authenticated users" ON properties
  FOR ALL USING (true);
```

## 3. Environment Variables

1. Copy `env.example` to `.env`
2. Update the values with your Supabase project details:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Test the Setup

1. Start the development server: `npm run dev`
2. Navigate to `/admin/login`
3. Login with admin credentials
4. Click "View All Apartments" to test the connection

## 5. Sample Data (Optional)

You can insert sample data using the Supabase dashboard or run this SQL:

```sql
INSERT INTO properties (building, builder, location, possession_date, towers, acres, units, bhk, flat_size, price_range, rera_number, contact_number, property_type, usage_type, additional_info) VALUES
('Luxury Heights', 'ABC Developers', 'Mumbai, Maharashtra', '2024-12-31', 4, 2.5, 200, '2BHK', '1200 sq ft', '₹85L - ₹1.2Cr', 'MahaRERA/A51234', '+91-9876543210', 'New', 'Residential', 'Premium amenities with swimming pool and gym'),
('Green Valley', 'XYZ Builders', 'Pune, Maharashtra', '2024-06-30', 2, 1.8, 120, '3BHK', '1500 sq ft', '₹1.2Cr - ₹1.8Cr', 'MahaRERA/B78901', '+91-9876543211', 'New', 'Residential', 'Eco-friendly project with garden'),
('Business Plaza', 'Commercial Corp', 'Bangalore, Karnataka', '2024-03-31', 1, 0.5, 50, 'Office', '2000 sq ft', '₹2Cr - ₹3Cr', 'KarRERA/C12345', '+91-9876543212', 'New', 'Commercial', 'Prime location for business');
```

## Troubleshooting

- Make sure your Supabase project is active
- Check that the environment variables are correctly set
- Verify that the properties table exists and has the correct structure
- Ensure RLS policies allow the operations you need 