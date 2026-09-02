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
  ChevronDown,
  ChevronUp,
  CheckCircle2,
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
  const [showFeatures, setShowFeatures] = useState<boolean>(false);

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card-bg border border-border rounded-2xl overflow-hidden shadow-sm hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Top Media & Content Area */}
      <div>
        {/* Interactive Image Preview with Auto-Slide */}
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-foreground/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} preview ${currentImageIndex + 1}`}
                fill
                priority={project.id === "arthub"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </AnimatePresence>

          {/* Category Badge & Live Pulse Badge */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-semibold text-foreground/90 shadow-sm">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-background/85 backdrop-blur-md border border-border/80 text-[10px] font-medium text-foreground/90 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{project.status || "Live"}</span>
            </span>
          </div>

          {/* Image Navigation Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
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
                    ? "w-3.5 bg-accent" 
                    : "w-1 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="text-[11px] text-accent font-medium line-clamp-1">
                {project.tagline}
              </p>
            )}
            <p className="text-foreground/75 text-xs leading-relaxed line-clamp-2 pt-0.5">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-medium leading-tight"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expandable Key Highlights Toggle */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowFeatures(!showFeatures)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/70 hover:text-accent transition-colors cursor-pointer"
              >
                <span>{showFeatures ? "Hide Highlights" : "Key Highlights"}</span>
                {showFeatures ? (
                  <ChevronUp className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-accent" />
                )}
              </button>

              <AnimatePresence>
                {showFeatures && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 space-y-1.5 overflow-hidden text-[11px] text-foreground/80 bg-background/50 p-2.5 rounded-xl border border-border/60"
                  >
                    {project.keyFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 leading-tight">
                        <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div className="p-4 sm:p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-border/70">
          <a
            href={project.githubUrl || project.clientGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 shadow-sm transition-all duration-200"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
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
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 border-t border-border/50">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-accent text-[11px] font-semibold tracking-[0.2em] uppercase bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20 inline-flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <p className="text-foreground/75 text-xs sm:text-sm max-w-lg leading-relaxed">
              Real-world web applications built with modern engineering, scalable databases, and clean user experience.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground font-semibold text-xs transition-all duration-300 group shadow-sm shrink-0 self-start sm:self-auto"
          >
            <span>View All Works</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          {projectCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer ${
                  isSelected
                    ? "bg-accent text-white shadow-sm"
                    : "bg-card-bg text-foreground/70 hover:text-foreground hover:border-accent/40 border border-border"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid with Layout Animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
                className="col-span-full py-12 text-center space-y-2.5 bg-card-bg/50 border border-border rounded-2xl"
              >
                <Sparkles className="w-7 h-7 text-accent mx-auto" />
                <h3 className="text-sm font-bold text-foreground">
                  New {selectedCategory} Projects in Progress
                </h3>
                <p className="text-xs text-foreground/60 max-w-sm mx-auto">
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