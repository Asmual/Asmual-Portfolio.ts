"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, FolderKanban, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
}

const projectsData: ProjectType[] = [
  {
    id: 1,
    title: "ArtHub — Online Art Marketplace",
    description: "A premium digital platform connecting art lovers, collectors, and global buyers with talented artists. Discover original artworks, buy securely via Stripe, manage dynamic subscription tiers, and explore full role-based creator ecosystem analytics.",
    tags: ["Next.js 15", "React", "Tailwind CSS", "MongoDB", "Express.js", "Stripe"],
    images: [
      "/images/arthub/nav-hero.png",
      "/images/arthub/browse-artwork.png",
      "/images/arthub/dashboard-admin.png",
    ],
    liveUrl: "https://arthub-three.vercel.app",
    githubUrl: "https://github.com/Asmual/arthub-client",
  },
  {
    id: 2,
    title: "DocAppoint — Doctor Appointment System",
    description: "A comprehensive healthcare platform allowing patients to book appointments, check doctor availability, and manage consultation schedules efficiently.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    images: [
      "/images/docappint/nav-hero.png",
      "/images/docappint/why-chose.png",
      "/images/docappint/all-appointpage.png",
    ],
    liveUrl: "https://docappoint-eight-drab.vercel.app",
    githubUrl: "https://github.com/Asmual/DocAppoint",
  },
  {
    id: 3,
    title: "SunCart — E-Commerce Management Dashboard",
    description: "Scalable e-commerce solution featuring dynamic inventory administration, REST APIs, fast data handling, and secure authentication.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    images: [
      "/images/suncart/nav-hero.png",
      "/images/suncart/all-product.png",
      "/images/suncart/product-details.png",
    ],
    liveUrl: "https://suncart-woad-three.vercel.app/",
    githubUrl: "https://github.com/Asmual/SunCart",
  },
];

interface ProjectCardProps {
  project: ProjectType;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <div className="bg-card-bg border border-border rounded-xl overflow-hidden shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col group">
      <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-foreground/5">
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
              alt={`${project.title} image ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
          {project.images.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? "w-4 bg-accent" 
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col grow justify-between space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-foreground/75 text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 pt-0.5">
          {project.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-border mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/70 hover:text-accent transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Container with Title on Left & Button on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-accent text-[11px] font-semibold tracking-[0.2em] uppercase bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20 inline-flex items-center gap-1">
              <FolderKanban className="w-3 h-3" />
              <span>My Works</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <p className="text-foreground/75 text-xs sm:text-sm max-w-xl">
              A showcase of web applications built with performance and clean design.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground font-semibold text-xs transition-all duration-300 group shadow-sm shrink-0 self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectsData.map((project: ProjectType) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}