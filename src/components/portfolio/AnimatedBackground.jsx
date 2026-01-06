import React from 'react';

export default function AnimatedBackground({ isDark }) {
  return (
    <div className={`fixed inset-0 w-full h-full z-0 transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0a0118] via-[#160b2e] to-[#0d0221]' 
        : 'bg-gradient-to-br from-[#f0f4ff] via-[#e5e7ff] to-[#d5d9ff]'
    }`}>
      {/* Static gradient overlay for subtle depth */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]'
      }`} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(36, 66, 112, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(36, 66, 112, 0.08) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}