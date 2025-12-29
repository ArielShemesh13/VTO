import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Generate blockchain blocks
  useEffect(() => {
    const initialBlocks = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 45) * (Math.PI / 180),
      radius: 42,
      hash: Math.random().toString(36).substring(2, 10).toUpperCase(),
      verified: i < 6,
      type: ['token', 'nft', 'data'][Math.floor(Math.random() * 3)],
    }));
    setBlocks(initialBlocks);
  }, []);

  // Animate transactions between blocks
  useEffect(() => {
    const interval = setInterval(() => {
      if (blocks.length === 0) return;
      
      const from = Math.floor(Math.random() * blocks.length);
      let to = Math.floor(Math.random() * blocks.length);
      while (to === from) to = Math.floor(Math.random() * blocks.length);

      const newTx = {
        id: Date.now() + Math.random(),
        from,
        to,
        type: ['token', 'nft', 'data'][Math.floor(Math.random() * 3)],
      };

      setTransactions(prev => [...prev, newTx]);

      setTimeout(() => {
        setTransactions(prev => prev.filter(tx => tx.id !== newTx.id));
      }, 1800);
    }, 1500);

    return () => clearInterval(interval);
  }, [blocks]);

  const getBlockPosition = (block) => {
    return {
      x: 60 + Math.cos(block.angle) * block.radius,
      y: 60 + Math.sin(block.angle) * block.radius,
    };
  };

  const getTxColor = (type) => {
    if (type === 'token') return isDark ? '#10b981' : '#16a34a';
    if (type === 'nft') return isDark ? '#f59e0b' : '#ea580c';
    return isDark ? '#3b82f6' : '#2563eb';
  };

  const getBlockColor = (type, verified) => {
    if (!verified) return isDark ? '#6b7280' : '#9ca3af';
    if (type === 'token') return isDark ? '#10b981' : '#16a34a';
    if (type === 'nft') return isDark ? '#f59e0b' : '#ea580c';
    return isDark ? '#3b82f6' : '#2563eb';
  };

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#10b981' : '#16a34a'} />
            <stop offset="100%" stopColor={isDark ? '#059669' : '#15803d'} />
          </linearGradient>

          <linearGradient id="nftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#f59e0b' : '#ea580c'} />
            <stop offset="100%" stopColor={isDark ? '#d97706' : '#c2410c'} />
          </linearGradient>

          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#3b82f6' : '#2563eb'} />
            <stop offset="100%" stopColor={isDark ? '#2563eb' : '#1d4ed8'} />
          </linearGradient>

          <linearGradient id="verifyingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} />
            <stop offset="100%" stopColor={isDark ? '#7c3aed' : '#6d28d9'} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Center core pulse */}
        <motion.circle
          cx="60" cy="60" r="15"
          fill={isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.08)'}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '60px 60px' }}
        />

        {/* Connections between adjacent blocks */}
        {blocks.map((block, index) => {
          const currentPos = getBlockPosition(block);
          const nextBlock = blocks[(index + 1) % blocks.length];
          const nextPos = getBlockPosition(nextBlock);
          
          return (
            <motion.line
              key={`connection-${block.id}`}
              x1={currentPos.x} y1={currentPos.y}
              x2={nextPos.x} y2={nextPos.y}
              stroke={isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.2)'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: index * 0.05 }}
            />
          );
        })}

        {/* Blockchain Blocks */}
        {blocks.map((block) => {
          const pos = getBlockPosition(block);
          const blockSize = 8;
          const blockColor = getBlockColor(block.type, block.verified);
          
          return (
            <motion.g
              key={block.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: block.id * 0.08, type: "spring", stiffness: 200 }}
            >
              {/* Connection to center */}
              <motion.line
                x1="60" y1="60"
                x2={pos.x} y2={pos.y}
                stroke={blockColor}
                strokeWidth="0.5"
                opacity="0.2"
                strokeDasharray="2 2"
              />

              {/* Block verification pulse */}
              {block.verified && (
                <motion.rect
                  x={pos.x - blockSize / 2 - 1}
                  y={pos.y - blockSize / 2 - 1}
                  width={blockSize + 2}
                  height={blockSize + 2}
                  rx="1.5"
                  fill="none"
                  stroke={blockColor}
                  strokeWidth="0.5"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ 
                    opacity: 0,
                    scale: 1.8
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />
              )}

              {/* Block outer glow */}
              <rect
                x={pos.x - blockSize / 2 - 1}
                y={pos.y - blockSize / 2 - 1}
                width={blockSize + 2}
                height={blockSize + 2}
                rx="1"
                fill={blockColor}
                opacity="0.2"
              />

              {/* Main Block */}
              <motion.rect
                x={pos.x - blockSize / 2}
                y={pos.y - blockSize / 2}
                width={blockSize}
                height={blockSize}
                rx="1"
                fill={blockColor}
                filter="url(#glow)"
                animate={block.verified ? {} : {
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity 
                }}
              />

              {/* Block inner detail */}
              <rect
                x={pos.x - blockSize / 2 + 1}
                y={pos.y - blockSize / 2 + 1}
                width={blockSize - 2}
                height={blockSize - 2}
                rx="0.5"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)'}
                strokeWidth="0.5"
              />

              {/* Data lines inside block */}
              <line
                x1={pos.x - 2}
                y1={pos.y - 1}
                x2={pos.x + 2}
                y2={pos.y - 1}
                stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)'}
                strokeWidth="0.5"
              />
              <line
                x1={pos.x - 2}
                y1={pos.y + 1}
                x2={pos.x + 2}
                y2={pos.y + 1}
                stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)'}
                strokeWidth="0.5"
              />

              {/* Verification checkmark */}
              {block.verified && (
                <motion.path
                  d={`M ${pos.x - 1.5} ${pos.y} L ${pos.x - 0.5} ${pos.y + 1.5} L ${pos.x + 1.5} ${pos.y - 1}`}
                  stroke={isDark ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.9)'}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: block.id * 0.08 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Transactions flowing between blocks */}
        <AnimatePresence>
          {transactions.map((tx) => {
            const fromPos = getBlockPosition(blocks[tx.from]);
            const toPos = getBlockPosition(blocks[tx.to]);
            
            return (
              <motion.g key={tx.id}>
                {/* Transaction path glow */}
                <motion.line
                  x1={fromPos.x} y1={fromPos.y}
                  x2={toPos.x} y2={toPos.y}
                  stroke={getTxColor(tx.type)}
                  strokeWidth="2"
                  opacity="0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 1.8 }}
                  filter="url(#strongGlow)"
                />

                {/* Moving data packet (cube) */}
                <motion.g
                  initial={{ 
                    x: fromPos.x,
                    y: fromPos.y,
                    scale: 0
                  }}
                  animate={{ 
                    x: toPos.x,
                    y: toPos.y,
                    scale: [0, 1.2, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.8,
                    ease: "easeInOut"
                  }}
                >
                  <rect
                    x={-1.5}
                    y={-1.5}
                    width="3"
                    height="3"
                    rx="0.5"
                    fill={getTxColor(tx.type)}
                    filter="url(#strongGlow)"
                  />
                  <rect
                    x={-1}
                    y={-1}
                    width="2"
                    height="2"
                    rx="0.3"
                    fill={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)'}
                  />
                </motion.g>

                {/* Trail particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.rect
                    key={i}
                    width="1.5"
                    height="1.5"
                    rx="0.3"
                    fill={getTxColor(tx.type)}
                    opacity="0.6"
                    initial={{ 
                      x: fromPos.x - 0.75,
                      y: fromPos.y - 0.75,
                      scale: 0
                    }}
                    animate={{ 
                      x: toPos.x - 0.75,
                      y: toPos.y - 0.75,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.8,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Center network hub - cubic design */}
        <motion.g
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: '60px 60px' }}
        >
          {/* Outer cube */}
          <rect
            x="54" y="54"
            width="12" height="12"
            rx="2"
            fill="none"
            stroke={isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.4)'}
            strokeWidth="1"
          />
          
          {/* Inner cube */}
          <rect
            x="56" y="56"
            width="8" height="8"
            rx="1"
            fill={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}
            stroke={isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.6)'}
            strokeWidth="0.5"
          />
        </motion.g>

        {/* Corner markers */}
        {[
          { x: 57, y: 57 },
          { x: 63, y: 57 },
          { x: 57, y: 63 },
          { x: 63, y: 63 }
        ].map((corner, i) => (
          <motion.circle
            key={i}
            cx={corner.x}
            cy={corner.y}
            r="0.5"
            fill={isDark ? '#8b5cf6' : '#7c3aed'}
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </svg>

      {/* Stats overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          key={transactions.length}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-mono font-bold ${
            isDark ? 'text-purple-400/60' : 'text-purple-600/70'
          }`}
        >
          {transactions.length} TX
        </motion.div>
      </div>
    </div>
  );
}