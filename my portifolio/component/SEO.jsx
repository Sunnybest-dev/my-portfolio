import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../src/context/SiteContentContext';
import { supabase } from '../src/supabaseClient';

export default function SEO({ 
  title,
  description,
  keywords,
  ogImage,
  author
}) {
  const location = useLocation();
  const { home, about, contact } = useSiteContent();
  const [seoSettings, setSeoSettings] = useState(null);

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      const { data } = await supabase.from('seo_settings').select('*').single();
      if (data) setSeoSettings(data);
    } catch (err) {
      console.log('Using default SEO settings');
    }
  };

  // Use database settings as defaults if not provided
  const finalTitle = title || seoSettings?.default_title || 'Sunday Daniel Aniedeh - Full Stack Developer';
  const finalDescription = description || seoSettings?.default_description || 'Professional portfolio of Sunday Daniel Aniedeh. Expert in React, Node.js, Django and modern web development.';
  const finalKeywords = keywords || seoSettings?.default_keywords || 'Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, Web Development';
  const finalOgImage = ogImage || seoSettings?.og_image_url || '/og-image.jpg';
  const finalAuthor = author || seoSettings?.author_name || 'Sunday Daniel Aniedeh';
  const domainUrl = seoSettings?.domain_url || 'https://yourdomain.com';
  const siteName = seoSettings?.site_name || 'Sunday Daniel Aniedeh Portfolio';
  const canonicalUrl = `${domainUrl}${location.pathname}`;

  // Extract social media links from content
  const socialLinks = [];
  
  if (Array.isArray(contact.social_links)) {
    contact.social_links.forEach(link => {
      if (link.url) socialLinks.push(link.url);
    });
  }
  
  if (Array.isArray(about.social_platforms)) {
    about.social_platforms.forEach(platform => {
      if (platform.includes('http')) socialLinks.push(platform);
    });
  }

  useEffect(() => {
    document.title = finalTitle;
    
    const metaTags = [
      { name: 'description', content: finalDescription },
      { name: 'keywords', content: finalKeywords },
      { name: 'author', content: finalAuthor },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'revisit-after', content: '7 days' },
      
      // Open Graph
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:image', content: finalOgImage },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: finalOgImage },
      { name: 'twitter:site', content: seoSettings?.twitter_handle || '@yourusername' },
      
      // Additional
      { name: 'theme-color', content: seoSettings?.theme_color || '#000000' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      let meta = document.querySelector(`meta[${attr}="${value}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, value);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": finalAuthor,
      "jobTitle": "Full Stack Developer",
      "url": canonicalUrl,
      "sameAs": socialLinks.length > 0 ? socialLinks : undefined,
      "knowsAbout": ["Web Development", "React", "Node.js", "JavaScript", "TypeScript"],
      "description": finalDescription
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    // Google Analytics
    if (seoSettings?.google_analytics_id) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seoSettings.google_analytics_id}`;
      if (!document.querySelector(`script[src="${gaScript.src}"]`)) {
        document.head.appendChild(gaScript);
      }

      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', seoSettings.google_analytics_id);
    }

    // Google Site Verification
    if (seoSettings?.google_site_verification) {
      let verificationMeta = document.querySelector('meta[name="google-site-verification"]');
      if (!verificationMeta) {
        verificationMeta = document.createElement('meta');
        verificationMeta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(verificationMeta);
      }
      verificationMeta.setAttribute('content', seoSettings.google_site_verification);
    }
  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, canonicalUrl, finalAuthor, socialLinks, seoSettings]);

  return null;
}
