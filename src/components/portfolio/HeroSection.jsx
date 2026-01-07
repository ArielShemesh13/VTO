import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity, Code2, Blocks } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection({ isDark, onNavigate }) {
  const activities = [
    {
      title: 'Data Analysis & Power BI',
      description: 'Building interactive dashboards, KPIs, and data visualizations that transform raw data into actionable business intelligence.',
      visual: 'dashboard',
    },
    {
      title: 'Reports & Market Analysis',
      description: 'Creating analytical reports, identifying trends, and extracting strategic insights to support data-driven decisions.',
      visual: 'trends',
    },
    {
      title: 'Web3 & Development',
      description: 'Developing modern web applications with cutting-edge technologies, decentralized solutions, and innovative digital interfaces.',
      visual: 'code',
    },
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50' : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30'} backdrop-blur-xl p-6 transition-all duration-500`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.15 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative z-10">
                    <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                      {activity.description}
                    </p>

                    {activity.visual === 'dashboard' && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className={`flex-1 h-12 rounded-lg ${isDark ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30' : 'bg-gradient-to-r from-[#4dbdce]/20 to-[#6366f1]/20 border border-[#4dbdce]/30'} flex items-center justify-center`}>
                            <BarChart3 className={`${isDark ? 'text-purple-400' : 'text-[#4dbdce]'}`} size={20} />
                          </div>
                          <div className={`flex-1 h-12 rounded-lg ${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' : 'bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/30'} flex items-center justify-center`}>
                            <PieChart className={`${isDark ? 'text-cyan-400' : 'text-[#6366f1]'}`} size={20} />
                          </div>
                        </div>
                        <div className={`h-8 rounded-lg ${isDark ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20' : 'bg-gradient-to-r from-[#4dbdce]/10 to-[#a855f7]/10 border border-[#4dbdce]/20'} flex items-center px-3 gap-2`}>
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#4dbdce]'}`} />
                          <div className={`flex-1 h-1 rounded ${isDark ? 'bg-purple-400/30' : 'bg-[#4dbdce]/30'}`} />
                        </div>
                      </div>
                    )}

                    {activity.visual === 'trends' && (
                      <div className="space-y-2">
                        <div className={`h-16 rounded-lg ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20' : 'bg-gradient-to-br from-[#4dbdce]/10 to-[#6366f1]/10 border border-[#4dbdce]/20'} flex items-end justify-around p-2`}>
                          <motion.div 
                            className={`w-3 rounded-t ${isDark ? 'bg-gradient-to-t from-purple-500 to-purple-300' : 'bg-gradient-to-t from-[#4dbdce] to-[#6366f1]'}`}
                            animate={{ height: ['30%', '50%', '30%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div 
                            className={`w-3 rounded-t ${isDark ? 'bg-gradient-to-t from-cyan-500 to-cyan-300' : 'bg-gradient-to-t from-[#6366f1] to-[#a855f7]'}`}
                            animate={{ height: ['60%', '80%', '60%'] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          />
                          <motion.div 
                            className={`w-3 rounded-t ${isDark ? 'bg-gradient-to-t from-blue-500 to-blue-300' : 'bg-gradient-to-t from-[#a855f7] to-[#4dbdce]'}`}
                            animate={{ height: ['40%', '70%', '40%'] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`${isDark ? 'text-cyan-400' : 'text-[#4dbdce]'}`} size={16} />
                          <div className={`flex-1 h-1 rounded ${isDark ? 'bg-gradient-to-r from-purple-400/30 to-cyan-400/30' : 'bg-gradient-to-r from-[#4dbdce]/30 to-[#6366f1]/30'}`} />
                        </div>
                      </div>
                    )}

                    {activity.visual === 'code' && (
                      <div className="space-y-2">
                        <div className={`rounded-lg ${isDark ? 'bg-black/50 border border-purple-500/30' : 'bg-[#244270]/10 border border-[#244270]/20'} p-3 font-mono text-xs space-y-1`}>
                          <div className="flex gap-2">
                            <Code2 className={`${isDark ? 'text-purple-400' : 'text-[#4dbdce]'}`} size={14} />
                            <span className={`${isDark ? 'text-cyan-400' : 'text-[#6366f1]'}`}>const</span>
                            <span className={`${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>data</span>
                          </div>
                          <div className="flex gap-2">
                            <Blocks className={`${isDark ? 'text-cyan-400' : 'text-[#6366f1]'}`} size={14} />
                            <div className={`flex-1 h-1 rounded ${isDark ? 'bg-purple-400/30' : 'bg-[#4dbdce]/30'}`} />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <motion.div 
                            className={`w-3 h-3 rounded ${isDark ? 'bg-purple-500' : 'bg-[#4dbdce]'}`}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div 
                            className={`w-3 h-3 rounded ${isDark ? 'bg-cyan-500' : 'bg-[#6366f1]'}`}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          />
                          <motion.div 
                            className={`w-3 h-3 rounded ${isDark ? 'bg-blue-500' : 'bg-[#a855f7]'}`}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
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