import React from 'react';

export default function AnimatedBackground({ isDark }) {
  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden z-0 transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0a0118] via-[#160b2e] to-[#0d0221]' 
        : 'bg-gradient-to-br from-[#f0f4ff] via-[#e5e7ff] to-[#d5d9ff]'
    }`}>
      <ul className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => {
          const sizes = [80, 20, 20, 60, 20, 110, 150, 25, 15, 150];
          const lefts = [25, 10, 70, 40, 65, 75, 35, 50, 20, 85];
          const durations = [25, 12, 25, 18, 25, 25, 25, 45, 35, 11];
          const delays = [0, 2, 4, 0, 0, 3, 7, 15, 2, 0];
          
          return (
            <li
              key={i}
              className={`absolute block list-none rounded-full ${
                isDark ? 'bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-br from-purple-400/15 via-cyan-400/15 to-blue-400/15'
              }`}
              style={{
                left: `${lefts[i]}%`,
                width: `${sizes[i]}px`,
                height: `${sizes[i]}px`,
                bottom: '-150px',
                animation: `float ${durations[i]}s linear infinite`,
                animationDelay: `${delays[i]}s`,
              }}
            />
          );
        })}
      </ul>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
      `}</style>
    </div>
  );
}