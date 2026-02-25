import React, { useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
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

const ProjectsSection = memo(({ isDark }) => {
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
          className="text-center mb-8"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            Featured Projects
          </h2>
          
          <Link to={createPageUrl('AllProjects')}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${
                isDark 
                  ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30' 
                  : 'bg-[#244270]/10 hover:bg-[#244270]/20 text-[#244270] border border-[#244270]/20'
              } backdrop-blur-sm transition-all mt-4`}
            >
              <LayoutGrid size={20} />
              <span className="font-medium">View All Projects</span>
            </motion.button>
          </Link>
        </motion.div>

        <div className="hidden md:block relative">
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll('left')}
              className={`absolute -left-5 top-40 z-30 w-10 h-10 flex items-center justify-center rounded-full ${
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

          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll('right')}
              className={`absolute -right-5 top-40 z-30 w-10 h-10 flex items-center justify-center rounded-full ${
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

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-4 scrollbar-hide scroll-smooth px-4 md:px-16" 
            style={{ scrollSnapType: 'x proximity' }}
          >
            <div className="flex gap-6 py-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30'} backdrop-blur-xl transition-all duration-500 flex-shrink-0 w-80`}
                  style={{ scrollSnapAlign: 'center' }}
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
        </div>

        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-4 scrollbar-hide scroll-smooth px-4 md:px-16" 
            style={{ scrollSnapType: 'x mandatory', scrollPaddingLeft: '1rem' }}
          >
            <div className="flex gap-6 py-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-black/40 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white/60 border border-[#244270]/10 hover:border-[#244270]/30'} backdrop-blur-xl transition-all duration-500 flex-shrink-0 w-80`}
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="relative h-40 overflow-hidden">
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

                   {index < projects.length - 1 && (
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
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;