import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DigitalClock({ isDark }) {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;

      setTime({ h, m, s });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="relative"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="relative w-16 h-16"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-35deg) rotateY(45deg)'
          }}
        >
          {/* Top face - seconds */}
          <div 
            className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black border border-white/5"
            style={{
              transform: 'rotateX(90deg) translate3d(0, 0, 32px)',
              transformOrigin: 'center'
            }}
          >
            <motion.p 
              key={time.s}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
              style={{
                fontFamily: 'monospace',
                color: isDark ? '#2982FF' : '#4dbdce',
                textShadow: isDark 
                  ? '0px 0px 8px #2982FF, 0px 0px 12px rgba(41, 130, 255, 0.5)' 
                  : '0px 0px 8px #4dbdce, 0px 0px 12px rgba(77, 189, 206, 0.5)',
                lineHeight: '1'
              }}
            >
              {time.s}
            </motion.p>
          </div>

          {/* Front face - minutes */}
          <div 
            className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-gray-900 border border-white/10"
            style={{
              transform: 'translate3d(0, 0, 32px)',
              transformOrigin: 'center'
            }}
          >
            <motion.p 
              key={time.m}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold"
              style={{
                fontFamily: 'monospace',
                color: isDark ? '#2982FF' : '#4dbdce',
                textShadow: isDark 
                  ? '0px 0px 8px #2982FF, 0px 0px 12px rgba(41, 130, 255, 0.5)' 
                  : '0px 0px 8px #4dbdce, 0px 0px 12px rgba(77, 189, 206, 0.5)',
                lineHeight: '1'
              }}
            >
              {time.m}
            </motion.p>
          </div>

          {/* Left face - hours */}
          <div 
            className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black border border-white/5"
            style={{
              transform: 'rotateY(-90deg) translate3d(0, 0, 32px)',
              transformOrigin: 'center'
            }}
          >
            <motion.p 
              key={time.h}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold"
              style={{
                fontFamily: 'monospace',
                color: isDark ? '#2982FF' : '#4dbdce',
                textShadow: isDark 
                  ? '0px 0px 8px #2982FF, 0px 0px 12px rgba(41, 130, 255, 0.5)' 
                  : '0px 0px 8px #4dbdce, 0px 0px 12px rgba(77, 189, 206, 0.5)',
                lineHeight: '1'
              }}
            >
              {time.h}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}