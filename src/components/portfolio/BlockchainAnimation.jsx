import React from 'react';
import { motion } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  // Define 4 blocks in the chain
  const blocks = [
    { id: 0, hash: '0x00...', status: 'verified', delay: 0 },
    { id: 1, hash: '0xA1...', status: 'verified', delay: 0.5 },
    { id: 2, hash: '0xB2...', status: 'verifying', delay: 1 },
    { id: 3, hash: '0xC3...', status: 'pending', delay: 1.5 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <svg
        viewBox="0 0 500 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="verifiedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#10b981' : '#059669'} />
            <stop offset="100%" stopColor={isDark ? '#059669' : '#047857'} />
          </linearGradient>
          <linearGradient id="verifyingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#3b82f6' : '#2563eb'} />
            <stop offset="100%" stopColor={isDark ? '#2563eb' : '#1d4ed8'} />
          </linearGradient>
          <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} />
            <stop offset="100%" stopColor={isDark ? '#7c3aed' : '#6d28d9'} />
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Chain connections */}
        {blocks.slice(0, -1).map((block, idx) => (
          <g key={`connection-${idx}`}>
            {/* Connection line */}
            <motion.line
              x1={60 + idx * 120}
              y1="100"
              x2={60 + (idx + 1) * 120}
              y2="100"
              stroke={isDark ? 'url(#verifiedGradient)' : '#059669'}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                delay: block.delay + 0.5,
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
            
            {/* Data packets moving along the chain */}
            <motion.circle
              r="3"
              fill={isDark ? '#10b981' : '#059669'}
              filter="url(#glow)"
              initial={{ 
                cx: 60 + idx * 120,
                cy: 100,
                opacity: 0 
              }}
              animate={{ 
                cx: 60 + (idx + 1) * 120,
                cy: 100,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                delay: block.delay + 0.5,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}

        {/* Blocks */}
        {blocks.map((block, idx) => {
          const x = 30 + idx * 120;
          const y = 70;
          
          const getGradient = () => {
            if (block.status === 'verified') return 'url(#verifiedGradient)';
            if (block.status === 'verifying') return 'url(#verifyingGradient)';
            return 'url(#pendingGradient)';
          };

          const getStrokeColor = () => {
            if (block.status === 'verified') return isDark ? '#10b981' : '#059669';
            if (block.status === 'verifying') return isDark ? '#3b82f6' : '#2563eb';
            return isDark ? '#8b5cf6' : '#7c3aed';
          };

          return (
            <motion.g
              key={block.id}
              initial={{ opacity: 0, scale: 0, y: y + 30 }}
              animate={{ opacity: 1, scale: 1, y }}
              transition={{
                delay: block.delay,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              {/* Block body */}
              <motion.rect
                x={x}
                width="60"
                height="60"
                rx="8"
                fill={getGradient()}
                stroke={getStrokeColor()}
                strokeWidth="2"
                opacity={0.9}
                filter="url(#glow)"
                animate={block.status === 'verifying' ? {
                  opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Block hash text */}
              <text
                x={x + 30}
                y={y + 25}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                #{block.id}
              </text>
              <text
                x={x + 30}
                y={y + 40}
                textAnchor="middle"
                fill="white"
                fontSize="7"
                fontFamily="monospace"
                opacity="0.8"
              >
                {block.hash}
              </text>

              {/* Status indicator */}
              {block.status === 'verified' && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: block.delay + 0.3 }}
                >
                  <circle
                    cx={x + 52}
                    cy={y + 8}
                    r="6"
                    fill={isDark ? '#10b981' : '#059669'}
                  />
                  <path
                    d={`M ${x + 49} ${y + 8} L ${x + 51} ${y + 10} L ${x + 55} ${y + 6}`}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.g>
              )}

              {block.status === 'verifying' && (
                <motion.circle
                  cx={x + 52}
                  cy={y + 8}
                  r="5"
                  stroke={isDark ? '#3b82f6' : '#2563eb'}
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, rotate: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    rotate: 360
                  }}
                  transition={{
                    pathLength: { duration: 1.5, repeat: Infinity, ease: "linear" },
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ transformOrigin: `${x + 52}px ${y + 8}px` }}
                />
              )}

              {block.status === 'pending' && (
                <motion.g
                  animate={{
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <circle
                    cx={x + 52}
                    cy={y + 8}
                    r="3"
                    fill={isDark ? '#8b5cf6' : '#7c3aed'}
                  />
                </motion.g>
              )}

              {/* Verification rays for verified blocks */}
              {block.status === 'verified' && (
                <>
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <motion.line
                      key={angle}
                      x1={x + 30}
                      y1={y + 30}
                      x2={x + 30 + Math.cos(angle * Math.PI / 180) * 40}
                      y2={y + 30 + Math.sin(angle * Math.PI / 180) * 40}
                      stroke={getStrokeColor()}
                      strokeWidth="1"
                      opacity="0"
                      animate={{
                        opacity: [0, 0.5, 0],
                        x2: x + 30 + Math.cos(angle * Math.PI / 180) * 50,
                        y2: y + 30 + Math.sin(angle * Math.PI / 180) * 50,
                      }}
                      transition={{
                        delay: block.delay + 0.5,
                        duration: 1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}

              {/* Mining/validation effect for verifying block */}
              {block.status === 'verifying' && (
                <motion.rect
                  x={x - 5}
                  y={y - 5}
                  width="70"
                  height="70"
                  rx="10"
                  stroke={isDark ? '#3b82f6' : '#2563eb'}
                  strokeWidth="2"
                  fill="none"
                  opacity="0"
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [1, 1.1, 1.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{ transformOrigin: `${x + 30}px ${y + 30}px` }}
                />
              )}
            </motion.g>
          );
        })}

        {/* New block creation animation */}
        <motion.g
          initial={{ opacity: 0, x: 30 + blocks.length * 120, y: 40 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [40, 70, 70],
            scale: [0.5, 1, 1]
          }}
          transition={{
            delay: 4,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <rect
            width="60"
            height="60"
            rx="8"
            fill="url(#pendingGradient)"
            opacity="0.5"
            strokeDasharray="4 4"
            stroke={isDark ? '#8b5cf6' : '#7c3aed'}
            strokeWidth="2"
          />
          <text
            x="30"
            y="35"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            opacity="0.7"
          >
            New
          </text>
        </motion.g>

        {/* Labels */}
        <text
          x="250"
          y="170"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
          fontSize="12"
          fontWeight="500"
        >
          Live Blockchain Verification
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded ${isDark ? 'bg-green-500' : 'bg-green-600'}`} />
          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Verified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Verifying</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded ${isDark ? 'bg-purple-500' : 'bg-purple-600'}`} />
          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Pending</span>
        </div>
      </div>
    </div>
  );
}