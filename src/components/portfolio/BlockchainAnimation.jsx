import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateHash = () => {
  const chars = '0123456789ABCDEF';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([]);
  const [blockCounter, setBlockCounter] = useState(0);

  // Add new block every 2 seconds
  useEffect(() => {
    const addInterval = setInterval(() => {
      setBlockCounter(prev => prev + 1);
      setBlocks(prev => [...prev, {
        id: Date.now(),
        blockNum: blockCounter,
        status: 'mining',
        hash: '',
        progress: 0
      }]);
    }, 2000);

    return () => clearInterval(addInterval);
  }, [blockCounter]);

  // Update block statuses
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setBlocks(prev => prev.map(block => {
        if (block.status === 'mining') {
          if (block.progress >= 100) {
            return { ...block, status: 'verifying', hash: generateHash(), progress: 0 };
          }
          return { ...block, progress: block.progress + 10 };
        }
        if (block.status === 'verifying') {
          if (block.progress >= 100) {
            return { ...block, status: 'verified', progress: 100 };
          }
          return { ...block, progress: block.progress + 20 };
        }
        return block;
      }));
    }, 200);

    return () => clearInterval(updateInterval);
  }, []);

  // Keep only last 8 blocks
  useEffect(() => {
    if (blocks.length > 8) {
      setBlocks(prev => prev.slice(-8));
    }
  }, [blocks]);

  const getColor = (status) => {
    if (status === 'mining') return isDark ? '#a855f7' : '#8b5cf6';
    if (status === 'verifying') return isDark ? '#3b82f6' : '#2563eb';
    return isDark ? '#10b981' : '#059669';
  };

  const maxBlocks = 8;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)'} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx="60" cy="60" r="45" fill="url(#centerGlow)" />

        {/* Center circle */}
        <motion.circle
          cx="60" cy="60" r="30"
          fill="none"
          stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}
          strokeWidth="0.5"
          strokeDasharray="2 2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 60px' }}
        />

        {/* Blocks */}
        <AnimatePresence>
          {blocks.map((block, index) => {
            const angle = (index * (360 / maxBlocks)) * (Math.PI / 180);
            const x = 60 + Math.cos(angle) * 35;
            const y = 60 + Math.sin(angle) * 35;
            const color = getColor(block.status);
            
            return (
              <motion.g
                key={block.id}
                initial={{ opacity: 0, scale: 0, x: 60, y: 60 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Connection line to center */}
                <motion.line
                  x1="60" y1="60"
                  x2={x} y2={y}
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Connection to next block */}
                {index < blocks.length - 1 && (
                  <motion.line
                    x1={x} y1={y}
                    x2={60 + Math.cos((index + 1) * (360 / maxBlocks) * (Math.PI / 180)) * 35}
                    y2={60 + Math.sin((index + 1) * (360 / maxBlocks) * (Math.PI / 180)) * 35}
                    stroke={color}
                    strokeWidth="0.5"
                    opacity="0.15"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                )}

                {/* Outer glow ring */}
                <motion.circle
                  cx={x} cy={y} r="10"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  opacity="0.2"
                  animate={block.status === 'mining' ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0, 0.2]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />

                {/* Block circle */}
                <motion.circle
                  cx={x} cy={y} r="6"
                  fill={color}
                  filter="url(#glow)"
                  animate={block.status === 'mining' ? {
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />

                {/* Inner detail */}
                <circle
                  cx={x} cy={y} r="4"
                  fill={isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)'}
                />

                {/* Progress ring for mining/verifying */}
                {(block.status === 'mining' || block.status === 'verifying') && (
                  <motion.circle
                    cx={x} cy={y} r="5"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="31.4"
                    strokeDashoffset={31.4 - (31.4 * block.progress / 100)}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: `${x}px ${y}px` }}
                  />
                )}

                {/* Status icon */}
                {block.status === 'verified' && (
                  <motion.path
                    d={`M ${x - 2.5} ${y} L ${x - 0.5} ${y + 2} L ${x + 2.5} ${y - 2}`}
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Data particles */}
                {block.status === 'mining' && (
                  <>
                    {[0, 120, 240].map((particleAngle, i) => {
                      const px = x + Math.cos(particleAngle * Math.PI / 180) * 8;
                      const py = y + Math.sin(particleAngle * Math.PI / 180) * 8;
                      return (
                        <motion.circle
                          key={i}
                          r="0.5"
                          fill={color}
                          initial={{ cx: x, cy: y, opacity: 0 }}
                          animate={{
                            cx: px,
                            cy: py,
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Center text */}
        <text
          x="60" y="58"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
          fontSize="7"
          fontWeight="bold"
        >
          BLOCK
        </text>
        <text
          x="60" y="66"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'}
          fontSize="9"
          fontWeight="bold"
        >
          #{blockCounter}
        </text>

        {/* Rotating outer ring */}
        <motion.circle
          cx="60" cy="60" r="50"
          fill="none"
          stroke={isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.08)'}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 60px' }}
        />
      </svg>

      {/* Outer rotating gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${
            blocks.length > 0 ? getColor(blocks[blocks.length - 1].status) + '20' : 'transparent'
          }, transparent)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}