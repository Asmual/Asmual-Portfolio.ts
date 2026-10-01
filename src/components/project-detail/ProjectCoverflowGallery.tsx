"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Eye,
  Sparkles
} from "lucide-react";

interface ProjectCoverflowGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectCoverflowGallery({
  images,
  title,
}: ProjectCoverflowGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const total = images.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Keyboard navigation for carousel & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Determine slide transformation based on active index
  const getSlideStyle = (index: number) => {
    // Relative position from activeIndex: -1 (left), 0 (center), 1 (right)
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      // Center Active Card
      return {
        x: "0%",
        scale: 1,
        rotateY: 0,
        z: 0,
        opacity: 1,
        zIndex: 30,
        filter: "brightness(1) blur(0px)",
      };
    } else if (diff === -1 || (total === 2 && diff === 1)) {
      // Left Angled Card
      return {
        x: "-58%",
        scale: 0.82,
        rotateY: 28,
        z: -90,
        opacity: 0.65,
        zIndex: 20,
        filter: "brightness(0.72) blur(0.5px)",
      };
    } else if (diff === 1) {
      // Right Angled Card
      return {
        x: "58%",
        scale: 0.82,
        rotateY: -28,
        z: -90,
        opacity: 0.65,
        zIndex: 20,
        filter: "brightness(0.72) blur(0.5px)",
      };
    } else {
      // Hidden behind
      return {
        x: diff < 0 ? "-90%" : "90%",
        scale: 0.65,
        rotateY: diff < 0 ? 35 : -35,
        z: -180,
        opacity: 0,
        zIndex: 10,
        filter: "brightness(0.5) blur(2px)",
      };
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none py-4 sm:py-6">
      {/* 3D Perspective Stage */}
      <div 
        className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-visible"
        style={{ perspective: "1200px" }}
      >
        {images.map((imgSrc, index) => {
          const style = getSlideStyle(index);
          const isCenter = index === activeIndex;

          return (
            <motion.div
              key={index}
              animate={{
                x: style.x,
                scale: style.scale,
                rotateY: style.rotateY,
                opacity: style.opacity,
                zIndex: style.zIndex,
                filter: style.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(index);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              className={`absolute w-[78%] sm:w-[68%] md:w-[62%] h-[88%] sm:h-[92%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer transition-shadow duration-300 ${
                isCenter 
                  ? "border-2 border-accent/60 shadow-accent/15 cursor-default" 
                  : "border border-border/80 hover:border-accent/40"
              }`}
            >
              {/* Image Container with Natural Aspect Fit */}
              <div className="relative w-full h-full bg-card-bg/90 overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={`${title} showcase slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 800px"
                  className="object-cover object-top"
                />

                {/* Ambient Card Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Glass Floating Header for Center Card */}
                {isCenter && (
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] font-mono font-medium text-white/90 shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span>{activeIndex + 1} / {total}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      className="px-3 py-1 rounded-full bg-black/60 hover:bg-accent text-white backdrop-blur-md border border-white/15 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all duration-200 cursor-pointer group"
                      title="Fullscreen Preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">Expand View</span>
                    </button>
                  </div>
                )}

                {/* Non-active Card Quick Hint Overlay */}
                {!isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5 text-accent" />
                      <span>Click to Focus</span>
                    </span>
                  </div>
                )}

                {/* Bottom Slide Info Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10 pointer-events-none">
                  <p className="text-xs sm:text-sm font-bold drop-shadow-md truncate">
                    {title} — Slide {index + 1}
                  </p>
                  <span className="text-[10px] text-white/70 font-mono hidden sm:inline">
                    Interactive 3D View
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Floating Left and Right Arrow Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 z-40 p-2 sm:p-2.5 rounded-full bg-card-bg/85 hover:bg-accent text-foreground hover:text-white border border-border shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-card-bg/85 hover:bg-accent text-foreground hover:text-white border border-border shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Floating Dock & Thumbnail Controller (Inspired by Reference Design) */}
      <div className="mt-5 flex flex-col items-center gap-3">
        {/* Dock Capsule with Mini Thumbnail & Step Controls */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card-bg/80 border border-border/80 shadow-md backdrop-blur-xl">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Mini Center Thumbnail */}
          <div className="flex items-center gap-2 px-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-accent p-0.5 shrink-0 shadow-xs">
              <Image
                src={images[activeIndex]}
                alt="Current thumbnail"
                fill
                sizes="28px"
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-left hidden xs:block">
              <p className="text-[11px] font-bold text-foreground leading-tight line-clamp-1">
                {title}
              </p>
              <p className="text-[9.5px] text-accent font-medium leading-none">
                Preview {activeIndex + 1} of {total}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-1 rounded-full text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {images.map((src, i) => {
            const isSelected = i === activeIndex;

            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative w-12 sm:w-16 h-8 sm:h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-accent ring-2 ring-accent/30 scale-105 shadow-sm"
                    : "border-border/70 opacity-60 hover:opacity-100 hover:border-accent/40"
                }`}
                aria-label={`Select image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-accent text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/30">
                  {activeIndex + 1} / {total}
                </span>
                <h3 className="text-sm sm:text-base font-bold truncate max-w-md">
                  {title}
                </h3>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image */}
            <div 
              className="relative w-full h-[70vh] sm:h-[78vh] flex items-center justify-center my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={`${title} fullscreen`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* Lightbox Prev & Next Nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 hover:bg-accent text-white backdrop-blur-md transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-accent text-white backdrop-blur-md transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer Thumbnails */}
            <div 
              className="flex items-center justify-center gap-2 pt-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-14 sm:w-18 h-9 sm:h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === activeIndex
                      ? "border-accent ring-2 ring-accent/40 scale-105"
                      : "border-white/30 opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="72px"
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
