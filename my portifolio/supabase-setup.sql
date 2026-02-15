-- ============================================
-- COMPLETE SUPABASE DATABASE SETUP
-- ============================================

-- 1. Contact Messages Table
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Home Page Content
CREATE TABLE home_content (
  id BIGSERIAL PRIMARY KEY,
  hero_title TEXT,
  hero_subtitle TEXT,
  cta_primary_text TEXT,
  cta_primary_href TEXT,
  cta_secondary_text TEXT,
  cta_secondary_href TEXT,
  profile_image_url TEXT,
  profile_image_hover_url TEXT,
  profile_alt TEXT,
  about_text TEXT,
  tech_stack JSONB,
  stats JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. About Page Content
CREATE TABLE about_content (
  id BIGSERIAL PRIMARY KEY,
  subtitle TEXT,
  title TEXT,
  intro_text TEXT,
  experience_value TEXT,
  experience_label TEXT,
  experience_items JSONB,
  main_heading TEXT,
  main_description TEXT,
  service_cards JSONB,
  skills_heading TEXT,
  skills_sections JSONB,
  connect_heading TEXT,
  social_platforms JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects Page Content
CREATE TABLE projects_content (
  id BIGSERIAL PRIMARY KEY,
  subtitle TEXT,
  title TEXT,
  description TEXT,
  projects JSONB,
  cta_heading TEXT,
  cta_description TEXT,
  cta_button_text TEXT,
  cta_button_href TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Contact Page Content
CREATE TABLE contact_content (
  id BIGSERIAL PRIMARY KEY,
  subtitle TEXT,
  title TEXT,
  intro_text TEXT,
  form_heading TEXT,
  submit_button_text TEXT,
  follow_heading TEXT,
  contact_cards JSONB,
  social_links JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Navbar Content
CREATE TABLE navbar_content (
  id BIGSERIAL PRIMARY KEY,
  logo_text TEXT,
  nav_links JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Home Content
INSERT INTO home_content (
  hero_title,
  hero_subtitle,
  cta_primary_text,
  cta_primary_href,
  cta_secondary_text,
  cta_secondary_href,
  profile_image_url,
  profile_image_hover_url,
  profile_alt,
  about_text,
  tech_stack,
  stats
) VALUES (
  'ESTHER SUNDAY',
  'Full Stack Developer | UI/UX Designer | Creative Thinker',
  'View My Work',
  '/projects',
  'Get In Touch',
  '/contact',
  '/profile.jpg',
  '/profile2.jpg',
  'Esther Sunday',
  'I''m a passionate Full Stack Developer specializing in creating beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies, I transform ideas into innovative solutions that make a difference.',
  '["React", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]'::jsonb,
  '[
    {"value": "50+", "label": "Projects Completed"},
    {"value": "5+", "label": "Years Experience"},
    {"value": "30+", "label": "Happy Clients"}
  ]'::jsonb
);

-- About Content
INSERT INTO about_content (
  subtitle,
  title,
  intro_text,
  experience_value,
  experience_label,
  experience_items,
  main_heading,
  main_description,
  service_cards,
  skills_heading,
  skills_sections,
  connect_heading,
  social_platforms
) VALUES (
  'Get To Know Me',
  'About Me',
  'Passionate developer creating innovative solutions',
  '5+',
  'Years Of Experience',
  '["Full Stack Development", "UI/UX Design", "Cloud Architecture"]'::jsonb,
  'Building Digital Solutions That Matter',
  'I''m a dedicated developer with a passion for creating seamless digital experiences. My journey in tech has equipped me with expertise in modern web technologies, cloud solutions, and user-centered design principles. I believe in writing clean, maintainable code and building applications that not only look great but also solve real-world problems efficiently.',
  '[
    {"emoji": "💻", "title": "Development", "description": "Full-stack web applications"},
    {"emoji": "🎨", "title": "Design", "description": "Beautiful UI/UX interfaces"},
    {"emoji": "☁️", "title": "Cloud", "description": "Scalable cloud solutions"},
    {"emoji": "🚀", "title": "Performance", "description": "Optimized applications"}
  ]'::jsonb,
  'Technical Skills',
  '[
    {
      "title": "Frontend",
      "color": "text-pink-500",
      "skills": ["React & Next.js", "TypeScript", "Tailwind CSS", "Redux & Context API"]
    },
    {
      "title": "Backend",
      "color": "text-pink-500",
      "skills": ["Node.js & Express", "Python & Django", "RESTful APIs", "GraphQL"]
    },
    {
      "title": "Database & Cloud",
      "color": "text-pink-500",
      "skills": ["MongoDB & PostgreSQL", "AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines"]
    }
  ]'::jsonb,
  'Let''s Connect',
  '["GitHub", "LinkedIn", "Twitter", "Medium", "Dev.to", "Stack Overflow"]'::jsonb
);

-- Projects Content
INSERT INTO projects_content (
  subtitle,
  title,
  description,
  projects,
  cta_heading,
  cta_description,
  cta_button_text,
  cta_button_href
) VALUES (
  'My Work',
  'Featured Projects',
  'A collection of projects that showcase my skills and passion for creating innovative solutions',
  '[
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "Full-stack online shopping platform with payment integration",
      "tech": ["React", "Node.js", "MongoDB", "Stripe"],
      "color": "from-pink-600 to-purple-600"
    },
    {
      "id": 2,
      "title": "Task Management App",
      "description": "Collaborative project management tool with real-time updates",
      "tech": ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
      "color": "from-purple-600 to-blue-600"
    },
    {
      "id": 3,
      "title": "Social Media Dashboard",
      "description": "Analytics dashboard for tracking social media metrics",
      "tech": ["React", "Chart.js", "Express", "Redis"],
      "color": "from-blue-600 to-cyan-600"
    },
    {
      "id": 4,
      "title": "AI Chat Application",
      "description": "Real-time chat app with AI-powered responses",
      "tech": ["React", "OpenAI", "Socket.io", "AWS"],
      "color": "from-cyan-600 to-teal-600"
    },
    {
      "id": 5,
      "title": "Portfolio Builder",
      "description": "Drag-and-drop portfolio website builder",
      "tech": ["Vue.js", "Firebase", "Tailwind", "Vercel"],
      "color": "from-teal-600 to-green-600"
    },
    {
      "id": 6,
      "title": "Fitness Tracker",
      "description": "Mobile-first fitness and workout tracking application",
      "tech": ["React Native", "MongoDB", "Express", "AWS"],
      "color": "from-green-600 to-pink-600"
    }
  ]'::jsonb,
  'Have a Project in Mind?',
  'Let''s collaborate and bring your ideas to life. I''m always excited to work on new and challenging projects.',
  'Start a Project',
  '/contact'
);

