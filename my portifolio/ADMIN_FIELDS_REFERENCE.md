# Admin Panel - SEO & Domain Fields Reference

## Visual Layout of Admin Panel

```
┌─────────────────────────────────────────────────────────────────┐
│  Admin Panel - SEO & Domain Settings                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🌐 Domain & Site Info                                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Site Name                                                   │ │
│  │ [Sunday Daniel Aniedeh Portfolio                         ] │ │
│  │                                                             │ │
│  │ Domain URL (Production)                                     │ │
│  │ [https://yourdomain.com                                  ] │ │
│  │ ⚠️ Update this with your actual domain after deployment    │ │
│  │                                                             │ │
│  │ Author Name                                                 │ │
│  │ [Sunday Daniel Aniedeh                                   ] │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  🔍 SEO Meta Tags                                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Default Page Title                                          │ │
│  │ [Sunday Daniel Aniedeh - Full Stack Developer           ] │ │
│  │ Appears in browser tabs and search results                 │ │
│  │                                                             │ │
│  │ Default Meta Description                                    │ │
│  │ [Professional portfolio of Sunday Daniel Aniedeh.       ] │ │
│  │ [Expert in React, Node.js, Django and modern web        ] │ │
│  │ [development.                                            ] │ │
│  │ Shown in search engine results                             │ │
│  │                                                             │ │
│  │ Keywords (comma-separated)                                  │ │
│  │ [Sunday Daniel Aniedeh, Full Stack Developer,           ] │ │
│  │ [React Developer, Node.js, Web Development              ] │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  📱 Social Media                                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Open Graph Image URL                                        │ │
│  │ [/og-image.jpg                                           ] │ │
│  │ Image shown when sharing on social media (1200x630px)      │ │
│  │                                                             │ │
│  │ Twitter Handle                                              │ │
│  │ [@yourusername                                           ] │ │
│  │                                                             │ │
│  │ Theme Color (for mobile browsers)                           │ │
│  │ [■] #000000                                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  📊 Analytics & Verification                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Google Analytics ID (optional)                              │ │
│  │ [G-XXXXXXXXXX                                            ] │ │
│  │                                                             │ │
│  │ Google Site Verification Code (optional)                    │ │
│  │ [verification_code_here                                  ] │ │
│  │ From Google Search Console                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [ Save SEO Settings ]                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Field-by-Field Guide

### 🌐 Domain & Site Info

#### 1. Site Name
```
Field: Site Name
Type: Text input
Example: "Sunday Daniel Aniedeh Portfolio"
Purpose: Used in Open Graph tags and site metadata
When to update: Before first deployment
```

#### 2. Domain URL
```
Field: Domain URL (Production)
Type: Text input
Example: "https://yourdomain.com"
Purpose: Base URL for canonical links and OG tags
When to update: IMMEDIATELY after deployment
⚠️ CRITICAL: Must be updated with actual domain
Format: Include https://, no trailing slash
```

#### 3. Author Name
```
Field: Author Name
Type: Text input
Example: "Sunday Daniel Aniedeh"
Purpose: Used in meta tags and schema.org markup
When to update: Before first deployment
```

---

### 🔍 SEO Meta Tags

#### 4. Default Page Title
```
Field: Default Page Title
Type: Text input
Length: 50-60 characters recommended
Example: "Sunday Daniel Aniedeh - Full Stack Developer"
Purpose: Appears in browser tabs and search results
Format: "Your Name - Your Title"
When to update: Before first deployment
```

#### 5. Default Meta Description
```
Field: Default Meta Description
Type: Textarea (3 rows)
Length: 150-160 characters recommended
Example: "Professional portfolio of Sunday Daniel Aniedeh. 
         Expert in React, Node.js, Django and modern web 
         development. Building scalable applications."
