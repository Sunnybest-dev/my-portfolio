-- Add resume header fields
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS full_name TEXT DEFAULT 'Sunday Daniel Aniedeh';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS title TEXT DEFAULT 'Full Stack Developer';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS email TEXT DEFAULT 'email@example.com';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '+234 000 000 0000';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Nigeria';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS website TEXT DEFAULT 'https://yourwebsite.com';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS linkedin TEXT DEFAULT 'linkedin.com/in/yourprofile';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS github TEXT DEFAULT 'github.com/yourusername';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS profile_image TEXT DEFAULT '/profile.jpg';
ALTER TABLE resume_content ADD COLUMN IF NOT EXISTS summary TEXT DEFAULT 'Professional summary goes here...';

-- Update existing row
UPDATE resume_content SET 
  full_name = 'Sunday Daniel Aniedeh',
  title = 'Full Stack Developer',
  email = 'email@example.com',
  phone = '+234 000 000 0000',
  location = 'Nigeria',
  summary = 'Experienced Full Stack Developer with expertise in React, Node.js, and modern web technologies.'
WHERE id = 1;
