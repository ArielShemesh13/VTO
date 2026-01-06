import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';

export default function CompoundInterestCalculator({ isDark, onCalculate }) {
  const [formData, setFormData] = useState({
    principal: 10000,
    monthlyContribution: 500,
    annualRate: 7,
    years: 10,
    compoundFrequency: 12,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculateResults = () => {
    const { principal, monthlyContribution, annualRate, years, compoundFrequency } = formData;
    const rate = annualRate / 100;
    const periods = years * compoundFrequency;
    const ratePerPeriod = rate / compoundFrequency;
    const contributionPerPeriod = monthlyContribution * (12 / compoundFrequency);

    let yearlyData = [];
    let currentValue = principal;
    let totalContributions = principal;

    for (let year = 1; year <= years; year++) {
      for (let period = 1; period <= compoundFrequency; period++) {
        currentValue = currentValue * (1 + ratePerPeriod) + contributionPerPeriod;
        totalContributions += contributionPerPeriod;
      }
      
      const interestEarned = currentValue - totalContributions;
      yearlyData.push({
        year,
        total: Math.round(currentValue),
        contributions: Math.round(totalContributions),
        interest: Math.round(interestEarned),
      });
    }

    const finalValue = currentValue;
    const totalInterest = finalValue - totalContributions;

    onCalculate({
      finalValue: Math.round(finalValue),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest),
      yearlyData,
      formData,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-8 rounded-2xl ${
        isDark 
          ? 'bg-black/40 border border-purple-500/20' 
          : 'bg-white/60 border border-[#244270]/10'
      } backdrop-blur-xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${
          isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'
        }`}>
          <Calculator className={isDark ? 'text-purple-400' : 'text-[#244270]'} size={24} />
        </div>
        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
          Compound Interest Calculator
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label className={`block mb-2 text-sm font-medium ${
            isDark ? 'text-white/80' : 'text-[#141225]/80'
          }`}>
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={formData.principal}
            onChange={(e) => handleChange('principal', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white' 
                : 'bg-white border border-[#244270]/20 text-[#141225]'
            } focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-purple-500' : 'focus:ring-[#244270]'
            }`}
          />
        </div>

        <div>
          <label className={`block mb-2 text-sm font-medium ${
            isDark ? 'text-white/80' : 'text-[#141225]/80'
          }`}>
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            value={formData.monthlyContribution}
            onChange={(e) => handleChange('monthlyContribution', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white' 
                : 'bg-white border border-[#244270]/20 text-[#141225]'
            } focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-purple-500' : 'focus:ring-[#244270]'
            }`}
          />
        </div>

        <div>
          <label className={`block mb-2 text-sm font-medium ${
            isDark ? 'text-white/80' : 'text-[#141225]/80'
          }`}>
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.annualRate}
            onChange={(e) => handleChange('annualRate', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white' 
                : 'bg-white border border-[#244270]/20 text-[#141225]'
            } focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-purple-500' : 'focus:ring-[#244270]'
            }`}
          />
        </div>

        <div>
          <label className={`block mb-2 text-sm font-medium ${
            isDark ? 'text-white/80' : 'text-[#141225]/80'
          }`}>
            Investment Period (Years)
          </label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => handleChange('years', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white' 
                : 'bg-white border border-[#244270]/20 text-[#141225]'
            } focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-purple-500' : 'focus:ring-[#244270]'
            }`}
          />
        </div>

        <div>
          <label className={`block mb-2 text-sm font-medium ${
            isDark ? 'text-white/80' : 'text-[#141225]/80'
          }`}>
            Compound Frequency
          </label>
          <select
            value={formData.compoundFrequency}
            onChange={(e) => handleChange('compoundFrequency', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl ${
              isDark 
                ? 'bg-white/5 border border-white/10 text-white' 
                : 'bg-white border border-[#244270]/20 text-[#141225]'
            } focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-purple-500' : 'focus:ring-[#244270]'
            }`}
          >
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <div className="flex items-end">
          <motion.button
            onClick={calculateResults}
            className={`w-full px-6 py-3 rounded-xl font-semibold text-white ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600' 
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] hover:from-[#1a3255] hover:to-[#3da8b8]'
            } transition-all duration-300 flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp size={20} />
            Calculate
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}