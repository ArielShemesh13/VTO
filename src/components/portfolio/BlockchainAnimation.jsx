import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([
    { 
      id: 0, 
      hash: 'GEN', 
      prevHash: '000',
      status: 'confirmed',
      type: 'genesis'
    }
  ]);
  
  const [verificationBeams, setVerificationBeams] = useState([]);

  // יצירת בלוק חדש כל 4 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        // כל 4 בלוקים, התחל מחדש עם בלוק חדש
        if (prev.length >= 5) {
          const newBlock = {
            id: prev.length,
            hash: `B${prev.length}`,
            prevHash: '000',
            status: 'pending',
            type: 'genesis'
          };
          return [newBlock];
        }
        
        const lastBlock = prev[prev.length - 1];
        if (lastBlock.status === 'pending' || lastBlock.status === 'unverified') return prev;
        
        const newBlock = {
          id: prev.length,
          hash: `${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
          prevHash: lastBlock.hash,
          status: 'pending',
          type: 'block'
        };
        
        return [...prev, newBlock];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // תהליך אימות: pending -> verifying (with beam) -> confirmed או unverified
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
                // 80% סיכוי להצליח, 20% להיכשל
                const success = Math.random() > 0.2;
                confirmed[idx] = { 
                  ...confirmed[idx], 
                  status: success ? 'confirmed' : 'unverified'
                };
              }
              return confirmed;
            });
          }, 1500);
        } else {
          // הבלוק הראשון תמיד מאושר
          setTimeout(() => {
            setBlocks(prev2 => {
              const confirmed = [...prev2];
              const idx = confirmed.findIndex(b => b.status === 'verifying');
              if (idx !== -1) {
                confirmed[idx] = { ...confirmed[idx], status: 'confirmed' };
              }
              return confirmed;
            });
          }, 1000);
        }
        
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const visibleBlocks = blocks.slice(-4);

  const getBlockColors = (block) => {
    if (block.status === 'confirmed') {
      if (block.type === 'genesis') {
        return {
          fill: isDark ? '#8b5cf6' : '#7c3aed',
          stroke: isDark ? '#7c3aed' : '#6d28d9',
          glow: 'rgba(139, 92, 246, 0.5)'
        };
      }
      return {
        fill: isDark ? '#10b981' : '#059669',
        stroke: isDark ? '#059669' : '#047857',
        glow: 'rgba(16, 185, 129, 0.5)'
      };
    } else if (block.status === 'verifying') {
      return {
        fill: isDark ? '#a855f7' : '#9333ea',
        stroke: isDark ? '#9333ea' : '#7e22ce',
        glow: 'rgba(168, 85, 247, 0.6)'
      };
    } else if (block.status === 'unverified') {
      return {
        fill: isDark ? '#ef4444' : '#dc2626',
        stroke: isDark ? '#dc2626' : '#b91c1c',
        glow: 'rgba(239, 68, 68, 0.5)'
      };
    } else {
      return {
        fill: isDark ? '#6b7280' : '#9ca3af',
        stroke: isDark ? '#4b5563' : '#6b7280',
        glow: 'rgba(107, 114, 128, 0.3)'
      };
    }
  };

  return (
    <div className="relative w-32 h-32">
      {/* Frame */}
      <div className={`absolute inset-0 rounded-2xl ${
        isDark 
          ? 'border-2 border-purple-500/30 bg-purple-500/5' 
          : 'border-2 border-purple-400/40 bg-purple-400/10'
      } backdrop-blur-sm`} />
      
      <svg viewBox="0 0 130 130" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0" />
            <stop offset="50%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Blocks arranged in circle */}
        <AnimatePresence mode="popLayout">
          {visibleBlocks.map((block, idx) => {
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            const x = 65 + Math.cos(angle) * radius;
            const y = 65 + Math.sin(angle) * radius;
            const size = block.type === 'genesis' ? 22 : 18;
            
            const colors = getBlockColors(block);
            const isVerifying = block.status === 'verifying';
            
            return (
              <motion.g
                key={block.id}
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.6
                }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {/* Connection line to next block */}
                {idx < visibleBlocks.length - 1 && (
                  <>
                    {(() => {
                      const nextAngle = ((idx + 1) / 4) * Math.PI * 2 - Math.PI / 2;
                      const nextX = 65 + Math.cos(nextAngle) * radius;
                      const nextY = 65 + Math.sin(nextAngle) * radius;
                      
                      return (
                        <motion.line
                          x1={x}
                          y1={y}
                          x2={nextX}
                          y2={nextY}
                          stroke={isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.3)'}
                          strokeWidth="2"
                          strokeDasharray="3 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      );
                    })()}
                  </>
                )}

                {/* Verification pulse effect */}
                {isVerifying && (
                  <>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={size / 2 + 5}
                      fill="none"
                      stroke={isDark ? '#a855f7' : '#9333ea'}
                      strokeWidth="2"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ 
                        scale: 1.6,
                        opacity: 0
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={size / 2 + 3}
                      fill="none"
                      stroke={isDark ? '#8b5cf6' : '#7c3aed'}
                      strokeWidth="1.5"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ 
                        scale: 1.4,
                        opacity: 0
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.3,
                        ease: "easeOut"
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  </>
                )}

                {/* Block glow */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={size / 2 + 3}
                  fill={colors.glow}
                  opacity="0.7"
                  animate={isVerifying ? {
                    scale: [1, 1.15, 1],
                    opacity: [0.7, 0.9, 0.7]
                  } : {}}
                  transition={{ 
                    duration: 0.6,
                    repeat: isVerifying ? Infinity : 0
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
                
                {/* Block body */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={size / 2}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={isVerifying ? {
                    scale: [1, 1.08, 1]
                  } : {}}
                  transition={{ 
                    duration: 0.5,
                    repeat: isVerifying ? Infinity : 0
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />

                {/* Hash text */}
                <text
                  x={x}
                  y={y + 1.5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={block.type === 'genesis' ? "8" : "7"}
                  fontFamily="monospace"
                  fontWeight="bold"
                  opacity="0.95"
                >
                  {block.hash}
                </text>

                {/* Status badge */}
                {block.status === 'confirmed' && (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                  >
                    <circle
                      cx={x + size / 2 - 2}
                      cy={y - size / 2 + 2}
                      r="3.5"
                      fill={block.type === 'genesis' ? (isDark ? '#8b5cf6' : '#7c3aed') : (isDark ? '#10b981' : '#059669')}
                      filter="url(#glow)"
                    />
                    <path
                      d={`M ${x + size / 2 - 4} ${y - size / 2 + 2} 
                          L ${x + size / 2 - 2.5} ${y - size / 2 + 3.5} 
                          L ${x + size / 2} ${y - size / 2 + 0.5}`}
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </motion.g>
                )}

                {/* Unverified badge */}
                {block.status === 'unverified' && (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                  >
                    <motion.circle
                      cx={x + size / 2 - 2}
                      cy={y - size / 2 + 2}
                      r="3.5"
                      fill={isDark ? '#ef4444' : '#dc2626'}
                      filter="url(#glow)"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <text
                      x={x + size / 2 - 2}
                      y={y - size / 2 + 3.5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="5"
                      fontWeight="bold"
                    >
                      ✕
                    </text>
                  </motion.g>
                )}

                {/* Pending badge */}
                {block.status === 'pending' && (
                  <motion.circle
                    cx={x + size / 2 - 2}
                    cy={y - size / 2 + 2}
                    r="3"
                    fill={isDark ? '#6b7280' : '#9ca3af'}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Verification beams */}
        <AnimatePresence>
          {verificationBeams.map(beam => {
            const fromIdx = visibleBlocks.findIndex(b => b.id === blocks[beam.from]?.id);
            const toIdx = visibleBlocks.findIndex(b => b.id === blocks[beam.to]?.id);
            
            if (fromIdx === -1 || toIdx === -1) return null;
            
            const fromAngle = (fromIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const toAngle = (toIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            
            const x1 = 65 + Math.cos(fromAngle) * radius;
            const y1 = 65 + Math.sin(fromAngle) * radius;
            const x2 = 65 + Math.cos(toAngle) * radius;
            const y2 = 65 + Math.sin(toAngle) * radius;
            
            return (
              <motion.g key={beam.id}>
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#beamGrad)"
                  strokeWidth="4"
                  filter="url(#strongGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                
                {[0, 0.25, 0.5].map((delay, i) => (
                  <motion.circle
                    key={i}
                    r="2"
                    fill={isDark ? '#a855f7' : '#9333ea'}
                    filter="url(#strongGlow)"
                    initial={{ cx: x1, cy: y1, scale: 0 }}
                    animate={{ cx: x2, cy: y2, scale: [0, 1.2, 0] }}
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

        {/* Center logo */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '65px 65px' }}
        >
          <circle
            cx="65"
            cy="65"
            r="10"
            fill="none"
            stroke={isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.4)'}
            strokeWidth="1.5"
          />
          <circle
            cx="65"
            cy="65"
            r="6"
            fill={isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.15)'}
            stroke={isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(124, 58, 237, 0.7)'}
            strokeWidth="1"
          />
        </motion.g>
      </svg>

      {/* Block counter */}
      <motion.div
        key={blocks.length}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold ${
          isDark ? 'text-purple-400/80' : 'text-purple-600/90'
        }`}
      >
        {blocks.filter(b => b.status === 'confirmed').length}/{blocks.length}
      </motion.div>
    </div>
  );
}