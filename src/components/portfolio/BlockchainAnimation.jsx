import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateHash = () => {
  const chars = '0123456789ABCDEF';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([
    { id: 0, status: 'verified', hash: generateHash() },
    { id: 1, status: 'verified', hash: generateHash() },
    { id: 2, status: 'mining', hash: '' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const newBlocks = [...prev];
        const miningIndex = newBlocks.findIndex(b => b.status === 'mining');
        
        if (miningIndex !== -1) {
          newBlocks[miningIndex] = { ...newBlocks[miningIndex], status: 'verifying', hash: generateHash() };
        } else {
          const verifyingIndex = newBlocks.findIndex(b => b.status === 'verifying');
          if (verifyingIndex !== -1) {
            newBlocks[verifyingIndex] = { ...newBlocks[verifyingIndex], status: 'verified' };
            newBlocks.push({ id: Date.now(), status: 'mining', hash: '' });
            if (newBlocks.length > 4) newBlocks.shift();
          }
        }
        
        return newBlocks;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (status) => {
    if (status === 'mining') return isDark ? '#a855f7' : '#8b5cf6';
    if (status === 'verifying') return isDark ? '#3b82f6' : '#2563eb';
    return isDark ? '#10b981' : '#059669';
  };

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
        </defs>

        {/* Center circle */}
        <motion.circle
          cx="60" cy="60" r="35"
          fill={isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'}
          stroke={isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'}
          strokeWidth="1"
        />

        {/* Blocks around the circle */}
        <AnimatePresence mode="popLayout">
          {blocks.map((block, index) => {
            const angle = (index * (360 / blocks.length)) * (Math.PI / 180);
            const x = 60 + Math.cos(angle) * 40;
            const y = 60 + Math.sin(angle) * 40;
            
            return (
              <motion.g
                key={block.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Connection line */}
                <motion.line
                  x1="60" y1="60"
                  x2={x} y2={y}
                  stroke={getColor(block.status)}
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />

                {/* Block circle */}
                <motion.circle
                  cx={x} cy={y} r="8"
                  fill={getColor(block.status)}
                  filter="url(#glow)"
                  animate={block.status === 'mining' ? {
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />

                {/* Block inner circle */}
                <circle
                  cx={x} cy={y} r="5"
                  fill={isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}
                />

                {/* Status indicator */}
                {block.status === 'verified' && (
                  <motion.path
                    d={`M ${x - 3} ${y} L ${x - 1} ${y + 2} L ${x + 3} ${y - 2}`}
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                )}
                
                {block.status === 'mining' && (
                  <motion.text
                    x={x} y={y + 2}
                    textAnchor="middle"
                    fill="white"
                    fontSize="6"
                    fontWeight="bold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ⚡
                  </motion.text>
                )}

                {block.status === 'verifying' && (
                  <motion.circle
                    cx={x} cy={y} r="4"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Center text */}
        <text
          x="60" y="58"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
          fontSize="8"
          fontWeight="bold"
        >
          CHAIN
        </text>
        <text
          x="60" y="67"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}
          fontSize="5"
        >
          {blocks.filter(b => b.status === 'verified').length} verified
        </text>
      </svg>

      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${getColor(blocks[blocks.length - 1]?.status)}00, ${getColor(blocks[blocks.length - 1]?.status)}40, ${getColor(blocks[blocks.length - 1]?.status)}00)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}