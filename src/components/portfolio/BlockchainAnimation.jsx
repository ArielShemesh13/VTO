import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real Kaspa blocks
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch('https://api.kaspa.org/blocks/recent');
        const data = await response.json();
        if (data && data.blocks) {
          setBlocks(data.blocks.slice(0, 8).map(b => ({
            id: b.hash?.substring(0, 8) || Math.random().toString(36).substring(7),
            hash: b.hash?.substring(0, 8) || '????????',
            height: b.height || 0,
            timestamp: b.timestamp || Date.now(),
            isNew: false
          })));
        }
      } catch (error) {
        // Fallback to simulated blocks
        setBlocks(Array.from({ length: 6 }, (_, i) => ({
          id: Math.random().toString(36).substring(7),
          hash: Math.random().toString(36).substring(2, 10).toUpperCase(),
          height: 50000000 + i,
          timestamp: Date.now() - (6 - i) * 2000,
          isNew: false
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlocks();

    // Refresh blocks periodically
    const interval = setInterval(fetchBlocks, 3000);
    return () => clearInterval(interval);
  }, []);

  // Add new block animation
  useEffect(() => {
    if (blocks.length === 0 || isLoading) return;

    const newBlockInterval = setInterval(() => {
      const newBlock = {
        id: Math.random().toString(36).substring(7),
        hash: Math.random().toString(36).substring(2, 10).toUpperCase(),
        height: (blocks[blocks.length - 1]?.height || 0) + 1,
        timestamp: Date.now(),
        isNew: true
      };

      setBlocks(prev => {
        const updated = [...prev, newBlock];
        return updated.slice(-8);
      });

      // Remove "isNew" flag after animation
      setTimeout(() => {
        setBlocks(prev => prev.map(b => ({ ...b, isNew: false })));
      }, 1000);
    }, 2500);

    return () => clearInterval(newBlockInterval);
  }, [blocks.length, isLoading]);

  if (isLoading || blocks.length === 0) {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div
          className={`w-8 h-8 rounded-full border-2 ${
            isDark ? 'border-purple-500/30 border-t-purple-500' : 'border-purple-400/30 border-t-purple-400'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const maxBlocks = 8;

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
          <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} />
            <stop offset="100%" stopColor={isDark ? '#06b6d4' : '#0891b2'} />
          </linearGradient>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor={isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx="60" cy="60" r="50" fill="url(#centerGlow)" />

        {/* Rotating rings */}
        <motion.circle
          cx="60" cy="60" r="32"
          fill="none"
          stroke={isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'}
          strokeWidth="0.5"
          strokeDasharray="3 3"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 60px' }}
        />

        <motion.circle
          cx="60" cy="60" r="48"
          fill="none"
          stroke={isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(8, 145, 178, 0.08)'}
          strokeWidth="0.5"
          strokeDasharray="2 2"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 60px' }}
        />

        {/* Blocks */}
        <AnimatePresence mode="popLayout">
          {blocks.map((block, index) => {
            const angle = (index * (360 / maxBlocks)) * (Math.PI / 180);
            const radius = 38;
            const x = 60 + Math.cos(angle) * radius;
            const y = 60 + Math.sin(angle) * radius;
            
            return (
              <motion.g
                key={block.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 60,
                  y: 60
                }}
                animate={{ 
                  opacity: 1, 
                  scale: block.isNew ? [0, 1.3, 1] : 1,
                  x, 
                  y 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  scale: { duration: 0.6 }
                }}
              >
                {/* Connection line to center */}
                <motion.line
                  x1="60" y1="60"
                  x2={x} y2={y}
                  stroke="url(#blockGradient)"
                  strokeWidth="0.8"
                  opacity="0.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Connection to next block (circular chain) */}
                {index < blocks.length - 1 && (
                  <motion.path
                    d={`M ${x} ${y} A ${radius} ${radius} 0 0 1 ${
                      60 + Math.cos(((index + 1) * (360 / maxBlocks)) * (Math.PI / 180)) * radius
                    } ${
                      60 + Math.sin(((index + 1) * (360 / maxBlocks)) * (Math.PI / 180)) * radius
                    }`}
                    stroke="url(#blockGradient)"
                    strokeWidth="1"
                    opacity="0.15"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                )}

                {/* Pulse effect for new blocks */}
                {block.isNew && (
                  <motion.circle
                    cx={x} cy={y} r="8"
                    fill="none"
                    stroke="url(#blockGradient)"
                    strokeWidth="1"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ 
                      opacity: 0,
                      scale: 2
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}

                {/* Block outer circle */}
                <circle
                  cx={x} cy={y} r="7"
                  fill="url(#blockGradient)"
                  opacity="0.3"
                />

                {/* Block main circle */}
                <motion.circle
                  cx={x} cy={y} r="5"
                  fill="url(#blockGradient)"
                  filter="url(#blockGlow)"
                  animate={block.isNew ? {
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />

                {/* Inner highlight */}
                <circle
                  cx={x - 1.5} cy={y - 1.5} r="1.5"
                  fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.6)'}
                />

                {/* Data stream particles */}
                {block.isNew && (
                  <>
                    {[0, 90, 180, 270].map((particleAngle, i) => {
                      const px = x + Math.cos((particleAngle + angle * 180 / Math.PI) * Math.PI / 180) * 10;
                      const py = y + Math.sin((particleAngle + angle * 180 / Math.PI) * Math.PI / 180) * 10;
                      return (
                        <motion.circle
                          key={i}
                          r="1"
                          fill={isDark ? '#8b5cf6' : '#7c3aed'}
                          initial={{ cx: x, cy: y, opacity: 0 }}
                          animate={{
                            cx: px,
                            cy: py,
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: "easeOut"
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

        {/* Center logo/text */}
        <circle cx="60" cy="60" r="18" fill={isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'} />
        <text
          x="60" y="58"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}
          fontSize="6"
          fontWeight="bold"
        >
          KASPA
        </text>
        <text
          x="60" y="66"
          textAnchor="middle"
          fill={isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
          fontSize="8"
          fontWeight="bold"
        >
          #{blocks[blocks.length - 1]?.height.toString().slice(-4) || '0000'}
        </text>
      </svg>

      {/* Outer rotating gradient effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${
            isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'
          } 90deg, transparent 180deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Live indicator */}
      <div className="absolute -top-1 -right-1 flex items-center gap-1">
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-600'}`}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}