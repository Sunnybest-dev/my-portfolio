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
        title="Sunday Daniel Aniedeh - Full Stack Developer & Software Engineer | React, Node.js Expert"
        description="Sunday Daniel Aniedeh is a professional Full Stack Developer and Software Engineer specializing in React, Node.js, JavaScript, TypeScript, Python, and Django. Based in Nigeria, Sunday builds scalable web applications and innovative digital solutions. Available for freelance projects and full-time opportunities."
        keywords="Sunday Daniel Aniedeh, Sunday Aniedeh, Daniel Aniedeh, Full Stack Developer Nigeria, React Developer Nigeria, Node.js Developer, JavaScript Expert, TypeScript Developer, Python Developer, Django Developer, Software Engineer Nigeria, Web Developer Nigeria, Frontend Developer, Backend Developer, Freelance Developer Nigeria, Hire Developer Nigeria, Sunday Daniel Aniedeh Portfolio, Sunday Daniel Aniedeh Projects, Sunday Daniel Aniedeh GitHub, Sunday Daniel Aniedeh LinkedIn"
      />
      <section className="bg-black text-white min-h-screen px-4 sm:px-6 py-20 sm:py-32">
      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only">
        <h1>Sunday Daniel Aniedeh - Full Stack Developer and Software Engineer</h1>
        <p>Sunday Daniel Aniedeh is a highly skilled Full Stack Developer based in Nigeria, specializing in React, Node.js, JavaScript, TypeScript, Python, and Django development.</p>
        <p>Sunday Aniedeh builds modern web applications, scalable software solutions, and innovative digital products for clients worldwide.</p>
        <p>Contact Sunday Daniel Aniedeh for web development projects, software engineering consulting, and freelance opportunities.</p>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center mb-20 sm:mb-32">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-purple-600/10 to-transparent rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-yellow-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 h-40 sm:w-72 sm:h-72 bg-purple-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <motion.div
            className="relative z-10 grid md:grid-cols-2 gap-8 sm:gap-12 items-center w-full"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Text Content */}
            <div className="text-center md:text-left md:pl-8 order-2 md:order-1">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] sm:tracking-[0.15em] mb-6 sm:mb-8 leading-tight"
                variants={staggerItem}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {home.hero_title?.split(' ').slice(0, 2).join(' ')}<br />
                {home.hero_title?.split(' ').slice(2).join(' ')}
              </motion.h1>
              <motion.p
                className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gray-300 mb-8 sm:mb-12 md:ml-1"
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                {home.hero_subtitle}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start md:ml-1"
                variants={staggerItem}
              >
                <motion.a
                  href={home.cta_primary_href}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-yellow-600 hover:bg-yellow-700 transition-colors text-sm sm:text-base text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {home.cta_primary_text}
                </motion.a>
                <motion.a
                  href={home.cta_secondary_href}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-yellow-600 hover:bg-yellow-600/10 transition-colors text-sm sm:text-base text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {home.cta_secondary_text}
                </motion.a>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              className="flex justify-center order-1 md:order-2"
              variants={staggerItem}
            >
              <motion.div
                className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-600 cursor-pointer"
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-32"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-zinc-900 rounded-3xl p-6 sm:p-8 text-center"
                variants={staggerItem}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <h3 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-2">{stat.value}</h3>
                <p className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm">{stat.label}</p>
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
          <p className="text-gray-400 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8">
            {home.about_text}
          </p>
          {techStack.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 justify-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-zinc-900 rounded-full text-xs sm:text-sm cursor-default"
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