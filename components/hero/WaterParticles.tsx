"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  progress: number;
  mouseX: number;
  mouseY: number;
}

function AmbientDroplets({ progress, mouseX, mouseY }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 120;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize positions
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 2,
        speed: 0.002 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
        size: 0.015 + Math.random() * 0.025,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = positions[i];

      // Floating motion
      const x = p.x + Math.sin(time * 0.3 + p.offset) * 0.15 + (mouseX - 0.5) * 0.3;
      const y = p.y + Math.cos(time * p.speed * 100 + p.offset) * 0.1 + (mouseY - 0.5) * 0.2;
      const z = p.z + Math.sin(time * 0.2 + p.offset * 2) * 0.05;

      // Increase activity during splash moments (progress 0.7-0.9)
      const splashFactor = progress > 0.65 && progress < 0.92
        ? 1 + (1 - Math.abs(progress - 0.78) / 0.14) * 2
        : 1;

      dummy.position.set(x, y + Math.sin(time + i) * 0.02 * splashFactor, z);
      dummy.scale.setScalar(p.size * (0.8 + Math.sin(time + p.offset) * 0.2) * splashFactor);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#4a9fd4"
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function SplashParticles({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 3,
      vx: (Math.random() - 0.5) * 0.02,
      vy: Math.random() * 0.02 + 0.005,
      size: 0.01 + Math.random() * 0.02,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  // Only visible during splash moments
  const splashVisible = progress > 0.65 && progress < 0.95;
  const splashOpacity = splashVisible
    ? Math.min(1, (progress - 0.65) / 0.1) * Math.min(1, (0.95 - progress) / 0.1) * 0.4
    : 0;

  useFrame(({ clock }) => {
    if (!meshRef.current || !splashVisible) return;
    const time = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const x = p.x + Math.sin(time * 2 + p.offset) * 0.3;
      const y = p.y + Math.cos(time * 1.5 + p.offset) * 0.4 - time * 0.01;
      const z = Math.sin(time + p.offset) * 0.2;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(p.size * (1 + Math.sin(time * 3 + i) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} visible={splashVisible}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#87ceeb"
        transparent
        opacity={splashOpacity}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function WaterParticles({ progress, mouseX, mouseY }: ParticleSystemProps) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <AmbientDroplets progress={progress} mouseX={mouseX} mouseY={mouseY} />
        <SplashParticles progress={progress} />
      </Canvas>
    </div>
  );
}
