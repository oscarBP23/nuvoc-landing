'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AmberMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Amber palette
    const AMBER = 0xe8960a;
    const AMBER_LIGHT = 0xf4b942;
    const AMBER_DIM = 0x8b5a06;

    // Icosphere wireframe
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const detail = isMobile ? 3 : 4;
    const sphereGeo = new THREE.IcosahedronGeometry(10, detail);
    const posArray = sphereGeo.attributes.position.array as Float32Array;
    const originalPositions = new Float32Array(posArray.length);
    originalPositions.set(posArray);

    const wireMat = new THREE.MeshBasicMaterial({
      color: AMBER,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(sphereGeo, wireMat);
    scene.add(wireMesh);

    // Vertex points
    const pointsMat = new THREE.PointsMaterial({
      color: AMBER_LIGHT,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(sphereGeo, pointsMat);
    scene.add(points);

    // Inner glow layer
    const glowGeo = new THREE.IcosahedronGeometry(9.2, 3);
    const glowMat = new THREE.MeshBasicMaterial({
      color: AMBER_DIM,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    // Floating particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 11 + Math.random() * 5;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleSpeeds[i] = 0.2 + Math.random() * 0.6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: AMBER_LIGHT,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const timer = new THREE.Timer();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Vertex displacement — organic breathing
      const pos = sphereGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        const noise =
          Math.sin(ox * 0.4 + t * 0.6) *
          Math.cos(oy * 0.4 + t * 0.5) *
          Math.sin(oz * 0.4 + t * 0.4) * 0.6;

        const mouseInfluence =
          Math.sin(ox * 0.2 + mouseRef.current.x * 2) *
          Math.cos(oy * 0.2 + mouseRef.current.y * 2) * 0.3;

        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const scale = 1 + (noise + mouseInfluence) / len;

        pos[i] = ox * scale;
        pos[i + 1] = oy * scale;
        pos[i + 2] = oz * scale;
      }
      sphereGeo.attributes.position.needsUpdate = true;

      // Rotate
      wireMesh.rotation.y = t * 0.08 + mouseRef.current.x * 0.3;
      wireMesh.rotation.x = t * 0.05 + mouseRef.current.y * 0.2;
      points.rotation.copy(wireMesh.rotation);

      glowMesh.rotation.y = -t * 0.04;
      glowMesh.rotation.x = -t * 0.03;

      // Orbit particles
      const pp = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const speed = particleSpeeds[i];
        const angle = t * speed * 0.15;
        const x = pp[idx];
        const z = pp[idx + 2];
        const cos = Math.cos(angle * 0.01);
        const sin = Math.sin(angle * 0.01);
        pp[idx] = x * cos - z * sin;
        pp[idx + 2] = x * sin + z * cos;
        pp[idx + 1] += Math.sin(t * speed + i) * 0.003;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = t * 0.02;

      // Pulse
      wireMat.opacity = 0.15 + Math.sin(t * 0.8) * 0.04;
      pointsMat.opacity = 0.55 + Math.sin(t * 1.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      sphereGeo.dispose();
      wireMat.dispose();
      pointsMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    />
  );
}
