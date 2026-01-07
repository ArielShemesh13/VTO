import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Database, Code2 } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection({ isDark, onNavigate }) {
  const skills = [
    { icon: BarChart3, label: 'Data Analysis', color: isDark ? 'from-purple-500 to-pink-500' : 'from-[#4dbdce] to-[#6366f1]' },
    { icon: Database, label: 'Power BI', color: isDark ? 'from-cyan-500 to-blue-500' : 'from-[#6366f1] to-[#a855f7]' },
    { icon: Code2, label: 'Web Development', color: isDark ? 'from-blue-500 to-purple-500' : 'from-[#a855f7] to-[#4dbdce]' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#141225]'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hi, I'm{' '}
              <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'} bg-clip-text text-transparent`}>
                Ariel Shemesh
              </span>
            </motion.h1>

            <motion.p
              className={`text-lg md:text-xl mb-8 leading-relaxed ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className={isDark ? 'text-purple-400' : 'text-[#244270]'}>Data Analyst</span> specializing in turning 
              raw data into actionable business insights. Expert in SQL, Python, Power BI, and Advanced Excel. 
              I transform complex datasets into clear, strategic decisions that drive business growth.
            </motion.p>

            <motion.div
              className="flex gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className={`flex flex-col items-center gap-3`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg ${isDark ? 'shadow-purple-500/20' : 'shadow-cyan-500/15'}`}>
                    <skill.icon className="text-white" size={28} />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                    {skill.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-md h-96">
              <AnimatedLogo isDark={isDark} />
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}