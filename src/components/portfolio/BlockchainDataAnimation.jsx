import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockchainDataAnimation({ isDark }) {
  const [blocks, setBlocks] = useState([
    { id: 1, active: false, data: '' },
    { id: 2, active: false, data: '' },
    { id: 3, active: false, data: '' },
    { id: 4, active: false, data: '' },
  ]);
  const [transferring, setTransferring] = useState({ from: null, to: null, data: '' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateBinaryData = () => {
    return Array.from({ length: 8 }, () => Math.random() > 0.5 ? '1' : '0').join('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const fromIndex = currentIndex % 4;
      const toIndex = (currentIndex + 1) % 4;
      const binaryData = generateBinaryData();

      // Start transfer animation
      setTransferring({ from: fromIndex, to: toIndex, data: binaryData });

      // Update blocks after animation
      setTimeout(() => {
        setBlocks(prev => prev.map((block, idx) => {
          if (idx === toIndex) {
            return { ...block, active: true, data: binaryData };
          }
          if (idx === fromIndex) {
            return { ...block, active: false, data: '' };
          }
          return block;
        }));
        setTransferring({ from: null, to: null, data: '' });
        setCurrentIndex(prev => prev + 1);
      }, 2000);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Calculate connection lines between blocks
  const getConnectionPath = (from, to) => {
    const positions = [
      { x: 64, y: 64 },   // Block 0 (top-left)
      { x: 224, y: 64 },  // Block 1 (top-right)
      { x: 64, y: 224 },  // Block 2 (bottom-left)
      { x: 224, y: 224 }, // Block 3 (bottom-right)
    ];
    
    const fromPos = positions[from];
    const toPos = positions[to];
    
    return { x1: fromPos.x, y1: fromPos.y, x2: toPos.x, y2: toPos.y };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="288" height="288" style={{ zIndex: 0 }}>
        {/* Connection Lines */}
        {[
          [0, 1], [1, 3], [3, 2], [2, 0], // Outer square
          [0, 3], [1, 2] // Diagonals
        ].map(([from, to], idx) => {
          const { x1, y1, x2, y2 } = getConnectionPath(from, to);
          const isActive = transferring.from === from && transferring.to === to;
          
          return (
            <g key={idx}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(36, 66, 112, 0.2)'}
                strokeWidth="2"
              />
              {isActive && (
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isDark ? '#06b6d4' : '#0891b2'}
                  strokeWidth="3"
                  strokeDasharray="10 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: 'linear' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="grid grid-cols-2 gap-8 relative" style={{ zIndex: 1 }}>
        {blocks.map((block, index) => {
          const isTransferringFrom = transferring.from === index;
          const isTransferringTo = transferring.to === index;

          return (
            <div key={block.id} className="relative">
              <motion.div
                className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${
                  block.active
                    ? isDark
                      ? 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50'
                      : 'bg-gradient-to-br from-[#244270] via-blue-500 to-[#4dbdce] border-2 border-cyan-400 shadow-lg shadow-cyan-500/30'
                    : isDark
                      ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30'
                      : 'bg-gradient-to-br from-[#244270]/10 to-[#4dbdce]/10 border-2 border-[#244270]/20'
                }`}
                animate={
                  isTransferringFrom
                    ? { scale: [1, 0.95, 1], opacity: [1, 0.7, 1] }
                    : isTransferringTo
                      ? { scale: [1, 1.05, 1] }
                      : {}
                }
                transition={{ duration: 2 }}
              >
                {/* Binary Data Display - No "Block X" text */}
                <div className={`text-sm font-mono leading-tight text-center px-2 ${
                  block.active 
                    ? 'text-cyan-200 font-bold' 
                    : isDark ? 'text-white/20' : 'text-[#141225]/20'
                }`}>
                  {block.data || '00000000'}
                </div>

                {/* Pulse Effect for Active Block */}
                {block.active && (
                  <motion.div
                    className={`absolute inset-0 rounded-2xl ${
                      isDark 
                        ? 'bg-cyan-400/20' 
                        : 'bg-cyan-500/20'
                    }`}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Data Transfer Animation Along Line */}
              {isTransferringFrom && transferring.to !== null && (
                <AnimatePresence>
                  {(() => {
                    const { x1, y1, x2, y2 } = getConnectionPath(index, transferring.to);
                    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    return (
                      <motion.div
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 10,
                        }}
                        initial={{ 
                          x: (x1 - 144) - 64,
                          y: (y1 - 144) - 64,
                        }}
                        animate={{ 
                          x: (x2 - 144) - 64,
                          y: (y2 - 144) - 64,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: 'linear' }}
                      >
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap ${
                          isDark 
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                            : 'bg-cyan-400 text-white shadow-lg shadow-cyan-400/50'
                        }`}>
                          {transferring.data}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>

      {/* Background Glow */}
      <motion.div
        className={`absolute inset-0 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-b from-purple-500/5 via-cyan-500/5 to-transparent' 
            : 'bg-gradient-to-b from-[#244270]/5 via-[#4dbdce]/5 to-transparent'
        }`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}