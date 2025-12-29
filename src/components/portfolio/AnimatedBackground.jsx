import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedBackground({ isDark }) {
  const [blocks, setBlocks] = useState([
    { 
      id: 0, 
      hash: 'GENESIS', 
      prevHash: '0000',
      status: 'confirmed',
      data: 'Genesis Block',
      type: 'genesis'
    }
  ]);
  
  const [verificationBeams, setVerificationBeams] = useState([]);

  // Create new block every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const lastBlock = prev[prev.length - 1];
        if (lastBlock.status !== 'confirmed') return prev;
        
        const types = ['token', 'nft', 'data'];
        const newBlock = {
          id: prev.length,
          hash: Math.random().toString(36).substr(2, 6).toUpperCase(),
          prevHash: lastBlock.hash,
          status: 'pending',
          data: `Block #${prev.length}`,
          type: types[Math.floor(Math.random() * types.length)]
        };
        
        return [...prev, newBlock];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Verification process
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const pendingIndex = prev.findIndex(b => b.status === 'pending');
        if (pendingIndex === -1) return prev;
        
        const updated = [...prev];
        updated[pendingIndex] = { ...updated[pendingIndex], status: 'verifying' };
        
        if (pendingIndex > 0) {
          const beamId = Date.now();
          setVerificationBeams(prevBeams => [...prevBeams, {
            id: beamId,
            from: pendingIndex - 1,
            to: pendingIndex
          }]);
          
          setTimeout(() => {
            setVerificationBeams(prevBeams => prevBeams.filter(b => b.id !== beamId));
            
            setBlocks(prev2 => {
              const confirmed = [...prev2];
              const idx = confirmed.findIndex(b => b.status === 'verifying');
              if (idx !== -1) {
                confirmed[idx] = { ...confirmed[idx], status: 'confirmed' };
              }
              return confirmed;
            });
          }, 1500);
        }
        
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const blockWidth = 110;
  const spacing = 45;
  const visibleBlocks = blocks.slice(-3);

  const getBlockColors = (block) => {
    if (block.status === 'confirmed') {
      if (block.type === 'genesis') {
        return {
          bg: isDark ? 'from-purple-900/40 to-purple-800/30' : 'from-purple-50 to-purple-100',
          border: isDark ? 'border-purple-500' : 'border-purple-500',
          shadow: isDark ? 'shadow-purple-500/30' : 'shadow-purple-500/20',
          text: isDark ? 'text-purple-400' : 'text-purple-600'
        };
      }
      return {
        bg: isDark ? 'from-green-900/40 to-green-800/30' : 'from-green-50 to-green-100',
        border: isDark ? 'border-green-500' : 'border-green-500',
        shadow: isDark ? 'shadow-green-500/30' : 'shadow-green-500/20',
        text: isDark ? 'text-green-400' : 'text-green-600'
      };
    } else if (block.status === 'verifying') {
      return {
        bg: isDark ? 'from-purple-900/40 to-purple-800/30' : 'from-purple-50 to-purple-100',
        border: isDark ? 'border-purple-500' : 'border-purple-500',
        shadow: isDark ? 'shadow-purple-500/40' : 'shadow-purple-500/30',
        text: isDark ? 'text-purple-400' : 'text-purple-600'
      };
    } else {
      return {
        bg: isDark ? 'from-gray-800/60 to-gray-900/60' : 'from-gray-100 to-gray-200',
        border: isDark ? 'border-gray-600' : 'border-gray-400',
        shadow: 'shadow-gray-500/10',
        text: isDark ? 'text-gray-400' : 'text-gray-600'
      };
    }
  };

  return (
    <div className={`fixed inset-0 w-full h-full z-0 transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0a0118] via-[#160b2e] to-[#0d0221]' 
        : 'bg-gradient-to-br from-[#f0f4ff] via-[#e5e7ff] to-[#d5d9ff]'
    }`}>
      {/* Static gradient overlay for subtle depth */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]'
      }`} />

      {/* Blockchain Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[420px] opacity-30">
          <svg 
            width="100%" 
            height="240" 
            className="absolute top-0 left-0"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0" />
                <stop offset="50%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="1" />
                <stop offset="100%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Block connections */}
            {visibleBlocks.map((block, idx) => {
              if (idx === 0) return null;
              
              const x1 = (idx - 1) * (blockWidth + spacing) + blockWidth + 15;
              const x2 = idx * (blockWidth + spacing) + 15;
              const y = 120;
              
              return (
                <g key={`connection-${block.id}`}>
                  <motion.line
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke={isDark ? '#4b5563' : '#9ca3af'}
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <motion.polygon
                    points={`${x2-7},${y-4} ${x2},${y} ${x2-7},${y+4}`}
                    fill={isDark ? '#4b5563' : '#9ca3af'}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  />

                  <motion.text
                    x={(x1 + x2) / 2}
                    y={y - 12}
                    textAnchor="middle"
                    fill={isDark ? '#6b7280' : '#6b7280'}
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {visibleBlocks[idx - 1].hash}
                  </motion.text>
                </g>
              );
            })}

            {/* Verification beams */}
            <AnimatePresence>
              {verificationBeams.map(beam => {
                const fromIndex = visibleBlocks.findIndex(b => b.id === blocks[beam.from]?.id);
                const toIndex = visibleBlocks.findIndex(b => b.id === blocks[beam.to]?.id);
                
                if (fromIndex === -1 || toIndex === -1) return null;
                
                const x1 = fromIndex * (blockWidth + spacing) + blockWidth / 2 + 15;
                const x2 = toIndex * (blockWidth + spacing) + blockWidth / 2 + 15;
                const y = 120;
                
                return (
                  <motion.g key={beam.id}>
                    <motion.line
                      x1={x1}
                      y1={y}
                      x2={x2}
                      y2={y}
                      stroke="url(#beamGradient)"
                      strokeWidth="5"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                    
                    {[0, 0.25, 0.5].map((delay, i) => (
                      <motion.circle
                        key={i}
                        r="2.5"
                        fill={isDark ? '#8b5cf6' : '#7c3aed'}
                        filter="url(#glow)"
                        initial={{ cx: x1, cy: y }}
                        animate={{ cx: x2, cy: y }}
                        transition={{ 
                          duration: 1,
                          delay,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </svg>

          {/* Blocks */}
          <div className="relative pt-20 pb-8 px-4 flex gap-[45px] justify-center">
            <AnimatePresence mode="popLayout">
              {visibleBlocks.map((block) => {
                const colors = getBlockColors(block);
                
                return (
                  <motion.div
                    key={block.id}
                    initial={{ scale: 0, opacity: 0, y: -40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 250,
                      damping: 18
                    }}
                    className="relative flex-shrink-0"
                    style={{ width: blockWidth }}
                  >
                    <div className={`
                      relative rounded-lg p-3.5 border-2 transition-all duration-300
                      bg-gradient-to-br ${colors.bg} ${colors.border} shadow-lg ${colors.shadow}
                      ${block.status === 'verifying' ? 'animate-pulse' : ''}
                    `}>
                      {/* Status badge */}
                      <div className="absolute -top-1.5 -right-1.5 z-10">
                        {block.status === 'confirmed' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-2 h-2 rounded-sm ${block.type === 'genesis' ? 'bg-purple-500' : 'bg-green-500'}`}
                          />
                        )}
                        {block.status === 'verifying' && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className={`w-2 h-2 ${isDark ? 'bg-purple-500' : 'bg-purple-600'}`}
                          />
                        )}
                        {block.status === 'pending' && (
                          <div className={`w-2 h-2 rounded-sm ${isDark ? 'bg-gray-600' : 'bg-gray-500'}`} />
                        )}
                      </div>

                      {/* Block content */}
                      <div className="space-y-2">
                        <div className={`text-[10px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {block.data}
                        </div>
                        
                        <div className="space-y-0.5">
                          <div className={`text-[9px] font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            Hash:
                          </div>
                          <div className={`text-[11px] font-mono font-bold ${colors.text}`}>
                            {block.hash}
                          </div>
                        </div>
                        
                        {block.id > 0 && (
                          <div className="space-y-0.5">
                            <div className={`text-[9px] font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              Prev:
                            </div>
                            <div className={`text-[10px] font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {block.prevHash}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status footer */}
                      <div className={`mt-2.5 pt-2 border-t ${
                        isDark ? 'border-gray-700/50' : 'border-gray-300'
                      }`}>
                        <div className={`text-[8px] text-center font-mono font-semibold ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {block.status === 'confirmed' ? '✓ VERIFIED' : 
                           block.status === 'verifying' ? '⟳ VERIFYING...' : 
                           '⏳ PENDING'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}