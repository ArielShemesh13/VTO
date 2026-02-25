import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';
import AnimatedBackground from '../components/portfolio/AnimatedBackground';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import EducationSection from '../components/portfolio/EducationSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
const sections = ['hero', 'education', 'projects'];

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${
      isDark ? 'bg-[#0a0118]' : 'bg-gradient-to-br from-[#f5f7ff] to-[#e8ebff]'
    } transition-colors duration-500`}>
      <AnimatedBackground isDark={isDark} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <Navigation 
          activeSection={activeSection}
          onNavigate={navigateToSection}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        <div id="hero">
          <HeroSection isDark={isDark} onNavigate={navigateToSection} />
        </div>

        <div id="education">
          <EducationSection isDark={isDark} />
        </div>
        
        <div id="projects">
          <ProjectsSection isDark={isDark} />
        </div>

        <motion.section 
          className="relative min-h-[40vh] flex items-center justify-center px-6 py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto w-full text-center">
            <p className={`text-sm tracking-[0.3em] uppercase mb-8 ${isDark ? 'text-purple-400' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270] bg-clip-text text-transparent'}`}>
              Let's Connect
            </p>
            
            <div className="flex items-center justify-center gap-6">
              <motion.a
                href="https://www.linkedin.com/in/ariel-shemesh-7ba0322a5/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20' 
                    : 'bg-white/40 hover:bg-white/60 text-[#244270] border border-white/60 hover:border-[#244270]/50 hover:shadow-lg hover:shadow-[#244270]/20'
                }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="https://github.com/arielSHEMESH1999"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20' 
                    : 'bg-white/40 hover:bg-white/60 text-[#244270] border border-white/60 hover:border-[#244270]/50 hover:shadow-lg hover:shadow-[#244270]/20'
                }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href="mailto:arielshemesh1999@gmail.com"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20' 
                    : 'bg-white/40 hover:bg-white/60 text-[#244270] border border-white/60 hover:border-[#244270]/50 hover:shadow-lg hover:shadow-[#244270]/20'
                }`}
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`mt-16 pt-8 border-t ${isDark ? 'border-white/10' : 'border-[#244270]/10'}`}
            >
              <p className={`text-sm ${isDark ? 'text-white/40' : 'text-[#141225]/40'}`}>
                © 2024 Ariel Shemesh. Built with React & Framer Motion.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDark ? '#0a0118' : '#f5f7ff'};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(99, 102, 241, 0.3)'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(99, 102, 241, 0.5)'};
        }

        ::selection {
          background: ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(139, 92, 246, 0.25)'};
          color: ${isDark ? '#ffffff' : '#1e1b4b'};
        }
      `}</style>
    </div>
  );
}