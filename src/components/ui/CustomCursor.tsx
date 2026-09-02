"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for compact 24px halo ring (approx 20-24px area)
  const ringSpringConfig = { damping: 24, stiffness: 220, mass: 0.4 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // Fast crisp spring for the primary center dot
  const dotSpringConfig = { damping: 32, stiffness: 600, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    setMounted(true);

    // Disable only on pure touch devices with no hover capability
    if (window.matchMedia("(pointer: coarse) and (hover: none)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* 1. Compact ~24px Trailing Halo Ring with 20px Subtle Glow */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-6 h-6 rounded-full border border-accent/60 bg-accent/15 shadow-[0_0_16px_var(--accent)] pointer-events-none"
      />

      {/* 2. Sharp Center Accent Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.4,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none"
      />
    </div>
  );
}
