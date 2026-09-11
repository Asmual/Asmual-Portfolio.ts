# 🚀 Asmual Obaidul Hoque — Full-Stack Developer Portfolio

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer%20Motion%2012-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
  [![Resend](https://img.shields.io/badge/Resend%20API-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

  <p align="center">
    A high-performance, modern, and visually engaging personal developer portfolio built with <strong>Next.js 16 (App Router)</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS v4</strong>, and <strong>Framer Motion 12</strong>.
  </p>

  <p align="center">
    <a href="https://github.com/Asmual/Asmual-Portfolio.ts"><strong>Explore the Repository »</strong></a>
    <br />
    <br />
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contact--connect">Connect</a>
  </p>
</div>

---

## 📸 Visual Previews

### 🌟 1. Homepage & Hero Showcase
![Homepage Preview](./public/images/preview/home-preview.png)
*Modern Hero section with organic curved avatar frame, floating interactive tech badges, dynamic multi-role typewriter, and metrics ribbon.*

<br />

### 💼 2. Projects & Interactive Showcase Page
![Projects Showcase Preview](./public/images/preview/projects-preview.png)
*Categorized project matrix with real-time category filtering (`All`, `Full Stack`, `MERN`, `Frontend`, `Backend`), keyword search, image slider, and highlights dropdown.*

---

## ✨ Key Features

- **⚡ Futuristic Glassmorphic Page Loader**:
  - Central frosted glass card with an ambient glow and a 360° rotating neon dashed ring.
  - Real-time step sequence logger (`Bootstrapping application...`, `Loading interactive modules...`, etc.).
  - Glowing dual-gradient progress bar and smooth curtain slide-up (`y: "-100%"`) exit transition.

- **🎯 Fluid Custom Cursor & Halo Spotlight**:
  - Compact 24px trailing halo ring with a center accent dot powered by Framer Motion spring physics.
  - Automatically handles non-touch devices with zero interference on clickable elements (`pointer-events-none`).

- **👨‍💻 Modern Hero Section & Identity**:
  - Live availability pulse badge (`Available for New Projects & Remote Roles`).
  - Organic curved avatar border (`rounded-[30%_70%_70%_30%/30%_30%_70%_70%]`) with ambient glow.
  - Interactive floating chips for `<Next.js 15 & React />` and `<MERN & REST APIs />`.
  - Continuous typewriter animation cycling through specialized engineering roles.

- **🗂️ Dynamic Project Showcase & Filter Hub**:
  - Centralized TypeScript data architecture (`src/data/projects.ts`).
  - Instant category filtering and search query matching on both Homepage and dedicated `/projects` page.
  - Auto-sliding image carousel (pauses on mouse hover) with thumbnail indicator dots.
  - Expandable "Key Highlights" drawer and direct links to GitHub Repositories & Live Deployments.

- **🛠️ Modular 3-Column Skills Matrix**:
  - Compact, professional layout categorizing skills into **Frontend Engineering**, **Backend & Databases**, and **Tools & Cloud**.
  - Official brand icons with color accents and skill level pills.

- **📍 Real-Time ScrollSpy & Floating Back-To-Top**:
  - Sticky navbar dynamically tracks viewport scroll position and slides active pill indicator to current section.
  - Floating `↑ TOP` quick-jump button appears smoothly past the Hero section.

- **📬 Direct Contact Hub & Resend API**:
  - Preset subject quick-select buttons (`Project Inquiry`, `Full-time Role`, `Freelance Work`, `General Consultation`).
  - One-click copy email button with instant tooltip feedback.
  - Integrated with Next.js App Router API (`/api/contact`) for secure email delivery via Resend.

- **🎨 Multi-Theme System**:
  - Seamless switching across **Light**, **Dark**, and **Gray** theme modes using CSS custom properties and Tailwind CSS v4.

---

## 🛠️ Tech Stack Breakdown

### **Core & Framework**
| Technology | Version | Description |
| :--- | :--- | :--- |
| **[Next.js](https://nextjs.org/)** | `16.3.0` | React framework with App Router, Server Components & SEO optimization |
| **[React](https://react.dev/)** | `19.2.8` | Modern UI library utilizing React 19 Compiler |
| **[TypeScript](https://www.typescriptlang.org/)** | `5.x` | End-to-end type safety and maintainable contracts |

### **Styling & UI Architecture**
| Technology | Version | Description |
| :--- | :--- | :--- |
| **[Tailwind CSS](https://tailwindcss.com/)** | `v4` | Next-generation utility-first CSS engine with `@theme` variables |
| **[Geist Font](https://vercel.com/font)** | Next Google | Clean, high-readability sans-serif & mono typography |
| **[Lucide Icons](https://lucide.dev/)** | `1.28.0` | Modern, consistent stroke icons |
| **[React Icons](https://react-icons.github.io/react-icons/)** | `5.7.0` | Brand and tech stack iconography |

### **Animations & Motion Physics**
| Technology | Version | Description |
| :--- | :--- | :--- |
| **[Framer Motion](https://www.framer.com/motion/)** | `12.43.0` | Fluid layout animations, scroll triggers, exit transitions, and spring physics |
| **[Lenis](https://lenis.darkroom.engineering/)** | `1.3.25` | Smooth inertia momentum scrolling engine |

### **Backend, Auth & Notifications**
| Technology | Version | Description |
| :--- | :--- | :--- |
| **[Resend](https://resend.com/)** | `6.25.0` | Transactional email delivery service for contact form inquiries |
| **[MongoDB](https://www.mongodb.com/)** | `7.5.0` | High-performance document database integration |
| **[Better-Auth](https://better-auth.com/)** | `1.6.25` | Scalable authentication system with Mongo adapter |
| **[React Hot Toast](https://react-hot-toast.com/)** | `2.6.0` | Lightweight toast notifications |

---

## 📂 Project Structure

```text
Asmual-Portfolio.ts/
├── public/
│   ├── images/
│   │   ├── arthub/            # ArtHub project preview assets
│   │   ├── docappint/         # DocAppoint project preview assets
│   │   ├── mykeeps/           # My Keeps project preview assets
│   │   ├── suncart/           # SunCart project preview assets
│   │   ├── preview/           # README & portfolio screenshot previews
│   │   ├── asmual.png         # Developer profile photo
│   │   └── as_logo.png        # Brand avatar & logo
│   └── resume/                # PDF developer resume download
├── src/
│   ├── app/
│   │   ├── (routes)/          # Standalone pages (/about, /projects, /skills, /contact)
│   │   ├── api/
│   │   │   └── contact/       # Next.js API route handling Resend email delivery
│   │   ├── globals.css        # Tailwind v4 theme definitions, color-mix & variables
│   │   ├── layout.tsx         # Root layout mounting cursor, loader, scroll & back-to-top
│   │   └── page.tsx           # Portfolio landing page assembling all core sections
│   ├── components/
│   │   ├── layout/            # Layout components (Navbar, Footer, ScrollSpy)
│   │   ├── providers/         # Providers (Lenis SmoothScroll wrapper)
│   │   ├── sections/          # Main sections (Hero, About, Skills, Projects, Contact)
│   │   └── ui/                # UI components (CustomCursor, BackToTop, PageLoader, ThemeToggle)
│   ├── data/
│   │   ├── projects.ts        # Centralized TypeScript data store for projects
│   │   └── skills.ts          # Centralized skills catalog
│   └── types/
│       └── index.ts           # Global TypeScript type definitions
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Comprehensive documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js 18.x or higher installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Asmual/Asmual-Portfolio.ts.git
cd Asmual-Portfolio.ts
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

```env
# Resend API Key for Contact Form
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=asmualobaidulhoque@gmail.com

# Optional MongoDB / Auth configuration
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Featured Projects Showcased

1. **[My Keeps](https://my-keeps-server.onrender.com)** — Smart Cloud Workspace & Note Manager *(Next.js 16, React 19, TypeScript, Express.js 5, MongoDB, Cloudinary, Better-Auth)*
2. **[ArtHub](https://arthub-three.vercel.app)** — Online Art Marketplace *(Next.js 15, React, Tailwind CSS, MongoDB, Express.js, Stripe)*
3. **[DocAppoint](https://docappoint-eight-drab.vercel.app)** — Doctor Appointment Booking System *(Next.js, TypeScript, Tailwind CSS, Express.js, MongoDB)*
4. **[SunCart](https://suncart-woad-three.vercel.app/)** — E-Commerce Management Platform *(React, Node.js, Express.js, MongoDB, Tailwind CSS)*

---

## 📬 Contact & Connect

<div align="center">
  <h3>Asmual Obaidul Hoque</h3>
  <p><strong>Full-Stack Web Developer • MERN & Next.js Architect</strong></p>
  <p>Dhaka, Bangladesh 🇧🇩</p>

  <a href="mailto:asmualobaidulhoque@gmail.com">
    <img src="https://img.shields.io/badge/Email-asmualobaidulhoque%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://github.com/Asmual" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Asmual-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/asmual" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Asmual-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://x.com/Asmual_123" target="_blank">
    <img src="https://img.shields.io/badge/X-@Asmual__123-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" />
  </a>
  <a href="https://leetcode.com/u/Asmual" target="_blank">
    <img src="https://img.shields.io/badge/LeetCode-Asmual-FFA116?style=for-the-badge&logo=leetcode&logoColor=white" alt="LeetCode" />
  </a>
  <a href="https://www.youtube.com/@AsmualObaidulHoque" target="_blank">
    <img src="https://img.shields.io/badge/YouTube-@AsmualObaidulHoque-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" />
  </a>
</div>

---

<div align="center">
  <p>© 2026 <strong>Asmual Obaidul Hoque</strong>. All rights reserved.</p>
</div>
