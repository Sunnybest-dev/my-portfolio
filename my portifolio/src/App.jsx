import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from './supabaseClient';
import Navbar from "../component/Navbar";
import Preloader from "../component/Preloader";
import SEO from "../component/SEO";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Project";
import Contact from "../pages/Contact";
import Resume from "../pages/Resume";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminMessages from "../pages/AdminMessages";
import AdminAnalytics from "../pages/AdminAnalytics";
import TestSupabase from "../pages/TestSupabase";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const isTest = location.pathname === '/test';

  useEffect(() => {
    if (!isAdmin && !isTest) {
      supabase.from('site_analytics').insert([{
        page_path: location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent
      }]);
    }
  }, [location.pathname, isAdmin, isTest]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && !isAdmin && !isTest ? (
          <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />
        ) : isAdmin ? (
          <Routes location={location}>
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
          </Routes>
        ) : isTest ? (
          <Routes location={location}>
            <Route path="/test" element={<TestSupabase />} />
          </Routes>
        ) : (
          <>
            <SEO />
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/resume" element={<Resume />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
