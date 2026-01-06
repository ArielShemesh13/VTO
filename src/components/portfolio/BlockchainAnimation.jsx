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
  const [particles, setParticles] = useState([]);

  // יצירת חלקיקים רנדומליים ברקע
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 130,
        y: Math.random() * 130,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.2 + 0.05
      });
    }
    setParticles(newParticles);
  }, []);

  // תנועת חלקיקים
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: (p.y + p.speed) % 130
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // יצירת בלוק חדש - מחזורי
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const lastBlock = prev[prev.length - 1];
        if (lastBlock.status !== 'confirmed') return prev;
        
        if (prev.length >= 4) {
          const nextId = lastBlock.id + 1;
          const newBlock = {
            id: nextId,
            hash: Math.random().toString(36).substr(2, 4).toUpperCase(),
            prevHash: lastBlock.hash,
            status: 'pending',
            type: 'block'
          };
          return [...prev.slice(1), newBlock];
        }
        
        const newBlock = {
          id: prev.length,
          hash: Math.random().toString(36).substr(2, 4).toUpperCase(),
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

  const getBlockColors = (block) => {
    if (block.type === 'genesis') {
      return {
        fill: 'url(#genesisGrad)',
        stroke: isDark ? '#8b5cf6' : '#7c3aed',
        glow: isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(124, 58, 237, 0.6)',
        text: '#ffffff',
        accent: isDark ? '#c4b5fd' : '#8b5cf6'
      };
    }
    
    if (block.status === 'confirmed') {
      return {
        fill: 'url(#confirmedGrad)',
        stroke: isDark ? '#10b981' : '#059669',
        glow: isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(5, 150, 105, 0.5)',
        text: '#ffffff',
        accent: isDark ? '#34d399' : '#10b981'
      };
    }
    
    if (block.status === 'verifying') {
      return {
        fill: 'url(#verifyingGrad)',
        stroke: isDark ? '#f59e0b' : '#d97706',
        glow: isDark ? 'rgba(245, 158, 11, 0.6)' : 'rgba(217, 119, 6, 0.6)',
        text: '#ffffff',
        accent: isDark ? '#fbbf24' : '#f59e0b'
      };
    }
    
    return {
      fill: 'url(#pendingGrad)',
      stroke: isDark ? '#6b7280' : '#4b5563',
      glow: isDark ? 'rgba(107, 114, 128, 0.4)' : 'rgba(75, 85, 99, 0.4)',
      text: isDark ? '#d1d5db' : '#ffffff',
      accent: isDark ? '#9ca3af' : '#6b7280'
    };
  };

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 130 130" className="w-full h-full">
        <defs>
          {/* גרדיאנטים */}
          <linearGradient id="genesisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          
          <linearGradient id="confirmedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          
          <linearGradient id="verifyingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          
          <linearGradient id="pendingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>

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

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feFlood floodColor={isDark ? '#8b5cf6' : '#7c3aed'} floodOpacity="0.4"/>
            <feComposite in2="blur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* חלקיקי רקע */}
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={isDark ? '#8b5cf6' : '#7c3aed'}
            opacity={particle.opacity}
          />
        ))}

        {/* מרכז מואר */}
        <motion.circle
          cx="65"
          cy="65"
          r="4"
          fill={isDark ? '#8b5cf6' : '#7c3aed'}
          filter="url(#softGlow)"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <AnimatePresence mode="popLayout">
          {blocks.map((block, idx) => {
            const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            const x = 65 + Math.cos(angle) * radius;
            const y = 65 + Math.sin(angle) * radius;
            const size = block.type === 'genesis' ? 24 : 20;
            const colors = getBlockColors(block);
            
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
                {(() => {
                  let nextIdx = idx + 1;
                  if (nextIdx >= blocks.length) nextIdx = 0;
                  
                  const nextAngle = (nextIdx / 4) * Math.PI * 2 - Math.PI / 2;
                  const nextX = 65 + Math.cos(nextAngle) * radius;
                  const nextY = 65 + Math.sin(nextAngle) * radius;
                  
                  return (
                    <>
                      <motion.path
                        d={`M ${x} ${y} Q ${65} ${65} ${nextX} ${nextY}`}
                        fill="none"
                        stroke={isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.3)'}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 0.8, delay: idx * 0.15 }}
                      />
                      
                      {/* חלקיקים נעים לאורך הקו */}
                      <motion.circle
                        r="1.5"
                        fill={isDark ? '#8b5cf6' : '#7c3aed'}
                        filter="url(#glow)"
                        animate={{ 
                          offsetDistance: ['0%', '100%'],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          delay: idx * 0.6,
                          ease: "linear"
                        }}
                        style={{
                          offsetPath: `path('M ${x} ${y} Q ${65} ${65} ${nextX} ${nextY}')`,
                          offsetRotate: '0deg'
                        }}
                      />
                    </>
                  );
                })()}

                {/* גלי אימות */}
                {block.status === 'verifying' && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={size / 2 + 6 + i * 4}
                        fill="none"
                        stroke={colors.accent}
                        strokeWidth="1.5"
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ 
                          opacity: [0.7, 0],
                          scale: [1, 1.6 + i * 0.2]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeOut"
                        }}
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                    ))}
                  </>
                )}

                {/* הילה */}
                <circle
                  cx={x}
                  cy={y}
                  r={size / 2 + 5}
                  fill={colors.glow}
                  opacity="0.6"
                  filter="url(#softGlow)"
                />

                {/* הבלוק - מלבן מעוגל */}
                <motion.rect
                  x={x - size / 2}
                  y={y - size / 2}
                  width={size}
                  height={size}
                  rx={size / 5}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth="2.5"
                  filter="url(#glow)"
                  animate={block.status === 'verifying' ? {
                    rotate: [0, 3, 0, -3, 0],
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={block.status === 'verifying' ? {
                    rotate: { duration: 2, repeat: Infinity },
                    scale: { duration: 1.5, repeat: Infinity }
                  } : {}}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />

                {/* טקסט */}
                <text
                  x={x}
                  y={y + 2}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize={block.type === 'genesis' ? "8" : "7"}
                  fontFamily="'Courier New', monospace"
                  fontWeight="bold"
                  opacity="0.95"
                >
                  {block.hash}
                </text>

                {/* ID */}
                <text
                  x={x}
                  y={y + size / 2 + 6}
                  textAnchor="middle"
                  fill={colors.accent}
                  fontSize="5"
                  fontFamily="'Courier New', monospace"
                  fontWeight="600"
                  opacity="0.9"
                >
                  #{block.id}
                </text>

                {/* אינדיקטור סטטוס */}
                <motion.circle
                  cx={x - size / 2 + 5}
                  cy={y - size / 2 + 5}
                  r={size / 8}
                  fill={colors.accent}
                  filter="url(#glow)"
                  animate={block.status === 'pending' ? {
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={block.status === 'pending' ? {
                    duration: 1.5,
                    repeat: Infinity
                  } : {}}
                  style={{ transformOrigin: `${x - size / 2 + 5}px ${y - size / 2 + 5}px` }}
                />

                {/* V לבלוק מאומת */}
                {block.status === 'confirmed' && block.id > 0 && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <circle
                      cx={x + size / 2 - 5}
                      cy={y - size / 2 + 5}
                      r={size / 6}
                      fill={colors.accent}
                      filter="url(#glow)"
                    />
                    <path
                      d={`M ${x + size / 2 - 7} ${y - size / 2 + 5} 
                          L ${x + size / 2 - 5} ${y - size / 2 + 7} 
                          L ${x + size / 2 - 3} ${y - size / 2 + 3}`}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </motion.g>
                )}

                {/* כוכב לגנסיס */}
                {block.type === 'genesis' && (
                  <motion.g
                    animate={{ 
                      rotate: 360,
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 2, repeat: Infinity }
                    }}
                    style={{ transformOrigin: `${x + size / 2 - 5}px ${y - size / 2 + 5}px` }}
                  >
                    <circle
                      cx={x + size / 2 - 5}
                      cy={y - size / 2 + 5}
                      r={size / 6}
                      fill={isDark ? '#8b5cf6' : '#7c3aed'}
                      filter="url(#glow)"
                    />
                    <circle
                      cx={x + size / 2 - 5}
                      cy={y - size / 2 + 5}
                      r={size / 12}
                      fill="white"
                    />
                  </motion.g>
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* קרן אימות מרהיבה */}
        <AnimatePresence>
          {verificationBeam && (() => {
            const fromIdx = verificationBeam.from;
            const toIdx = verificationBeam.to;
            
            if (fromIdx === -1 || toIdx === -1 || !blocks[fromIdx] || !blocks[toIdx]) return null;
            
            const fromAngle = (fromIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const toAngle = (toIdx / 4) * Math.PI * 2 - Math.PI / 2;
            const radius = 45;
            
            const x1 = 65 + Math.cos(fromAngle) * radius;
            const y1 = 65 + Math.sin(fromAngle) * radius;
            const x2 = 65 + Math.cos(toAngle) * radius;
            const y2 = 65 + Math.sin(toAngle) * radius;
            
            return (
              <motion.g key={verificationBeam.id}>
                <motion.path
                  d={`M ${x1} ${y1} Q ${65} ${65} ${x2} ${y2}`}
                  fill="none"
                  stroke="url(#beamGrad)"
                  strokeWidth="5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    r="2.5"
                    fill={isDark ? '#8b5cf6' : '#7c3aed'}
                    filter="url(#glow)"
                    animate={{ 
                      offsetDistance: ['0%', '100%'],
                      opacity: [0.9, 1, 0.3],
                      scale: [1, 1.3, 0.8]
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    style={{
                      offsetPath: `path('M ${x1} ${y1} Q ${65} ${65} ${x2} ${y2}')`,
                      offsetRotate: '0deg'
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