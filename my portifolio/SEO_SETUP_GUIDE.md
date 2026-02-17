# Complete SEO Setup Guide

## Step 1: Run SQL in Supabase

Go to Supabase Dashboard → SQL Editor → New Query and run:

```sql
-- Add SEO settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh Portfolio',
  domain_url TEXT NOT NULL DEFAULT 'https://sunnybest.ulishalimited.com',
  default_title TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh - Full Stack Developer',
  default_description TEXT NOT NULL DEFAULT 'Professional portfolio of Sunday Daniel Aniedeh. Expert in React, Node.js, Django and modern web development.',
  default_keywords TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, Web Development',
  author_name TEXT NOT NULL DEFAULT 'Sunday Daniel Aniedeh',
  og_image_url TEXT DEFAULT 'https://sunnybest.ulishalimited.com/og-image.jpg',
  twitter_handle TEXT DEFAULT '@sunnybest',
  google_analytics_id TEXT DEFAULT '',
  google_site_verification TEXT DEFAULT '',
  theme_color TEXT DEFAULT '#000000',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Public read, authenticated write
DROP POLICY IF EXISTS "Public read seo_settings" ON seo_settings;
DROP POLICY IF EXISTS "Auth update seo_settings" ON seo_settings;

CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Auth read seo_settings" ON seo_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth update seo_settings" ON seo_settings FOR ALL TO authenticated USING (true);

-- Insert default row
INSERT INTO seo_settings (site_name, domain_url, default_title) 
SELECT 'Sunday Daniel Aniedeh Portfolio', 'https://sunnybest.ulishalimited.com', 'Sunday Daniel Aniedeh - Full Stack Developer'
WHERE NOT EXISTS (SELECT 1 FROM seo_settings LIMIT 1);
```

## Step 2: Update SEO Settings in Admin Dashboard

1. Go to https://sunnybest.ulishalimited.com/admin/login
2. Login with your credentials
3. Click on "SEO & Domain" tab
4. Fill in these fields:

### Required Fields:
- **Site Name**: Sunday Daniel Aniedeh Portfolio
- **Domain URL**: https://sunnybest.ulishalimited.com
- **Default Title**: Sunday Daniel Aniedeh - Full Stack Developer & Software Engineer
- **Default Description**: Professional Full Stack Developer specializing in React, Node.js, JavaScript, TypeScript, Python, and Django. Building scalable web applications and innovative digital solutions.
- **Default Keywords**: Sunday Daniel Aniedeh, Sunday Aniedeh, Full Stack Developer Nigeria, React Developer, Node.js Developer, JavaScript Expert, Web Developer Nigeria
- **Author Name**: Sunday Daniel Aniedeh

### Optional Fields:
- **OG Image URL**: https://sunnybest.ulishalimited.com/profile.jpg (or your image URL)
- **Twitter Handle**: @yourusername
- **Theme Color**: #ca8a04 (yellow-600)

### Analytics (Optional):
- **Google Analytics ID**: Get from https://analytics.google.com
  - Format: G-XXXXXXXXXX or UA-XXXXXXXXX-X
- **Google Site Verification**: Get from https://search.google.com/search-console
  - Format: Long string of characters

## Step 3: Create OG Image (Social Media Preview)

1. Create an image (1200x630px recommended)
2. Name it `og-image.jpg`
3. Place it in `my portifolio/public/` folder
4. Or upload to image hosting and use the URL

## Step 4: Update Favicon

Replace `/vite.svg` in `index.html` with your own favicon:
1. Create a favicon (32x32px or 64x64px)
2. Save as `favicon.ico` or `favicon.png`
3. Place in `my portifolio/public/` folder
4. Update index.html: `<link rel="icon" href="/favicon.ico" />`

## Step 5: Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add property: https://sunnybest.ulishalimited.com
3. Choose "HTML tag" verification method
4. Copy the verification code (content value)
5. Paste in Admin Dashboard → SEO Settings → Google Site Verification
6. Save and verify in Google Search Console

## Step 6: Google Analytics Setup (Optional)

1. Go to https://analytics.google.com
2. Create account and property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Paste in Admin Dashboard → SEO Settings → Google Analytics ID
5. Save

## Step 7: Submit Sitemap to Google

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sunnybest.ulishalimited.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sunnybest.ulishalimited.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sunnybest.ulishalimited.com/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sunnybest.ulishalimited.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sunnybest.ulishalimited.com/resume</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

Submit to Google: https://search.google.com/search-console → Sitemaps → Add sitemap URL

## Step 8: Create robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://sunnybest.ulishalimited.com/sitemap.xml
```

## Step 9: Test SEO

1. **Open Graph Test**: https://www.opengraph.xyz/url/https://sunnybest.ulishalimited.com
2. **Twitter Card Test**: https://cards-dev.twitter.com/validator
3. **Google Rich Results**: https://search.google.com/test/rich-results
4. **PageSpeed Insights**: https://pagespeed.web.dev/

## Step 10: Monitor

- Google Search Console: Track search performance
- Google Analytics: Track visitor behavior
- Check rankings for: "Sunday Daniel Aniedeh", "Sunday Aniedeh developer"

## SEO is now fully configured! 🎉
