import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Database, TrendingUp, Code } from 'lucide-react';

export default function EducationSection({ isDark }) {
  const skills = [
    {
      icon: Database,
      title: 'Data Analysis & Insights',
      items: ['SQL', 'ERD Modeling', 'Python (Pandas)', 'Power BI', 'Advanced Excel'],
      color: isDark ? 'from-purple-500 to-pink-500' : 'from-[#244270] to-[#4dbdce]',
    },
    {
      icon: TrendingUp,
      title: 'Marketing & Finance Operations',
      items: ['Financial Modeling', 'Risk Assessment', 'ERP Systems (SAP)', 'Monday.com'],
      color: isDark ? 'from-cyan-500 to-blue-500' : 'from-[#244270] to-[#4dbdce]',
    },
    {
      icon: Code,
      title: 'Web Development',
      items: ['React', 'JavaScript', 'HTML', 'CSS', 'Firebase', 'LocalStorage'],
      color: isDark ? 'from-blue-500 to-purple-500' : 'from-[#244270] to-[#4dbdce]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
              Education
            </p>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              Academic{' '}
              <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'} bg-clip-text text-transparent`}>
                Background
              </span>
            </h2>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className={`mb-4 p-4 rounded-xl max-w-2xl mx-auto ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/40' : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30'} backdrop-blur-xl transition-all duration-500 group`}
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-4">
              <motion.div 
                className={`flex-shrink-0 w-16 h-16 rounded-xl ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30' : 'bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 border border-[#6366f1]/30'} backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/he/c/c8/Ono_Academic_College_Logo.png" 
                  alt="Ono Academic College"
                  className="w-14 h-14 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </motion.div>

              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                  B.A. in Business Administration
                </h3>
                <p className={`text-sm mb-1 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
                  with Specialization in Information Systems
                </p>
                <p className={`text-xs ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                  Ono Academic College
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}