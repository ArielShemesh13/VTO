import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StockTickerAnimation({ isDark }) {
  const [topStocks, setTopStocks] = useState([]);
  const [bottomStocks, setBottomStocks] = useState([]);
  const [currentView, setCurrentView] = useState('top');

  useEffect(() => {
    // סימולציה של מניות - בפרודקשן נחבר ל-API אמיתי
    const generateStocks = () => {
      const stockNames = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA', 'META', 'AMZN', 'AMD', 'NFLX', 'INTC'];
      
      const winners = stockNames.slice(0, 5).map(name => ({
        symbol: name,
        change: (Math.random() * 8 + 2).toFixed(2),
        price: (Math.random() * 300 + 100).toFixed(2)
      })).sort((a, b) => b.change - a.change);

      const losers = stockNames.slice(5).map(name => ({
        symbol: name,
        change: -(Math.random() * 8 + 2).toFixed(2),
        price: (Math.random() * 300 + 100).toFixed(2)
      })).sort((a, b) => a.change - b.change);

      setTopStocks(winners);
      setBottomStocks(losers);
    };

    generateStocks();
    const interval = setInterval(generateStocks, 10000); // רענון כל 10 שניות
    return () => clearInterval(interval);
  }, []);

  // החלפה אוטומטית בין מנצחים למפסידים
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView(prev => prev === 'top' ? 'bottom' : 'top');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayStocks = currentView === 'top' ? topStocks : bottomStocks;
  const isWinners = currentView === 'top';

  return (
    <div className="relative w-32 h-32 flex flex-col items-center justify-center">
      {/* כותרת */}
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`text-center mb-2`}
      >
        <div className={`flex items-center gap-1 text-xs font-bold ${
          isWinners 
            ? (isDark ? 'text-emerald-400' : 'text-emerald-600')
            : (isDark ? 'text-red-400' : 'text-red-600')
        }`}>
          {isWinners ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isWinners ? 'TOP GAINERS' : 'TOP LOSERS'}</span>
        </div>
      </motion.div>

      {/* רשימת מניות */}
      <div className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: isWinners ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isWinners ? 20 : -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-1"
          >
            {displayStocks.map((stock, idx) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center justify-between px-2 py-1 rounded ${
                  isDark ? 'bg-white/5' : 'bg-black/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold ${
                    isDark ? 'text-white' : 'text-[#141225]'
                  }`}>
                    {stock.symbol}
                  </span>
                  <span className={`text-[9px] ${
                    isDark ? 'text-white/40' : 'text-[#141225]/40'
                  }`}>
                    ${stock.price}
                  </span>
                </div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2
                  }}
                  className={`flex items-center gap-0.5 text-[10px] font-bold ${
                    isWinners
                      ? (isDark ? 'text-emerald-400' : 'text-emerald-600')
                      : (isDark ? 'text-red-400' : 'text-red-600')
                  }`}
                >
                  {isWinners ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  <span>{Math.abs(stock.change)}%</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* אינדיקטור */}
      <div className="flex gap-1 mt-2">
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${
            currentView === 'top' 
              ? (isDark ? 'bg-emerald-400' : 'bg-emerald-600')
              : (isDark ? 'bg-white/20' : 'bg-black/20')
          }`}
          animate={{ scale: currentView === 'top' ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 1, repeat: currentView === 'top' ? Infinity : 0 }}
        />
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${
            currentView === 'bottom' 
              ? (isDark ? 'bg-red-400' : 'bg-red-600')
              : (isDark ? 'bg-white/20' : 'bg-black/20')
          }`}
          animate={{ scale: currentView === 'bottom' ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 1, repeat: currentView === 'bottom' ? Infinity : 0 }}
        />
      </div>

      {/* הערה */}
      <motion.div 
        className={`text-[8px] mt-1 ${isDark ? 'text-white/30' : 'text-[#141225]/30'}`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Live Market Data
      </motion.div>
    </div>
  );
}