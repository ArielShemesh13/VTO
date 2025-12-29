import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PiggyBank, Percent, Target } from 'lucide-react';

export default function InvestmentDashboard({ isDark, data }) {
  if (!data || !data.yearlyData) return null;

  const { futureValue, totalContributions, totalInterest, taxAmount, netFutureValue, yearlyData, currency } = data;

  const formatCurrency = (value) => {
    return `${currency?.symbol || '$'}${value?.toLocaleString() || 0}`;
  };

  const pieData = [
    { name: 'Invested', value: totalContributions, color: isDark ? '#06b6d4' : '#0891b2' },
    { name: 'Gains', value: totalInterest, color: isDark ? '#10b981' : '#059669' },
    { name: 'Tax', value: taxAmount, color: isDark ? '#ef4444' : '#dc2626' },
  ];

  const roi = totalContributions > 0 ? ((netFutureValue / totalContributions - 1) * 100).toFixed(1) : 0;

  const stats = [
    { icon: Target, label: 'Net Value', value: formatCurrency(netFutureValue), color: isDark ? 'text-green-400' : 'text-green-600' },
    { icon: PiggyBank, label: 'Total Invested', value: formatCurrency(totalContributions), color: isDark ? 'text-cyan-400' : 'text-[#4dbdce]' },
    { icon: TrendingUp, label: 'Gains', value: formatCurrency(totalInterest), color: isDark ? 'text-emerald-400' : 'text-emerald-600' },
    { icon: Percent, label: 'Tax Paid', value: formatCurrency(taxAmount), color: isDark ? 'text-red-400' : 'text-red-600' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl ${isDark ? 'bg-[#141225] border border-purple-500/30' : 'bg-white border border-[#244270]/20'} shadow-xl`}>
          <p className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#141225]'}`}>Year {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-black/40 border border-purple-500/20' 
          : 'bg-white/60 border border-[#244270]/10'
      } backdrop-blur-xl`}
      >
      {/* Growth Chart - Full Width */}
      <div className="mb-8">
        <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Investment Growth Over Time
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#a855f7' : '#244270'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isDark ? '#a855f7' : '#244270'} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: 12 }}
              />
              <YAxis 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: 11 }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${currency?.symbol || '$'}${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${currency?.symbol || '$'}${(value / 1000).toFixed(0)}k`;
                  return `${currency?.symbol || '$'}${value}`;
                }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="totalValue" 
                stroke={isDark ? '#a855f7' : '#244270'} 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                name="Gross Value"
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="netValue" 
                stroke={isDark ? '#10b981' : '#059669'} 
                fillOpacity={1} 
                fill="url(#colorNet)" 
                name="Net Value (After Tax)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Annual Interest Growth */}
      <div className="mt-8">
        <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Annual Interest Earned
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData.slice(1)}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: 12 }}
              />
              <YAxis 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: 11 }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${currency?.symbol || '$'}${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${currency?.symbol || '$'}${(value / 1000).toFixed(0)}k`;
                  return `${currency?.symbol || '$'}${value}`;
                }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="interest" 
                fill={isDark ? '#a855f7' : '#244270'} 
                name="Interest Earned"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </motion.div>
  );
}