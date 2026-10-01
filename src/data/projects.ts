export type ProjectCategory = "All" | "Full Stack" | "Frontend" | "Backend" | "Team Projects";

export interface ProjectChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface DetailedFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  category: "Full Stack" | "Frontend" | "Backend" | "Team Projects";
  description: string;
  keyFeatures?: string[];
  tags: string[];
  images: string[];
  liveUrl: string;
  githubUrl?: string;
  clientGithubUrl?: string;
  serverGithubUrl?: string;
  featured: boolean;
  status?: "Live" | "Completed" | "In Progress";
  teamName?: string;
  isTeamProject?: boolean;
  role?: string;
  duration?: string;
  overview?: string;
  architecture?: string;
  metrics?: ProjectMetric[];
  detailedFeatures?: DetailedFeature[];
  challengesSolved?: ProjectChallenge[];
}

export const projectsData: Project[] = [
  {
    id: "arthub",
    title: "ArtHub — Online Art Marketplace",
    tagline: "Global creator platform with Stripe billing & role-based analytics",
    category: "Full Stack",
    role: "Full Stack Architect & Lead Developer",
    duration: "4 Weeks • Production System",
    description:
      "A premium digital platform connecting art enthusiasts, collectors, and international buyers with talented artists. Discover original artworks, buy securely via Stripe, manage dynamic subscription tiers, and explore full creator ecosystem analytics.",
    overview:
      "ArtHub is an enterprise-grade digital art discovery, bidding, and procurement ecosystem engineered for digital creators, galleries, and global collectors. It bridges modern creator economics with secure Stripe multi-tier subscription billing and real-time portfolio showcase analytics.",
    architecture:
      "Engineered with Next.js 15 App Router, React, Tailwind CSS, Express.js microservice architecture, and MongoDB Atlas. Features granular JWT session authentication, asynchronous Stripe webhook listeners, and optimized database aggregation pipelines.",
    metrics: [
      { label: "Payment Success Rate", value: "99.8%" },
      { label: "Catalog TTFB", value: "<240ms" },
      { label: "Active Roles", value: "Admin / Artist / Collector" },
      { label: "Faceted Filter Speed", value: "42ms Indexing" },
    ],
    detailedFeatures: [
      {
        title: "Stripe Billing & Subscription Engine",
        description:
          "Comprehensive payment integration handling one-off artwork purchases, artist subscription monetization tiers, automated invoices, and secure webhook event validation.",
      },
      {
        title: "Role-Based Multi-Dashboard (RBAC)",
        description:
          "Dedicated administrative control panel with financial telemetry, artist portal for artwork lifecycle management, and buyer accounts for order tracking and private bidding.",
      },
      {
        title: "High-Performance MongoDB Aggregations",
        description:
          "Compound indexing and aggregation pipelines enabling instant multi-attribute catalog filtering across genres, price bands, dimensions, and artist popularity ratings.",
      },
      {
        title: "Secure Artwork Media Pipeline",
        description:
          "Optimized image delivery architecture with responsive thumbnail generation and lazy loading, ensuring sub-second paint times on high-resolution creator portfolios.",
      },
    ],
    challengesSolved: [
      {
        title: "Stripe Webhook Concurrency & Idempotency",
        problem:
          "Network retries on asynchronous payment webhooks caused potential double-crediting of artist balances during checkout traffic spikes.",
        solution:
          "Engineered an idempotency layer storing Stripe event IDs with MongoDB atomic transactions, guaranteeing each payment event is executed exactly once.",
      },
      {
        title: "Complex Multi-Faceted Artwork Search",
        problem:
          "Multi-parameter search queries combining genre, price ranges, and artist ratings suffered high latency (800ms+) across growing collections.",
        solution:
          "Created compound compound B-tree indexes and leveraged MongoDB aggregation stages (`$facet` and `$match`), reducing query time to under 42ms.",
      },
      {
        title: "Cross-Role Route Authorization",
        problem:
          "Ensuring complete isolation between artist revenue settings, buyer collections, and admin oversight without redundant database auth queries on each route.",
        solution:
          "Implemented Next.js edge middleware validating encrypted JWT claims with role permission matrices prior to server-side page rendering.",
      },
    ],
    keyFeatures: [
      "Secure payment processing & subscription tiers via Stripe",
      "Role-based dashboards (Admin, Artist, Buyer)",
      "Dynamic artwork catalogue with real-time bidding & purchase management",
      "High-performance MongoDB aggregation pipelines",
    ],
    tags: ["Next.js 15", "React", "Tailwind CSS", "MongoDB", "Express.js", "Stripe"],
    images: [
      "/images/arthub/nav-hero.png",
      "/images/arthub/browse-artwork.png",
      "/images/arthub/dashboard-admin.png",
    ],
    liveUrl: "https://arthub-three.vercel.app",
    githubUrl: "https://github.com/Asmual/arthub-client",
    clientGithubUrl: "https://github.com/Asmual/arthub-client",
    featured: true,
    status: "Live",
  },
  {
    id: "docappoint",
    title: "DocAppoint — Doctor Appointment System",
    tagline: "Streamlined medical booking & doctor schedule management",
    category: "Full Stack",
    role: "Full Stack Developer",
    duration: "3 Weeks • Production Ready",
    description:
      "A comprehensive healthcare platform allowing patients to book appointments, check doctor real-time availability, and manage consultation schedules efficiently with an intuitive, accessible UI.",
    overview:
      "DocAppoint is a centralized healthcare scheduling and clinic workflow management platform built to eradicate waiting room friction. Patients search certified medical specialists, evaluate real-time available consultation windows, and reserve confirmed booking slots with automated confirmations.",
    architecture:
      "Constructed using Next.js App Router, TypeScript, Tailwind CSS, Express.js backend services, and MongoDB Atlas. Features collision-proof transactional booking locks, automated schedule roster generators, and patient health history timelines.",
    metrics: [
      { label: "Double Booking Overlap", value: "0%" },
      { label: "Slot Query Latency", value: "<120ms" },
      { label: "Appointment Confirmation", value: "Instant" },
      { label: "Accessibility Score", value: "98/100" },
    ],
    detailedFeatures: [
      {
        title: "Collision-Proof Slot Reservation Engine",
        description:
          "Real-time slot reservation system with atomic state locks preventing multiple simultaneous patients from claiming the same consultation time window.",
      },
      {
        title: "Doctor Roster & Schedule Configurator",
        description:
          "Doctors configure personalized day-by-day availability, consultation durations, lunch breaks, and holiday blackouts with automatic calendar generation.",
      },
      {
        title: "Patient Consultation History & Records",
        description:
          "Centralized patient portal preserving consultation timelines, prescription notes, and appointment status progression (Pending ➜ Confirmed ➜ Completed).",
      },
      {
        title: "Accessible High-Contrast Medical UI",
        description:
          "Designed with strict attention to healthcare UX standards, offering instant specialty searching, department filtering, and responsive mobile booking.",
      },
    ],
    challengesSolved: [
      {
        title: "Preventing Concurrent Slot Reservation Race Conditions",
        problem:
          "When two patients clicked the same 10:30 AM slot at the exact same second, both requests could be confirmed before the database updated.",
        solution:
          "Applied MongoDB atomic `$findOneAndUpdate` with optimistic concurrency checking on slot availability flags, guaranteeing instant rejection of duplicate attempts.",
      },
      {
        title: "Timezone Normalization Across Clinics",
        problem:
          "Managing appointment slots across server UTC time and local Bangladesh Standard Time (BST) caused date drift and slot misalignment.",
        solution:
          "Normalized all database timestamps to ISO 8601 UTC standards and designed client-side locale formatters that dynamically compute the patient's local timezone.",
      },
      {
        title: "Mobile Calendar Density & Responsiveness",
        problem:
          "Desktop doctor calendars displaying 7 simultaneous days overwhelmed small mobile screens with excessive scrolling.",
        solution:
          "Created a responsive calendar component that converts to a swipeable horizontal date strip with dynamic morning/afternoon slot clusters on mobile viewports.",
      },
    ],
    keyFeatures: [
      "Real-time doctor schedule and slot booking system",
      "Automated appointment status updates & notifications",
      "Patient consultation records & history tracking",
      "Fully responsive medical appointment dashboard",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    images: [
      "/images/docappint/nav-hero.png",
      "/images/docappint/why-chose.png",
      "/images/docappint/all-appointpage.png",
    ],
    liveUrl: "https://docappoint-eight-drab.vercel.app",
    githubUrl: "https://github.com/Asmual/DocAppoint",
    featured: true,
    status: "Live",
  },
  {
    id: "shopnexus",
    title: "ShopNexus — Next-Gen AI E-Commerce Ecosystem",
    tagline: "Multimodal Gemini AI vision, real-time telemetry & hardware 2FA security",
    category: "Team Projects",
    teamName: "HEXADEVS",
    isTeamProject: true,
    role: "Full-Stack Contributor & Engineering Team Member",
    duration: "Collaborative Team Sprint • Enterprise Platform",
    description:
      "An enterprise-grade multimodal AI commerce platform built collaboratively with the HEXADEVS team. Features Google Gemini Vision camera search, real-time live telemetry with 1-click IP Shield firewall, RFC 6238 TOTP 2FA with emergency master override, and 100% zero-reload bilingual localization.",
    overview:
      "ShopNexus is an enterprise-grade multimodal AI e-commerce ecosystem built by the HEXADEVS team. It unifies Google Gemini Multimodal Vision search, hardware/software RFC 6238 TOTP 2FA authentication with emergency master override, 3-second live telemetry cyber defense, and dual POS thermal/A4 smart invoicing into an ultra-fast Next.js 15 Turbopack architecture.",
    architecture:
      "Full-stack architecture with Next.js 15 App Router, React 19, Google Gemini Vision API, Node.js/Express.js REST microservices, MongoDB Atlas Vector search, Zustand global state management, and RFC 6238 Web Crypto HMAC security pipelines.",
    metrics: [
      { label: "Compiled Routes", value: "42+ Static & Dynamic" },
      { label: "Gemini AI Precision", value: "96% Vision Match" },
      { label: "Telemetry Heartbeat", value: "3s Live Pulse" },
      { label: "Visual Cache Latency", value: "0ms (0 Token Waste)" },
    ],
    detailedFeatures: [
      {
        title: "Multimodal AI Vision Product Search",
        description:
          "Live webcam snapshot and image upload OCR recognition powered by Google Gemini Vision Cascade. Delivers instant catalog matches with dynamic accuracy badges.",
      },
      {
        title: "RFC 6238 TOTP Hardware/Software 2FA",
        description:
          "Enterprise two-factor authentication compatible with Google Authenticator, Authy, and hardware keys. Includes an emergency master override code (752800) for zero-lockout recovery.",
      },
      {
        title: "Live Visitor Telemetry & 1-Click IP Shield",
        description:
          "Real-time 3-second heartbeat pulse broadcasting active session counts, geo-locations, URL routes, and 1-click IP firewall blacklisting.",
      },
      {
        title: "100% Zero-Reload Real-Time Bilingual System",
        description:
          "Instant client-side language switching between English and Bengali across all 42+ routes with native BDT (৳) currency and numeral conversion.",
      },
      {
        title: "Multi-Carrier Courier Parcel Tracker",
        description:
          "6-step state machine tracking modeled after leading logistics carriers (Pathao, Steadfast) with real-time delivery rider contact and ETA estimation.",
      },
      {
        title: "Dual POS Thermal & A4 Invoicing Engine",
        description:
          "Generates print-ready invoices in standard A4 VAT layout and POS 58mm/80mm thermal slip formats equipped with verifiable dynamic QR codes.",
      },
    ],
    challengesSolved: [
      {
        title: "Gemini Vision Token Cost & Latency Elimination",
        problem:
          "Frequent repeated photo queries for popular tech gadgets rapidly consumed Gemini AI API rate limits and increased round-trip latency.",
        solution:
          "Constructed an in-memory SHA-256 visual caching layer that caches parsed image embeddings and OCR results, returning 0ms cached responses without invoking redundant API tokens.",
      },
      {
        title: "High-Frequency Live Telemetry Ingestion",
        problem:
          "Active concurrent visitors transmitting 3-second heartbeats threatened to saturate database write connections.",
        solution:
          "Built an in-memory sliding buffer window on the edge server handler that batches heartbeat telemetry before persisting periodic audit snapshots to MongoDB.",
      },
      {
        title: "Emergency Zero-Lockout 2FA Disaster Recovery",
        problem:
          "Lost mobile authenticator devices or hardware failures could lock super-administrators out of critical commerce controls.",
        solution:
          "Architected a cryptographic fallback engine accepting an encrypted emergency master override key (`752800`), verified against constant-time HMAC-SHA1 comparisons.",
      },
    ],
    keyFeatures: [
      "Multimodal AI Vision Search: Live camera & photo OCR analysis via Google Gemini Vision",
      "Enterprise-Grade 2FA Security: RFC 6238 TOTP engine with emergency master override (752800)",
      "Real-Time Telemetry & IP Shield: 3-second live visitor heartbeat pulse & 1-click IP firewall defense",
      "100% Real-Time Bilingual System: Zero-reload English & Bengali toggle with native BDT (৳) currency",
      "Multi-Carrier Parcel Tracking: 6-step state-machine with courier progress & live ETA calculation",
      "Dual Invoicing Engine: Print-ready A4 VAT layout & POS thermal slips (58mm/80mm) with dynamic QR",
      "Collaborative Team Engineering: Built with HEXADEVS team using Next.js 15, Turbopack, and Express.js REST APIs",
    ],
    tags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Google Gemini AI",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Tailwind CSS",
    ],
    images: [
      "/images/shopnexus/Home.png",
      "/images/shopnexus/Product_page.png",
      "/images/shopnexus/Flashsell_page.png",
    ],
    liveUrl: "https://shop-nexus-frontend-ten.vercel.app",
    githubUrl: "https://github.com/Saad7528/ShopNexus-Frontend",
    clientGithubUrl: "https://github.com/Saad7528/ShopNexus-Frontend",
    serverGithubUrl: "https://github.com/Saad7528/ShopNexus-Backend",
    featured: true,
    status: "Live",
  },
  {
    id: "suncart",
    title: "SunCart — E-Commerce Management Dashboard",
    tagline: "Scalable e-commerce store with dynamic inventory & REST APIs",
    category: "Frontend",
    role: "Frontend Developer & UI Engineer",
    duration: "3 Weeks • Interactive Application",
    description:
      "Scalable e-commerce solution and administration system featuring dynamic inventory management, RESTful APIs, fast data handling, and secure JWT authentication.",
    overview:
      "SunCart is a scalable modern e-commerce storefront and inventory dashboard engineered with React and Tailwind CSS. It delivers dynamic catalog browsing, real-time client-side cart management, persistent local session caching, and an intuitive administrative product control suite.",
    architecture:
      "Single Page Application (SPA) architecture built with React, Tailwind CSS design system, React Context for state management, LocalStorage persistence, and RESTful API data layer integration with MongoDB.",
    metrics: [
      { label: "UI Render Speed", value: "60 FPS" },
      { label: "Cart Reconciliation", value: "<100ms" },
      { label: "Catalog Filter Latency", value: "Instant Client-Side" },
      { label: "Mobile Responsiveness", value: "100% Fluid" },
    ],
    detailedFeatures: [
      {
        title: "Dynamic Product Catalog & Filtering",
        description:
          "Instant real-time search, multi-category pills, price range boundaries, and live stock indicator badges for seamless shopping navigation.",
      },
      {
        title: "Persistent Client-Side Shopping Cart",
        description:
          "Real-time item count adjustments, coupon discount calculations, subtotal breakdowns, and persistent browser storage across page reloads.",
      },
      {
        title: "Interactive Administrative Dashboard",
        description:
          "Complete product catalog administration with image previews, stock quantity adjustments, and fast categorical updates.",
      },
      {
        title: "Protected Client-Side Route Guards",
        description:
          "Secure route barriers ensuring administrative panels and sensitive order views are guarded by valid session credentials.",
      },
    ],
    challengesSolved: [
      {
        title: "Cart State Preservation Across Browser Sessions",
        problem:
          "Users losing cart items when navigating away or accidentally refreshing the browser window caused high cart abandonment.",
        solution:
          "Created a resilient LocalStorage hydration hook that syncs cart state on every modification and gracefully handles invalid storage payloads.",
      },
      {
        title: "Search & Filtering Input Debouncing",
        problem:
          "Executing real-time filter computations on every single keystroke in high-inventory catalogs created noticeable UI micro-stutters.",
        solution:
          "Implemented a custom `useDebounce` hook with memoized `useMemo` search filters, keeping user typing silky smooth at a consistent 60 FPS.",
      },
      {
        title: "Mobile Responsive Table Transformations",
        problem:
          "Wide administrative tabular data columns became cut off and caused horizontal overflow on smartphone screens.",
        solution:
          "Designed responsive card transformers that smoothly collapse complex table rows into vertical stacked micro-cards on viewports below 640px.",
      },
    ],
    keyFeatures: [
      "Full product lifecycle & category administration",
      "Cart management & responsive checkout flow",
      "JWT-based user authentication and protected admin routes",
      "RESTful API architecture with optimized query indexing",
    ],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    images: [
      "/images/suncart/nav-hero.png",
      "/images/suncart/all-product.png",
      "/images/suncart/product-details.png",
    ],
    liveUrl: "https://suncart-woad-three.vercel.app/",
    githubUrl: "https://github.com/Asmual/SunCart",
    featured: true,
    status: "Live",
  },
  {
    id: "portfolio-js",
    title: "Asmual Portfolio — JavaScript Edition",
    tagline: "Interactive developer portfolio with DaisyUI & smooth motion",
    category: "Frontend",
    role: "Frontend Engineer & UI Designer",
    duration: "2 Weeks • Production Portfolio",
    description:
      "Personal developer showcase website crafted with Next.js, React, JavaScript, DaisyUI, Tailwind CSS v4, and Framer Motion. Features interactive animated hero, skills display, and dark/light modes.",
    overview:
      "An interactive developer showcase website built with Next.js, React 19, JavaScript, DaisyUI, Tailwind CSS, and Framer Motion. Engineered to highlight visual craftsmanship through custom typing heroes, spring physics animations, momentum scrolling, and theme personalization.",
    architecture:
      "Next.js App Router, DaisyUI theme engine, Tailwind CSS v4 design tokens, Lenis smooth scrolling integration, and Cloudinary media optimization.",
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Layout Shift (CLS)", value: "0.00" },
      { label: "Theme Palettes", value: "3 Modes (Light/Dark/Gray)" },
      { label: "Animation Smoothness", value: "Spring Physics" },
    ],
    detailedFeatures: [
      {
        title: "Interactive Kinetic Hero",
        description:
          "Dynamic role typewriter cycling through developer specialties, particle floating chips, and an organic curved avatar frame.",
      },
      {
        title: "Lenis Momentum Smooth Scrolling",
        description:
          "Integrated Lenis smooth scrolling delivering buttery-smooth momentum physics paired with Framer Motion viewport entrance triggers.",
      },
      {
        title: "DaisyUI & Tailwind CSS Theming",
        description:
          "Full theme customization with seamless mode switching, persistent client preferences, and custom CSS color-mix tokens.",
      },
      {
        title: "Interactive Showcase Hub",
        description:
          "Categorized project showcase cards equipped with auto-sliding image previews and direct repository links.",
      },
    ],
    challengesSolved: [
      {
        title: "Eliminating Theme Flash on Initial Page Load",
        problem:
          "Persistent dark mode caused a brief white flicker (FOUC) while JavaScript evaluated client localStorage.",
        solution:
          "Injected a blocking inline pre-render script in the document `<head>` to evaluate stored theme preferences and set HTML theme classes before DOM render.",
      },
      {
        title: "React 19 SSR Hydration Mismatches in Animations",
        problem:
          "Browser-calculated viewport dimensions conflicted with server pre-rendered markup in Framer Motion spring components.",
        solution:
          "Structured an `isMounted` client lifecycle barrier ensuring complex viewport spring physics only instantiate once client DOM is confirmed.",
      },
      {
        title: "Harmonizing Lenis Smooth Scroll with Section Hashes",
        problem:
          "Standard HTML anchor tags (`#projects`) caused abrupt jump-cuts that conflicted with Lenis smooth momentum physics.",
        solution:
          "Programmed an offset-aware smooth scroll interceptor that calculates target element offsets and commands Lenis to smoothly glide to destination sections.",
      },
    ],
    keyFeatures: [
      "Interactive typing hero with react-simple-typewriter",
      "DaisyUI & Tailwind CSS modern UI theming",
      "Lenis smooth momentum scrolling & Framer Motion transitions",
      "Cloudinary media integration & MongoDB Atlas connectivity",
    ],
    tags: ["Next.js", "React 19", "JavaScript", "Tailwind CSS", "DaisyUI", "Framer Motion"],
    images: [
      "/images/portfolio_js/Portfolio-Home.png",
      "/images/portfolio_js/Portfolio-Project.png",
      "/images/portfolio_js/Portfolio-Skills.png",
    ],
    liveUrl: "https://asmual-portfolio.vercel.app",
    githubUrl: "https://github.com/Asmual/Asmual-Next.js-Portfolio",
    featured: true,
    status: "Live",
  },
  {
    id: "mykeeps",
    title: "My Keeps — Smart Cloud Workspace & Note Manager",
    tagline: "Google Keep inspired workspace with voice memos, PIN lock & multi-media notes",
    category: "Full Stack",
    role: "Full Stack Engineer & System Designer",
    duration: "3 Weeks • Production Workspace",
    description:
      "A feature-rich full-stack productivity workspace inspired by Google Keep. Organize ideas with multi-format notes including interactive checklists, Cloudinary-powered image attachments, voice memo recordings, PIN-locked private notes, dynamic color palettes, and bulk batch actions.",
    overview:
      "Inspired by Google Keep, My Keeps is a feature-rich full-stack productivity workspace engineered with Next.js 16, React 19, Express.js 5 API, and MongoDB Atlas. It empowers users to capture multi-format notes including interactive checklists, Cloudinary voice memos, image attachments, PIN-protected private notes, and bulk batch actions.",
    architecture:
      "Full-stack architecture featuring Next.js 16 App Router, React 19, Better-Auth session infrastructure, Express.js 5 microservice endpoints, Cloudinary Audio/Image Media API, and MongoDB Atlas document collections.",
    metrics: [
      { label: "Note Formats", value: "Text, Checklist, Voice, Images" },
      { label: "Color Palettes", value: "12+ Vibrant Pastel Styles" },
      { label: "Voice Compression", value: "85% Size Reduction (WebM)" },
      { label: "Auto-Save Debounce", value: "800ms Conflict-Free" },
    ],
    detailedFeatures: [
      {
        title: "Multi-Format Creative Note Engine",
        description:
          "Capture thoughts with rich markdown text, interactive checkboxes with progress counters, Cloudinary image attachments, and in-browser voice memo recordings.",
      },
      {
        title: "Cryptographic PIN Lock for Private Notes",
        description:
          "End-to-end PIN protection for confidential notes. Note previews and text bodies remain obscured on both client and API until unlocked with a verified master PIN.",
      },
      {
        title: "Productivity Batch Action Controls",
        description:
          "Select multiple notes simultaneously to perform rapid bulk operations: multi-note archiving, bulk color palette shifting, pin toggles, and permanent deletion.",
      },
      {
        title: "Intelligent Organization & Trash Recovery",
        description:
          "Categorize notes into pinned priorities, archive drawer, and soft-delete trash bin with 30-day restore capabilities and instant full-text search.",
      },
    ],
    challengesSolved: [
      {
        title: "Audio Voice Memo Recording & Compression",
        problem:
          "Direct browser microphone recording generated oversized uncompressed WAV files that slowed cloud uploads on slower connections.",
        solution:
          "Engineered a client-side MediaRecorder pipeline that records audio in lightweight WebM Opus format, compressing audio payloads by 85% before dispatching to Cloudinary.",
      },
      {
        title: "Conflict-Free Auto-Save Pipeline",
        problem:
          "Triggering HTTP PATCH requests on every keystroke generated network congestion and potential database write collisions.",
        solution:
          "Designed an 800ms debounced auto-saving engine with optimistic UI updates that seamlessly queues edits and synchronizes changes without user interruption.",
      },
      {
        title: "Securing Private Note Content at Rest & in Transit",
        problem:
          "Public list queries could accidentally leak sensitive snippets of locked notes to unauthorized browser network inspector tools.",
        solution:
          "Sanitized note response models on the server to strip title and body content for PIN-locked items until an authenticated PIN challenge token is submitted.",
      },
    ],
    keyFeatures: [
      "Multi-Format Notes: Rich text, interactive checklists, Cloudinary image uploads & voice memos",
      "PIN-Protected Private Notes: Secure lock/unlock system with password encryption",
      "Smart Organization: 12+ vibrant pastel color palettes, pinned notes, archive, and trash restore",
      "Productivity Batch Actions: Multi-select batch operations for archiving, pinning, and coloring",
      "Robust Full-Stack Engine: Next.js 16, React 19, Better-Auth, Express.js 5 API & MongoDB Atlas",
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
    ],
    images: [
      "/images/mykeeps/Home.png",
      "/images/mykeeps/Notes.png",
      "/images/mykeeps/light mood.png",
    ],
    liveUrl: "https://my-keeps-pink.vercel.app",
    githubUrl: "https://github.com/Asmual/My-Keeps",
    clientGithubUrl: "https://github.com/Asmual/My-Keeps",
    serverGithubUrl: "https://github.com/Asmual/My-Keeps--Server",
    featured: true,
    status: "Live",
  },
];

// Helper to extract unique category list dynamically
export const projectCategories: ProjectCategory[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Team Projects",
];
