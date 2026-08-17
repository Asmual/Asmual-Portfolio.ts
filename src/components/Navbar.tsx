"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { NavItem } from "@/types/index";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Left Side: Brand Avatar & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border group-hover:border-accent p-0.5 bg-card-bg shadow-sm transition-all duration-300">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/as-logo.png"
                alt="Asmual Obaidul Hoque"
                fill
                sizes="36px"
                priority
                className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Brand text — no background box. A hover-only underline border,
              uses your existing tokens so it adapts across all theme modes */}
          <span
            className="font-bold text-lg tracking-tight text-foreground border-b-2 border-transparent group-hover:border-accent transition-colors duration-300 leading-tight pb-0.5"
          >
            Asmual<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-card-bg/60 border border-border shadow-md backdrop-blur-md">
          {navLinks.map((link: NavItem) => {
            const isActive = activeNav === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveNav(link.name)}
                className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 select-none"
              >
                {/* Sliding active pill — shared layoutId makes it glide between
                    items instead of popping in/out */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-foreground/85 group-hover:text-foreground"
                  } hover:text-foreground`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Theme Switcher & Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full bg-accent text-white shadow-md hover:opacity-90 transition-all duration-300"
          >
            Hire Me
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-card-bg border border-border text-foreground hover:border-accent transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-card-bg/95 backdrop-blur-md border-b border-border px-4 pt-2 pb-4 space-y-2 transition-all">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link: NavItem) => {
              const isActive = activeNav === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveNav(link.name);
                    setIsOpen(false);
                  }}
                  className="relative px-4 py-2.5 text-sm font-medium rounded-xl select-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill-mobile"
                      className="absolute inset-0 rounded-xl bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-foreground/85 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 sm:hidden">
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-sm font-semibold rounded-xl bg-accent text-white shadow-md hover:opacity-90 transition-all"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}