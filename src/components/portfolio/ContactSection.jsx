import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactSection({ isDark }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <div className="flex items-center justify-center gap-6">
            <motion.a
              href="https://github.com/arielSHEMESH1999"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              }`}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/ariel-shemesh-7ba0322a5/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              }`}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="mailto:arielshemesh1999@gmail.com"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              }`}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className={`text-center mt-20 pt-8 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}
        >
          <p className={`text-sm ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            © 2024 Ariel Shemesh. Built with React & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}