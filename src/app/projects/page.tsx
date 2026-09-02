"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  FolderKanban, 
  ExternalLink, 
  Code2, 
  Search, 
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories, Project, ProjectCategory } from "@/data/projects";

function ProjectShowcaseCard({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [project.images.length, isHovered]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-card-bg border border-border rounded-2xl overflow-hidden shadow-sm hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Card Media Preview Header */}
      <div>
        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-foreground/5">
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
                alt={`${project.title} preview`}
                fill
                priority={project.id === "arthub"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </AnimatePresence>

          {/* Category Badge & Live Pulse */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border text-[11px] font-semibold text-foreground/90 shadow-sm">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border text-[11px] font-medium text-foreground/90 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{project.status || "Live System"}</span>
            </span>
          </div>

          {/* Image Navigation Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                aria-label={`Show image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImageIndex === index
                    ? "w-4 bg-accent"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
              {project.title}
            </h2>
            {project.tagline && (
              <p className="text-xs text-accent font-medium line-clamp-1">
                {project.tagline}
              </p>
            )}
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed line-clamp-3 pt-0.5">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-medium"
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
                className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/70 hover:text-accent transition-colors cursor-pointer"
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
                    className="mt-2 space-y-1.5 overflow-hidden text-xs text-foreground/80 bg-background/60 p-3 rounded-xl border border-border/60"
                  >
                    {project.keyFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
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

      {/* Card Action Footer */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-border/70">
          <a
            href={project.githubUrl || project.clientGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-card-bg border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Repository</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 shadow-sm transition-all duration-200"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tagline && project.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen text-foreground py-10 sm:py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient Lighting Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        {/* Back Link with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Featured Works &amp; <span className="text-accent">Projects</span>
          </h1>

          <p className="text-foreground/75 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Explore a comprehensive collection of production-ready web applications, modern full-stack platforms, and client architectures.
          </p>
        </motion.div>

        {/* Interactive Filter & Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card-bg/60 border border-border/80 backdrop-blur-md shadow-sm"
        >
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {projectCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer ${
                    isSelected
                      ? "bg-accent text-white shadow-sm"
                      : "bg-background/80 text-foreground/70 hover:text-foreground hover:bg-background border border-border/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search by keyword or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-background border border-border/70 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Active Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex items-center justify-between text-xs text-foreground/60 px-1"
        >
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>
              Showing <strong className="text-foreground font-semibold">{filteredProjects.length}</strong> of {projectsData.length} projects
            </span>
          </div>

          {selectedCategory !== "All" && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-accent hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </motion.div>

        {/* Projects Grid with Stagger Animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectShowcaseCard key={project.id} project={project} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center space-y-3 bg-card-bg/40 border border-border/60 rounded-2xl"
              >
                <Sparkles className="w-8 h-8 text-accent mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No Projects Found</h3>
                <p className="text-xs text-foreground/60 max-w-sm mx-auto">
                  No projects match your current filter criteria &quot;{searchQuery || selectedCategory}&quot;. Try resetting your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-accent text-white hover:opacity-90 transition-opacity"
                >
                  View All Projects
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}