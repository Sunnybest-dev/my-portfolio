-- Add SEO settings table for managing site-wide SEO and domain configuration
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh Portfolio',
  domain_url TEXT NOT NULL DEFAULT 'https://yourdomain.com',
  default_title TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh - Full Stack Developer',
  default_description TEXT NOT NULL DEFAULT 'Professional portfolio of Sunday Daniel Aniedeh. Expert in React, Node.js, Django and modern web development.',
  default_keywords TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, Web Development',
  author_name TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh',
  og_image_url TEXT DEFAULT '/og-image.jpg',
  twitter_handle TEXT DEFAULT '@yourusername',
  google_analytics_id TEXT DEFAULT '',
  google_site_verification TEXT DEFAULT '',
  theme_color TEXT DEFAULT '#000000',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Public read, authenticated write
CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Auth update seo_settings" ON seo_settings FOR ALL USING (auth.role() = 'authenticated');

-- Insert default row if table is empty
INSERT INTO seo_settings (site_name, domain_url, default_title) 
SELECT 'Sunday Daniel Aniedeh Portfolio', 'https://yourdomain.com', 'Sunday Daniel Aniedeh - Full Stack Developer'
WHERE NOT EXISTS (SELECT 1 FROM seo_settings LIMIT 1);
