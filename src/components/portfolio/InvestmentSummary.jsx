import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function InvestmentSummary({ isDark, data, currency }) {
  if (!data || !data.futureValue) return null;

  const formatCurrency = (value) => {
    return `${currency.symbol}${value.toLocaleString()}`;
  };

  const pieData = [
    { name: 'Invested', value: data.totalContributions, color: isDark ? '#06b6d4' : '#0891b2' },
    { name: 'Gains', value: data.totalInterest, color: isDark ? '#10b981' : '#059669' },
    { name: 'Tax', value: data.taxAmount, color: isDark ? '#ef4444' : '#dc2626' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' 
          : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'
      }`}
    >
      <h4 className={`text-lg font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-[#141225]'}`}>
        Investment Summary
      </h4>
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Future Value</p>
          <p className={`text-base md:text-lg font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'} break-words`}>
            {formatCurrency(data.futureValue)}
          </p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Total Invested</p>
          <p className={`text-base md:text-lg font-bold ${isDark ? 'text-cyan-400' : 'text-[#4dbdce]'} break-words`}>
            {formatCurrency(data.totalContributions)}
          </p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Gains</p>
          <p className={`text-base md:text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} break-words`}>
            {formatCurrency(data.totalInterest)}
          </p>
        </div>
        <div>
          <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Tax</p>
          <p className={`text-base md:text-lg font-bold ${isDark ? 'text-red-400' : 'text-red-600'} break-words`}>
            -{formatCurrency(data.taxAmount)}
          </p>
        </div>
      </div>
      
      <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
        <p className={`text-sm text-center ${isDark ? 'text-white/60' : 'text-[#141225]/60'} mb-2`}>
          💎 Net Value After Tax
        </p>
        <p className={`text-2xl md:text-3xl font-bold text-center ${isDark ? 'text-green-400' : 'text-green-600'} break-words`}>
          {formatCurrency(data.netFutureValue)}
        </p>
        <p className={`text-xs text-center mt-2 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
          ROI: {data.totalContributions > 0 ? ((data.netFutureValue / data.totalContributions - 1) * 100).toFixed(1) : '0'}%
        </p>
      </div>

      {/* Pie Chart */}
      <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
        <h5 className={`text-sm font-medium mb-4 text-center ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Portfolio Breakdown
        </h5>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="65%"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  fontSize: '13px',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
              <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}