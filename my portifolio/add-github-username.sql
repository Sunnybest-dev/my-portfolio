-- Add github_username to about_content table
ALTER TABLE about_content ADD COLUMN IF NOT EXISTS github_username TEXT DEFAULT 'yourusername';

-- Update with default value
UPDATE about_content SET github_username = 'yourusername' WHERE id = 1;
