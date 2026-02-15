-- Portfolio content tables + RLS + seed
-- Applied when you run: npx supabase db push

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_text TEXT NOT NULL DEFAULT 'JT',
  preloader_text TEXT NOT NULL DEFAULT 'ESTHER SUNDAY',
  nav_links JSONB NOT NULL DEFAULT '[{"label":"Home","path":"/"},{"label":"About","path":"/about"},{"label":"Projects","path":"/projects"},{"label":"Contact","path":"/contact"}]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS home_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT NOT NULL DEFAULT 'ESTHER SUNDAY',
  hero_subtitle TEXT NOT NULL DEFAULT 'Full Stack Developer | UI/UX Designer | Creative Thinker',
  cta_primary_text TEXT NOT NULL DEFAULT 'View My Work',
  cta_primary_href TEXT NOT NULL DEFAULT '#projects',
  cta_secondary_text TEXT NOT NULL DEFAULT 'Get In Touch',
  cta_secondary_href TEXT NOT NULL DEFAULT '#contact',
  profile_image_url TEXT DEFAULT '/profile.jpg',
  profile_image_hover_url TEXT DEFAULT '/profile2.jpg',
  profile_alt TEXT DEFAULT 'Esther Sunday',
  about_text TEXT NOT NULL DEFAULT 'I''m a passionate Full Stack Developer specializing in creating beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies, I transform ideas into innovative solutions that make a difference.',
  tech_stack JSONB NOT NULL DEFAULT '["React","Node.js","TypeScript","Tailwind CSS","MongoDB","AWS"]',
  stats JSONB NOT NULL DEFAULT '[{"value":"50+","label":"Projects Completed"},{"value":"5+","label":"Years Experience"},{"value":"30+","label":"Happy Clients"}]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtitle TEXT NOT NULL DEFAULT 'Get To Know Me',
  title TEXT NOT NULL DEFAULT 'About Me',
  experience_number TEXT NOT NULL DEFAULT '5+',
  experience_label TEXT NOT NULL DEFAULT 'Years Of Experience',
  bullet1 TEXT DEFAULT 'Full Stack Development',
  bullet2 TEXT DEFAULT 'UI/UX Design',
  bullet3 TEXT DEFAULT 'Cloud Architecture',
  section_heading TEXT NOT NULL DEFAULT 'Building Digital Solutions That Matter',
  paragraph1 TEXT NOT NULL DEFAULT 'I''m a dedicated developer with a passion for creating seamless digital experiences. My journey in tech has equipped me with expertise in modern web technologies, cloud solutions, and user-centered design principles.',
  paragraph2 TEXT NOT NULL DEFAULT 'I believe in writing clean, maintainable code and building applications that not only look great but also solve real-world problems efficiently.',
  skills_heading TEXT NOT NULL DEFAULT 'Technical Skills',
  focus_areas JSONB NOT NULL DEFAULT '[{"emoji":"💻","title":"Development","desc":"Full-stack web applications"},{"emoji":"🎨","title":"Design","desc":"Beautiful UI/UX interfaces"},{"emoji":"☁️","title":"Cloud","desc":"Scalable cloud solutions"},{"emoji":"🚀","title":"Performance","desc":"Optimized applications"}]',
  skills JSONB NOT NULL DEFAULT '[{"title":"Frontend","items":["React & Next.js","TypeScript","Tailwind CSS","Redux & Context API"]},{"title":"Backend","items":["Node.js & Express","Python & Django","RESTful APIs","GraphQL"]},{"title":"Database & Cloud","items":["MongoDB & PostgreSQL","AWS & Azure","Docker & Kubernetes","CI/CD Pipelines"]}]',
  connect_heading TEXT NOT NULL DEFAULT 'Let''s Connect',
  connect_links JSONB NOT NULL DEFAULT '[{"label":"GitHub","url":"#"},{"label":"LinkedIn","url":"#"},{"label":"Twitter","url":"#"},{"label":"Medium","url":"#"},{"label":"Dev.to","url":"#"},{"label":"Stack Overflow","url":"#"}]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech JSONB NOT NULL DEFAULT '[]',
  color TEXT NOT NULL DEFAULT 'from-pink-600 to-purple-600',
  project_url TEXT DEFAULT '#',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtitle TEXT NOT NULL DEFAULT 'My Work',
  title TEXT NOT NULL DEFAULT 'Featured Projects',
  intro_text TEXT NOT NULL DEFAULT 'A collection of projects that showcase my skills and passion for creating innovative solutions',
  cta_heading TEXT NOT NULL DEFAULT 'Have a Project in Mind?',
  cta_text TEXT NOT NULL DEFAULT 'Let''s collaborate and bring your ideas to life. I''m always excited to work on new and challenging projects.',
  cta_button_text TEXT NOT NULL DEFAULT 'Start a Project',
  cta_button_href TEXT NOT NULL DEFAULT '/contact',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtitle TEXT NOT NULL DEFAULT 'Get In Touch',
  title TEXT NOT NULL DEFAULT 'Let''s Work Together',
  intro_text TEXT NOT NULL DEFAULT 'Have a project in mind or just want to chat? Drop me a message and I''ll get back to you as soon as possible.',
  form_heading TEXT NOT NULL DEFAULT 'Send a Message',
  submit_button_text TEXT NOT NULL DEFAULT 'Send Message',
  contact_cards JSONB NOT NULL DEFAULT '[{"emoji":"📧","title":"Email","value":"esther.sunday@example.com"},{"emoji":"📱","title":"Phone","value":"+234 (0) 123 456 7890"},{"emoji":"📍","title":"Location","value":"Lagos, Nigeria"}]',
  follow_heading TEXT NOT NULL DEFAULT 'Follow Me',
  social_links JSONB NOT NULL DEFAULT '[{"label":"GitHub","url":"#"},{"label":"LinkedIn","url":"#"},{"label":"Twitter","url":"#"}]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Auth update site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read home_content" ON home_content FOR SELECT USING (true);
