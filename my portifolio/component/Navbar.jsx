import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSiteContent } from '../src/context/SiteContentContext';

export default function Navbar() {
  const location = useLocation();
  const { navbar } = useSiteContent();
  const navLinks = Array.isArray(navbar.nav_links) ? navbar.nav_links : [];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md px-10 py-5 flex justify-between items-center"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <motion.span
        className="text-white font-semibold tracking-[0.35em]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {navbar.logo_text || 'ES'}
      </motion.span>

      <div className="flex gap-8 text-xs uppercase tracking-widest text-gray-300">
        {navLinks.map(({ path, label }) => (
          <Link key={path} to={path} className="relative py-2">
            <motion.span
              className="relative z-10 block"
              whileHover={{ color: '#fff' }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
            {location.pathname === path && (
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                layoutId="navbar-underline"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {location.pathname !== path && (
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
