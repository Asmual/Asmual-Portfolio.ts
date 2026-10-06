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
  Pencil,
  Users,
  Globe,
  Smartphone,
  Monitor,
  TrendingUp,
  Calendar,
  Clock,
  Tablet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectCategory } from "@/data/projects";
import { getCountryFlag, formatDuration } from "@/lib/analytics";

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

  // Active view tab: "create" | "manage" | "analytics"
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "analytics">("create");

  // Visitor Analytics State
  const [analyticsData, setAnalyticsData] = useState<any | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [aiErrorMessage, setAiErrorMessage] = useState<string | null>(null);

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

  // Custom Edit Modal State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTagline, setEditTagline] = useState("");
  const [editCategory, setEditCategory] = useState<ProjectCategory>("Full Stack");
  const [editDescription, setEditDescription] = useState("");
  const [editOverview, setEditOverview] = useState("");
  const [editArchitecture, setEditArchitecture] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editCustomTagInput, setEditCustomTagInput] = useState("");
  const [editImages, setEditImages] = useState<string[]>([]);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);
  const [editCustomImageUrl, setEditCustomImageUrl] = useState("");
  const [editLiveUrl, setEditLiveUrl] = useState("");
  const [editGithubUrl, setEditGithubUrl] = useState("");
  const [editServerGithubUrl, setEditServerGithubUrl] = useState("");
  const [editRole, setEditRole] = useState("Full Stack Developer");
  const [editStatus, setEditStatus] = useState<"Live" | "Completed" | "In Progress">("Live");
  const [editDuration, setDurationEdit] = useState("Production System");
  const [editKeyFeatures, setEditKeyFeatures] = useState<string[]>([]);
  const [newEditFeatureInput, setNewEditFeatureInput] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

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

  const loadAnalytics = async () => {
    setIsLoadingAnalytics(true);
    try {
      const res = await fetch("/api/analytics/stats");
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setAnalyticsData(data.data);
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setIsLoadingAnalytics(false);
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
          loadAnalytics();
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
    setAiErrorMessage(null);

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
        const errorMsg = result.message || "AI generation failed. Please try again.";
        setAiErrorMessage(errorMsg);
      }
    } catch (err: any) {
      setAiErrorMessage(`AI generation error: ${err?.message || "Network request failed"}`);
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

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setEditTitle(p.title || "");
    setEditTagline(p.tagline || "");
    setEditCategory(p.category || "Full Stack");
    setEditDescription(p.description || "");
    setEditOverview(p.overview || "");
    setEditArchitecture(p.architecture || "");
    setEditTags(p.tags ? [...p.tags] : []);
    setEditImages(p.images ? [...p.images] : []);
    setEditLiveUrl(p.liveUrl || "");
    setEditGithubUrl(p.githubUrl || p.clientGithubUrl || "");
    setEditServerGithubUrl(p.serverGithubUrl || "");
    setEditRole(p.role || "Full Stack Developer");
    setEditStatus(p.status || "Live");
    setDurationEdit(p.duration || "Production System");
    setEditKeyFeatures(p.keyFeatures ? [...p.keyFeatures] : []);
    setEditErrorMessage(null);
  };

  const toggleEditTag = (tech: string) => {
    setEditTags((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const addCustomEditTag = () => {
    const trimmed = editCustomTagInput.trim();
    if (trimmed && !editTags.includes(trimmed)) {
      setEditTags((prev) => [...prev, trimmed]);
      setEditCustomTagInput("");
    }
  };

  const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingEditImage(true);
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
          setEditImages((prev) => [...prev, data.url]);
        }
      } catch (err) {
        console.error("Edit upload failed:", err);
      }
    }
    setIsUploadingEditImage(false);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const addEditManualImageUrl = () => {
    const trimmed = editCustomImageUrl.trim();
    if (trimmed && !editImages.includes(trimmed)) {
      setEditImages((prev) => [...prev, trimmed]);
      setEditCustomImageUrl("");
    }
  };

  const removeEditImage = (urlToRemove: string) => {
    setEditImages((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const addEditFeature = () => {
    const trimmed = newEditFeatureInput.trim();
    if (trimmed) {
      setEditKeyFeatures((prev) => [...prev, trimmed]);
      setNewEditFeatureInput("");
    }
  };

  const removeEditFeature = (idx: number) => {
    setEditKeyFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveEditedProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editTitle.trim() || !editDescription.trim() || !editLiveUrl.trim()) {
      setEditErrorMessage("Title, description, and live URL are required.");
      return;
    }

    if (editImages.length === 0) {
      setEditErrorMessage("Please provide at least one screenshot for the project.");
      return;
    }

    setIsSavingEdit(true);
    setEditErrorMessage(null);

    const payload = {
      id: editingProject.id,
      title: editTitle.trim(),
      tagline: editTagline.trim(),
      category: editCategory,
      description: editDescription.trim(),
      overview: editOverview.trim(),
      architecture: editArchitecture.trim(),
      tags: editTags,
      images: editImages,
      liveUrl: editLiveUrl.trim(),
      githubUrl: editGithubUrl.trim() || undefined,
      serverGithubUrl: editServerGithubUrl.trim() || undefined,
      role: editRole,
      status: editStatus,
      duration: editDuration,
      keyFeatures: editKeyFeatures,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.project) {
        setProjects((prev) =>
          prev.map((proj) => (proj.id === editingProject.id ? data.project : proj))
        );
        setEditingProject(null);
        setDeleteStatusMessage(`Project "${data.project.title}" has been successfully updated!`);
        setTimeout(() => setDeleteStatusMessage(null), 4000);
      } else {
        setEditErrorMessage(data.message || "Failed to update project.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Update failed.";
      setEditErrorMessage(msg);
    } finally {
      setIsSavingEdit(false);
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

          <button
            onClick={() => {
              setActiveTab("analytics");
              loadAnalytics();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-accent text-white shadow-xs"
                : "bg-card-bg text-foreground/70 hover:text-foreground border border-border"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Visitor Analytics</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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

              {aiErrorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{aiErrorMessage}</span>
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

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 rounded-lg text-foreground/50 hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VISITOR ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Header with Refresh Button */}
            <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">
                    Visitor Analytics &amp; Traffic Overview
                  </h2>
                </div>
                <p className="text-xs text-foreground/60 mt-1">
                  Privacy-first real-time audience metrics and visitor geography stored in your MongoDB Atlas database.
                </p>
              </div>

              <button
                type="button"
                onClick={loadAnalytics}
                disabled={isLoadingAnalytics}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent transition-all cursor-pointer self-start sm:self-auto shadow-2xs disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAnalytics ? "animate-spin text-accent" : ""}`} />
                <span>Refresh Data</span>
              </button>
            </div>

            {isLoadingAnalytics && !analyticsData ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-foreground/60">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
                <span className="text-xs font-medium">Loading visitor analytics...</span>
              </div>
            ) : (
              <>
                {/* 5 Key Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {/* Card 1: Live Now */}
                  <div className="p-4 rounded-2xl bg-card-bg border border-emerald-500/30 shadow-xs space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                        Live Now
                      </span>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">
                      {analyticsData?.liveCount || 1}
                    </p>
                    <p className="text-[11px] text-foreground/50">Active devices right now</p>
                  </div>

                  {/* Card 2: Today */}
                  <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
                        Today
                      </span>
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">
                      {analyticsData?.todayUnique ?? 0}
                    </p>
                    <p className="text-[11px] text-foreground/50">
                      Unique devices • {analyticsData?.todayPageviews ?? 0} views
                    </p>
                  </div>

                  {/* Card 3: This Week */}
                  <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
                        This Week
                      </span>
                      <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">
                      {analyticsData?.weekUnique ?? 0}
                    </p>
                    <p className="text-[11px] text-foreground/50">Unique devices (7 days)</p>
                  </div>

                  {/* Card 4: This Month */}
                  <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
                        This Month
                      </span>
                      <Clock className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">
                      {analyticsData?.monthUnique ?? 0}
                    </p>
                    <p className="text-[11px] text-foreground/50">Unique devices (30 days)</p>
                  </div>

                  {/* Card 5: All-time Pageviews & Unique */}
                  <div className="p-4 rounded-2xl bg-card-bg border border-border shadow-xs space-y-2 col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
                        All-Time Views
                      </span>
                      <Users className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <p className="text-2xl font-extrabold text-accent">
                      {analyticsData?.totalPageviews ?? 0}
                    </p>
                    <p className="text-[11px] text-foreground/50">
                      {analyticsData?.totalUnique ?? 0} unique devices
                    </p>
                  </div>
                </div>

                {/* Middle Grid: Devices & Countries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Device Distribution */}
                  <div className="p-5 rounded-2xl bg-card-bg border border-border shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-accent" />
                        <span>Device Breakdown</span>
                      </h3>
                      <span className="text-[11px] text-foreground/50 font-mono">
                        {(analyticsData?.devices?.Desktop || 0) + (analyticsData?.devices?.Mobile || 0) + (analyticsData?.devices?.Tablet || 0)} Total
                      </span>
                    </div>

                    {(() => {
                      const desktop = analyticsData?.devices?.Desktop || 0;
                      const mobile = analyticsData?.devices?.Mobile || 0;
                      const tablet = analyticsData?.devices?.Tablet || 0;
                      const total = Math.max(1, desktop + mobile + tablet);

                      const dPct = Math.round((desktop / total) * 100);
                      const mPct = Math.round((mobile / total) * 100);
                      const tPct = Math.round((tablet / total) * 100);

                      return (
                        <div className="space-y-3.5 text-xs">
                          {/* Desktop */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-foreground/80">
                              <span className="inline-flex items-center gap-1.5">
                                <Monitor className="w-3.5 h-3.5 text-accent" />
                                <span className="font-semibold">Desktop</span>
                              </span>
                              <span className="font-mono font-bold text-foreground">
                                {desktop} ({dPct}%)
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-foreground/5 overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full transition-all duration-500"
                                style={{ width: `${dPct}%` }}
                              />
                            </div>
                          </div>

                          {/* Mobile */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-foreground/80">
                              <span className="inline-flex items-center gap-1.5">
                                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="font-semibold">Mobile</span>
                              </span>
                              <span className="font-mono font-bold text-foreground">
                                {mobile} ({mPct}%)
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-foreground/5 overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                style={{ width: `${mPct}%` }}
                              />
                            </div>
                          </div>

                          {/* Tablet */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-foreground/80">
                              <span className="inline-flex items-center gap-1.5">
                                <Tablet className="w-3.5 h-3.5 text-purple-500" />
                                <span className="font-semibold">Tablet</span>
                              </span>
                              <span className="font-mono font-bold text-foreground">
                                {tablet} ({tPct}%)
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-foreground/5 overflow-hidden">
                              <div
                                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${tPct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Top Countries */}
                  <div className="p-5 rounded-2xl bg-card-bg border border-border shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Globe className="w-4 h-4 text-accent" />
                        <span>Top Locations</span>
                      </h3>
                      <span className="text-[11px] text-foreground/50">Geographic Source</span>
                    </div>

                    {(!analyticsData?.topCountries || analyticsData.topCountries.length === 0) ? (
                      <p className="text-xs text-foreground/50 italic py-6 text-center">
                        No geographic visits logged yet. Real visitor countries will show here.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {analyticsData.topCountries.map((c: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-xl bg-background border border-border/70 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{getCountryFlag(c.countryCode)}</span>
                              <span className="font-medium text-foreground">{c.country}</span>
                            </div>
                            <span className="font-mono font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10">
                              {c.count} {c.count === 1 ? "visit" : "visits"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Currently Active Devices (Live Now) */}
                {analyticsData?.activeDevices && analyticsData.activeDevices.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-emerald-500/30 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                          Active Live Devices ({analyticsData.activeDevices.length})
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        1 Device = 1 Visitor
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {analyticsData.activeDevices.map((dev: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-background border border-emerald-500/20 text-xs space-y-2 hover:border-emerald-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground flex items-center gap-1.5">
                              {dev.device === "Mobile" ? (
                                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                              ) : dev.device === "Tablet" ? (
                                <Tablet className="w-3.5 h-3.5 text-purple-500" />
                              ) : (
                                <Monitor className="w-3.5 h-3.5 text-accent" />
                              )}
                              <span>{dev.deviceModel || dev.device}</span>
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-semibold">
                              {formatDuration(dev.durationSeconds)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-foreground/70 text-[11px]">
                            <span className="flex items-center gap-1.5">
                              <span>{getCountryFlag(dev.countryCode)}</span>
                              <span>{dev.city ? `${dev.city}, ` : ""}{dev.country}</span>
                            </span>
                            <span className="font-mono text-accent truncate max-w-[120px]" title={dev.path}>
                              {dev.path}
                            </span>
                          </div>

                          <div className="text-[10.5px] text-foreground/50 border-t border-border/40 pt-1.5 flex items-center justify-between">
                            <span>{dev.browser} • {dev.os}</span>
                            <span className="font-mono text-[9.5px]">ID: {dev.visitorId?.slice(0, 8)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Visitor Activity Stream */}
                <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>Recent Visitors Stream</span>
                      </h3>
                      <p className="text-[11px] text-foreground/50 mt-0.5">
                        Latest real-time pageviews, device specifics, and stay duration
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Live Feed
                    </span>
                  </div>

                  {(!analyticsData?.recentVisitors || analyticsData.recentVisitors.length === 0) ? (
                    <p className="text-xs text-foreground/50 italic py-8 text-center">
                      No visitor stream logged yet. Refresh or browse pages on the live site to populate.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[10.5px] uppercase font-semibold text-foreground/50 border-b border-border/60">
                            <th className="pb-2">Location</th>
                            <th className="pb-2">Page Visited</th>
                            <th className="pb-2">Device &amp; Browser</th>
                            <th className="pb-2">Duration</th>
                            <th className="pb-2 text-right">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {analyticsData.recentVisitors.map((v: any, i: number) => {
                            const dateObj = new Date(v.timestamp);
                            const formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                            const formattedDate = dateObj.toLocaleDateString([], { month: "short", day: "numeric" });

                            return (
                              <tr key={i} className="hover:bg-foreground/2 transition-colors">
                                <td className="py-2.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">{getCountryFlag(v.countryCode)}</span>
                                    <div>
                                      <span className="font-semibold text-foreground block">
                                        {v.city ? `${v.city}, ` : ""}{v.country}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2.5 font-mono text-accent">
                                  {v.path}
                                </td>
                                <td className="py-2.5 text-foreground/75">
                                  <span className="font-medium text-foreground">{v.deviceModel || v.device}</span>
                                  <span className="text-foreground/50 text-[11px] block">{v.browser} ({v.os})</span>
                                </td>
                                <td className="py-2.5 font-mono text-[11px] text-foreground/70">
                                  {formatDuration(v.durationSeconds || 0)}
                                </td>
                                <td className="py-2.5 text-right text-foreground/50 font-mono text-[11px]">
                                  {formattedDate} {formattedTime}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
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

      {/* Custom Edit Project Modal */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-card-bg border border-border rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border sticky -top-5 sm:-top-7 bg-card-bg/95 backdrop-blur-sm pt-1 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/20">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Edit Project: {editingProject.title}
                    </h3>
                    <p className="text-[11px] text-foreground/60">
                      Update images, tech stack, titles, and details in MongoDB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-xl text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Error Alert */}
              {editErrorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{editErrorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveEditedProject} className="space-y-6">
                {/* 1. Identity & Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <FolderKanban className="w-3.5 h-3.5" />
                    <span>Project Identity & Classification</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Title *</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Tagline</label>
                      <input
                        type="text"
                        value={editTagline}
                        onChange={(e) => setEditTagline(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Category</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as ProjectCategory)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Role</label>
                      <input
                        type="text"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      >
                        <option value="Live">Live</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Short Description (Card) *</label>
                    <textarea
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground leading-relaxed resize-y"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Detailed Technical Overview</label>
                    <textarea
                      rows={3}
                      value={editOverview}
                      onChange={(e) => setEditOverview(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground leading-relaxed resize-y"
                    />
                  </div>
                </div>

                {/* 2. Live & Code URLs */}
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Project Links</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Live Demo URL *</label>
                      <input
                        type="url"
                        value={editLiveUrl}
                        onChange={(e) => setEditLiveUrl(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/80">Client / Main GitHub URL</label>
                      <input
                        type="url"
                        value={editGithubUrl}
                        onChange={(e) => setEditGithubUrl(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground/80">Server GitHub URL (Optional)</label>
                    <input
                      type="url"
                      value={editServerGithubUrl}
                      onChange={(e) => setEditServerGithubUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                    />
                  </div>
                </div>

                {/* 3. Screenshots & Cloudinary Photos */}
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-accent flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Screenshots & Media ({editImages.length})</span>
                    </h4>
                    <span className="text-[10px] text-foreground/50">Cloudinary CDN</span>
                  </div>

                  {/* Existing thumbnails */}
                  {editImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {editImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-xl overflow-hidden border border-border group bg-background"
                        >
                          <Image
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => removeEditImage(imgUrl)}
                              className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
                              title="Delete screenshot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={imgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-card-bg text-foreground hover:bg-background transition-colors"
                              title="View full image"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent text-white shadow-xs">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload new photo or enter URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <input
                        ref={editFileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleEditFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={isUploadingEditImage}
                        onClick={() => editFileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-semibold rounded-xl border border-dashed border-border hover:border-accent/60 bg-background text-foreground/80 hover:text-foreground transition-all cursor-pointer disabled:opacity-60"
                      >
                        {isUploadingEditImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading to Cloudinary...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-accent" />
                            <span>Upload New Screenshots</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={editCustomImageUrl}
                        onChange={(e) => setEditCustomImageUrl(e.target.value)}
                        placeholder="Or paste image URL directly..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                      />
                      <button
                        type="button"
                        onClick={addEditManualImageUrl}
                        className="px-3 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors cursor-pointer shrink-0"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Technology Stack Chips */}
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-accent flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Technologies &amp; Tools ({editTags.length})</span>
                    </h4>
                  </div>

                  {/* Active tags badges */}
                  <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 rounded-xl bg-background border border-border">
                    {editTags.length === 0 ? (
                      <span className="text-xs text-foreground/40 italic">No technologies selected. Click below or type to add.</span>
                    ) : (
                      editTags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-accent/15 text-accent border border-accent/30"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() => toggleEditTag(t)}
                            className="hover:text-rose-500 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Popular preset chips */}
                  <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1">
                    {popularTechnologies.map((tech) => {
                      const isSelected = editTags.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleEditTag(tech)}
                          className={`px-2 py-0.5 text-[11px] font-medium rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-accent text-white border-accent"
                              : "bg-background border-border text-foreground/70 hover:border-accent/50"
                          }`}
                        >
                          {tech}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom tag input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editCustomTagInput}
                      onChange={(e) => setEditCustomTagInput(e.target.value)}
                      placeholder="Add custom technology (e.g., Pinecone, BullMQ)..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomEditTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addCustomEditTag}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* 5. Key Features */}
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Key Features ({editKeyFeatures.length})</span>
                  </h4>

                  <div className="space-y-1.5">
                    {editKeyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-xl bg-background border border-border text-xs text-foreground/90 gap-2"
                      >
                        <span className="truncate">{feat}</span>
                        <button
                          type="button"
                          onClick={() => removeEditFeature(i)}
                          className="text-foreground/40 hover:text-rose-500 cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newEditFeatureInput}
                      onChange={(e) => setNewEditFeatureInput(e.target.value)}
                      placeholder="Add a key feature highlight..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-foreground/40"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addEditFeature();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addEditFeature}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors cursor-pointer"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border sticky -bottom-5 sm:-bottom-7 bg-card-bg/95 backdrop-blur-sm pb-1">
                  <button
                    type="button"
                    disabled={isSavingEdit}
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-background border border-border hover:bg-foreground/5 text-foreground/80 hover:text-foreground transition-all cursor-pointer disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-accent hover:bg-accent/90 active:scale-98 text-white transition-all shadow-md shadow-accent/25 cursor-pointer disabled:opacity-60"
                  >
                    {isSavingEdit ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving to MongoDB...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
