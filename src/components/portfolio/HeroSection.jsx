import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection({ isDark, onNavigate }) {
  const socialLinks = [
    { icon: Mail, href: 'mailto:contact@versifytoken.com', label: 'Email' },
    { icon: Github, href: '#', label: 'Documentation' },
    { icon: Linkedin, href: '#', label: 'Partners' },
  ];

  const handleDownloadCV = () => {
    const cvUrl = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69528804be3196607ce99b1a/ef265248e_SIM_Swap_Security_Paradigm_Shift.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'VT_SIM_Swap_Security.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-cyan-400' : 'text-[#244270]'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              פתרון חדשני לאבטחת זהות דיגיטלית
            </motion.p>

            <motion.h1
              className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#141225]'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'} bg-clip-text text-transparent`}>
                VT - Versify Token
              </span>
            </motion.h1>

            <motion.p
              className={`text-lg md:text-xl mb-8 leading-relaxed ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className={isDark ? 'text-purple-400' : 'text-[#244270]'}>טוקן אימות זהות מתקדם</span> המציע פתרון פורץ דרך לאיום החוזר ההולך ומתרחב של
              <span className={isDark ? 'text-cyan-400' : 'text-[#4dbdce]'}> מתקפת SIM SWAP</span>. 
              הפתרון משלב אימות ביומטרי, זיהוי חיוניות, וחיבור מאובטח ל-API - ומבטיח הגנה מרובת שכבות מפני תקיפות SIM SWAP.
            </motion.p>

            <motion.div
              className="flex gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/10 hover:bg-purple-500/20 text-white border border-purple-500/20 hover:border-purple-500/40' : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270]'} backdrop-blur-sm transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => onNavigate('contact')}
                className={`px-8 py-4 rounded-xl font-semibold text-white ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 hover:from-purple-400 hover:via-cyan-400 hover:to-blue-400' : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] hover:from-[#1a3255] hover:to-[#3da8b8]'} shadow-lg ${isDark ? 'shadow-purple-500/30' : 'shadow-cyan-500/25'} transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                צור קשר
              </motion.button>

              <motion.button
                onClick={handleDownloadCV}
                className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-2 ${isDark ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white hover:from-purple-500/30 hover:to-cyan-500/30 border border-purple-500/30' : 'bg-[#244270]/10 text-[#244270] hover:bg-[#244270]/20 border border-[#244270]/20'} backdrop-blur-sm transition-all duration-300 shadow-lg ${isDark ? 'shadow-purple-500/20' : ''}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} />
                הורד מצגת
              </motion.button>
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

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => onNavigate('education')}
            className={`flex flex-col items-center gap-2 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}