import React from 'react';

export default function CubeGrid({ isDark }) {
  return (
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
      
      <style jsx>{`
        .sk-cube-grid {
          width: 60px;
          height: 60px;
          margin: 0 auto;
          flex-shrink: 0;
        }

        .sk-cube-grid .sk-cube {
          width: 33%;
          height: 33%;
          background: ${isDark 
            ? 'linear-gradient(145deg, #a855f7, #06b6d4)' 
            : 'linear-gradient(145deg, #4dbdce, #6366f1)'};
          float: left;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
        }

        .sk-cube-grid [class^="sk-cube"] {
          animation-delay: 0.2s;
        }

        .sk-cube-grid .sk-cube2 { animation-delay: 0.3s; }
        .sk-cube-grid .sk-cube3 { animation-delay: 0.4s; }
        .sk-cube-grid .sk-cube4 { animation-delay: 0.1s; }
        .sk-cube-grid .sk-cube6 { animation-delay: 0.3s; }
        .sk-cube-grid .sk-cube7 { animation-delay: 0s; }
        .sk-cube-grid .sk-cube8 { animation-delay: 0.1s; }
        .sk-cube-grid .sk-cube9 { animation-delay: 0.2s; }

        @keyframes sk-cubeGridScaleDelay {
          0%, 70%, 100% { transform: scale3D(1, 1, 1); }
          35% { transform: scale3D(0, 0, 1); }
        }
      `}</style>
    </div>
  );
}