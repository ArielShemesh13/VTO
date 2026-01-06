import React from 'react';

export default function AnimatedLogo({ isDark }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .logo-container {
          animation: float 6s ease-in-out infinite;
        }
        
        .logo-ring {
          animation: rotate 20s linear infinite;
        }
        
        .logo-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="logo-container relative w-80 h-80">
        {/* Outer ring */}
        <div className={`logo-ring absolute inset-0 rounded-full border-4 ${isDark ? 'border-purple-500/30' : 'border-[#4dbdce]/30'}`} />
        
        {/* Middle ring */}
        <div className={`logo-ring absolute inset-8 rounded-full border-2 ${isDark ? 'border-cyan-500/40' : 'border-[#6366f1]/40'}`} style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        
        {/* Inner glow */}
        <div className={`logo-pulse absolute inset-16 rounded-full ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20' : 'bg-gradient-to-br from-[#4dbdce]/20 to-[#a855f7]/20'} blur-xl`} />
        
        {/* Center element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full ${isDark ? 'bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-br from-[#4dbdce] via-[#6366f1] to-[#a855f7]'} flex items-center justify-center shadow-2xl`}>
            <span className="text-4xl font-bold text-white">AS</span>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className={`absolute top-1/4 left-1/4 w-3 h-3 rounded-full ${isDark ? 'bg-purple-400' : 'bg-[#4dbdce]'} logo-pulse`} />
        <div className={`absolute top-1/3 right-1/4 w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#6366f1]'} logo-pulse`} style={{ animationDelay: '1s' }} />
        <div className={`absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-[#a855f7]'} logo-pulse`} style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}