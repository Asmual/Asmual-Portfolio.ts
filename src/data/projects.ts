export type ProjectCategory = "All" | "Full Stack" | "MERN" | "Frontend" | "Backend";

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  category: "Full Stack" | "MERN" | "Frontend" | "Backend";
  description: string;
  keyFeatures?: string[];
  tags: string[];
  images: string[];
  liveUrl: string;
  githubUrl?: string;
  clientGithubUrl?: string;
  serverGithubUrl?: string;
  featured: boolean;
  status?: "Live" | "Completed" | "In Progress";
}

export const projectsData: Project[] = [
  {
    id: "mykeeps",
    title: "My Keeps — Smart Cloud Workspace & Note Manager",
    tagline: "Google Keep inspired workspace with voice memos, PIN lock & multi-media notes",
    category: "Full Stack",
    description:
      "A feature-rich full-stack productivity workspace inspired by Google Keep. Organize ideas with multi-format notes including interactive checklists, Cloudinary-powered image attachments, voice memo recordings, PIN-locked private notes, dynamic color palettes, and bulk batch actions.",
    keyFeatures: [
      "Multi-Format Notes: Rich text, interactive checklists, Cloudinary image uploads & voice memos",
      "PIN-Protected Private Notes: Secure lock/unlock system with password encryption",
      "Smart Organization: 12+ vibrant pastel color palettes, pinned notes, archive, and trash restore",
      "Productivity Batch Actions: Multi-select batch operations for archiving, pinning, and coloring",
      "Robust Full-Stack Engine: Next.js 16, React 19, Better-Auth, Express.js 5 API & MongoDB Atlas",
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
    ],
    images: [
      "/images/mykeeps/Home.png",
      "/images/mykeeps/Notes.png",
      "/images/mykeeps/light mood.png",
    ],
    liveUrl: "https://my-keeps-pink.vercel.app",
    githubUrl: "https://github.com/Asmual/My-Keeps",
    clientGithubUrl: "https://github.com/Asmual/My-Keeps",
    serverGithubUrl: "https://github.com/Asmual/My-Keeps--Server",
    featured: true,
    status: "Live",
  },
  {
    id: "arthub",
    title: "ArtHub — Online Art Marketplace",
    tagline: "Global creator platform with Stripe billing & role-based analytics",
    category: "Full Stack",
    description:
      "A premium digital platform connecting art enthusiasts, collectors, and international buyers with talented artists. Discover original artworks, buy securely via Stripe, manage dynamic subscription tiers, and explore full creator ecosystem analytics.",
    keyFeatures: [
      "Secure payment processing & subscription tiers via Stripe",
      "Role-based dashboards (Admin, Artist, Buyer)",
      "Dynamic artwork catalogue with real-time bidding & purchase management",
      "High-performance MongoDB aggregation pipelines",
    ],
    tags: ["Next.js 15", "React", "Tailwind CSS", "MongoDB", "Express.js", "Stripe"],
    images: [
      "/images/arthub/nav-hero.png",
      "/images/arthub/browse-artwork.png",
      "/images/arthub/dashboard-admin.png",
    ],
    liveUrl: "https://arthub-three.vercel.app",
    githubUrl: "https://github.com/Asmual/arthub-client",
    clientGithubUrl: "https://github.com/Asmual/arthub-client",
    featured: true,
    status: "Live",
  },
  {
    id: "portfolio-js",
    title: "Asmual Portfolio — JavaScript Edition",
    tagline: "Interactive developer portfolio with DaisyUI & smooth motion",
    category: "Frontend",
    description:
      "Personal developer showcase website crafted with Next.js, React, JavaScript, DaisyUI, Tailwind CSS v4, and Framer Motion. Features interactive animated hero, skills display, and dark/light modes.",
    keyFeatures: [
      "Interactive typing hero with react-simple-typewriter",
      "DaisyUI & Tailwind CSS modern UI theming",
      "Lenis smooth momentum scrolling & Framer Motion transitions",
      "Cloudinary media integration & MongoDB Atlas connectivity",
    ],
    tags: ["Next.js", "React 19", "JavaScript", "Tailwind CSS", "DaisyUI", "Framer Motion"],
    images: [
      "/images/portfolio_js/Portfolio-Home.png",
      "/images/portfolio_js/Portfolio-Project.png",
      "/images/portfolio_js/Portfolio-Skills.png",
    ],
    liveUrl: "https://asmual-portfolio.vercel.app",
    githubUrl: "https://github.com/Asmual/Asmual-Next.js-Portfolio",
    featured: true,
    status: "Live",
  },
  {
    id: "docappoint",
    title: "DocAppoint — Doctor Appointment System",
    tagline: "Streamlined medical booking & doctor schedule management",
    category: "Full Stack",
    description:
      "A comprehensive healthcare platform allowing patients to book appointments, check doctor real-time availability, and manage consultation schedules efficiently with an intuitive, accessible UI.",
    keyFeatures: [
      "Real-time doctor schedule and slot booking system",
      "Automated appointment status updates & notifications",
      "Patient consultation records & history tracking",
      "Fully responsive medical appointment dashboard",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    images: [
      "/images/docappint/nav-hero.png",
      "/images/docappint/why-chose.png",
      "/images/docappint/all-appointpage.png",
    ],
    liveUrl: "https://docappoint-eight-drab.vercel.app",
    githubUrl: "https://github.com/Asmual/DocAppoint",
    featured: true,
    status: "Live",
  },
  {
    id: "suncart",
    title: "SunCart — E-Commerce Management Dashboard",
    tagline: "Scalable e-commerce store with dynamic inventory & REST APIs",
    category: "MERN",
    description:
      "Scalable e-commerce solution and administration system featuring dynamic inventory management, RESTful APIs, fast data handling, and secure JWT authentication.",
    keyFeatures: [
      "Full product lifecycle & category administration",
      "Cart management & responsive checkout flow",
      "JWT-based user authentication and protected admin routes",
      "RESTful API architecture with optimized query indexing",
    ],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    images: [
      "/images/suncart/nav-hero.png",
      "/images/suncart/all-product.png",
      "/images/suncart/product-details.png",
    ],
    liveUrl: "https://suncart-woad-three.vercel.app/",
    githubUrl: "https://github.com/Asmual/SunCart",
    featured: true,
    status: "Live",
  },
];

// Helper to extract unique category list dynamically
export const projectCategories: ProjectCategory[] = [
  "All",
  "Full Stack",
  "MERN",
  "Frontend",
  "Backend",
];
