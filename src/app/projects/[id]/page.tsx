import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Calendar, 
  UserCheck, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Layers
} from "lucide-react";
import { projectsData } from "@/data/projects";
import ProjectCoverflowGallery from "@/components/project-detail/ProjectCoverflowGallery";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Asmual Obaidul Hoque",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const currentIndex = projectsData.findIndex((p) => p.id === id);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <main className="min-h-screen text-foreground py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ambient Lighting Glows */}
      <div className="pointer-events-none absolute top-20 left-1/4 w-96 h-96 bg-accent/10 blur-3xl rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full -z-10" />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/75 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>

          {/* Badges Strip */}
          <div className="flex items-center gap-2 flex-wrap">
            {project.teamName && (
              <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[11px] font-semibold text-accent shadow-xs flex items-center gap-1.5">
                <GitBranch className="w-3 h-3" />
                <span>Team • {project.teamName}</span>
              </span>
            )}

            <span className="px-2.5 py-0.5 rounded-full bg-card-bg border border-border text-[11px] font-semibold text-foreground/90 shadow-xs">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-card-bg border border-border text-[11px] font-medium text-foreground/90 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{project.status || "Production Live"}</span>
            </span>
          </div>
        </div>

        {/* 3D Coverflow Interactive Gallery */}
        <section className="space-y-3">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
              Interactive 3D Showcase
            </span>
            <p className="text-[11.5px] text-foreground/60">
              Click left/right slides or use arrow keys to focus and navigate high-resolution previews
            </p>
          </div>

          <ProjectCoverflowGallery images={project.images} title={project.title} />
        </section>

        {/* Project Header & Meta Summary */}
        <div className="bg-card-bg/70 border border-border/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {project.title}
              </h1>

              {project.tagline && (
                <p className="text-sm sm:text-base font-semibold text-accent">
                  {project.tagline}
                </p>
              )}

              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed pt-1">
                {project.overview || project.description}
              </p>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-accent/90 active:scale-98 transition-all"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={project.clientGithubUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-background border border-border text-foreground hover:border-accent hover:text-accent font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{project.serverGithubUrl ? "Client Code" : "Repository"}</span>
              </a>

              {project.serverGithubUrl && (
                <a
                  href={project.serverGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-background border border-border text-foreground hover:border-accent hover:text-accent font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Server Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Key Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/60 text-left">
            <div className="p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center gap-1.5 text-accent text-[11px] font-semibold mb-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>My Role</span>
              </div>
              <p className="text-xs font-bold text-foreground truncate">
                {project.role || "Full-Stack Developer"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center gap-1.5 text-accent text-[11px] font-semibold mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Category</span>
              </div>
              <p className="text-xs font-bold text-foreground">
                {project.category}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center gap-1.5 text-accent text-[11px] font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </div>
              <p className="text-xs font-bold text-foreground">
                {project.duration || "Production Sprint"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="flex items-center gap-1.5 text-accent text-[11px] font-semibold mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Deployment</span>
              </div>
              <p className="text-xs font-bold text-foreground">
                Vercel &amp; Cloud Atlas
              </p>
            </div>
          </div>
        </div>

        {/* Performance & Highlights Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Key Benchmarks &amp; Engineering Metrics</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-card-bg/80 border border-border/80 shadow-xs text-center space-y-1"
                >
                  <p className="text-lg sm:text-2xl font-extrabold text-accent">
                    {metric.value}
                  </p>
                  <p className="text-[11px] text-foreground/70 font-medium">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Features & Innovations */}
        {project.detailedFeatures && project.detailedFeatures.length > 0 && (
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Core Capabilities &amp; Special Features</span>
              </h2>
              <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                Key functionalities and technical workflows implemented in this application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.detailedFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-card-bg border border-border/80 shadow-xs space-y-2 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs text-foreground/75 leading-relaxed pl-8">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problems Solved & Technical Challenges */}
        {project.challengesSolved && project.challengesSolved.length > 0 && (
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                <span>Challenges Overcome &amp; Engineering Solutions</span>
              </h2>
              <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                Critical engineering bottlenecks identified during development and the structured solutions designed to overcome them.
              </p>
            </div>

            <div className="space-y-4">
              {project.challengesSolved.map((challenge, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border/80 shadow-xs space-y-3"
                >
                  <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <span className="text-accent font-mono text-xs">0{idx + 1}.</span>
                    <span>{challenge.title}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
                    {/* The Problem */}
                    <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>The Challenge &amp; Bottleneck</span>
                      </div>
                      <p className="text-[11.5px] sm:text-xs text-foreground/80 leading-relaxed">
                        {challenge.problem}
                      </p>
                    </div>

                    {/* The Solution */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Architectural Solution</span>
                      </div>
                      <p className="text-[11.5px] sm:text-xs text-foreground/80 leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* System Architecture & Tech Stack Badges */}
        <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card-bg/60 border border-border/80 shadow-xs space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              <span>Full-Stack Architecture &amp; Tech Stack</span>
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
              {project.architecture || "Engineered with modern frontend components and scalable backend databases."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-background border border-border/80 text-foreground font-medium text-xs shadow-2xs hover:border-accent/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Project Next & Previous Navigation Strip */}
        <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <p className="text-[10px] text-foreground/50 uppercase font-semibold">Previous Project</p>
              <p className="text-xs font-bold text-foreground group-hover:text-accent">{prevProject.title.split("—")[0].trim()}</p>
            </div>
          </Link>

          <Link
            href="/#projects"
            className="text-xs font-semibold text-accent hover:underline py-2"
          >
            View All Projects
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-end gap-3 p-3 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent transition-all group text-right"
          >
            <div className="text-right">
              <p className="text-[10px] text-foreground/50 uppercase font-semibold">Next Project</p>
              <p className="text-xs font-bold text-foreground group-hover:text-accent">{nextProject.title.split("—")[0].trim()}</p>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
