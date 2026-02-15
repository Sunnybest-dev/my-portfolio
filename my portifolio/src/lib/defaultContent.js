// Fallback content when Supabase is not configured or fetch fails
export const defaultSiteSettings = {
  logo_text: 'JT',
  preloader_text: 'ESTHER SUNDAY',
  nav_links: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ],
};

export const defaultHome = {
  hero_title: 'ESTHER SUNDAY',
  hero_subtitle: 'Full Stack Developer | UI/UX Designer | Creative Thinker',
  cta_primary_text: 'View My Work',
  cta_primary_href: '#projects',
  cta_secondary_text: 'Get In Touch',
  cta_secondary_href: '#contact',
  profile_image_url: '/profile.jpg',
  profile_image_hover_url: '/profile2.jpg',
  profile_alt: 'Esther Sunday',
  about_text: "I'm a passionate Full Stack Developer specializing in creating beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies, I transform ideas into innovative solutions that make a difference.",
  tech_stack: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'AWS'],
  stats: [
    { value: '50+', label: 'Projects Completed' },
    { value: '5+', label: 'Years Experience' },
    { value: '30+', label: 'Happy Clients' },
  ],
};

export const defaultAbout = {
  subtitle: 'Get To Know Me',
  title: 'About Me',
  experience_number: '5+',
  experience_label: 'Years Of Experience',
  bullet1: 'Full Stack Development',
  bullet2: 'UI/UX Design',
  bullet3: 'Cloud Architecture',
  section_heading: 'Building Digital Solutions That Matter',
  paragraph1: "I'm a dedicated developer with a passion for creating seamless digital experiences. My journey in tech has equipped me with expertise in modern web technologies, cloud solutions, and user-centered design principles.",
  paragraph2: "I believe in writing clean, maintainable code and building applications that not only look great but also solve real-world problems efficiently.",
  skills_heading: 'Technical Skills',
  focus_areas: [
    { emoji: '💻', title: 'Development', desc: 'Full-stack web applications' },
    { emoji: '🎨', title: 'Design', desc: 'Beautiful UI/UX interfaces' },
    { emoji: '☁️', title: 'Cloud', desc: 'Scalable cloud solutions' },
    { emoji: '🚀', title: 'Performance', desc: 'Optimized applications' },
  ],
  skills: [
    { title: 'Frontend', items: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Redux & Context API'] },
    { title: 'Backend', items: ['Node.js & Express', 'Python & Django', 'RESTful APIs', 'GraphQL'] },
    { title: 'Database & Cloud', items: ['MongoDB & PostgreSQL', 'AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines'] },
  ],
  connect_heading: "Let's Connect",
  connect_links: [
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Twitter', url: '#' },
    { label: 'Medium', url: '#' },
    { label: 'Dev.to', url: '#' },
    { label: 'Stack Overflow', url: '#' },
  ],
};

export const defaultProjectsPage = {
  subtitle: 'My Work',
  title: 'Featured Projects',
  intro_text: 'A collection of projects that showcase my skills and passion for creating innovative solutions',
  cta_heading: 'Have a Project in Mind?',
  cta_text: "Let's collaborate and bring your ideas to life. I'm always excited to work on new and challenging projects.",
  cta_button_text: 'Start a Project',
  cta_button_href: '/contact',
};

export const defaultProjectsList = [
  { id: '1', title: 'E-Commerce Platform', description: 'Full-stack online shopping platform with payment integration', tech: ['React', 'Node.js', 'MongoDB', 'Stripe'], color: 'from-pink-600 to-purple-600', project_url: '#' },
  { id: '2', title: 'Task Management App', description: 'Collaborative project management tool with real-time updates', tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'], color: 'from-purple-600 to-blue-600', project_url: '#' },
  { id: '3', title: 'Social Media Dashboard', description: 'Analytics dashboard for tracking social media metrics', tech: ['React', 'Chart.js', 'Express', 'Redis'], color: 'from-blue-600 to-cyan-600', project_url: '#' },
  { id: '4', title: 'AI Chat Application', description: 'Real-time chat app with AI-powered responses', tech: ['React', 'OpenAI', 'Socket.io', 'AWS'], color: 'from-cyan-600 to-teal-600', project_url: '#' },
  { id: '5', title: 'Portfolio Builder', description: 'Drag-and-drop portfolio website builder', tech: ['Vue.js', 'Firebase', 'Tailwind', 'Vercel'], color: 'from-teal-600 to-green-600', project_url: '#' },
  { id: '6', title: 'Fitness Tracker', description: 'Mobile-first fitness and workout tracking application', tech: ['React Native', 'MongoDB', 'Express', 'AWS'], color: 'from-green-600 to-pink-600', project_url: '#' },
];

export const defaultContact = {
  subtitle: 'Get In Touch',
  title: "Let's Work Together",
  intro_text: "Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible.",
  form_heading: 'Send a Message',
  submit_button_text: 'Send Message',
  contact_cards: [
    { emoji: '📧', title: 'Email', value: 'esther.sunday@example.com' },
    { emoji: '📱', title: 'Phone', value: '+234 (0) 123 456 7890' },
    { emoji: '📍', title: 'Location', value: 'Lagos, Nigeria' },
  ],
  follow_heading: 'Follow Me',
  social_links: [
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Twitter', url: '#' },
  ],
};
