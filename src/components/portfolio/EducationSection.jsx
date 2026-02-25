import React, { useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    icon: '🎓',
    title: 'Academic Degree',
    items: ['(B.A.) in Business Administration', 'Specialization: Information Systems','Dean\'s List honoree for academic excellence', 'Ono Academic College (2023-2026)', 'GPA: 90'],
    type: 'Education',
  },
  {
    icon: '💻',
    title: 'Professional Capabilities',
    items: ['Web Development & User-Centered Interfaces', 'Data Analysis, Visualization & Business Insights', 'Trend Analysis, Pattern Recognition & Forecasting', 'AI agents & intelligent automation'],
    type: 'Technical Skills',
  },
  {
    icon: '📈',
    title: 'Volunteer Experience & Mentorship',
    items: ['Mentored students in React, UX/UI, Power BI, and Economics','Personal guidance and empowerment','Volunteer supervisor managing food distribution operations for families in need','High emotional intelligence & sensitivity'],
    type: 'Leadership',
  },
];

const EducationSection = memo(({ isDark }) => {
  const scrollContainerRef = useRef(null);

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
              className={`relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20' : 'bg-white/60 border border-[#244270]/10'} backdrop-blur-xl`}
            >
              <div className="relative h-40 overflow-hidden">
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-8xl opacity-10 ${isDark ? 'text-white' : 'text-[#244270]'}`}>
                    {skill.icon}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                  {skill.title}
                </h3>
                
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#a855f7]'}`} />
                      <span className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
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
                className={`relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20' : 'bg-white/60 border border-[#244270]/10'} backdrop-blur-xl flex-shrink-0 w-[65vw] max-w-sm`}
                style={{ scrollSnapAlign: 'center', willChange: 'transform' }}
              >
                <div className="relative h-40 overflow-hidden">
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-8xl opacity-10 ${isDark ? 'text-white' : 'text-[#244270]'}`}>
                      {skill.icon}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                    {skill.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {skill.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#a855f7]'}`} />
                        <span className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
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