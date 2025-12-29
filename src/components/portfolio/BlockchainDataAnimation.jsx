import React from 'react';
import { motion } from 'framer-motion';

export default function BlockchainDataAnimation({ isDark }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Central Core */}
      <motion.div
        className={`w-16 h-16 rounded-full ${
          isDark 
            ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500' 
            : 'bg-gradient-to-br from-[#244270] via-blue-400 to-[#4dbdce]'
        } shadow-2xl`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: 360,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Orbiting Electrons - 3 Rings */}
      {[0, 1, 2].map((ringIndex) => {
        const radius = 80 + ringIndex * 40;
        const rotationDuration = 4 + ringIndex * 2;
        const electronCount = 3 + ringIndex;
        
        return (
          <motion.div
            key={ringIndex}
            className="absolute"
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: rotationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Orbital Path */}
            <div
              className={`absolute inset-0 rounded-full border ${
                isDark 
                  ? 'border-purple-500/30' 
                  : 'border-[#244270]/20'
              }`}
              style={{
                transform: `rotate(${ringIndex * 60}deg)`,
              }}
            />

            {/* Electrons on this ring */}
            {Array.from({ length: electronCount }).map((_, electronIndex) => {
              const angle = (360 / electronCount) * electronIndex;
              return (
                <motion.div
                  key={electronIndex}
                  className={`absolute w-3 h-3 rounded-full ${
                    isDark 
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                      : 'bg-[#4dbdce] shadow-lg shadow-[#4dbdce]/50'
                  }`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateX(${radius}px) translateY(-50%)`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: electronIndex * 0.2,
                  }}
                />
              );
            })}
          </motion.div>
        );
      })}

      {/* Floating Data Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            isDark ? 'bg-purple-400/30' : 'bg-[#244270]/20'
          }`}
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Pulsing Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className={`absolute rounded-full border-2 ${
            isDark 
              ? 'border-cyan-400/20' 
              : 'border-[#4dbdce]/20'
          }`}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 400,
            height: 400,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Background Glow */}
      <motion.div
        className={`absolute inset-0 pointer-events-none ${
          isDark 
            ? 'bg-gradient-radial from-purple-500/10 via-cyan-500/5 to-transparent' 
            : 'bg-gradient-radial from-[#244270]/10 via-[#4dbdce]/5 to-transparent'
        }`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}