import React from "react";
import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import Projects from "@/components/sections/Projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen text-foreground py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20 inline-flex items-center gap-1.5">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            All <span className="text-accent">Projects</span>
          </h1>
        </div>

        <Projects />
      </div>
    </main>
  );
}