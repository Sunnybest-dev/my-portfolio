# Admin Panel - SEO & Domain Quick Reference

## 🎯 Quick Access

**Admin Panel URL**: `/admin`  
**SEO Settings**: Admin Panel → SEO & Domain (sidebar)

---

## 📝 Fields to Update Before Deployment

### Must Update After Deployment ⚠️

| Field | Example | When to Update |
|-------|---------|----------------|
| **Domain URL** | `https://yourdomain.com` | Immediately after deployment |
| **Site Name** | "Your Name Portfolio" | Before deployment |
| **Author Name** | "Your Full Name" | Before deployment |

### SEO Essentials

| Field | Character Limit | Best Practice |
|-------|----------------|---------------|
| **Default Title** | 50-60 chars | "Your Name - Job Title" |
| **Meta Description** | 150-160 chars | Include skills + location |
| **Keywords** | No limit | Comma-separated, 10-15 keywords |

### Social Media

| Field | Format | Purpose |
|-------|--------|---------|
| **OG Image URL** | `/og-image.jpg` or full URL | Social media preview (1200x630px) |
| **Twitter Handle** | `@username` | Twitter attribution |
| **Theme Color** | `#000000` | Mobile browser chrome color |

### Analytics (Optional)

| Field | Format | Where to Get |
|-------|--------|--------------|
| **Google Analytics ID** | `G-XXXXXXXXXX` | Google Analytics Dashboard |
| **Site Verification** | `verification_code` | Google Search Console |

---

## 🚀 Deployment Workflow

1. **Before Deployment**
   ```
   ✓ Run add-seo-settings.sql in Supabase
   ✓ Configure all SEO fields in admin panel
   ✓ Upload OG image to /public/
   ✓ Test locally
   ```

2. **Deploy**
   ```
   ✓ Deploy to Vercel/Netlify/GitHub Pages
   ✓ Configure environment variables
   ✓ Add custom domain
   ```

3. **After Deployment**
   ```
   ✓ Update Domain URL in admin panel
   ✓ Test all pages
   ✓ Submit sitemap to Google
   ✓ Verify in Search Console
   ```

---

## 🔧 Common Tasks

### Update Domain After Deployment
1. Go to `/admin`
2. Click "SEO & Domain"
3. Update "Domain URL" field
4. Click "Save SEO Settings"

### Add Google Analytics
1. Create GA4 property
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Paste in "Google Analytics ID" field
4. Save

### Verify with Google
1. Go to Google Search Console
2. Add property
3. Copy verification code
4. Paste in "Google Site Verification" field
5. Save
6. Return to Search Console and verify

### Update OG Image
1. Create 1200x630px image
2. Save as `/public/og-image.jpg`
3. Or upload to image host
4. Update "Open Graph Image URL" field
5. Save
6. Test at opengraph.xyz

---

## ✅ Pre-Launch Checklist

- [ ] SEO settings table created in Supabase
- [ ] All required fields filled in admin panel
- [ ] OG image uploaded and URL configured
- [ ] Domain URL set to production URL
- [ ] Google Analytics ID added (if using)
- [ ] Tested on mobile and desktop
- [ ] All social links working
- [ ] Contact form tested

---

## 📊 Post-Launch Checklist

- [ ] Domain URL updated in admin panel
- [ ] Sitemap submitted to Google
- [ ] Site verified in Search Console
- [ ] Google Analytics tracking verified
- [ ] Social media preview tested
- [ ] Page speed tested (PageSpeed Insights)
- [ ] Mobile responsiveness verified
- [ ] All pages indexed by Google

---

## 🆘 Troubleshooting

**Changes not showing?**
- Clear browser cache (Ctrl+Shift+R)
- Check if changes were saved
- Wait a few minutes for CDN to update

**Social preview not working?**
- Verify OG image URL is absolute
- Check image is 1200x630px
- Use Facebook Debugger to refresh cache
- Ensure image is publicly accessible

**Analytics not tracking?**
- Verify Measurement ID format
- Check browser console for errors
- Disable ad blockers for testing
- Wait 24-48 hours for data

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Google Search Console**: https://search.google.com/search-console
- **OG Debugger**: https://www.opengraph.xyz/

---

**Last Updated**: 2024
**Version**: 1.0
