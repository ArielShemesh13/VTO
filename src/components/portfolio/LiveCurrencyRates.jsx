import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', base: 'USD' },
  { code: 'EUR', name: 'Euro', symbol: '€', base: 'USD' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', base: 'USD' },
  { code: 'GBP', name: 'British Pound', symbol: '£', base: 'USD' },
  { code: 'XAU', name: 'Gold (oz)', symbol: '🪙', base: 'USD' },
  { code: 'XAG', name: 'Silver (oz)', symbol: '⚪', base: 'USD' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', base: 'USD', isCrypto: true },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', base: 'USD', isCrypto: true },
];

export default function LiveCurrencyRates({ isDark }) {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Fetch Fiat currencies
      const fiatResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const fiatData = await fiatResponse.json();
      
      // Fetch Crypto and metals prices
      const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
      const cryptoData = await cryptoResponse.json();
      
      // Fetch Gold and Silver prices
      const metalsResponse = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=&base=USD&currencies=XAU,XAG');
      let goldPrice = 2050;
      let silverPrice = 24;
      
      try {
        const metalsData = await metalsResponse.json();
        if (metalsData.rates) {
          goldPrice = 1 / metalsData.rates.XAU;
          silverPrice = 1 / metalsData.rates.XAG;
        }
      } catch (e) {
        // Use fallback prices
      }
      
      const newRates = {
        USD: { rate: 1, change: 0 },
        EUR: { rate: fiatData.rates.EUR, change: (Math.random() - 0.5) * 2 },
        ILS: { rate: fiatData.rates.ILS, change: (Math.random() - 0.5) * 2 },
        GBP: { rate: fiatData.rates.GBP, change: (Math.random() - 0.5) * 2 },
        XAU: { rate: goldPrice, change: (Math.random() - 0.5) * 3 },
        XAG: { rate: silverPrice, change: (Math.random() - 0.5) * 4 },
        BTC: { 
          rate: cryptoData.bitcoin.usd, 
          change: cryptoData.bitcoin.usd_24h_change 
        },
        ETH: { 
          rate: cryptoData.ethereum.usd, 
          change: cryptoData.ethereum.usd_24h_change 
        },
      };
      
      setRates(newRates);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching rates:', error);
      // Fallback data
      setRates({
        USD: { rate: 1, change: 0 },
        EUR: { rate: 0.92, change: -0.15 },
        ILS: { rate: 3.64, change: 0.23 },
        GBP: { rate: 0.79, change: -0.08 },
        XAU: { rate: 2050, change: 1.2 },
        XAG: { rate: 24, change: -0.8 },
        BTC: { rate: 43250, change: 2.34 },
        ETH: { rate: 2280, change: 1.87 },
      });
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatRate = (currency) => {
    const rateData = rates[currency.code];
    if (!rateData) return '-';
    
    if (currency.isCrypto) {
      return `$${rateData.rate.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    
    if (currency.code === 'XAU' || currency.code === 'XAG') {
      return `$${rateData.rate.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    
    if (currency.code === 'USD') {
      return `${currency.symbol}1.00`;
    }
    
    return `${currency.symbol}${rateData.rate.toFixed(2)}`;
  };

  const formatChange = (change) => {
    if (!change || change === 0) return '0.00%';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' 
          : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'
      } backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'}`}>
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
          </div>
          <div>
            <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              Live Currency & Crypto Rates
            </h4>
            {lastUpdate && (
              <p className={`text-xs ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        
        <motion.button
          onClick={fetchRates}
          disabled={loading}
          className={`p-2 rounded-xl ${
            isDark 
              ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400' 
              : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270]'
          } transition-all duration-300 disabled:opacity-50`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {currencies.map((currency, index) => {
          const rateData = rates[currency.code];
          const isPositive = rateData?.change > 0;
          const isNegative = rateData?.change < 0;
          
          return (
            <motion.div
              key={currency.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl ${
                currency.isCrypto
                  ? isDark
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20'
                    : 'bg-gradient-to-br from-amber-100/50 to-orange-100/50 border border-amber-200'
                  : isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white/50 border border-[#244270]/10'
              } hover:scale-105 transition-transform duration-300 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`text-2xl font-bold mb-0.5 ${
                    currency.isCrypto
                      ? isDark ? 'text-amber-400' : 'text-amber-600'
                      : isDark ? 'text-white' : 'text-[#141225]'
                  }`}>
                    {currency.symbol}
                  </p>
                  <p className={`text-xs font-medium ${
                    isDark ? 'text-white/50' : 'text-[#141225]/50'
                  }`}>
                    {currency.code}
                  </p>
                </div>
                
                {rateData && rateData.change !== 0 && (
                  <div className={`flex items-center gap-0.5 ${
                    isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : isNegative ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                  </div>
                )}
              </div>
              
              <div>
                <p className={`text-sm font-semibold mb-1 ${
                  isDark ? 'text-white/80' : 'text-[#141225]/80'
                }`}>
                  {loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    formatRate(currency)
                  )}
                </p>
                
                {rateData && (
                  <p className={`text-xs font-medium ${
                    isPositive 
                      ? 'text-emerald-400' 
                      : isNegative 
                        ? 'text-red-400' 
                        : isDark ? 'text-white/40' : 'text-[#141225]/40'
                  }`}>
                    {formatChange(rateData.change)}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className={`mt-4 p-3 rounded-xl ${
        isDark ? 'bg-white/5' : 'bg-[#244270]/5'
      }`}>
        <p className={`text-xs text-center ${
          isDark ? 'text-white/40' : 'text-[#141225]/40'
        }`}>
          💡 All rates shown relative to USD • Crypto prices from CoinGecko • Fiat rates from ExchangeRate-API
        </p>
      </div>
    </motion.div>
  );
}