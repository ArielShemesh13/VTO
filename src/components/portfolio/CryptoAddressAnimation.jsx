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

  const [transactions, setTransactions] = useState({
    BTC: {
      hash: generateRandomHash('BTC'),
      from: '1A1zP1eP5Q...',
      to: '3J98t1WpEZ...',
      amount: '0.5420',
      usdValue: '25,000',
      explorerUrl: 'https://blockchain.info/',
      crypto: 'BTC',
    },
    ETH: {
      hash: generateRandomHash('ETH'),
      from: '0x742d35C...',
      to: '0xdAC17F9...',
      amount: '8.3500',
      usdValue: '19,500',
      explorerUrl: 'https://etherscan.io/',
      crypto: 'ETH',
    },
    LINK: {
      hash: generateRandomHash('LINK'),
      from: '0x514910C...',
      to: '0x9f8f72a...',
      amount: '1250.00',
      usdValue: '18,750',
      explorerUrl: 'https://etherscan.io/',
      crypto: 'LINK',
    },
    BNB: {
      hash: generateRandomHash('BNB'),
      from: '0xB8c77c8...',
      to: '0x1f9840a...',
      amount: '35.2500',
      usdValue: '10,500',
      explorerUrl: 'https://bscscan.com/',
      crypto: 'BNB',
    },
    XRP: {
      hash: generateRandomHash('XRP'),
      from: 'rN7n7otQ...',
      to: 'rLHzPsX6o...',
      amount: '15000.00',
      usdValue: '9,000',
      explorerUrl: 'https://xrpscan.com/',
      crypto: 'XRP',
    },
  });
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0, XRP: 0, BNB: 0, LINK: 0 });

  const cryptoColors = {
    BTC: isDark ? 'text-orange-400' : 'text-orange-600',
    ETH: isDark ? 'text-purple-400' : 'text-purple-600',
    LINK: isDark ? 'text-indigo-400' : 'text-indigo-600',
    BNB: isDark ? 'text-yellow-400' : 'text-yellow-600',
    XRP: isDark ? 'text-blue-400' : 'text-blue-600',
  };

  // Fetch current crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,binancecoin,chainlink&vs_currencies=usd');
        const data = await response.json();
        setPrices({
          BTC: data.bitcoin?.usd || 43000,
          ETH: data.ethereum?.usd || 2300,
          XRP: data.ripple?.usd || 0.6,
          BNB: data.binancecoin?.usd || 300,
          LINK: data.chainlink?.usd || 15,
        });
      } catch (error) {
        setPrices({ BTC: 43000, ETH: 2300, XRP: 0.6, BNB: 300, LINK: 15 });
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Bitcoin transactions
  useEffect(() => {
    if (!prices.BTC) return;

    const fetchBTC = async () => {
      try {
        const response = await fetch('https://blockchain.info/unconfirmed-transactions?format=json');
        const data = await response.json();
        
        for (const tx of data.txs || []) {
          const valueSat = tx.out.reduce((sum, out) => sum + out.value, 0);
          const valueBtc = valueSat / 1e8;
          const valueUsd = valueBtc * prices.BTC;
          
          if (valueUsd >= 1000 && valueBtc > 0) {
            setTransactions(prev => ({
              ...prev,
              BTC: {
                id: tx.hash,
                hash: tx.hash,
                from: tx.inputs[0]?.prev_out?.addr?.substring(0, 10) + '...' || 'Unknown',
                to: tx.out[0]?.addr?.substring(0, 10) + '...' || 'Multiple',
                amount: valueBtc.toFixed(4),
                usdValue: Math.floor(valueUsd).toLocaleString(),
                explorerUrl: `https://blockchain.info/tx/${tx.hash}`,
                crypto: 'BTC',
              }
            }));
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching BTC:', error);
      }
    };

    fetchBTC();
    const interval = setInterval(fetchBTC, 8000);
    return () => clearInterval(interval);
  }, [prices.BTC]);

  // Fetch Ethereum transactions
  useEffect(() => {
    if (!prices.ETH) return;

    const fetchETH = async () => {
      try {
        const blockResponse = await fetch('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber');
        const blockData = await blockResponse.json();
        const latestBlock = parseInt(blockData.result, 16);
        
        const txResponse = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${latestBlock.toString(16)}&boolean=true`);
        const txData = await txResponse.json();
        
        for (const tx of txData.result?.transactions || []) {
          const valueWei = parseInt(tx.value, 16);
          const valueEth = valueWei / 1e18;
          const valueUsd = valueEth * prices.ETH;
          
          if (valueUsd >= 1000 && valueEth > 0) {
            setTransactions(prev => ({
              ...prev,
              ETH: {
                id: tx.hash,
                hash: tx.hash,
                from: tx.from.substring(0, 10) + '...',
                to: tx.to?.substring(0, 10) + '...' || 'Contract',
                amount: valueEth.toFixed(4),
                usdValue: Math.floor(valueUsd).toLocaleString(),
                explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
                crypto: 'ETH',
              }
            }));
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching ETH:', error);
      }
    };

    fetchETH();
    const interval = setInterval(fetchETH, 9000);
    return () => clearInterval(interval);
  }, [prices.ETH]);

  // Fetch LINK transactions
  useEffect(() => {
    if (!prices.LINK) return;

    const fetchLINK = async () => {
      try {
        const linkContract = '0x514910771AF9Ca656af840dff83E8264EcF986CA';
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${linkContract}&page=1&offset=50&sort=desc`);
        const data = await response.json();
        
        for (const tx of data.result || []) {
          const amount = parseInt(tx.value) / 1e18;
          const valueUsd = amount * prices.LINK;
          
          if (valueUsd >= 1000) {
            setTransactions(prev => ({
              ...prev,
              LINK: {
                id: tx.hash,
                hash: tx.hash,
                from: tx.from.substring(0, 10) + '...',
                to: tx.to.substring(0, 10) + '...',
                amount: amount.toFixed(2),
                usdValue: Math.floor(valueUsd).toLocaleString(),
                explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
                crypto: 'LINK',
              }
            }));
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching LINK:', error);
      }
    };

    fetchLINK();
    const interval = setInterval(fetchLINK, 10000);
    return () => clearInterval(interval);
  }, [prices.LINK]);

  // Fetch BNB transactions
  useEffect(() => {
    if (!prices.BNB) return;

    const fetchBNB = async () => {
      try {
        const response = await fetch('https://api.bscscan.com/api?module=proxy&action=eth_blockNumber');
        const blockData = await response.json();
        const latestBlock = parseInt(blockData.result, 16);
        
        const txResponse = await fetch(`https://api.bscscan.com/api?module=proxy&action=eth_getBlockByNumber&tag=0x${latestBlock.toString(16)}&boolean=true`);
        const txData = await txResponse.json();
        
        for (const tx of txData.result?.transactions || []) {
          const valueWei = parseInt(tx.value, 16);
          const valueBnb = valueWei / 1e18;
          const valueUsd = valueBnb * prices.BNB;
          
          if (valueUsd >= 1000 && valueBnb > 0) {
            setTransactions(prev => ({
              ...prev,
              BNB: {
                id: tx.hash,
                hash: tx.hash,
                from: tx.from.substring(0, 10) + '...',
                to: tx.to?.substring(0, 10) + '...' || 'Contract',
                amount: valueBnb.toFixed(4),
                usdValue: Math.floor(valueUsd).toLocaleString(),
                explorerUrl: `https://bscscan.com/tx/${tx.hash}`,
                crypto: 'BNB',
              }
            }));
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching BNB:', error);
      }
    };

    fetchBNB();
    const interval = setInterval(fetchBNB, 11000);
    return () => clearInterval(interval);
  }, [prices.BNB]);

  // Fetch XRP transactions
  useEffect(() => {
    if (!prices.XRP) return;

    const fetchXRP = async () => {
      try {
        const response = await fetch('https://s1.ripple.com:51234/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            method: 'ledger',
            params: [{
              ledger_index: 'validated',
              transactions: true,
              expand: true
            }]
          })
        });
        const data = await response.json();
        
        for (const tx of data.result?.ledger?.transactions || []) {
          if (tx.Amount && typeof tx.Amount === 'string') {
            const amount = parseInt(tx.Amount) / 1000000;
            const valueUsd = amount * prices.XRP;
            
            if (valueUsd >= 1000) {
              setTransactions(prev => ({
                ...prev,
                XRP: {
                  id: tx.hash,
                  hash: tx.hash,
                  from: tx.Account?.substring(0, 10) + '...' || 'Unknown',
                  to: tx.Destination?.substring(0, 10) + '...' || 'Unknown',
                  amount: amount.toFixed(2),
                  usdValue: Math.floor(valueUsd).toLocaleString(),
                  explorerUrl: `https://xrpscan.com/tx/${tx.hash}`,
                  crypto: 'XRP',
                }
              }));
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching XRP:', error);
      }
    };

    fetchXRP();
    const interval = setInterval(fetchXRP, 12000);
    return () => clearInterval(interval);
  }, [prices.XRP]);



  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full space-y-1">
        <AnimatePresence mode="popLayout">
          {['BTC', 'ETH', 'LINK', 'BNB', 'XRP'].map((crypto) => {
            const tx = transactions[crypto];
            if (!tx) return null;
            
            return (
              <motion.a
                key={crypto}
                href={tx.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 hover:border-purple-500/40' 
                    : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10 hover:border-[#244270]/30'
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
                
                <div className="flex flex-col items-end">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`font-mono text-[8px] font-bold whitespace-nowrap ${cryptoColors[crypto]}`}
                  >
                    {tx.amount} {crypto}
                  </motion.span>
                  <span className={`text-[7px] ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    ${tx.usdValue}
                  </span>
                </div>
              </motion.a>
            );
          })}
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
    </div>
  );
}