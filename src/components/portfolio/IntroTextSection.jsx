import React from 'react';
import { motion } from 'framer-motion';

export default function IntroTextSection({ isDark }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#141225]'}`}
          >
            Hi, I'm{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'} bg-clip-text text-transparent`}>
              Ariel Shemesh
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}
          >
            <span className={isDark ? 'text-purple-400' : 'text-[#244270]'}>Data Analyst</span> specializing in turning 
            raw data into actionable business insights. Expert in SQL, Python, Power BI, and Advanced Excel. 
            I transform complex datasets into clear, strategic decisions that drive business growth.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}