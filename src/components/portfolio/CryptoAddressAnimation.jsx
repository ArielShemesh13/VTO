import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    BTC: { hash: generateRandomHash('BTC'), explorerUrl: '#', crypto: 'BTC' },
    ETH: { hash: generateRandomHash('ETH'), explorerUrl: '#', crypto: 'ETH' },
    LINK: { hash: generateRandomHash('LINK'), explorerUrl: '#', crypto: 'LINK' },
    BNB: { hash: generateRandomHash('BNB'), explorerUrl: '#', crypto: 'BNB' },
    XRP: { hash: generateRandomHash('XRP'), explorerUrl: '#', crypto: 'XRP' },
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
          
          if (valueUsd >= 20000 && valueBtc > 0) {
            setTransactions(prev => ({
              ...prev,
              BTC: {
                id: tx.hash,
                hash: tx.hash,
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
          
          if (valueUsd >= 20000 && valueEth > 0) {
            setTransactions(prev => ({
              ...prev,
              ETH: {
                id: tx.hash,
                hash: tx.hash,
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
          
          if (valueUsd >= 20000) {
            setTransactions(prev => ({
              ...prev,
              LINK: {
                id: tx.hash,
                hash: tx.hash,
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
          
          if (valueUsd >= 20000 && valueBnb > 0) {
            setTransactions(prev => ({
              ...prev,
              BNB: {
                id: tx.hash,
                hash: tx.hash,
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
            
            if (valueUsd >= 20000) {
              setTransactions(prev => ({
                ...prev,
                XRP: {
                  id: tx.hash,
                  hash: tx.hash,
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
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`font-mono text-[7px] px-2 py-1.5 rounded flex items-center gap-2 cursor-pointer hover:scale-[1.02] transition-all ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 hover:border-purple-500/40' 
                    : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10 hover:border-[#244270]/30'
                } overflow-hidden`}
              >
                <span className={`font-bold ${cryptoColors[crypto]}`}>
                  {crypto}
                </span>
                <motion.div
                  className="truncate flex-1"
                  animate={{ 
                    textShadow: [
                      '0 0 0px rgba(139, 92, 246, 0)',
                      `0 0 8px ${cryptoColors[crypto].includes('orange') ? 'rgba(251, 146, 60, 0.6)' : 
                        cryptoColors[crypto].includes('purple') ? 'rgba(168, 85, 247, 0.6)' :
                        cryptoColors[crypto].includes('indigo') ? 'rgba(129, 140, 248, 0.6)' :
                        cryptoColors[crypto].includes('yellow') ? 'rgba(250, 204, 21, 0.6)' :
                        'rgba(96, 165, 250, 0.6)'}`,
                      '0 0 0px rgba(139, 92, 246, 0)'
                    ]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                >
                  <span className={isDark ? 'text-purple-300' : 'text-[#244270]'}>
                    {tx.hash}
                  </span>
                </motion.div>
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