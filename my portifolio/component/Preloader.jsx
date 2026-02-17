import { useEffect } from 'react';
import { motion } from 'framer-motion';

const preloaderVariants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: 'afterChildren',
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 },
  },
};

const lineVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const PRELOADER_DURATION_MS = 2600;

export default function Preloader({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), PRELOADER_DURATION_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      variants={preloaderVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.span
        className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.3em] sm:tracking-[0.4em] text-white text-center px-4"
        variants={textVariants}
      >
        SUNDAY DANIEL ANIEDEH
      </motion.span>
      <motion.div
        className="mt-4 h-0.5 w-24 sm:w-32 bg-yellow-500 origin-center rounded-full"
        variants={lineVariants}
      />
      <motion.div
        className="mt-8 flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-yellow-500"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
