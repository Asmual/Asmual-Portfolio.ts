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
