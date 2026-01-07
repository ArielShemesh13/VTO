import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection({ isDark, onNavigate }) {
  const symbols = ['data', 'insights', 'web3'];

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
              {symbols.map((symbol, index) => (
                <motion.div
                  key={symbol}
                  className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-white/5 border-2 hover:border-purple-500/60' : 'bg-white/40 border-2 hover:border-[#4dbdce]/50'} backdrop-blur-2xl transition-all duration-700 h-64 flex items-center justify-center`}
                  style={{
                    borderImage: isDark 
                      ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3)) 1'
                      : 'linear-gradient(135deg, rgba(77, 189, 206, 0.3), rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3)) 1',
                    boxShadow: isDark
                      ? '0 8px 32px rgba(168, 85, 247, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(77, 189, 206, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    opacity: { delay: 0.7 + index * 0.15 },
                    y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    y: -12,
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.02,
                    boxShadow: isDark
                      ? '0 20px 60px rgba(168, 85, 247, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                      : '0 20px 60px rgba(77, 189, 206, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isDark ? 'bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10' : 'bg-gradient-to-br from-[#4dbdce]/10 via-[#6366f1]/10 to-[#a855f7]/10'}`}
                    style={{ filter: 'blur(20px)' }}
                  />

                  <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                    {symbol === 'data' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                          className="relative w-32 h-32"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-4 h-4 rounded-full ${isDark ? 'bg-gradient-to-br from-purple-400 to-cyan-400' : 'bg-gradient-to-br from-[#4dbdce] to-[#6366f1]'}`}
                              style={{
                                top: '50%',
                                left: '50%',
                                transformOrigin: '0 0',
                                transform: `rotate(${i * 60}deg) translateX(50px)`,
                                boxShadow: isDark 
                                  ? '0 0 20px rgba(168, 85, 247, 0.8)' 
                                  : '0 0 20px rgba(77, 189, 206, 0.8)',
                              }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            />
                          ))}
                          <motion.div
                            className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full ${isDark ? 'bg-gradient-to-br from-purple-500 to-cyan-500' : 'bg-gradient-to-br from-[#4dbdce] to-[#6366f1]'}`}
                            style={{
                              transform: 'translate(-50%, -50%)',
                              boxShadow: isDark
                                ? '0 0 30px rgba(168, 85, 247, 1)'
                                : '0 0 30px rgba(77, 189, 206, 1)',
                            }}
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: isDark
                                ? ['0 0 30px rgba(168, 85, 247, 1)', '0 0 50px rgba(168, 85, 247, 1)', '0 0 30px rgba(168, 85, 247, 1)']
                                : ['0 0 30px rgba(77, 189, 206, 1)', '0 0 50px rgba(77, 189, 206, 1)', '0 0 30px rgba(77, 189, 206, 1)'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>
                      </div>
                      )}

                      {symbol === 'insights' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg width="140" height="140" viewBox="0 0 140 140">
                          {[0, 1, 2].map((i) => (
                            <motion.path
                              key={i}
                              d={`M 70 70 Q ${70 + 40 * Math.cos((i * 120) * Math.PI / 180)} ${70 + 40 * Math.sin((i * 120) * Math.PI / 180)} ${70 + 60 * Math.cos((i * 120 + 60) * Math.PI / 180)} ${70 + 60 * Math.sin((i * 120 + 60) * Math.PI / 180)}`}
                              fill="none"
                              stroke={isDark ? 'url(#gradient-purple)' : 'url(#gradient-blue)'}
                              strokeWidth="3"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{
                                pathLength: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                          <defs>
                            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(168, 85, 247, 1)" />
                              <stop offset="100%" stopColor="rgba(6, 182, 212, 1)" />
                            </linearGradient>
                            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(77, 189, 206, 1)" />
                              <stop offset="100%" stopColor="rgba(99, 102, 241, 1)" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <motion.div
                          className={`absolute w-6 h-6 rounded-full ${isDark ? 'bg-gradient-to-br from-purple-400 to-cyan-400' : 'bg-gradient-to-br from-[#4dbdce] to-[#6366f1]'}`}
                          style={{
                            boxShadow: isDark
                              ? '0 0 25px rgba(168, 85, 247, 1)'
                              : '0 0 25px rgba(77, 189, 206, 1)',
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      </div>
                      )}

                      {symbol === 'web3' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div className="relative w-36 h-36">
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-8 h-8 ${isDark ? 'bg-gradient-to-br from-purple-500/40 to-cyan-500/40 border border-purple-400/60' : 'bg-gradient-to-br from-[#4dbdce]/40 to-[#6366f1]/40 border border-[#4dbdce]/60'} backdrop-blur-sm`}
                              style={{
                                top: '50%',
                                left: '50%',
                                transformOrigin: '0 0',
                                transform: `rotate(${i * 90}deg) translateX(40px) rotate(-${i * 90}deg)`,
                                boxShadow: isDark
                                  ? '0 0 15px rgba(168, 85, 247, 0.6)'
                                  : '0 0 15px rgba(77, 189, 206, 0.6)',
                              }}
                              animate={{
                                rotate: [0, 90, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                              }}
                            />
                          ))}

                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={`line-${i}`}
                              className={`absolute w-0.5 h-12 ${isDark ? 'bg-gradient-to-b from-purple-400 to-transparent' : 'bg-gradient-to-b from-[#4dbdce] to-transparent'}`}
                              style={{
                                top: '50%',
                                left: '50%',
                                transformOrigin: '0 0',
                                transform: `rotate(${i * 90 + 45}deg) translateX(20px)`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scaleY: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            />
                          ))}

                          <motion.div
                            className={`absolute top-1/2 left-1/2 w-12 h-12 ${isDark ? 'bg-gradient-to-br from-purple-500 to-cyan-500 border-2 border-purple-400' : 'bg-gradient-to-br from-[#4dbdce] to-[#6366f1] border-2 border-[#4dbdce]'}`}
                            style={{
                              transform: 'translate(-50%, -50%)',
                              boxShadow: isDark
                                ? '0 0 30px rgba(168, 85, 247, 1)'
                                : '0 0 30px rgba(77, 189, 206, 1)',
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.15, 1],
                            }}
                            transition={{
                              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity },
                            }}
                          />
                        </motion.div>
                      </div>
                      )}
                      </div>
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