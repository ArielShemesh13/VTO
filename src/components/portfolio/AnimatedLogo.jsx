import React from 'react';

export default function AnimatedLogo({ isDark }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '384px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        position: 'relative',
        width: '200px',
        height: '200px',
      }}>
        <style>{`
          .logo-shape {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            box-sizing: border-box;
            z-index: 3;
            width: 46px;
            height: 81px;
            top: 63px;
            left: -40.5px;
            transform: rotate(30deg) skewX(30deg);
            border-radius: 0 21px 1.5px 3px;
          }
          
          .logo-shape::before,
          .logo-shape::after {
            content: "";
            position: absolute;
          }
          
          .logo-shape::before {
            width: 30px;
            height: 40.2px;
            left: -28.5px;
          }
          
          .logo-shape::after {
            width: 46.5px;
            height: 40.2px;
            left: -46.35px;
            border-radius: 1.5px 24px 0 3.6px;
          }
          
          .logo-shape-white {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            box-sizing: border-box;
            z-index: 1;
            width: 45px;
            height: 45px;
            background: #fff;
          }
          
          .logo-shape-top {
            top: -75px;
            border-bottom-right-radius: 3px;
            transform: rotateZ(150deg) skewX(30.8deg);
            background: linear-gradient(to bottom, #c8b2ff 30%, #ac6dff);
          }
          
          .logo-shape-top::before {
            background: linear-gradient(to bottom, #c8b2ff 70%, #c3a7ff);
          }
          
          .logo-shape-top::after {
            background: linear-gradient(to right, #a760f3, #9b56f2 50%, #8648f1 90%);
          }
          
          .logo-shape-right {
            top: -6px;
            left: 79.5px;
            transform: rotate(-90deg) skewX(30deg);
            background: linear-gradient(to bottom, #b3b2ff, #b29dff, #a16cff);
          }
          
          .logo-shape-right::before {
            background: linear-gradient(to bottom, #b3b1ff, #b2a0ff);
          }
          
          .logo-shape-right::after {
            background: linear-gradient(to right, #7c99ff, #6f82ff 50%, #5f61ff 90%);
          }
          
          .logo-shape-left {
            background: linear-gradient(to bottom, #c7b4ff 30%, #7d99ff);
          }
          
          .logo-shape-left::before {
            background: linear-gradient(to bottom, #c7b2ff 70%, #b5aeff);
          }
          
          .logo-shape-left::after {
            background: linear-gradient(to right, #9f6aff, #8864ff 50%, #7160ff 90%);
          }
          
          @keyframes rotate360 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .logo-container {
            animation: rotate360 8s linear infinite;
          }
        `}</style>
        
        <div className="logo-container">
          <div className="logo-shape-white"></div>
          <div className="logo-shape logo-shape-top"></div>
          <div className="logo-shape logo-shape-right"></div>
          <div className="logo-shape logo-shape-left"></div>
        </div>
      </div>
    </div>
  );
}