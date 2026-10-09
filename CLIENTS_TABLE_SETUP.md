# Clients Table Setup

This document explains how to set up the clients table in your Supabase database to store contact form submissions.

## SQL Query

Run the following SQL query in your Supabase SQL Editor:

```sql
-- Create clients table for storing contact form submissions
CREATE TABLE clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    interest_area VARCHAR(100) NOT NULL DEFAULT 'General Inquiry',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for better query performance
CREATE INDEX idx_clients_created_at ON clients(created_at);

-- Create index on interest_area for filtering
CREATE INDEX idx_clients_interest_area ON clients(interest_area);

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read all clients (for admin dashboard)
CREATE POLICY "Allow authenticated users to read clients" ON clients
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow anyone to insert clients (for contact form)
CREATE POLICY "Allow anyone to insert clients" ON clients
    FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to update clients
CREATE POLICY "Allow authenticated users to update clients" ON clients
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete clients
CREATE POLICY "Allow authenticated users to delete clients" ON clients
    FOR DELETE USING (auth.role() = 'authenticated');
```

## Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `full_name` | VARCHAR(255) | Client's full name (required) |
| `phone_number` | VARCHAR(20) | Client's phone number (required) |
| `email` | VARCHAR(255) | Client's email address (optional) |
| `interest_area` | VARCHAR(100) | Area of interest (defaults to "General Inquiry") |
| `message` | TEXT | Client's message (optional) |
| `created_at` | TIMESTAMP | When the record was created (auto-generated) |

## Features

1. **Auto-generated UUID**: Each client gets a unique identifier
2. **Required fields**: Name and phone number are mandatory
3. **Optional fields**: Email and message are optional
4. **Default values**: Interest area defaults to "General Inquiry"
5. **Timestamps**: Automatic creation timestamp
6. **Indexes**: Optimized for querying by creation date and interest area
7. **Row Level Security**: Secure access control policies

## Row Level Security Policies

- **Insert**: Anyone can submit contact forms (no authentication required)
- **Select**: Only authenticated users can view client data (for admin dashboard)
- **Update**: Only authenticated users can update client records
- **Delete**: Only authenticated users can delete client records

## Usage

After running the SQL query, the contact form in your application will automatically save submissions to this table. The form includes:

- Form validation for required fields
- Success/error toast notifications
- Form reset after successful submission
- Loading states during submission

## Testing

You can optionally add sample data for testing:

```sql
INSERT INTO clients (full_name, phone_number, email, interest_area, message) VALUES
    ('John Doe', '+91 9876543210', 'john@example.com', 'luxury-homes', 'Interested in luxury properties in Mumbai'),
    ('Jane Smith', '+91 8765432109', 'jane@example.com', 'investment', 'Looking for investment opportunities'),
    ('Mike Johnson', '+91 7654321098', 'mike@example.com', 'joint-venture', 'Interested in joint venture projects');
``` 