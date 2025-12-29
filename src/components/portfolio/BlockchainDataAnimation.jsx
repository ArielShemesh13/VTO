import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function BlockchainDataAnimation({ isDark }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = containerRef.current;
    const size = Math.min(container.clientWidth, container.clientHeight);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create nucleus (central sphere)
    const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x22d3ee : 0x4dbdce,
      emissive: isDark ? 0x22d3ee : 0x4dbdce,
      emissiveIntensity: 0.3,
      shininess: 100,
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Create electrons
    const electronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const electronMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x22d3ee : 0x4dbdce,
      emissive: isDark ? 0x22d3ee : 0x4dbdce,
      emissiveIntensity: 0.5,
    });

    const electrons = [];
    const orbitAngles = [0, Math.PI * 2 / 3, Math.PI * 4 / 3]; // 3 orbits at 0°, 120°, 240°
    const randomOffsets = orbitAngles.map(() => Math.random() * Math.PI * 2); // Random start positions

    orbitAngles.forEach((angle, i) => {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electrons.push({
        mesh: electron,
        orbitAngle: angle,
        phase: randomOffsets[i], // Start from random position
        radius: 2.5,
      });
      scene.add(electron);
    });

    // Create orbit rings
    const orbitRings = [];
    orbitAngles.forEach((angle) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        2.5, 1.2,
        0, 2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: isDark ? 0x22d3ee : 0x4dbdce,
        opacity: 0.3,
        transparent: true,
      });
      const ellipse = new THREE.Line(geometry, material);
      ellipse.rotation.x = Math.PI / 2;
      ellipse.rotation.y = angle;
      orbitRings.push(ellipse);
      scene.add(ellipse);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isDark ? 0x22d3ee : 0x4dbdce, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate nucleus
      nucleus.rotation.y += 0.005;

      // Animate electrons in orbits
      electrons.forEach((electron, i) => {
        electron.phase += 0.015;
        const x = Math.cos(electron.phase) * electron.radius;
        const z = Math.sin(electron.phase) * 1.2;
        
        // Apply orbit angle rotation
        const cos = Math.cos(electron.orbitAngle);
        const sin = Math.sin(electron.orbitAngle);
        electron.mesh.position.set(
          x * cos - z * sin,
          Math.sin(electron.phase) * 1.2,
          x * sin + z * cos
        );
      });

      // Rotate orbit rings
      orbitRings.forEach((ring) => {
        ring.rotation.z += 0.003;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
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