import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asmual — Full Stack Web Developer",
    short_name: "Asmual",
    description:
      "Official portfolio of Asmual (Asmual Obaidul Hoque) — Full Stack Web Developer specializing in Next.js, React, Node.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/images/as_logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
