import React from 'react';

export default function AnimatedBackground({ isDark }) {
  return (
    <div className={`fixed inset-0 w-full h-full z-0 ${
      isDark 
        ? 'bg-gradient-to-r from-[#4dbdce] to-[#244270]' 
        : 'bg-gradient-to-r from-[#4dbdce] to-[#244270]'
    }`}>
      {/* Animated circles */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => {
          const sizes = [80, 20, 20, 60, 20, 110, 150, 25, 15, 150];
          const leftPositions = ['25%', '10%', '70%', '40%', '65%', '75%', '35%', '50%', '20%', '85%'];
          const delays = [0, 2, 4, 0, 0, 3, 7, 15, 2, 0];
          const durations = [25, 12, 25, 18, 25, 25, 25, 45, 35, 11];
          
          return (
            <div
              key={i}
              className="absolute block rounded-none opacity-100"
              style={{
                left: leftPositions[i],
                width: `${sizes[i]}px`,
                height: `${sizes[i]}px`,
                bottom: '-150px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                animation: `floatUp ${durations[i]}s linear ${delays[i]}s infinite`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes floatUp {
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