-- Fix analytics RLS policy to allow anonymous inserts
DROP POLICY IF EXISTS "Allow public insert on analytics" ON site_analytics;

CREATE POLICY "Allow anonymous insert on analytics" 
ON site_analytics 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated insert on analytics" 
ON site_analytics 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Make sure authenticated users can read analytics
DROP POLICY IF EXISTS "Allow authenticated read on analytics" ON site_analytics;

CREATE POLICY "Allow authenticated read on analytics" 
ON site_analytics 
FOR SELECT 
TO authenticated
USING (true);