Purpose: Shown in search engine results
Tips: Include key skills, location, and value proposition
When to update: Before first deployment
```

#### 6. Keywords
```
Field: Keywords (comma-separated)
Type: Textarea (2 rows)
Format: Comma-separated list
Example: "Sunday Daniel Aniedeh, Full Stack Developer, 
         React Developer, Node.js, Web Development, 
         JavaScript, TypeScript, Python, Django"
Purpose: Help search engines understand your content
Tips: Include your name, skills, technologies, location
When to update: Before first deployment
```

---

### 📱 Social Media

#### 7. Open Graph Image URL
```
Field: Open Graph Image URL
Type: Text input
Example: "/og-image.jpg" or "https://example.com/og-image.jpg"
Purpose: Image shown when sharing on social media
Requirements:
  - Size: 1200 x 630 pixels
  - Format: JPG or PNG
  - Content: Your name, title, photo (optional)
Location: Save in public/ folder
When to update: Before first deployment
```

#### 8. Twitter Handle
```
Field: Twitter Handle
Type: Text input
Format: @username
Example: "@yourusername"
Purpose: Twitter attribution when shared
When to update: Before first deployment
Optional: Yes (but recommended if you have Twitter)
```

#### 9. Theme Color
```
Field: Theme Color (for mobile browsers)
Type: Color picker
Default: #000000 (black)
Example: #000000, #1a1a1a, #your-brand-color
Purpose: Colors mobile browser chrome/address bar
When to update: Before first deployment (optional)
```

---

### 📊 Analytics & Verification

#### 10. Google Analytics ID
```
Field: Google Analytics ID (optional)
Type: Text input
Format: G-XXXXXXXXXX (GA4) or UA-XXXXXXXXX-X (Universal)
Example: "G-ABC123XYZ"
Purpose: Track website visitors and behavior
Where to get: Google Analytics Dashboard
When to update: After deployment (optional)
Steps:
  1. Create Google Analytics account
  2. Create new property
  3. Copy Measurement ID
  4. Paste here
  5. Save
```

#### 11. Google Site Verification Code
```
Field: Google Site Verification Code (optional)
Type: Text input
Format: Just the code, not the full meta tag
Example: "abc123xyz456"
Purpose: Verify site ownership in Google Search Console
Where to get: Google Search Console
When to update: After deployment (optional)
Steps:
  1. Add site to Search Console
  2. Choose "HTML tag" verification
  3. Copy only the content value
  4. Paste here
  5. Save
  6. Return to Search Console and verify
```

---

## Example: Complete Configuration

```yaml
# Domain & Site Info
Site Name: "Sunday Daniel Aniedeh Portfolio"
Domain URL: "https://sundayaniedeh.com"
Author Name: "Sunday Daniel Aniedeh"

# SEO Meta Tags
Default Title: "Sunday Daniel Aniedeh - Full Stack Developer & Software Engineer"
Meta Description: "Professional Full Stack Developer specializing in React, Node.js, and Django. Based in Nigeria, building scalable web applications and innovative digital solutions."
Keywords: "Sunday Daniel Aniedeh, Full Stack Developer Nigeria, React Developer, Node.js Expert, JavaScript Developer, TypeScript, Python, Django, Web Development, Software Engineer"

# Social Media
OG Image URL: "/og-image.jpg"
Twitter Handle: "@sundayaniedeh"
Theme Color: "#000000"

