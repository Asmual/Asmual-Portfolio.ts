"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowUp,
  Code2,
  Server,
  Database,
  Globe,
  Heart,
  ExternalLink,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";
import { NavItem, SocialLink, ServiceItem } from "@/types/index";

export default function Footer(): React.JSX.Element {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const services: ServiceItem[] = [
    {
      name: "Full Stack Web Development",
      icon: <Globe className="w-3.5 h-3.5 text-accent" />,
    },
    {
      name: "Frontend Development",
      icon: <Code2 className="w-3.5 h-3.5 text-accent" />,
    },
    {
      name: "Backend & REST API",
      icon: <Server className="w-3.5 h-3.5 text-accent" />,
    },
    {
      name: "Database Integration",
      icon: <Database className="w-3.5 h-3.5 text-accent" />,
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: <FaGithub className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedinIn className="w-4 h-4" />,
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebookF className="w-4 h-4" />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: <FaYoutube className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-card-bg/90 text-foreground backdrop-blur-xl transition-colors duration-300">
      {/* Top Accent Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent" />

      {/* Background Lighting Glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-5 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        {/* Main Compact Footer Grid */}
        <div className="grid grid-cols-1 gap-8 border-b border-border/60 pb-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          {/* Column 1: Simple Brand Info & Location */}
          <div className="lg:col-span-4">
            <div className="space-y-3">
              {/* Plain Logo & Name without extra dot or hover borders */}
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

                {/* Coder-Style Professional Name Badge */}
                <span className="font-mono font-bold text-sm sm:text-base tracking-tight text-foreground/90 group-hover:text-accent transition-colors duration-300 leading-none">
                  <span className="text-accent">&lt;</span>
                  Asmual
                  <span className="text-accent">/&gt;</span>
                </span>
              </Link>

              {/* Concise Description */}
              <p className="max-w-sm text-xs leading-relaxed text-foreground/65">
                Full-Stack JavaScript Developer focused on building modern,
                responsive, and scalable web applications.
              </p>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-foreground/70 pt-1">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-2 text-xs">
              {navLinks.map((link: NavItem) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-foreground/65 transition-all duration-300 hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              Services
            </h3>

            <ul className="space-y-2 text-xs">
              {services.map((service: ServiceItem) => (
                <li
                  key={service.name}
                  className="group flex items-center gap-2 text-foreground/65"
                >
                  <span className="shrink-0 text-accent">{service.icon}</span>

                  <span className="transition-colors duration-300 group-hover:text-foreground">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Me */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              Follow Me
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((social: SocialLink) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-background/50 px-2.5 py-2 text-foreground/70 transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 hover:text-accent"
                >
                  <span>{social.icon}</span>
                  <span className="text-xs font-medium">{social.name}</span>
                  <ExternalLink className="ml-auto h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Reordered Layout & Low Height */}
        <div className="flex flex-col gap-3 pt-4 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Copyright */}
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Asmual Obaidul Hoque. All rights
            reserved.
          </p>

          {/* Center: Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center justify-center gap-1.5 font-semibold text-foreground/70 transition-colors duration-300 hover:text-accent"
          >
            <span>Back to top</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:text-accent">
              <ArrowUp className="h-3 w-3" />
            </span>
          </button>

          {/* Right: Built With Tech Info */}
          <p className="inline-flex items-center justify-center gap-1 text-center sm:text-right">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 fill-accent text-accent" />
            <span>using Next.js & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
