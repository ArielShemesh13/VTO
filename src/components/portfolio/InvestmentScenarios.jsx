import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function InvestmentScenarios({ isDark }) {
  const [selectedScenario, setSelectedScenario] = useState('conservative');

  const scenarios = useMemo(() => ({
    conservative: {
      name: 'Conservative',
      initial: 10000,
      monthly: 500,
      rate: 5,
      years: 10,
      color: isDark ? '#10b981' : '#059669',
      icon: Target,
      description: 'Low risk, steady growth',
    },
    moderate: {
      name: 'Moderate',
      initial: 10000,
      monthly: 500,
      rate: 8,
      years: 10,
      color: isDark ? '#06b6d4' : '#0891b2',
      icon: TrendingUp,
      description: 'Balanced risk and reward',
    },
    aggressive: {
      name: 'Aggressive',
      initial: 10000,
      monthly: 500,
      rate: 12,
      years: 10,
      color: isDark ? '#a855f7' : '#7c3aed',
      icon: TrendingUp,
      description: 'High risk, high potential',
    },
  }), [isDark]);

  const calculateScenario = (scenario) => {
    const { initial, monthly, rate, years } = scenario;
    const r = rate / 100;
    const n = 12;
    const t = years;

    const yearlyData = [];
    let totalInvested = initial;
    
    for (let year = 1; year <= t; year++) {
      const fvPrincipal = initial * Math.pow(1 + r / n, n * year);
      const months = year * 12;
      const monthlyRate = r / 12;
      const fvContributions = months > 0 ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : 0;
      const totalValue = fvPrincipal + fvContributions;
      totalInvested = initial + monthly * months;
      const profit = totalValue - totalInvested;
      const roi = ((totalValue / totalInvested - 1) * 100);

      yearlyData.push({
        year,
        invested: Math.round(totalInvested),
        value: Math.round(totalValue),
        profit: Math.round(profit),
        roi: roi.toFixed(1),
      });
    }

    const finalData = yearlyData[yearlyData.length - 1];
    return {
      yearlyData,
      totalInvested: finalData.invested,
      finalValue: finalData.value,
      totalProfit: finalData.profit,
      roi: finalData.roi,
    };
  };

  const currentScenario = scenarios[selectedScenario];
  const calculatedData = calculateScenario(currentScenario);

  const allScenariosComparison = useMemo(() => {
    const years = 10;
    const data = [];
    
    for (let year = 1; year <= years; year++) {
      const yearData = { year };
      
      Object.keys(scenarios).forEach(key => {
        const scenario = scenarios[key];
        const result = calculateScenario({ ...scenario, years: year });
        yearData[key] = result.finalValue;
      });
      
      data.push(yearData);
    }
    
    return data;
  }, [scenarios]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl ${
          isDark ? 'bg-[#141225] border border-purple-500/30' : 'bg-white border border-[#244270]/20'
        } shadow-xl`}>
          <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value?.toLocaleString()}
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
      className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-black/40 border border-purple-500/20' 
          : 'bg-white/60 border border-[#244270]/10'
      } backdrop-blur-xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'}`}>
          <Target className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Investment Scenarios
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
            Compare different investment strategies
          </p>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.keys(scenarios).map((key) => {
          const scenario = scenarios[key];
          const Icon = scenario.icon;
          const isSelected = selectedScenario === key;
          
          return (
            <motion.button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`p-4 rounded-xl transition-all ${
                isSelected
                  ? isDark
                    ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/50'
                    : 'bg-gradient-to-br from-[#244270]/10 to-[#4dbdce]/10 border-2 border-[#244270]/50'
                  : isDark
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-[#244270]/5 border border-[#244270]/10 hover:bg-[#244270]/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-6 h-6 mb-2 ${isDark ? 'text-white' : 'text-[#141225]'}`} style={{ color: isSelected ? scenario.color : undefined }} />
              <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                {scenario.name}
              </p>
              <p className={`text-xs ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                {scenario.rate}% annual return
              </p>
              <p className={`text-[10px] mt-1 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
                {scenario.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Current Scenario Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>Total Invested</p>
          </div>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            ${calculatedData.totalInvested.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Final Value</p>
          </div>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            ${calculatedData.finalValue.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <p className={`text-xs ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Total Profit</p>
          </div>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            ${calculatedData.totalProfit.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Percent className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <p className={`text-xs ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>ROI</p>
          </div>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            {calculatedData.roi}%
          </p>
        </motion.div>
      </div>

      {/* Scenario Growth Chart */}
      <div className="mb-8">
        <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          {currentScenario.name} Scenario Growth
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculatedData.yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              />
              <YAxis 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="invested" fill={isDark ? '#ef4444' : '#dc2626'} radius={[4, 4, 0, 0]} name="Invested" />
              <Bar dataKey="value" fill={currentScenario.color} radius={[4, 4, 0, 0]} name="Total Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Chart */}
      <div>
        <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Compare All Scenarios
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={allScenariosComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              />
              <YAxis 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="conservative" 
                stroke={scenarios.conservative.color} 
                strokeWidth={3}
                name="Conservative"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="moderate" 
                stroke={scenarios.moderate.color} 
                strokeWidth={3}
                name="Moderate"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="aggressive" 
                stroke={scenarios.aggressive.color} 
                strokeWidth={3}
                name="Aggressive"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
          isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
        }`}
      >
        <AlertCircle className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
        <p className={`text-xs ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
          These scenarios are for educational purposes. All investments involve risk. 
          Past performance does not guarantee future results. Consider consulting a financial advisor.
        </p>
      </motion.div>
    </motion.div>
  );
}