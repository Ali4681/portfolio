import { useState, useEffect } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-down"
  | "rotate-left"
  | "rotate-right"
  | "auto";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  autoDelay?: number;
  autoIndex?: number;
  autoTotal?: number;
}

const ScrollAnimationWrapper = ({
  children,
  className = "",
  animation = "auto",
  duration = 1000,
  delay = 0,
  autoDelay = 200,
  autoIndex = 0,
  autoTotal = 1,
}: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);
  const [animationStyle, setAnimationStyle] = useState<string>("");

  // Calculate automatic animation based on index
  useEffect(() => {
    if (animation === "auto") {
      const patterns = [
        "fade-up",
        "fade-left",
        "fade-right",
        "zoom-in",
        "flip-up",
        "rotate-left",
      ];
      const patternIndex = autoIndex % patterns.length;
      setAnimationStyle(patterns[patternIndex]);
    } else {
      setAnimationStyle(animation);
    }
  }, [animation, autoIndex]);

  // Calculate automatic timing
  const calculateTiming = () => {
    if (autoTotal > 1) {
      const baseDelay = autoDelay * autoIndex;
      const progress = autoIndex / (autoTotal - 1); // 0 to 1
      const curve = Math.sin((progress * Math.PI) / 2); // Easing curve
      return baseDelay * curve;
    }
    return delay;
  };

  const getTransform = () => {
    const offset = 50;
    switch (animationStyle) {
      case "fade-up":
        return `translateY(${offset}px)`;
      case "fade-down":
        return `translateY(-${offset}px)`;
      case "fade-left":
        return `translateX(-${offset}px)`;
      case "fade-right":
        return `translateX(${offset}px)`;
      case "zoom-in":
        return "scale(0.8)";
      case "zoom-out":
        return "scale(1.2)";
      case "flip-up":
        return "perspective(1000px) rotateX(90deg)";
      case "flip-down":
        return "perspective(1000px) rotateX(-90deg)";
      case "rotate-left":
        return "perspective(1000px) rotateY(-90deg)";
      case "rotate-right":
        return "perspective(1000px) rotateY(90deg)";
      default:
        return "translateY(30px)";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [elementRef]);

  const computedDelay = calculateTiming();
  const easing = "cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <div
      ref={(el) => setElementRef(el)}
      style={{
        transform: isVisible ? "none" : getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms ${easing} ${computedDelay}ms`,
        willChange: "transform, opacity",
      }}
      className={`${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
