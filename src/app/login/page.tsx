"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogIn, 
  KeyRound,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "info"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);
    setStatusMessage(null);

    // Simulated login feedback for UI evaluation
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: "success",
        text: "Portal UI verified! Ready for Better-Auth & MongoDB credentials integration.",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 blur-3xl rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-80 h-80 bg-accent/5 blur-3xl rounded-full -z-10" />

      {/* Top Back to Portfolio Navigation */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        <span className="text-[11px] font-mono text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Admin Portal</span>
        </span>
      </div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card-bg/90 border border-border/80 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-xl relative"
      >
        {/* Card Header with Brand Logo */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-block relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/40 p-0.5 bg-card-bg shadow-md mb-1">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/as_logo.png"
                alt="Asmual Obaidul Hoque"
                fill
                sizes="48px"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Administrator <span className="text-accent">Login</span>
          </h1>

          <p className="text-xs text-foreground/60 max-w-xs mx-auto">
            Enter your administrative credentials to manage portfolio projects, telemetry, and content.
          </p>
        </div>

        {/* Status Notification Message */}
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{statusMessage.text}</span>
          </motion.div>
        )}

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Email Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="username"
              className="text-xs font-semibold text-foreground/80 flex items-center justify-between"
            >
              <span>Username or Email</span>
              <span className="text-[10px] font-normal text-foreground/50">Required</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/45">
                <User className="w-4 h-4" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@asmual.dev"
                required
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-background border border-border/80 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all duration-200 text-foreground placeholder:text-foreground/40"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-foreground/80 flex items-center justify-between"
            >
              <span>Master Password</span>
              <span className="text-[10px] font-normal text-foreground/50">Required</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/45">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-background border border-border/80 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all duration-200 text-foreground placeholder:text-foreground/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/50 hover:text-foreground cursor-pointer transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Security Prompt */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-foreground/70 hover:text-foreground">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border accent-accent cursor-pointer"
              />
              <span>Remember this device</span>
            </label>

            <span className="text-foreground/40 hover:text-accent transition-colors text-[11px] cursor-not-allowed">
              Forgot Password?
            </span>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-accent text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-accent/90 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="mt-6 pt-4 border-t border-border/60 text-center">
          <p className="text-[10.5px] text-foreground/50 flex items-center justify-center gap-1.5">
            <KeyRound className="w-3 h-3 text-accent/70" />
            <span>Encrypted Session • Authorized Administrator Access Only</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
