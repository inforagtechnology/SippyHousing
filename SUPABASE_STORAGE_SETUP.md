# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for property image uploads.

## 1. Create Storage Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure the bucket:
   - **Name**: `listings`
   - **Public bucket**: ✅ Check this (so images can be accessed publicly)
   - **File size limit**: 5MB (or your preferred limit)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`

## 2. Set Up Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies. Since this is an admin interface, we'll allow all operations on the listings bucket.

### Policy 1: Allow all operations on listings bucket
```sql
CREATE POLICY "Allow all operations on listings bucket" ON storage.objects
FOR ALL USING (
  bucket_id = 'listings'
);
```

**OR** if you want more granular control, use these separate policies:

### Alternative: Separate policies for different operations
```sql
-- Allow uploads (INSERT)
CREATE POLICY "Allow uploads to listings bucket" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'listings'
);

-- Allow viewing (SELECT)
CREATE POLICY "Allow viewing from listings bucket" ON storage.objects
FOR SELECT USING (
  bucket_id = 'listings'
);

-- Allow updates (UPDATE)
CREATE POLICY "Allow updates to listings bucket" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'listings'
);

-- Allow deletions (DELETE)
CREATE POLICY "Allow deletions from listings bucket" ON storage.objects
FOR DELETE USING (
  bucket_id = 'listings'
);
```

## 3. Create Property Images Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create property_images table
CREATE TABLE public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete cascade,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Create indexes for better performance
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_images_created_at ON property_images(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON property_images
  FOR ALL USING (true);
```

## 4. Update Environment Variables

Make sure your `.env` file includes the Supabase configuration:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/admin/add-property`
3. Fill in property details and upload some images
4. Check that images are uploaded to the `listings` bucket
5. Verify that image records are created in the `property_images` table

## 6. Storage Bucket Configuration (Optional)

You can configure additional settings for your storage bucket:

### CORS Configuration
If you need to upload from different domains, configure CORS:

```sql
-- Allow uploads from your domain
INSERT INTO storage.cors (bucket_id, allowed_origins, allowed_methods, allowed_headers, max_age_seconds)
VALUES ('listings', ARRAY['http://localhost:3000', 'https://yourdomain.com'], ARRAY['GET', 'POST', 'PUT', 'DELETE'], ARRAY['*'], 3600);
```

### File Transformations (Optional)
You can set up image transformations for different sizes:

```sql
-- Example: Create a policy for image transformations
CREATE POLICY "Allow public access to transformed images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'listings' AND 
  (storage.foldername(name))[1] = 'transformed'
);
```

## 7. Troubleshooting

### Common Issues:

1. **"Bucket not found" error**
   - Make sure the bucket name is exactly `listings`
   - Check that the bucket is created in the correct project

2. **"new row violates row-level security policy" error (403 Unauthorized)**
   - This means the RLS policies are too restrictive
   - Run the storage policies SQL commands above
   - Make sure the bucket is public
   - Check that policies allow operations without authentication

3. **"Permission denied" error**
   - Verify that RLS policies are correctly set up
   - Check that the bucket is public
   - Ensure policies don't require authentication

4. **Images not displaying**
   - Ensure the bucket is public
   - Check that the image URLs are correct
   - Verify CORS settings if uploading from different domains

5. **Large file uploads failing**
   - Check the file size limit in bucket settings
   - Verify the file type is allowed

### Monitoring:

- Check the **Storage** section in Supabase dashboard for upload statistics
- Monitor the **Logs** section for any errors
- Use the **Table Editor** to verify data is being inserted correctly

## 8. Best Practices

1. **File Naming**: Images are automatically named with timestamps to avoid conflicts
2. **File Size**: Keep images under 5MB for better performance
3. **File Types**: Use WebP for better compression, with JPG/PNG as fallbacks
4. **Cleanup**: Implement cleanup procedures for unused images
5. **Backup**: Regularly backup your storage bucket and database

## 9. Security Considerations

1. **Public Access**: Since images are public, don't upload sensitive information
2. **File Validation**: The application validates file types and sizes
3. **Rate Limiting**: Consider implementing rate limiting for uploads
4. **Virus Scanning**: Consider implementing virus scanning for uploaded files

Your Supabase Storage is now ready for property image uploads! 🎉 