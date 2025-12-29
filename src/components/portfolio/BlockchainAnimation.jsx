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
  
  const [verificationBeam, setVerificationBeam] = useState(null);

  // יצירת בלוק חדש - מחזורי
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const lastBlock = prev[prev.length - 1];
        if (lastBlock.status !== 'confirmed') return prev;
        
        // כשיש 4 בלוקים, הבלוק הרביעי יוצר חדש במקום הראשון והראשון נמחק
        if (prev.length >= 4) {
          const nextId = lastBlock.id + 1;
          const newBlock = {
            id: nextId,
            hash: Math.random().toString(36).substr(2, 3).toUpperCase(),
            prevHash: lastBlock.hash,
            status: 'pending',
            type: 'block'
          };
          // הסר את הבלוק הראשון (index 0) והוסף את החדש
          return [...prev.slice(1), newBlock];
        }
        
        const newBlock = {
          id: prev.length,
          hash: Math.random().toString(36).substr(2, 3).toUpperCase(),
          prevHash: lastBlock.hash,
          status: 'pending',
          type: 'block'
        };
        
        return [...prev, newBlock];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // תהליך אימות
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const pendingIndex = prev.findIndex(b => b.status === 'pending');
        if (pendingIndex === -1) return prev;
        
        const updated = [...prev];
        updated[pendingIndex] = { ...updated[pendingIndex], status: 'verifying' };
        
        if (pendingIndex > 0) {
          const fromIndex = pendingIndex - 1;
          setVerificationBeam({
            id: Date.now(),
            from: fromIndex,
            to: pendingIndex
          });
          
          setTimeout(() => {
            setVerificationBeam(null);
            
            setBlocks(prev2 => {
              const confirmed = [...prev2];
              const idx = confirmed.findIndex(b => b.status === 'verifying');
              if (idx !== -1) {
                confirmed[idx] = { ...confirmed[idx], status: 'confirmed' };
              }
              return confirmed;
            });
          }, 1200);
        }
        
        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const visibleBlocks = blocks;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 130 130" className="w-full h-full">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0" />
            <stop offset="50%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <AnimatePresence mode="popLayout">
          {visibleBlocks.map((block, idx) => {
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            const x = 65 + Math.cos(angle) * radius;
            const y = 65 + Math.sin(angle) * radius;
            const size = block.type === 'genesis' ? 22 : 18;
            
            let fillColor, strokeColor, glowColor, textColor;
            
            if (block.type === 'genesis') {
              fillColor = isDark ? '#8b5cf6' : '#7c3aed';
              strokeColor = isDark ? '#7c3aed' : '#6d28d9';
              glowColor = 'rgba(139, 92, 246, 0.5)';
              textColor = '#ffffff';
            } else if (block.status === 'confirmed') {
              fillColor = isDark ? '#10b981' : '#059669';
              strokeColor = isDark ? '#059669' : '#047857';
              glowColor = 'rgba(16, 185, 129, 0.5)';
              textColor = '#ffffff';
            } else if (block.status === 'verifying') {
              fillColor = isDark ? '#a855f7' : '#9333ea';
              strokeColor = isDark ? '#9333ea' : '#7e22ce';
              glowColor = 'rgba(168, 85, 247, 0.6)';
              textColor = '#ffffff';
            } else {
              fillColor = isDark ? '#6b7280' : '#9ca3af';
              strokeColor = isDark ? '#4b5563' : '#6b7280';
              glowColor = 'rgba(107, 114, 128, 0.4)';
              textColor = isDark ? '#d1d5db' : '#ffffff';
            }
            
            return (
              <motion.g
                key={block.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                {/* קו חיבור לבלוק הבא או חזרה לראשון */}
                {(() => {
                  let nextIdx = idx + 1;
                  if (nextIdx >= visibleBlocks.length) {
                    nextIdx = 0; // חיבור חזרה לבלוק הראשון
                  }
                  
                  const nextAngle = (nextIdx / 4) * Math.PI * 2 - Math.PI / 2;
                  const nextX = 65 + Math.cos(nextAngle) * radius;
                  const nextY = 65 + Math.sin(nextAngle) * radius;
                  
                  return (
                    <motion.line
                      x1={x}
                      y1={y}
                      x2={nextX}
                      y2={nextY}
                      stroke={isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.3)'}
                      strokeWidth="1.8"
                      strokeDasharray="3 2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    />
                  );
                })()}

                {block.status === 'verifying' && (
                  <>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={size / 2 + 5}
                      fill="none"
                      stroke={isDark ? '#8b5cf6' : '#7c3aed'}
                      strokeWidth="1.5"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ 
                        scale: 1.4,
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
                      stroke={isDark ? '#a855f7' : '#9333ea'}
                      strokeWidth="1"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ 
                        scale: 1.6,
                        opacity: 0
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.3
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  </>
                )}

                <g filter="url(#glow)">
                  <circle
                    cx={x}
                    cy={y}
                    r={size / 2 + 2.5}
                    fill={glowColor}
                    opacity="0.7"
                  />
                  
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={size / 2}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                    animate={block.status === 'verifying' ? {
                      scale: [1, 1.08, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.6,
                      repeat: block.status === 'verifying' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />

                  <text
                    x={x}
                    y={y + 1.5}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize={block.type === 'genesis' ? "7" : "6.5"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity="0.95"
                  >
                    {block.hash}
                  </text>

                  {block.status === 'confirmed' && block.type !== 'genesis' && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    >
                      <circle
                        cx={x + size / 2 - 3}
                        cy={y - size / 2 + 3}
                        r="3.5"
                        fill={isDark ? '#10b981' : '#059669'}
                        stroke={isDark ? '#059669' : '#047857'}
                        strokeWidth="0.5"
                      />
                      <path
                        d={`M ${x + size / 2 - 4.5} ${y - size / 2 + 3} 
                            L ${x + size / 2 - 3.2} ${y - size / 2 + 4.2} 
                            L ${x + size / 2 - 1.5} ${y - size / 2 + 2}`}
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </motion.g>
                  )}

                  {block.type === 'genesis' && (
                    <motion.g
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <circle
                        cx={x + size / 2 - 3}
                        cy={y - size / 2 + 3}
                        r="2.5"
                        fill={isDark ? '#8b5cf6' : '#7c3aed'}
                        opacity="0.9"
                      />
                      <circle
                        cx={x + size / 2 - 3}
                        cy={y - size / 2 + 3}
                        r="1.2"
                        fill="white"
                        opacity="0.9"
                      />
                    </motion.g>
                  )}

                  {block.status === 'pending' && (
                    <motion.circle
                      cx={x + size / 2 - 3}
                      cy={y - size / 2 + 3}
                      r="2.5"
                      fill={isDark ? '#fbbf24' : '#f59e0b'}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {block.status === 'verifying' && (
                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: `${x + size / 2 - 3}px ${y - size / 2 + 3}px` }}
                    >
                      <circle
                        cx={x + size / 2 - 3}
                        cy={y - size / 2 + 3}
                        r="2.5"
                        fill={isDark ? '#a855f7' : '#9333ea'}
                      />
                      <circle
                        cx={x + size / 2 - 3}
                        cy={y - size / 2 + 1}
                        r="0.8"
                        fill="white"
                      />
                    </motion.g>
                  )}
                </g>
              </motion.g>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {verificationBeam && (() => {
            const fromIdx = verificationBeam.from;
            const toIdx = verificationBeam.to;
            
            if (fromIdx === -1 || toIdx === -1 || !visibleBlocks[fromIdx] || !visibleBlocks[toIdx]) return null;
            
            const fromAngle = (fromIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const toAngle = (toIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            
            const x1 = 65 + Math.cos(fromAngle) * radius;
            const y1 = 65 + Math.sin(fromAngle) * radius;
            const x2 = 65 + Math.cos(toAngle) * radius;
            const y2 = 65 + Math.sin(toAngle) * radius;
            
            return (
              <motion.g key={verificationBeam.id}>
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#beamGrad)"
                  strokeWidth="4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {[0, 0.25, 0.5, 0.75].map((delay, i) => (
                  <motion.circle
                    key={i}
                    r="2"
                    fill={isDark ? '#8b5cf6' : '#7c3aed'}
                    filter="url(#glow)"
                    initial={{ cx: x1, cy: y1, opacity: 0.8 }}
                    animate={{ 
                      cx: x2, 
                      cy: y2,
                      opacity: [0.8, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.g>
            );
          })()}
        </AnimatePresence>
      </svg>
    </div>
  );
}