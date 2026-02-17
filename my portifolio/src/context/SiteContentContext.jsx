import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SiteContentContext = createContext();

const defaultContent = {
  home: {
    hero_title: 'ESTHER SUNDAY',
    hero_subtitle: 'Full Stack Developer | UI/UX Designer | Creative Thinker',
    cta_primary_text: 'View My Work',
    cta_primary_href: '/projects',
    cta_secondary_text: 'Get In Touch',
    cta_secondary_href: '/contact',
    profile_image_url: '/profile.jpg',
    profile_image_hover_url: '/profile2.jpg',
    profile_alt: 'Esther Sunday',
    preloader_text: 'ESTHER SUNDAY',
    about_text: "I'm a passionate Full Stack Developer specializing in creating beautiful, functional, and user-centered digital experiences.",
    tech_stack: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'AWS'],
    stats: [
      { value: '50+', label: 'Projects Completed' },
      { value: '5+', label: 'Years Experience' },
      { value: '30+', label: 'Happy Clients' }
    ]
  },
  about: {
    subtitle: 'Get To Know Me',
    title: 'About Me',
    experience_value: '5+',
    experience_label: 'Years Of Experience',
    experience_items: ['Full Stack Development', 'UI/UX Design', 'Cloud Architecture'],
    main_heading: 'Building Digital Solutions That Matter',
    main_description: "I'm a dedicated developer with a passion for creating seamless digital experiences.",
    service_cards: [
      { emoji: '💻', title: 'Development', description: 'Full-stack web applications' },
      { emoji: '🎨', title: 'Design', description: 'Beautiful UI/UX interfaces' },
      { emoji: '☁️', title: 'Cloud', description: 'Scalable cloud solutions' },
      { emoji: '🚀', title: 'Performance', description: 'Optimized applications' }
    ],
    skills_heading: 'Technical Skills',
    skills_sections: [
      { title: 'Frontend', color: 'text-pink-500', skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Redux & Context API'] },
      { title: 'Backend', color: 'text-pink-500', skills: ['Node.js & Express', 'Python & Django', 'RESTful APIs', 'GraphQL'] },
      { title: 'Database & Cloud', color: 'text-pink-500', skills: ['MongoDB & PostgreSQL', 'AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines'] }
    ],
    connect_heading: "Let's Connect",
    social_platforms: ['GitHub', 'LinkedIn', 'Twitter', 'Medium', 'Dev.to', 'Stack Overflow']
  },
  projects: {
    subtitle: 'My Work',
    title: 'Featured Projects',
    description: 'A collection of projects that showcase my skills and passion for creating innovative solutions',
    projects: [],
    cta_heading: 'Have a Project in Mind?',
    cta_description: "Let's collaborate and bring your ideas to life.",
    cta_button_text: 'Start a Project',
    cta_button_href: '/contact'
  },
  contact: {
    subtitle: 'Get In Touch',
    title: "Let's Work Together",
    intro_text: "Have a project in mind or just want to chat? Drop me a message.",
    form_heading: 'Send a Message',
    submit_button_text: 'Send Message',
    follow_heading: 'Follow Me',
    contact_cards: [
      { emoji: '📧', title: 'Email', value: 'esther.sunday@example.com' },
      { emoji: '📱', title: 'Phone', value: '+234 (0) 123 456 7890' },
      { emoji: '📍', title: 'Location', value: 'Lagos, Nigeria' }
    ],
    social_links: [
      { label: 'GitHub', url: '#' },
      { label: 'LinkedIn', url: '#' },
      { label: 'Twitter', url: '#' }
    ]
  },
  navbar: {
    logo_text: 'ES',
    nav_links: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' }
    ]
  },
  seoSettings: {
    site_name: 'Sunday Daniel Aniedeh Portfolio',
    domain_url: 'https://yourdomain.com',
    default_title: 'Sunday Daniel Aniedeh - Full Stack Developer',
    default_description: 'Professional portfolio of Sunday Daniel Aniedeh. Expert in React, Node.js, Django and modern web development.',
    default_keywords: 'Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, Web Development',
    author_name: 'Sunday Daniel Aniedeh',
    og_image_url: '/og-image.jpg',
    twitter_handle: '@yourusername',
    google_analytics_id: '',
    google_site_verification: '',
    theme_color: '#000000'
  }
};

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
    
    // Listen for storage events to refresh when admin saves
    const handleStorageChange = () => fetchAllContent();
    window.addEventListener('storage', handleStorageChange);
    
    // Refresh content every 10 seconds
    const interval = setInterval(fetchAllContent, 10000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  async function fetchAllContent() {
    try {
      const [homeRes, aboutRes, projectsRes, contactRes, navbarRes] = await Promise.all([
        supabase.from('home_content').select('*').single(),
        supabase.from('about_content').select('*').single(),
        supabase.from('projects_content').select('*').single(),
        supabase.from('contact_content').select('*').single(),
        supabase.from('navbar_content').select('*').single()
      ]);

      const seoRes = await supabase.from('seo_settings').select('*').single();

      setContent({
        home: homeRes.data || defaultContent.home,
        about: aboutRes.data || defaultContent.about,
        projects: projectsRes.data || defaultContent.projects,
        contact: contactRes.data || defaultContent.contact,
        navbar: navbarRes.data || defaultContent.navbar,
        seoSettings: seoRes.data || defaultContent.seoSettings
      });
    } catch (error) {
      console.log('Using default content:', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteContentContext.Provider value={{ ...content, loading, refresh: fetchAllContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
