"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Download, 
  ArrowRight, 
  Code2, 
  Terminal
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

export default function Hero() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const titles = [
    "Full Stack Web Developer",
    "MERN Stack Specialist",
    "React & Next.js Architect",
    "TypeScript & REST API Engineer",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const fullTitle = titles[currentTitleIndex];

      if (!isDeleting) {
        setCurrentText(fullTitle.substring(0, currentText.length + 1));
        if (currentText === fullTitle) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 35 : 75);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, titles]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden py-6 sm:py-8 lg:py-10"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          
          {/* Left Column on Desktop: Content, Headlines & CTA (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 space-y-4"
          >
            {/* Live Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Projects &amp; Remote Roles</span>
            </div>

            {/* Main Headline with Moderate Font Size */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Hi, I&apos;m <span className="text-foreground">Asmual Obaidul Hoque</span>
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="min-h-7 sm:min-h-8 flex items-center justify-center lg:justify-start">
                <p className="text-base sm:text-lg lg:text-xl font-bold text-accent font-mono">
                  &lt;{currentText}&gt;
                  <span className="animate-pulse ml-0.5 text-accent font-normal">|</span>
                </p>
              </div>
            </div>

            {/* Bio Description */}
            <p className="max-w-lg text-xs sm:text-sm text-foreground/80 leading-relaxed">
              Specialized in engineering robust, modern full-stack web applications with <span className="text-foreground font-semibold">Next.js, React, Node.js, Express, and MongoDB</span>. Focused on clean architecture, secure authentication, high-performance database indexing, and delightful user interfaces.
            </p>

            {/* Quick Metrics / Highlights Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-md pt-0.5">
              <div className="p-2 sm:p-2.5 rounded-xl bg-card-bg/60 border border-border/80 backdrop-blur-xs text-center lg:text-left">
                <p className="text-sm sm:text-base font-extrabold text-foreground">3+</p>
                <p className="text-[10px] text-foreground/60 uppercase font-semibold">Production Apps</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-card-bg/60 border border-border/80 backdrop-blur-xs text-center lg:text-left">
                <p className="text-sm sm:text-base font-extrabold text-foreground">100%</p>
                <p className="text-[10px] text-foreground/60 uppercase font-semibold">TypeScript &amp; React</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-card-bg/60 border border-border/80 backdrop-blur-xs text-center lg:text-left">
                <p className="text-sm sm:text-base font-extrabold text-accent">Fast</p>
                <p className="text-[10px] text-foreground/60 uppercase font-semibold">API &amp; DB Speeds</p>
              </div>
            </div>

            {/* Action Buttons & Socials */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold shadow-md hover:bg-accent/90 transition-all duration-300 group cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/resume/Asmual Obaidul Hoque - Full Stack Developer-Resume.pdf"
                download="Asmual-Obaidul-Hoque-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card-bg border border-border text-foreground text-xs font-semibold shadow-xs hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              {/* Quick Social Links */}
              <div className="flex items-center gap-1.5 pl-0.5">
                <a
                  href="https://github.com/Asmual"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="p-2 rounded-xl bg-card-bg border border-border text-foreground/80 hover:border-accent hover:text-accent transition-colors shadow-xs cursor-pointer"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/asmual"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="p-2 rounded-xl bg-card-bg border border-border text-foreground/80 hover:border-accent hover:text-accent transition-colors shadow-xs cursor-pointer"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com/Asmual_123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Profile"
                  title="X (Twitter) Profile"
                  className="p-2 rounded-xl bg-card-bg border border-border text-foreground/80 hover:border-accent hover:text-accent transition-colors shadow-xs cursor-pointer"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://leetcode.com/u/Asmual"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  title="LeetCode Profile"
                  className="p-2 rounded-xl bg-card-bg border border-border text-foreground/80 hover:border-accent hover:text-accent transition-colors shadow-xs cursor-pointer"
                >
                  <SiLeetcode className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column on Desktop: Developer Profile Avatar with Organic Curved Shape (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
              {/* Organic Curved Ambient Glow Halo */}
              <div className="absolute inset-0 bg-accent/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-xl group-hover:bg-accent/40 transition-all duration-500" />
              
              {/* Organic Curved Gradient Border Frame */}
              <div className="relative w-full h-full bg-linear-to-tr from-accent to-accent/40 p-1.5 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
                <div className="w-full h-full bg-card-bg rounded-[29%_69%_69%_29%/29%_29%_69%_69%] overflow-hidden relative">
                  <Image
                    src="/images/asmual.png"
                    alt="Asmual Obaidul Hoque"
                    sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"  
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating Chip 1: Next.js / React (Top-Left) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3 bg-card-bg/95 backdrop-blur-md border border-border/80 px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 select-none z-10"
              >
                <div className="p-1 rounded-md bg-accent/15 text-accent">
                  <Code2 className="w-3 h-3" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-mono font-bold text-foreground leading-tight">Next.js 15 &amp; React</p>
                  <p className="text-[7.5px] text-foreground/60 leading-none">Frontend Architect</p>
                </div>
              </motion.div>

              {/* Floating Chip 2: Full Stack MERN (Bottom-Right) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 bg-card-bg/95 backdrop-blur-md border border-border/80 px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 select-none z-10"
              >
                <div className="p-1 rounded-md bg-emerald-500/15 text-emerald-500">
                  <Terminal className="w-3 h-3" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-mono font-bold text-foreground leading-tight">MERN &amp; REST APIs</p>
                  <p className="text-[7.5px] text-foreground/60 leading-none">Database &amp; Node.js</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
