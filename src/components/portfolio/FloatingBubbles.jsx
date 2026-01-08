import React from 'react';

export default function FloatingBubbles({ isDark }) {
  return (
    <div className="bubbles-container">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      
      <style jsx>{`
        .bubbles-container {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }
        
        .circles {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .circles li {
          position: absolute;
          display: block;
          list-style: none;
          background: ${isDark 
            ? 'rgba(168, 85, 247, 0.3)' 
            : 'rgba(77, 189, 206, 0.3)'};
          animation: animate 25s linear infinite;
          bottom: -150px;
        }

        .circles li:nth-child(1) { 
          left: 25%; 
          width: 40px; 
          height: 40px; 
        }
        
        .circles li:nth-child(2) { 
          left: 10%; 
          width: 15px; 
          height: 15px; 
          animation-duration: 12s; 
          animation-delay: 2s; 
        }
        
        .circles li:nth-child(3) { 
          left: 70%; 
          width: 15px; 
          height: 15px; 
          animation-delay: 4s; 
        }
        
        .circles li:nth-child(4) { 
          left: 40%; 
          width: 30px; 
          height: 30px; 
          animation-duration: 18s; 
        }
        
        .circles li:nth-child(5) { 
          left: 65%; 
          width: 15px; 
          height: 15px; 
        }
        
        .circles li:nth-child(6) { 
          left: 75%; 
          width: 50px; 
          height: 50px; 
          animation-delay: 3s; 
        }
        
        .circles li:nth-child(7) { 
          left: 35%; 
          width: 60px; 
          height: 60px; 
          animation-delay: 7s; 
        }
        
        .circles li:nth-child(8) { 
          left: 50%; 
          width: 20px; 
          height: 20px; 
          animation-delay: 15s; 
          animation-duration: 45s; 
        }
        
        .circles li:nth-child(9) { 
          left: 20%; 
          width: 12px; 
          height: 12px; 
          animation-delay: 2s; 
          animation-duration: 35s; 
        }
        
        .circles li:nth-child(10) { 
          left: 85%; 
          width: 60px; 
          height: 60px; 
          animation-duration: 11s; 
        }

        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-500px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
      `}</style>
    </div>
  );
}