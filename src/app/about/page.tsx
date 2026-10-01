import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Code2, 
  Award, 
  Terminal, 
  Laptop, 
  Download, 
  Sparkles, 
  Database, 
  Server, 
  Rocket, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Layers
} from "lucide-react";

export const metadata = {
  title: "Biography | Asmual Obaidul Hoque - Full Stack Software Engineer",
  description: "Explore the background, technical journey, core competencies, and continuous learning philosophy of Asmual Obaidul Hoque.",
};

export default function AboutPage() {
  const competencyMatrix = [
    {
      category: "Frontend Engineering",
      icon: Code2,
      skills: [
        "Next.js (App Router & Server Actions)",
        "React & Component Architecture",
        "TypeScript (Strict Type Safety)",
        "Tailwind CSS & Modern Styling",
        "Framer Motion & Interactive UI/UX",
      ],
    },
    {
      category: "Backend & Systems",
      icon: Server,
      skills: [
        "Node.js & Express.js Core",
        "RESTful API Design & Scalability",
        "JWT, OAuth & Role-Based Auth (RBAC)",
        "Middleware Architecture & Validation",
        "Payment Processing (Stripe Integration)",
      ],
    },
    {
      category: "Databases & High-Speed Caching",
      icon: Database,
      skills: [
        "PostgreSQL & Relational Data Design",
        "Prisma ORM (Schema & Migrations)",
        "Redis (In-Memory Caching & Rate Limiting)",
        "MongoDB Atlas & Aggregation Pipelines",
        "Query Optimization & Indexing",
      ],
    },
    {
      category: "Cloud, BaaS & DevOps",
      icon: Cpu,
      skills: [
        "Supabase (Auth, Real-time & DB)",
        "Docker (Containerization & Env Consistency)",
        "Firebase Authentication & Hosting",
        "Git & Advanced Collaborative Workflows",
        "Vercel, Render & Cloud Deployments",
      ],
    },
  ];

  const engineeringPrinciples = [
    {
      title: "Resilient & Type-Safe Architecture",
      desc: "Leveraging TypeScript across frontend and backend layers to eliminate runtime errors, accelerate development, and make codebases maintainable.",
    },
    {
      title: "Performance & Low-Latency Caching",
      desc: "Deploying Redis caching alongside PostgreSQL and MongoDB to slash server response times, minimize database bottlenecks, and ensure peak responsiveness.",
    },
    {
      title: "Continuous Learning & Agility",
      desc: "Actively studying emerging industry standards, from Next.js App Router optimizations to Supabase BaaS and Gemini AI integrations, turning modern tech into functional software.",
    },
    {
      title: "User-First Engineering & Design",
      desc: "Balancing powerful backend logic with pixel-perfect, accessible, and intuitive user interfaces designed to elevate overall user satisfaction.",
    },
  ];

  return (
    <main className="min-h-screen text-foreground py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors group font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-foreground/60 border border-border px-2.5 py-1 rounded-full bg-card-bg">
            Bio &amp; Technical Dossier
          </span>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Professional Biography</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Engineering High-Performance <br className="hidden sm:inline" />
            <span className="text-accent">Full-Stack Digital Solutions</span>
          </h1>
          <p className="text-sm sm:text-base text-foreground/75 max-w-3xl leading-relaxed">
            I am <strong className="text-foreground">Asmual Obaidul Hoque</strong>, a Full Stack Software Engineer based in Dhaka, Bangladesh. With a relentless focus on clean code, type safety, and real-world scalability, I design and build reliable digital platforms that bridge aesthetic frontend experiences with robust backend systems.
          </p>
        </div>

        {/* Executive Background & Narrative */}
        <section className="bg-card-bg border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <div className="p-2 rounded-xl bg-accent/10 text-accent border border-accent/20">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Background &amp; Technical Journey</h2>
              <p className="text-xs text-foreground/60">From interface precision to distributed backend architecture</p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
            <p>
              My path into software development began with a passion for designing engaging, responsive web interfaces. Over time, that enthusiasm quickly matured into a deep engineering curiosity for complete full-stack architecture—spanning asynchronous server backends, database schema normalization, and distributed caching layers.
            </p>
            <p>
              Today, I specialize in the modern TypeScript and JavaScript ecosystems. On the frontend, I craft lightning-fast web applications utilizing <strong className="text-foreground">Next.js (App Router)</strong>, <strong className="text-foreground">React</strong>, and <strong className="text-foreground">Tailwind CSS</strong>. On the backend, I build scalable RESTful architectures with <strong className="text-foreground">Node.js</strong> and <strong className="text-foreground">Express</strong>, orchestrating robust data storage across both relational (<strong className="text-foreground">PostgreSQL with Prisma ORM</strong>) and document-oriented (<strong className="text-foreground">MongoDB Atlas with Mongoose</strong>) databases.
            </p>
            <p>
              To ensure low latency and high availability under heavy workloads, I integrate <strong className="text-foreground">Redis</strong> for high-throughput in-memory caching and session rate-limiting, and adopt <strong className="text-foreground">Supabase</strong> for accelerated backend-as-a-service workflows, real-time channels, and role-based access control.
            </p>
          </div>
        </section>

        {/* Technical Competencies Matrix */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Core Competency Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {competencyMatrix.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-card-bg border border-border/70 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{item.category}</h3>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {item.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Engineering Philosophy & Continuous Learning */}
        <section className="bg-card-bg border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <div className="p-2 rounded-xl bg-accent/10 text-accent border border-accent/20">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Philosophy &amp; Continuous Learning</h2>
              <p className="text-xs text-foreground/60">How I approach problem-solving and rapid skill adoption</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engineeringPrinciples.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-background/50 border border-border/60 space-y-1.5">
                <h3 className="text-sm font-bold text-accent">{item.title}</h3>
                <p className="text-xs text-foreground/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training, Certifications & Credentials */}
        <section className="bg-card-bg border border-border/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <div className="p-2 rounded-xl bg-accent/10 text-accent border border-accent/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Training &amp; Verified Certifications</h2>
              <p className="text-xs text-foreground/60">Structured curriculum and practical capstone execution</p>
            </div>
          </div>

          <div className="p-5 bg-background/60 rounded-xl border border-border/60 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-accent">Complete Web Development Course</h3>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-semibold">
                Programming Hero — Web Batch 13
              </span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed pt-1">
              Graduated from an intensive, hands-on software development program covering modern JavaScript (ES6+), React.js, Next.js, Node.js, Express, MongoDB Atlas, relational databases, REST API design, state management, and real-world deployment practices.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-500 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Certificate of Completion &amp; Capstone Delivery</span>
            </div>
          </div>
        </section>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <a
            href="/resume/Asmual Obaidul Hoque - Full Stack Developer-Resume.pdf"
            download="Asmual-Obaidul-Hoque-Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:bg-accent/90 transition-all duration-300"
          >
            <span>Download Full Resume</span>
            <Download className="w-4 h-4" />
          </a>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-card-bg border border-border hover:border-accent hover:text-accent text-foreground font-semibold text-sm transition-all duration-300 shadow-xs group"
          >
            <span>Let&apos;s Build Together</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </main>
  );
}