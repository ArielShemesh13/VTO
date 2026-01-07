import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DownloadButton({ isDark, onDownload }) {
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const handleClick = () => {
    if (isActive) return;
    
    setIsActive(true);
    setCounter(0);
    setShowComplete(false);

    // Start counter animation
    const duration = 5000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounter(Math.floor(progress * 100));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setShowComplete(true);
        if (onDownload) onDownload();
        setTimeout(() => {
          setIsActive(false);
          setShowComplete(false);
          setCounter(0);
        }, 1000);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={handleClick}>
      <style>{`
        @keyframes jump {
          0% { transform: translateY(0%); }
          10% { transform: translateY(-180%); }
          18% { width: 40px; height: 40px; }
          20% { transform: translateY(10%); width: 48px; height: 32px; }
          22% { width: 40px; height: 40px; }
          30% { transform: translateY(-90%); }
          38% { width: 40px; height: 40px; }
          40% { transform: translateY(5%); width: 44px; height: 36px; }
          42% { width: 40px; height: 40px; }
          49% { transform: translateY(-40%); }
          57% { transform: translateY(0%); }
          65% { transform: translateY(-10%); }
          70% { transform: translateY(0%); }
        }

        @keyframes struk {
          18% { transform: translateY(0%); }
          20% { transform: translateY(10%); }
          22% { transform: translateY(0%); }
          38% { transform: translateY(0%); }
          40% { transform: translateY(5%); }
          42% { transform: translateY(0%); }
        }

        .ball-animate {
          animation: jump 2s cubic-bezier(0.16, 0.15, 1, 0.49) infinite;
        }

        .svg-animate {
          animation: struk 2s cubic-bezier(0.16, 0.15, 1, 0.49) infinite;
        }
      `}</style>

      <div className="relative text-center w-[182px]">
        {/* Complete Message */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center text-white font-bold text-sm ${
            showComplete ? 'opacity-100 scale-150' : 'opacity-0 scale-190'
          } transition-all duration-300`}
          style={{ pointerEvents: 'none' }}
        >
          Download complete
        </motion.div>

        {/* Ball */}
        {isActive && (
          <div
            className="ball-animate absolute left-0 right-0 mx-auto w-[40px] h-[40px] rounded-full bg-[#e91d62] shadow-[inset_1px_1px_1px_0px_rgba(255,255,255,0.54)]"
            style={{ top: '-26px', display: isActive ? 'block' : 'none' }}
          />
        )}

        {/* SVG Button */}
        <svg
          width="182"
          height="61"
          xmlns="http://www.w3.org/2000/svg"
          className={isActive ? 'svg-animate' : ''}
          style={{ opacity: showComplete ? 0 : 1, transition: 'opacity 0.1s' }}
        >
          <path
            d="m31.048188,4.720621l120.048623,0l0,0c15.726711,0 28.475699,11.640603 28.475699,26.000007c0,14.359399 -12.748994,25.999997 -28.475699,25.999997l-120.048623,0l0,0c-15.726693,0 -28.475699,-11.640598 -28.475699,-25.999997c0,-14.359409 12.749006,-26.000007 28.475699,-26.000007z"
            strokeWidth={isActive ? "9" : "4"}
            stroke="#e91d62"
            fill="none"
            strokeDasharray="411"
            strokeDashoffset={isActive ? "290" : "0"}
            style={{
              transition: isActive ? 'none' : 'all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
            }}
          />
        </svg>

        {/* Counter */}
        {isActive && (
          <div
            className="absolute left-0 right-0 bottom-[20px] mx-auto text-[#e91d62] text-[19px] font-bold"
            style={{ display: isActive && !showComplete ? 'block' : 'none' }}
          >
            {counter}%
          </div>
        )}

        {/* Download Text */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center text-[#e91d62] font-bold text-[13px] uppercase tracking-wide">
            Download
          </div>
        )}
      </div>
    </div>
  );
}