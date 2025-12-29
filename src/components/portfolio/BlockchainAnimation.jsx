import React from 'react';
import { motion } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const blockVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="relative w-32 h-32">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 30 30 L 60 60"
          stroke={isDark ? 'url(#gradient1)' : '#244270'}
          strokeWidth="2"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          custom={0}
        />
        <motion.path
          d="M 90 30 L 60 60"
          stroke={isDark ? 'url(#gradient1)' : '#244270'}
          strokeWidth="2"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          custom={1}
        />
        <motion.path
          d="M 60 60 L 60 90"
          stroke={isDark ? 'url(#gradient1)' : '#244270'}
          strokeWidth="2"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          custom={2}
        />

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <motion.g variants={blockVariants} initial="initial" animate="animate" custom={0}>
          <rect x="20" y="20" width="20" height="20" rx="3" fill={isDark ? 'url(#gradient2)' : '#244270'} opacity={isDark ? 0.8 : 1} />
          <motion.rect x="20" y="20" width="20" height="20" rx="3" stroke={isDark ? '#a855f7' : '#244270'} strokeWidth="1" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.g>

        <motion.g variants={blockVariants} initial="initial" animate="animate" custom={1}>
          <rect x="80" y="20" width="20" height="20" rx="3" fill={isDark ? 'url(#gradient2)' : '#244270'} opacity={isDark ? 0.8 : 1} />
          <motion.rect x="80" y="20" width="20" height="20" rx="3" stroke={isDark ? '#06b6d4' : '#244270'} strokeWidth="1" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
        </motion.g>

        <motion.g variants={blockVariants} initial="initial" animate="animate" custom={2}>
          <rect x="50" y="50" width="20" height="20" rx="3" fill={isDark ? 'url(#gradient2)' : '#244270'} opacity={isDark ? 0.8 : 1} />
          <motion.rect x="50" y="50" width="20" height="20" rx="3" stroke={isDark ? '#3b82f6' : '#244270'} strokeWidth="1" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        </motion.g>

        <motion.g variants={blockVariants} initial="initial" animate="animate" custom={3}>
          <rect x="50" y="80" width="20" height="20" rx="3" fill={isDark ? 'url(#gradient2)' : '#244270'} opacity={isDark ? 0.8 : 1} />
          <motion.rect x="50" y="80" width="20" height="20" rx="3" stroke={isDark ? '#a855f7' : '#244270'} strokeWidth="1" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
        </motion.g>

        <motion.circle r="2" fill={isDark ? '#06b6d4' : '#244270'} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
          <animateMotion dur="2s" repeatCount="indefinite" path="M 30 30 L 60 60" />
        </motion.circle>

        <motion.circle r="2" fill={isDark ? '#a855f7' : '#244270'} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}>
          <animateMotion dur="2s" repeatCount="indefinite" path="M 90 30 L 60 60" />
        </motion.circle>

        <motion.circle r="2" fill={isDark ? '#3b82f6' : '#244270'} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}>
          <animateMotion dur="2s" repeatCount="indefinite" path="M 60 60 L 60 90" />
        </motion.circle>
      </svg>

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(36, 66, 112, 0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}