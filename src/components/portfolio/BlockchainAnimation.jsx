import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [blockCount, setBlockCount] = useState(0);
  const [hashNumbers, setHashNumbers] = useState({});

  // Add new blocks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockCount(prev => (prev < 4 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Animate hash numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setHashNumbers(prev => ({
        ...prev,
        [blockCount]: Math.floor(Math.random() * 999999)
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [blockCount]);

  const blocks = [
    { id: 0, x: 50, y: 50, status: 'verified' },
    { id: 1, x: 180, y: 50, status: blockCount >= 1 ? 'verified' : 'pending' },
    { id: 2, x: 310, y: 50, status: blockCount >= 2 ? 'verifying' : 'pending' },
    { id: 3, x: 440, y: 50, status: blockCount >= 3 ? 'mining' : 'pending' },
  ];

  const getColor = (status) => {
    if (status === 'verified') return isDark ? '#10b981' : '#059669';
    if (status === 'verifying') return isDark ? '#3b82f6' : '#2563eb';
    if (status === 'mining') return isDark ? '#a855f7' : '#7c3aed';
    return isDark ? '#6b7280' : '#9ca3af';
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 500 150" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {blocks.slice(0, -1).map((block, idx) => (
          block.status !== 'pending' && blocks[idx + 1].status !== 'pending' && (
            <motion.line
              key={`line-${idx}`}
              x1={block.x + 40}
              y1={block.y + 20}
              x2={blocks[idx + 1].x}
              y2={blocks[idx + 1].y + 20}
              stroke={getColor(block.status)}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )
        ))}

        {/* Blocks */}
        {blocks.map((block) => {
          if (block.status === 'pending') return null;
          
          return (
            <motion.g
              key={block.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {/* Block rectangle */}
              <motion.rect
                x={block.x}
                y={block.y}
                width="40"
                height="40"
                rx="6"
                fill={getColor(block.status)}
                opacity="0.9"
                filter="url(#glow)"
                animate={block.status === 'mining' ? {
                  opacity: [0.7, 1, 0.7]
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Block number */}
              <text
                x={block.x + 20}
                y={block.y + 20}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                #{block.id}
              </text>

              {/* Hash number (for mining blocks) */}
              {block.status === 'mining' && (
                <motion.text
                  x={block.x + 20}
                  y={block.y + 32}
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                  fontFamily="monospace"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  {hashNumbers[blockCount] || '000000'}
                </motion.text>
              )}

              {/* Status icon */}
              {block.status === 'verified' && (
                <motion.path
                  d={`M ${block.x + 32} ${block.y + 8} L ${block.x + 35} ${block.y + 11} L ${block.x + 40} ${block.y + 6}`}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              )}

              {/* Verifying spinner */}
              {block.status === 'verifying' && (
                <motion.circle
                  cx={block.x + 36}
                  cy={block.y + 8}
                  r="4"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="6 10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${block.x + 36}px ${block.y + 8}px` }}
                />
              )}

              {/* Mining particles */}
              {block.status === 'mining' && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={i}
                      r="1.5"
                      fill="white"
                      cx={block.x + 10 + i * 10}
                      cy={block.y - 5}
                      animate={{
                        cy: [block.y - 5, block.y - 20],
                        opacity: [1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </>
              )}

              {/* Outer glow for active blocks */}
              {(block.status === 'mining' || block.status === 'verifying') && (
                <motion.rect
                  x={block.x - 5}
                  y={block.y - 5}
                  width="50"
                  height="50"
                  rx="8"
                  stroke={getColor(block.status)}
                  strokeWidth="1"
                  fill="none"
                  opacity="0"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: `${block.x + 20}px ${block.y + 20}px` }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Legend */}
        <text x="250" y="130" textAnchor="middle" fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'} fontSize="10">
          Blockchain Mining & Verification
        </text>
      </svg>

      {/* Status indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3 text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Mining</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Verifying</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Verified</span>
        </div>
      </div>
    </div>
  );
}