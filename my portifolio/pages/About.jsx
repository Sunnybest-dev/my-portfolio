import { motion } from 'framer-motion';
import { useSiteContent } from '../src/context/SiteContentContext';
import SEO from '../component/SEO';

import GitHubActivity from '../component/GitHubActivity';

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

export default function About() {
  const { about } = useSiteContent();
  const experienceItems = Array.isArray(about.experience_items) ? about.experience_items : [];
  const serviceCards = Array.isArray(about.service_cards) ? about.service_cards : [];
  const skillsSections = Array.isArray(about.skills_sections) ? about.skills_sections : [];
  const socialPlatforms = Array.isArray(about.social_platforms) ? about.social_platforms : [];
  const githubUsername = about.github_username || 'yourusername';

  return (
    <>
      <SEO 
        title="About - Sunday Daniel Aniedeh | Full Stack Developer"
        description="Learn about Sunday Daniel Aniedeh's experience, skills, and expertise in full stack development. Specializing in React, Node.js, and modern web technologies."
        keywords="About Sunday Daniel Aniedeh, Developer Experience, Skills, Web Development Expertise, React Expert, Node.js Developer"
      />
      <section className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-widest text-yellow-500 mb-4">{about.subtitle}</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">{about.title}</h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-16 items-center mb-32" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <motion.div className="bg-zinc-900 rounded-3xl p-12 relative" variants={staggerItem} whileHover={{ scale: 1.05 }}>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-yellow-600/40 blur-2xl animate-pulse" />
            <h2 className="text-6xl font-bold text-white mb-4">{about.experience_value}</h2>
            <p className="uppercase tracking-widest mt-2 text-gray-300 mb-2">{about.experience_label}</p>
            {experienceItems.map((item, i) => (
              <div key={i} className="mt-2 text-sm text-gray-400">{item}</div>
            ))}
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-3xl font-semibold mb-6">{about.main_heading}</h3>
            <p className="text-gray-400 mb-10 leading-relaxed">{about.main_description}</p>
            <div className="grid grid-cols-2 gap-6">
              {serviceCards.map((card, i) => (
                <motion.div key={i} className="bg-zinc-900 rounded-2xl p-6" whileHover={{ scale: 1.05, backgroundColor: 'rgb(39 39 42)' }}>
                  <h4 className="font-semibold mb-2">{card.emoji} {card.title}</h4>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {skillsSections.length > 0 && (
          <div className="mb-32">
            <h3 className="text-3xl font-semibold mb-10 text-center">{about.skills_heading}</h3>
            <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {skillsSections.map((section, i) => (
                <motion.div key={i} className="bg-zinc-900 rounded-3xl p-8" variants={staggerItem} whileHover={{ backgroundColor: 'rgb(39 39 42)' }}>
                  <h4 className={`text-xl font-semibold mb-4 ${section.color}`}>{section.title}</h4>
                  <ul className="space-y-2 text-gray-400">
                    {section.skills.map((skill, j) => (
                      <li key={j}>• {skill}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {socialPlatforms.length > 0 && (
          <div className="text-center mb-32">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-10">{about.connect_heading}</p>
            <div className="flex flex-wrap justify-center gap-6">
              {socialPlatforms.map((platform, i) => (
                <motion.a key={i} href="#" className="px-8 py-4 bg-zinc-900 rounded-full text-sm" whileHover={{ scale: 1.1, backgroundColor: 'rgb(202 138 4)' }}>
                  {platform}
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Activity */}
        <div className="mb-32">
          <h3 className="text-3xl font-semibold mb-10 text-center">GitHub Activity</h3>
          <GitHubActivity username={githubUsername} />
        </div>
      </div>
    </section>
    </>
  );
}
