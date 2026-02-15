# Portfolio Setup Guide

## Supabase Configuration

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

### 2. Update Environment Variables
Edit `.env` file:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run SQL Setup
1. Go to Supabase SQL Editor
2. Copy all content from `supabase-setup.sql`
3. Run the SQL to create tables and insert default data

### 4. Start Development Server
```bash
npm run dev
```

## Content Management

All content is now editable from Supabase:

### Tables:
- **home_content** - Hero section, stats, tech stack
- **about_content** - About page content, skills, experience
- **projects_content** - Projects list and CTA
- **contact_content** - Contact info and form settings
- **navbar_content** - Logo and navigation links
- **contact_messages** - Form submissions

### Editing Content:
1. Go to Supabase Table Editor
2. Select the table you want to edit
3. Click on the row to edit
4. Save changes
5. Refresh your website to see updates

## Features
- ✅ All text editable from Supabase
- ✅ Contact form saves to database
- ✅ Projects dynamically loaded
- ✅ Skills and experience editable
- ✅ Social links configurable
- ✅ Navbar links editable
- ✅ Fallback to defaults if Supabase unavailable
