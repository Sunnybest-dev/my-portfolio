import { motion } from 'framer-motion';
import { useSiteContent } from '../src/context/SiteContentContext';
import SEO from '../component/SEO';

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

export default function Projects() {
  const { projects } = useSiteContent();
  const projectsList = Array.isArray(projects.projects) ? projects.projects : [];

  return (
    <>
      <SEO 
        title="Projects - Sunday Daniel Aniedeh | Portfolio & Work"
        description="Explore Sunday Daniel Aniedeh's portfolio of web development projects. Innovative solutions built with React, Node.js, and cutting-edge technologies."
        keywords="Sunday Daniel Aniedeh Projects, Web Development Portfolio, React Projects, Node.js Applications, Software Projects"
      />
      <section className="bg-black text-white min-h-screen px-4 sm:px-6 py-20 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12 sm:mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-widest text-yellow-500 mb-4">{projects.subtitle}</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">{projects.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">{projects.description}</p>
        </motion.div>

        {projectsList.length > 0 && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {projectsList.map((project, index) => (
              <motion.div key={project.id} className="group bg-zinc-900 rounded-3xl overflow-hidden" variants={staggerItem} whileHover={{ scale: 1.05, y: -4 }}>
                <div className={`h-40 sm:h-48 bg-gradient-to-br ${project.color} relative`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  <div className="absolute top-4 right-4 text-5xl sm:text-6xl font-bold text-white/20">
                    {String(project.id).padStart(2, '0')}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-yellow-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 bg-black rounded-full text-xs text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button className="mt-4 sm:mt-6 w-full py-2 sm:py-3 rounded-full border border-yellow-600 text-xs sm:text-sm" whileHover={{ backgroundColor: 'rgb(202 138 4)' }}>
                    View Project
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div className="bg-gradient-to-r from-yellow-600/20 to-purple-600/20 rounded-3xl p-8 sm:p-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">{projects.cta_heading}</h3>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">{projects.cta_description}</p>
          <motion.a href={projects.cta_button_href} className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-yellow-600 font-semibold text-sm sm:text-base" whileHover={{ scale: 1.05, backgroundColor: 'rgb(202 138 4)' }}>
            {projects.cta_button_text}
          </motion.a>
        </motion.div>
      </div>
    </section>
    </>
  );
}
