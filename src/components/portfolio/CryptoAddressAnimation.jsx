import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CryptoAddressAnimation({ isDark }) {
  const [addresses, setAddresses] = useState([]);

  // יצירת כתובות קריפטו רנדומליות
  const generateAddress = () => {
    const chars = '0123456789ABCDEFabcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  };

  useEffect(() => {
    // אתחול 5 כתובות
    const initialAddresses = Array(5).fill(null).map((_, idx) => ({
      id: idx,
      value: generateAddress(),
      key: `${idx}-${Date.now()}`
    }));
    setAddresses(initialAddresses);

    // עדכון כתובת רנדומלית כל 2 שניות
    const interval = setInterval(() => {
      setAddresses(prev => {
        const newAddresses = [...prev];
        const randomIndex = Math.floor(Math.random() * 5);
        newAddresses[randomIndex] = {
          id: randomIndex,
          value: generateAddress(),
          key: `${randomIndex}-${Date.now()}`
        };
        return newAddresses;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 flex flex-col items-center justify-center overflow-hidden">
      <div className={`text-[8px] font-bold mb-2 tracking-wider ${
        isDark ? 'text-purple-400' : 'text-[#244270]'
      }`}>
        WALLET ADDRESSES
      </div>
      
      <div className="w-full space-y-1">
        <AnimatePresence mode="popLayout">
          {addresses.map((addr, idx) => (
            <motion.div
              key={addr.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`font-mono text-[7px] px-2 py-1 rounded ${
                isDark 
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' 
                  : 'bg-[#244270]/10 text-[#244270] border border-[#244270]/20'
              } overflow-hidden`}
            >
              <motion.div
                className="truncate"
                animate={{ 
                  textShadow: [
                    '0 0 0px rgba(139, 92, 246, 0)',
                    '0 0 8px rgba(139, 92, 246, 0.6)',
                    '0 0 0px rgba(139, 92, 246, 0)'
                  ]
                }}
                transition={{ duration: 0.5 }}
              >
                {addr.value}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* אפקט זוהר */}
      <motion.div
        className={`absolute inset-0 pointer-events-none ${
          isDark ? 'bg-gradient-to-b from-purple-500/5 to-transparent' : 'bg-gradient-to-b from-[#244270]/5 to-transparent'
        }`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* סטטוס */}
      <div className="flex items-center gap-1 mt-2">
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className={`text-[7px] ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
          Live Blockchain
        </span>
      </div>
    </div>
  );
}