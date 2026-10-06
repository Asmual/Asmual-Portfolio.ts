"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const DOT_COUNT = 16;
const BASE_SIZE = 10; // 10px base circle

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only enable on desktop devices with a fine pointer (mouse/trackpad) and hover capability
    const hasFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    if (!hasFinePointer) {
      return;
    }

    setIsEnabled(true);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Initialize dots at offscreen coordinates
    const dots = Array.from({ length: DOT_COUNT }, () => ({
      x: -100,
      y: -100,
    }));

    let targetX = -100;
    let targetY = -100;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore simulated touch or pen events
      if (e.pointerType === "touch" || e.pointerType === "pen") {
        if (containerRef.current) {
          containerRef.current.style.opacity = "0";
        }
        isVisible = false;
        return;
      }

      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dots.forEach((dot) => {
          dot.x = targetX;
          dot.y = targetY;
        });
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }
    };

    // Detect clickable interactive hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      isHovering = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")
      );
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    const handleTouchStart = () => {
      // Touch screen interaction detected -> immediately hide cursor
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.display = "none";
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // High performance ticker (Composite-only transform & opacity)
    const onTick = () => {
      if (!isVisible || targetX < 0 || targetY < 0) return;

      // 1. Lead dot smoothly tracks mouse position
      dots[0].x += (targetX - dots[0].x) * 0.72;
      dots[0].y += (targetY - dots[0].y) * 0.72;

      // 2. Trailing dots follow previous dot with spring-elastic damping
      // When mouse stops, every trailing dot smoothly catches up and collapses into one dot!
      for (let i = 1; i < DOT_COUNT; i++) {
        const prev = dots[i - 1];
        const current = dots[i];
        const ease = 0.36 + (i / DOT_COUNT) * 0.08;
        current.x += (prev.x - current.x) * ease;
        current.y += (prev.y - current.y) * ease;
      }

      // 3. Update transforms using GPU-accelerated translate3d + scale
      const centerOffset = BASE_SIZE / 2; // 5px

      for (let i = 0; i < DOT_COUNT; i++) {
        const el = dotElementsRef.current[i];
        if (!el) continue;

        const dot = dots[i];
        const progress = 1 - i / (DOT_COUNT - 1); // 1.0 at head, 0.0 at tail

        // Scale: head is 0.95 (or 1.35 on hover, 0.7 on click), tail scales down to 0.22 (2.2px)
        let scale = 0.22 + 0.78 * Math.pow(progress, 0.75);
        if (i === 0) {
          scale = isClicking ? 0.7 : isHovering ? 1.35 : 0.95;
        }

        // Apply hardware-accelerated transform
        el.style.transform = `translate3d(${dot.x - centerOffset}px, ${dot.y - centerOffset}px, 0) scale(${scale})`;
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hidden md:block select-none pointer-events-none fixed inset-0 z-99999"
      style={{
        opacity: 0,
        transition: "opacity 0.2s ease-out",
      }}
    >
      {Array.from({ length: DOT_COUNT }).map((_, i) => {
        const progress = 1 - i / (DOT_COUNT - 1);
        const opacity = i === 0 ? 1 : Math.max(0.15, 0.88 * Math.pow(progress, 1.15));

        return (
          <div
            key={i}
            ref={(el) => {
              dotElementsRef.current[i] = el;
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: `${BASE_SIZE}px`,
              height: `${BASE_SIZE}px`,
              borderRadius: "50%",
              pointerEvents: "none",
              willChange: "transform",
              backgroundColor: i === 0 ? "#ffffff" : "var(--accent, #f59e0b)",
              opacity: opacity,
              boxShadow:
                i === 0
                  ? "0 0 10px var(--accent, #f59e0b), 0 0 20px var(--accent, #f59e0b)"
                  : `0 0 ${Math.max(3, 8 * progress)}px var(--accent, #f59e0b)`,
              border: i === 0 ? "1.5px solid var(--accent, #f59e0b)" : "none",
              transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            }}
          />
        );
      })}
    </div>
  );
}
