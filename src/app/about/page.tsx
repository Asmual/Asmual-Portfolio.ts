import React from "react";
import Link from "next/link";
import { ArrowLeft, Code2, Award, Terminal, Laptop, Download } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-foreground py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-3">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Full Biography
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            About <span className="text-accent">Asmual </span>
          </h1>
        </div>

        {/* Detailed Background */}
        <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Laptop className="w-5 h-5 text-accent" /> Detailed Background
          </h2>
          <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
            I am a full-stack web developer deeply focused on building high-performance, responsive web applications. My journey started with modern frontend engineering and quickly expanded to complete full-stack architecture. I hold a strong foundation in JavaScript, React, Next.js, Express, and MongoDB.
          </p>
          <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
            I enjoy transforming design concepts into clean code, optimizing database performance, implementing secure authentication, and writing clean, maintainable logic.
          </p>
        </div>

        {/* Certification & Accomplishments */}
        <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" /> Certification & Training
          </h2>
          <div className="p-4 bg-foreground/5 rounded-xl border border-border">
            <h3 className="text-base font-semibold text-accent">Complete Web Development Course</h3>
            <p className="text-xs text-foreground/60 mt-1">Programming Hero — Web Batch 13</p>
            <p className="text-xs text-foreground/80 mt-2 leading-relaxed">
              Successfully completed intensive training focused on full-stack web engineering, modern JavaScript (ES6+), React.js, Next.js, Node.js, and database integrations.
            </p>
          </div>
        </div>

        {/* Tech Stack Focus */}
        <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Code2 className="w-5 h-5 text-accent" /> Technical Focus
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/90">
            <div className="bg-foreground/5 p-3.5 rounded-xl border border-border flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-accent" />
              <span>Next.js & React Frontend</span>
            </div>
            <div className="bg-foreground/5 p-3.5 rounded-xl border border-border flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-accent" />
              <span>REST APIs & Node/Express</span>
            </div>
            <div className="bg-foreground/5 p-3.5 rounded-xl border border-border flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-accent" />
              <span>MongoDB & Database Design</span>
            </div>
            <div className="bg-foreground/5 p-3.5 rounded-xl border border-border flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-accent" />
              <span>Tailwind CSS & Modern Styling</span>
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="pt-4 flex justify-center">
          <a
            href="/resume/resume.pdf"
            download="Asmual-Obaidul-Hoque-Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:bg-accent/90 transition-all duration-300"
          >
            <span>Download Full Resume</span>
            <Download className="w-4 h-4" />
          </a>
        </div>

      </div>
    </main>
  );
}