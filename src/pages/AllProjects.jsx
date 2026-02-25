import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Home, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

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
  {
    id: 4,
    title: 'Sales Performance Dashboard',
    description: 'Created an interactive Power BI dashboard analyzing sales trends, customer segmentation, and revenue forecasting using real-time data integration.',
    type: 'Business Intelligence',
    icon: '💼',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Financial Data Analysis with Python',
    description: 'Developed Python scripts to automate financial reporting, perform statistical analysis, and visualize key performance indicators for business stakeholders.',
    type: 'Data Analysis',
    icon: '💰',
    tech: ['Python', 'NumPy', 'Matplotlib', 'Jupyter'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Web Scraping & Data Pipeline',
    description: 'Built an automated data pipeline to scrape, clean, and store market data from multiple sources. Implemented scheduling and error handling for reliability.',
    type: 'Data Engineering',
    icon: '🌐',
    tech: ['Python', 'BeautifulSoup', 'Selenium', 'SQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function AllProjects() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0118]' : 'bg-[#f5f7ff]'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270]'
              } transition-colors`}
            >
              {isDark ? <Sun size={21} /> : <Moon size={21} />}
            </motion.button>

            <Link to={createPageUrl('Home')}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270]'
                } transition-colors`}
              >
                <Home size={21} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-2xl ${
                isDark 
                  ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' 
                  : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30 hover:shadow-lg'
              } backdrop-blur-xl transition-all duration-500`}
            >
              <div className="relative h-40 overflow-hidden">
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-br from-[#244270]/20 to-[#4dbdce]/20'}`} />
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isDark 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-white/80 text-[#244270] border border-[#244270]/20'
                  } backdrop-blur-sm`}>
                    {project.type}
                  </span>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm`}>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-400 hover:to-cyan-400' 
                        : 'bg-[#244270] text-white hover:bg-[#1a3255]'
                    } transition-colors shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${
                      isDark 
                        ? 'bg-white/20 text-white hover:bg-white/30' 
                        : 'bg-[#244270]/20 text-[#244270] hover:bg-[#244270]/30'
                    } transition-colors`}
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
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${
                    isDark 
                      ? 'text-white group-hover:text-cyan-400' 
                      : 'text-[#141225] group-hover:text-[#4dbdce]'
                  }`}>
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
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark 
                          ? 'bg-white/5 text-white/70' 
                          : 'bg-[#244270]/5 text-[#141225]/70'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500' 
                  : 'bg-gradient-to-r from-[#244270] via-[#4dbdce] to-[#244270]'
              } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}