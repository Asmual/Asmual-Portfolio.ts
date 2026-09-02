import Skills from "@/components/sections/Skills";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Asmual Obaidul Hoque",
  description: "Technical skills and technologies specialized by Asmual Obaidul Hoque.",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
      <Skills />
    </main>
  );
}