import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [animationStage, setAnimationStage] = useState(0);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Fetch Kaspa blocks
    const fetchBlocks = async () => {
      try {
        const response = await fetch('https://api.kaspa.org/blocks/recent');
        const data = await response.json();
        if (data && data.blocks) {
          setBlocks(data.blocks.slice(0, 6));
        }
      } catch (error) {
        setBlocks(Array.from({ length: 6 }, (_, i) => ({ height: 50000000 + i })));
      }
    };
    fetchBlocks();
    const interval = setInterval(fetchBlocks, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStage(prev => (prev < 8 ? prev + 1 : prev));
    }, animationStage === 0 ? 300 : animationStage < 4 ? 200 : 500);
    return () => clearTimeout(timer);
  }, [animationStage]);

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 150 150" className="w-full h-full">
        <defs>
          <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#d946ef' : '#c026d3'} />
            <stop offset="100%" stopColor={isDark ? '#8b5cf6' : '#9333ea'} />
          </linearGradient>
        </defs>

        {/* Stage 1-4: Border box lines */}
        {animationStage >= 1 && (
          <>
            <motion.line
              x1="90" y1="30" x2="90" y2="120"
              stroke="#845b46" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0 }}
            />
            <motion.line
              x1="30" y1="120" x2="90" y2="120"
              stroke="#845b46" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            />
            <motion.line
              x1="30" y1="30" x2="30" y2="120"
              stroke="#845b46" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.3 }}
            />
            <motion.line
              x1="30" y1="30" x2="90" y2="30"
              stroke="#845b46" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.5 }}
            />

            {/* Corner circles */}
            {[
              { cx: 90, cy: 120, delay: 0 },
              { cx: 30, cy: 120, delay: 0.15 },
              { cx: 30, cy: 30, delay: 0.35 },
              { cx: 90, cy: 30, delay: 0.55 }
            ].map((circle, i) => (
              <motion.circle
                key={i}
                cx={circle.cx} cy={circle.cy} r="3"
                fill="none" stroke="#fff" strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 0.3,
                  delay: circle.delay,
                  times: [0, 0.4, 0.6, 1]
                }}
              />
            ))}
          </>
        )}

        {/* Stage 2: Center wave/circle fill */}
        {animationStage >= 2 && (
          <motion.g>
            <motion.circle
              cx="60" cy="75" r="35"
              fill="#fff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            
            {/* Radiating lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 60 + Math.cos(rad) * 25;
              const y1 = 75 + Math.sin(rad) * 25;
              const x2 = 60 + Math.cos(rad) * 35;
              const y2 = 75 + Math.sin(rad) * 35;
              
              return (
                <motion.line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#fff" strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: 1.6 + (i * 0.05)
                  }}
                />
              );
            })}
          </motion.g>
        )}

        {/* Stage 3: Diamond rotation */}
        {animationStage >= 3 && (
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 45 }}
            transition={{ duration: 0.2, delay: 1.9 }}
            style={{ transformOrigin: '60px 75px' }}
          >
            <motion.rect
              x="45" y="60" width="30" height="30"
              fill="#fff"
              initial={{ scale: 1 }}
              animate={{ scale: 0.15 }}
              transition={{ duration: 0.4, delay: 2.2 }}
            />
          </motion.g>
        )}

        {/* Stage 4: Two diamonds moving apart */}
        {animationStage >= 4 && (
          <>
            <motion.rect
              x="56" y="71" width="8" height="8"
              fill="#fff"
              style={{ transformOrigin: '60px 75px' }}
              transform="rotate(45 60 75)"
              initial={{ x: 56 }}
              animate={{ x: 20 }}
              transition={{ duration: 0.5, delay: 2.6 }}
            />
            <motion.rect
              x="56" y="71" width="8" height="8"
              fill="#fff"
              style={{ transformOrigin: '60px 75px' }}
              transform="rotate(45 60 75)"
              initial={{ x: 56 }}
              animate={{ x: 92 }}
              transition={{ duration: 0.5, delay: 2.6 }}
            />
          </>
        )}

        {/* Stage 5-8: Rotating circles */}
        {animationStage >= 5 && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, delay: 3.2, ease: "linear" }}
            style={{ transformOrigin: '60px 75px' }}
          >
            {/* Dotted circle */}
            <circle
              cx="60" cy="75" r="40"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />

            {/* White circle reveal */}
            <motion.circle
              cx="60" cy="75" r="38"
              fill="#fff"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 3.8 }}
            />

            {/* Gray circle */}
            <motion.circle
              cx="60" cy="75" r="12"
              fill="#808184"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 4.0 }}
            />

            {/* Orange circle */}
            <motion.circle
              cx="60" cy="75" r="35"
              fill="#f47141"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 4.5 }}
            />

            {/* Blockchain blocks connection */}
            {blocks.slice(0, 6).map((block, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const x = 60 + Math.cos(angle) * 32;
              const y = 75 + Math.sin(angle) * 32;
              
              return (
                <g key={i}>
                  <line
                    x1="60" y1="75" x2={x} y2={y}
                    stroke="url(#blockGrad)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <circle
                    cx={x} cy={y} r="4"
                    fill="url(#blockGrad)"
                  />
                </g>
              );
            })}
          </motion.g>
        )}

        {/* Final: Center text */}
        {animationStage >= 8 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5.5 }}
          >
            <text
              x="60" y="72"
              textAnchor="middle"
              fill="#fff"
              fontSize="8"
              fontWeight="bold"
            >
              BLOCK
            </text>
            <text
              x="60" y="82"
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
              fontWeight="bold"
            >
              #{blocks[0]?.height?.toString().slice(-4) || '0000'}
            </text>
            <circle cx="40" cy="75" r="3" fill="#fff" />
            <circle cx="80" cy="75" r="3" fill="#fff" />
          </motion.g>
        )}
      </svg>

      {/* Live indicator */}
      <div className="absolute -top-1 -right-1">
        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-600'} animate-pulse`} />
      </div>
    </div>
  );
}