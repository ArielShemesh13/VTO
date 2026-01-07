import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Database, TrendingUp, Code } from 'lucide-react';

export default function EducationSection({ isDark }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: GraduationCap,
      title: 'Academic Degree',
      items: ['BA in Business Administration', 'Specialization: Information Systems', 'Ono Academic College (2023-2026)', 'Focus: Analytical Thinking & Data-Driven Processes'],
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: TrendingUp,
      title: 'Mentorship & Excellence',
      items: ['Mentored students on the autism spectrum', 'High emotional intelligence & sensitivity', 'Personal guidance and empowerment', 'Dean\'s List honoree for academic excellence'],
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Code,
      title: 'Professional Capabilities',
      items: ['Web development & digital interfaces', 'Data analysis & business insights', 'Trend analysis & pattern recognition', 'AI agents & intelligent automation'],
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270] bg-clip-text text-transparent'}`}>
            Background
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Academic Background
          </h2>
        </motion.div>

        <div className="flex justify-center mb-8 gap-4">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === index
                  ? isDark
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-[#4dbdce] to-[#6366f1] text-white shadow-lg'
                  : isDark
                  ? 'bg-white/5 text-white/60 hover:bg-white/10'
                  : 'bg-[#244270]/5 text-[#141225]/60 hover:bg-[#244270]/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`p-8 rounded-2xl ${isDark ? 'bg-black/40 border border-white/10' : 'bg-white/60 border border-[#244270]/10'} backdrop-blur-xl max-w-3xl mx-auto`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tabs[activeTab].color} flex items-center justify-center shadow-lg`}>
              {React.createElement(tabs[activeTab].icon, { className: "text-white", size: 28 })}
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              {tabs[activeTab].title}
            </h3>
          </div>

          <div className="space-y-3">
            {tabs[activeTab].items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#a855f7]'}`} />
                <span className={`text-base ${isDark ? 'text-white/80' : 'text-[#141225]/80'}`}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}