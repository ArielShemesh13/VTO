import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calculator, PieChart, BarChart3, Percent } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TaxDashboard({ isDark, investmentData }) {
  const [taxSettings, setTaxSettings] = useState({
    capitalGainsTax: 25, // מס רווחי הון בישראל
    incomeTax: 0, // מס הכנסה נוסף
    otherFees: 0, // עמלות וכו'
    country: 'IL' // ישראל
  });

  // טען מ-localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-tax-settings');
    if (saved) {
      setTaxSettings(JSON.parse(saved));
    }
  }, []);

  // שמור ב-localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-tax-settings', JSON.stringify(taxSettings));
  }, [taxSettings]);

  // חישובי מס
  const taxCalculations = useMemo(() => {
    if (!investmentData || !investmentData.results) {
      return {
        totalValue: 0,
        totalContributions: 0,
        totalGains: 0,
        capitalGainsTax: 0,
        incomeTax: 0,
        otherFees: 0,
        totalTax: 0,
        netValue: 0,
        effectiveTaxRate: 0,
        yearlyDataWithTax: []
      };
    }

    const { futureValue, totalContributions, totalInterest, yearlyData } = investmentData.results;
    
    // רווחים = ריבית (לא כולל הפקדות)
    const gains = totalInterest;
    
    // מס רווחי הון
    const capitalGainsTax = (gains * taxSettings.capitalGainsTax) / 100;
    
    // מס הכנסה נוסף
    const incomeTax = (futureValue * taxSettings.incomeTax) / 100;
    
    // עמלות
    const otherFees = (futureValue * taxSettings.otherFees) / 100;
    
    // סך הכל מס
    const totalTax = capitalGainsTax + incomeTax + otherFees;
    
    // שווי נקי אחרי מס
    const netValue = futureValue - totalTax;
    
    // שיעור מס אפקטיבי
    const effectiveTaxRate = (totalTax / futureValue) * 100;
    
    // נתונים שנתיים עם מס
    const yearlyDataWithTax = yearlyData?.map(year => {
      const yearGains = year.interest;
      const yearTax = (yearGains * taxSettings.capitalGainsTax) / 100;
      return {
        ...year,
        tax: yearTax,
        netValue: year.totalValue - (year.interest * taxSettings.capitalGainsTax / 100)
      };
    }) || [];
    
    return {
      totalValue: futureValue,
      totalContributions,
      totalGains: gains,
      capitalGainsTax,
      incomeTax,
      otherFees,
      totalTax,
      netValue,
      effectiveTaxRate,
      yearlyDataWithTax
    };
  }, [investmentData, taxSettings]);

  const formatCurrency = (value) => {
    if (!investmentData?.currency) return `$${value.toLocaleString()}`;
    const symbols = { USD: '$', EUR: '€', ILS: '₪', GBP: '£', JPY: '¥' };
    return `${symbols[investmentData.currency] || '$'}${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // נתונים לגרף פאי - חלוקת תיק לאחר מס
  const pieData = [
    { name: 'הפקדות', value: taxCalculations.totalContributions, color: isDark ? '#3b82f6' : '#2563eb' },
    { name: 'רווחים נטו', value: taxCalculations.totalGains - taxCalculations.totalTax, color: isDark ? '#10b981' : '#059669' },
    { name: 'מס', value: taxCalculations.totalTax, color: isDark ? '#ef4444' : '#dc2626' },
  ];

  const stats = [
    {
      icon: DollarSign,
      label: 'שווי נטו',
      value: formatCurrency(taxCalculations.netValue),
      color: isDark ? 'from-green-500 to-emerald-500' : 'from-green-600 to-emerald-600',
    },
    {
      icon: Calculator,
      label: 'סך כל מס',
      value: formatCurrency(taxCalculations.totalTax),
      color: isDark ? 'from-red-500 to-pink-500' : 'from-red-600 to-pink-600',
    },
    {
      icon: Percent,
      label: 'שיעור מס אפקטיבי',
      value: `${taxCalculations.effectiveTaxRate.toFixed(2)}%`,
      color: isDark ? 'from-purple-500 to-blue-500' : 'from-purple-600 to-blue-600',
    },
    {
      icon: TrendingUp,
      label: 'ROI נטו',
      value: taxCalculations.totalContributions > 0 
        ? `${((taxCalculations.netValue / taxCalculations.totalContributions - 1) * 100).toFixed(1)}%`
        : '0%',
      color: isDark ? 'from-cyan-500 to-blue-500' : 'from-cyan-600 to-blue-600',
    },
  ];

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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'}`}>
          <BarChart3 className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            דשבורד מס ורווחים
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
            חישוב מס רווחי הון ותשואה נטו
          </p>
        </div>
      </div>

      {/* Tax Settings */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-white/70' : 'text-[#141225]/70'
          }`}>
            מס רווחי הון (%)
          </label>
          <input
            type="number"
            value={taxSettings.capitalGainsTax}
            onChange={(e) => setTaxSettings({ ...taxSettings, capitalGainsTax: parseFloat(e.target.value) || 0 })}
            className={`w-full px-4 py-2 rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-white/5 border border-purple-500/20 text-white focus:border-purple-500/50' 
                : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] focus:border-[#244270]/30'
            }`}
            step="0.1"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-white/70' : 'text-[#141225]/70'
          }`}>
            מס הכנסה נוסף (%)
          </label>
          <input
            type="number"
            value={taxSettings.incomeTax}
            onChange={(e) => setTaxSettings({ ...taxSettings, incomeTax: parseFloat(e.target.value) || 0 })}
            className={`w-full px-4 py-2 rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-white/5 border border-purple-500/20 text-white focus:border-purple-500/50' 
                : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] focus:border-[#244270]/30'
            }`}
            step="0.1"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-white/70' : 'text-[#141225]/70'
          }`}>
            עמלות אחרות (%)
          </label>
          <input
            type="number"
            value={taxSettings.otherFees}
            onChange={(e) => setTaxSettings({ ...taxSettings, otherFees: parseFloat(e.target.value) || 0 })}
            className={`w-full px-4 py-2 rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-white/5 border border-purple-500/20 text-white focus:border-purple-500/50' 
                : 'bg-[#244270]/5 border border-[#244270]/10 text-[#141225] focus:border-[#244270]/30'
            }`}
            step="0.1"
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${
              isDark ? 'bg-white/5' : 'bg-[#244270]/5'
            }`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>
              {stat.label}
            </p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {investmentData && taxCalculations.yearlyDataWithTax.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Growth Chart with Tax */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-[#244270]/5'}`}>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              צמיחה לפני ואחרי מס
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={taxCalculations.yearlyDataWithTax}>
                <defs>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isDark ? '#8b5cf6' : '#7c3aed'} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff20' : '#00000020'} />
                <XAxis dataKey="year" stroke={isDark ? '#ffffff60' : '#00000060'} style={{ fontSize: '12px' }} />
                <YAxis stroke={isDark ? '#ffffff60' : '#00000060'} style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#ffffff20' : '#00000020'}`,
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="totalValue" stroke={isDark ? '#8b5cf6' : '#7c3aed'} fillOpacity={1} fill="url(#colorGross)" name="ברוטו" />
                <Area type="monotone" dataKey="netValue" stroke={isDark ? '#10b981' : '#059669'} fillOpacity={1} fill="url(#colorNet)" name="נטו" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tax Breakdown Pie Chart */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-[#244270]/5'}`}>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              חלוקת תיק לאחר מס
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#ffffff20' : '#00000020'}`,
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Annual Tax Bar Chart */}
          <div className={`p-4 rounded-xl lg:col-span-2 ${isDark ? 'bg-white/5' : 'bg-[#244270]/5'}`}>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              מס שנתי על רווחים
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taxCalculations.yearlyDataWithTax}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff20' : '#00000020'} />
                <XAxis dataKey="year" stroke={isDark ? '#ffffff60' : '#00000060'} style={{ fontSize: '12px' }} />
                <YAxis stroke={isDark ? '#ffffff60' : '#00000060'} style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#ffffff20' : '#00000020'}`,
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="tax" fill={isDark ? '#ef4444' : '#dc2626'} name="מס" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className={`text-center py-12 ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">השתמש במחשבון לעיל כדי לראות ניתוח מס מפורט</p>
        </div>
      )}
    </motion.div>
  );
}