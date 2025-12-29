import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Excel & Azure Integration',
    description: 'Utilized advanced Excel features (Macros, Solver, Goal Seek) and Azure decision trees to analyze company data and generate actionable insights.',
    type: 'Data Analysis',
    icon: '📊',
    tech: ['Excel', 'VBA', 'Macros', 'Azure', 'Solver'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'SQL Database Modeling & Business Queries',
    description: 'Designed an ERD model, built relational tables in Microsoft Access, and developed complex SQL queries and subqueries to analyze company data.',
    type: 'Database Design',
    icon: '🗄️',
    tech: ['SQL', 'ERD', 'Microsoft Access', 'Database Design'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'End-to-End Data Analysis (Kaggle Project)',
    description: 'Performed comprehensive analysis of a Kaggle dataset. Processed and cleaned data using Python (Pandas), built an interactive Power BI dashboard, and validated with Excel.',
    type: 'Business Intelligence',
    icon: '📈',
    tech: ['Python', 'Pandas', 'Power BI', 'Excel', 'Kaggle'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function ProjectsSection({ isDark }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`}>
            My Work
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Featured{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'} bg-clip-text text-transparent`}>
              Projects
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
            A showcase of data analysis and business intelligence projects demonstrating
            my ability to extract insights from complex datasets and create actionable solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30'} backdrop-blur-xl transition-all duration-500`}
            >
              <div className="relative h-40 overflow-hidden">
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/80 text-[#244270] border border-[#244270]/20'} backdrop-blur-sm`}>
                    {project.type}
                  </span>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm`}>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-400 hover:to-cyan-400' : 'bg-[#244270] text-white hover:bg-[#1a3255]'} transition-colors shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${isDark ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-[#244270]/20 text-[#244270] hover:bg-[#244270]/30'} transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                  </motion.a>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-8xl opacity-10 ${isDark ? 'text-white' : 'text-[#244270]'}`}>
                    {project.icon}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                    {project.title}
                  </h3>
                  <motion.div
                    className={`${isDark ? 'text-cyan-400' : 'text-[#244270]'} opacity-0 group-hover:opacity-100 transition-opacity`}
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
                
                <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/5 text-white/70' : 'bg-[#244270]/5 text-[#141225]/70'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 ${isDark ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270]'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}