import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network nodes (blockchain blocks)
    const numNodes = 6;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.25;

    // Data particles
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        node: Math.floor(Math.random() * numNodes),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        size: 2 + Math.random() * 2
      });
    }

    // Draw 3D block stack
    const drawBlock = (x, y, size, time) => {
      const layers = 5;
      const layerHeight = size * 0.15;
      const offsetX = size * 0.3;
      const offsetY = size * 0.15;

      for (let i = 0; i < layers; i++) {
        const yOffset = i * layerHeight + Math.sin(time + i * 0.5) * 2;
        const brightness = 1 - (i * 0.1);

        // Top face (purple)
        ctx.fillStyle = isDark 
          ? `rgba(168, 85, 247, ${brightness * 0.8})` 
          : `rgba(139, 92, 246, ${brightness * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(x, y - yOffset);
        ctx.lineTo(x + offsetX, y - yOffset - offsetY);
        ctx.lineTo(x + offsetX + size, y - yOffset - offsetY);
        ctx.lineTo(x + size, y - yOffset);
        ctx.closePath();
        ctx.fill();

        // Left face (darker)
        ctx.fillStyle = isDark 
          ? `rgba(99, 85, 166, ${brightness * 0.6})` 
          : `rgba(109, 76, 196, ${brightness * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(x, y - yOffset);
        ctx.lineTo(x, y - yOffset + layerHeight);
        ctx.lineTo(x + offsetX, y - yOffset + layerHeight - offsetY);
        ctx.lineTo(x + offsetX, y - yOffset - offsetY);
        ctx.closePath();
        ctx.fill();

        // Right face (lighter)
        ctx.fillStyle = isDark 
          ? `rgba(139, 92, 246, ${brightness * 0.7})` 
          : `rgba(129, 82, 236, ${brightness * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(x + size, y - yOffset);
        ctx.lineTo(x + size, y - yOffset + layerHeight);
        ctx.lineTo(x + offsetX + size, y - yOffset + layerHeight - offsetY);
        ctx.lineTo(x + offsetX + size, y - yOffset - offsetY);
        ctx.closePath();
        ctx.fill();

        // Stroke for definition
        ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(139, 92, 246, 0.4)';
      ctx.shadowBlur = 0;
    };

    // Draw center platform
    const drawCenterPlatform = (x, y, size, time) => {
      const rotation = time * 0.5;
      
      // Platform diamond shape
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const platformSize = size * 1.2;
      ctx.fillStyle = isDark 
        ? 'rgba(168, 85, 247, 0.2)' 
        : 'rgba(139, 92, 246, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, -platformSize);
      ctx.lineTo(platformSize, 0);
      ctx.lineTo(0, platformSize);
      ctx.lineTo(-platformSize, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.4)' : 'rgba(139, 92, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner cubes
      const cubeSize = size * 0.3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cx = (i - 1) * cubeSize * 0.8;
          const cy = (j - 1) * cubeSize * 0.8;
          const offset = Math.sin(time + i + j) * 2;
          
          // Simple cube representation
          ctx.fillStyle = isDark 
            ? `rgba(139, 92, 246, ${0.3 + offset * 0.05})` 
            : `rgba(109, 76, 196, ${0.25 + offset * 0.05})`;
          ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(139, 92, 246, 0.4)';
          ctx.lineWidth = 1;
          
          // Top face
          ctx.beginPath();
          ctx.moveTo(cx, cy - cubeSize / 3);
          ctx.lineTo(cx + cubeSize / 4, cy - cubeSize / 2);
          ctx.lineTo(cx + cubeSize / 2, cy - cubeSize / 3);
          ctx.lineTo(cx + cubeSize / 4, cy - cubeSize / 6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      time += 0.01;

      // Clear canvas with gradient background
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height)
      );
      
      if (isDark) {
        gradient.addColorStop(0, '#160b2e');
        gradient.addColorStop(0.5, '#0d0221');
        gradient.addColorStop(1, '#0a0118');
      } else {
        gradient.addColorStop(0, '#e5e7ff');
        gradient.addColorStop(0.5, '#d5d9ff');
        gradient.addColorStop(1, '#f0f4ff');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nodes
      ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < numNodes; i++) {
        const angle1 = (i * Math.PI * 2) / numNodes + time * 0.1;
        const x1 = centerX + Math.cos(angle1) * radius;
        const y1 = centerY + Math.sin(angle1) * radius;
        
        const nextIndex = (i + 1) % numNodes;
        const angle2 = (nextIndex * Math.PI * 2) / numNodes + time * 0.1;
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = centerY + Math.sin(angle2) * radius;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Draw connection to center
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
      }

      // Draw and update particles
      particles.forEach(particle => {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.node = Math.floor(Math.random() * numNodes);
        }

        const currentNode = particle.node;
        const nextNode = (currentNode + 1) % numNodes;
        
        const angle1 = (currentNode * Math.PI * 2) / numNodes + time * 0.1;
        const x1 = centerX + Math.cos(angle1) * radius;
        const y1 = centerY + Math.sin(angle1) * radius;
        
        const angle2 = (nextNode * Math.PI * 2) / numNodes + time * 0.1;
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = centerY + Math.sin(angle2) * radius;
        
        const x = x1 + (x2 - x1) * particle.progress;
        const y = y1 + (y2 - y1) * particle.progress;
        
        // Draw particle
        ctx.fillStyle = isDark ? 'rgba(168, 85, 247, 0.8)' : 'rgba(139, 92, 246, 0.7)';
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = isDark ? 'rgba(168, 85, 247, 0.8)' : 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes (blockchain blocks)
      for (let i = 0; i < numNodes; i++) {
        const angle = (i * Math.PI * 2) / numNodes + time * 0.1;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        drawBlock(x - 20, y - 30, 40, time + i);
      }

      // Draw center platform
      drawCenterPlatform(centerX, centerY, 50, time);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ touchAction: 'none' }}
    />
  );
}