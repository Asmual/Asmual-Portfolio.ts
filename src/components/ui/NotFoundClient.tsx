"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ArrowLeft,
  Compass,
  Radio,
  Sparkles,
  FolderKanban,
  Mail,
  Terminal,
  RotateCcw,
  Radar,
  Satellite,
  Layers,
  Code2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle definition
    const starCount = Math.min(100, Math.floor((width * height) / 12000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
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

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;
        star.alpha += star.alphaSpeed;

        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        // Screen wrap
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const renderX = star.x + currentMouseX * (star.size * 0.4);
        const renderY = star.y + currentMouseY * (star.size * 0.4);

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.fill();

        // Subtle constellation lines between nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const starB = stars[j];
          const dx = star.x - starB.x;
          const dy = star.y - starB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(
              starB.x + currentMouseX * (starB.size * 0.4),
              starB.y + currentMouseY * (starB.size * 0.4)
            );
            ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - dist / 75) * 0.12})`;
            ctx.lineWidth = 0.6;
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
      className="pointer-events-none absolute inset-0 z-0 opacity-70"
    />
  );
}

export default function NotFoundClient() {
  const [isPinging, setIsPinging] = useState(false);
  const [pingCount, setPingCount] = useState(0);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname || "/unknown-route");
    }
  }, []);

  const triggerRadarPing = () => {
    setIsPinging(true);
    setPingCount((prev) => prev + 1);
    setTimeout(() => {
      setIsPinging(false);
    }, 2400);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground select-none">
      {/* Dynamic Starfield Canvas Background */}
      <CosmicStarfield />

      {/* Ambient Gradient Glow Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-accent/15 blur-[130px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-[340px] h-[340px] bg-purple-500/10 blur-[100px] rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-emerald-500/10 blur-[110px] rounded-full z-0" />

      {/* Main Navbar */}
      <Navbar />

      {/* Main 404 Hero Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-6xl mx-auto w-full">
        {/* Floating Draggable Tech/Code Shards */}
        <div className="w-full relative max-w-4xl flex items-center justify-center">
          {/* Shard 1: Top Left */}
          <motion.div
            drag
            dragConstraints={{ top: -15, bottom: 15, left: -15, right: 15 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
              rotate: [0, -2, 0],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hidden md:flex absolute -top-8 left-4 lg:left-10 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg/80 backdrop-blur-md border border-rose-500/30 text-[11px] font-mono text-rose-400 shadow-lg cursor-grab active:cursor-grabbing hover:border-rose-500/60 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
            <span>ERR_404: VECTOR_LOST</span>
          </motion.div>

          {/* Shard 2: Top Right */}
          <motion.div
            drag
            dragConstraints={{ top: -15, bottom: 15, left: -15, right: 15 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: [0, 8, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            }}
            className="hidden md:flex absolute -top-6 right-4 lg:right-10 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg/80 backdrop-blur-md border border-accent/30 text-[11px] font-mono text-accent shadow-lg cursor-grab active:cursor-grabbing hover:border-accent/60 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>&#123; status: 404, sector: &quot;unmapped&quot; &#125;</span>
          </motion.div>

          {/* Shard 3: Bottom Left */}
          <motion.div
            drag
            dragConstraints={{ top: -15, bottom: 15, left: -15, right: 15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="hidden md:flex absolute -bottom-6 left-12 lg:left-20 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg/80 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400 shadow-lg cursor-grab active:cursor-grabbing hover:border-emerald-500/60 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>PING_TIMEOUT: 404ms</span>
          </motion.div>

          {/* Shard 4: Bottom Right */}
          <motion.div
            drag
            dragConstraints={{ top: -15, bottom: 15, left: -15, right: 15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, 7, 0],
              rotate: [0, -1.5, 0],
            }}
            transition={{
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            }}
            className="hidden md:flex absolute -bottom-8 right-12 lg:right-24 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-mono text-amber-400 shadow-lg cursor-grab active:cursor-grabbing hover:border-amber-500/60 transition-colors"
          >
            <Satellite className="w-3.5 h-3.5 text-amber-400" />
            <span>COORDINATE_DRIFT: 0x404</span>
          </motion.div>

          {/* THE 404 CENTERPIECE */}
          <div className="flex items-center justify-center gap-2 sm:gap-6 my-4">
            {/* Left "4" */}
            <motion.span
              initial={{ opacity: 0, x: -60, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl sm:text-9xl md:text-[14rem] font-black tracking-tighter leading-none bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent drop-shadow-2xl font-mono select-none"
            >
              4
            </motion.span>

            {/* Center "0" - Interactive Orbital Satellite & Radar Core */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 flex items-center justify-center"
            >
              {/* Outer Orbital Dashed Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/40 pointer-events-none"
              />

              {/* Counter-rotating Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 sm:inset-5 rounded-full border border-accent/25 pointer-events-none"
              >
                {/* Orbiting Satellite Particle Node */}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#3b82f6]" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
              </motion.div>

              {/* Rotating Radar Sonar Beam Sweep */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 sm:inset-8 rounded-full pointer-events-none overflow-hidden"
              >
                <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(59,130,246,0.35)_360deg)]" />
              </motion.div>

              {/* Pulsing Sonar Ripple Shockwaves on Ping */}
              <AnimatePresence>
                {isPinging && (
                  <>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.9 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.7 }}
                      animate={{ scale: 2.3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                      className="absolute inset-0 rounded-full border border-accent pointer-events-none"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Central Space Satellite / Probe Card */}
              <motion.div
                drag
                dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
                dragElastic={0.4}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerRadarPing}
                title="Click or drag to send telemetry radar ping!"
                className="relative z-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-3xl bg-card-bg/90 backdrop-blur-xl border border-accent/40 shadow-xl flex flex-col items-center justify-center cursor-pointer group hover:border-accent hover:shadow-accent/25 transition-all duration-300"
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/10 to-purple-500/10 -z-10 group-hover:opacity-100 transition-opacity" />

                {/* Satellite Core SVG Icon */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center text-accent"
                >
                  <Satellite className="w-7 h-7 sm:w-11 sm:h-11 md:w-14 md:h-14 stroke-[1.6] group-hover:text-emerald-400 transition-colors" />
                </motion.div>

                {/* Pulsing Beacon Dot */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>

                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-foreground/50 mt-1 uppercase tracking-wider group-hover:text-accent transition-colors">
                  Orbiter
                </span>
              </motion.div>
            </motion.div>

            {/* Right "4" */}
            <motion.span
              initial={{ opacity: 0, x: 60, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl sm:text-9xl md:text-[14rem] font-black tracking-tighter leading-none bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent drop-shadow-2xl font-mono select-none"
            >
              4
            </motion.span>
          </div>
        </div>

        {/* DIAGNOSTIC TELEMETRY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 sm:mt-8 w-full max-w-2xl bg-card-bg/70 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center relative overflow-hidden"
        >
          {/* Subtle Top Accent Border Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          {/* Anomaly Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-mono font-bold tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span>COORDINATE ANOMALY: ROUTE NOT FOUND</span>
          </div>

          {/* Headings */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Lost in Digital Space
            </h1>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto leading-relaxed">
              আপনি যে পেজটি খুঁজছেন তা মহাবিশ্বের কোনো ব্ল্যাকহোলে হারিয়ে গেছে অথবা এর ঠিকানা স্থানান্তরিত হয়েছে।
            </p>
            {currentPath && (
              <p className="text-xs font-mono text-foreground/50 pt-1">
                Requested Sector:{" "}
                <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                  {currentPath}
                </span>
              </p>
            )}
          </div>

          {/* Radar Telemetry Interactive Action Bar */}
          <div className="p-3.5 rounded-2xl bg-background/60 border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-foreground/75">
              <Radar
                className={`w-4 h-4 text-accent ${
                  isPinging ? "animate-spin text-emerald-400" : ""
                }`}
              />
              <span className="font-mono text-[11.5px]">
                {isPinging
                  ? `Broadcasting distress beacon [404.0 MHz]... (Ping #${pingCount})`
                  : `Telemetry scanner ready • Ping satellite core`}
              </span>
            </div>

            <button
              type="button"
              onClick={triggerRadarPing}
              className="px-3.5 py-1.5 rounded-xl bg-card-bg hover:bg-accent hover:text-white border border-border hover:border-accent text-foreground text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0 active:scale-95"
            >
              <Radio className="w-3.5 h-3.5 text-accent" />
              <span>Send Radar Ping</span>
            </button>
          </div>

          {/* Primary Quick-Navigation Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Primary Return Home */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-accent text-white font-bold text-xs sm:text-sm hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-accent/40 active:scale-98 transition-all group"
            >
              <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Mission Control</span>
            </Link>

            {/* Explore Projects */}
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-background hover:bg-card-bg border border-border hover:border-accent text-foreground font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-md active:scale-98 transition-all group"
            >
              <FolderKanban className="w-4 h-4 text-accent transition-transform group-hover:scale-110" />
              <span>View Projects</span>
            </Link>

            {/* Contact Developer */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-background hover:bg-card-bg border border-border hover:border-accent text-foreground font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-md active:scale-98 transition-all group"
            >
              <Mail className="w-4 h-4 text-emerald-500 transition-transform group-hover:scale-110" />
              <span>Contact Asmual</span>
            </Link>
          </div>

          {/* Quick Jump Safe Sectors Navigation Bar */}
          <div className="pt-4 border-t border-border/50 space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 block">
              Safe Coordinate Destinations
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <Link
                href="/#home"
                className="px-3 py-1 rounded-xl bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium transition-all"
              >
                #home
              </Link>
              <Link
                href="/projects"
                className="px-3 py-1 rounded-xl bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium transition-all"
              >
                #projects
              </Link>
              <Link
                href="/skills"
                className="px-3 py-1 rounded-xl bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium transition-all"
              >
                #skills
              </Link>
              <Link
                href="/about"
                className="px-3 py-1 rounded-xl bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium transition-all"
              >
                #about
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1 rounded-xl bg-background/80 hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground/75 hover:text-accent font-medium transition-all"
              >
                #contact
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Main Footer */}
      <Footer />
    </div>
  );
}
