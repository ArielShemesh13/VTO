import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [activeNodes, setActiveNodes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [smartContracts, setSmartContracts] = useState([]);

  // Generate network nodes
  useEffect(() => {
    const nodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) * (Math.PI / 180),
      radius: 45,
      active: Math.random() > 0.3,
      type: ['validator', 'node', 'contract'][Math.floor(Math.random() * 3)],
    }));
    setActiveNodes(nodes);
  }, []);

  // Animate transactions
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeNodes.length === 0) return;
      
      const from = Math.floor(Math.random() * activeNodes.length);
      let to = Math.floor(Math.random() * activeNodes.length);
      while (to === from) to = Math.floor(Math.random() * activeNodes.length);

      const newTx = {
        id: Date.now() + Math.random(),
        from,
        to,
        progress: 0,
        type: ['token', 'nft', 'data'][Math.floor(Math.random() * 3)],
      };

      setTransactions(prev => [...prev, newTx]);

      setTimeout(() => {
        setTransactions(prev => prev.filter(tx => tx.id !== newTx.id));
      }, 2000);
    }, 1200);

    return () => clearInterval(interval);
  }, [activeNodes]);

  // Smart contract execution animation
  useEffect(() => {
    const interval = setInterval(() => {
      const newContract = {
        id: Date.now(),
        angle: Math.random() * 360,
      };
      setSmartContracts(prev => [...prev, newContract]);

      setTimeout(() => {
        setSmartContracts(prev => prev.filter(c => c.id !== newContract.id));
      }, 3000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getNodePosition = (node) => {
    return {
      x: 60 + Math.cos(node.angle) * node.radius,
      y: 60 + Math.sin(node.angle) * node.radius,
    };
  };

  const getTxColor = (type) => {
    if (type === 'token') return isDark ? '#10b981' : '#059669';
    if (type === 'nft') return isDark ? '#f59e0b' : '#d97706';
    return isDark ? '#3b82f6' : '#2563eb';
  };

  const getNodeColor = (type) => {
    if (type === 'validator') return isDark ? '#8b5cf6' : '#7c3aed';
    if (type === 'contract') return isDark ? '#ec4899' : '#db2777';
    return isDark ? '#06b6d4' : '#0891b2';
  };

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <defs>
          {/* Gradients */}
          <radialGradient id="centerCore">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0.3" />
            <stop offset="50%" stopColor={isDark ? '#06b6d4' : '#0891b2'} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="nftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          {/* Filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
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

        {/* Background grid */}
        <motion.circle
          cx="60" cy="60" r="55"
          fill="none"
          stroke={isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(124, 58, 237, 0.08)'}
          strokeWidth="0.5"
          strokeDasharray="2 2"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 60px' }}
        />

        <motion.circle
          cx="60" cy="60" r="35"
          fill="none"
          stroke={isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(8, 145, 178, 0.08)'}
          strokeWidth="0.5"
          strokeDasharray="2 2"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 60px' }}
        />

        {/* Center core - DeFi Hub */}
        <motion.circle
          cx="60" cy="60" r="25"
          fill="url(#centerCore)"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '60px 60px' }}
        />



        {/* Connections between adjacent nodes (circular chain) */}
        {activeNodes.map((node, index) => {
          const currentPos = getNodePosition(node);
          const nextNode = activeNodes[(index + 1) % activeNodes.length];
          const nextPos = getNodePosition(nextNode);
          
          return (
            <motion.line
              key={`connection-${node.id}`}
              x1={currentPos.x} y1={currentPos.y}
              x2={nextPos.x} y2={nextPos.y}
              stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)'}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: index * 0.05 }}
            />
          );
        })}

        {/* Network Nodes */}
        {activeNodes.map((node) => {
          const pos = getNodePosition(node);
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: node.active ? 1 : 0.3, scale: 1 }}
              transition={{ delay: node.id * 0.05 }}
            >
              {/* Connection to center */}
              <motion.line
                x1="60" y1="60"
                x2={pos.x} y2={pos.y}
                stroke={getNodeColor(node.type)}
                strokeWidth="0.5"
                opacity="0.15"
                strokeDasharray="2 2"
              />

              {/* Node pulse effect */}
              {node.active && (
                <motion.circle
                  cx={pos.x} cy={pos.y} r="4"
                  fill="none"
                  stroke={getNodeColor(node.type)}
                  strokeWidth="0.5"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ 
                    opacity: 0,
                    scale: 2.5
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />
              )}

              {/* Node body */}
              <circle
                cx={pos.x} cy={pos.y} r="4"
                fill={getNodeColor(node.type)}
                opacity="0.2"
              />
              
              <motion.circle
                cx={pos.x} cy={pos.y} r="2.5"
                fill={getNodeColor(node.type)}
                filter="url(#glow)"
                animate={node.active ? {
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />

              {/* Node highlight */}
              <circle
                cx={pos.x - 0.8} cy={pos.y - 0.8} r="0.8"
                fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)'}
              />

              {/* Validator badge */}
              {node.type === 'validator' && (
                <motion.path
                  d={`M ${pos.x - 1.5} ${pos.y} L ${pos.x - 0.5} ${pos.y + 1.2} L ${pos.x + 1.5} ${pos.y - 1}`}
                  stroke="white"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: node.id * 0.05 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Transactions flowing between nodes */}
        <AnimatePresence>
          {transactions.map((tx) => {
            const fromPos = getNodePosition(activeNodes[tx.from]);
            const toPos = getNodePosition(activeNodes[tx.to]);
            
            return (
              <motion.g key={tx.id}>
                {/* Transaction path */}
                <motion.line
                  x1={fromPos.x} y1={fromPos.y}
                  x2={toPos.x} y2={toPos.y}
                  stroke={getTxColor(tx.type)}
                  strokeWidth="1"
                  opacity="0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2 }}
                />

                {/* Moving particle */}
                <motion.circle
                  r="1.5"
                  fill={getTxColor(tx.type)}
                  filter="url(#strongGlow)"
                  initial={{ 
                    cx: fromPos.x,
                    cy: fromPos.y,
                    scale: 0
                  }}
                  animate={{ 
                    cx: toPos.x,
                    cy: toPos.y,
                    scale: [0, 1.5, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />

                {/* Trail effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={i}
                    r="0.8"
                    fill={getTxColor(tx.type)}
                    opacity="0.5"
                    initial={{ 
                      cx: fromPos.x,
                      cy: fromPos.y,
                      scale: 0
                    }}
                    animate={{ 
                      cx: toPos.x,
                      cy: toPos.y,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Smart Contract Execution Rings */}
        <AnimatePresence>
          {smartContracts.map((contract) => (
            <motion.g key={contract.id}>
              {/* Execution wave */}
              <motion.circle
                cx="60" cy="60" r="15"
                fill="none"
                stroke={isDark ? '#ec4899' : '#db2777'}
                strokeWidth="1.5"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ 
                  scale: 3,
                  opacity: 0
                }}
                transition={{ 
                  duration: 3,
                  ease: "easeOut"
                }}
                style={{ transformOrigin: '60px 60px' }}
              />

              {/* Code particles */}
              {[0, 72, 144, 216, 288].map((angle) => {
                const rad = (angle + contract.angle) * (Math.PI / 180);
                return (
                  <motion.rect
                    key={angle}
                    width="2"
                    height="1"
                    fill={isDark ? '#ec4899' : '#db2777'}
                    rx="0.5"
                    initial={{
                      x: 59,
                      y: 59,
                      opacity: 0
                    }}
                    animate={{
                      x: 60 + Math.cos(rad) * 40 - 1,
                      y: 60 + Math.sin(rad) * 40 - 0.5,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeOut"
                    }}
                  />
                );
              })}
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Outer data stream */}
        <motion.circle
          cx="60" cy="60" r="58"
          fill="none"
          stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)'}
          strokeWidth="2"
          strokeDasharray="5 10"
          animate={{ 
            rotate: 360,
            strokeDashoffset: [0, -15]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
          style={{ transformOrigin: '60px 60px' }}
        />
      </svg>

      {/* Glassmorphic overlay with stats */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`text-center ${isDark ? 'text-white/30' : 'text-black/30'} text-[6px] font-mono`}>
          <motion.div
            key={transactions.length}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            {transactions.length} TX/s
          </motion.div>
        </div>
      </div>



      {/* Rotating gradient rim */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, 
            transparent 0deg, 
            ${isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.15)'} 60deg, 
            ${isDark ? 'rgba(236, 72, 153, 0.15)' : 'rgba(219, 39, 119, 0.15)'} 120deg,
            ${isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.15)'} 180deg,
            transparent 240deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}