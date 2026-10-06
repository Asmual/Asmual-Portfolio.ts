import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTop from "@/components/ui/BackToTop";
import SmoothScroll from "@/components/providers/SmoothScroll";
import VisitorTracker from "@/components/providers/VisitorTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://asmual-obaidul-hoque.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Asmual — Full Stack Web Developer | Official Portfolio",
    template: "%s | Asmual",
  },
  description:
    "Official portfolio of Asmual (Asmual Obaidul Hoque) — Full Stack Web Developer specializing in Next.js, React, TypeScript, Node.js, Express, PostgreSQL, Redis, and MongoDB.",
  keywords: [
    "Asmual",
    "Asmual developer",
    "Asmual portfolio",
    "Asmual Obaidul Hoque",
    "Asmual web developer",
    "Asmual full stack",
    "Asmual GitHub",
    "Asmual LinkedIn",
    "Asmual programming",
    "developer Asmual",
    "Asmual Bangladesh",
    "Full Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Asmual", url: siteUrl }],
  creator: "Asmual",
  publisher: "Asmual",
  applicationName: "Asmual Portfolio",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Asmual",
    title: "Asmual — Full Stack Web Developer | Official Portfolio",
    description:
      "Explore production-grade full-stack applications, modern architectures, and engineering case studies crafted by Asmual.",
    images: [
      {
        url: "/images/preview/home-preview.png",
        width: 1200,
        height: 630,
        alt: "Asmual - Full Stack Web Developer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asmual — Full Stack Web Developer",
    description:
      "Official developer portfolio of Asmual (Asmual Obaidul Hoque) — Full Stack Web Developer.",
    creator: "@Asmual_123",
    images: ["/images/preview/home-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Asmual",
      alternateName: [
        "Asmual Obaidul Hoque",
        "asmual",
        "Developer Asmual",
        "Asmual Web Developer",
      ],
      givenName: "Asmual",
      familyName: "Obaidul Hoque",
      url: siteUrl,
      image: `${siteUrl}/images/asmual.png`,
      jobTitle: "Full Stack Web Developer",
      worksFor: {
        "@type": "Organization",
        name: "Self-Employed / Full Stack Engineer",
      },
      description:
        "Asmual (Asmual Obaidul Hoque) is a Full Stack Web Developer based in Bangladesh, specializing in Next.js, React, TypeScript, Node.js, Express, PostgreSQL, Redis caching, and MongoDB.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "Bangladesh",
      },
      sameAs: [
        "https://github.com/Asmual",
        "https://www.linkedin.com/in/asmual",
        "https://x.com/Asmual_123",
        "https://leetcode.com/u/Asmual",
        "https://www.youtube.com/@AsmualObaidulHoque",
        siteUrl,
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Prisma ORM",
        "Redis",
        "MongoDB",
        "Supabase",
        "Tailwind CSS",
        "Full Stack Web Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Asmual — Full Stack Web Developer",
      alternateName: ["Asmual", "Asmual Portfolio", "Asmual Obaidul Hoque"],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Asmual — Official Portfolio & Developer Profile",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <VisitorTracker />
        <CustomCursor />
        <BackToTop />
        <PageLoader />
        <SmoothScroll>
          <main className="flex-1">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}