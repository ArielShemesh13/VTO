import React, { useState, useEffect } from 'react';

export default function Clock3D({ isDark }) {
  const [digits, setDigits] = useState(['0', '0', '0', '0', '0', '0']);

  useEffect(() => {
    const update = () => {
      const time = new Date();
      let hr = time.getHours();
      let min = time.getMinutes();
      let sec = time.getSeconds();

      // prepend 0s to single digits
      if (hr < 10) hr = "0" + hr;
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;

      const timeStr = `${hr}${min}${sec}`;
      setDigits(timeStr.split(''));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = 94;

  return (
    <div className="clock-container" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '384px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <style>{`
        .clock-wrapper {
          animation: clock-bounce 2s cubic-bezier(.4,.1,.6,.9) infinite;
          display: flex;
          margin: auto;
          overflow: hidden;
          width: 27em;
          height: 10em;
          perspective: 800px;
        }
        .clock-surface {
          animation: clock-tilt 2s -1.5s cubic-bezier(.4,.1,.6,.9) infinite;
          display: block;
          width: 27em;
          height: 1em;
          margin: auto;
          transform: translateY(5em) rotateX(105deg) rotateZ(0deg);
          transform-style: preserve-3d;
        }
        .clock-digit {
          position: absolute;
        }
        .clock-block {
          position: absolute;
          bottom: 0;
          transform-style: preserve-3d;
        }
        .block-outer {
          position: relative;
          width: 1em;
          transition: transform 0.3s;
          transform-style: preserve-3d;
        }
        .block-inner {
          position: relative;
          width: 1em;
          transform: rotateX(-90deg) translateZ(1em);
          transform-style: preserve-3d;
        }
        .block-face {
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          position: absolute;
          width: 1em;
          height: 1em;
          background-color: ${isDark ? '#74d447' : '#4dbdce'};
        }
        .block-face.bottom {
          transform: rotateX(-90deg) translateY(-0.8em) translateZ(0.8em);
          width: 0.8em;
          height: 0.8em;
        }
        .block-face.front {
          transform: translateZ(0.8em);
          width: 0.8em;
          height: 0.8em;
        }
        .block-face.left {
          transform-origin: center left;
          transform: rotateY(270deg) translateX(-1em);
          width: 0.8em;
          height: 0.8em;
        }
        .block-face.right {
          transform-origin: top right;
          transform: rotateY(-270deg) translate3d(1em, 0, -0.2em);
          width: 0.8em;
          height: 0.8em;
        }
        .block-face::before {
          content: "";
          width: 100%;
          height: 100%;
          background-color: #000;
          opacity: 0.2;
        }
        .block-face.left::before,
        .block-face.right::before {
          opacity: 0.4;
        }
        @keyframes clock-bounce {
          from, 50%, to { transform: translateY(0); }
          25%, 75% { transform: translateY(10px); }
        }
        @keyframes clock-tilt {
          from, to { transform: translateY(5em) rotateX(105deg) rotateZ(-7deg); }
          50% { transform: translateY(5em) rotateX(105deg) rotateZ(7deg); }
        }
      `}</style>
      
      <div className="clock-wrapper" style={{ fontSize: '20px' }}>
        {digits.map((digit, i) => (
          <div key={i} className={`clock-digit _${digit}`} />
        ))}
        
        <div className="clock-surface">
          {Array.from({ length: blocks }).map((_, i) => {
            const blockPositions = [
              // Hour tens
              [1,5], [2,5], [3,5], [1,4], [2,4], [3,4], [1,3], [2,3], [3,3], [1,2], [2,2], [3,2], [1,1], [2,1], [3,1],
              // Hour ones
              [5,5], [6,5], [7,5], [5,4], [6,4], [7,4], [5,3], [6,3], [7,3], [5,2], [6,2], [7,2], [5,1], [6,1], [7,1],
              // Colon
              [9,4], [9,2],
              // Minute tens
              [11,5], [12,5], [13,5], [11,4], [12,4], [13,4], [11,3], [12,3], [13,3], [11,2], [12,2], [13,2], [11,1], [12,1], [13,1],
              // Minute ones
              [15,5], [16,5], [17,5], [15,4], [16,4], [17,4], [15,3], [16,3], [17,3], [15,2], [16,2], [17,2], [15,1], [16,1], [17,1],
              // Colon
              [19,4], [19,2],
              // Second tens
              [21,5], [22,5], [23,5], [21,4], [22,4], [23,4], [21,3], [22,3], [23,3], [21,2], [22,2], [23,2], [21,1], [22,1], [23,1],
              // Second ones
              [25,5], [26,5], [27,5], [25,4], [26,4], [27,4], [25,3], [26,3], [27,3], [25,2], [26,2], [27,2], [25,1], [26,1], [27,1]
            ];
            
            const [x, z] = blockPositions[i] || [0, 0];
            const w = 0.8;
            const g = (1 - w) / 2;
            
            return (
              <div
                key={i}
                className={`clock-block b${i + 1}`}
                style={{
                  transform: `translate3d(${(x + g - 1)}em, ${-(1 + g) - (w - 1)}em, ${z + g + (w - 1)}em)`
                }}
              >
                <div 
                  className="block-outer"
                  style={{
                    transform: getBlockTransform(i + 1, digits)
                  }}
                >
                  <div className="block-inner">
                    <div className="block-face bottom" />
                    <div className="block-face front" />
                    <div className="block-face left" />
                    <div className="block-face right" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getBlockTransform(blockNum, digits) {
  const digitClasses = digits.map(d => `_${d}`);
  
  // Map block numbers to digit segments
  const getMove = (digitIndex, blockInDigit) => {
    const digit = digits[digitIndex];
    const step = 15 * digitIndex + (digitIndex > 4 ? 4 : digitIndex > 2 ? 2 : 0);
    const b = blockNum - step;
    
    if (b < 1 || b > 15) return null;
    
    const moves = {
      '0': {
        5: [-1, 0], 8: [-1, 0], 11: [-1, 0]
      },
      '1': {
        1: [2, 0], 4: [2, 0], 7: [2, 0], 10: [2, 0], 13: [2, 0],
        2: [1, 0], 5: [1, 0], 8: [1, 0], 11: [1, 0], 14: [1, 0]
      },
      '2': {
        4: [2, 0], 5: [1, 0], 11: [-1, 0], 12: [-2, 0]
      },
      '3': {
        4: [2, 0], 10: [2, 0], 5: [1, 0], 11: [1, 0]
      },
      '4': {
        2: [-1, 0], 5: [-1, 0], 10: [2, 0], 13: [2, 0], 11: [1, 0], 14: [1, 0]
      },
      '5': {
        5: [-1, 0], 6: [-2, 0], 10: [2, 0], 11: [1, 0]
      },
      '6': {
        5: [-1, 0], 6: [-2, 0], 11: [1, 0]
      },
      '7': {
        4: [2, 0], 7: [2, 0], 10: [2, 0], 13: [2, 0],
        5: [1, 0], 8: [1, 0], 11: [1, 0], 14: [1, 0]
      },
      '8': {
        5: [1, 0], 11: [1, 0]
      },
      '9': {
        5: [1, 0], 11: [1, 0], 10: [2, 0]
      }
    };
    
    if (digitIndex === 0 || digitIndex === 2 || digitIndex === 4) {
      if (digit > '1' || (moves[digit] && moves[digit][b])) {
        const move = moves[digit]?.[b];
        if (move) return `translate3d(${move[0]}em, 0, ${move[1]}em)`;
      }
    } else {
      if (moves[digit]?.[b]) {
        const move = moves[digit][b];
        return `translate3d(${move[0]}em, 0, ${move[1]}em)`;
      }
    }
    
    return null;
  };
  
  for (let i = 0; i < 6; i++) {
    const transform = getMove(i, blockNum);
    if (transform) return transform;
  }
  
  return 'translate3d(0, 0, 0)';
}