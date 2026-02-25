import React, { useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Code, ChevronLeft, ChevronRight } from 'lucide-react';

const skills = [
  {
    icon: GraduationCap,
    title: 'Academic Degree',
    items: ['(B.A.) in Business Administration', 'Specialization: Information Systems','Dean\'s List honoree for academic excellence', 'Ono Academic College (2023-2026)', 'GPA: 90'],
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: TrendingUp,
    title: 'Volunteer Experience & Mentorship',
    items: ['Mentored students in React, UX/UI, Power BI, and Economics','Personal guidance and empowerment','Volunteer supervisor managing food distribution operations for families in need','High emotional intelligence & sensitivity'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Code,
    title: 'Professional Capabilities',
    items: ['Web Development & User-Centered Interfaces', 'Data Analysis, Visualization & Business Insights', 'Trend Analysis, Pattern Recognition & Forecasting', 'AI agents & intelligent automation'],
    color: 'from-blue-500 to-cyan-500',
  },
];

const EducationSection = memo(({ isDark }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const scroll = useCallback((direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270] bg-clip-text text-transparent'}`}>
            Background
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Academic Background
          </h2>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`luminous-card group relative overflow-hidden rounded-2xl isolate ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white border border-[#244270]/10 hover:border-[#244270]/30 hover:shadow-lg'} backdrop-blur-xl transition-all duration-300`}
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="light-effect">
                <div className="slit"></div>
                <div className="light-glow"></div>
              </div>
              <div className="relative h-32 overflow-hidden">
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110`}>
                    <skill.icon className="text-white" size={28} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                  isDark 
                    ? 'text-white group-hover:text-cyan-400' 
                    : 'text-[#141225] group-hover:text-[#4dbdce]'
                }`}>
                  {skill.title}
                </h3>
                
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#a855f7]'}`} />
                      <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-4 scrollbar-hide scroll-smooth px-4 md:px-16"
            style={{ scrollSnapType: 'x mandatory', scrollPaddingLeft: '1rem' }}
          >
            <div className="flex gap-6 py-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`luminous-card group relative overflow-hidden rounded-2xl isolate ${isDark ? 'bg-black/40 border border-purple-500/20' : 'bg-white border border-[#244270]/10'} backdrop-blur-xl transition-all duration-300 flex-shrink-0 w-80`}
                style={{ scrollSnapAlign: 'center', transform: 'translateZ(0)' }}
              >
                <div className="light-effect">
                  <div className="slit"></div>
                  <div className="light-glow"></div>
                </div>
                <div className="relative h-32 overflow-hidden">
                  {index > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => scroll('left')}
                      className={`flex absolute left-2 bottom-0 z-30 w-10 h-10 items-center justify-center rounded-full ${
                        isDark 
                          ? 'bg-purple-500/40 hover:bg-purple-500/60 text-white border border-purple-500/60' 
                          : 'bg-white/90 hover:bg-white text-[#244270] border border-[#244270]/30'
                      } backdrop-blur-lg transition-all shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft size={20} />
                    </motion.button>
                  )}

                  {index < skills.length - 1 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => scroll('right')}
                      className={`flex absolute right-2 bottom-0 z-30 w-10 h-10 items-center justify-center rounded-full ${
                        isDark 
                          ? 'bg-purple-500/40 hover:bg-purple-500/60 text-white border border-purple-500/60' 
                          : 'bg-white/90 hover:bg-white text-[#244270] border border-[#244270]/30'
                      } backdrop-blur-lg transition-all shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight size={20} />
                    </motion.button>
                  )}
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}>
                      <skill.icon className="text-white" size={28} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    isDark 
                      ? 'text-white group-hover:text-cyan-400' 
                      : 'text-[#141225] group-hover:text-[#4dbdce]'
                  }`}>
                    {skill.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {skill.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#a855f7]'}`} />
                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .luminous-card {
          position: relative;
          contain: layout style paint;
        }

        .light-effect {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          overflow: hidden;
          border-radius: 1rem;
        }

        .luminous-card:hover .light-effect {
          opacity: 1;
        }

        .slit {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 64%;
          height: 1.2rem;
          transform: rotateX(-76deg);
          background: ${isDark ? '#a855f7' : '#4dbdce'};
          box-shadow: 0 0 8px 0 ${isDark ? '#a855f7' : '#4dbdce'};
        }

        .light-glow {
          display: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          cursor: grab;
        }
        .scrollbar-hide:active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

export default EducationSection;