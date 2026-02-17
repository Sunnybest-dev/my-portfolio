# URGENT: Fix SEO & Domain Loading Issue

## The Problem
The SEO & Domain section keeps loading because the database table doesn't exist yet.

## The Solution (2 minutes)

### Step 1: Run the SQL Migration

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Paste This SQL**
   ```sql
   -- Add SEO settings table
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

   -- Insert default row
   INSERT INTO seo_settings (site_name, domain_url, default_title) 
   SELECT 'Sunday Daniel Aniedeh Portfolio', 'https://yourdomain.com', 'Sunday Daniel Aniedeh - Full Stack Developer'
   WHERE NOT EXISTS (SELECT 1 FROM seo_settings LIMIT 1);
   ```

4. **Click "Run"**
   - You should see: "Success. No rows returned"

5. **Refresh Your Admin Panel**
   - Go back to your admin panel
   - Click "SEO & Domain" again
   - It should now load! ✅

---

## Alternative: Use the SQL File

If you prefer, you can also:

1. Open the file: `add-seo-settings.sql` in your project
2. Copy all the contents
3. Paste into Supabase SQL Editor
4. Click "Run"

---

## Verify It Worked

After running the SQL:

1. Go to Supabase Dashboard
2. Click "Table Editor"
3. You should see a new table called `seo_settings`
4. It should have 1 row with default values

---

## Now You Can Use It!

Once the table is created:

1. Go to `/admin` or `/admin/dashboard`
2. Click "SEO & Domain"
3. Fill in your details
4. Click "Save SEO Settings"
5. Done! ✅

---

## If You Still Have Issues

1. **Check browser console** (F12) for errors
2. **Verify Supabase connection** - other tabs should work
3. **Clear browser cache** (Ctrl+Shift+R)
4. **Check the table exists** in Supabase Table Editor

---

**That's it!** The loading issue should be fixed now. 🎉
