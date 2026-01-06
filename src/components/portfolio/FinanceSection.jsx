import React from 'react';
import { motion } from 'framer-motion';

export default function FinanceSection({ isDark }) {
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
            Data Analysis & Tools
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-[#141225]'
          }`}>
            Analytics{' '}
            <span className={`${
              isDark 
                ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' 
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'
            } bg-clip-text text-transparent`}>
              Showcase
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDark ? 'text-white/60' : 'text-[#141225]/60'
          }`}>
            Interactive data visualization and analysis tools demonstrating my expertise in 
            turning complex data into actionable insights.
          </p>
        </motion.div>

        {/* Content Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center p-12 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            Financial analytics tools coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}