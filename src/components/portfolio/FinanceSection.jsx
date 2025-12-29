import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import InvestmentDashboard from './InvestmentDashboard';

export default function FinanceSection({ isDark }) {
  const [calculatorData, setCalculatorData] = useState(null);

  const handleCalculate = useCallback((data) => {
    setCalculatorData(data);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${
            isDark ? 'text-purple-400' : 'text-[#244270]'
          }`}>
            Finance Tools
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-[#141225]'
          }`}>
            Compound Interest{' '}
            <span className={`${
              isDark 
                ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' 
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'
            } bg-clip-text text-transparent`}>
              Calculator
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDark ? 'text-white/60' : 'text-[#141225]/60'
          }`}>
            Plan your financial future with our powerful compound interest calculator. 
            Visualize your investment growth and see the power of compounding.
          </p>
        </motion.div>

        {/* Calculator and Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <CompoundInterestCalculator isDark={isDark} onCalculate={handleCalculate} />
          <InvestmentDashboard isDark={isDark} data={calculatorData} />
        </div>

        {/* Educational Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-6 rounded-2xl ${
            isDark 
              ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20' 
              : 'bg-gradient-to-r from-[#244270]/5 to-[#4dbdce]/5 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            💡 The Power of Compound Interest
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className={`font-semibold mb-2 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
                Start Early
              </h5>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                Time is your greatest asset. Starting early allows your money more time to grow exponentially.
              </p>
            </div>
            <div>
              <h5 className={`font-semibold mb-2 ${isDark ? 'text-cyan-400' : 'text-[#4dbdce]'}`}>
                Consistent Contributions
              </h5>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                Regular monthly contributions, even small ones, can significantly boost your final returns.
              </p>
            </div>
            <div>
              <h5 className={`font-semibold mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Reinvest Returns
              </h5>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                Reinvesting your earnings creates a snowball effect that accelerates wealth accumulation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}