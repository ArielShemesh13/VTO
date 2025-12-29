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

  // יצירת בלוק חדש כל 5 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const lastBlock = prev[prev.length - 1];
        if (lastBlock.status !== 'confirmed') return prev;
        
        const newBlock = {
          id: prev.length,
          hash: Math.random().toString(36).substr(2, 3).toUpperCase(),
          prevHash: lastBlock.hash,
          status: 'pending',
          type: 'block'
        };
        
        return [...prev, newBlock];
      });
    }, 5000);

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

  // הצג רק 4 בלוקים אחרונים
  const visibleBlocks = blocks.slice(-4);
  const totalBlocks = blocks.length;

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

        {/* בלוקים מסודרים בעיגול */}
        <AnimatePresence mode="popLayout">
          {visibleBlocks.map((block, idx) => {
            // מיקום בעיגול
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            const x = 65 + Math.cos(angle) * radius;
            const y = 65 + Math.sin(angle) * radius;
            const size = block.type === 'genesis' ? 20 : 16;
            
            // צבעים
            const isGenesis = block.type === 'genesis';
            const isConfirmed = block.status === 'confirmed';
            const isVerifying = block.status === 'verifying';
            
            let fillColor, strokeColor, glowColor;
            
            // כל הבלוקים באותו צבע של העיגולים המרכזיים
            fillColor = isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.2)';
            strokeColor = isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.6)';
            glowColor = isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.4)';
            
            return (
              <motion.g
                key={block.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                {/* קו לבלוק הבא */}
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
                          stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.25)'}
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ duration: 0.5 }}
                        />
                      );
                    })()}
                  </>
                )}

                {/* אפקט אימות */}
                {isVerifying && (
                  <motion.rect
                    x={x - size / 2 - 4}
                    y={y - size / 2 - 4}
                    width={size + 8}
                    height={size + 8}
                    rx="2"
                    fill="none"
                    stroke={isDark ? '#8b5cf6' : '#7c3aed'}
                    strokeWidth="1"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ 
                      scale: 1.8,
                      opacity: 0
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity
                    }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}

                {/* הבלוק עצמו - ריבוע */}
                <g filter="url(#glow)">
                  {/* זוהר חיצוני */}
                  <rect
                    x={x - size / 2 - 2}
                    y={y - size / 2 - 2}
                    width={size + 4}
                    height={size + 4}
                    rx="2"
                    fill={glowColor}
                    opacity="0.6"
                  />
                  
                  {/* גוף הבלוק */}
                  <motion.rect
                    x={x - size / 2}
                    y={y - size / 2}
                    width={size}
                    height={size}
                    rx="2"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    animate={isVerifying ? {
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.5,
                      repeat: isVerifying ? Infinity : 0
                    }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />

                  {/* Hash בתוך הבלוק */}
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isGenesis ? "7" : "6"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity="0.9"
                  >
                    {block.hash}
                  </text>
                </g>
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* קרני אימות */}
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
                  strokeWidth="3"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
                
                {[0, 0.3, 0.6].map((delay, i) => (
                  <motion.circle
                    key={i}
                    r="1.5"
                    fill={isDark ? '#8b5cf6' : '#7c3aed'}
                    filter="url(#glow)"
                    initial={{ cx: x1, cy: y1 }}
                    animate={{ cx: x2, cy: y2 }}
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


    </div>
  );
}