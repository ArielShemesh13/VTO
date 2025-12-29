import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CryptoAddressAnimation({ isDark }) {
  const cryptos = ['BTC', 'ETH', 'LINK', 'BNB', 'XRP'];
  const [addresses, setAddresses] = useState(
    cryptos.map((crypto, idx) => ({
      crypto,
      address: generateCryptoAddress(crypto),
      key: `${crypto}-${Date.now()}-${idx}`
    }))
  );

  const cryptoColors = {
    BTC: isDark ? 'text-orange-400' : 'text-orange-600',
    ETH: isDark ? 'text-purple-400' : 'text-purple-600',
    LINK: isDark ? 'text-indigo-400' : 'text-indigo-600',
    BNB: isDark ? 'text-yellow-400' : 'text-yellow-600',
    XRP: isDark ? 'text-blue-400' : 'text-blue-600',
  };

  function generateCryptoAddress(crypto) {
    const chars = '0123456789ABCDEFabcdef';
    const prefix = crypto === 'BTC' ? '1' : crypto === 'XRP' ? 'r' : '0x';
    const length = crypto === 'XRP' ? 34 : crypto === 'BTC' ? 34 : 40;
    let address = prefix;
    for (let i = 0; i < length - prefix.length; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }

  useEffect(() => {
    // עדכון כתובת רנדומלית כל 3 שניות
    const interval = setInterval(() => {
      setAddresses(prev => {
        const newAddresses = [...prev];
        const randomIndex = Math.floor(Math.random() * cryptos.length);
        const crypto = cryptos[randomIndex];
        newAddresses[randomIndex] = {
          crypto,
          address: generateCryptoAddress(crypto),
          key: `${crypto}-${Date.now()}-${randomIndex}`
        };
        return newAddresses;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className={`text-[8px] font-bold mb-2 tracking-wider ${
        isDark ? 'text-purple-400' : 'text-[#244270]'
      }`}>
        LIVE BLOCKCHAIN TRANSACTIONS
      </div>
      
      <div className="w-full space-y-1">
        <AnimatePresence mode="popLayout">
          {addresses.map((addr) => (
            <motion.div
              key={addr.key}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`font-mono text-[7px] px-2 py-1.5 rounded flex items-center gap-2 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' 
                  : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'
              } overflow-hidden`}
            >
              <span className={`font-bold ${cryptoColors[addr.crypto]}`}>
                {addr.crypto}
              </span>
              <motion.div
                className="truncate flex-1"
                animate={{ 
                  textShadow: [
                    '0 0 0px rgba(139, 92, 246, 0)',
                    `0 0 8px ${cryptoColors[addr.crypto].includes('orange') ? 'rgba(251, 146, 60, 0.6)' : 
                      cryptoColors[addr.crypto].includes('purple') ? 'rgba(168, 85, 247, 0.6)' :
                      cryptoColors[addr.crypto].includes('indigo') ? 'rgba(129, 140, 248, 0.6)' :
                      cryptoColors[addr.crypto].includes('yellow') ? 'rgba(250, 204, 21, 0.6)' :
                      'rgba(96, 165, 250, 0.6)'}`,
                    '0 0 0px rgba(139, 92, 246, 0)'
                  ]
                }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
              >
                <span className={isDark ? 'text-purple-300' : 'text-[#244270]'}>
                  {addr.address}
                </span>
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
          Live Blockchain Data
        </span>
      </div>
    </div>
  );
}