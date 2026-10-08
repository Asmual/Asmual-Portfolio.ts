import type { Metadata } from "next";
import NotFoundClient from "@/components/ui/NotFoundClient";

export const metadata: Metadata = {
  title: "404: Lost in Space — Page Not Found | Asmual",
  description:
    "The coordinate or page you requested does not exist or has moved. Explore Asmual's full-stack web developer projects, modern technical skills, and developer profile.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
