import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function EthereumTransactionsAnimation({ isDark }) {
  const [transactions, setTransactions] = useState([]);

  const generateAddress = () => {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 8; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address + '...';
  };

  const generateTransaction = () => ({
    id: Date.now() + Math.random(),
    from: generateAddress(),
    to: generateAddress(),
    amount: (Math.random() * 5 + 0.01).toFixed(3),
    timestamp: Date.now()
  });

  useEffect(() => {
    // הוספת עסקה חדשה כל 2.5 שניות
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx = generateTransaction();
        const updated = [newTx, ...prev].slice(0, 5);
        return updated;
      });
    }, 2500);

    // אתחול עסקאות ראשוניות
    setTransactions([
      generateTransaction(),
      generateTransaction(),
      generateTransaction(),
    ]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center">
      <div className={`text-[9px] font-bold mb-3 tracking-wider flex items-center gap-1 ${
        isDark ? 'text-purple-400' : 'text-[#244270]'
      }`}>
        <motion.div
          className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        ETHEREUM LIVE TRANSACTIONS
      </div>
      
      <div className="w-full space-y-1.5 px-2">
        <AnimatePresence mode="popLayout">
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' 
                  : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'
              }`}
            >
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className={`font-mono text-[8px] truncate ${
                  isDark ? 'text-purple-300' : 'text-[#244270]'
                }`}>
                  {tx.from}
                </span>
                
                <motion.div
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ArrowRight className={`w-2.5 h-2.5 ${
                    isDark ? 'text-cyan-400' : 'text-[#4dbdce]'
                  }`} />
                </motion.div>
                
                <span className={`font-mono text-[8px] truncate ${
                  isDark ? 'text-cyan-300' : 'text-[#4dbdce]'
                }`}>
                  {tx.to}
                </span>
              </div>
              
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`font-mono text-[8px] font-bold whitespace-nowrap ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}
              >
                {tx.amount} ETH
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className={`text-[7px] mt-2 ${isDark ? 'text-white/30' : 'text-[#141225]/30'}`}>
        Real-time Ethereum Network
      </div>
    </div>
  );
}