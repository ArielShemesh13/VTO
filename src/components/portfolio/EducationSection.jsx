import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Database, TrendingUp, Code } from 'lucide-react';

export default function EducationSection({ isDark }) {
  const [activeCards, setActiveCards] = useState([false, false, false]);

  const toggleCard = (index) => {
    setActiveCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-16">
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
                className={`luminous-education-card group relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white border border-[#244270]/10 hover:border-[#244270]/30 hover:shadow-lg'} backdrop-blur-xl transition-all duration-500 ${activeCards[index] ? 'active' : ''}`}
              >
                <div className="light-layer">
                  <div className="slit"></div>
                  <div className="lumen">
                    <div className="min"></div>
                    <div className="mid"></div>
                    <div className="hi"></div>
                  </div>
                  <div className="darken">
                    <div className="sl"></div>
                    <div className="ll"></div>
                    <div className="slt"></div>
                    <div className="srt"></div>
                  </div>
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
                    {skill.items.map((item, itemIndex) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-400 to-cyan-400' : 'bg-gradient-to-r from-[#4dbdce] to-[#a855f7]'}`} />
                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270]'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div 
                  className="light-toggle"
                  onClick={() => toggleCard(index)}
                >
                  <div className="toggle-handle"></div>
                </div>
                </motion.div>
                ))}
                </div>

                <style jsx>{`
                .luminous-education-card {
                position: relative;
                }

                .light-layer {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                transform-style: preserve-3d;
                perspective: 400px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.4s ease-in-out;
                }

                .luminous-education-card.active .light-layer {
                opacity: 1;
                }

                .slit {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 64%;
                height: 1.2rem;
                transform: rotateX(-76deg);
                background: ${isDark ? '#121212' : '#1a1a1a'};
                box-shadow: 0 0 4px 0 transparent;
                transition: all 0.4s ease-in-out;
                }

                .luminous-education-card.active .slit {
                background: ${isDark ? '#a855f7' : '#4dbdce'};
                box-shadow: 0 0 8px 0 ${isDark ? '#a855f7' : '#4dbdce'};
                }

                .lumen {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 100%;
                height: 100%;
                pointer-events: none;
                perspective: 400px;
                }

                .min {
                width: 70%;
                height: 3rem;
                background: linear-gradient(transparent, ${isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(77, 189, 206, 0.6)'});
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 2.5rem;
                margin: auto;
                transform: rotateX(-42deg);
                opacity: 0.4;
                }

                .mid {
                width: 74%;
                height: 13rem;
                background: linear-gradient(transparent, ${isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(77, 189, 206, 0.6)'});
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 10em;
                margin: auto;
                transform: rotateX(-42deg);
                filter: blur(1rem);
                opacity: 0.8;
                border-radius: 100% 100% 0 0;
                }

                .hi {
                width: 50%;
                height: 13rem;
                background: linear-gradient(transparent, ${isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(77, 189, 206, 0.6)'});
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 12em;
                margin: auto;
                transform: rotateX(22deg);
                filter: blur(1rem);
                opacity: 0.6;
                border-radius: 100% 100% 0 0;
                }

                .darken {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 100%;
                height: 100%;
                pointer-events: none;
                perspective: 400px;
                opacity: 0.5;
                }

                .darken > * {
                transition: opacity 0.4s ease-in-out;
                }

                .luminous-education-card.active .darken {
                opacity: 0.8;
                }

                .sl {
                width: 64%;
                height: 10rem;
                background: linear-gradient(rgba(0,0,0,0.8), transparent);
                position: absolute;
                left: 0;
                right: 0;
                top: 9.6em;
                bottom: 0;
                margin: auto;
                filter: blur(0.2rem);
                opacity: 0.1;
                border-radius: 0 0 100% 100%;
                transform: rotateX(-22deg);
                }

                .luminous-education-card.active .sl {
                opacity: 0.2;
                }

                .ll {
                width: 62%;
                height: 10rem;
                background: linear-gradient(rgba(0,0,0,0.6), transparent);
                position: absolute;
                left: 0;
                right: 0;
                top: 11em;
                bottom: 0;
                margin: auto;
                filter: blur(0.8rem);
                opacity: 0.4;
                border-radius: 0 0 100% 100%;
                transform: rotateX(22deg);
                }

                .luminous-education-card.active .ll {
                opacity: 1;
                }

                .slt {
                width: 0.5rem;
                height: 4rem;
                background: linear-gradient(rgba(0,0,0,0.3), transparent);
                position: absolute;
                left: 0;
                right: 11.5rem;
                top: 3.9em;
                bottom: 0;
                margin: auto;
                opacity: 0.6;
                border-radius: 0 0 100% 100%;
                transform: skewY(42deg);
                }

                .luminous-education-card.active .slt {
                opacity: 1;
                }

                .srt {
                width: 0.5rem;
                height: 4rem;
                background: linear-gradient(rgba(0,0,0,0.3), transparent);
                position: absolute;
                right: 0;
                left: 11.5rem;
                top: 3.9em;
                bottom: 0;
                margin: auto;
                opacity: 0.6;
                border-radius: 0 0 100% 100%;
                transform: skewY(-42deg);
                }

                .luminous-education-card.active .srt {
                opacity: 1;
                }

                .light-toggle {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                height: 2rem;
                width: 3.5rem;
                border-radius: 0.5rem;
                background: rgba(0, 0, 0, 0.3);
                box-shadow: inset 0 -4px 4px 0.15rem rgba(0,0,0,0.2), 
                          inset 0 0 1px 0.15rem ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(77, 189, 206, 0.3)'},
                          inset 0 -1px 1px 0.15rem rgba(255,255,255,0.05);
                cursor: pointer;
                transition: all 0.4s ease-in-out;
                z-index: 10;
                }

                .light-toggle::before {
                content: "";
                display: block;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 2.5rem;
                height: 0.5rem;
                border-radius: 0.2rem;
                background: rgba(0, 0, 0, 0.5);
                transition: all 0.4s ease-in-out;
                }

                .toggle-handle {
                position: absolute;
                top: 0;
                bottom: 0.04rem;
                margin: auto;
                left: 0.5rem;
                width: 40%;
                height: 30%;
                background: ${isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(77, 189, 206, 0.5)'};
                border-radius: 0.2rem;
                box-shadow: inset 0 1px 2px 0 rgba(255,255,255,0.3),
                          inset 0 -1px 1px 0 rgba(0,0,0,0.3),
                          0 0 1px 1px rgba(0,0,0,0.2),
                          1px 2px 4px 1px rgba(0,0,0,0.3);
                transition: all 0.4s ease-in-out;
                }

                .luminous-education-card.active .toggle-handle {
                transform: translateX(1.2rem);
                background: ${isDark ? '#a855f7' : '#4dbdce'};
                box-shadow: inset 0 1px 6px 0 rgba(255,255,255,0.5),
                          inset 0 -1px 1px 0 rgba(255,255,255,0.3),
                          0 0 2px 1px rgba(0,0,0,0.3),
                          1px 2px 4px 1px rgba(0,0,0,0.2);
                }

                .luminous-education-card.active .light-toggle::before {
                background: ${isDark ? 'rgba(168, 85, 247, 0.8)' : 'rgba(77, 189, 206, 0.8)'};
                box-shadow: 0 0 0.3rem 0.1rem ${isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(77, 189, 206, 0.5)'};
                }

                .light-toggle:hover:not(.luminous-education-card.active .light-toggle) .toggle-handle {
                transform: translateX(0.15rem);
                }
                `}</style>
        </motion.div>
      </div>
    </section>
  );
}