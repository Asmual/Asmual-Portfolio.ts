"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1.8 সেকেন্ডের মধ্যে 100% লোড হওয়ার স্মুথ টাইমার
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return prev + 5;
      });
    }, 85);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background border-b border-border/40"
        >
          <div className="w-full max-w-xs px-4 flex flex-col items-center space-y-4">
            {/* Programmer Terminal Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent"
            >
              <Terminal className="w-8 h-8 animate-pulse" />
            </motion.div>

            {/* Code Status */}
            <div className="text-center space-y-1">
              <p className="text-xs font-mono text-foreground/80">
                &lt;AsmualPortfolio /&gt;
              </p>
              <p className="text-[11px] font-mono text-foreground/50">
                Initializing Environment... {progress}%
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden border border-border/50">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}