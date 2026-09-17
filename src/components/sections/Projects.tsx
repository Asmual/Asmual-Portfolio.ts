"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ExternalLink, 
  ArrowRight, 
  FolderKanban, 
  Code2, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories, Project, ProjectCategory } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (isHovered) return; // Pause auto-slide when user hovers on the card

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [project.images.length, isHovered]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card-bg border border-border/80 rounded-2xl overflow-hidden shadow-xs hover:border-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Top Media & Content Area */}
      <div className="flex flex-col flex-1">
        {/* Compact Interactive Image Preview with Auto-Slide */}
        <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-foreground/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} preview ${currentImageIndex + 1}`}
                fill
                priority={project.id === "mykeeps" || project.id === "arthub"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </AnimatePresence>

          {/* Category Badge & Live Pulse Badge */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/80 text-[9.5px] font-semibold text-foreground/90 shadow-xs">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/80 text-[9.5px] font-medium text-foreground/90 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{project.status || "Live"}</span>
            </span>
          </div>

          {/* Image Navigation Indicator Dots */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/10">
            {project.images.map((_, index: number) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                aria-label={`Slide ${index + 1}`}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImageIndex === index 
                    ? "w-3 bg-accent" 
                    : "w-1 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Body Details with Compact Padding */}
        <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 leading-snug">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="text-[10.5px] text-accent font-medium line-clamp-1">
                {project.tagline}
              </p>
            )}
            <p className="text-foreground/75 text-[11px] leading-relaxed line-clamp-2 pt-0.5">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills - Render all tags with natural wrap */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-[9.5px] px-1.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-medium leading-tight"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div className="p-3.5 sm:p-4 pt-0 mt-auto">
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-border/60">
          <a
            href={project.githubUrl || project.clientGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-semibold rounded-lg bg-background border border-border text-foreground/80 hover:border-accent hover:text-accent transition-colors shadow-2xs"
          >
            <Code2 className="w-3 h-3" />
            <span>Code</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 shadow-2xs transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === "All") return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 border-t border-border/50 scroll-mt-16">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-80 h-80 bg-accent/10 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-accent text-[10.5px] font-semibold tracking-[0.2em] uppercase bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20 inline-flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <p className="text-foreground/75 text-xs sm:text-sm max-w-xl leading-relaxed">
              Real-world web applications built with modern engineering, scalable databases, and clean user experience.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground font-semibold text-xs transition-all duration-300 group shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Works</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          {projectCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer ${
                  isSelected
                    ? "bg-accent text-white shadow-xs"
                    : "bg-card-bg text-foreground/70 hover:text-foreground hover:border-accent/40 border border-border"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards 4-Column Grid: fits 4 cards in 1 row on desktop without overflowing */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-10 text-center space-y-2 bg-card-bg/50 border border-border rounded-2xl"
              >
                <Sparkles className="w-6 h-6 text-accent mx-auto" />
                <h3 className="text-xs font-bold text-foreground">
                  New {selectedCategory} Projects in Progress
                </h3>
                <p className="text-[11px] text-foreground/60 max-w-sm mx-auto">
                  More projects in the {selectedCategory} category are currently being developed and will be added here soon.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline cursor-pointer pt-1"
                >
                  <span>View all available projects</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}