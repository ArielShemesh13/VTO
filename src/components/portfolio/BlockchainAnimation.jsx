import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [verifying, setVerifying] = useState([]);

  // Initialize blockchain blocks
  useEffect(() => {
    const initialBlocks = [
      { id: 0, x: 35, y: 35, hash: 'A1F2', verified: true, type: 'token' },
      { id: 1, x: 55, y: 30, hash: 'B8C4', verified: true, type: 'data' },
      { id: 2, x: 75, y: 40, hash: 'D3E9', verified: true, type: 'nft' },
      { id: 3, x: 85, y: 60, hash: 'F7A2', verified: true, type: 'token' },
      { id: 4, x: 75, y: 80, hash: 'C5B1', verified: false, type: 'data' },
      { id: 5, x: 55, y: 85, hash: 'E9D4', verified: false, type: 'nft' },
      { id: 6, x: 35, y: 75, hash: '8F3C', verified: true, type: 'token' },
      { id: 7, x: 25, y: 55, hash: '2A7E', verified: true, type: 'data' },
    ];
    setBlocks(initialBlocks);
  }, []);

  // Verification animation
  useEffect(() => {
    const interval = setInterval(() => {
      const unverified = blocks.filter(b => !b.verified);
      if (unverified.length > 0) {
        const blockToVerify = unverified[Math.floor(Math.random() * unverified.length)];
        
        setVerifying(prev => [...prev, blockToVerify.id]);
        
        setTimeout(() => {
          setBlocks(prev => prev.map(b => 
            b.id === blockToVerify.id ? { ...b, verified: true } : b
          ));
          setVerifying(prev => prev.filter(id => id !== blockToVerify.id));
        }, 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [blocks]);

  // Transaction animations
  useEffect(() => {
    const interval = setInterval(() => {
      if (blocks.length < 2) return;
      
      const from = Math.floor(Math.random() * blocks.length);
      let to = Math.floor(Math.random() * blocks.length);
      while (to === from) to = Math.floor(Math.random() * blocks.length);

      const newTx = {
        id: Date.now() + Math.random(),
        from: blocks[from],
        to: blocks[to],
        type: ['token', 'nft', 'data'][Math.floor(Math.random() * 3)],
      };

      setTransactions(prev => [...prev, newTx]);

      setTimeout(() => {
        setTransactions(prev => prev.filter(tx => tx.id !== newTx.id));
      }, 2000);
    }, 1800);

    return () => clearInterval(interval);
  }, [blocks]);

  const getBlockColor = (type, verified) => {
    if (!verified) {
      return {
        fill: isDark ? '#6b7280' : '#d1d5db',
        stroke: isDark ? '#4b5563' : '#9ca3af',
        glow: 'rgba(107, 114, 128, 0.3)'
      };
    }
    
    const colors = {
      token: {
        fill: isDark ? '#10b981' : '#16a34a',
        stroke: isDark ? '#059669' : '#15803d',
        glow: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(22, 163, 74, 0.5)'
      },
      nft: {
        fill: isDark ? '#f59e0b' : '#ea580c',
        stroke: isDark ? '#d97706' : '#c2410c',
        glow: isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(234, 88, 12, 0.5)'
      },
      data: {
        fill: isDark ? '#3b82f6' : '#2563eb',
        stroke: isDark ? '#2563eb' : '#1d4ed8',
        glow: isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.5)'
      }
    };
    
    return colors[type] || colors.data;
  };

  const getTxColor = (type) => {
    const colors = {
      token: isDark ? '#10b981' : '#16a34a',
      nft: isDark ? '#f59e0b' : '#ea580c',
      data: isDark ? '#3b82f6' : '#2563eb'
    };
    return colors[type] || colors.data;
  };

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <defs>
          <filter id="blockGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Chain connections */}
        {blocks.map((block, idx) => {
          const nextBlock = blocks[(idx + 1) % blocks.length];
          const colors = getBlockColor(block.type, block.verified);
          
          return (
            <motion.line
              key={`chain-${block.id}`}
              x1={block.x}
              y1={block.y}
              x2={nextBlock.x}
              y2={nextBlock.y}
              stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.25)'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.4, pathLength: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            />
          );
        })}

        {/* Blockchain Blocks */}
        {blocks.map((block) => {
          const colors = getBlockColor(block.type, block.verified);
          const isVerifying = verifying.includes(block.id);
          const size = 10;
          
          return (
            <motion.g
              key={block.id}
              initial={{ opacity: 0, scale: 0, x: block.x, y: block.y }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: block.id * 0.1, type: "spring", stiffness: 300 }}
            >
              {/* Verification pulse effect */}
              {isVerifying && (
                <>
                  <motion.rect
                    x={block.x - size/2 - 3}
                    y={block.y - size/2 - 3}
                    width={size + 6}
                    height={size + 6}
                    rx="2"
                    fill="none"
                    stroke={isDark ? '#8b5cf6' : '#7c3aed'}
                    strokeWidth="1"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ 
                      opacity: 0,
                      scale: 1.5
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity
                    }}
                    style={{ transformOrigin: `${block.x}px ${block.y}px` }}
                  />
                  
                  {/* Verification scanning lines */}
                  <motion.line
                    x1={block.x - size/2 - 5}
                    y1={block.y}
                    x2={block.x + size/2 + 5}
                    y2={block.y}
                    stroke={isDark ? '#8b5cf6' : '#7c3aed'}
                    strokeWidth="0.5"
                    initial={{ y: block.y - size/2 - 5 }}
                    animate={{ 
                      y: block.y + size/2 + 5
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </>
              )}

              {/* Block outer glow */}
              <rect
                x={block.x - size/2 - 1.5}
                y={block.y - size/2 - 1.5}
                width={size + 3}
                height={size + 3}
                rx="1.5"
                fill={colors.glow}
                opacity="0.6"
              />

              {/* Main block body */}
              <motion.rect
                x={block.x - size/2}
                y={block.y - size/2}
                width={size}
                height={size}
                rx="1.5"
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth="1"
                filter="url(#blockGlow)"
                animate={isVerifying ? {
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ 
                  duration: 0.5,
                  repeat: isVerifying ? Infinity : 0
                }}
                style={{ transformOrigin: `${block.x}px ${block.y}px` }}
              />

              {/* Block structure - header */}
              <rect
                x={block.x - size/2 + 0.5}
                y={block.y - size/2 + 0.5}
                width={size - 1}
                height={2}
                fill={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)'}
              />

              {/* Block structure - data lines */}
              <line
                x1={block.x - size/2 + 1.5}
                y1={block.y - 1}
                x2={block.x + size/2 - 1.5}
                y2={block.y - 1}
                stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)'}
                strokeWidth="0.5"
              />
              <line
                x1={block.x - size/2 + 1.5}
                y1={block.y + 1}
                x2={block.x + size/2 - 1.5}
                y2={block.y + 1}
                stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)'}
                strokeWidth="0.5"
              />

              {/* Block hash display */}
              <text
                x={block.x}
                y={block.y + 1}
                textAnchor="middle"
                fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)'}
                fontSize="3"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {block.hash}
              </text>

              {/* Verification badge */}
              {block.verified && !isVerifying && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Badge background */}
                  <rect
                    x={block.x + size/2 - 2}
                    y={block.y - size/2 - 2}
                    width="4"
                    height="4"
                    rx="0.5"
                    fill={isDark ? '#10b981' : '#16a34a'}
                  />
                  
                  {/* Checkmark */}
                  <path
                    d={`M ${block.x + size/2 - 1.2} ${block.y - size/2} 
                        L ${block.x + size/2 - 0.5} ${block.y - size/2 + 0.8} 
                        L ${block.x + size/2 + 0.5} ${block.y - size/2 - 0.5}`}
                    stroke="white"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.g>
              )}

              {/* Unverified indicator */}
              {!block.verified && !isVerifying && (
                <motion.rect
                  x={block.x + size/2 - 2}
                  y={block.y - size/2 - 2}
                  width="4"
                  height="4"
                  rx="0.5"
                  fill={isDark ? '#ef4444' : '#dc2626'}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Transaction flows */}
        <AnimatePresence>
          {transactions.map((tx) => {
            const color = getTxColor(tx.type);
            
            return (
              <motion.g key={tx.id}>
                {/* Transaction path */}
                <motion.line
                  x1={tx.from.x}
                  y1={tx.from.y}
                  x2={tx.to.x}
                  y2={tx.to.y}
                  stroke={color}
                  strokeWidth="1.5"
                  opacity="0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2 }}
                  filter="url(#strongGlow)"
                />

                {/* Moving data packet */}
                <motion.g
                  initial={{ 
                    x: tx.from.x,
                    y: tx.from.y,
                    scale: 0
                  }}
                  animate={{ 
                    x: tx.to.x,
                    y: tx.to.y,
                    scale: [0, 1.3, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  {/* Packet body */}
                  <rect
                    x={-2}
                    y={-2}
                    width="4"
                    height="4"
                    rx="0.5"
                    fill={color}
                    filter="url(#blockGlow)"
                  />
                  
                  {/* Packet highlight */}
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
                {[0, 1, 2].map((i) => (
                  <motion.rect
                    key={i}
                    width="2"
                    height="2"
                    rx="0.3"
                    fill={color}
                    opacity="0.5"
                    initial={{ 
                      x: tx.from.x - 1,
                      y: tx.from.y - 1,
                      scale: 0
                    }}
                    animate={{ 
                      x: tx.to.x - 1,
                      y: tx.to.y - 1,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Central hub cube */}
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
          {/* Hub structure */}
          <rect
            x="54"
            y="54"
            width="12"
            height="12"
            rx="2"
            fill="none"
            stroke={isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.4)'}
            strokeWidth="1.5"
          />
          
          <rect
            x="56"
            y="56"
            width="8"
            height="8"
            rx="1"
            fill={isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.2)'}
            stroke={isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.6)'}
            strokeWidth="1"
          />
          
          {/* Corner dots */}
          {[[57, 57], [63, 57], [57, 63], [63, 63]].map(([x, y], i) => (
            <motion.rect
              key={i}
              x={x - 0.5}
              y={y - 0.5}
              width="1"
              height="1"
              rx="0.2"
              fill={isDark ? '#8b5cf6' : '#7c3aed'}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.g>
      </svg>

      {/* Transaction counter */}
      <motion.div
        key={transactions.length}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-mono font-bold ${
          isDark ? 'text-purple-400/70' : 'text-purple-600/80'
        }`}
      >
        {blocks.filter(b => b.verified).length}/{blocks.length} VERIFIED
      </motion.div>
    </div>
  );
}