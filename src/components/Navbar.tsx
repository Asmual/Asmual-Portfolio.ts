"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeXml, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { NavItem } from "@/index";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Home");

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
        
        {/* Left Side: Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-card-bg border border-border group-hover:border-accent transition-all duration-300 shadow-sm">
            <CodeXml className="w-5 h-5 text-accent" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Asmual
          </span>
        </Link>

        {/* Middle Side: Floating Pill Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-card-bg/60 border border-border shadow-md backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeNav === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveNav(link.name)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-accent/20 text-accent font-semibold border border-accent/30 shadow-xs"
                    : "text-foreground/85 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Theme Icon Toggle & Hire Me Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full bg-accent text-white shadow-md hover:opacity-90 transition-all duration-300"
          >
            Hire Me
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </header>
  );
}