import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ activeSection, onNavigate, isDark, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 ${
          isDark 
            ? 'bg-[#141225]/80' 
            : 'bg-white/80'
        } backdrop-blur-lg border-b ${
          isDark ? 'border-white/10' : 'border-[#244270]/10'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`text-2xl ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>{'<'}</span>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
              AS.
            </span>
            <motion.span
              className={`text-xl font-bold ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
            <span className={`text-2xl ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>{'/>'}</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-sm font-medium tracking-wider uppercase transition-colors ${
                  activeSection === item.id
                    ? isDark ? 'text-purple-400' : 'text-[#244270]'
                    : isDark ? 'text-white/70 hover:text-white' : 'text-[#141225]/70 hover:text-[#141225]'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400'
                        : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'
                    }`}
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270]'
              } transition-colors`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'bg-white/10 text-white' 
                  : 'bg-[#244270]/10 text-[#244270]'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isDark ? 'text-white' : 'text-[#141225]'}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`fixed inset-0 z-30 pt-20 ${
              isDark ? 'bg-[#141225]/95' : 'bg-white/95'
            } backdrop-blur-lg md:hidden`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-2xl font-medium ${
                    activeSection === item.id
                      ? isDark ? 'text-cyan-400' : 'text-[#244270]'
                      : isDark ? 'text-white/70' : 'text-[#141225]/70'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}