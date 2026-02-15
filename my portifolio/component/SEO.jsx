import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../src/context/SiteContentContext';

export default function SEO({ 
  title = 'Sunday Daniel Aniedeh - Full Stack Developer',
  description = 'Professional portfolio of Sunday Daniel Aniedeh. Expert in React, Node.js, Django and modern web development. Building scalable applications and innovative solutions.',
  keywords = 'Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, Web Development, Portfolio, JavaScript',
  ogImage = '/og-image.jpg',
  author = 'Sunday Daniel Aniedeh'
}) {
  const location = useLocation();
  const { home, about, contact } = useSiteContent();
  const canonicalUrl = `https://yourdomain.com${location.pathname}`;

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
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'revisit-after', content: '7 days' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Sunday Daniel Aniedeh Portfolio' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      
      // Additional
      { name: 'theme-color', content: '#000000' },
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
      "name": author,
      "jobTitle": "Full Stack Developer",
      "url": canonicalUrl,
      "sameAs": socialLinks.length > 0 ? socialLinks : undefined,
      "knowsAbout": ["Web Development", "React", "Node.js", "JavaScript", "TypeScript"],
      "description": description
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }, [title, description, keywords, ogImage, canonicalUrl, author, socialLinks]);

  return null;
}
