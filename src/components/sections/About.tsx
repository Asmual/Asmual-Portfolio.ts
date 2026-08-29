"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Download, 
  CheckCircle2, 
  Briefcase, 
  FolderCheck, 
  Globe2, 
  Languages 
} from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-accent/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: About Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                About Me
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground">
              Building Solutions That <br className="hidden sm:inline" />
              <span className="text-accent">Make an Impact</span>
            </h2>

            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
              I&apos;m a passionate Full Stack Developer based in Bangladesh. I specialize in building scalable web applications using modern technologies like React, Next.js, Express, and MongoDB. With a strong eye for design and a love for clean code, I help turn ideas into powerful digital experiences.
            </p>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                <Briefcase className="w-4 h-4 text-accent shrink-0" />
                <span>MERN & Next.js Specialist</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                <Globe2 className="w-4 h-4 text-accent shrink-0" />
                <span>Available for Freelance</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                <FolderCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Multiple Projects Completed</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-foreground/90 font-medium">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Open for Remote Roles</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href="/resume/Asmual Obaidul Hoque - Full Stack Developer-Resume.pdf"
                download="Asmual-Obaidul-Hoque-Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:bg-accent/90 transition-all duration-300"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4" />
              </a>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground font-medium text-sm transition-all duration-300"
              >
                <span>More Details</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Contact & Location Info Card */}
          <div className="lg:col-span-5">
            <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Location */}
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-sm sm:text-base font-bold text-foreground mt-0.5">Bangladesh</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-sm sm:text-base font-bold text-foreground mt-0.5 truncate">asmualobaidulhoque@gmail.com</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">Languages</p>
                  <p className="text-sm sm:text-base font-bold text-foreground mt-0.5">Bengali, English</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}