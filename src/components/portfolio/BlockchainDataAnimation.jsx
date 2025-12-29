import React from 'react';
import { motion } from 'framer-motion';

export default function BlockchainDataAnimation({ isDark }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Nucleus - Empty */}
      <div className={`w-20 h-20 rounded-full ${
        isDark 
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/30' 
          : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20 border-2 border-[#244270]/30'
      }`} />

      {/* Electron Orbit 1 - Horizontal */}
      <motion.div
        className="absolute"
        style={{ width: 280, height: 100 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Orbit Path */}
        <div className={`absolute inset-0 rounded-full border-2 ${
          isDark ? 'border-cyan-400/20' : 'border-[#4dbdce]/20'
        }`} style={{ borderStyle: 'dashed' }} />
        
        {/* Electron 1 */}
        <motion.div
          className={`absolute w-4 h-4 rounded-full ${
            isDark 
              ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
              : 'bg-[#4dbdce] shadow-lg shadow-[#4dbdce]/50'
          }`}
          style={{
            top: '50%',
            left: '0%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Electron Orbit 2 - 60 degrees tilt */}
      <motion.div
        className="absolute"
        style={{ 
          width: 280, 
          height: 100,
          transform: 'rotate(60deg)',
        }}
        animate={{ rotate: '420deg' }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Orbit Path */}
        <div className={`absolute inset-0 rounded-full border-2 ${
          isDark ? 'border-purple-400/20' : 'border-[#244270]/20'
        }`} style={{ borderStyle: 'dashed' }} />
        
        {/* Electron 2 */}
        <motion.div
          className={`absolute w-4 h-4 rounded-full ${
            isDark 
              ? 'bg-purple-400 shadow-lg shadow-purple-400/50' 
              : 'bg-[#244270] shadow-lg shadow-[#244270]/50'
          }`}
          style={{
            top: '50%',
            left: '0%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Electron Orbit 3 - 120 degrees tilt */}
      <motion.div
        className="absolute"
        style={{ 
          width: 280, 
          height: 100,
          transform: 'rotate(120deg)',
        }}
        animate={{ rotate: '480deg' }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Orbit Path */}
        <div className={`absolute inset-0 rounded-full border-2 ${
          isDark ? 'border-blue-400/20' : 'border-blue-400/20'
        }`} style={{ borderStyle: 'dashed' }} />
        
        {/* Electron 3 */}
        <motion.div
          className={`absolute w-4 h-4 rounded-full ${
            isDark 
              ? 'bg-blue-400 shadow-lg shadow-blue-400/50' 
              : 'bg-blue-500 shadow-lg shadow-blue-500/50'
          }`}
          style={{
            top: '50%',
            left: '0%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Background Glow Effect */}
      <motion.div
        className={`absolute inset-0 pointer-events-none ${
          isDark 
            ? 'bg-gradient-radial from-purple-500/5 via-transparent to-transparent' 
            : 'bg-gradient-radial from-[#244270]/5 via-transparent to-transparent'
        }`}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}