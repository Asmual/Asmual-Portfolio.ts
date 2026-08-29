import Contact from "@/components/sections/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Asmual Obaidul Hoque",
  description: "Get in touch with Asmual Obaidul Hoque for web development projects and opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-8">
      <Contact />
    </main>
  );
}