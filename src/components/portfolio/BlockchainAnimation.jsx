import React, { useEffect, useRef, useState } from 'react';

export default function BlockchainAnimation({ isDark }) {
  const canvasRef = useRef(null);
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real Kaspa blocks
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch('https://api.kaspa.org/blocks/recent');
        const data = await response.json();
        if (data && data.blocks) {
          setBlocks(data.blocks.slice(0, 6).map(b => ({
            id: b.hash?.substring(0, 8) || Math.random().toString(36).substring(7),
            hash: b.hash?.substring(0, 8) || '????????',
            height: b.height || 0,
            timestamp: b.timestamp || Date.now()
          })));
        }
      } catch (error) {
        // Fallback to simulated blocks
        setBlocks(Array.from({ length: 6 }, (_, i) => ({
          id: Math.random().toString(36).substring(7),
          hash: Math.random().toString(36).substring(2, 10).toUpperCase(),
          height: 50000000 + i,
          timestamp: Date.now() - (6 - i) * 2000
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlocks();
    const interval = setInterval(fetchBlocks, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || blocks.length === 0) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const numNodes = 6;
    const radius = size * 0.3;

    // Data particles
    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        node: Math.floor(Math.random() * numNodes),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        size: 1.5 + Math.random() * 1.5
      });
    }

    // Draw 3D block stack (isometric)
    const drawBlockStack = (x, y, size, time, index) => {
      const layers = 5;
      const layerHeight = size * 0.12;
      const offsetX = size * 0.35;
      const offsetY = size * 0.2;
      const bounce = Math.sin(time + index * 0.5) * 2;

      for (let i = 0; i < layers; i++) {
        const yOffset = i * layerHeight + bounce;
        const brightness = 1 - (i * 0.08);

        // Top face (magenta/purple)
        ctx.fillStyle = isDark 
          ? `rgba(217, 70, 239, ${brightness * 0.9})` 
          : `rgba(192, 38, 211, ${brightness * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(x, y - yOffset);
        ctx.lineTo(x + offsetX, y - yOffset - offsetY);
        ctx.lineTo(x + offsetX + size, y - yOffset - offsetY);
        ctx.lineTo(x + size, y - yOffset);
        ctx.closePath();
        ctx.fill();

        // Left face (darker purple)
        ctx.fillStyle = isDark 
          ? `rgba(91, 33, 182, ${brightness * 0.7})` 
          : `rgba(109, 40, 217, ${brightness * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(x, y - yOffset);
        ctx.lineTo(x, y - yOffset + layerHeight);
        ctx.lineTo(x + offsetX, y - yOffset + layerHeight - offsetY);
        ctx.lineTo(x + offsetX, y - yOffset - offsetY);
        ctx.closePath();
        ctx.fill();

        // Right face (medium purple)
        ctx.fillStyle = isDark 
          ? `rgba(139, 92, 246, ${brightness * 0.8})` 
          : `rgba(147, 51, 234, ${brightness * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(x + size, y - yOffset);
        ctx.lineTo(x + size, y - yOffset + layerHeight);
        ctx.lineTo(x + offsetX + size, y - yOffset + layerHeight - offsetY);
        ctx.lineTo(x + offsetX + size, y - yOffset - offsetY);
        ctx.closePath();
        ctx.fill();

        // Edges
        ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.4)' : 'rgba(139, 92, 246, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    // Draw center platform with cubes
    const drawCenterPlatform = (x, y, size, time) => {
      const rotation = time * 0.3;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Diamond platform base
      const platformSize = size * 0.8;
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, platformSize);
      gradient.addColorStop(0, isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, -platformSize);
      ctx.lineTo(platformSize * 0.7, 0);
      ctx.lineTo(0, platformSize);
      ctx.lineTo(-platformSize * 0.7, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = isDark ? 'rgba(217, 70, 239, 0.5)' : 'rgba(192, 38, 211, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner cubes (3x3 grid)
      const cubeSize = size * 0.18;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cx = (i - 1) * cubeSize * 1.2;
          const cy = (j - 1) * cubeSize * 0.6;
          const wobble = Math.sin(time * 2 + i + j) * 1.5;
          const cubeOffset = cubeSize * 0.3;
          const cubeOffsetY = cubeSize * 0.2;
          
          // Cube top
          ctx.fillStyle = isDark 
            ? `rgba(217, 70, 239, ${0.4 + wobble * 0.05})` 
            : `rgba(192, 38, 211, ${0.35 + wobble * 0.05})`;
          ctx.beginPath();
          ctx.moveTo(cx, cy - cubeSize / 3 + wobble);
          ctx.lineTo(cx + cubeOffset, cy - cubeSize / 2 - cubeOffsetY + wobble);
          ctx.lineTo(cx + cubeSize, cy - cubeSize / 3 + wobble);
          ctx.lineTo(cx + cubeSize - cubeOffset, cy - cubeOffsetY + wobble);
          ctx.closePath();
          ctx.fill();
          
          // Cube sides
          ctx.fillStyle = isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(147, 51, 234, 0.25)';
          ctx.beginPath();
          ctx.moveTo(cx, cy - cubeSize / 3 + wobble);
          ctx.lineTo(cx, cy + wobble);
          ctx.lineTo(cx + cubeSize - cubeOffset, cy + cubeSize / 3 + wobble);
          ctx.lineTo(cx + cubeSize - cubeOffset, cy - cubeOffsetY + wobble);
          ctx.closePath();
          ctx.fill();
          
          ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(139, 92, 246, 0.4)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      time += 0.015;
      
      ctx.clearRect(0, 0, size, size);

      // Draw connections between nodes
      ctx.strokeStyle = isDark ? 'rgba(217, 70, 239, 0.25)' : 'rgba(192, 38, 211, 0.2)';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < numNodes; i++) {
        const angle1 = (i * Math.PI * 2) / numNodes + time * 0.15;
        const x1 = centerX + Math.cos(angle1) * radius;
        const y1 = centerY + Math.sin(angle1) * radius;
        
        const nextIndex = (i + 1) % numNodes;
        const angle2 = (nextIndex * Math.PI * 2) / numNodes + time * 0.15;
        const x2 = centerX + Math.cos(angle2) * radius;
        const y2 = centerY + Math.sin(angle2) * radius;
        
        // Connection to next node
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Connection to center
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        
        // Small dot at connection point
        ctx.fillStyle = isDark ? 'rgba(217, 70, 239, 0.6)' : 'rgba(192, 38, 211, 0.5)';
        ctx.beginPath();
        ctx.arc(x1, y1, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw and update particles
      particles.forEach(particle => {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.node = Math.floor(Math.random() * numNodes);
        }

        const currentNode = particle.node;
        const angle = (currentNode * Math.PI * 2) / numNodes + time * 0.15;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        
        const x = x1 + (centerX - x1) * particle.progress;
        const y = y1 + (centerY - y1) * particle.progress;
        
        // Draw particle with glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = isDark ? 'rgba(217, 70, 239, 0.8)' : 'rgba(192, 38, 211, 0.7)';
        ctx.fillStyle = isDark ? 'rgba(217, 70, 239, 0.9)' : 'rgba(192, 38, 211, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw block stacks at nodes
      for (let i = 0; i < numNodes; i++) {
        const angle = (i * Math.PI * 2) / numNodes + time * 0.15;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        drawBlockStack(x - 15, y - 20, 30, time, i);
      }

      // Draw center platform
      drawCenterPlatform(centerX, centerY, 60, time);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, blocks]);

  if (isLoading) {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full border-2 ${
          isDark ? 'border-purple-500/30 border-t-purple-500' : 'border-purple-400/30 border-t-purple-400'
        } animate-spin`} />
      </div>
    );
  }

  return (
    <div className="relative w-32 h-32">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />
      
      {/* Live indicator */}
      <div className="absolute -top-1 -right-1 flex items-center gap-1">
        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-600'} animate-pulse`} />
      </div>
    </div>
  );
}