"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button as soon as user scrolls past the Hero section (~300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full bg-accent text-white shadow-xl hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-md flex items-center gap-1.5 cursor-pointer group border border-white/20"
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="text-[11px] font-bold tracking-wider uppercase select-none">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
