"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { NavItem } from "@/types/index";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string, name: string) => {
    setActiveNav(name);

    if (targetHref.startsWith("#")) {
      const targetId = targetHref.replace("#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Avatar & Developer Name */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-card-bg/60 border border-border shadow-sm backdrop-blur-md">
          {navLinks.map((link: NavItem) => (
            <NavLink
              key={link.name}
              link={link}
              isActive={activeNav === link.name}
              onClick={(e) => handleScroll(e, link.href, link.name)}
              layoutId="nav-active-pill"
            />
          ))}
        </nav>

        {/* Right Side: Theme Switcher & Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact", "Contact")}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-full bg-accent text-white shadow-sm hover:opacity-90 transition-all duration-300"
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-lg bg-card-bg border border-border text-foreground hover:border-accent transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-card-bg/95 backdrop-blur-md border-b border-border px-4 py-3 space-y-2 transition-all">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link: NavItem) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={activeNav === link.name}
                onClick={(e) => {
                  handleScroll(e, link.href, link.name);
                  setIsOpen(false);
                }}
                layoutId="nav-active-pill-mobile"
                isMobile
              />
            ))}
          </nav>

          <div className="pt-1.5 sm:hidden">
            <Link
              href="#contact"
              onClick={(e) => {
                handleScroll(e, "#contact", "Contact");
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold rounded-lg bg-accent text-white shadow-sm hover:opacity-90 transition-all"
            >
              Hire Me
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  link,
  isActive,
  onClick,
  layoutId,
  isMobile = false,
}: {
  link: NavItem;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  layoutId: string;
  isMobile?: boolean;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={`relative ${
        isMobile ? "px-3 py-2 rounded-lg text-xs" : "px-3.5 py-1 text-xs"
      } font-medium rounded-full transition-colors duration-200 select-none`}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          className={`absolute inset-0 bg-accent shadow-sm ${
            isMobile ? "rounded-lg" : "rounded-full"
          }`}
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
}