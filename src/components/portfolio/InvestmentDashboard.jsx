import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, X } from 'lucide-react';

export default function InvestmentDashboard({ isDark, data }) {
  const [drilldownYear, setDrilldownYear] = useState(null);
  const { finalValue, totalContributions, totalInterest, yearlyData } = data;

  const portfolioBreakdown = [
    { name: 'Contributions', value: totalContributions, color: isDark ? '#8b5cf6' : '#244270' },
    { name: 'Interest Earned', value: totalInterest, color: isDark ? '#06b6d4' : '#4dbdce' },
  ];

  const monthlyBreakdown = drilldownYear
    ? Array.from({ length: 12 }, (_, i) => {
        const monthData = yearlyData[drilldownYear - 1];
        const monthlyInterest = monthData.interest / 12;
        return {
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          interest: Math.round(monthlyInterest),
        };
      })
    : [];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20' 
              : 'bg-gradient-to-br from-[#244270]/10 to-[#244270]/5 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              Final Value
            </p>
            <TrendingUp className={isDark ? 'text-purple-400' : 'text-[#244270]'} size={20} />
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            {formatCurrency(finalValue)}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20' 
              : 'bg-gradient-to-br from-[#4dbdce]/10 to-[#4dbdce]/5 border border-[#4dbdce]/10'
          } backdrop-blur-xl`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              Total Contributions
            </p>
            <BarChart3 className={isDark ? 'text-cyan-400' : 'text-[#4dbdce]'} size={20} />
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            {formatCurrency(totalContributions)}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20' 
              : 'bg-gradient-to-br from-blue-400/10 to-blue-400/5 border border-blue-400/10'
          } backdrop-blur-xl`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              Interest Earned
            </p>
            <PieChartIcon className={isDark ? 'text-blue-400' : 'text-blue-600'} size={20} />
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            {formatCurrency(totalInterest)}
          </p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Investment Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Investment Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yearlyData}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#8b5cf6' : '#244270'} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={isDark ? '#8b5cf6' : '#244270'} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="contributionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#06b6d4' : '#4dbdce'} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={isDark ? '#06b6d4' : '#4dbdce'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff20' : '#00000020'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? '#ffffff60' : '#00000060'}
                label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: isDark ? '#ffffff80' : '#00000080' }}
              />
              <YAxis 
                stroke={isDark ? '#ffffff60' : '#00000060'}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
                  border: `1px solid ${isDark ? '#8b5cf6' : '#244270'}`,
                  borderRadius: '12px',
                  color: isDark ? '#ffffff' : '#000000',
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke={isDark ? '#8b5cf6' : '#244270'}
                fillOpacity={1} 
                fill="url(#totalGradient)"
                name="Total Value"
              />
              <Area 
                type="monotone" 
                dataKey="contributions" 
                stroke={isDark ? '#06b6d4' : '#4dbdce'}
                fillOpacity={1} 
                fill="url(#contributionsGradient)"
                name="Contributions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Portfolio Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Portfolio Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {portfolioBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
                  border: `1px solid ${isDark ? '#8b5cf6' : '#244270'}`,
                  borderRadius: '12px',
                  color: isDark ? '#ffffff' : '#000000',
                }}
                formatter={(value) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Annual Interest Earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Investment Insights
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData} onClick={(e) => e?.activeLabel && setDrilldownYear(parseInt(e.activeLabel))}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff20' : '#00000020'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? '#ffffff60' : '#00000060'}
                label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: isDark ? '#ffffff80' : '#00000080' }}
              />
              <YAxis 
                stroke={isDark ? '#ffffff60' : '#00000060'}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
                  border: `1px solid ${isDark ? '#8b5cf6' : '#244270'}`,
                  borderRadius: '12px',
                  color: isDark ? '#ffffff' : '#000000',
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="interest" fill={isDark ? '#3b82f6' : '#4f9bce'} name="Annual Interest" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Drilldown Modal */}
      {drilldownYear && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrilldownYear(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-4xl p-8 rounded-2xl ${
              isDark 
                ? 'bg-[#1a1a2e] border border-purple-500/30' 
                : 'bg-white border border-[#244270]/20'
            } backdrop-blur-xl shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                Year {drilldownYear} - Monthly Breakdown
              </h3>
              <button
                onClick={() => setDrilldownYear(null)}
                className={`p-2 rounded-xl ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                } transition-colors`}
              >
                <X className={isDark ? 'text-white' : 'text-[#141225]'} size={24} />
              </button>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff20' : '#00000020'} />
                <XAxis dataKey="month" stroke={isDark ? '#ffffff60' : '#00000060'} />
                <YAxis 
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
                    border: `1px solid ${isDark ? '#8b5cf6' : '#244270'}`,
                    borderRadius: '12px',
                    color: isDark ? '#ffffff' : '#000000',
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Bar dataKey="interest" fill={isDark ? '#8b5cf6' : '#244270'} name="Monthly Interest" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}