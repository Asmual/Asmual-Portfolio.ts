"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface LiveVisitorBadgeProps {
  variant?: "hero" | "compact" | "footer";
}

export default function LiveVisitorBadge({ variant = "hero" }: LiveVisitorBadgeProps) {
  const [liveCount, setLiveCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveCount = async () => {
      try {
        const res = await fetch("/api/analytics/live");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.liveCount === "number") {
            setLiveCount(data.liveCount);
          }
        }
      } catch {
        // Fallback silently to 1 if network request fails
        if (isMounted && liveCount === null) {
          setLiveCount(1);
        }
      }
    };

    fetchLiveCount();

    // Refresh every 12 seconds so drop-offs or new visitors reflect rapidly
    const interval = setInterval(fetchLiveCount, 12000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [liveCount]);

  // Don't render until first fetch has populated
  if (liveCount === null) return null;

  if (variant === "footer") {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 border border-border text-[11px] font-medium text-foreground/75 shadow-2xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>
          <strong className="font-semibold text-foreground">{liveCount}</strong> {liveCount === 1 ? "visitor" : "visitors"} online
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-foreground/70">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{liveCount} live</span>
      </span>
    );
  }

  // Default "hero" variant
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg/90 border border-border/80 text-foreground/80 text-xs font-semibold shadow-xs backdrop-blur-xs transition-colors hover:border-emerald-500/40"
      title={`${liveCount} ${liveCount === 1 ? "person is" : "people are"} browsing this portfolio right now`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
      <span>
        <strong className="text-foreground font-bold">{liveCount}</strong>{" "}
        {liveCount === 1 ? "Visitor" : "Visitors"} Live
      </span>
    </div>
  );
}
