import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete, isDark }) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const name = "Welcome";
  const title = "to my portfolio";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(36, 66, 112, 0.05)'} 1px, transparent 1px),
                               linear-gradient(90deg, ${isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(36, 66, 112, 0.05)'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
          
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
              left: '20%',
              top: '30%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
              right: '20%',
              bottom: '30%',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            <motion.span
              className={`text-6xl md:text-8xl font-light ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: phase >= 1 ? 0 : -100, opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {'<'}
            </motion.span>
            
            <div className="flex overflow-hidden">
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={phase >= 2 ? "visible" : "hidden"}
                  className={`text-4xl md:text-7xl font-bold ${
                    isDark ? 'text-white' : 'text-[#141225]'
                  } ${letter === ' ' ? 'mx-3' : ''}`}
                  style={{
                    textShadow: isDark 
                      ? '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)'
                      : '0 0 30px rgba(36, 66, 112, 0.3)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.span
              className={`text-6xl md:text-8xl font-light ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: phase >= 1 ? 0 : 100, opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {'/>'}
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <p className={`text-xl md:text-2xl tracking-[0.3em] uppercase ${
              isDark ? 'text-purple-300/80' : 'text-[#244270]/80'
            }`}>
              {title}
            </p>
            <motion.div
              className={`h-0.5 mx-auto mt-4 ${
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent'
                  : 'bg-gradient-to-r from-transparent via-[#244270] to-transparent'
              }`}
              initial={{ width: 0 }}
              animate={{ width: phase >= 3 ? '200px' : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#244270]'}`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}