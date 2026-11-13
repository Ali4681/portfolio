export const portfolioSkills = [
  {
    category: "Web",
    value:
      "Next.js, React, TypeScript, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, shadcn/ui, SSR, SSG",
  },
  {
    category: "Mobile",
    value:
      "React Native, Expo, React Navigation, iOS & Android, deep linking, offline support, gyroscope sensors, EAS Build",
  },
  {
    category: "Backend",
    value:
      "Node.js, NestJS, REST APIs, WebSockets, Socket.IO, microservices, OpenAPI, Swagger",
  },
  {
    category: "Data & Queues",
    value:
      "PostgreSQL, MongoDB, Prisma ORM, Mongoose, Redis, BullMQ, data modeling, indexing, query optimization",
  },
  {
    category: "State & Data Fetching",
    value: "Redux Toolkit, Zustand, Context API, TanStack Query",
  },
  {
    category: "AI & On-device",
    value:
      "TensorFlow, MobileNetV2, transfer learning, Flask, Vosk speech recognition, on-device inference",
  },
  {
    category: "Auth & Security",
    value:
      "JWT, MFA, RBAC, Google & Apple OAuth, OTP, API rate limiting, token-based access control",
  },
  {
    category: "Cloud & Delivery",
    value:
      "Git, GitHub, Docker, Firebase, FCM, Cloudflare R2, Nginx, PM2, CI/CD, Vercel, Contabo VPS",
  },
  {
    category: "Integrations",
    value:
      "Firebase Auth, push notifications, RTL i18n, next-intl, Google Maps API, geolocation",
  },
  {
    category: "Engineering",
    value:
      "Agile workflows, OpenAPI contracts, React Hook Form, Zod, React Flow, GSAP, Lenis, React Three Fiber",
  },
];

export const portfolioExperiences = [
  {
    year: "Jul 2025 — Feb 2026",
    role: "Mobile Developer",
    company: "RADAR Company · Aleppo",
    detail:
      "Built and maintained cross-platform iOS and Android apps with React Native and Expo. Created a reusable component library and design tokens, managed complex flows with Redux Toolkit and Zustand, delivered Arabic/English RTL localization, and improved performance with lazy loading, memoization, and FlatList virtualization. Published builds through Expo EAS.",
  },
  {
    year: "Mar 2025 — May 2025",
    role: "Frontend Developer (Part-time)",
    company: "RAIZER · Startup Funding Platform · Aleppo",
    detail:
      "Led frontend development for a startup funding marketplace with Next.js, React, and TypeScript. Built real-time chat, expert profile verification, and offline-ready video; integrated FCM and role-based investor and founder experiences; and improved Lighthouse performance through code splitting, lazy loading, and image optimization.",
  },
  {
    year: "Apr 2024 — Dec 2024",
    role: "Backend Developer",
    company: "RADAR Company · Aleppo",
    detail:
      "Designed NestJS and Node.js REST APIs documented with OpenAPI. Modeled PostgreSQL/Prisma and MongoDB/Mongoose data with query-focused indexes, implemented JWT, RBAC, Google and Apple OAuth, and FCM, then deployed with Docker, Nginx, and PM2 on Contabo VPS using CI/CD.",
  },
  {
    year: "Feb 2023 — Oct 2023",
    role: "Frontend Developer",
    company: "RADAR Company · Aleppo",
    detail:
      "Built responsive Next.js, React, and TypeScript interfaces for internal products. Created a reusable shadcn/ui and Tailwind component library that reduced UI development time by about 30%, implemented Redux Toolkit and Zustand for multi-step flows, added Arabic/English RTL and OAuth/FCM integrations, and deployed to Vercel and Contabo VPS.",
  },
];

