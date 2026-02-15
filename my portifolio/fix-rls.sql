-- Allow authenticated users to update content tables
CREATE POLICY "Allow authenticated updates" ON home_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON about_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON projects_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON contact_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated updates" ON navbar_content FOR UPDATE USING (auth.role() = 'authenticated');
