import React, { useState } from 'react';

export default function LuminousCard({ isDark }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="luminous-card-wrapper">
      <div className={`card ${isActive ? 'active' : ''}`}>
        <div className="light-layer">
          <div className="slit"></div>
          <div className="lumen">
            <div className="min"></div>
            <div className="mid"></div>
            <div className="hi"></div>
          </div>
          <div className="darken">
            <div className="sl"></div>
            <div className="ll"></div>
            <div className="slt"></div>
            <div className="srt"></div>
          </div>
        </div>
        <div className="content">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="3.2rem" height="3.2rem" viewBox="0 0 1024 1024">
              <path fill="url(#iconGradient)" d="M488.1 414.7V303.4L300.9 428l83.6 55.8zm254.1 137.7v-79.8l-59.8 39.9zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m278 533c0 1.1-.1 2.1-.2 3.1c0 .4-.1.7-.2 1a14.2 14.2 0 0 1-.8 3.2c-.2.6-.4 1.2-.6 1.7c-.2.4-.4.8-.5 1.2c-.3.5-.5 1.1-.8 1.6c-.2.4-.4.7-.7 1.1c-.3.5-.7 1-1 1.5c-.3.4-.5.7-.8 1c-.4.4-.8.9-1.2 1.3c-.3.3-.6.6-1 .9c-.4.4-.9.8-1.4 1.1c-.4.3-.7.6-1.1.8c-.1.1-.3.2-.4.3L525.2 786c-4 2.7-8.6 4-13.2 4c-4.7 0-9.3-1.4-13.3-4L244.6 616.9c-.1-.1-.3-.2-.4-.3l-1.1-.8c-.5-.4-.9-.7-1.3-1.1c-.3-.3-.6-.6-1-.9c-.4-.4-.8-.8-1.2-1.3a7 7 0 0 1-.8-1c-.4-.5-.7-1-1-1.5c-.2-.4-.5-.7-.7-1.1c-.3-.5-.6-1.1-.8-1.6c-.2-.4-.4-.8-.5-1.2c-.2-.6-.4-1.2-.6-1.7c-.1-.4-.3-.8-.4-1.2c-.2-.7-.3-1.3-.4-2c-.1-.3-.1-.7-.2-1c-.1-1-.2-2.1-.2-3.1V427.9c0-1 .1-2.1.2-3.1c.1-.3.1-.7.2-1a14.2 14.2 0 0 1 .8-3.2c.2-.6.4-1.2.6-1.7c.2-.4.4-.8.5-1.2c.2-.5.5-1.1.8-1.6c.2-.4.4-.7.7-1.1c.6-.9 1.2-1.7 1.8-2.5c.4-.4.8-.9 1.2-1.3c.3-.3.6-.6 1-.9c.4-.4.9-.8 1.3-1.1s.7-.6 1.1-.8c.1-.1.3-.2.4-.3L498.7 239c8-5.3 18.5-5.3 26.5 0l254.1 169.1c.1.1.3.2.4.3l1.1.8l1.4 1.1c.3.3.6.6 1 .9c.4.4.8.8 1.2 1.3c.7.8 1.3 1.6 1.8 2.5c.2.4.5.7.7 1.1c.3.5.6 1 .8 1.6c.2.4.4.8.5 1.2c.2.6.4 1.2.6 1.7c.1.4.3.8.4 1.2c.2.7.3 1.3.4 2c.1.3.1.7.2 1c.1 1 .2 2.1.2 3.1zm-254.1 13.3v111.3L723.1 597l-83.6-55.8zM281.8 472.6v79.8l59.8-39.9zM512 456.1l-84.5 56.4l84.5 56.4l84.5-56.4zM723.1 428L535.9 303.4v111.3l103.6 69.1zM384.5 541.2L300.9 597l187.2 124.6V610.3z" filter="url(#strong-inner)" />
              <defs>
                <linearGradient id="iconGradient" x1="0" x2="0" y1="-1" y2="0.8">
                  <stop offset="0%" stopColor="#bbb" />
                  <stop offset="100%" stopColor="#555" />
                </linearGradient>
                <filter id="strong-inner">
                  <feFlood floodColor="#fff2" />
                  <feComposite operator="out" in2="SourceGraphic" />
                  <feMorphology operator="dilate" radius="8" />
                  <feGaussianBlur stdDeviation="32" />
                  <feComposite operator="atop" in2="SourceGraphic" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="bottom">
            <h4>Luminous Design</h4>
            <p>Light Folds Around Form <br />Revealing Layers Of Depth</p>
            <div 
              className={`toggle ${isActive ? 'active' : ''}`}
              onClick={() => setIsActive(!isActive)}
            >
              <div className="handle"></div>
              <span>Activate Lumen</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .luminous-card-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4rem 1.5rem;
        }

        .card {
          position: relative;
          width: 380px;
          height: 480px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .light-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .card.active .light-layer {
          opacity: 1;
        }

        .slit {
          position: absolute;
          top: -50%;
          left: 50%;
          width: 2px;
          height: 200%;
          background: linear-gradient(180deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.8) 45%, 
            rgba(255, 255, 255, 1) 50%, 
            rgba(255, 255, 255, 0.8) 55%, 
            transparent 100%
          );
          filter: blur(1px);
          animation: slit-move 3s ease-in-out infinite;
        }

        @keyframes slit-move {
          0%, 100% { transform: translateX(-190px) translateY(0); }
          50% { transform: translateX(190px) translateY(0); }
        }

        .lumen {
          position: absolute;
          inset: 0;
        }

        .min, .mid, .hi {
          position: absolute;
          top: -50%;
          left: 50%;
          height: 200%;
          filter: blur(40px);
          animation: lumen-move 3s ease-in-out infinite;
        }

        .min {
          width: 100px;
          background: radial-gradient(ellipse, 
            rgba(255, 255, 255, 0.3) 0%, 
            transparent 70%
          );
        }

        .mid {
          width: 60px;
          background: radial-gradient(ellipse, 
            rgba(255, 255, 255, 0.5) 0%, 
            transparent 70%
          );
        }

        .hi {
          width: 30px;
          background: radial-gradient(ellipse, 
            rgba(255, 255, 255, 0.8) 0%, 
            transparent 70%
          );
        }

        @keyframes lumen-move {
          0%, 100% { transform: translateX(-190px); }
          50% { transform: translateX(190px); }
        }

        .darken {
          position: absolute;
          inset: 0;
        }

        .sl, .ll, .slt, .srt {
          position: absolute;
          background: rgba(0, 0, 0, 0.4);
          animation: darken-move 3s ease-in-out infinite;
        }

        .sl {
          top: 0;
          bottom: 0;
          left: -50%;
          width: 50%;
        }

        .ll {
          top: 0;
          bottom: 0;
          right: -50%;
          width: 50%;
        }

        .slt {
          top: -100%;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
        }

        .srt {
          bottom: -100%;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
        }

        @keyframes darken-move {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(380px); }
        }

        .content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 3rem 2rem;
          z-index: 1;
        }

        .icon {
          margin-top: 2rem;
        }

        .bottom {
          text-align: center;
          width: 100%;
        }

        .bottom h4 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.75rem;
          letter-spacing: 0.5px;
        }

        .bottom p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .toggle {
          position: relative;
          width: 100%;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .toggle:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .toggle.active {
          background: linear-gradient(90deg, #a855f7 0%, #06b6d4 100%);
          border-color: transparent;
        }

        .handle {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .toggle.active .handle {
          transform: translateX(calc(100% + 220px));
        }

        .toggle span {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          pointer-events: none;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .card {
            width: 320px;
            height: 420px;
          }

          .content {
            padding: 2rem 1.5rem;
          }

          .bottom h4 {
            font-size: 1.5rem;
          }

          .bottom p {
            font-size: 0.85rem;
          }

          .toggle.active .handle {
            transform: translateX(calc(100% + 180px));
          }
        }
      `}</style>
    </div>
  );
}