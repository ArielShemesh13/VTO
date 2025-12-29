import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar, HelpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';

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

const tooltips = {
  currency: 'Select the currency for your investment calculations',
  initial: 'The amount of money you start with',
  monthly: 'How much you plan to add each month to your investment',
  rate: 'The expected annual return rate (e.g., stock market average is ~7-10%)',
  years: 'How long you plan to keep your money invested',
  frequency: 'How often the interest is calculated and added to your balance. More frequent = slightly higher returns',
  tax: 'Enter the capital gains tax rate in your country. Note: If you are referring to a provident fund (קרן השתלמות), there is NO capital gains tax, so enter 0. All other investments are subject to tax - check your country\'s rate',
};

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

  const labelClass = `flex items-center gap-2 text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`;
  
  const [showTooltip, setShowTooltip] = useState(null);

  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl ${isDark ? 'bg-[#141225] border border-purple-500/30' : 'bg-white border border-[#244270]/20'} shadow-xl`}>
          <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#141225]'}`}>Year {label}</p>
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
          Investment Calculator
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Currency Selection */}
        <div>
          <label className={labelClass}>
            <DollarSign className="w-4 h-4" />
            <span>Currency</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.currency}
              </div>
            </div>
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
            <span>Initial Investment</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.initial}
              </div>
            </div>
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
            <span>Monthly Contribution</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.monthly}
              </div>
            </div>
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
            <Percent className="w-4 h-4" />
            <span>Annual Interest Rate (%)</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.rate}
              </div>
            </div>
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
            <Calendar className="w-4 h-4" />
            <span>Investment Period (Years)</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.years}
              </div>
            </div>
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
            <TrendingUp className="w-4 h-4" />
            <span>Compound Frequency</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.frequency}
              </div>
            </div>
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
            <Percent className="w-4 h-4" />
            <span>Capital Gains Tax (%)</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-80 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.tax}
              </div>
            </div>
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

      {/* Annual Growth Chart */}
      <div className={`mt-8`}>
        <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Annual Interest Earned
        </h4>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results.yearlyData.slice(1)}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis 
                dataKey="year" 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              />
              <YAxis 
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                tick={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                tickFormatter={(value) => `${currency.symbol}${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip content={<CustomChartTooltip />} />
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