-- Contact Content
INSERT INTO contact_content (
  subtitle,
  title,
  intro_text,
  form_heading,
  submit_button_text,
  follow_heading,
  contact_cards,
  social_links
) VALUES (
  'Get In Touch',
  'Let''s Work Together',
  'Have a project in mind or just want to chat? Drop me a message and I''ll get back to you as soon as possible.',
  'Send a Message',
  'Send Message',
  'Follow Me',
  '[
    {"emoji": "📧", "title": "Email", "value": "esther.sunday@example.com"},
    {"emoji": "📱", "title": "Phone", "value": "+234 (0) 123 456 7890"},
    {"emoji": "📍", "title": "Location", "value": "Lagos, Nigeria"}
  ]'::jsonb,
  '[
    {"label": "GitHub", "url": "https://github.com"},
    {"label": "LinkedIn", "url": "https://linkedin.com"},
    {"label": "Twitter", "url": "https://twitter.com"}
  ]'::jsonb
);

-- Navbar Content
INSERT INTO navbar_content (
  logo_text,
  nav_links
) VALUES (
  'ES',
  '[
    {"label": "Home", "path": "/"},
    {"label": "About", "path": "/about"},
    {"label": "Projects", "path": "/projects"},
    {"label": "Contact", "path": "/contact"}
  ]'::jsonb
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (Optional)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to content tables
CREATE POLICY "Allow public read access" ON home_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON navbar_content FOR SELECT USING (true);

-- Allow public insert for contact messages
CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);
