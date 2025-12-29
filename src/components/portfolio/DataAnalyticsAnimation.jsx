import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

export default function DataAnalyticsAnimation({ isDark }) {
  const [activeChart, setActiveChart] = useState(0);
  const [dataPoints, setDataPoints] = useState([60, 40, 75, 55]);

  // שינוי גרף כל 3 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChart(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // עדכון נתונים אקראיים
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => prev.map(() => 20 + Math.random() * 70));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const charts = [
    {
      type: 'bar',
      icon: BarChart3,
      render: () => (
        <svg viewBox="0 0 120 80" className="w-full h-full">
          {dataPoints.map((height, i) => (
            <motion.rect
              key={i}
              x={10 + i * 28}
              y={80 - height}
              width="20"
              height={height}
              fill={isDark ? `url(#grad${i})` : '#6366f1'}
              rx="2"
              initial={{ height: 0, y: 80 }}
              animate={{ height, y: 80 - height }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </svg>
      )
    },
    {
      type: 'line',
      icon: TrendingUp,
      render: () => {
        const points = dataPoints.map((y, i) => `${10 + i * 35},${80 - y}`).join(' ');
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            <motion.polyline
              points={points}
              fill="none"
              stroke={isDark ? '#8b5cf6' : '#6366f1'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            {dataPoints.map((y, i) => (
              <motion.circle
                key={i}
                cx={10 + i * 35}
                cy={80 - y}
                r="4"
                fill={isDark ? '#a855f7' : '#818cf8'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </svg>
        );
      }
    },
    {
      type: 'pie',
      icon: PieChart,
      render: () => {
        const total = dataPoints.reduce((sum, val) => sum + val, 0);
        let currentAngle = -90;
        const slices = dataPoints.map((val, i) => {
          const sliceAngle = (val / total) * 360;
          const startAngle = currentAngle;
          currentAngle += sliceAngle;
          return { startAngle, sliceAngle, color: i };
        });

        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            <g transform="translate(60, 40)">
              {slices.map((slice, i) => {
                const start = (slice.startAngle * Math.PI) / 180;
                const end = ((slice.startAngle + slice.sliceAngle) * Math.PI) / 180;
                const x1 = Math.cos(start) * 30;
                const y1 = Math.sin(start) * 30;
                const x2 = Math.cos(end) * 30;
                const y2 = Math.sin(end) * 30;
                const largeArc = slice.sliceAngle > 180 ? 1 : 0;

                return (
                  <motion.path
                    key={i}
                    d={`M 0 0 L ${x1} ${y1} A 30 30 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={isDark ? `url(#grad${i})` : ['#6366f1', '#818cf8', '#a855f7', '#c084fc'][i]}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                  />
                );
              })}
            </g>
          </svg>
        );
      }
    }
  ];

  const floatingIcons = [
    { Icon: BarChart3, delay: 0 },
    { Icon: TrendingUp, delay: 0.2 },
    { Icon: PieChart, delay: 0.4 },
    { Icon: Activity, delay: 0.6 }
  ];

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 130 130" className="w-full h-full">
        <defs>
          {[0, 1, 2, 3].map(i => (
            <linearGradient key={i} id={`grad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? ['#8b5cf6', '#a855f7', '#c084fc', '#e879f9'][i] : '#6366f1'} />
              <stop offset="100%" stopColor={isDark ? ['#7c3aed', '#9333ea', '#a855f7', '#c084fc'][i] : '#4f46e5'} />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* מסגרת חיצונית מעוצבת */}
        <motion.rect
          x="20"
          y="25"
          width="90"
          height="70"
          rx="8"
          fill={isDark ? 'rgba(139, 92, 246, 0.05)' : 'rgba(99, 102, 241, 0.05)'}
          stroke={isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'}
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* רקע לגרף */}
        <rect
          x="25"
          y="30"
          width="80"
          height="60"
          rx="6"
          fill={isDark ? 'rgba(20, 1, 37, 0.6)' : 'rgba(255, 255, 255, 0.8)'}
        />

        {/* הגרף המוצג */}
        <g transform="translate(25, 30)">
          <AnimatePresence mode="wait">
            <motion.g
              key={activeChart}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <foreignObject x="0" y="0" width="80" height="60">
                <div className="w-full h-full flex items-center justify-center">
                  {charts[activeChart].render()}
                </div>
              </foreignObject>
            </motion.g>
          </AnimatePresence>
        </g>

        {/* סמלילים מסביב */}
        {floatingIcons.map(({ Icon }, idx) => {
          const angle = (idx / 4) * Math.PI * 2 - Math.PI / 2;
          const radius = 55;
          const x = 65 + Math.cos(angle) * radius;
          const y = 65 + Math.sin(angle) * radius;
          
          return (
            <motion.g
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: activeChart === (idx % 3) ? 1.2 : 1, 
                opacity: 1 
              }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <circle
                cx={x}
                cy={y}
                r="10"
                fill={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(99, 102, 241, 0.2)'}
                stroke={isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(99, 102, 241, 0.5)'}
                strokeWidth="1.5"
                filter="url(#glow)"
              />
              <foreignObject
                x={x - 8}
                y={y - 8}
                width="16"
                height="16"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Icon 
                    size={12} 
                    className={isDark ? 'text-purple-400' : 'text-indigo-600'}
                  />
                </div>
              </foreignObject>
            </motion.g>
          );
        })}

        {/* נקודות מהבהבות פינתיות */}
        {[
          [30, 35], [100, 35], [30, 85], [100, 85]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill={isDark ? '#8b5cf6' : '#6366f1'}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </svg>

      {/* טקסט מתחת */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold uppercase tracking-wider ${
          isDark ? 'text-purple-400/70' : 'text-indigo-600/80'
        }`}
      >
        Data Insights
      </motion.div>
    </div>
  );
}