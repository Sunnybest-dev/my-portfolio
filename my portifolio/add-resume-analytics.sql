-- Resume/CV Table
CREATE TABLE IF NOT EXISTS resume_content (
  id SERIAL PRIMARY KEY,
  resume_pdf_url TEXT,
  work_history JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS site_analytics (
  id SERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  visited_at TIMESTAMP DEFAULT NOW()
);

-- Insert default resume data
INSERT INTO resume_content (id, resume_pdf_url, work_history, education, certifications) VALUES (
  1,
  '/resume.pdf',
  '[
    {
      "company": "Tech Company",
      "position": "Senior Full Stack Developer",
      "duration": "2022 - Present",
      "description": "Led development of scalable web applications using React and Node.js",
      "achievements": ["Increased performance by 40%", "Mentored 5 junior developers"]
    }
  ]',
  '[
    {
      "institution": "University Name",
      "degree": "Bachelor of Science in Computer Science",
      "year": "2018 - 2022",
      "gpa": "3.8/4.0"
    }
  ]',
  '[
    {
      "name": "AWS Certified Developer",
      "issuer": "Amazon Web Services",
      "year": "2023",
      "credential_url": "https://aws.amazon.com/certification/"
    }
  ]'
) ON CONFLICT (id) DO NOTHING;

-- RLS Policies
ALTER TABLE resume_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on resume" ON resume_content FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update on resume" ON resume_content FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert on analytics" ON site_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read on analytics" ON site_analytics FOR SELECT USING (auth.role() = 'authenticated');
