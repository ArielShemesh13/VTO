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
    return Array.from({ length: 16 }, () => Math.random() > 0.5 ? '1' : '0').join('');
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
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
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
                {/* Block Number */}
                <div className={`text-xs font-bold mb-2 ${
                  block.active 
                    ? 'text-white' 
                    : isDark ? 'text-white/40' : 'text-[#141225]/40'
                }`}>
                  Block {block.id}
                </div>

                {/* Binary Data Display */}
                <div className={`text-[10px] font-mono leading-tight text-center px-2 ${
                  block.active 
                    ? 'text-cyan-200' 
                    : isDark ? 'text-white/20' : 'text-[#141225]/20'
                }`}>
                  {block.data || '0000000000000000'}
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

              {/* Data Transfer Animation */}
              {isTransferringFrom && transferring.to !== null && (
                <AnimatePresence>
                  <motion.div
                    className="absolute z-10"
                    initial={{
                      x: index % 2 === 0 ? 0 : 0,
                      y: index < 2 ? 0 : 0,
                    }}
                    animate={{
                      x: transferring.to % 2 === 0 
                        ? (index % 2 === 0 ? 0 : -160) 
                        : (index % 2 === 0 ? 160 : 0),
                      y: transferring.to < 2 
                        ? (index < 2 ? 0 : -160) 
                        : (index < 2 ? 160 : 0),
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className={`px-3 py-2 rounded-lg text-xs font-mono ${
                      isDark 
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                        : 'bg-cyan-400 text-white shadow-lg shadow-cyan-400/50'
                    }`}>
                      {transferring.data}
                    </div>
                  </motion.div>
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