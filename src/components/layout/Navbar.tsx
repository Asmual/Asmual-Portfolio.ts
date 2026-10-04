"use client";

import { useState, useEffect, useRef } from "react";
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
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Real-time ScrollSpy: dynamically tracks which section is in the viewport
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.includes("projects")) setActiveNav("Projects");
      else if (pathname.includes("about")) setActiveNav("About");
      else if (pathname.includes("skills")) setActiveNav("Skills");
      else if (pathname.includes("contact")) setActiveNav("Contact");
      return;
    }

    const sectionIds = ["home", "projects", "skills", "about", "contact"];

    const handleScrollSpy = () => {
      // Don't override activeNav while a smooth click scroll is currently animating
      if (isManualScrollingRef.current) return;

      const scrollPosition = window.scrollY + 100; // Offset for navbar height + buffer

      // If scrolled near bottom of page, highlight Contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveNav("Contact");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            const capitalized = id.charAt(0).toUpperCase() + id.slice(1);
            setActiveNav(capitalized);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [pathname]);

  const executeScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Lock ScrollSpy while smooth scrolling
    isManualScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1200);

    const navHeight = 64;
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      if (targetId === "home") {
        lenis.scrollTo(0, { duration: 1.0 });
      } else {
        // html element already has scroll-padding-top: 64px in globals.css.
        // Lenis reads container scrollPaddingTop automatically, so offset: 0 aligns
        // the target element precisely flush with the bottom edge of the sticky navbar with 0px overlap.
        lenis.scrollTo(element, { offset: 0, duration: 1.0 });
      }
    } else {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const y = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string, name: string) => {
    setActiveNav(name);

    if (targetHref.startsWith("#")) {
      const targetId = targetHref.replace("#", "");
      if (pathname === "/") {
        e.preventDefault();
        executeScroll(targetId);
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

        {/* Desktop Navigation with Live ScrollSpy Pill */}
        <nav className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-card-bg/60 border border-border shadow-sm backdrop-blur-md">
          {navLinks.map((link: NavItem) => (
            <NavLink
              key={link.name}
              link={link}
              pathname={pathname}
              isActive={activeNav === link.name}
              onClick={(e) => handleScroll(e, link.href, link.name)}
              layoutId="nav-active-pill"
            />
          ))}
        </nav>

        {/* Right Side: Actions, Theme Switcher & Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Hire Me CTA - Accessible directly on mobile and desktop */}
          <Link
            href={pathname === "/" ? "#contact" : "/#contact"}
            onClick={(e) => handleScroll(e, "#contact", "Contact")}
            className="order-1 md:order-2 inline-flex items-center gap-1 px-2.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-full bg-accent text-white shadow-xs hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>

          {/* Theme Mode Switcher */}
          <div className="order-2 md:order-1 flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="order-3 md:hidden p-1.5 rounded-lg bg-card-bg border border-border text-foreground hover:border-accent transition-colors cursor-pointer"
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
                pathname={pathname}
                isActive={activeNav === link.name}
                onClick={(e) => {
                  if (pathname === "/" && link.href.startsWith("#")) {
                    e.preventDefault();
                  }
                  setActiveNav(link.name);
                  setIsOpen(false);
                  setTimeout(() => {
                    const targetId = link.href.replace("#", "");
                    if (pathname === "/") {
                      executeScroll(targetId);
                    }
                  }, 80);
                }}
                layoutId="nav-active-pill-mobile"
                isMobile
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  link,
  pathname,
  isActive,
  onClick,
  layoutId,
  isMobile = false,
}: {
  link: NavItem;
  pathname: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  layoutId: string;
  isMobile?: boolean;
}) {
  const targetHref = pathname === "/" ? link.href : `/${link.href}`;

  return (
    <Link
      href={targetHref}
      onClick={onClick}
      className={`relative ${
        isMobile ? "px-3 py-2 rounded-lg text-xs" : "px-3.5 py-1 text-xs"
      } font-medium rounded-full transition-colors duration-200 select-none cursor-pointer group`}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          className={`absolute inset-0 bg-accent shadow-xs ${
            isMobile ? "rounded-lg" : "rounded-full"
          }`}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {!isActive && (
        <span
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-foreground/5 transition-opacity duration-150 pointer-events-none ${
            isMobile ? "rounded-lg" : "rounded-full"
          }`}
        />
      )}
      <span
        className={`relative z-10 font-medium transition-colors duration-200 ${
          isActive
            ? "text-white"
            : "text-foreground/75 group-hover:text-foreground"
        }`}
      >
        {link.name}
      </span>
    </Link>
  );
}