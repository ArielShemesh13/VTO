import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Database, Blocks } from 'lucide-react';

export default function DataAnalyticsAnimation({ isDark }) {
  const [activeView, setActiveView] = useState(0);
  const [dataBlocks, setDataBlocks] = useState([
    { id: 1, value: 85, verified: true },
    { id: 2, value: 72, verified: true },
    { id: 3, value: 65, verified: false },
    { id: 4, value: 90, verified: false }
  ]);

  // מחזור בין תצוגות
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveView(prev => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // עדכון נתונים בצורה חלקה
  useEffect(() => {
    const interval = setInterval(() => {
      setDataBlocks(prev => prev.map(block => ({
        ...block,
        value: 50 + Math.random() * 45,
        verified: Math.random() > 0.3
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-40 h-40">
      {/* רקע מטושטש */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #3b82f6 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 160 160" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8b5cf6' : '#6366f1'} stopOpacity="0.8" />
            <stop offset="50%" stopColor={isDark ? '#06b6d4' : '#3b82f6'} stopOpacity="0.6" />
            <stop offset="100%" stopColor={isDark ? '#3b82f6' : '#06b6d4'} stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="blockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#a855f7' : '#818cf8'} />
            <stop offset="100%" stopColor={isDark ? '#7c3aed' : '#6366f1'} />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="glass">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="1 1" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Glass morphism container */}
        <motion.rect
          x="30"
          y="30"
          width="100"
          height="100"
          rx="20"
          fill={isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.4)'}
          stroke="url(#mainGrad)"
          strokeWidth="1.5"
          filter="url(#glass)"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Inner glass card */}
        <rect
          x="40"
          y="40"
          width="80"
          height="80"
          rx="16"
          fill={isDark ? 'rgba(10, 1, 24, 0.5)' : 'rgba(255, 255, 255, 0.6)'}
          stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(99, 102, 241, 0.25)'}
          strokeWidth="1"
        />

        <AnimatePresence mode="wait">
          {activeView === 0 ? (
            // תצוגת Data Analytics
            <motion.g
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* גרף עמודות מתקדם */}
              {dataBlocks.map((block, i) => (
                <g key={block.id}>
                  <motion.rect
                    x={50 + i * 18}
                    y={120 - block.value * 0.6}
                    width="14"
                    height={block.value * 0.6}
                    rx="4"
                    fill="url(#blockGrad)"
                    filter="url(#softGlow)"
                    initial={{ height: 0, y: 120 }}
                    animate={{ 
                      height: block.value * 0.6, 
                      y: 120 - block.value * 0.6 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeOut",
                      delay: i * 0.1 
                    }}
                  />
                  
                  {/* נקודת אימות */}
                  {block.verified && (
                    <motion.circle
                      cx={57 + i * 18}
                      cy={115 - block.value * 0.6}
                      r="3"
                      fill={isDark ? '#10b981' : '#059669'}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    />
                  )}
                </g>
              ))}

              {/* קו מגמה */}
              <motion.path
                d={`M ${50 + 7} ${120 - dataBlocks[0].value * 0.6} 
                    L ${68 + 7} ${120 - dataBlocks[1].value * 0.6} 
                    L ${86 + 7} ${120 - dataBlocks[2].value * 0.6} 
                    L ${104 + 7} ${120 - dataBlocks[3].value * 0.6}`}
                fill="none"
                stroke={isDark ? '#06b6d4' : '#3b82f6'}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.g>
          ) : (
            // תצוגת Web3 Blockchain
            <motion.g
              key="web3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* בלוקים מחוברים */}
              {[
                { x: 55, y: 60 },
                { x: 85, y: 60 },
                { x: 55, y: 85 },
                { x: 85, y: 85 }
              ].map((pos, i) => (
                <g key={i}>
                  {/* קווי חיבור */}
                  {i < 3 && (
                    <motion.line
                      x1={pos.x + (i === 0 || i === 2 ? 10 : 0)}
                      y1={pos.y + (i < 2 ? 10 : 0)}
                      x2={i === 0 ? 85 : i === 1 ? 85 : 85}
                      y2={i === 0 ? 60 : i === 1 ? 85 : 85}
                      stroke="url(#mainGrad)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                    />
                  )}
                  
                  {/* בלוק */}
                  <motion.rect
                    x={pos.x}
                    y={pos.y}
                    width="20"
                    height="20"
                    rx="6"
                    fill="url(#blockGrad)"
                    filter="url(#softGlow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: i * 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  />
                  
                  {/* Hash symbol */}
                  <text
                    x={pos.x + 10}
                    y={pos.y + 13}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontFamily="monospace"
                    opacity="0.9"
                  >
                    #
                  </text>

                  {/* אנימציית pulses */}
                  <motion.circle
                    cx={pos.x + 10}
                    cy={pos.y + 10}
                    r="12"
                    fill="none"
                    stroke={isDark ? '#8b5cf6' : '#6366f1'}
                    strokeWidth="1"
                    opacity="0"
                    animate={{ 
                      r: [12, 18],
                      opacity: [0.5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                </g>
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* אייקונים צפים בפינות */}
        {[
          { Icon: BarChart3, pos: { x: 35, y: 35 }, delay: 0 },
          { Icon: Blocks, pos: { x: 120, y: 35 }, delay: 0.2 },
          { Icon: Database, pos: { x: 35, y: 120 }, delay: 0.4 },
          { Icon: TrendingUp, pos: { x: 120, y: 120 }, delay: 0.6 }
        ].map(({ Icon, pos, delay }, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: activeView === Math.floor(i / 2) ? 0.8 : 0.4 
            }}
            transition={{ delay, duration: 0.5 }}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r="8"
              fill={isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(99, 102, 241, 0.15)'}
              stroke="url(#mainGrad)"
              strokeWidth="1"
            />
            <foreignObject
              x={pos.x - 6}
              y={pos.y - 6}
              width="12"
              height="12"
            >
              <Icon 
                size={12} 
                className={isDark ? 'text-purple-400' : 'text-indigo-600'}
              />
            </foreignObject>
          </motion.g>
        ))}

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            r="1.5"
            fill={isDark ? '#8b5cf6' : '#6366f1'}
            opacity="0.4"
            animate={{
              cx: [60 + i * 8, 60 + i * 8 + (Math.random() - 0.5) * 20],
              cy: [50 + (i % 3) * 20, 50 + (i % 3) * 20 + (Math.random() - 0.5) * 20],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Label */}
      <motion.div
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-widest whitespace-nowrap ${
          isDark ? 'text-purple-400/80' : 'text-indigo-600/90'
        }`}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {activeView === 0 ? 'Data Analytics' : 'Web3 Insights'}
      </motion.div>
    </div>
  );
}