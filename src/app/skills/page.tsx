import Skills from "@/components/sections/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Asmual Obaidul Hoque",
  description: "Technical skills and technologies specialized by Asmual Obaidul Hoque.",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-8">
      <Skills />
    </main>
  );
}