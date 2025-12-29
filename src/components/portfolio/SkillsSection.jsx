import React from 'react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    title: 'Data Analysis & Insights',
    description: 'Extract meaningful patterns from complex datasets and translate them into actionable business strategies',
    skills: ['SQL Queries & Subqueries', 'Python (Pandas) for Data Processing', 'Power BI Dashboards', 'Advanced Excel (VBA, Solver, Goal Seek)'],
    icon: '📊',
  },
  {
    title: 'Business Intelligence',
    description: 'Build comprehensive analytical frameworks that drive informed decision-making and identify growth opportunities',
    skills: ['Financial Modeling & Risk Assessment', 'Economic Analysis', 'ERP Systems (SAP)', 'Database Architecture (ERD)'],
    icon: '💼',
  },
  {
    title: 'Web Development',
    description: 'Create modern, responsive web applications with a focus on data visualization and user experience',
    skills: ['React & JavaScript', 'HTML & CSS', 'Firebase & LocalStorage'],
    icon: '💻',
  },
];

export default function SkillsSection({ isDark }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'text-[#6366f1]'}`}>
            My Expertise
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
            What I{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]'} bg-clip-text text-transparent`}>
              Do
            </span>
          </h2>
          <p className={`max-w-3xl mx-auto mb-12 ${isDark ? 'text-white/60' : 'text-[#475569]'}`}>
            I transform complex data into strategic business decisions. Here's how I create value:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-6 rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/40' : 'bg-white/70 border border-[#c7d2fe] hover:border-[#a5b4fc]'} backdrop-blur-xl transition-all duration-300 group`}
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">{capability.icon}</div>
              
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                {capability.title}
              </h3>
              
              <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-white/60' : 'text-[#475569]'}`}>
                {capability.description}
              </p>
              
              <div className="space-y-2">
                {capability.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + skillIndex * 0.05 }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]'}`} />
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#475569]'}`}>
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h3 className={`text-center text-lg font-medium mb-6 ${isDark ? 'text-white/60' : 'text-[#475569]'}`}>
            Professional Attributes
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Analytical Thinking', 'Problem Solving', 'Attention to Detail', 'AI-Powered Tools', 'Hebrew (Native)', 'Russian (Native)', 'English (Advanced)'].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium cursor-default ${isDark ? 'bg-purple-500/10 text-purple-300/80 border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20' : 'bg-[#6366f1]/10 text-[#4338ca] border border-[#c7d2fe] hover:border-[#a5b4fc] hover:bg-[#6366f1]/15'} transition-all duration-300`}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}