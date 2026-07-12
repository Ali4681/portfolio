"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  PointMaterial,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import { useExperience } from "../lib/store";

function seeded(n: number) {
  const x = Math.sin(n * 91.31) * 43758.545;
  return x - Math.floor(x);
}
function ParticleCloud({ light }: { light: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const points = useMemo(() => {
    const a = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      a[i * 3] = (seeded(i) - 0.5) * 24;
      a[i * 3 + 1] = (seeded(i + 700) - 0.5) * 14;
      a[i * 3 + 2] = (seeded(i + 1400) - 0.5) * 20;
    }
    return a;
  }, []);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.006;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <PointMaterial
        color={light ? "#2563eb" : "#60a5fa"}
        size={light ? 0.022 : 0.018}
        transparent
        opacity={light ? 0.34 : 0.5}
        depthWrite={false}
      />
    </points>
  );
}
function Monitor() {
  return (
    <group position={[1.8, 0.15, 0]} rotation={[0, -0.25, 0]}>
      <mesh>
        <boxGeometry args={[3, 1.8, 0.12]} />
        <meshStandardMaterial
          color="#050b19"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.75, 1.55]} />
        <meshBasicMaterial color="#172554" />
      </mesh>
      <mesh position={[-0.55, 0.25, 0.08]}>
        <planeGeometry args={[1.35, 0.035]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      {[-0.05, -0.3, -0.55].map((y, i) => (
        <mesh key={y} position={[-0.45, y, 0.08]}>
          <planeGeometry args={[1.5 - i * 0.2, 0.02]} />
          <meshBasicMaterial color={i === 1 ? "#ec4899" : "#7c3aed"} />
        </mesh>
      ))}
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[0.15, 0.55, 0.12]} />
        <meshStandardMaterial color="#182034" metalness={1} />
      </mesh>
      <mesh position={[0, -1.45, 0]}>
        <boxGeometry args={[1, 0.08, 0.5]} />
        <meshStandardMaterial color="#182034" metalness={1} />
      </mesh>
    </group>
  );
}
const workstationParts = [
  { position: [-4.8, 2.6, -3.5], rotation: [0.45, -0.8, -0.25] },
  { position: [4.2, -2.8, -4.5], rotation: [-0.6, 0.35, 0.5] },
  { position: [-3.2, -3.4, 2.2], rotation: [0.8, -0.45, -0.7] },
  { position: [4.6, 2.1, 1.8], rotation: [-0.35, 0.9, 0.6] },
] as const;

function animatePart(
  part: THREE.Group | null,
  index: number,
  assembled: number,
  delta: number,
) {
  if (!part) return;
  const spread = 1 - assembled;
  const target = workstationParts[index];
  part.position.x = THREE.MathUtils.damp(
    part.position.x,
    target.position[0] * spread,
    5,
    delta,
  );
  part.position.y = THREE.MathUtils.damp(
    part.position.y,
    target.position[1] * spread,
    5,
    delta,
  );
  part.position.z = THREE.MathUtils.damp(
    part.position.z,
    target.position[2] * spread,
    5,
    delta,
  );
  part.rotation.x = THREE.MathUtils.damp(
    part.rotation.x,
    target.rotation[0] * spread,
    5,
    delta,
  );
  part.rotation.y = THREE.MathUtils.damp(
    part.rotation.y,
    target.rotation[1] * spread,
    5,
    delta,
  );
  part.rotation.z = THREE.MathUtils.damp(
    part.rotation.z,
    target.rotation[2] * spread,
    5,
    delta,
  );
}

function Workstation() {
  const monitor = useRef<THREE.Group>(null);
  const desk = useRef<THREE.Group>(null);
  const keyboard = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const assemblyProgress = useExperience.getState().assemblyProgress;
    const assembled = THREE.MathUtils.smoothstep(assemblyProgress, 0, 1);
    [monitor.current, desk.current, keyboard.current, orbit.current].forEach(
      (part, index) => animatePart(part, index, assembled, delta),
    );
  });

  return (
    <group position={[0, 0, -1]}>
      <group
        ref={monitor}
        position={[-4.8, 2.6, -3.5]}
        rotation={[0.45, -0.8, -0.25]}
      >
        <Monitor />
      </group>
      <group
        ref={desk}
        position={[4.2, -2.8, -4.5]}
        rotation={[-0.6, 0.35, 0.5]}
      >
        <mesh position={[0.5, -1.6, 0.6]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[4.5, 0.12, 1.5]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </group>
      <group
        ref={keyboard}
        position={[-3.2, -3.4, 2.2]}
        rotation={[0.8, -0.45, -0.7]}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[-1.1 + i * 0.32, -1.47, 0.45]}>
            <boxGeometry args={[0.22, 0.06, 0.22]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#2563eb" : "#273349"}
              emissive={i % 3 === 0 ? "#2563eb" : "#000"}
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>
      <group
        ref={orbit}
        position={[4.6, 2.1, 1.8]}
        rotation={[-0.35, 0.9, 0.6]}
      >
        <mesh position={[-2.2, 0.4, 0.3]}>
          <torusGeometry args={[0.55, 0.12, 3, 3]} />
          <meshStandardMaterial
            color="#61dafb"
            emissive="#2563eb"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </group>
  );
}

