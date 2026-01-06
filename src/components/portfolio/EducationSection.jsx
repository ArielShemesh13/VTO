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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-16">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mb-12 p-8 rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/40' : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30'} backdrop-blur-xl transition-all duration-500 group`}
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <motion.div 
                className={`flex-shrink-0 w-24 h-24 rounded-2xl ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30' : 'bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 border border-[#6366f1]/30'} backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/he/c/c8/Ono_Academic_College_Logo.png" 
                  alt="Ono Academic College"
                  className="w-20 h-20 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </motion.div>

              <div className="flex-1">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                  B.A. in Business Administration
                </h3>
                <p className={`text-lg mb-2 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
                  with Specialization in Information Systems
                </p>
                <p className={`text-md ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                  Ono Academic College
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h3 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              What I{' '}
              <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'} bg-clip-text text-transparent`}>
                Do
              </span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-2xl bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 backdrop-blur-xl transition-all duration-500`}
              >
                <div className="relative h-32 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color.replace('from-', 'from-').replace('to-', 'to-')}/20`} />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <skill.icon className="text-white" size={28} />
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                    {skill.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'}`} />
                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270]'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}