<div align="center">

# Ali Al-Bayati — Developer Portfolio

**An immersive portfolio showcasing production web, backend, mobile, and AI projects.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)

[Live Website](https://alialbayati.dev) · [LinkedIn](https://linkedin.com/in/ali-al-bayati-59b41b319) · [Email](mailto:alialbayati468@gmail.com)

</div>

## Overview

This repository contains my personal developer portfolio: a responsive, motion-rich experience built to present my background, technical skills, professional experience, and selected projects.

The interface combines an interactive 3D world, smooth scroll-driven transitions, project media galleries, light and dark themes, and a motion-responsive hero avatar while maintaining accessibility and reduced-motion support.

## Highlights

- Interactive WebGL environment powered by React Three Fiber and Three.js
- Smooth scroll and scroll-triggered storytelling with Lenis and GSAP
- Responsive hero avatar with spring-based parallax and subtle effects
- Detailed portfolio covering web, mobile, backend, AI, and DevOps work
- Rich project previews with image, document, and video galleries
- Dark and light themes
- Responsive navigation and CV download menu
- Accessible interactions and `prefers-reduced-motion` support
- Validated contact API with optional Resend email delivery
- Optimized local images and statically generated pages with Next.js

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, custom CSS, Fontsource |
| 3D | Three.js, React Three Fiber, Drei |
| Motion | Framer Motion, GSAP, Lenis |
| State | Zustand, TanStack Query |
| UI | Lucide React |
| Quality | ESLint, TypeScript |

## Featured Work

The portfolio presents projects including:

- **AutoService24** — a published vehicle-services marketplace with geolocation, real-time chat, authentication, notifications, and mobile clients.
- **Olive Leaf Disease Detection** — a MobileNetV2-powered mobile diagnosis application with 98.10% validation accuracy.
- **University Timetable Generator** — a full-stack constraint-satisfaction scheduling platform.
- **Islamic Inheritance Management** — a rule-based inheritance engine with interactive family trees and Arabic PDF reports.
- **Traffic Violations Management** — a multi-role backend and mobile ecosystem with offline synchronization.
- **LegalConnect** — a cross-platform legal-services system with real-time communication and case tracking.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/Ali4681/portfolio.git
cd portfolio
npm install
```

### Environment variables

The site runs without email credentials, but contact-form delivery requires a `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint checks |

## Project Structure

```text
app/
├── api/contact/          # Validated contact endpoint
├── components/           # Portfolio UI and interactive components
├── data/                 # Profile, projects, translations, and media data
├── experience/           # React Three Fiber scenes
├── lib/                  # Shared client state
├── globals.css           # Global design system and responsive styles
├── layout.tsx            # Metadata and root layout
└── page.tsx              # Application entry point
public/
├── CVs/                  # Downloadable CV variants
└── project media/        # Images, documents, and videos
```

## Deployment

The application is designed for deployment on [Vercel](https://vercel.com/). Add the environment variables shown above to the deployment settings if contact-form delivery is required.

## Contact

**Ali Mohammed Al-Bayati** — Full-Stack & Mobile Developer

- Website: [alialbayati.dev](https://alialbayati.dev)
- GitHub: [@Ali4681](https://github.com/Ali4681)
- LinkedIn: [Ali Al-Bayati](https://linkedin.com/in/ali-al-bayati-59b41b319)
- Email: [alialbayati468@gmail.com](mailto:alialbayati468@gmail.com)

## License

This is a personal portfolio project. The source code and visual assets are not currently distributed under an open-source license.

<div align="center">

Built with code, motion, and creativity by **Ali Al-Bayati**.

</div>
