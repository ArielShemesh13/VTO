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

  // יצירת בלוק חדש - רק אחרי שהקודם אושר
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        // בדוק אם הבלוק האחרון כבר אושר
        const lastBlock = prev[prev.length - 1];
        if (lastBlock.status !== 'confirmed') return prev;
        
        // צור בלוק חדש במצב pending
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

  // תהליך אימות - מחפש בלוק pending והופך אותו לverifying ואז לconfirmed
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const pendingIndex = prev.findIndex(b => b.status === 'pending');
        if (pendingIndex === -1) return prev;
        
        // שלב 1: התחל אימות
        const updated = [...prev];
        updated[pendingIndex] = { ...updated[pendingIndex], status: 'verifying' };
        
        // הצג קרן אימות
        if (pendingIndex > 0) {
          setVerificationBeam({
            id: Date.now(),
            from: pendingIndex - 1,
            to: pendingIndex
          });
          
          // אחרי 1.2 שניות - אשר את הבלוק
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

  // הצג תמיד רק 4 בלוקים אחרונים
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

        {/* בלוקים בצורת מלבנים בעיגול */}
        <AnimatePresence mode="popLayout">
          {visibleBlocks.map((block, idx) => {
            // חישוב מיקום בעיגול - בצורת בלוק
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            const x = 65 + Math.cos(angle) * radius;
            const y = 65 + Math.sin(angle) * radius;
            
            // גודל הבלוק - מלבן
            const width = block.type === 'genesis' ? 24 : 20;
            const height = block.type === 'genesis' ? 24 : 20;
            
            // צבעים לפי סטטוס
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
                {/* קו חיבור לבלוק הבא */}
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
                          strokeWidth="1.8"
                          strokeDasharray="3 2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                        />
                      );
                    })()}
                  </>
                )}

                {/* אפקט פולס לבלוק בתהליך אימות */}
                {block.status === 'verifying' && (
                  <>
                    <motion.rect
                      x={x - width / 2 - 5}
                      y={y - height / 2 - 5}
                      width={width + 10}
                      height={height + 10}
                      rx="3"
                      fill="none"
                      stroke={isDark ? '#8b5cf6' : '#7c3aed'}
                      strokeWidth="1.5"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ 
                        scale: 1.15,
                        opacity: 0
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  </>
                )}

                <g filter="url(#glow)">
                  {/* זוהר חיצוני */}
                  <rect
                    x={x - width / 2 - 2.5}
                    y={y - height / 2 - 2.5}
                    width={width + 5}
                    height={height + 5}
                    rx="3"
                    fill={glowColor}
                    opacity="0.7"
                  />
                  
                  {/* גוף הבלוק - מלבן */}
                  <motion.rect
                    x={x - width / 2}
                    y={y - height / 2}
                    width={width}
                    height={height}
                    rx="2"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                    animate={block.status === 'verifying' ? {
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.6,
                      repeat: block.status === 'verifying' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />

                  {/* Hash בתוך הבלוק */}
                  <text
                    x={x}
                    y={y + 2}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize={block.type === 'genesis' ? "7" : "6.5"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity="0.95"
                  >
                    {block.hash}
                  </text>

                  {/* V סימון מאומת */}
                  {block.status === 'confirmed' && block.type !== 'genesis' && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    >
                      <circle
                        cx={x + width / 2 - 3}
                        cy={y - height / 2 + 3}
                        r="3.5"
                        fill={isDark ? '#10b981' : '#059669'}
                        stroke={isDark ? '#059669' : '#047857'}
                        strokeWidth="0.5"
                      />
                      <path
                        d={`M ${x + width / 2 - 4.5} ${y - height / 2 + 3} 
                            L ${x + width / 2 - 3.2} ${y - height / 2 + 4.2} 
                            L ${x + width / 2 - 1.5} ${y - height / 2 + 2}`}
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </motion.g>
                  )}

                  {/* סימון Genesis מיוחד */}
                  {block.type === 'genesis' && (
                    <motion.g
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <circle
                        cx={x + width / 2 - 3}
                        cy={y - height / 2 + 3}
                        r="2.5"
                        fill={isDark ? '#8b5cf6' : '#7c3aed'}
                        opacity="0.9"
                      />
                      <circle
                        cx={x + width / 2 - 3}
                        cy={y - height / 2 + 3}
                        r="1.2"
                        fill="white"
                        opacity="0.9"
                      />
                    </motion.g>
                  )}

                  {/* נקודה מהבהבת לבלוק בהמתנה */}
                  {block.status === 'pending' && (
                    <motion.circle
                      cx={x + width / 2 - 3}
                      cy={y - height / 2 + 3}
                      r="2.5"
                      fill={isDark ? '#fbbf24' : '#f59e0b'}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {/* סימון אימות */}
                  {block.status === 'verifying' && (
                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: `${x + width / 2 - 3}px ${y - height / 2 + 3}px` }}
                    >
                      <circle
                        cx={x + width / 2 - 3}
                        cy={y - height / 2 + 3}
                        r="2.5"
                        fill={isDark ? '#a855f7' : '#9333ea'}
                      />
                      <circle
                        cx={x + width / 2 - 3}
                        cy={y - height / 2 + 1}
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

        {/* קרן אימות */}
        <AnimatePresence>
          {verificationBeam && (() => {
            const fromIdx = visibleBlocks.findIndex(b => b.id === blocks[verificationBeam.from]?.id);
            const toIdx = visibleBlocks.findIndex(b => b.id === blocks[verificationBeam.to]?.id);
            
            if (fromIdx === -1 || toIdx === -1) return null;
            
            const fromAngle = (fromIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const toAngle = (toIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            
            const x1 = 65 + Math.cos(fromAngle) * radius;
            const y1 = 65 + Math.sin(fromAngle) * radius;
            const x2 = 65 + Math.cos(toAngle) * radius;
            const y2 = 65 + Math.sin(toAngle) * radius;
            
            return (
              <motion.g key={verificationBeam.id}>
                {/* קרן עיקרית */}
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
                
                {/* חלקיקים נעים */}
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

        {/* מרכז מסתובב */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '65px 65px' }}
        >
          <circle
            cx="65"
            cy="65"
            r="9"
            fill="none"
            stroke={isDark ? 'rgba(139, 92, 246, 0.35)' : 'rgba(124, 58, 237, 0.45)'}
            strokeWidth="1.2"
          />
          <circle
            cx="65"
            cy="65"
            r="6"
            fill={isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.2)'}
            stroke={isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(124, 58, 237, 0.7)'}
            strokeWidth="1"
          />
          
          {/* נקודות פינתיות */}
          {[[0, -4], [4, 0], [0, 4], [-4, 0]].map(([dx, dy], i) => (
            <motion.circle
              key={i}
              cx={65 + dx}
              cy={65 + dy}
              r="1"
              fill={isDark ? '#8b5cf6' : '#7c3aed'}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </motion.g>
      </svg>

      {/* מונה בלוקים */}
      <motion.div
        key={totalBlocks}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold whitespace-nowrap ${
          isDark ? 'text-purple-400/80' : 'text-purple-600/90'
        }`}
      >
        {blocks.filter(b => b.status === 'confirmed').length}/{totalBlocks} BLOCKS
      </motion.div>
    </div>
  );
}