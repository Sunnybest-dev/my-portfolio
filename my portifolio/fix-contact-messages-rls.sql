-- Fix contact_messages RLS policy to allow anonymous inserts
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;

CREATE POLICY "Allow anonymous insert on contact_messages" 
ON contact_messages 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated insert on contact_messages" 
ON contact_messages 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Make sure authenticated users can read messages
DROP POLICY IF EXISTS "Allow authenticated read on contact_messages" ON contact_messages;

CREATE POLICY "Allow authenticated read on contact_messages" 
ON contact_messages 
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users to delete messages
DROP POLICY IF EXISTS "Allow authenticated delete on contact_messages" ON contact_messages;

CREATE POLICY "Allow authenticated delete on contact_messages" 
ON contact_messages 
FOR DELETE 
TO authenticated
USING (true);
