import React from 'react';
import { motion } from 'framer-motion';
import ChatBot from './ChatBot';

export default function ChatSection({ isDark }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270] bg-clip-text text-transparent'}`}>
            Get In Touch
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Let's Connect
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
            Looking for an entry-level data analyst? I'm actively seeking opportunities to bring fresh thinking, 
            motivation, and a strong work ethic to a data-driven environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <ChatBot isDark={isDark} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`text-center mt-20 pt-8 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}
        >
          <p className={`text-sm ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
            © {new Date().getFullYear()} Ariel Shemesh. Built with React & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}