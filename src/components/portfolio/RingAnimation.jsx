import React from 'react';

export default function RingAnimation({ isDark }) {
  return (
    <div className="ring-container">
      <div className="ring ring-1"></div>
      <div className="ring ring-2"></div>
      
      <style jsx>{`
        .ring-container {
          position: relative;
          font-size: 1.5vw;
          perspective: 10em;
          transform-style: preserve-3d;
          width: 10em;
          height: 10em;
          flex-shrink: 0;
        }
        
        .ring {
          position: absolute;
          transform-style: preserve-3d;
          animation: ringmove 1s infinite linear;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          top: 0;
          left: 0;
        }
        
        .ring-1 {
          border: solid 1em ${isDark ? 'hsl(260deg, 100%, 60%)' : 'hsl(195deg, 75%, 55%)'};
          margin-top: -3em;
        }
        
        .ring-2 {
          border: solid 1em ${isDark ? 'hsl(190deg, 100%, 60%)' : 'hsl(250deg, 75%, 65%)'};
          margin-top: 3em;
          animation-delay: -0.5s;
        }
        
        @keyframes ringmove {
          0% {
            transform: rotateX(90deg) rotateZ(0deg) rotateX(30deg);
          }
          100% {
            transform: rotateX(90deg) rotateZ(360deg) rotateX(30deg);
          }
        }
      `}</style>
    </div>
  );
}