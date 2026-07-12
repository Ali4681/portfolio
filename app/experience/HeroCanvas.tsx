"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function noise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

const particlePositions = (() => {
  const array = new Float32Array(900 * 3);
  for (let i = 0; i < 900; i++) {
    const radius = 2.4 + noise(i + 1) * 3.8;
    const angle = noise(i + 901) * Math.PI * 2;
    array[i * 3] = Math.cos(angle) * radius;
    array[i * 3 + 1] = (noise(i + 1801) - 0.5) * 7;
    array[i * 3 + 2] = Math.sin(angle) * radius - 1;
  }
  return array;
})();

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      state.pointer.y * 0.04,
      0.03,
    );
    ref.current.rotation.y +=
      (state.pointer.x * 0.05 - ref.current.rotation.y) * 0.004;
  });
  return (
    <Points ref={ref} positions={particlePositions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#2de1c2"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.62}
      />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      }}
    >
      <ambientLight intensity={0.3} />
      <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.12}>
        <ParticleField />
      </Float>
    </Canvas>
  );
}