# Analytics & Verification
Google Analytics ID: "G-ABC123XYZ"
Site Verification: "abc123xyz456def789"
```

---

## Field Priority Guide

### Must Fill Before Deployment ⚠️
1. Site Name
2. Domain URL (can use placeholder, update after)
3. Author Name
4. Default Title
5. Meta Description
6. Keywords
7. OG Image URL

### Must Update After Deployment 🚨
1. Domain URL (CRITICAL!)

### Optional (Can Add Later) ✅
1. Google Analytics ID
2. Site Verification Code
3. Twitter Handle (if you have Twitter)
4. Theme Color (if you want custom color)

---

## Character Limits & Best Practices

| Field | Min | Max | Optimal | Notes |
|-------|-----|-----|---------|-------|
| Site Name | 10 | 60 | 30-40 | Keep concise |
| Domain URL | - | - | - | Must be valid URL |
| Author Name | 5 | 50 | 15-30 | Your full name |
| Default Title | 30 | 70 | 50-60 | Include name + title |
| Meta Description | 120 | 160 | 150-160 | Full sentences |
| Keywords | - | 500 | 100-200 | 10-15 keywords |
| OG Image URL | - | - | - | Must be accessible |
| Twitter Handle | 4 | 15 | - | Include @ symbol |
| Analytics ID | - | - | - | Exact format required |
| Verification | - | - | - | Exact code required |

---

## Validation Rules

### Domain URL
- ✅ Must start with `https://` or `http://`
- ✅ No trailing slash
- ✅ Must be valid domain
- ❌ Don't include paths (e.g., /home)

### Default Title
- ✅ 50-60 characters
- ✅ Include your name
- ✅ Include your role/title
- ❌ Don't use all caps
- ❌ Don't stuff keywords

### Meta Description
- ✅ 150-160 characters
- ✅ Complete sentences
- ✅ Include key skills
- ✅ Include location (optional)
- ❌ Don't duplicate title
- ❌ Don't stuff keywords

### Keywords
- ✅ Comma-separated
- ✅ Relevant to your work
- ✅ Include variations
- ❌ Don't repeat excessively
- ❌ Don't use irrelevant terms

### OG Image URL
- ✅ 1200x630 pixels
- ✅ JPG or PNG format
- ✅ Under 1MB file size
- ✅ Publicly accessible
- ❌ Don't use relative paths if external

### Google Analytics ID
- ✅ Format: G-XXXXXXXXXX (GA4)
- ✅ Format: UA-XXXXXXXXX-X (Universal)
- ❌ Don't include quotes or spaces

---

## Quick Copy-Paste Templates

### Template 1: Developer Portfolio
```
Site Name: [Your Name] Portfolio
Domain URL: https://yourname.com
Author Name: [Your Full Name]
Default Title: [Your Name] - Full Stack Developer
Meta Description: Professional Full Stack Developer specializing in [Tech1], [Tech2], and [Tech3]. Building scalable web applications and innovative solutions.
Keywords: [Your Name], Full Stack Developer, [Tech1], [Tech2], [Tech3], Web Development, Software Engineer
```

### Template 2: Designer Portfolio
```
Site Name: [Your Name] Design Portfolio
Domain URL: https://yourname.design
Author Name: [Your Full Name]
Default Title: [Your Name] - UI/UX Designer & Creative
Meta Description: Creative UI/UX Designer crafting beautiful, user-centered digital experiences. Specializing in web design, mobile apps, and brand identity.
Keywords: [Your Name], UI Designer, UX Designer, Web Design, Mobile Design, Creative Designer
```

### Template 3: Freelancer Portfolio
```
Site Name: [Your Name] - Freelance Developer
Domain URL: https://yourname.dev
Author Name: [Your Full Name]
Default Title: [Your Name] - Freelance Web Developer
Meta Description: Experienced freelance web developer available for hire. Specializing in [Tech1], [Tech2]. Building custom solutions for businesses worldwide.
Keywords: [Your Name], Freelance Developer, [Tech1], [Tech2], Hire Developer, Web Development Services
```

---

## Testing Your Configuration

After saving, test these:

1. **Title Test**
   - Open your site
   - Check browser tab title
   - Should show your Default Title

2. **Description Test**
   - Google your site (after indexed)
   - Check search result description
   - Should show your Meta Description

3. **Social Media Test**
   - Go to: https://www.opengraph.xyz/
   - Enter your domain
   - Check OG image and description appear

4. **Mobile Test**
   - Open site on mobile
   - Check address bar color
   - Should match your Theme Color

5. **Analytics Test**
   - Visit your site
   - Check Google Analytics Real-Time
   - Should see your visit

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for troubleshooting!
