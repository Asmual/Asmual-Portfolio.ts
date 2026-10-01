"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Dot {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Disable on pure touch devices without hover capability
    if (window.matchMedia("(pointer: coarse) and (hover: none)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Number of chain dots in the snake trail (16 dots gives the ideal fluid chain)
    const DOT_COUNT = 16;
    const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
      x: -100,
      y: -100,
    }));

    // Mouse coordinates & state
    let targetX = -100;
    let targetY = -100;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let accentColor = "#f59e0b"; // Modern glowing amber / accent

    // Read active theme accent color dynamically
    const updateAccentColor = () => {
      try {
        const computed = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim();
        if (computed) {
          accentColor = computed;
        }
      } catch {
        accentColor = "#f59e0b";
      }
    };
    updateAccentColor();

    // Resize handler with Retina / HiDPI support
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        // Snap dots to initial cursor entrance so trail starts from cursor
        dots.forEach((dot) => {
          dot.x = targetX;
          dot.y = targetY;
        });
      }
    };

    // Detect clickable hover states (links, buttons, inputs)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")
      );
      isHovering = isInteractive;
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    // Theme observer to adapt accent color on theme switch
    const observer = new MutationObserver(() => {
      updateAccentColor();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // GSAP Ticker for smooth 60-120 FPS physics loop
    const render = () => {
      if (!ctx || !canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      if (!isVisible || targetX < 0 || targetY < 0) return;

      // 1. Lead dot follows mouse with high responsiveness (spring stiffness)
      dots[0].x += (targetX - dots[0].x) * 0.75;
      dots[0].y += (targetY - dots[0].y) * 0.75;

      // 2. Trailing dots follow the previous dot with elastic damping
      // As mouse stays still, each dot catches up and smoothly collapses into one point
      for (let i = 1; i < DOT_COUNT; i++) {
        const prev = dots[i - 1];
        const current = dots[i];
        // Dynamic ease factor creates springy snake trail
        const ease = 0.38 + (i / DOT_COUNT) * 0.08;
        current.x += (prev.x - current.x) * ease;
        current.y += (prev.y - current.y) * ease;
      }

      // 3. Render trailing dots (from tail to head so lead dot is on top)
      for (let i = DOT_COUNT - 1; i >= 0; i--) {
        const dot = dots[i];
        const progress = 1 - i / (DOT_COUNT - 1); // 1 at head (i=0), 0 at tail (i=15)

        // Head radius scales slightly on click / hover
        const baseRadius = isClicking ? 3.5 : isHovering ? 5.5 : 4.5;
        const minRadius = 1.2;
        const radius = minRadius + (baseRadius - minRadius) * Math.pow(progress, 0.75);

        // Opacity drops smoothly along the tail
        const baseOpacity = isHovering ? 1.0 : 0.95;
        const minOpacity = 0.15;
        const opacity = minOpacity + (baseOpacity - minOpacity) * Math.pow(progress, 1.2);

        ctx.save();
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);

        // Lead dot gets a crisp core with glowing halo
        if (i === 0) {
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = isHovering ? 16 : 10;
          ctx.fillStyle = "#ffffff"; // Crisp center
          ctx.globalAlpha = 1.0;
          ctx.fill();

          // Outer glowing ring on lead dot
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius + (isHovering ? 3.5 : 2), 0, Math.PI * 2);
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = isHovering ? 0.8 : 0.45;
          ctx.stroke();
        } else {
          // Trailing snake dots with glowing shadow
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 6 * progress;
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = opacity;
          ctx.fill();
        }

        ctx.restore();
      }
    };

    // Attach to GSAP high-performance ticker
    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!mounted || isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-99999 select-none"
    />
  );
}
