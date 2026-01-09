import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/portfolio/AnimatedBackground';
import IntroAnimation from '../components/portfolio/IntroAnimation';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import EducationSection from '../components/portfolio/EducationSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';

import ContactSection from '../components/portfolio/ContactSection';


const sections = ['hero', 'education', 'projects', 'contact'];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

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

    if (!showIntro) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showIntro]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${
      isDark ? 'bg-[#0a0118]' : 'bg-gradient-to-br from-[#f5f7ff] to-[#e8ebff]'
    } transition-colors duration-500`}>
      <AnimatedBackground isDark={isDark} />
      
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} isDark={isDark} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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

            <div id="contact">
              <ContactSection isDark={isDark} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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