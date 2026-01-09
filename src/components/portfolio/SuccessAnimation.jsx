import React from 'react';
import { motion } from 'framer-motion';

export default function SuccessAnimation({ isDark }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center py-12"
    >
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
        isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
      }`}>
        <svg 
          className={`w-10 h-10 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-[#141225]'}`}>
        Message sent successfully!
      </p>
      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
        I'll get back to you soon.
      </p>
    </motion.div>
  );
}