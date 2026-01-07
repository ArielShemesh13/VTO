import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Code } from 'lucide-react';

export default function EducationSection({ isDark }) {
  const skills = [
    {
      icon: GraduationCap,
      title: 'Academic Degree',
      items: ['BA in Business Administration', 'Specialization: Information Systems', 'Ono Academic College (2023-2026)', 'Focus: Analytical Thinking & Data-Driven Processes'],
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: TrendingUp,
      title: 'Mentorship & Excellence',
      items: ['Mentored students on the autism spectrum', 'High emotional intelligence & sensitivity', 'Personal guidance and empowerment', 'Dean\'s List honoree for academic excellence'],
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Code,
      title: 'Professional Capabilities',
      items: ['Web development & digital interfaces', 'Data analysis & business insights', 'Trend analysis & pattern recognition', 'AI agents & intelligent automation'],
      color: 'from-blue-500 to-cyan-500',
    },
  ];

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

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`luminous-card group relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white border border-[#244270]/10 hover:border-[#244270]/30 hover:shadow-lg'} backdrop-blur-xl transition-all duration-500`}
            >
              <div className="light-effect">
                <div className="slit"></div>
                <div className="light-glow"></div>
              </div>
              <div className="relative h-32 overflow-hidden">
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <skill.icon className="text-white" size={28} />
                  </motion.div>
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

      <style jsx>{`
        .luminous-card {
          position: relative;
        }

        .light-effect {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
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
      `}</style>
    </section>
  );
}