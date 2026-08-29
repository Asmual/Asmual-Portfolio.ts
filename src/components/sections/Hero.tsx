"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, FolderKanban, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const titles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "React & Next.js Specialist",
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
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, titles]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-4 sm:py-6"
    >
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Image with Animated Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-1"
          >
            <div className="relative group w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-accent/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-xl group-hover:bg-accent/40 transition-all duration-500" />
              <div className="relative w-full h-full bg-linear-to-tr from-accent to-accent/40 p-1.5 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
                <div className="w-full h-full bg-card-bg rounded-[29%_69%_69%_29%/29%_29%_69%_69%] overflow-hidden relative">
                  <Image
                    src="/images/asmual.png"
                    alt="Asmual Obaidul Hoque"
                    sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"  
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hello, I&apos;m</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                Asmual Obaidul Hoque
              </h1>
              {/* Typewriter Text Animation */}
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-accent min-h-9 flex items-center justify-center lg:justify-start">
                <span>{currentText}</span>
                <span className="animate-pulse ml-0.5 text-accent">|</span>
              </p>
            </div>

            <p className="max-w-xl text-sm sm:text-base text-foreground/80 leading-relaxed">
              Passionate about building responsive, high-performance web
              applications using React.js, Next.js, Node.js, Express.js, and
              MongoDB. Specialized in RESTful APIs, secure authentication, and
              scalable full-stack architectures.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="/resume/Asmual Obaidul Hoque - Full Stack Developer-Resume.pdf"
                download="Asmual-Obaidul-Hoque-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold shadow-md hover:bg-accent/90 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card-bg border border-border text-foreground text-sm font-semibold shadow-sm hover:border-accent hover:text-accent transition-all duration-300"
              >
                <FolderKanban className="w-4 h-4" />
                <span>View My Work</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
