import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Home, DollarSign, Globe, Building2 } from 'lucide-react';

const NEWS_CATEGORIES = [
  {
    title: "נדל\"ן",
    icon: Home,
    color: "#ff6b6b",
    headlines: [
      "מחירי הדיור בישראל עולים ב-8.5% לעומת אשתקד",
      "השקעות זרות בנדל\"ן מסחרי גדלות ב-12%",
      "פרויקטים חדשים בתל אביב - 3,000 יח\"ד חדשות"
    ]
  },
  {
    title: "כלכלת ישראל",
    icon: Building2,
    color: "#4ecdc4",
    headlines: [
      "צמיחה של 3.2% במשק בשנה האחרונה",
      "ירידה בשיעור האבטלה ל-3.8%",
      "יצוא ההייטק מגיע לשיא של $73B"
    ]
  },
  {
    title: "כלכלת ארה\"ב",
    icon: DollarSign,
    color: "#95e1d3",
    headlines: [
      "הפד מעלה ריבית ב-0.25% - 5.5% כולל",
      "אינפלציה יורדת ל-3.2% במדד השנתי",
      "שוק המניות: S&P 500 עולה 15% השנה"
    ]
  },
  {
    title: "כלכלה עולמית",
    icon: Globe,
    color: "#f38181",
    headlines: [
      "IMF צופה צמיחה של 3% בכלכלה העולמית",
      "סחר בין-לאומי מתאושש אחרי השפל",
      "השקעות ירוקות מגיעות ל-$2T בשנה"
    ]
  },
  {
    title: "רוסיה וסין",
    icon: TrendingUp,
    color: "#ffa726",
    headlines: [
      "סין: צמיחה של 5.2% ברבעון השלישי",
      "רוסיה מעמיקה קשרי סחר עם אסיה",
      "שיתוף פעולה כלכלי סין-רוסיה מתרחב"
    ]
  }
];

export default function EconomicNewsCarousel({ isDark }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const canvasRef = useRef(null);

  // Starfield background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const stars = [];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      stars.length = 0;
      for (let i = 0; i < 60; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: 0.3 + Math.random() * 0.7
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 4;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  // Auto-rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % NEWS_CATEGORIES[activeIndex].headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + NEWS_CATEGORIES.length) % NEWS_CATEGORIES.length);
    setHeadlineIndex(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % NEWS_CATEGORIES.length);
    setHeadlineIndex(0);
  };

  const activeCategory = NEWS_CATEGORIES[activeIndex];
  const Icon = activeCategory.icon;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '384px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: isDark ? 'linear-gradient(135deg, #0a1a2f 0%, #1a1a3f 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
    }}>
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
      }}>
        {/* Category Cards */}
        <div style={{
          position: 'relative',
          perspective: '1000px',
          height: '280px',
          marginBottom: '2rem',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: `2px solid ${activeCategory.color}`,
                boxShadow: `0 0 40px ${activeCategory.color}40, 0 8px 32px rgba(0, 0, 0, 0.4)`,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: `linear-gradient(135deg, ${activeCategory.color}40, ${activeCategory.color}60)`,
                  borderRadius: '50%',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  boxShadow: `0 0 30px ${activeCategory.color}`,
                }}
              >
                <Icon size={48} style={{ color: activeCategory.color }} />
              </motion.div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textShadow: `0 0 20px ${activeCategory.color}`,
              }}>
                {activeCategory.title}
              </h3>

              {/* Headline Ticker */}
              <div style={{
                width: '100%',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={headlineIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      textAlign: 'center',
                      lineHeight: '1.6',
                      padding: '0 1rem',
                    }}
                  >
                    {activeCategory.headlines[headlineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress Dots */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '1rem',
              }}>
                {activeCategory.headlines.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: idx === headlineIndex 
                        ? activeCategory.color 
                        : 'rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s',
                      boxShadow: idx === headlineIndex 
                        ? `0 0 10px ${activeCategory.color}` 
                        : 'none',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}>
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <ChevronLeft size={28} />
          </motion.button>

          {/* Category Dots */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {NEWS_CATEGORIES.map((cat, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setHeadlineIndex(0);
                }}
                whileHover={{ scale: 1.2 }}
                style={{
                  width: idx === activeIndex ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background: idx === activeIndex ? cat.color : 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: idx === activeIndex ? `0 0 15px ${cat.color}` : 'none',
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}