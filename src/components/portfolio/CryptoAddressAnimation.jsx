import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CryptoAddressAnimation({ isDark }) {
  // יצירת hash אקראי לאתחול
  const generateRandomHash = (crypto) => {
    const chars = '0123456789abcdef';
    const length = 64;
    let hash = '';
    for (let i = 0; i < length; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const [transactions, setTransactions] = useState([]);
  const [btcPrice, setBtcPrice] = useState(0);



  // Fetch Bitcoin price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setBtcPrice(data.bitcoin?.usd || 95000);
      } catch (error) {
        setBtcPrice(95000);
      }
    };
    
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Bitcoin transactions over $100,000
  useEffect(() => {
    if (!btcPrice) return;

    const fetchBTC = async () => {
      try {
        const response = await fetch('https://blockchain.info/unconfirmed-transactions?format=json');
        const data = await response.json();
        
        const newTransactions = [];
        for (const tx of data.txs || []) {
          const valueSat = tx.out.reduce((sum, out) => sum + out.value, 0);
          const valueBtc = valueSat / 1e8;
          const valueUsd = valueBtc * btcPrice;
          
          if (valueUsd >= 100000 && valueBtc > 0) {
            newTransactions.push({
              id: tx.hash,
              hash: tx.hash,
              from: tx.inputs[0]?.prev_out?.addr?.substring(0, 10) + '...' || 'Unknown',
              to: tx.out[0]?.addr?.substring(0, 10) + '...' || 'Multiple',
              amount: valueBtc.toFixed(4),
              usdValue: Math.floor(valueUsd).toLocaleString(),
              explorerUrl: `https://blockchain.info/tx/${tx.hash}`,
              timestamp: Date.now(),
            });
            
            if (newTransactions.length >= 10) break;
          }
        }
        
        if (newTransactions.length > 0) {
          setTransactions(prev => {
            const combined = [...newTransactions, ...prev];
            return combined.slice(0, 10);
          });
        }
      } catch (error) {
        console.error('Error fetching BTC:', error);
      }
    };

    fetchBTC();
    const interval = setInterval(fetchBTC, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [btcPrice]);





  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full space-y-1.5">
        <AnimatePresence mode="popLayout">
          {transactions.slice(0, 4).map((tx) => (
            <motion.a
              key={tx.id}
              href={tx.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 hover:border-orange-500/50' 
                  : 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-300/50 hover:border-orange-400'
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className={`font-mono text-[9px] truncate ${
                  isDark ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  {tx.from}
                </span>
                
                <ArrowRight className={`w-3 h-3 flex-shrink-0 ${
                  isDark ? 'text-yellow-400' : 'text-orange-500'
                }`} />
                
                <span className={`font-mono text-[9px] truncate ${
                  isDark ? 'text-yellow-300' : 'text-orange-700'
                }`}>
                  {tx.to}
                </span>
              </div>
              
              <div className="flex flex-col items-end flex-shrink-0">
                <span className={`font-mono text-[10px] font-bold whitespace-nowrap ${
                  isDark ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  {tx.amount} BTC
                </span>
                <span className={`text-[9px] font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  ${tx.usdValue}
                </span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
        
        {transactions.length === 0 && (
          <div className={`text-center py-4 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
            <p className="text-xs">Waiting for transactions over $100,000...</p>
          </div>
        )}
      </div>

      <motion.div
        className={`absolute inset-0 pointer-events-none ${
          isDark ? 'bg-gradient-to-b from-orange-500/5 to-transparent' : 'bg-gradient-to-b from-orange-200/20 to-transparent'
        }`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}