import React from 'react';
import { motion } from 'framer-motion';

export default function BlockchainDataAnimation({ isDark }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Central Nucleus - Empty */}
      <div className={`absolute w-12 h-12 rounded-full ${
        isDark 
          ? 'bg-cyan-400' 
          : 'bg-[#4dbdce]'
      } shadow-xl`} style={{ boxShadow: isDark ? '0 0 20px rgba(34, 211, 238, 0.6)' : '0 0 20px rgba(77, 189, 206, 0.6)' }} />

      {/* Electron Orbit 1 - Horizontal */}
      <motion.div
        className="absolute"
        style={{ 
          width: 300, 
          height: 80,
        }}
        animate={{ rotateZ: 360 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Orbit Ellipse */}
        <svg className="w-full h-full" viewBox="0 0 300 80">
          <ellipse
            cx="150"
            cy="40"
            rx="145"
            ry="35"
            fill="none"
            stroke={isDark ? 'rgba(34, 211, 238, 0.3)' : 'rgba(77, 189, 206, 0.3)'}
            strokeWidth="2"
          />
        </svg>
        
        {/* Electron */}
        <motion.div
          className={`absolute w-3 h-3 rounded-full ${
            isDark ? 'bg-cyan-400' : 'bg-[#4dbdce]'
          }`}
          style={{
            top: '40px',
            left: '150px',
            boxShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.8)' : '0 0 10px rgba(77, 189, 206, 0.8)',
          }}
          animate={{ 
            x: [0, 145, 0, -145, 0],
            y: [0, -35, 0, -35, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Electron Orbit 2 - 60 degrees */}
      <motion.div
        className="absolute"
        style={{ 
          width: 300, 
          height: 80,
          transform: 'rotateZ(60deg)',
        }}
        animate={{ rotateZ: '420deg' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Orbit Ellipse */}
        <svg className="w-full h-full" viewBox="0 0 300 80">
          <ellipse
            cx="150"
            cy="40"
            rx="145"
            ry="35"
            fill="none"
            stroke={isDark ? 'rgba(34, 211, 238, 0.3)' : 'rgba(77, 189, 206, 0.3)'}
            strokeWidth="2"
          />
        </svg>
        
        {/* Electron */}
        <motion.div
          className={`absolute w-3 h-3 rounded-full ${
            isDark ? 'bg-cyan-400' : 'bg-[#4dbdce]'
          }`}
          style={{
            top: '40px',
            left: '150px',
            boxShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.8)' : '0 0 10px rgba(77, 189, 206, 0.8)',
          }}
          animate={{ 
            x: [0, 145, 0, -145, 0],
            y: [0, -35, 0, -35, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Electron Orbit 3 - 120 degrees */}
      <motion.div
        className="absolute"
        style={{ 
          width: 300, 
          height: 80,
          transform: 'rotateZ(120deg)',
        }}
        animate={{ rotateZ: '480deg' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Orbit Ellipse */}
        <svg className="w-full h-full" viewBox="0 0 300 80">
          <ellipse
            cx="150"
            cy="40"
            rx="145"
            ry="35"
            fill="none"
            stroke={isDark ? 'rgba(34, 211, 238, 0.3)' : 'rgba(77, 189, 206, 0.3)'}
            strokeWidth="2"
          />
        </svg>
        
        {/* Electron */}
        <motion.div
          className={`absolute w-3 h-3 rounded-full ${
            isDark ? 'bg-cyan-400' : 'bg-[#4dbdce]'
          }`}
          style={{
            top: '40px',
            left: '150px',
            boxShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.8)' : '0 0 10px rgba(77, 189, 206, 0.8)',
          }}
          animate={{ 
            x: [0, 145, 0, -145, 0],
            y: [0, -35, 0, -35, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Subtle Glow */}
      <div className={`absolute w-64 h-64 rounded-full ${
        isDark 
          ? 'bg-gradient-radial from-cyan-500/10 to-transparent' 
          : 'bg-gradient-radial from-[#4dbdce]/10 to-transparent'
      }`} />
    </div>
  );
}