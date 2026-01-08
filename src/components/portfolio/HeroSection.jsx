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
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className={`relative p-8 md:p-10 rounded-3xl backdrop-blur-xl ${
              isDark 
                ? 'bg-black/40 border border-white/10' 
                : 'bg-white/80 border border-[#244270]/20 shadow-xl'
            } max-w-md w-full`}>
              {/* Gradient glow effect */}
              <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-20 -z-10 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' 
                  : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7]'
              }`} />

              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className={`relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 ${
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

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`text-3xl md:text-4xl font-bold text-center mb-2 ${
                  isDark ? 'text-white' : 'text-[#141225]'
                }`}
              >
                Ariel Shemesh
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className={`text-sm tracking-[0.2em] uppercase text-center mb-8 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#6366f1] bg-clip-text text-transparent'
                } font-medium`}
              >
                Data Analyst · Web Developer
              </motion.p>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 mb-8"
              >
                <div className="flex items-center gap-3 justify-center">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-purple-500/20' : 'bg-[#244270]/15'
                  }`}>
                    <Mail className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
                  </div>
                  <a 
                    href="mailto:arielshemesh1999@gmail.com" 
                    className={`text-sm hover:underline transition-colors ${
                      isDark ? 'text-white/70 hover:text-purple-400' : 'text-[#244270]/80 hover:text-[#244270]'
                    }`}
                  >
                    arielshemesh1999@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 justify-center">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-purple-500/20' : 'bg-[#244270]/15'
                  }`}>
                    <MapPin className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#244270]/80'}`}>
                    Israel
                  </span>
                </div>
              </motion.div>

              {/* Send Message Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                onClick={handleSendMessage}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 text-white hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' 
                    : 'bg-gradient-to-r from-[#4dbdce] via-[#6366f1] to-[#a855f7] text-white hover:from-[#3da8b8] hover:via-[#4f46e5] hover:to-[#9333ea]'
                } shadow-lg ${isDark ? 'shadow-purple-500/30' : 'shadow-[#4dbdce]/30'} transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                Send a Message
              </motion.button>
            </div>
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