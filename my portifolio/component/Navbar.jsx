import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../src/context/SiteContentContext';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const { navbar } = useSiteContent();
  const navLinks = Array.isArray(navbar.nav_links) ? navbar.nav_links : [];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md px-4 sm:px-10 py-5 flex justify-between items-center"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <motion.span
        className="text-white font-semibold tracking-[0.35em] text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {navbar.logo_text || 'ES'}
      </motion.span>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-300">
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white p-2"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-widest py-3 px-4 rounded-xl ${
                    location.pathname === path
                      ? 'bg-yellow-600 text-white'
                      : 'text-gray-300 hover:bg-zinc-800'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}