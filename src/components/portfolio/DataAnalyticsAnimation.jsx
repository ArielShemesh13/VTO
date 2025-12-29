import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Bitcoin, BarChart2 } from 'lucide-react';

export default function DataAnalyticsAnimation({ isDark }) {
  const [revenue, setRevenue] = useState(45320);
  const [growth, setGrowth] = useState(23);
  const [crypto, setCrypto] = useState(8750);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => Math.floor(40000 + Math.random() * 15000));
      setGrowth(prev => Math.floor(15 + Math.random() * 20));
      setCrypto(prev => Math.floor(7000 + Math.random() * 5000));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const dataPoints = [
    { icon: DollarSign, value: `$${(revenue / 1000).toFixed(1)}K`, label: 'Revenue', color: '#10b981' },
    { icon: TrendingUp, value: `+${growth}%`, label: 'Growth', color: '#3b82f6' },
    { icon: Bitcoin, value: `${(crypto / 1000).toFixed(1)}K`, label: 'Crypto', color: '#f59e0b' },
    { icon: BarChart2, value: '98%', label: 'Accuracy', color: '#8b5cf6' }
  ];

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* רקע מעגלים */}
      <motion.div
        className={`absolute inset-4 rounded-full border-2 ${
          isDark ? 'border-purple-500/20' : 'border-indigo-200'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className={`absolute inset-8 rounded-full border ${
          isDark ? 'border-cyan-500/20' : 'border-cyan-200'
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* נקודות נתונים */}
      {dataPoints.map((item, idx) => {
        const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
        const radius = 60;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={idx}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.15, type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className={`relative flex flex-col items-center gap-1 p-2 rounded-xl ${
              isDark ? 'bg-black/40 backdrop-blur-md border border-white/10' : 'bg-white/60 backdrop-blur-md border border-gray-200'
            }`}>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <motion.div
                key={item.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {item.value}
              </motion.div>
              <div className={`text-[8px] ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                {item.label}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* לוגו מרכזי */}
      <motion.div
        className={`w-16 h-16 rounded-2xl ${
          isDark 
            ? 'bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-purple-500/30' 
            : 'bg-gradient-to-br from-indigo-100 to-cyan-100 border border-indigo-200'
        } backdrop-blur-xl flex items-center justify-center relative z-10`}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            isDark ? '0 0 20px rgba(139, 92, 246, 0.3)' : '0 0 20px rgba(99, 102, 241, 0.2)',
            isDark ? '0 0 30px rgba(139, 92, 246, 0.5)' : '0 0 30px rgba(99, 102, 241, 0.3)',
            isDark ? '0 0 20px rgba(139, 92, 246, 0.3)' : '0 0 20px rgba(99, 102, 241, 0.2)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`text-2xl font-bold ${
          isDark ? 'bg-gradient-to-br from-purple-400 to-cyan-400' : 'bg-gradient-to-br from-indigo-600 to-cyan-600'
        } bg-clip-text text-transparent`}>
          $
        </div>
        <motion.div
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
            isDark ? 'bg-green-500' : 'bg-green-400'
          }`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75" />
        </motion.div>
      </motion.div>

      {/* טקסט תחתון */}
      <motion.div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap ${
          isDark ? 'text-purple-400/70' : 'text-indigo-600/80'
        }`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Financial Analytics
      </motion.div>
    </div>
  );
}