"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Palette } from "lucide-react";
import { ThemeMode } from "@/types/index";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as ThemeMode) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("gray");
    else setTheme("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2.5 rounded-full bg-card-bg/60 border border-border/80 shadow-md hover:bg-card-bg hover:border-accent text-foreground transition-all duration-300 backdrop-blur-md flex items-center justify-center"
    >
      {theme === "dark" && <Moon className="w-4 h-4 text-accent" />}
      {theme === "light" && <Sun className="w-4 h-4 text-accent" />}
      {theme === "gray" && <Palette className="w-4 h-4 text-accent" />}
    </button>
  );
}
