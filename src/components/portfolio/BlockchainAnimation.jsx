import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([
    { 
      id: 'gen', 
      hash: 'GEN',
      status: 'confirmed',
      position: { x: 65, y: 30 },
      parent: null
    }
  ]);
  
  const [verificationBeam, setVerificationBeam] = useState(null);

  // תרחיש מוגדר של יצירת בלוקים
  useEffect(() => {
    const sequence = [
      // בלוק 2 מתחת לבלוק 1
      { delay: 2000, block: { id: 'b2', hash: 'B2', status: 'pending', position: { x: 65, y: 55 }, parent: 'gen' }},
      { delay: 3500, action: 'verify', blockId: 'b2' },
      
      // בלוק 3 מתחת לבלוק 2
      { delay: 5500, block: { id: 'b3', hash: 'B3', status: 'pending', position: { x: 65, y: 80 }, parent: 'b2' }},
      { delay: 7000, action: 'verify', blockId: 'b3' },
      
      // התפצלות - 2 בלוקים מבלוק 3
      { delay: 9000, block: { id: 'b4a', hash: 'B4A', status: 'pending', position: { x: 45, y: 105 }, parent: 'b3' }},
      { delay: 9200, block: { id: 'b4b', hash: 'B4B', status: 'pending', position: { x: 85, y: 105 }, parent: 'b3' }},
      { delay: 10700, action: 'verify', blockId: 'b4a' },
      { delay: 10900, action: 'verify', blockId: 'b4b' },
      
      // מכל אחד עוד 2
      { delay: 12500, block: { id: 'b5a1', hash: 'B5A1', status: 'pending', position: { x: 30, y: 125 }, parent: 'b4a' }},
      { delay: 12700, block: { id: 'b5a2', hash: 'B5A2', status: 'pending', position: { x: 60, y: 125 }, parent: 'b4a' }},
      { delay: 13000, block: { id: 'b5b1', hash: 'B5B1', status: 'pending', position: { x: 70, y: 125 }, parent: 'b4b' }},
      { delay: 13200, block: { id: 'b5b2', hash: 'B5B2', status: 'pending', position: { x: 100, y: 125 }, parent: 'b4b' }},
      { delay: 14700, action: 'verify', blockId: 'b5a1' },
      { delay: 14900, action: 'verify', blockId: 'b5a2' },
      { delay: 15100, action: 'verify', blockId: 'b5b1' },
      { delay: 15300, action: 'verify', blockId: 'b5b2' },
    ];

    const timeouts = sequence.map(step => {
      return setTimeout(() => {
        if (step.block) {
          setBlocks(prev => [...prev, step.block]);
        } else if (step.action === 'verify') {
          setBlocks(prev => {
            const updated = [...prev];
            const idx = updated.findIndex(b => b.id === step.blockId);
            if (idx !== -1) {
              updated[idx] = { ...updated[idx], status: 'verifying' };
              
              // הצג קרן מהבלוק האב
              const parent = updated[idx].parent;
              if (parent) {
                setVerificationBeam({ from: parent, to: updated[idx].id, id: Date.now() });
                
                setTimeout(() => {
                  setVerificationBeam(null);
                  setBlocks(prev2 => {
                    const confirmed = [...prev2];
                    const confirmIdx = confirmed.findIndex(b => b.id === step.blockId);
                    if (confirmIdx !== -1) {
                      confirmed[confirmIdx] = { ...confirmed[confirmIdx], status: 'confirmed' };
                    }
                    return confirmed;
                  });
                }, 1200);
              }
            }
            return updated;
          });
        }
      }, step.delay);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 130 130" className="w-full h-full">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
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

        {/* מסגרת חיצונית מסביב לכל הבלוקים */}
        <motion.rect
          x="15"
          y="15"
          width="100"
          height="100"
          rx="12"
          fill="none"
          stroke={isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.35)'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* קווי חיבור בין בלוקים */}
        <AnimatePresence>
          {blocks.map(block => {
            if (!block.parent) return null;
            const parent = blocks.find(b => b.id === block.parent);
            if (!parent) return null;
            
            return (
              <motion.line
                key={`line-${block.id}`}
                x1={parent.position.x}
                y1={parent.position.y}
                x2={block.position.x}
                y2={block.position.y}
                stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.25)'}
                strokeWidth="1.5"
                strokeDasharray="2 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </AnimatePresence>

        {/* בלוקים */}
        <AnimatePresence>
          {blocks.map(block => {
            const { x, y } = block.position;
            const size = block.id === 'gen' ? 16 : 14;
            
            let fillColor, strokeColor, glowColor;
            
            if (block.id === 'gen') {
              fillColor = isDark ? '#8b5cf6' : '#7c3aed';
              strokeColor = isDark ? '#7c3aed' : '#6d28d9';
              glowColor = 'rgba(139, 92, 246, 0.4)';
            } else if (block.status === 'confirmed') {
              fillColor = isDark ? '#10b981' : '#059669';
              strokeColor = isDark ? '#059669' : '#047857';
              glowColor = 'rgba(16, 185, 129, 0.4)';
            } else if (block.status === 'verifying') {
              fillColor = isDark ? '#a855f7' : '#9333ea';
              strokeColor = isDark ? '#9333ea' : '#7e22ce';
              glowColor = 'rgba(168, 85, 247, 0.5)';
            } else {
              fillColor = isDark ? '#6b7280' : '#9ca3af';
              strokeColor = isDark ? '#4b5563' : '#6b7280';
              glowColor = 'rgba(107, 114, 128, 0.3)';
            }
            
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
                {/* אפקט אימות */}
                {block.status === 'verifying' && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={size / 2 + 4}
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

                <g filter="url(#glow)">
                  {/* זוהר */}
                  <circle
                    cx={x}
                    cy={y}
                    r={size / 2 + 2}
                    fill={glowColor}
                    opacity="0.6"
                  />
                  
                  {/* גוף הבלוק */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={size / 2}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    animate={block.status === 'verifying' ? {
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.5,
                      repeat: block.status === 'verifying' ? Infinity : 0
                    }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />

                  {/* Hash */}
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    fill="white"
                    fontSize={block.id === 'gen' ? "5.5" : "5"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity="0.9"
                  >
                    {block.hash}
                  </text>

                  {/* V מאומת */}
                  {block.status === 'confirmed' && block.id !== 'gen' && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <circle
                        cx={x + size / 2 - 2}
                        cy={y - size / 2 + 2}
                        r="2.5"
                        fill={isDark ? '#10b981' : '#059669'}
                      />
                      <path
                        d={`M ${x + size / 2 - 3.2} ${y - size / 2 + 2} 
                            L ${x + size / 2 - 2.2} ${y - size / 2 + 3} 
                            L ${x + size / 2 - 0.8} ${y - size / 2 + 1.5}`}
                        stroke="white"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </motion.g>
                  )}

                  {/* נקודה מהבהבת לבלוק בהמתנה */}
                  {block.status === 'pending' && (
                    <motion.circle
                      cx={x + size / 2 - 2}
                      cy={y - size / 2 + 2}
                      r="2"
                      fill={isDark ? '#fbbf24' : '#f59e0b'}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </g>
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* קרן אימות */}
        <AnimatePresence>
          {verificationBeam && (() => {
            const fromBlock = blocks.find(b => b.id === verificationBeam.from);
            const toBlock = blocks.find(b => b.id === verificationBeam.to);
            
            if (!fromBlock || !toBlock) return null;
            
            const { x: x1, y: y1 } = fromBlock.position;
            const { x: x2, y: y2 } = toBlock.position;
            
            return (
              <motion.g key={verificationBeam.id}>
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
                  transition={{ duration: 0.8 }}
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

      {/* מונה */}
      <motion.div
        key={blocks.length}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold ${
          isDark ? 'text-purple-400/70' : 'text-purple-600/80'
        }`}
      >
        {blocks.filter(b => b.status === 'confirmed').length}/{blocks.length}
      </motion.div>
    </div>
  );
}