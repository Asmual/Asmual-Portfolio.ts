"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Code2,
  Server,
  Database,
  Globe,
  Heart,
  ExternalLink,
  Mail
} from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { NavItem, SocialLink, ServiceItem } from "@/types/index";

export default function Footer(): React.JSX.Element {
  const navLinks: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const services: ServiceItem[] = [
    {
      name: "Full Stack Web Apps",
      icon: <Globe className="w-3.5 h-3.5 text-accent" />,
    },
    {
      name: "React & Next.js Architecture",
      icon: <Code2 className="w-3.5 h-3.5 text-accent" />,
    },
    {
      name: "REST APIs & Backend Logic",
      icon: <Server className="w-3.5 h-3.5 text-accent" />,
    },
    {
      name: "MongoDB & Database Systems",
      icon: <Database className="w-3.5 h-3.5 text-accent" />,
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com/Asmual",
      icon: <FaGithub className="w-3.5 h-3.5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/asmual",
      icon: <FaLinkedinIn className="w-3.5 h-3.5" />,
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/Asmual_123",
      icon: <FaXTwitter className="w-3.5 h-3.5" />,
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/Asmual",
      icon: <SiLeetcode className="w-3.5 h-3.5" />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@AsmualObaidulHoque",
      icon: <FaYoutube className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-card-bg/95 text-foreground backdrop-blur-xl transition-colors duration-300">
      {/* Top Accent Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent" />

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-5 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 border-b border-border/60 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          
          {/* Column 1: Brand & Developer Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border group-hover:border-accent p-0.5 bg-card-bg shadow-sm transition-all duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/as_logo.png"
                    alt="Asmual Obaidul Hoque"
                    fill
                    sizes="32px"
                    priority
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <span className="font-mono font-bold text-sm sm:text-base tracking-tight text-foreground/90 group-hover:text-accent transition-colors duration-300 leading-none">
                <span className="text-accent">&lt;</span>
                Asmual
                <span className="text-accent"> /&gt;</span>
              </span>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-foreground/70">
              Full-Stack Web Developer dedicated to engineering performant, secure, and modern digital web applications using the JavaScript &amp; TypeScript ecosystem.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-foreground/75">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/75">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Open for remote roles &amp; freelance projects</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="mb-3.5 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              Navigation
            </h3>

            <ul className="space-y-2 text-xs">
              {navLinks.map((link: NavItem) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-foreground/70 transition-all duration-200 hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-200 group-hover:w-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services / Specializations (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="mb-3.5 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              Specializations
            </h3>

            <ul className="space-y-2.5 text-xs">
              {services.map((service: ServiceItem) => (
                <li
                  key={service.name}
                  className="group flex items-center gap-2 text-foreground/70"
                >
                  <span className="shrink-0 text-accent">{service.icon}</span>
                  <span className="transition-colors duration-200 group-hover:text-foreground">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Channels (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="mb-3.5 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              Connect Online
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {socialLinks.map((social: SocialLink) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-foreground/70 transition-all duration-200 hover:border-accent hover:text-accent hover:bg-card-bg shadow-xs"
                >
                  <span className="text-foreground/80 group-hover:text-accent transition-colors shrink-0">{social.icon}</span>
                  <span className="text-xs font-medium truncate">{social.name}</span>
                  <ExternalLink className="ml-auto h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-70 shrink-0" />
                </a>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="mailto:asmualobaidulhoque@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-foreground/70 hover:text-accent transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>asmualobaidulhoque@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar without duplicate back to top button */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Copyright */}
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-foreground font-semibold">Asmual Obaidul Hoque</strong>. All rights reserved.
          </p>

          {/* Right: Tech Stack info */}
          <p className="inline-flex items-center justify-center gap-1 text-center sm:text-right">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 fill-accent text-accent" />
            <span>using Next.js 16 &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