CREATE POLICY "Auth update home_content" ON home_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Auth update about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth all projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read projects_page" ON projects_page FOR SELECT USING (true);
CREATE POLICY "Auth update projects_page" ON projects_page FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read contact_content" ON contact_content FOR SELECT USING (true);
CREATE POLICY "Auth update contact_content" ON contact_content FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO site_settings (logo_text, preloader_text)
SELECT 'JT', 'ESTHER SUNDAY' WHERE NOT EXISTS (SELECT 1 FROM site_settings LIMIT 1);

INSERT INTO home_content (hero_title, hero_subtitle)
SELECT 'ESTHER SUNDAY', 'Full Stack Developer | UI/UX Designer | Creative Thinker'
WHERE NOT EXISTS (SELECT 1 FROM home_content LIMIT 1);

INSERT INTO about_content (subtitle, title)
SELECT 'Get To Know Me', 'About Me' WHERE NOT EXISTS (SELECT 1 FROM about_content LIMIT 1);

INSERT INTO projects_page (subtitle, title)
SELECT 'My Work', 'Featured Projects' WHERE NOT EXISTS (SELECT 1 FROM projects_page LIMIT 1);

INSERT INTO contact_content (subtitle, title)
SELECT 'Get In Touch', 'Let''s Work Together' WHERE NOT EXISTS (SELECT 1 FROM contact_content LIMIT 1);

-- Seed projects only when table is empty (migration runs once per project)
INSERT INTO projects (title, description, tech, color, sort_order)
SELECT * FROM (VALUES
  ('E-Commerce Platform'::text, 'Full-stack online shopping platform with payment integration'::text, '["React","Node.js","MongoDB","Stripe"]'::jsonb, 'from-pink-600 to-purple-600'::text, 0),
  ('Task Management App'::text, 'Collaborative project management tool with real-time updates'::text, '["Next.js","TypeScript","PostgreSQL","WebSocket"]'::jsonb, 'from-purple-600 to-blue-600'::text, 1),
  ('Social Media Dashboard'::text, 'Analytics dashboard for tracking social media metrics'::text, '["React","Chart.js","Express","Redis"]'::jsonb, 'from-blue-600 to-cyan-600'::text, 2),
  ('AI Chat Application'::text, 'Real-time chat app with AI-powered responses'::text, '["React","OpenAI","Socket.io","AWS"]'::jsonb, 'from-cyan-600 to-teal-600'::text, 3),
  ('Portfolio Builder'::text, 'Drag-and-drop portfolio website builder'::text, '["Vue.js","Firebase","Tailwind","Vercel"]'::jsonb, 'from-teal-600 to-green-600'::text, 4),
  ('Fitness Tracker'::text, 'Mobile-first fitness and workout tracking application'::text, '["React Native","MongoDB","Express","AWS"]'::jsonb, 'from-green-600 to-pink-600'::text, 5)
) AS v(title, description, tech, color, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);
