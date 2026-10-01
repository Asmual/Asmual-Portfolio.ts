import { ReactNode } from "react";

// Theme and Navigation Types
export type ThemeMode = "light" | "dark" | "gray";

export interface NavItem {
  name: string;
  href: string;
  icon?: ReactNode;
}

export interface ThemeContextType {
  theme: ThemeMode;
  changeTheme: (newTheme: ThemeMode) => void;
}

// Project Section Types
export type ProjectCategory = "Full Stack" | "Frontend" | "Backend" | "Team Projects";

export interface ProjectChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface DetailedFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  slug?: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  techStack?: string[];
  tags?: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  clientGithubUrl?: string;
  serverGithubUrl?: string;
  featured: boolean;
  keyFeatures?: string[];
  teamName?: string;
  isTeamProject?: boolean;
  status?: "Live" | "Completed" | "In Progress";
  role?: string;
  duration?: string;
  overview?: string;
  architecture?: string;
  metrics?: ProjectMetric[];
  detailedFeatures?: DetailedFeature[];
  challengesSolved?: ProjectChallenge[];
}

// Skill Section Types
export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools & Platforms";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: ReactNode;
  level?: number;
  isFeatured?: boolean;
}

// Service Section Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  features?: string[];
}

// Experience and Education Types
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
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

// Contact Form and Info Types
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

// Social and Footer Types
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

// Auth and API Response Types
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