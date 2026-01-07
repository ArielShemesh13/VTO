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
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ perspective: '1000px' }}
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-white/5 border-2 hover:border-purple-500/60' : 'bg-white/40 border-2 hover:border-[#4dbdce]/50'} backdrop-blur-2xl p-6 transition-all duration-700`}
                  style={{
                    borderImage: isDark 
                      ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3)) 1'
                      : 'linear-gradient(135deg, rgba(77, 189, 206, 0.3), rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3)) 1',
                    boxShadow: isDark
                      ? '0 8px 32px rgba(168, 85, 247, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(77, 189, 206, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.15 }}
                  whileHover={{ 
                    y: -12,
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.02,
                    boxShadow: isDark
                      ? '0 20px 60px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                      : '0 20px 60px rgba(77, 189, 206, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark ? 'bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10' : 'bg-gradient-to-br from-[#4dbdce]/10 via-[#6366f1]/10 to-[#a855f7]/10'}`}
                    style={{ filter: 'blur(20px)' }}
                  />

                  <div className="relative z-10">
                    <motion.h3 
                      className={`text-lg font-bold mb-3 ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-[#141225] drop-shadow-[0_0_8px_rgba(77,189,206,0.4)]'}`}
                      whileHover={{ x: 3 }}
                    >
                      {activity.title}
                    </motion.h3>
                    <motion.p 
                      className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/80' : 'text-[#141225]/80'}`}
                      whileHover={{ x: 3 }}
                    >
                      {activity.description}
                    </motion.p>

                    {activity.visual === 'dashboard' && (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <motion.div 
                            className={`flex-1 h-14 rounded-xl ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/40' : 'bg-gradient-to-br from-[#4dbdce]/20 to-[#6366f1]/20 border border-[#4dbdce]/40'} flex items-center justify-center backdrop-blur-sm relative overflow-hidden`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.div
                              className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-purple-400/0' : 'bg-gradient-to-r from-[#4dbdce]/0 via-[#4dbdce]/30 to-[#4dbdce]/0'}`}
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <BarChart3 className={`${isDark ? 'text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'text-[#4dbdce] drop-shadow-[0_0_10px_rgba(77,189,206,0.8)]'}`} size={24} />
                            </motion.div>
                          </motion.div>
                          <motion.div 
                            className={`flex-1 h-14 rounded-xl ${isDark ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/40' : 'bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/40'} flex items-center justify-center backdrop-blur-sm relative overflow-hidden`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.div
                              className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0' : 'bg-gradient-to-r from-[#6366f1]/0 via-[#6366f1]/30 to-[#6366f1]/0'}`}
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            >
                              <PieChart className={`${isDark ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'text-[#6366f1] drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]'}`} size={24} />
                            </motion.div>
                          </motion.div>
                        </div>

                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className={`h-2 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-blue-500/30' : 'bg-gradient-to-r from-[#4dbdce]/30 via-[#6366f1]/30 to-[#a855f7]/30'} relative overflow-hidden`}
                            style={{ width: `${80 - i * 20}%` }}
                          >
                            <motion.div
                              className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#6366f1]'}`}
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activity.visual === 'trends' && (
                      <div className="space-y-3">
                        <div className={`h-20 rounded-xl ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-400/30' : 'bg-gradient-to-br from-[#4dbdce]/10 to-[#6366f1]/10 border border-[#4dbdce]/30'} flex items-end justify-around p-3 backdrop-blur-sm relative overflow-hidden`}>
                          <motion.div
                            className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-purple-500/20 to-transparent' : 'bg-gradient-to-t from-[#4dbdce]/20 to-transparent'}`}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className={`w-2.5 rounded-t ${isDark ? 'bg-gradient-to-t from-purple-400 via-cyan-400 to-blue-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]' : 'bg-gradient-to-t from-[#4dbdce] via-[#6366f1] to-[#a855f7] shadow-[0_0_15px_rgba(77,189,206,0.6)]'}`}
                              animate={{ 
                                height: [`${30 + i * 5}%`, `${50 + i * 8}%`, `${30 + i * 5}%`],
                                filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                              }}
                              transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>

                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <TrendingUp className={`${isDark ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-[#4dbdce] drop-shadow-[0_0_8px_rgba(77,189,206,0.8)]'}`} size={18} />
                          </motion.div>
                          <div className={`flex-1 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400/40 to-cyan-400/40' : 'bg-gradient-to-r from-[#4dbdce]/40 to-[#6366f1]/40'} relative overflow-hidden`}>
                            <motion.div
                              className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#6366f1]'}`}
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {activity.visual === 'code' && (
                      <div className="space-y-3">
                        <motion.div 
                          className={`rounded-xl ${isDark ? 'bg-black/40 border border-purple-400/30' : 'bg-[#244270]/15 border border-[#244270]/30'} p-4 font-mono text-xs backdrop-blur-sm relative overflow-hidden`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-[#4dbdce]/10 to-[#6366f1]/10'}`}
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <motion.div 
                            className="flex items-center gap-2 mb-2"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Code2 className={`${isDark ? 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-[#4dbdce] drop-shadow-[0_0_8px_rgba(77,189,206,0.8)]'}`} size={16} />
                            <span className={`${isDark ? 'text-cyan-300' : 'text-[#6366f1]'}`}>const</span>
                            <span className={`${isDark ? 'text-white/80' : 'text-[#141225]/80'}`}>web3</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          >
                            <Blocks className={`${isDark ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-[#6366f1] drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]'}`} size={16} />
                            <div className={`flex-1 h-1.5 rounded ${isDark ? 'bg-purple-400/40' : 'bg-[#4dbdce]/40'} relative overflow-hidden`}>
                              <motion.div
                                className={`absolute inset-0 ${isDark ? 'bg-purple-400' : 'bg-[#4dbdce]'}`}
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </motion.div>
                        </motion.div>

                        <div className="flex gap-2">
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className={`flex-1 h-4 rounded ${isDark ? 'bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-400/40' : 'bg-gradient-to-br from-[#4dbdce]/30 to-[#6366f1]/30 border border-[#4dbdce]/40'} backdrop-blur-sm`}
                              animate={{ 
                                opacity: [0.4, 1, 0.4],
                                scale: [1, 1.05, 1],
                              }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'} shadow-[0_0_15px_rgba(168,85,247,0.8)]`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                  />
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