import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

const compoundFrequencies = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' },
];

export default function CompoundInterestCalculator({ isDark, onCalculate }) {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(10);
  const [currency, setCurrency] = useState(currencies[0]);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [capitalGainsTax, setCapitalGainsTax] = useState(25);

  const results = useMemo(() => {
    const r = annualRate / 100;
    const n = compoundFrequency;
    const t = years;
    const P = principal;
    const PMT = monthlyContribution;

    // Future Value of Principal
    const futureValuePrincipal = P * Math.pow(1 + r / n, n * t);

    // Future Value of Monthly Contributions (annuity)
    const monthlyRate = r / 12;
    const totalMonths = t * 12;
    const futureValueContributions = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    const totalFutureValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = P + PMT * totalMonths;
    const totalInterest = totalFutureValue - totalContributions;

    // חישוב מס רווחי הון
    const taxAmount = (totalInterest * capitalGainsTax) / 100;
    const netFutureValue = totalFutureValue - taxAmount;

    // Generate yearly data for chart
    const yearlyData = [];
    for (let year = 0; year <= t; year++) {
      const fvPrincipal = P * Math.pow(1 + r / n, n * year);
      const months = year * 12;
      const fvContributions = months > 0 ? PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : 0;
      const total = fvPrincipal + fvContributions;
      const contributions = P + PMT * months;
      const interest = total - contributions;
      const yearTax = (interest * capitalGainsTax) / 100;
      const netValue = total - yearTax;
      
      yearlyData.push({
        year,
        totalValue: Math.round(total),
        contributions: Math.round(contributions),
        interest: Math.round(interest),
        tax: Math.round(yearTax),
        netValue: Math.round(netValue),
      });
    }

    return {
      futureValue: Math.round(totalFutureValue),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest),
      taxAmount: Math.round(taxAmount),
      netFutureValue: Math.round(netFutureValue),
      yearlyData,
    };
  }, [principal, monthlyContribution, annualRate, years, compoundFrequency, capitalGainsTax]);

  React.useEffect(() => {
    onCalculate({ ...results, currency });
  }, [results, currency, onCalculate]);

  const formatCurrency = (value) => {
    return `${currency.symbol}${value.toLocaleString()}`;
  };

  const inputClass = `w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ${
    isDark 
      ? 'bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:border-purple-500/50 focus:bg-white/10' 
      : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] placeholder-[#141225]/30 focus:border-[#244270]/30 focus:bg-[#244270]/10'
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`;

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
          <Calculator className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
        </div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
          Compound Interest Calculator
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Currency Selection */}
        <div>
          <label className={labelClass}>
            <DollarSign className="inline w-4 h-4 mr-1" />
            Currency
          </label>
          <select
            value={currency.code}
            onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value))}
            className={inputClass}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code} className="bg-gray-900">
                {c.symbol} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Initial Investment */}
        <div>
          <label className={labelClass}>
            Initial Investment
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className={inputClass}
            min="0"
          />
        </div>

        {/* Monthly Contribution */}
        <div>
          <label className={labelClass}>
            Monthly Contribution
          </label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className={inputClass}
            min="0"
          />
        </div>

        {/* Annual Interest Rate */}
        <div>
          <label className={labelClass}>
            <Percent className="inline w-4 h-4 mr-1" />
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className={inputClass}
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Investment Period */}
        <div>
          <label className={labelClass}>
            <Calendar className="inline w-4 h-4 mr-1" />
            Investment Period (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className={inputClass}
            min="1"
            max="50"
          />
        </div>

        {/* Compound Frequency */}
        <div>
          <label className={labelClass}>
            <TrendingUp className="inline w-4 h-4 mr-1" />
            Compound Frequency
          </label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(Number(e.target.value))}
            className={inputClass}
          >
            {compoundFrequencies.map((freq) => (
              <option key={freq.value} value={freq.value} className="bg-gray-900">
                {freq.label}
              </option>
            ))}
          </select>
        </div>

        {/* Capital Gains Tax */}
        <div>
          <label className={labelClass}>
            💰 מס רווחי הון (%)
          </label>
          <input
            type="number"
            value={capitalGainsTax}
            onChange={(e) => setCapitalGainsTax(Number(e.target.value))}
            className={inputClass}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className={`mt-8 p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>שווי ברוטו</p>
            <p className={`text-xl font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
              {formatCurrency(results.futureValue)}
            </p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>סה"כ הושקע</p>
            <p className={`text-xl font-bold ${isDark ? 'text-cyan-400' : 'text-[#4dbdce]'}`}>
              {formatCurrency(results.totalContributions)}
            </p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>רווחים</p>
            <p className={`text-xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {formatCurrency(results.totalInterest)}
            </p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>מס ({capitalGainsTax}%)</p>
            <p className={`text-xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              -{formatCurrency(results.taxAmount)}
            </p>
          </div>
        </div>
        
        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
          <p className={`text-sm text-center ${isDark ? 'text-white/60' : 'text-[#141225]/60'} mb-2`}>
            💎 שווי נטו אחרי מס
          </p>
          <p className={`text-3xl font-bold text-center ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {formatCurrency(results.netFutureValue)}
          </p>
          <p className={`text-xs text-center mt-1 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            ROI: {results.totalContributions > 0 ? ((results.netFutureValue / results.totalContributions - 1) * 100).toFixed(1) : '0'}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}