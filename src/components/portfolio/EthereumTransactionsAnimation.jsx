import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function EthereumTransactionsAnimation({ isDark }) {
  const [transactions, setTransactions] = useState([]);
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0 });

  const cryptoColors = {
    BTC: isDark ? 'text-orange-400' : 'text-orange-600',
    ETH: isDark ? 'text-purple-400' : 'text-purple-600',
  };

  // Fetch current crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        setPrices({
          BTC: data.bitcoin?.usd || 43000,
          ETH: data.ethereum?.usd || 2300,
        });
      } catch (error) {
        setPrices({ BTC: 43000, ETH: 2300 });
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real blockchain transactions over $50k
  useEffect(() => {
    if (prices.BTC === 0 || prices.ETH === 0) return;

    const fetchTransactions = async () => {
      const largeTransactions = [];

      try {
        // Fetch recent Ethereum blocks
        const ethResponse = await fetch('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber');
        const ethBlockData = await ethResponse.json();
        const latestBlock = parseInt(ethBlockData.result, 16);
        
        const blockResponse = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${latestBlock.toString(16)}&boolean=true`);
        const blockData = await blockResponse.json();
        
        blockData.result?.transactions?.forEach(tx => {
          const valueWei = parseInt(tx.value, 16);
          const valueEth = valueWei / 1e18;
          const valueUsd = valueEth * prices.ETH;
          
          if (valueUsd >= 50000 && valueEth > 0) {
            largeTransactions.push({
              id: tx.hash,
              hash: tx.hash,
              from: tx.from.substring(0, 10) + '...',
              to: tx.to?.substring(0, 10) + '...' || 'Contract',
              amount: valueEth.toFixed(4),
              usdValue: Math.floor(valueUsd).toLocaleString(),
              crypto: 'ETH',
              explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
            });
          }
        });
      } catch (error) {
        console.error('Error fetching ETH transactions:', error);
      }

      try {
        // Fetch Bitcoin mempool transactions
        const btcResponse = await fetch('https://blockchain.info/unconfirmed-transactions?format=json');
        const btcData = await btcResponse.json();
        
        btcData.txs?.slice(0, 20).forEach(tx => {
          const valueSat = tx.out.reduce((sum, out) => sum + out.value, 0);
          const valueBtc = valueSat / 1e8;
          const valueUsd = valueBtc * prices.BTC;
          
          if (valueUsd >= 50000 && valueBtc > 0) {
            largeTransactions.push({
              id: tx.hash,
              hash: tx.hash,
              from: tx.inputs[0]?.prev_out?.addr?.substring(0, 10) + '...' || 'Unknown',
              to: tx.out[0]?.addr?.substring(0, 10) + '...' || 'Multiple',
              amount: valueBtc.toFixed(4),
              usdValue: Math.floor(valueUsd).toLocaleString(),
              crypto: 'BTC',
              explorerUrl: `https://blockchain.info/tx/${tx.hash}`,
            });
          }
        });
      } catch (error) {
        console.error('Error fetching BTC transactions:', error);
      }

      if (largeTransactions.length > 0) {
        setTransactions(largeTransactions.slice(0, 5));
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 15000);
    return () => clearInterval(interval);
  }, [prices]);

  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center">
      <div className="w-full space-y-1.5 px-2">
        <AnimatePresence mode="popLayout">
          {transactions.map((tx) => (
            <motion.a
              key={tx.id}
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
                  className={`font-mono text-[8px] font-bold whitespace-nowrap ${cryptoColors[tx.crypto]}`}
                >
                  {tx.amount} {tx.crypto}
                </motion.span>
                <span className={`text-[7px] ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  ${tx.usdValue}
                </span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}