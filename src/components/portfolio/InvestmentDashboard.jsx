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

  // Calculate scenario data with ±5% rate changes
  const calculateScenario = (rateAdjustment) => {
    const adjustedRate = data.calculatedField === 'rate' 
      ? parseFloat(data.calculatedValue) + rateAdjustment 
      : (yearlyData.length > 1 ? ((yearlyData[yearlyData.length - 1].totalValue / totalContributions) ** (1 / (yearlyData.length - 1)) - 1) * 100 + rateAdjustment : 0);
    
    const years = yearlyData.length - 1;
    const r = adjustedRate / 100;
    const monthlyContribution = yearlyData.length > 1 ? (totalContributions - yearlyData[0].contributions) / (12 * years) : 0;
    const principal = yearlyData[0]?.contributions || totalContributions;
    
    const n = 12; // monthly compounding
    const periodRate = r / n;
    const totalPeriods = n * years;
    const contributionPerPeriod = monthlyContribution;
    
    const fvPrincipal = principal * Math.pow(1 + periodRate, totalPeriods);
    const fvContributions = monthlyContribution > 0 
      ? contributionPerPeriod * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate) * n
      : 0;
    
    return Math.round(fvPrincipal + fvContributions);
  };

  const scenarioLower = calculateScenario(-5);
  const scenarioCurrent = futureValue;
  const scenarioHigher = calculateScenario(5);

  const scenarioData = [
    { name: '-5%', value: scenarioLower, fill: isDark ? '#ef4444' : '#dc2626' },
    { name: 'Current', value: scenarioCurrent, fill: isDark ? '#a855f7' : '#244270' },
    { name: '+5%', value: scenarioHigher, fill: isDark ? '#10b981' : '#059669' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Layout: Growth Chart + Summary Side by Side */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-black/40 border border-purple-500/20' 
          : 'bg-white/60 border border-[#244270]/10'
      } backdrop-blur-xl`}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Growth Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
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

          {/* Investment Summary - Takes 1 column */}
          <div className="flex flex-col justify-center">
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              Investment Summary
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-[#244270]/5 border border-[#244270]/10'}`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Future Value</p>
                <p className={`text-xl font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
                  {formatCurrency(futureValue)}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-[#4dbdce]/5 border border-[#4dbdce]/10'}`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Total Invested</p>
                <p className={`text-xl font-bold ${isDark ? 'text-cyan-400' : 'text-[#4dbdce]'}`}>
                  {formatCurrency(totalContributions)}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Gains</p>
                <p className={`text-xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {formatCurrency(totalInterest)}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Tax</p>
                <p className={`text-xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  -{formatCurrency(taxAmount)}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-300'}`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>💎 Net Value After Tax</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {formatCurrency(netFutureValue)}
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
                  ROI: {roi}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Pie Chart + Bar Chart + Scenarios */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            Portfolio Breakdown
          </h4>
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
        </motion.div>

        {/* Annual Interest Earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            Annual Interest Earned
          </h4>
          <div className="h-64">
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
        </motion.div>

        {/* Rate Scenarios: -5% / Current / +5% */}
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
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            Rate Impact Scenarios
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                <XAxis 
                  dataKey="name" 
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
                  dataKey="value" 
                  name="Future Value"
                  radius={[6, 6, 0, 0]}
                >
                  {scenarioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className={isDark ? 'text-red-400' : 'text-red-600'}>-5% Rate:</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>{formatCurrency(scenarioLower)}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-purple-400' : 'text-[#244270]'}>Current:</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>{formatCurrency(scenarioCurrent)}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-green-400' : 'text-green-600'}>+5% Rate:</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>{formatCurrency(scenarioHigher)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}