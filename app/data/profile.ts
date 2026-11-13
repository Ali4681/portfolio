export const portfolioSkills = [
  { category: "Web", value: "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, shadcn/ui" },
  { category: "Mobile", value: "React Native, Expo, React Navigation, iOS & Android development" },
  { category: "Backend", value: "Node.js, NestJS, REST APIs, WebSockets, microservices" },
  { category: "Data", value: "PostgreSQL, MongoDB, Prisma ORM, Mongoose" },
  { category: "State", value: "Redux Toolkit, Zustand, Context API" },
  { category: "AI & Device", value: "TensorFlow, MobileNetV2, transfer learning, Vosk, gyroscope, on-device inference" },
  { category: "Security", value: "JWT, RBAC, Google/Apple OAuth, OTP via Telegram, API security" },
  { category: "Cloud & DevOps", value: "Docker, Firebase, GitHub Actions, Vercel, Nginx, PM2, CI/CD, Contabo VPS" },
  { category: "Quality", value: "Jest, React Native Testing Library, Swagger/OpenAPI, Agile/Scrum" },
];

export const portfolioExperiences = [
  { year: "Jul 2025 — Feb 2026", role: "Mobile Developer", company: "RADAR Company · Aleppo", detail: "Built cross-platform iOS and Android apps with React Native and Expo; created a reusable component library, integrated REST APIs, Redux Toolkit, Zustand, Arabic/English i18n, OAuth, FCM, and performance optimizations." },
  { year: "Mar 2025 — May 2025", role: "Frontend Developer (Part-time)", company: "RAIZER · Startup Funding Platform", detail: "Led the frontend of a startup funding marketplace using Next.js, React, and TypeScript, including real-time chat, expert verification, offline-ready video, role-based UI, FCM, and Lighthouse optimization." },
  { year: "Apr 2024 — Dec 2024", role: "Backend Developer", company: "RADAR Company · Aleppo", detail: "Designed scalable NestJS and Node.js REST APIs, PostgreSQL/Prisma and MongoDB/Mongoose data layers, JWT/RBAC/OAuth security, WebSockets, FCM, Docker, Nginx, PM2, and CI/CD deployments." },
  { year: "Feb 2023 — Oct 2023", role: "Frontend Developer", company: "RADAR Company · Aleppo", detail: "Delivered responsive Next.js, React, and TypeScript interfaces; built a shadcn/ui and Tailwind component library, implemented Zustand/Redux state, RTL i18n, OAuth, REST integrations, and Vercel/VPS deployments." },
];

export const portfolioProjects = [
  { id: "01", code: "AUTO / 24", name: "AutoService24", type: "Published vehicle-services marketplace", desc: "End-to-end backend and mobile platform published on Google Play and the Apple App Store, with 500 km geolocation search, real-time WebSocket chat, RBAC, JWT/OAuth, Firebase FCM, and Google Maps.", tech: "NestJS · PostgreSQL · Prisma · React Native · Expo" },
  { id: "02", code: "AI / LEAF", name: "Olive Leaf Disease Detection", type: "AI mobile application", desc: "Collected and labelled four olive-leaf classes, trained MobileNetV2 with transfer learning to 98.10% validation accuracy, served the model through Flask, and built the field diagnosis app in React Native.", tech: "TensorFlow · MobileNetV2 · Flask · React Native" },
  { id: "03", code: "CSP / GRID", name: "University Timetable Generator", type: "Full-stack capstone", desc: "A conflict-free scheduling system powered by constraint-satisfaction algorithms, flexible MongoDB/Mongoose data models, scenario generation, real-time review, comparison, and instant conflict detection.", tech: "Next.js · NestJS · MongoDB · CSP algorithms" },
  { id: "04", code: "LAW / FLOW", name: "Islamic Inheritance Management", type: "Full-stack Fiqh system", desc: "A rule-based Islamic inheritance engine covering awl, radd, hajb, and Umariyyatayn cases, with an interactive React Flow family tree and Arabic PDFKit reports shaped through Cairo and HarfBuzz.", tech: "Next.js · NestJS · PostgreSQL · React Flow · PDFKit" },
  { id: "05", code: "SYNC / RBAC", name: "Traffic Violations Management", type: "Backend and mobile system", desc: "Three React Native apps for citizens, officers, and admins backed by a multi-role NestJS API, offline officer synchronization, Telegram OTP, GPS and photo evidence, electronic payments, analytics, and push notifications.", tech: "NestJS · Prisma · React Native · Offline sync · FCM" },
  { id: "06", code: "LEGAL / RT", name: "LegalConnect", type: "Cross-platform legal services", desc: "Separate web and mobile clients over a scalable NestJS backend, featuring real-time chat, case submission and tracking, document uploads, lawyer discovery, and role-aware interfaces.", tech: "NestJS · MongoDB · Next.js · React Native · Expo" },
  { id: "07", code: "GYRO / VOX", name: "Floppy Ball", type: "Gyroscope and voice-controlled game", desc: "A physics-based mobile game with two control modes: device gyroscope tilt and real-time voice amplitude, connected through Expo sensor and audio APIs.", tech: "React Native · Expo · Gyroscope · Voice recognition" },
  { id: "08", code: "VOSK / OFF", name: "Vosk Offline Speech-to-Text", type: "On-device mobile application", desc: "An entirely offline speech-recognition application supporting continuous audio streaming and instant transcription without an internet connection.", tech: "React Native · Expo · Vosk · TypeScript" },
];

export const profile = {
  name: "Ali Mohammed Al-Bayati",
  title: "Full-Stack & Mobile Developer",
  email: "alialbayati468@gmail.com",
  phone: "+963 967 212 983",
  location: "Aleppo, Syria",
  github: "https://github.com/Ali4681",
  linkedin: "https://linkedin.com/in/ali-al-bayati-59b41b319",
  education: "B.Sc. in Information Technology and Communications Engineering — Ebla Private University",
  educationDates: "Sep 2019 — Jun 2025",
  certification: "Cybersecurity Training Program — Darrebni Company",
  certificationDates: "Sep 2024 — Jan 2025 · Remote",
};
