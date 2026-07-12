"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) {
  useEffect(() => {
    if (disabled) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const context = gsap.context(() => {
      gsap.to(".hero-content", {
        opacity: 0,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "65% center",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-canvas", {
        opacity: 0.12,
        scale: 1.16,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".network", {
        clipPath: "inset(50% 50% 50% 50%)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 72%",
          end: "top 25%",
          scrub: 1,
        },
      });
      gsap.utils
        .toArray<HTMLElement>(".section-heading h2")
        .forEach((heading) =>
          gsap.from(heading, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: { trigger: heading, start: "top 85%" },
          }),
        );
    });
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      context.revert();
      lenis.destroy();
    };
  }, [disabled]);
  return children;
}
