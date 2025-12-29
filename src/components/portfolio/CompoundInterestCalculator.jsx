import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar, HelpCircle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
];

const compoundFrequencies = {
  daily: { label: 'Daily', periods: 365 },
  weekly: { label: 'Weekly', periods: 52 },
  monthly: { label: 'Monthly', periods: 12 },
  quarterly: { label: 'Quarterly', periods: 4 },
  annually: { label: 'Annually', periods: 1 },
};

const tooltips = {
  currency: 'Select the currency for your investment calculations',
  initial: 'The amount of money you start with',
  monthly: 'How much you plan to add each month to your investment',
  rate: 'The expected annual return rate (e.g., stock market average is ~7-10%)',
  years: 'How long you plan to keep your money invested',
  tax: 'Enter the capital gains tax rate in your country. Note: If you are referring to a provident fund (קרן השתלמות), there is NO capital gains tax, so enter 0. All other investments are subject to tax - check your country\'s rate',
  compound: 'How often the interest is calculated and added to your balance',
  target: 'The final amount you want to reach with your investment',
};

export default function CompoundInterestCalculator({ isDark, onCalculate }) {
  const [calculatorMode, setCalculatorMode] = useState('standard');
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(10);
  const [currency, setCurrency] = useState(currencies[0]);
  const [capitalGainsTax, setCapitalGainsTax] = useState(25);
  const [compoundFrequency, setCompoundFrequency] = useState('annually');
  const [targetAmount, setTargetAmount] = useState(100000);

  const results = useMemo(() => {
    const n = compoundFrequencies[compoundFrequency].periods;
    const t = years;

    if (calculatorMode === 'target') {
      // Target mode: Calculate required rate
      const target = targetAmount;
      const totalMonthlyContributions = monthlyContribution * 12 * t;
      const totalContributions = principal + totalMonthlyContributions;

      // Binary search for required rate
      let low = 0, high = 50;
      let requiredRate = 0;
      
      for (let i = 0; i < 100; i++) {
        const mid = (low + high) / 2;
        const r = mid / 100;
        const periodRate = r / n;
        const totalPeriods = n * t;
        const contributionsPerYear = 12;
        const contributionPerPeriod = (monthlyContribution * contributionsPerYear) / n;
        
        const fvPrincipal = principal * Math.pow(1 + periodRate, totalPeriods);
        const fvContributions = contributionPerPeriod * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate);
        const fv = fvPrincipal + fvContributions;
        
        if (Math.abs(fv - target) < 1) {
          requiredRate = mid;
          break;
        }
        
        if (fv < target) {
          low = mid;
        } else {
          high = mid;
        }
        
        requiredRate = mid;
      }

      const r = requiredRate / 100;
      const periodRate = r / n;
      const totalPeriods = n * t;
      const contributionsPerYear = 12;
      const contributionPerPeriod = (monthlyContribution * contributionsPerYear) / n;
      const totalInterest = target - totalContributions;
      const taxAmount = (totalInterest * capitalGainsTax) / 100;
      const netFutureValue = target - taxAmount;

      const yearlyData = [];
      for (let year = 0; year <= t; year++) {
        const fvP = principal * Math.pow(1 + periodRate, n * year);
        const periods = n * year;
        const fvC = periods > 0 ? contributionPerPeriod * ((Math.pow(1 + periodRate, periods) - 1) / periodRate) : 0;
        const total = fvP + fvC;
        const contributions = principal + monthlyContribution * 12 * year;
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
        futureValue: Math.round(target),
        totalContributions: Math.round(totalContributions),
        totalInterest: Math.round(totalInterest),
        taxAmount: Math.round(taxAmount),
        netFutureValue: Math.round(netFutureValue),
        yearlyData,
        requiredRate: requiredRate.toFixed(2),
      };
    } else {
      // Standard mode: Calculate future value
      const r = annualRate / 100;
      const P = principal;
      const PMT = monthlyContribution;

      const periodRate = r / n;
      const totalPeriods = n * t;
      const contributionsPerYear = 12;
      const contributionPerPeriod = (monthlyContribution * contributionsPerYear) / n;

      const futureValuePrincipal = P * Math.pow(1 + periodRate, totalPeriods);
      const futureValueContributions = contributionPerPeriod * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate);

      const totalFutureValue = futureValuePrincipal + futureValueContributions;
      const totalContributions = P + PMT * 12 * t;
      const totalInterest = totalFutureValue - totalContributions;

      const taxAmount = (totalInterest * capitalGainsTax) / 100;
      const netFutureValue = totalFutureValue - taxAmount;

      const yearlyData = [];
      for (let year = 0; year <= t; year++) {
        const fvPrincipal = P * Math.pow(1 + periodRate, n * year);
        const periods = n * year;
        const fvContributions = periods > 0 ? contributionPerPeriod * ((Math.pow(1 + periodRate, periods) - 1) / periodRate) : 0;
        const total = fvPrincipal + fvContributions;
        const contributions = P + PMT * 12 * year;
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
        requiredRate: null,
      };
    }
  }, [calculatorMode, principal, monthlyContribution, annualRate, years, capitalGainsTax, compoundFrequency, targetAmount]);

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

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCalculatorMode('standard')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
            calculatorMode === 'standard'
              ? isDark
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] text-white'
              : isDark
              ? 'bg-white/5 text-white/70 hover:bg-white/10'
              : 'bg-[#244270]/5 text-[#141225]/70 hover:bg-[#244270]/10'
          }`}
        >
          <Calculator className="w-4 h-4 inline mr-2" />
          Standard Calculator
        </button>
        <button
          onClick={() => setCalculatorMode('target')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
            calculatorMode === 'target'
              ? isDark
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] text-white'
              : isDark
              ? 'bg-white/5 text-white/70 hover:bg-white/10'
              : 'bg-[#244270]/5 text-[#141225]/70 hover:bg-[#244270]/10'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Target Calculator
        </button>
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

        {/* Compound Frequency */}
        <div>
          <label className={labelClass}>
            <Calendar className="w-4 h-4" />
            <span>Compounding Frequency</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.compound}
              </div>
            </div>
          </label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(e.target.value)}
            className={inputClass}
          >
            {Object.entries(compoundFrequencies).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-gray-900">
                {label}
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

        {/* Annual Rate or Target */}
        {calculatorMode === 'standard' ? (
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
        ) : (
          <div>
            <label className={labelClass}>
              <Target className="w-4 h-4" />
              <span>Target Amount</span>
              <div className="relative group">
                <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
                <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                  isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
                }`}>
                  {tooltips.target}
                </div>
              </div>
            </label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className={inputClass}
              min="0"
              step="1000"
            />
          </div>
        )}

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

      {/* Results Summary */}
      <div className={`mt-8 p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'}`}>
        <h4 className={`text-sm font-medium mb-4 text-center ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
          Investment Summary
        </h4>
        
        {calculatorMode === 'target' && results.requiredRate && (
          <div className="mb-6 text-center">
            <p className={`text-xs mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              Required Annual Return Rate
            </p>
            <p className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {results.requiredRate}%
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
              Compounded {compoundFrequencies[compoundFrequency].label.toLowerCase()}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
              {calculatorMode === 'target' ? 'Target Value' : 'Gross Value'}
            </p>
            <p className={`text-base md:text-lg font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'} break-words`}>
              {formatCurrency(results.futureValue)}
            </p>
          </div>
          <div>
            <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Total Invested</p>
            <p className={`text-base md:text-lg font-bold ${isDark ? 'text-cyan-400' : 'text-[#4dbdce]'} break-words`}>
              {formatCurrency(results.totalContributions)}
            </p>
          </div>
          <div>
            <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Gains</p>
            <p className={`text-base md:text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} break-words`}>
              {formatCurrency(results.totalInterest)}
            </p>
          </div>
          <div>
            <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Tax ({capitalGainsTax}%)</p>
            <p className={`text-base md:text-lg font-bold ${isDark ? 'text-red-400' : 'text-red-600'} break-words`}>
              -{formatCurrency(results.taxAmount)}
            </p>
          </div>
        </div>
        
        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}>
          <p className={`text-sm text-center ${isDark ? 'text-white/60' : 'text-[#141225]/60'} mb-2`}>
            💎 Net Value After Tax
          </p>
          <p className={`text-2xl md:text-3xl font-bold text-center ${isDark ? 'text-green-400' : 'text-green-600'} break-words`}>
            {formatCurrency(results.netFutureValue)}
          </p>
          <p className={`text-xs text-center mt-2 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            ROI: {results.totalContributions > 0 ? ((results.netFutureValue / results.totalContributions - 1) * 100).toFixed(1) : '0'}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}