export const portfolioProjects = [
  {
    id: "01",
    code: "BEROYA / ERP",
    name: "Beroya Holding — Multi-Brand Digital Platform",
    type: "Full-stack enterprise platform",
    desc:
      "Delivered a NestJS ERP for vehicles, property, customer service, and sales, plus Next.js public microsites for Intro, Cars, Real Estate, NOVA, and Media with three CMS desks. Added OTP/MFA, branch-scoped RBAC, Socket.IO staff chat, FCM, and Cloudflare R2 uploads. The bilingual RTL brand experiences include CMS-driven GSAP and React Three Fiber scenes; Prisma migrations and OpenAPI contracts connect ERP workflows, CMS editors, and refresh-token sessions.",
    tech: "NestJS · Next.js · PostgreSQL · Prisma · Socket.IO · FCM · Cloudflare R2",
  },
  {
    id: "02",
    code: "BEROYA / ERP UI",
    name: "Beroya Holding — Enterprise ERP Frontend",
    type: "Multi-sector enterprise frontend",
    desc:
      "Built the Corporate, Automotive, and Real Estate ERP in Next.js with a feature-based architecture and reusable shared components. Delivered a responsive bilingual RTL shell with sector themes, workspace switching, permission-filtered navigation, MFA/RBAC flows, typed API repositories, and consistent loading, empty, and error states across vehicles, CRM, sales, customer service, finance, procurement, inventory, approvals, notifications, and audit modules, with unified table and form patterns.",
    tech: "Next.js · React · TypeScript · shadcn/ui · TanStack Query · next-intl · Zod",
  },
  {
    id: "03",
    code: "BEROYA ON+ / TRANSIT",
    name: "Beroya On+ — Shuttle Platform",
    type: "School & university transport",
    desc:
      "Delivered a multi-institution shuttle platform with a NestJS API and bilingual RTL Next.js dashboards for administrators and institutions. Built routes, daily trips, attendance, incidents, live maps, students, parents, fleet, and KPI views; seven-role OTP/JWT access with institution-level data isolation; Socket.IO tracking; FCM alerts; and Redis/BullMQ background jobs. Swagger contracts cover typed snake_case DTOs and refresh-token sessions, with MinIO uploads and Docker-ready tooling.",
    tech: "NestJS · Next.js · PostgreSQL · Prisma · Redis · BullMQ · Socket.IO · FCM",
  },
  {
    id: "04",
    code: "BEROYA ON / RIDES",
    name: "Beroya On — Ride-Hailing Platform",
    type: "Full-stack ride-hailing system",
    desc:
      "Delivered a ride-hailing platform with a NestJS backend for dispatch, wallets, and finance, paired with customer and staff web experiences. Implemented OTP/JWT multi-role access, real-time WebSocket tracking and offers, FCM notifications, branch-aware operations, finance dashboards, report export, and App Store-ready legal pages, plus Prisma data models for rides, ledgers, incentives, and reporting scenarios.",
    tech: "NestJS · Next.js · PostgreSQL · Prisma · Redis · WebSockets · FCM",
  },
  {
    id: "05",
    code: "SYNC / RBAC",
    name: "Traffic Violations Management",
    type: "Full-stack public-service system",
    desc:
      "Built Citizen, Officer, and Admin apps with a NestJS API. Officers can record violations offline and sync automatically; workflows include GPS and photo evidence, plate lookup, payments, WebSocket updates, push alerts, and administration for users, officers, vehicles, violations, and payment records.",
    tech: "React Native · Expo · NestJS · PostgreSQL · Prisma · JWT · RBAC · WebSockets",
  },
  {
    id: "06",
    code: "AI / LEAF",
    name: "Olive Leaf Disease Detection",
    type: "AI mobile application",
    desc:
      "Collected and labeled olive-leaf images across four classes—healthy, acarus, peacock eye, and olive knot—then applied augmentation and class balancing. Fine-tuned MobileNetV2 in two phases to 98.10% validation accuracy, served it through a Flask REST API, and built a React Native field app for photo-based diagnosis.",
    tech: "TensorFlow · MobileNetV2 · Transfer Learning · Flask · React Native · Expo",
  },
  {
    id: "07",
    code: "AUTO / 24",
    name: "AutoService24",
    type: "Published vehicle-services marketplace",
    desc:
      "Delivered the backend and mobile app, published on Google Play and the Apple App Store. Includes provider search within a 500 km radius, real-time WebSocket chat, service-management APIs, JWT/OAuth authentication, Firebase notifications, and Google Maps.",
    tech: "NestJS · PostgreSQL · Prisma · React Native · Expo · WebSockets · Google Maps",
  },
  {
    id: "08",
    code: "LEGAL / RT",
    name: "LegalConnect",
    type: "Cross-platform legal-services platform",
    desc:
      "Led full-stack development across a NestJS backend, Next.js web client, and React Native mobile app. The platform supports real-time chat, case submission and tracking, document uploads, lawyer discovery, role-aware interfaces, and offline mobile support.",
    tech: "NestJS · MongoDB · Mongoose · Next.js · React · React Native · Expo",
  },
  {
    id: "09",
    code: "CSP / GRID",
    name: "University Timetable Generator",
    type: "Full-stack capstone",
    desc:
      "Built a full-stack scheduling system that uses constraint-satisfaction algorithms to generate conflict-free university timetables, with flexible MongoDB models and real-time conflict detection.",
    tech: "Next.js · NestJS · MongoDB · Mongoose · CSP algorithms",
  },
  {
    id: "10",
    code: "LAW / FLOW",
    name: "Islamic Inheritance Management",
    type: "Full-stack Fiqh system",
    desc:
      "Implemented a rule-based inheritance engine for ʿawl, radd, hajb, and Umariyyatayn cases. Added an interactive React Flow family tree, live share calculations, and Arabic RTL PDF reports generated with PDFKit, Cairo, and HarfBuzz.",
    tech: "Next.js · NestJS · PostgreSQL · Prisma · React Flow · PDFKit",
  },
  {
    id: "11",
    code: "GYRO / VOX",
    name: "Floppy Ball",
    type: "Voice and gyroscope mobile game",
    desc:
      "Built a physics-based mobile game with two control modes: tilt the device using its gyroscope or steer with real-time voice amplitude, using Expo sensor and audio APIs.",
    tech: "React Native · Expo · Gyroscope · Voice recognition",
  },
  {
    id: "12",
    code: "VOSK / OFF",
    name: "Vosk Offline Speech-to-Text",
    type: "On-device mobile application",
    desc:
      "Created an entirely offline speech-recognition app with continuous audio streaming and instant transcription, without sending audio to an online service.",
    tech: "React Native · Expo · Vosk · TypeScript",
  },
];

export const profile = {
  name: "Ali Mohammed Al-Bayati",
  title: "Full-Stack & Mobile Developer",
  email: "alialbayati468@gmail.com",
  phone: "+963 967 212 983",
  location: "Aleppo, Syria",
  nationality: "Iraqi",
  github: "https://github.com/Ali4681",
  linkedin: "https://linkedin.com/in/ali-al-bayati-59b41b319",
  education:
    "B.Sc. in Information Technology and Communications Engineering — Ebla Private University",
  educationDates: "Sep 2019 — Jun 2025",
  educationDetail:
    "Coursework: Software Engineering, Computer Networks, Database Management, Web Technologies, and Communication Systems.",
  certification: "Cybersecurity Training Program — Darrebni Company",
  certificationDates: "Sep 2024 — Jan 2025 · Remote",
  certificationDetail:
    "Network security, web application penetration testing, threat detection, incident response, and vulnerability management. Received an official recommendation letter.",
};
