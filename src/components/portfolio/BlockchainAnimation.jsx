import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to generate random hash-like strings
const generateHash = () => {
  const chars = '0123456789ABCDEF';
  return Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Helper to generate random number for calculations
const randomNum = () => Math.floor(Math.random() * 999999);

const BlockchainAnimation = ({ isDark }) => {
  const [blocks, setBlocks] = useState([
    { id: 0, hash: generateHash(), status: 'verified', nonce: randomNum(), timestamp: Date.now() - 30000 },
    { id: 1, hash: generateHash(), status: 'verified', nonce: randomNum(), timestamp: Date.now() - 20000 },
    { id: 2, hash: generateHash(), status: 'verified', nonce: randomNum(), timestamp: Date.now() - 10000 },
  ]);
  
  const [calculations, setCalculations] = useState({});
  const [particles, setParticles] = useState([]);

  // Add new block periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => {
        if (prev.length >= 6) {
          return [
            ...prev.slice(1),
            { 
              id: prev[prev.length - 1].id + 1, 
              hash: '', 
              status: 'mining', 
              nonce: 0,
              timestamp: Date.now()
            }
          ];
        }
        return [
          ...prev,
          { 
            id: prev[prev.length - 1].id + 1, 
            hash: '', 
            status: 'mining', 
            nonce: 0,
            timestamp: Date.now()
          }
        ];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Mining animation - calculate hash
  useEffect(() => {
    const miningBlocks = blocks.filter(b => b.status === 'mining');
    
    miningBlocks.forEach((block) => {
      if (!calculations[block.id]) {
        setCalculations(prev => ({ ...prev, [block.id]: 0 }));
      }

      const calcInterval = setInterval(() => {
        setCalculations(prev => {
          const current = prev[block.id] || 0;
          if (current >= 100) {
            // Mining complete
            setTimeout(() => {
              setBlocks(prevBlocks => 
                prevBlocks.map(b => 
                  b.id === block.id 
                    ? { ...b, status: 'verifying', hash: generateHash(), nonce: randomNum() }
                    : b
                )
              );
            }, 100);
            return prev;
          }
          return { ...prev, [block.id]: current + 2 };
        });
      }, 50);

      return () => clearInterval(calcInterval);
    });
  }, [blocks]);

  // Verifying to verified transition
  useEffect(() => {
    const verifyingBlocks = blocks.filter(b => b.status === 'verifying');
    
    verifyingBlocks.forEach((block) => {
      setTimeout(() => {
        setBlocks(prevBlocks => 
          prevBlocks.map(b => 
            b.id === block.id ? { ...b, status: 'verified' } : b
          )
        );
      }, 2000);
    });
  }, [blocks]);

  // Particle system
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => {
        const newParticles = prev.filter(p => Date.now() - p.createdAt < 3000);
        
        // Add new particles
        if (Math.random() > 0.7) {
          newParticles.push({
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            createdAt: Date.now(),
            color: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4'
          });
        }
        
        return newParticles;
      });
    }, 300);

    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particle.color,
                filter: 'blur(1px)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -100],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(99, 102, 241, 0.1)'} 1px, transparent 1px),
                           linear-gradient(90deg, ${isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(99, 102, 241, 0.1)'} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Blockchain visualization */}
      <div className="relative h-full flex items-center justify-center p-8">
        <div className="flex items-center gap-6 flex-wrap justify-center max-w-5xl">
          <AnimatePresence mode="popLayout">
            {blocks.map((block, index) => (
              <React.Fragment key={block.id}>
                {/* Block */}
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: -100 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className={`relative ${
                    block.status === 'mining' 
                      ? isDark ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40' : 'bg-gradient-to-br from-purple-100 to-pink-100'
                      : block.status === 'verifying'
                        ? isDark ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40' : 'bg-gradient-to-br from-blue-100 to-cyan-100'
                        : isDark ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40' : 'bg-gradient-to-br from-green-100 to-emerald-100'
                  } backdrop-blur-xl rounded-2xl p-4 border-2 ${
                    block.status === 'mining'
                      ? isDark ? 'border-purple-500/50' : 'border-purple-400'
                      : block.status === 'verifying'
                        ? isDark ? 'border-blue-500/50' : 'border-blue-400'
                        : isDark ? 'border-green-500/50' : 'border-green-400'
                  } w-44 h-44 shadow-2xl`}
                  style={{
                    boxShadow: block.status === 'mining' 
                      ? `0 0 30px ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)'}`
                      : block.status === 'verifying'
                        ? `0 0 30px ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`
                        : `0 0 30px ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'}`
                  }}
                >
                  {/* Block header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      Block #{block.id}
                    </span>
                    <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      block.status === 'mining'
                        ? 'bg-purple-500 text-white'
                        : block.status === 'verifying'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                    }`}>
                      {block.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Hash calculation visualization */}
                  {block.status === 'mining' && (
                    <div className="space-y-1 mb-2">
                      <div className={`text-[8px] font-mono ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                        <motion.div
                          key={calculations[block.id]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="overflow-hidden"
                        >
                          NONCE: {Math.floor((calculations[block.id] || 0) * 99999)}
                        </motion.div>
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="mt-1"
                        >
                          HASH: {generateHash().substring(0, 20)}...
                        </motion.div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-purple-900/50' : 'bg-purple-200'}`}>
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculations[block.id] || 0}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <div className={`text-[8px] text-center font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                        {Math.floor(calculations[block.id] || 0)}% POW
                      </div>
                    </div>
                  )}

                  {/* Verification animation */}
                  {block.status === 'verifying' && (
                    <div className="space-y-2 mb-2">
                      <motion.div
                        className={`text-[8px] font-mono ${isDark ? 'text-blue-300' : 'text-blue-700'}`}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        <div>HASH: {block.hash.substring(0, 16)}...</div>
                        <div className="mt-1">VERIFYING SIGNATURES...</div>
                      </motion.div>
                      
                      {/* Rotating verification circle */}
                      <div className="flex justify-center">
                        <motion.div
                          className={`w-12 h-12 rounded-full border-4 ${isDark ? 'border-blue-500/30' : 'border-blue-400/30'}`}
                          style={{
                            borderTopColor: isDark ? '#3b82f6' : '#2563eb',
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Verified state */}
                  {block.status === 'verified' && (
                    <div className="space-y-1">
                      <div className={`text-[8px] font-mono ${isDark ? 'text-green-300' : 'text-green-700'} break-all`}>
                        <div className="font-bold">HASH:</div>
                        <div className="opacity-70">{block.hash.substring(0, 32)}...</div>
                      </div>
                      
                      {/* Checkmark */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="flex justify-center mt-2"
                      >
                        <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-400'} flex items-center justify-center shadow-lg`}>
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className={`text-[7px] mt-2 text-center ${isDark ? 'text-white/40' : 'text-gray-500'} font-mono`}>
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </div>

                  {/* Glowing border animation */}
                  {block.status === 'mining' && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        border: '2px solid',
                        borderColor: isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.3)',
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)'}`,
                          `0 0 40px ${isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.4)'}`,
                          `0 0 20px ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)'}`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Data stream particles */}
                  {block.status === 'mining' && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-purple-400"
                          style={{
                            left: `${20 + i * 15}%`,
                            bottom: '10%',
                          }}
                          animate={{
                            y: [-20, -60],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>

                {/* Chain connector */}
                {index < blocks.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    className="relative"
                  >
                    <div className={`w-8 h-0.5 ${
                      blocks[index + 1].status === 'verified'
                        ? isDark ? 'bg-green-500' : 'bg-green-400'
                        : isDark ? 'bg-purple-500/50' : 'bg-purple-400/50'
                    }`} />
                    
                    {/* Data flow animation */}
                    <motion.div
                      className={`absolute top-1/2 w-2 h-2 rounded-full ${
                        blocks[index + 1].status === 'verified'
                          ? 'bg-green-500'
                          : 'bg-purple-500'
                      }`}
                      animate={{
                        x: [-10, 40],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Status legend */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 text-xs backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
          <span className={isDark ? 'text-white' : 'text-gray-800'}>Mining (POW)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className={isDark ? 'text-white' : 'text-gray-800'}>Verifying</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className={isDark ? 'text-white' : 'text-gray-800'}>Verified</span>
        </div>
      </div>
    </div>
  );
};

export default BlockchainAnimation;