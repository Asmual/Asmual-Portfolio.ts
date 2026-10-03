"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Code2,
  Database,
  Cloud,
  Cpu,
  Layers,
  Check,
  X,
  LogOut,
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectCategory } from "@/data/projects";

// Curated library of clickable technology chips
const popularTechnologies = [
  // Frontend
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "HTML5",
  "CSS3",
  "Redux",
  // Backend & APIs
  "Node.js",
  "Express",
  "REST API",
  "GraphQL",
  "Python",
  "FastAPI",
  // Databases & ORMs
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Mongoose",
  "Redis",
  "Supabase",
  // Cloud, Auth & DevOps
  "Docker",
  "Cloudinary",
  "Stripe",
  "JWT",
  "Git",
  "Vercel",
  "Netlify",
  "Render",
];

const categories: ProjectCategory[] = ["Full Stack", "Frontend", "Backend", "Team Projects"];

export default function DashboardPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Active view tab: "create" | "manage"
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Full Stack");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [architecture, setArchitecture] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["React", "Next.js", "Tailwind CSS"]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [clientGithubUrl, setClientGithubUrl] = useState("");
  const [serverGithubUrl, setServerGithubUrl] = useState("");
  const [featured, setFeatured] = useState(true);
  const [isTeamProject, setIsTeamProject] = useState(false);
  const [status, setStatus] = useState<"Live" | "Completed" | "In Progress">("Live");
  const [role, setRole] = useState("Full Stack Developer");
  const [duration, setDuration] = useState("Production System");
  const [keyFeatures, setKeyFeatures] = useState<string[]>([
    "Responsive modern UI with dynamic state management",
    "Secure RESTful API integration with robust data handling",
    "Optimized performance and scalable database queries",
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState("");

  // Submission feedback
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Custom Delete Modal State
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [deleteStatusMessage, setDeleteStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  // Check auth status on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/login");
        } else {
          setIsAdmin(true);
          setAdminUser(data.user);
          loadProjects();
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  // Toggle technology chip
  const toggleTag = (tech: string) => {
    setSelectedTags((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const addCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
      setCustomTagInput("");
    }
  };

  // Upload image to Cloudinary via server API
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    setSubmissionStatus(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setUploadedImages((prev) => [...prev, data.url]);
        } else {
          alert(`Cloudinary upload failed: ${data.message || "Unknown error"}`);
        }
      } catch (err: any) {
        alert(`Upload error: ${err?.message}`);
      }
    }

    setIsUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addManualImageUrl = () => {
    const trimmed = customImageUrl.trim();
    if (trimmed && !uploadedImages.includes(trimmed)) {
      setUploadedImages((prev) => [...prev, trimmed]);
      setCustomImageUrl("");
    }
  };

  const removeImage = (urlToRemove: string) => {
    setUploadedImages((prev) => prev.filter((url) => url !== urlToRemove));
  };

  // AI Generation with Gemini
  const handleGenerateAi = async () => {
    if (!aiPrompt.trim()) {
      alert("Please enter a short description of your project for Gemini AI.");
      return;
    }

    setIsGeneratingAi(true);
    setAiSuccessMessage(null);

    try {
      const res = await fetch("/api/ai/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const result = await res.json();

      if (res.ok && result.success && result.data) {
        const data = result.data;
        if (data.title) setTitle(data.title);
        if (data.tagline) setTagline(data.tagline);
        if (data.description) setDescription(data.description);
        if (data.overview) setOverview(data.overview);
        if (data.category && categories.includes(data.category)) {
          setCategory(data.category as ProjectCategory);
        }
        if (Array.isArray(data.tags) && data.tags.length > 0) {
          setSelectedTags((prev) => Array.from(new Set([...prev, ...data.tags])));
        }
        if (Array.isArray(data.keyFeatures) && data.keyFeatures.length > 0) {
          setKeyFeatures(data.keyFeatures);
        }

        setAiSuccessMessage(
          "✨ Gemini AI generated project title, description, category, tags, and key features! Review and polish them below."
        );
      } else {
        alert(result.message || "AI generation failed. Please try again.");
      }
    } catch (err: any) {
      alert(`AI generation error: ${err?.message}`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const addFeature = () => {
    const trimmed = newFeatureInput.trim();
    if (trimmed) {
      setKeyFeatures((prev) => [...prev, trimmed]);
      setNewFeatureInput("");
    }
  };

  const removeFeature = (idx: number) => {
    setKeyFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit project to MongoDB
  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !liveUrl.trim()) {
      setSubmissionStatus({
        type: "error",
        message: "Please fill in Project Title, Description, and Live URL.",
      });
      return;
    }

    if (uploadedImages.length === 0) {
      setSubmissionStatus({
        type: "error",
        message: "Please upload at least one project screenshot to Cloudinary.",
      });
      return;
    }

    setIsSubmittingProject(true);
    setSubmissionStatus(null);

    const projectPayload = {
      title,
      tagline,
      category,
      description,
      overview,
      architecture,
      tags: selectedTags,
      images: uploadedImages,
      liveUrl,
      githubUrl: githubUrl || undefined,
      clientGithubUrl: clientGithubUrl || undefined,
      serverGithubUrl: serverGithubUrl || undefined,
      featured,
      isTeamProject: isTeamProject || category === "Team Projects",
      status,
      role,
      duration,
      keyFeatures,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionStatus({
          type: "success",
          message: `🎉 Project "${title}" was successfully saved to MongoDB and published to your portfolio!`,
        });

        // Reset form
        setTitle("");
        setTagline("");
        setDescription("");
        setOverview("");
        setArchitecture("");
        setUploadedImages([]);
        setLiveUrl("");
        setGithubUrl("");
        setClientGithubUrl("");
        setServerGithubUrl("");
        setAiPrompt("");
        setAiSuccessMessage(null);

        // Refresh project list
        loadProjects();
      } else {
        setSubmissionStatus({
          type: "error",
          message: data.message || "Failed to publish project to MongoDB.",
        });
      }
    } catch (err: any) {
      setSubmissionStatus({
        type: "error",
        message: err?.message || "Network error while saving project.",
      });
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    setIsDeletingProject(true);
    try {
      const res = await fetch(`/api/projects?id=${projectToDelete.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
        setDeleteStatusMessage(`Project "${projectToDelete.title}" has been permanently deleted.`);
        setProjectToDelete(null);
        setTimeout(() => setDeleteStatusMessage(null), 4000);
      } else {
        alert(data.message || "Failed to delete project.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed.";
      alert(`Delete error: ${msg}`);
    } finally {
      setIsDeletingProject(false);
    }
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-xs text-foreground/60 font-mono">Authenticating Administrator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-card-bg/95 border-b border-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border group-hover:border-accent p-0.5 bg-card-bg shadow-sm">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/as_logo.png"
                    alt="Asmual"
                    fill
                    sizes="32px"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <span className="font-mono font-bold text-sm tracking-tight text-foreground">
                <span className="text-accent">&lt;</span>Asmual<span className="text-accent"> /&gt;</span>
              </span>
            </Link>

            <span className="h-4 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-tight bg-accent/10 border border-accent/20 text-accent px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Admin Console</span>
              </span>
              {adminUser?.email && (
                <span className="text-[11px] font-mono text-foreground/50 hidden md:inline">
                  ({adminUser.email})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Portfolio</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              title="Logout from Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Ecosystem Metrics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                Total Projects
              </p>
              <p className="text-xl font-extrabold text-foreground">{projects.length}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                Database Engine
              </p>
              <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                MongoDB Atlas Connected
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                Media Storage
              </p>
              <p className="text-xs font-bold text-sky-500 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                Cloudinary CDN Active
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                AI Copilot
              </p>
              <p className="text-xs font-bold text-purple-500 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                Gemini 3.8 Flash Ready
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("create")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "create"
                ? "bg-accent text-white shadow-xs"
                : "bg-card-bg text-foreground/70 hover:text-foreground border border-border"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Project</span>
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "manage"
                ? "bg-accent text-white shadow-xs"
                : "bg-card-bg text-foreground/70 hover:text-foreground border border-border"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Manage Projects ({projects.length})</span>
          </button>
        </div>

        {/* TAB 1: ADD NEW PROJECT */}
        {activeTab === "create" && (
          <div className="space-y-6">
            {/* Gemini AI Auto-Writer Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-br from-purple-500/10 via-card-bg to-accent/10 border border-purple-500/30 shadow-md space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-500 text-white shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm font-bold text-foreground">
                    Gemini AI Project Writer
                  </h2>
                </div>
                <span className="text-[10.5px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  Gemini API Powered
                </span>
              </div>

              <p className="text-xs text-foreground/70">
                Write a quick 1-2 sentence idea or raw notes about your project. Gemini AI will automatically generate an engaging title, 2-line description, in-depth overview, category, technology stack, and key features!
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., I built an online doctor booking web app with Next.js, PostgreSQL, Stripe payments and telemedicine video"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-purple-500 focus:outline-none text-foreground placeholder:text-foreground/40"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleGenerateAi();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleGenerateAi}
                  disabled={isGeneratingAi}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 text-white hover:bg-purple-700 active:scale-98 transition-all cursor-pointer disabled:opacity-60 shadow-xs shrink-0"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Drafting with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Project Info</span>
                    </>
                  )}
                </button>
              </div>

              {aiSuccessMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{aiSuccessMessage}</span>
                </div>
              )}
            </div>

            {/* Submission Status Alert */}
            {submissionStatus && (
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                  submissionStatus.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-500"
                }`}
              >
                {submissionStatus.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span className="font-medium leading-relaxed">{submissionStatus.message}</span>
              </div>
            )}

            {/* Main Project Form */}
            <form onSubmit={handleSubmitProject} className="space-y-6">
              {/* Basic Information */}
              <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-foreground pb-2 border-b border-border/60 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-accent" />
                  <span>Project Overview &amp; Identity</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80 flex items-center justify-between">
                      <span>Project Title *</span>
                      <span className="text-[10px] text-foreground/50">Required</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., ShopNexus — Next.js Multi-Vendor Marketplace"
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">
                      Subtitle / Technical Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g., Scalable e-commerce engine with Redis caching & Stripe"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const isSelected = category === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-accent text-white border-accent shadow-xs"
                              : "bg-background text-foreground/70 border-border hover:border-accent/50"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Short Description (2 Lines) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80 flex items-center justify-between">
                    <span>Short Description (Card Overview) *</span>
                    <span className="text-[10px] text-foreground/50">2 lines recommended</span>
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief 2-line summary explaining the core value and technical stack..."
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40 leading-relaxed resize-y"
                  />
                </div>

                {/* Detailed Technical Overview */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80">
                    Detailed Architecture &amp; Solution Overview
                  </label>
                  <textarea
                    rows={3}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    placeholder="Comprehensive explanation of architectural decisions, database modeling, and user journey..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40 leading-relaxed resize-y"
                  />
                </div>
              </div>

              {/* Clickable Technology Stack Selector */}
              <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    <span>Technologies &amp; Tools (Click to Select)</span>
                  </h3>
                  <span className="text-xs font-mono text-accent">
                    {selectedTags.length} Selected
                  </span>
                </div>

                <p className="text-xs text-foreground/60">
                  Click any technology below to instantly add or remove it from your project without manual typing:
                </p>

                {/* Clickable Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {popularTechnologies.map((tech) => {
                    const isSelected = selectedTags.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTag(tech)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-accent/15 border-accent text-accent font-semibold shadow-2xs"
                            : "bg-background border-border text-foreground/70 hover:border-accent/40 hover:text-foreground"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-accent" />}
                        <span>{tech}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Tag */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    placeholder="Add custom library (e.g. Socket.io, Zustand, BullMQ)..."
                    className="flex-1 max-w-sm px-3.5 py-1.5 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addCustomTag}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground transition-colors cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>

                {/* Current Selected Tags List */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-foreground/50 font-semibold mr-1">Active:</span>
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-accent text-white"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="hover:opacity-75 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloudinary Media Uploader */}
              <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-accent" />
                    <span>Project Screenshots &amp; Media (Cloudinary CDN)</span>
                  </h3>
                  <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
                    Cloudinary CDN
                  </span>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-accent rounded-2xl p-6 text-center cursor-pointer transition-colors bg-background/50 hover:bg-accent/5 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                        {isUploadingImage ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          {isUploadingImage
                            ? "Uploading to Cloudinary..."
                            : "Click to upload screenshots directly to Cloudinary"}
                        </p>
                        <p className="text-[11px] text-foreground/50">
                          PNG, JPG, WEBP • Cloudinary CDN automatically optimizes and serves images
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Manual URL fallback */}
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Or paste an existing image URL..."
                      className="flex-1 px-3.5 py-1.5 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    />
                    <button
                      type="button"
                      onClick={addManualImageUrl}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground transition-colors cursor-pointer shrink-0"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Image Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {uploadedImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden border border-border bg-background aspect-video"
                        >
                          <Image
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            fill
                            sizes="200px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => removeImage(imgUrl)}
                              className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
                              title="Remove image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {idx === 0 && (
                            <span className="absolute bottom-1.5 left-1.5 text-[9.5px] font-bold bg-accent text-white px-1.5 py-0.5 rounded shadow-xs">
                              Cover Image
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* URLs & Deployment Links */}
              <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-foreground pb-2 border-b border-border/60 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-accent" />
                  <span>Deployment &amp; Repository Links</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80 flex items-center justify-between">
                      <span>Live Production URL *</span>
                      <span className="text-[10px] text-foreground/50">Required</span>
                    </label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://my-app.vercel.app"
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">
                      GitHub Repository URL (Unified / Client)
                    </label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/Asmual/my-repo"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">
                      Backend Server Repository URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={serverGithubUrl}
                      onChange={(e) => setServerGithubUrl(e.target.value)}
                      placeholder="https://github.com/Asmual/my-server-repo"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">
                      Developer Role &amp; Project Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role"
                        className="px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                      />
                      <select
                        value={status}
                        onChange={(e: any) => setStatus(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      >
                        <option value="Live">Status: Live</option>
                        <option value="Completed">Status: Completed</option>
                        <option value="In Progress">Status: In Progress</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-foreground pb-2 border-b border-border/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Key Project Features (Bullet Points)</span>
                </h3>

                <div className="space-y-2">
                  {keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/80 text-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="flex-1 text-foreground/90">{feat}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="text-foreground/40 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    placeholder="Add a new key feature..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground transition-colors cursor-pointer"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingProject}
                  className="w-full py-3.5 px-6 rounded-2xl bg-accent text-white font-bold text-sm shadow-md hover:bg-accent/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmittingProject ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Project to MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Publish Project to Portfolio</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MANAGE EXISTING PROJECTS */}
        {activeTab === "manage" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-foreground">Current Portfolio Projects</h2>
                <p className="text-xs text-foreground/60">
                  Manage, preview, or remove live projects stored in MongoDB Atlas.
                </p>
              </div>
              <button
                onClick={loadProjects}
                disabled={isLoadingProjects}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingProjects ? "animate-spin" : ""}`} />
                <span>Refresh List</span>
              </button>
            </div>

            {deleteStatusMessage && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">{deleteStatusMessage}</span>
              </div>
            )}

            {isLoadingProjects ? (
              <div className="py-12 text-center text-xs text-foreground/60 flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
                <span>Fetching projects from MongoDB...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="py-12 text-center text-xs text-foreground/60 bg-card-bg rounded-2xl border border-border">
                No projects found in MongoDB. Use the &quot;Add New Project&quot; tab to publish one!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      {proj.images && proj.images.length > 0 && (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-background">
                          <Image
                            src={proj.images[0]}
                            alt={proj.title}
                            fill
                            sizes="300px"
                            className="object-cover"
                          />
                          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-white shadow-xs">
                            {proj.category}
                          </span>
                        </div>
                      )}

                      <h3 className="text-sm font-bold text-foreground line-clamp-1">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.tags?.slice(0, 4).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium"
                          >
                            {t}
                          </span>
                        ))}
                        {proj.tags && proj.tags.length > 4 && (
                          <span className="text-[10px] text-foreground/50">
                            +{proj.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setProjectToDelete(proj)}
                        className="p-1.5 rounded-lg text-foreground/50 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Custom Delete Confirmation Warning Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-card-bg border border-rose-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 overflow-hidden"
            >
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 bg-rose-500/10 blur-2xl rounded-full -z-10" />

              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-500 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    Delete Project?
                  </h3>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    This action is permanent and cannot be undone. Are you sure you want to remove this project from your portfolio?
                  </p>
                </div>
              </div>

              {/* Project Card Highlight */}
              <div className="p-3 rounded-2xl bg-background border border-border/80 flex items-center gap-3">
                {projectToDelete.images && projectToDelete.images[0] && (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-foreground/5 shrink-0 border border-border">
                    <Image
                      src={projectToDelete.images[0]}
                      alt={projectToDelete.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block">
                    {projectToDelete.category}
                  </span>
                  <p className="text-xs font-bold text-foreground truncate">
                    {projectToDelete.title}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={isDeletingProject}
                  onClick={() => setProjectToDelete(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-card-bg border border-border hover:bg-background text-foreground/80 hover:text-foreground transition-all cursor-pointer disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeletingProject}
                  onClick={confirmDeleteProject}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white transition-all shadow-md shadow-rose-600/25 cursor-pointer disabled:opacity-60"
                >
                  {isDeletingProject ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Yes, Delete Project</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
