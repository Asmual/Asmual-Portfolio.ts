"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Initializing Environment...");

  useEffect(() => {
    // Lock scroll during initial load
    document.body.style.overflow = "hidden";

    const statusSteps = [
      { threshold: 0, text: "Bootstrapping application..." },
      { threshold: 25, text: "Loading interactive modules..." },
      { threshold: 55, text: "Configuring theme & UI runtime..." },
      { threshold: 85, text: "Ready to explore!" },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
          }, 250);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 6) + 3; // Natural varying progress steps
        const target = next > 100 ? 100 : next;

        const currentStatus = [...statusSteps]
          .reverse()
          .find((step) => target >= step.threshold);
        if (currentStatus) {
          setStatusMessage(currentStatus.text);
        }

        return target;
      });
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            opacity: 0.9,
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background select-none overflow-hidden"
        >
          {/* Ambient Lighting Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Central Futuristic Glass Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-sm px-6 py-8 mx-4 rounded-3xl bg-card-bg/80 border border-border/80 backdrop-blur-2xl shadow-2xl flex flex-col items-center space-y-6"
          >
            {/* Animated Brand Icon with Glowing Ring */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-accent/30 blur-lg animate-pulse" />
              
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-2xl border border-dashed border-accent/40"
              />

              <div className="relative p-4 rounded-2xl bg-card-bg border border-accent/30 text-accent shadow-md">
                <Code2 className="w-8 h-8" />
              </div>
            </div>

            {/* Developer Brand Name */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-accent uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles className="w-3 h-3" />
                <span>Developer Portfolio</span>
              </div>
              <h2 className="text-base sm:text-lg font-mono font-bold text-foreground tracking-tight pt-1">
                &lt;Asmual Obaidul Hoque /&gt;
              </h2>
            </div>

            {/* Progress Section */}
            <div className="w-full space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-foreground/60 text-[11px] truncate max-w-[200px]">
                  {statusMessage}
                </span>
                <span className="text-accent font-bold text-sm">
                  {progress}%
                </span>
              </div>

              {/* High-Tech Glowing Progress Bar */}
              <div className="w-full h-2 bg-background/80 rounded-full overflow-hidden p-0.5 border border-border/80 shadow-inner">
                <motion.div
                  className="h-full bg-linear-to-r from-accent via-blue-400 to-accent rounded-full shadow-[0_0_12px_var(--accent)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>

            {/* Subtext info */}
            <p className="text-[10px] font-mono text-foreground/45 uppercase tracking-wider">
              React 19 • Next.js 16 • TypeScript
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}