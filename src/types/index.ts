import { ReactNode } from "react";

// ==========================================
// 1. Theme & Navigation Types
// ==========================================

/** Supported theme modes */
export type ThemeMode = "light" | "dark" | "gray";

/** Navigation bar link item */
export interface NavItem {
  name: string;
  href: string;
  icon?: ReactNode;
}

/** Global Theme Context State */
export interface ThemeContextType {
  theme: ThemeMode;
  changeTheme: (newTheme: ThemeMode) => void;
}

// ==========================================
// 2. Project Section Types
// ==========================================

export type ProjectCategory = "Full Stack" | "Frontend" | "Backend" | "MERN";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  category: ProjectCategory;
  liveUrl?: string;
  clientGithubUrl?: string;
  serverGithubUrl?: string;
  featured: boolean;
  keyFeatures?: string[];
}

// ==========================================
// 3. Skills Section Types
// ==========================================

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools & Platforms";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: ReactNode;
  level?: number; // Percentage e.g. 90
  isFeatured?: boolean;
}

// ==========================================
// 4. Services Section Types
// ==========================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  features?: string[];
}

// ==========================================
// 5. Experience & Education Types
// ==========================================

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string; // "Present" or Date
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  passingYear: string;
  description?: string;
}

// ==========================================
// 6. Contact Form & Info Types
// ==========================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: boolean;
}

// ==========================================
// 7. Footer & Social Link Types
// ==========================================

export interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
  ariaLabel?: string;
}

export interface ServiceItem {
  name: string;
  icon: ReactNode;
}

export interface ProjectItem {
  name: string;
  href: string;
}

// ==========================================
// 8. Auth & API Response Types (Better Auth / Backend Integration)
// ==========================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "user";
  createdAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}