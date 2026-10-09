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

-- Optional: Add some sample data for testing
-- INSERT INTO clients (full_name, phone_number, email, interest_area, message) VALUES
--     ('John Doe', '+91 9876543210', 'john@example.com', 'luxury-homes', 'Interested in luxury properties in Mumbai'),
--     ('Jane Smith', '+91 8765432109', 'jane@example.com', 'investment', 'Looking for investment opportunities'),
--     ('Mike Johnson', '+91 7654321098', 'mike@example.com', 'joint-venture', 'Interested in joint venture projects'); 