function AssemblyPart({
  stage,
  part,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  children,
}: {
  stage: number;
  part: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const exploded = useMemo<[number, number, number]>(
    () => [
      position[0] + (seeded(stage * 31 + part) - 0.5) * 11,
      position[1] + (seeded(stage * 47 + part + 9) - 0.5) * 8,
      position[2] + (seeded(stage * 59 + part + 17) - 0.5) * 9,
    ],
    [part, position, stage],
  );
  const explodedRotation = useMemo<[number, number, number]>(
    () => [
      rotation[0] + (seeded(part + stage * 13) - 0.5) * 1.8,
      rotation[1] + (seeded(part + stage * 19 + 4) - 0.5) * 2.2,
      rotation[2] + (seeded(part + stage * 23 + 8) - 0.5) * 1.8,
    ],
    [part, rotation, stage],
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    const raw = useExperience.getState().stageProgress[stage] ?? 0;
    const delay = Math.min(part * 0.045, 0.35);
    const local = THREE.MathUtils.clamp((raw - delay) / (1 - delay), 0, 1);
    const progress = THREE.MathUtils.smoothstep(local, 0, 1);
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      THREE.MathUtils.lerp(exploded[0], position[0], progress),
      7,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      THREE.MathUtils.lerp(exploded[1], position[1], progress),
      7,
      delta,
    );
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      THREE.MathUtils.lerp(exploded[2], position[2], progress),
      7,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      THREE.MathUtils.lerp(explodedRotation[0], rotation[0], progress),
      7,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      THREE.MathUtils.lerp(explodedRotation[1], rotation[1], progress),
      7,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      THREE.MathUtils.lerp(explodedRotation[2], rotation[2], progress),
      7,
      delta,
    );
    group.current.scale.setScalar(
      THREE.MathUtils.damp(
        group.current.scale.x,
        0.35 + progress * 0.65,
        7,
        delta,
      ),
    );
  });

  return (
    <group
      ref={group}
      position={exploded}
      rotation={explodedRotation}
      scale={0.35}
    >
      {children}
    </group>
  );
}
const skillColors = [
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#c084fc",
  "#f472b6",
  "#38bdf8",
  "#7c3aed",
  "#2563eb",
];
function SkillGalaxy() {
  return (
    <group>
      {skillColors.map((c, i) => {
        const a = (i / skillColors.length) * Math.PI * 2;
        const r = 2.2 + (i % 2) * 1.1;
        const position: [number, number, number] = [
          Math.cos(a) * r,
          Math.sin(a) * 1.7,
          Math.sin(a) * r,
        ];
        return (
          <AssemblyPart key={c + i} stage={2} part={i} position={position}>
            <Float speed={1 + i * 0.08} floatIntensity={0.35}>
              <mesh>
                <sphereGeometry args={[0.22 + (i % 3) * 0.06, 12, 12]} />
                <meshStandardMaterial
                  color={c}
                  emissive={c}
                  emissiveIntensity={2}
                />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.38, 0.006, 4, 24]} />
                <meshBasicMaterial color={c} transparent opacity={0.55} />
              </mesh>
            </Float>
          </AssemblyPart>
        );
      })}
    </group>
  );
}
function CareerRibbon() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.6, -1.8, -6),
        new THREE.Vector3(1.25, -0.75, -2),
        new THREE.Vector3(-1.1, 0.35, 2),
        new THREE.Vector3(1.45, 1.55, 6),
      ]),
    [],
  );
  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 72, 0.055, 10, false]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 72, 0.18, 10, false]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Road() {
  const nodes: [number, number, number][] = [
    [-1.6, -1.8, -6],
    [1.25, -0.75, -2],
    [-1.1, 0.35, 2],
    [1.45, 1.55, 6],
  ];
  return (
    <group rotation={[-0.08, 0, 0]}>
      <AssemblyPart stage={3} part={0}>
        <CareerRibbon />
      </AssemblyPart>
      {nodes.map((position, i) => {
        const color = ["#38bdf8", "#818cf8", "#c084fc", "#f472b6"][i];
        return (
          <AssemblyPart key={i} stage={3} part={i + 1} position={position}>
            <Float
              speed={0.8 + i * 0.12}
              floatIntensity={0.12}
              rotationIntensity={0.08}
            >
              <mesh>
                <sphereGeometry args={[0.2, 20, 20]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={3}
                  metalness={0.45}
                  roughness={0.18}
                />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, i * 0.35]}>
                <torusGeometry args={[0.55, 0.018, 8, 48]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={0.75}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0.65, 0]}>
                <torusGeometry args={[0.38, 0.009, 6, 32]} />
                <meshBasicMaterial color="#dbeafe" transparent opacity={0.45} />
              </mesh>
              <pointLight color={color} intensity={4} distance={3.5} />
            </Float>
          </AssemblyPart>
        );
      })}
    </group>
  );
}
function Museum() {
  return (
    <group>
      {[-3, 0, 3].map((x, i) => (
        <AssemblyPart key={x} stage={4} part={i} position={[x, 0, 0]}>
          <Float speed={0.8 + i * 0.2}>
            <mesh>
              <icosahedronGeometry args={[0.85, 1]} />
              <meshStandardMaterial
                color={["#2563eb", "#7c3aed", "#ec4899"][i]}
                wireframe
                emissive={["#2563eb", "#7c3aed", "#ec4899"][i]}
                emissiveIntensity={1.2}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.25, 0.012, 8, 80]} />
              <meshBasicMaterial color="#fff" transparent opacity={0.3} />
            </mesh>
          </Float>
        </AssemblyPart>
      ))}
    </group>
  );
}
function Laboratory() {
  return (
    <group>
      {[-2.6, 0, 2.6].map((x, i) => (
        <AssemblyPart
          key={x}
          stage={5}
          part={i}
          position={[x, (i % 2) * 0.6, 0]}
          rotation={[0, -x * 0.1, 0]}
        >
          <mesh>
            <boxGeometry args={[2.2, 1.4, 0.08]} />
            <meshStandardMaterial
              color="#080d1e"
              emissive={["#2563eb", "#7c3aed", "#ec4899"][i]}
              emissiveIntensity={0.35}
            />
          </mesh>
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={j} position={[-0.45, 0.4 - j * 0.18, 0.05]}>
              <planeGeometry args={[1 - j * 0.09, 0.025]} />
              <meshBasicMaterial color={j % 2 ? "#60a5fa" : "#c084fc"} />
            </mesh>
          ))}
        </AssemblyPart>
      ))}
    </group>
  );
}
function Portal() {
  const transmissionReady = useExperience((s) => s.activeSection >= 4);
  return (
    <group>
      <AssemblyPart stage={6} part={0}>
        <mesh>
          <torusGeometry args={[2, 0.12, 10, 48]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={4}
          />
        </mesh>
      </AssemblyPart>
      <AssemblyPart stage={6} part={1}>
        <mesh>
          <sphereGeometry args={[1.35, 24, 24]} />
          {transmissionReady ? (
            <MeshTransmissionMaterial
              transmission={1}
              thickness={0.6}
              roughness={0.05}
              chromaticAberration={0.12}
              color="#2563eb"
            />
          ) : (
            <meshBasicMaterial
              color="#2563eb"
              transparent
              opacity={0}
              depthWrite={false}
            />
          )}
        </mesh>
      </AssemblyPart>
      <AssemblyPart stage={6} part={2}>
        <Sparkles count={36} scale={4} color="#ec4899" speed={0.45} />
      </AssemblyPart>
    </group>
  );
}
function World({ light }: { light: boolean }) {
  const root = useRef<THREE.Group>(null);
  useFrame((state, d) => {
    if (!root.current) return;
    const { progress, assemblyProgress } = useExperience.getState();
    const section = assemblyProgress < 1 ? 0 : Math.max(0, progress * 6 - 0.62);
    root.current.position.y = THREE.MathUtils.damp(
      root.current.position.y,
      section * -9,
      3,
      d,
    );
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      state.pointer.x * 0.08,
      3,
      d,
    );
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.35,
      2,
      d,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      state.pointer.y * 0.25,
      2,
      d,
    );
    state.camera.lookAt(0, 0, -1);
  });
  return (
    <>
      <fog
        attach="fog"
        args={[light ? "#f5f7fb" : "#020617", light ? 18 : 7, light ? 48 : 20]}
      />
      <ambientLight intensity={light ? 1.55 : 0.5} />
      <hemisphereLight
        color={light ? "#ffffff" : "#93c5fd"}
        groundColor={light ? "#bfdbfe" : "#020617"}
        intensity={light ? 1 : 0.15}
      />
      <pointLight
        position={[4, 4, 4]}
        color={light ? "#2563eb" : "#2563eb"}
        intensity={light ? 14 : 18}
      />
      <pointLight
        position={[-4, -2, 2]}
        color={light ? "#8b5cf6" : "#ec4899"}
        intensity={light ? 10 : 12}
      />
      <Stars radius={60} depth={30} count={light ? 320 : 500} factor={2} />
      <ParticleCloud light={light} />
      <group ref={root}>
        <group position={[0, 0, 0]}>
          <Workstation />
        </group>
        <group position={[0, 9, 0]}>
          <SkillGalaxy />
        </group>
        <group position={[0, 18, 0]}>
          <Road />
        </group>
        <group position={[0, 27, 0]}>
          <Museum />
        </group>
        <group position={[0, 36, 0]}>
          <Laboratory />
        </group>
        <group position={[0, 45, 0]}>
          <Portal />
        </group>
      </group>
    </>
  );
}
export default function DigitalWorld({
  active,
  theme,
}: {
  active: boolean;
  theme: "dark" | "light";
}) {
  const ready = useExperience((s) => s.setWorldReady);
  return (
    <Canvas
      className="world-canvas"
      camera={{ position: [0, 0, 8], fov: 48 }}
      dpr={1}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,
      }}
      onCreated={() => ready(true)}
    >
      <World light={theme === "light"} />
    </Canvas>
  );
}
