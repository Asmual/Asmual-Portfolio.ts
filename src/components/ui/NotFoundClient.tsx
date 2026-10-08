"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ArrowLeft,
  Compass,
  Radio,
  Satellite,
  Terminal,
  FolderKanban,
} from "lucide-react";

// Starfield Particle Canvas with soft mouse parallax
function CosmicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse parallax offset
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle definition
    const starCount = Math.min(80, Math.floor((width * height) / 14000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      color:
        Math.random() > 0.7
          ? "rgba(59, 130, 246, " // Blue accent
          : Math.random() > 0.5
          ? "rgba(168, 85, 247, " // Purple accent
          : "rgba(226, 232, 240, ", // Soft white
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse inertia
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;
        star.alpha += star.alphaSpeed;

        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const renderX = star.x + currentMouseX * (star.size * 0.3);
        const renderY = star.y + currentMouseY * (star.size * 0.3);

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < stars.length; j++) {
          const starB = stars[j];
          const dx = star.x - starB.x;
          const dy = star.y - starB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(
              starB.x + currentMouseX * (starB.size * 0.3),
              starB.y + currentMouseY * (starB.size * 0.3)
            );
            ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - dist / 70) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
    />
  );
}

export default function NotFoundClient() {
  const router = useRouter();
  const [isPinging, setIsPinging] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname || "");
    }
  }, []);

  const triggerRadarPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
    }, 1800);
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground select-none px-4 sm:px-6">
      {/* Dynamic Starfield Canvas Background */}
      <CosmicStarfield />

      {/* Ambient Gradient Glow Orbs */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-accent/15 blur-[120px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[260px] h-[260px] bg-purple-500/10 blur-[90px] rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[280px] h-[280px] bg-emerald-500/10 blur-[100px] rounded-full z-0" />

      {/* Main Container - Optimized to fit 100% inside 1 screen without scrolling */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Floating Draggable Tech Shards */}
        <div className="w-full relative max-w-md flex items-center justify-center">
          {/* Shard 1: Top Left */}
          <motion.div
            drag
            dragConstraints={{ top: -10, bottom: 10, left: -10, right: 10 }}
            initial={{ opacity: 0, y: -15 }}
            animate={{
              opacity: 1,
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden sm:flex absolute -top-5 -left-4 z-20 items-center gap-1.5 px-2.5 py-1 rounded-full bg-card-bg/85 backdrop-blur-md border border-rose-500/30 text-[10px] font-mono text-rose-400 shadow-md cursor-grab active:cursor-grabbing hover:border-rose-500/60 transition-colors"
          >
            <Compass className="w-3 h-3 text-rose-500 animate-spin-slow" />
            <span>ERR_404</span>
          </motion.div>

          {/* Shard 2: Top Right */}
          <motion.div
            drag
            dragConstraints={{ top: -10, bottom: 10, left: -10, right: 10 }}
            initial={{ opacity: 0, y: -15 }}
            animate={{
              opacity: 1,
              y: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="hidden sm:flex absolute -top-5 -right-4 z-20 items-center gap-1.5 px-2.5 py-1 rounded-full bg-card-bg/85 backdrop-blur-md border border-accent/30 text-[10px] font-mono text-accent shadow-md cursor-grab active:cursor-grabbing hover:border-accent/60 transition-colors"
          >
            <Terminal className="w-3 h-3" />
            <span>status: 404</span>
          </motion.div>

          {/* Compact 404 Centerpiece */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 my-1">
            {/* Left "4" */}
            <motion.span
              initial={{ opacity: 0, x: -40, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent drop-shadow-xl font-mono select-none"
            >
              4
            </motion.span>

            {/* Center "0" - Interactive Orbital Satellite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 flex items-center justify-center"
            >
              {/* Outer Orbital Dashed Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/40 pointer-events-none"
              />

              {/* Counter-rotating Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 sm:inset-3 rounded-full border border-accent/25 pointer-events-none"
              >
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#3b82f6]" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              </motion.div>

              {/* Rotating Radar Sonar Beam Sweep */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 sm:inset-4 rounded-full pointer-events-none overflow-hidden"
              >
                <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(59,130,246,0.35)_360deg)]" />
              </motion.div>

              {/* Pulsing Sonar Ripple Shockwaves on Ping */}
              <AnimatePresence>
                {isPinging && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Central Satellite Interactive Core */}
              <motion.div
                drag
                dragConstraints={{ top: -15, bottom: 15, left: -15, right: 15 }}
                dragElastic={0.4}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerRadarPing}
                title="Click or drag satellite core"
                className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-card-bg/90 backdrop-blur-xl border border-accent/40 shadow-lg flex flex-col items-center justify-center cursor-pointer group hover:border-accent hover:shadow-accent/25 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/10 to-purple-500/10 -z-10 group-hover:opacity-100 transition-opacity" />

                <motion.div
                  animate={{
                    y: [0, -2, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center text-accent"
                >
                  <Satellite className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.6] group-hover:text-emerald-400 transition-colors" />
                </motion.div>

                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500" />
                </span>
              </motion.div>
            </motion.div>

            {/* Right "4" */}
            <motion.span
              initial={{ opacity: 0, x: 40, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent drop-shadow-xl font-mono select-none"
            >
              4
            </motion.span>
          </div>
        </div>

        {/* Compact Diagnostic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 w-full max-w-lg bg-card-bg/80 backdrop-blur-xl border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5 text-center relative overflow-hidden"
        >
          {/* Subtle Top Accent Border Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          {/* Anomaly Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-500 text-[11px] font-mono font-semibold tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
            </span>
            <span>404 • PAGE NOT FOUND</span>
          </div>

          {/* Headings */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              Lost in Cyberspace
            </h1>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-sm mx-auto leading-relaxed">
              The page you are looking for doesn&apos;t exist, was moved, or is temporarily unavailable.
            </p>
            {currentPath && (
              <p className="text-[11px] font-mono text-foreground/50 pt-0.5">
                Requested URL:{" "}
                <span className="text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                  {currentPath}
                </span>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-background hover:bg-card-bg border border-border hover:border-accent text-foreground font-semibold text-xs transition-all duration-200 active:scale-95 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent/90 shadow-md shadow-accent/25 hover:shadow-accent/40 transition-all duration-200 active:scale-95"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-background hover:bg-card-bg border border-border hover:border-accent text-foreground font-semibold text-xs transition-all duration-200 active:scale-95 shadow-xs"
            >
              <FolderKanban className="w-3.5 h-3.5 text-accent" />
              <span>View Projects</span>
            </Link>
          </div>

          {/* Quick Jump Links */}
          <div className="pt-2.5 border-t border-border/50 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/50 block">
              Quick Navigation
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <Link
                href="/#home"
                className="px-2.5 py-0.5 rounded-lg bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium text-[11px] transition-all"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="px-2.5 py-0.5 rounded-lg bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium text-[11px] transition-all"
              >
                Projects
              </Link>
              <Link
                href="/skills"
                className="px-2.5 py-0.5 rounded-lg bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium text-[11px] transition-all"
              >
                Skills
              </Link>
              <Link
                href="/about"
                className="px-2.5 py-0.5 rounded-lg bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium text-[11px] transition-all"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-2.5 py-0.5 rounded-lg bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium text-[11px] transition-all"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
