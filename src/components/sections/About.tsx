"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Download, 
  ArrowRight,
  Code2, 
  Database, 
  Sparkles,
  Zap,
  Globe2,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Frontend Engineering",
      desc: "Pixel-perfect, responsive web apps using React 19, Next.js 15, and Tailwind CSS.",
    },
    {
      icon: Database,
      title: "Backend & Database",
      desc: "Robust RESTful APIs, authentication with JWT, MongoDB aggregations & PostgreSQL.",
    },
    {
      icon: Zap,
      title: "Performance & UX",
      desc: "Fast load times, smooth Framer Motion animations, and modern architecture.",
    },
    {
      icon: Globe2,
      title: "Remote Collaboration",
      desc: "Agile workflows, clean Git version control, and clear communication.",
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 border-t border-border/50">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Crafting Impactful <span className="text-accent">Web Solutions</span>
          </h2>

          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
            A developer dedicated to turning ideas into reliable, scalable, and intuitive digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Story & Core Capabilities */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-foreground/80 text-sm sm:text-base leading-relaxed bg-card-bg/40 p-5 sm:p-6 rounded-2xl border border-border/60">
              <p>
                Hello! I&apos;m <strong className="text-foreground font-bold">Asmual Obaidul Hoque</strong>, a Full Stack Developer based in Bangladesh. I specialize in the modern JavaScript / TypeScript ecosystem—building full-stack products with <span className="text-accent font-semibold">React, Next.js, Node.js, Express,</span> and <span className="text-accent font-semibold">MongoDB</span>.
              </p>
              <p className="text-xs sm:text-sm text-foreground/75">
                Whether creating interactive client applications, designing scalable backend APIs, or integrating payment gateways like Stripe, my focus is always on clean architecture, security, and exceptional performance.
              </p>
            </div>

            {/* Core Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-card-bg border border-border/70 hover:border-accent/40 transition-all duration-200 shadow-xs space-y-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover:scale-105 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-foreground/70 leading-relaxed pl-7">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <a
                href="/resume/Asmual Obaidul Hoque - Full Stack Developer-Resume.pdf"
                download="Asmual-Obaidul-Hoque-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-md hover:bg-accent/90 transition-all duration-300"
              >
                <span>Download Resume</span>
                <Download className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground font-semibold text-xs transition-all duration-300 group shadow-xs"
              >
                <span>Full Biography</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Quick Profile Matrix Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-card-bg border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
              {/* Header Status */}
              <div className="flex items-center justify-between pb-3.5 border-b border-border/70">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Quick Details
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Hire</span>
                </span>
              </div>

              {/* Information Rows */}
              <div className="space-y-3">
                {/* Location */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-background/60 border border-border/50">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">Location</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">Dhaka, Bangladesh</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-background/60 border border-border/50">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">Email</p>
                    <a 
                      href="mailto:asmualobaidulhoque@gmail.com" 
                      className="text-xs sm:text-sm font-bold text-foreground hover:text-accent transition-colors block truncate mt-0.5"
                    >
                      asmualobaidulhoque@gmail.com
                    </a>
                  </div>
                </div>

                {/* Training */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-background/60 border border-border/50">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">Training</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">Programming Hero (Web Batch 13)</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-background/60 border border-border/50">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">Languages</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">English (Professional), Bengali (Native)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}