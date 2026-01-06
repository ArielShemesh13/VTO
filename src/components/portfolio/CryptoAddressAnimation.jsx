import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CryptoAddressAnimation({ isDark }) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [btcPrice, setBtcPrice] = useState(0);
  const [animatingTx, setAnimatingTx] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(0);

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
            
            if (newTransactions.length >= 4) break;
          }
        }
        
        if (newTransactions.length > 0) {
          setAllTransactions(newTransactions.slice(0, 10)); // Store more transactions
          setDisplayedTransactions([]); // Reset displayed
          setLoadingIndex(0); // Reset loading index
        }
      } catch (error) {
        console.error('Error fetching BTC:', error);
      }
    };

    fetchBTC();
    const interval = setInterval(fetchBTC, 60000);
    return () => clearInterval(interval);
  }, [btcPrice]);

  // Gradually load transactions - one every 4-5 seconds with 2 second animation
  useEffect(() => {
    if (allTransactions.length === 0) return;
    if (displayedTransactions.length >= 4) return; // Stop at 4 transactions

    const nextIndex = loadingIndex;
    if (nextIndex >= allTransactions.length) return;

    const timer = setTimeout(() => {
      const newTx = allTransactions[nextIndex];
      setDisplayedTransactions(prev => [...prev, newTx]);
      setAnimatingTx(newTx.id);
      
      // Stop animation after 2 seconds
      setTimeout(() => setAnimatingTx(null), 2000);
      
      // Move to next transaction
      setLoadingIndex(prev => prev + 1);
    }, nextIndex === 0 ? 0 : 4500); // First one immediate, others after 4.5 seconds

    return () => clearTimeout(timer);
  }, [allTransactions, loadingIndex, displayedTransactions.length]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full space-y-1.5">
        <AnimatePresence mode="popLayout">
          {displayedTransactions.map((tx) => {
            const isAnimating = animatingTx === tx.id;
            
            return (
              <motion.a
                key={tx.id}
                href={tx.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`relative flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 hover:border-orange-500/50' 
                    : 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-300/50 hover:border-orange-400'
                }`}
              >
                {/* Transfer Animation */}
                {isAnimating && (
                  <motion.div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-lg`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className={`absolute w-12 h-12 rounded-full ${
                        isDark ? 'bg-orange-400/30' : 'bg-orange-500/30'
                      } blur-xl`}
                      initial={{ x: '-100%', scale: 0.5 }}
                      animate={{ x: '200%', scale: 1.5 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.div
                      className={`text-xs font-bold ${isDark ? 'text-orange-300' : 'text-orange-600'}`}
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      {tx.amount} BTC
                    </motion.div>
                  </motion.div>
                )}

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <motion.span 
                    className={`font-mono text-[9px] truncate ${
                      isDark ? 'text-orange-300' : 'text-orange-700'
                    }`}
                    animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {tx.from}
                  </motion.span>
                  
                  <motion.div
                    animate={isAnimating ? { x: [0, 5, 0], rotate: [0, 360] } : {}}
                    transition={{ duration: 0.5, repeat: isAnimating ? 3 : 0 }}
                  >
                    <ArrowRight className={`w-3 h-3 flex-shrink-0 ${
                      isDark ? 'text-yellow-400' : 'text-orange-500'
                    }`} />
                  </motion.div>
                  
                  <motion.span 
                    className={`font-mono text-[9px] truncate ${
                      isDark ? 'text-yellow-300' : 'text-orange-700'
                    }`}
                    animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    {tx.to}
                  </motion.span>
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
            );
          })}
        </AnimatePresence>
        
        {displayedTransactions.length === 0 && (
          <div className={`text-center py-4 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
            <p className="text-xs">Loading live Bitcoin transactions...</p>
          </div>
        )}
        
        {displayedTransactions.length > 0 && displayedTransactions.length < 4 && (
          <div className={`text-center py-2 ${isDark ? 'text-white/30' : 'text-[#141225]/30'}`}>
            <p className="text-xs">Loading more... ({displayedTransactions.length}/4)</p>
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