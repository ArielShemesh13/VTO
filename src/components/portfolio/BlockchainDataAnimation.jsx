import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function BlockchainDataAnimation({ isDark }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = containerRef.current;
    const size = Math.min(container.clientWidth, container.clientHeight);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Create central nucleus - just like React logo
    const nucleusGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x61dafb : 0x4dbdce,
      emissive: isDark ? 0x61dafb : 0x4dbdce,
      emissiveIntensity: 0.4,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Create 3 orbits - exactly like React atom logo
    const createOrbit = (tiltX, tiltY) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        3.5, 3.5,
        0, 2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: isDark ? 0x61dafb : 0x4dbdce,
        opacity: 0.4,
        transparent: true,
        linewidth: 2,
      });
      const orbit = new THREE.Line(geometry, material);
      orbit.rotation.x = tiltX;
      orbit.rotation.y = tiltY;
      return orbit;
    };

    // 3 orbits at 60-degree intervals - React style
    const orbit1 = createOrbit(Math.PI / 2, 0);
    const orbit2 = createOrbit(Math.PI / 2, Math.PI * 2 / 3);
    const orbit3 = createOrbit(Math.PI / 2, Math.PI * 4 / 3);
    
    const orbitGroup = new THREE.Group();
    orbitGroup.add(orbit1);
    orbitGroup.add(orbit2);
    orbitGroup.add(orbit3);
    scene.add(orbitGroup);

    // Create electrons (particles) on orbits
    const electronGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const electronMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x61dafb : 0x4dbdce,
      emissive: isDark ? 0x61dafb : 0x4dbdce,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 1,
    });

    const electrons = [];
    const orbits = [
      { rotation: orbit1.rotation, offset: 0 },
      { rotation: orbit2.rotation, offset: Math.PI * 2 / 3 },
      { rotation: orbit3.rotation, offset: Math.PI * 4 / 3 }
    ];

    orbits.forEach((orbit, i) => {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial.clone());
      const electronData = {
        mesh: electron,
        angle: Math.random() * Math.PI * 2,
        speed: 0.02,
        orbitRotation: orbit.rotation,
        radius: 3.5,
      };
      electrons.push(electronData);
      scene.add(electron);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isDark ? 0x61dafb : 0x4dbdce, 1.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(isDark ? 0x61dafb : 0x4dbdce, 0.8, 100);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate entire orbit group - smooth continuous rotation
      orbitGroup.rotation.y += 0.003;
      orbitGroup.rotation.x += 0.002;

      // Pulse nucleus slightly
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
      nucleus.scale.set(scale, scale, scale);

      // Move electrons along their orbits
      electrons.forEach((electronData, i) => {
        electronData.angle += electronData.speed;
        
        const x = Math.cos(electronData.angle) * electronData.radius;
        const y = Math.sin(electronData.angle) * electronData.radius;
        
        // Apply orbit rotation to position
        const pos = new THREE.Vector3(x, y, 0);
        pos.applyEuler(electronData.orbitRotation);
        pos.applyEuler(orbitGroup.rotation);
        
        electronData.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      nucleusGeometry.dispose();
      nucleusMaterial.dispose();
      electronGeometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: '384px' }}
    />
  );
}