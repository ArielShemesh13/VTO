import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection({ isDark, onNavigate }) {
  const handleSendMessage = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-md"
        >
          <motion.h1
            className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#141225]'}`}
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
            className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className={isDark ? 'text-purple-400' : 'text-[#244270]'}>Data Analyst</span> specializing in turning 
            raw data into actionable business insights. Expert in SQL, Python, Power BI, and Advanced Excel. 
            I transform complex datasets into clear, strategic decisions that drive business growth.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative flex justify-center items-center flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-72 h-72 md:w-80 md:h-80">
            <AnimatedLogo isDark={isDark} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 max-w-sm"
        >
          <div className={`relative p-6 md:p-8 rounded-2xl backdrop-blur-xl ${
            isDark 
              ? 'bg-black/40 border border-white/10' 
              : 'bg-white/80 border border-[#244270]/20 shadow-xl'
          } w-full`}>
            <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-20 -z-10 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' 
                : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'
            }`} />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full p-1 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' 
                  : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'
              }`}>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69528804be3196607ce99b1a/0cc54a7e4_IMGARIEL.jpg"
                  alt="Ariel Shemesh"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`text-2xl md:text-3xl font-bold text-center mb-1 ${
                isDark ? 'text-white' : 'text-[#141225]'
              }`}
            >
              Ariel Shemesh
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className={`text-xs tracking-[0.2em] uppercase text-center mb-6 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent' 
                  : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#6366f1] bg-clip-text text-transparent'
              } font-medium`}
            >
              Data Analyst · Web Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3 mb-6"
            >
              <div className="flex items-center gap-2 justify-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-purple-500/20' : 'bg-[#244270]/15'
                }`}>
                  <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
                </div>
                <a 
                  href="mailto:arielshemesh1999@gmail.com" 
                  className={`text-xs hover:underline transition-colors ${
                    isDark ? 'text-white/70 hover:text-purple-400' : 'text-[#244270]/80 hover:text-[#244270]'
                  }`}
                >
                  arielshemesh1999@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2 justify-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-purple-500/20' : 'bg-[#244270]/15'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
                </div>
                <span className={`text-xs ${isDark ? 'text-white/70' : 'text-[#244270]/80'}`}>
                  Israel
                </span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              onClick={handleSendMessage}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 text-white hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' 
                  : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] text-white hover:from-[#3da8b8] hover:via-[#4f46e5] hover:to-[#9333ea]'
              } shadow-lg ${isDark ? 'shadow-purple-500/30' : 'shadow-[#4dbdce]/30'} transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={16} />
              Send a Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}