import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../src/context/SiteContentContext';
import SEO from '../component/SEO';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { home } = useSiteContent();
  const techStack = Array.isArray(home.tech_stack) ? home.tech_stack : [];
  const stats = Array.isArray(home.stats) ? home.stats : [];

  return (
    <>
      <SEO 
        title="Sunday Daniel Aniedeh - Full Stack Developer"
        description="Professional portfolio showcasing expertise in React, Node.js, JavaScript, Django and modern web development. View projects, skills, and experience."
        keywords="Sunday Daniel Aniedeh, Full Stack Developer, React Developer, Node.js, JavaScript, TypeScript, Web Development, Software Engineer, Portfolio"
      />
      <section className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative min-h-[70vh] flex items-center justify-center mb-32">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-purple-600/10 to-transparent rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-yellow-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <motion.div
            className="relative z-10 grid md:grid-cols-2 gap-12 items-center w-full"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Text Content */}
            <div className="text-center md:text-left md:pl-8">
              <motion.h1
                className="text-4xl md:text-5xl font-bold tracking-[0.15em] mb-8 leading-tight"
                variants={staggerItem}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {home.hero_title?.split(' ').slice(0, 2).join(' ')}<br />
                {home.hero_title?.split(' ').slice(2).join(' ')}
              </motion.h1>
              <motion.p
                className="text-sm tracking-[0.4em] uppercase text-gray-300 mb-12 md:ml-1"
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                {home.hero_subtitle}
              </motion.p>
              <motion.div
                className="flex gap-6 justify-center md:justify-start md:ml-1"
                variants={staggerItem}
              >
                <motion.a
                  href={home.cta_primary_href}
                  className="px-8 py-4 rounded-full bg-yellow-600 hover:bg-yellow-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {home.cta_primary_text}
                </motion.a>
                <motion.a
                  href={home.cta_secondary_href}
                  className="px-8 py-4 rounded-full border border-yellow-600 hover:bg-yellow-600/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {home.cta_secondary_text}
                </motion.a>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              className="flex justify-center"
              variants={staggerItem}
            >
              <motion.div
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-yellow-600 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.08, borderColor: 'rgba(147, 51, 234, 1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.img
                  src={isHovered ? (home.profile_image_hover_url || '/profile2.jpg') : (home.profile_image_url || '/profile.jpg')}
                  alt={home.profile_alt || 'Profile'}
                  className="w-full h-full object-cover"
                  layout
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        {stats.length > 0 && (
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-32"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-zinc-900 rounded-3xl p-8 text-center"
                variants={staggerItem}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <h3 className="text-5xl font-bold text-yellow-500 mb-2">{stat.value}</h3>
                <p className="text-gray-400 uppercase tracking-widest text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* About Preview */}
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 leading-relaxed text-lg mb-8">
            {home.about_text}
          </p>
          {techStack.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-6 py-3 bg-zinc-900 rounded-full text-sm cursor-default"
                  variants={staggerItem}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(202, 138, 4, 1)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
    </>
  );
}