"use client";

import { useState } from "react";
import type { PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import portraitImage from "../../public/Image/3.png";

const particles = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  x: 5 + ((index * 37) % 90),
  y: 4 + ((index * 53) % 92),
  size: 2 + (index % 4),
  duration: 6 + (index % 7),
  delay: -((index * 0.47) % 6),
}));

export default function HeroAvatar({ alt }: { alt: string }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 95,
    damping: 18,
    mass: 0.75,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 95,
    damping: 18,
    mass: 0.75,
  });
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const translateX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const translateY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const glowX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const glowY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="hero-avatar-float"
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="hero-avatar-hitarea"
        onPointerMove={updatePointer}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          resetPointer();
        }}
      >
        <motion.div
          className="hero-avatar-interactive"
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, x: translateX, y: translateY }
          }
          animate={reduceMotion ? undefined : { scale: hovered ? 1.03 : 1 }}
          transition={{ scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="hero-avatar-glows"
            style={reduceMotion ? undefined : { x: glowX, y: glowY }}
            aria-hidden="true"
          >
            <motion.i
              className="hero-avatar-glow hero-avatar-glow--blue"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [0.94, 1.08, 0.94], opacity: [0.42, 0.68, 0.42] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.i
              className="hero-avatar-glow hero-avatar-glow--purple"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1.06, 0.92, 1.06], opacity: [0.3, 0.56, 0.3] }
              }
              transition={{
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="hero-avatar-particles" aria-hidden="true">
            {particles.map((particle) => (
              <motion.i
                key={particle.id}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -10 - (particle.id % 8), 0],
                        x: [0, particle.id % 2 ? 4 : -4, 0],
                        opacity: [0.18, 0.62, 0.18],
                      }
                }
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="hero-avatar-image-layer">
            <Image
              src={portraitImage}
              alt={alt}
              fill
              sizes="(max-width: 390px) calc(100vw - 2.4rem), (max-width: 760px) 320px, (max-width: 1100px) 28vw, 360px"
              preload
              className="hero-portrait-image"
            />
          </div>

          <motion.i
            className="hero-avatar-ring hero-avatar-ring--one"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
          <motion.i
            className="hero-avatar-ring hero-avatar-ring--two"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />

          <motion.i
            className="hero-avatar-scan"
            animate={
              reduceMotion
                ? undefined
                : { top: ["4%", "96%", "4%"], opacity: [0, 0.9, 0] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <div className="hero-avatar-brackets" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          <span className="hero-avatar-label hero-avatar-label--top">
            DESIGN · BUILD · SHIP
          </span>
          <span className="hero-avatar-label hero-avatar-label--bottom">
            ALBAYATI.DEV
          </span>
        </motion.div>

        <div className="hero-avatar-platform" aria-hidden="true">
          <i />
        </div>
      </div>
    </motion.div>
  );
}
