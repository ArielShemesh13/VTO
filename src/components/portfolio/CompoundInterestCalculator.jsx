import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, Calendar, HelpCircle } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
];

const rateTypes = {
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
  rate: 'The expected return rate',
  years: 'How long you plan to keep your money invested',
  tax: 'Capital gains tax rate. For provident funds (קרן השתלמות), enter 0',
  target: 'The final amount you want to reach',
};

export default function CompoundInterestCalculator({ isDark, onCalculate }) {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(10);
  const [targetAmount, setTargetAmount] = useState('');
  const [currency, setCurrency] = useState(currencies[0]);
  const [capitalGainsTax, setCapitalGainsTax] = useState(25);
  const [rateType, setRateType] = useState('annually');
  const [calculateField, setCalculateField] = useState(null); // Which field to calculate

  const results = useMemo(() => {
    const n = rateTypes[rateType].periods;
    const t = years || 10;

    // If user wants to calculate target amount
    if (calculateField === 'target' || (targetAmount === '' && principal && monthlyContribution && annualRate && years)) {
      const r = annualRate / 100;
      const periodRate = r / n;
      const totalPeriods = n * t;
      const contributionsPerYear = 12;
      const contributionPerPeriod = (monthlyContribution * contributionsPerYear) / n;

      const futureValuePrincipal = principal * Math.pow(1 + periodRate, totalPeriods);
      const futureValueContributions = contributionPerPeriod * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate);

      const totalFutureValue = futureValuePrincipal + futureValueContributions;
      const totalContributions = principal + monthlyContribution * 12 * t;
      const totalInterest = totalFutureValue - totalContributions;
      const taxAmount = (totalInterest * capitalGainsTax) / 100;
      const netFutureValue = totalFutureValue - taxAmount;

      const yearlyData = [];
      for (let year = 0; year <= t; year++) {
        const fvPrincipal = principal * Math.pow(1 + periodRate, n * year);
        const periods = n * year;
        const fvContributions = periods > 0 ? contributionPerPeriod * ((Math.pow(1 + periodRate, periods) - 1) / periodRate) : 0;
        const total = fvPrincipal + fvContributions;
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
        futureValue: Math.round(totalFutureValue),
        totalContributions: Math.round(totalContributions),
        totalInterest: Math.round(totalInterest),
        taxAmount: Math.round(taxAmount),
        netFutureValue: Math.round(netFutureValue),
        yearlyData,
        calculatedField: null,
        calculatedValue: null,
      };
    }
    
    // If user wants to calculate required rate
    if (calculateField === 'rate' || (targetAmount && !annualRate && principal && monthlyContribution && years)) {
      const target = parseFloat(targetAmount) || 100000;
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
        calculatedField: 'rate',
        calculatedValue: requiredRate.toFixed(2),
      };
    }

    // Default calculation
    return {
      futureValue: 0,
      totalContributions: 0,
      totalInterest: 0,
      taxAmount: 0,
      netFutureValue: 0,
      yearlyData: [],
      calculatedField: null,
      calculatedValue: null,
    };
  }, [principal, monthlyContribution, annualRate, years, targetAmount, capitalGainsTax, rateType, calculateField]);

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
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Investment Calculator
          </h3>
          <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
            Leave one field empty to calculate it
          </p>
        </div>
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

        {/* Interest Rate */}
        <div>
          <label className={labelClass}>
            <Percent className="w-4 h-4" />
            <span>Interest Rate (%) {results.calculatedField === 'rate' && '- Calculated'}</span>
            <div className="relative group">
              <HelpCircle className="w-3.5 h-3.5 cursor-help opacity-50 hover:opacity-100" />
              <div className={`absolute left-0 bottom-full mb-2 w-64 p-2 rounded-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                isDark ? 'bg-purple-500/90 text-white' : 'bg-[#244270]/90 text-white'
              }`}>
                {tooltips.rate}
              </div>
            </div>
          </label>
          <div className="relative">
            <input
              type="number"
              value={results.calculatedField === 'rate' ? results.calculatedValue : annualRate}
              onChange={(e) => {
                setAnnualRate(Number(e.target.value));
                setCalculateField(null);
              }}
              onFocus={() => {
                if (targetAmount) {
                  setCalculateField('rate');
                  setAnnualRate('');
                }
              }}
              className={`${inputClass} pr-28 ${results.calculatedField === 'rate' ? 'bg-green-500/10 border-green-500/30' : ''}`}
              min="0"
              max="100"
              step="0.1"
              placeholder="Leave empty to calculate"
            />
            <select
              value={rateType}
              onChange={(e) => setRateType(e.target.value)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                isDark 
                  ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30' 
                  : 'bg-[#244270]/10 border border-[#244270]/20 text-[#244270] hover:bg-[#244270]/20'
              }`}
            >
              {Object.entries(rateTypes).map(([key, { label }]) => (
                <option key={key} value={key} className="bg-gray-900">
                  {label}
                </option>
              ))}
            </select>
          </div>
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

        {/* Target Amount */}
        <div>
          <label className={labelClass}>
            <DollarSign className="w-4 h-4" />
            <span>Target Amount {!results.calculatedField && '(Optional)'}</span>
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
            onChange={(e) => {
              setTargetAmount(e.target.value);
              if (e.target.value) {
                setCalculateField('rate');
              } else {
                setCalculateField(null);
              }
            }}
            className={inputClass}
            min="0"
            step="1000"
            placeholder="Leave empty for standard calculation"
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
        
        {results.calculatedField === 'rate' && (
          <div className="mb-6 text-center">
            <p className={`text-xs mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              Required Return Rate
            </p>
            <p className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {results.calculatedValue}%
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
              {rateTypes[rateType].label} compounding
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>Future Value</p>
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