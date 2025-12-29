import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PiggyBank, Percent, Target } from 'lucide-react';

export default function InvestmentDashboard({ isDark, data }) {
  if (!data || !data.yearlyData) return null;

  const { futureValue, totalContributions, totalInterest, yearlyData, currency } = data;

  const formatCurrency = (value) => {
    return `${currency?.symbol || '$'}${value?.toLocaleString() || 0}`;
  };

  const pieData = [
    { name: 'Principal + Contributions', value: totalContributions, color: isDark ? '#06b6d4' : '#244270' },
    { name: 'Interest Earned', value: totalInterest, color: isDark ? '#a855f7' : '#4dbdce' },
  ];

  const roi = totalContributions > 0 ? ((totalInterest / totalContributions) * 100).toFixed(1) : 0;

  const stats = [
    { icon: Target, label: 'Future Value', value: formatCurrency(futureValue), color: isDark ? 'text-purple-400' : 'text-[#244270]' },
    { icon: PiggyBank, label: 'Total Invested', value: formatCurrency(totalContributions), color: isDark ? 'text-cyan-400' : 'text-[#4dbdce]' },
    { icon: TrendingUp, label: 'Interest Earned', value: formatCurrency(totalInterest), color: isDark ? 'text-emerald-400' : 'text-emerald-600' },
    { icon: Percent, label: 'Total ROI', value: `${roi}%`, color: isDark ? 'text-amber-400' : 'text-amber-600' },
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
      <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
        Investment Dashboard
      </h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-[#244270]/5 border border-[#244270]/10'}`}
          >
            <stat.icon className={`w-5 h-5 mb-2 ${stat.color}`} />
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="md:col-span-2">
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            Investment Growth Over Time
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#a855f7' : '#244270'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isDark ? '#a855f7' : '#244270'} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#06b6d4' : '#4dbdce'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isDark ? '#06b6d4' : '#4dbdce'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                <XAxis 
                  dataKey="year" 
                  stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 
                  tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                />
                <YAxis 
                  stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 
                  tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                  tickFormatter={(value) => `${currency?.symbol || '$'}${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke={isDark ? '#a855f7' : '#244270'} 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  name="Total Value"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="contributions" 
                  stroke={isDark ? '#06b6d4' : '#4dbdce'} 
                  fillOpacity={1} 
                  fill="url(#colorContributions)" 
                  name="Contributions"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div>
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            Portfolio Breakdown
          </h4>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className={isDark ? 'text-white/70' : 'text-[#141225]/70'}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="mt-8">
        <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Annual Interest Earned
        </h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData.slice(1)}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              />
              <YAxis 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                tickFormatter={(value) => `${currency?.symbol || '$'}${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="interest" 
                fill={isDark ? '#a855f7' : '#244270'} 
                name="Interest Earned"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}