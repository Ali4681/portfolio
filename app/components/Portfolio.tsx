"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import dynamic from "next/dynamic";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Code2,
  Download,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X,
} from "lucide-react";
import WorldCanvas from "./WorldCanvas";
import ProjectMediaPreview from "./ProjectMediaPreview";
import HeroAvatar from "./HeroAvatar";
import { useExperience } from "../lib/store";
import { projectMediaPreviews } from "../data/projectMediaPreviews";
import {
  portfolioExperiences,
  portfolioProjects,
  portfolioSkills,
  profile,
} from "../data/profile";
import {
  ar,
  arExperiences,
  arProjects,
  arSkillCategories,
} from "../data/translations";

const ProjectGallery = dynamic(() => import("./ProjectGallery"), {
  ssr: false,
  loading: GalleryLoading,
});

const preloadProjectGallery = () => {
  void import("./ProjectGallery");
};

type GallerySelection = {
  projectName: string;
  initialIndex: number;
  returnFocus: HTMLButtonElement;
};

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "NestJS",
  "MongoDB",
  "PostgreSQL",
];

const cvOptions = [
  {
    label: "Full-Stack",
    detail: "Web, APIs & product delivery",
    href: "/CVs/Full-Stack.pdf",
    filename: "Ali-Albayati-Full-Stack-CV.pdf",
  },
  {
    label: "Frontend",
    detail: "React, Next.js & UI engineering",
    href: "/CVs/Frontend.pdf",
    filename: "Ali-Albayati-Frontend-CV.pdf",
  },
  {
    label: "Backend",
    detail: "Node.js, NestJS & data systems",
    href: "/CVs/Backend.pdf",
    filename: "Ali-Albayati-Backend-CV.pdf",
  },
  {
    label: "Mobile",
    detail: "React Native, Expo, iOS & Android",
    href: "/CVs/Mobile.pdf",
    filename: "Ali-Albayati-Mobile-CV.pdf",
  },
] as const;
export const experiences = [
  { year: "2025 — 2026", role: "Mobile Developer", company: "RADAR Company" },
  { year: "2025", role: "Frontend Developer", company: "RAIZER Startup" },
  { year: "2024", role: "Backend Developer", company: "RADAR Company" },
  { year: "2023", role: "Frontend Developer", company: "RADAR Company" },
];
export const projects = [
  {
    id: "01",
    name: "AutoService24",
    type: "Mobile marketplace",
    desc: "A production vehicle-services platform with real-time communication and mobile-first experiences.",
    tech: "React Native · NestJS · WebSockets",
  },
  {
    id: "02",
    name: "StudyAI",
    type: "AI learning system",
    desc: "An intelligent study environment built around document processing, assistance, and focused learning workflows.",
    tech: "Next.js · AI · TypeScript",
  },
  {
    id: "03",
    name: "Smart Scheduling AI",
    type: "Constraint optimization",
    desc: "A university scheduling system that transforms complex constraints into optimized, conflict-free timetables.",
    tech: "Algorithms · CSP · Full Stack",
  },
];

export default function Portfolio() {
  const reduced = usePrefersReducedMotion();
  const setProgress = useExperience((s) => s.setProgress);
  const setAssemblyProgress = useExperience((s) => s.setAssemblyProgress);
  const setStageProgress = useExperience((s) => s.setStageProgress);
  const ready = useExperience((s) => s.worldReady);
  const [loaded, setLoaded] = useState(false);
  const [nameReady, setNameReady] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cvMenu, setCvMenu] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [liteExperience, setLiteExperience] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [gallerySelection, setGallerySelection] =
    useState<GallerySelection | null>(null);
  const refreshScroll = useRef<(() => void) | null>(null);
  const cvMenuRef = useRef<HTMLDivElement | null>(null);
  const cvButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuOpen = useRef(false);
  const galleryOpen = useRef(false);
  const galleryTrigger = useRef<HTMLButtonElement | null>(null);
  const scrollController = useRef<{
    start: () => void;
    stop: () => void;
  } | null>(null);
  const isArabic = false;

  useEffect(() => {
    const restorePreferences = setTimeout(() => {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      localStorage.removeItem("portfolio-language");
    }, 0);
    return () => clearTimeout(restorePreferences);
  }, []);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const smallScreen = matchMedia("(max-width: 900px)");
    const updateExperience = () => {
      setLiteExperience(
        smallScreen.matches ||
          (navigator.hardwareConcurrency
            ? navigator.hardwareConcurrency <= 4
            : false),
      );
    };
    updateExperience();
    smallScreen.addEventListener("change", updateExperience);
    return () => smallScreen.removeEventListener("change", updateExperience);
  }, []);

  useEffect(() => {
    const sections = reduced
      ? Array.from(document.querySelectorAll<HTMLElement>(".stage-scene"))
      : [];
    let frame = 0;

    const updateNav = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        setNavScrolled(scrollY > 48);

        // ScrollTrigger owns the active state during the full experience. This
        // small fallback only runs when motion is reduced and GSAP is skipped.
        if (!reduced) return;

        const max = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          (max ? scrollY / max : 0).toString(),
        );

        const centerLine = innerHeight * 0.5;
        const current = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= centerLine && bounds.bottom > centerLine;
        });
        const next = !current || current.id === "home" ? null : current.id;
        setActiveNav((value) => (value === next ? value : next));
      });
    };

    updateNav();
    addEventListener("scroll", updateNav, { passive: true });
    addEventListener("resize", updateNav, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", updateNav);
      removeEventListener("resize", updateNav);
    };
  }, [reduced]);

  useEffect(() => {
    if (!cvMenu) return;

    const closeOnOutsidePress = (event: Event) => {
      if (
        event.target instanceof Node &&
        !cvMenuRef.current?.contains(event.target)
      ) {
        setCvMenu(false);
      }
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setCvMenu(false);
      cvButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [cvMenu]);

  useEffect(() => {
    mobileMenuOpen.current = menu;
    if (!menu) return;

    const root = document.documentElement;
    const desktop = matchMedia("(min-width: 901px)");
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenu(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenu(false);
    };

    root.dataset.navigationLocked = "true";
    scrollController.current?.stop();
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      mobileMenuOpen.current = false;
      delete root.dataset.navigationLocked;
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
      if (!galleryOpen.current) scrollController.current?.start();
    };
  }, [menu]);

  const handleAnchorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, target: string) => {
      event.preventDefault();
      setMenu(false);
      setCvMenu(false);
      const scrollToTarget = () =>
        document.querySelector(target)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });

      if (menu) requestAnimationFrame(scrollToTarget);
      else scrollToTarget();
      history.replaceState(null, "", target);
    },
    [menu, reduced],
  );

  const focusCvOption = (position: "first" | "last") => {
    requestAnimationFrame(() => {
      const options =
        cvMenuRef.current?.querySelectorAll<HTMLAnchorElement>(
          ".cv-menu__list a",
        );
      if (!options?.length) return;
      options[position === "first" ? 0 : options.length - 1]?.focus();
    });
  };

  const handleCvTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    setMenu(false);
    setCvMenu(true);
    focusCvOption(event.key === "ArrowDown" ? "first" : "last");
  };

  const handleCvMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(
      cvMenuRef.current?.querySelectorAll<HTMLAnchorElement>(
        ".cv-menu__list a",
      ) ?? [],
    );
    if (!options.length) return;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setCvMenu(false);
      cvButtonRef.current?.focus();
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const current = options.indexOf(
      document.activeElement as HTMLAnchorElement,
    );
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? options.length - 1
          : event.key === "ArrowDown"
            ? (current + 1 + options.length) % options.length
            : (current - 1 + options.length) % options.length;
    options[next]?.focus();
  };

  const handleProjectTilt = (event: PointerEvent<HTMLElement>) => {
    if (reduced || liteExperience !== false) return;
    const card = event.currentTarget;
    if (
      event.target instanceof Element &&
      event.target.closest(".project-preview")
    ) {
      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
      return;
    }
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--card-rx", `${(0.5 - y) * 5}deg`);
    card.style.setProperty("--card-ry", `${(x - 0.5) * 6}deg`);
    card.style.setProperty("--card-glow-x", `${x * 100}%`);
    card.style.setProperty("--card-glow-y", `${y * 100}%`);
  };

  const resetProjectTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--card-rx", "0deg");
    event.currentTarget.style.setProperty("--card-ry", "0deg");
  };

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    history.replaceState(null, "", location.pathname);
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      if (ready || reduced || liteExperience === true) setLoaded(true);
    }, 700);
    // Never let a blocked or unavailable WebGL context hide the HTML experience.
    const safetyTimer = setTimeout(() => setLoaded(true), 3000);
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(safetyTimer);
    };
  }, [liteExperience, ready, reduced]);
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setNameReady(true), 780);
    return () => clearTimeout(timer);
  }, [loaded]);
  useEffect(() => {
    if (reduced || (!ready && liteExperience !== true)) return;
    let disposed = false;
    let teardown: (() => void) | undefined;

    const initializeScrollExperience = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      refreshScroll.current = () => ScrollTrigger.refresh();
      const liteMotion =
        matchMedia("(max-width: 900px)").matches ||
        (navigator.hardwareConcurrency
          ? navigator.hardwareConcurrency <= 4
          : false);
      const lenis = new Lenis({
        duration: liteMotion ? 0.32 : 0.45,
        wheelMultiplier: liteMotion ? 1.15 : 1.25,
      });
      const controller = {
        start: () => lenis.start(),
        stop: () => lenis.stop(),
      };
      scrollController.current = controller;
      if (galleryOpen.current || mobileMenuOpen.current) lenis.stop();
      lenis.on("scroll", ScrollTrigger.update);
      let frame = 0;
      const raf = (t: number) => {
        lenis.raf(t);
        frame = lenis.isScrolling ? requestAnimationFrame(raf) : 0;
      };
      const startRaf = () => {
        if (!frame) frame = requestAnimationFrame(raf);
      };
      const stopVirtualScrollListener = lenis.on("virtual-scroll", startRaf);
      let progressFrame = 0;
      const update = () => {
        if (progressFrame) return;
        progressFrame = requestAnimationFrame(() => {
          progressFrame = 0;
          const max = document.documentElement.scrollHeight - innerHeight;
          const progress = max ? scrollY / max : 0;
          document.documentElement.style.setProperty(
            "--scroll-progress",
            progress.toString(),
          );
          setProgress(progress);
        });
      };
      addEventListener("scroll", update, { passive: true });
      update();
      const ctx = gsap.context(() => {
        if (!liteMotion) {
          ScrollTrigger.create({
            trigger: "#home",
            start: "top top",
            end: () => `+=${Math.round(innerHeight * 1.25)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setAssemblyProgress(self.progress),
          });
        } else {
          setAssemblyProgress(1);
        }

        gsap.utils
          .toArray<HTMLElement>(".stage-scene")
          .forEach((section, i) => {
            const panel = section.querySelector<HTMLElement>(
              ".panel, .section-top, .contact-copy, .hero-copy",
            );
            const cards = section.querySelectorAll<HTMLElement>(
              ".project-card, .skill-list div, .experience-list article, .credentials-grid article",
            );
            const projectCards =
              section.querySelectorAll<HTMLElement>(".project-card");
            const dataNodes = section.querySelectorAll<HTMLElement>(
              ".section-no, h1, h2, .kicker, .hero-bottom > p, .holo, .panel > p:not(.section-no), .stat-line > *, .skill-list div, .experience-list article, .code-window, .terminal-line, .credentials-grid article, .portal-button, .socials a, .contact-details",
            );
            const fromLeft = i % 2 === 0;

            if (!liteMotion && i > 1) {
              ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () =>
                  `+=${Math.round(innerHeight * (i === 4 ? 1 : 0.72))}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => setStageProgress(i, self.progress),
              });
            } else if (i > 1) {
              setStageProgress(i, 1);
            }

            if (panel) {
              gsap.fromTo(
                panel,
                {
                  autoAlpha: 0,
                  xPercent: fromLeft ? -14 : 14,
                  yPercent: 10,
                  scale: 0.86,
                  rotateY: liteMotion ? 0 : fromLeft ? 16 : -16,
                  clipPath: `circle(0% at ${fromLeft ? "12%" : "88%"} 50%)`,
                  filter: "none",
                },
                {
                  autoAlpha: 1,
                  xPercent: 0,
                  yPercent: 0,
                  scale: 1,
                  rotateY: 0,
                  clipPath: "circle(150% at 50% 50%)",
                  filter: "none",
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "center 44%",
                    scrub: 0.8,
                  },
                },
              );
            }

            if (dataNodes.length) {
              gsap.fromTo(
                dataNodes,
                {
                  autoAlpha: 0,
                  y: liteMotion ? 18 : 34,
                  scale: 0.96,
                  filter: "none",
                  clipPath: "inset(0 100% 0 0)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: "none",
                  clipPath: "inset(0 0% 0 0)",
                  stagger: liteMotion ? 0.035 : 0.075,
                  duration: liteMotion ? 0.45 : 0.75,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 58%",
                    toggleActions: "restart none restart reverse",
                  },
                },
              );
            }

            if (projectCards.length) {
              gsap.fromTo(
                projectCards,
                {
                  autoAlpha: 0,
                  "--card-entry-scale": liteMotion ? 0.78 : 0.64,
                  "--card-entry-y": liteMotion ? "55px" : "110px",
                  "--card-entry-z": liteMotion ? "-60px" : "-260px",
                  "--card-entry-rotate": (index: number) =>
                    `${index % 2 === 0 ? -(liteMotion ? 4 : 10) : liteMotion ? 4 : 10}deg`,
                  clipPath: "circle(18% at 50% 50%)",
                },
                {
                  autoAlpha: 1,
                  "--card-entry-scale": 1,
                  "--card-entry-y": "0px",
                  "--card-entry-z": "0px",
                  "--card-entry-rotate": "0deg",
                  clipPath: "circle(85% at 50% 50%)",
                  stagger: {
                    each: 0.28,
                    from: "start",
                  },
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: projectCards[0].parentElement,
                    start: "top 92%",
                    end: "bottom 68%",
                    scrub: liteMotion ? 0.35 : 0.75,
                  },
                },
              );
            }

            if (cards.length) {
              gsap.fromTo(
                cards,
                { "--data-scan": "0%" },
                {
                  "--data-scan": "100%",
                  stagger: 0.08,
                  duration: 0.9,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    toggleActions: "restart none restart reverse",
                  },
                },
              );
            }

            const activateSection = () => {
              document.body.dataset.stage = section.dataset.stage ?? "";
              const next = section.id === "home" ? null : section.id;
              setActiveNav((current) => (current === next ? current : next));
            };

            ScrollTrigger.create({
              trigger: section,
              start: "top center",
              end: "bottom center",
              onEnter: activateSection,
              onEnterBack: activateSection,
            });
          });

        if (!liteMotion) {
          gsap.to(".portal-entry", {
            scale: 1.7,
            rotate: 220,
            xPercent: 24,
            yPercent: -16,
            ease: "none",
            scrollTrigger: {
              trigger: "main",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
          gsap.to(".portal-exit", {
            scale: 0.72,
            rotate: -180,
            xPercent: -18,
            yPercent: 24,
            ease: "none",
            scrollTrigger: {
              trigger: "main",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
          gsap.to(".portal-beam", {
            opacity: 0.9,
            rotate: 34,
            ease: "none",
            scrollTrigger: {
              trigger: "main",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
        }
      });
      teardown = () => {
        cancelAnimationFrame(frame);
        cancelAnimationFrame(progressFrame);
        stopVirtualScrollListener();
        removeEventListener("scroll", update);
        ctx.revert();
        lenis.destroy();
        refreshScroll.current = null;
        if (scrollController.current === controller) {
          scrollController.current = null;
        }
      };
    };

    let idleCallback: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleCallback = requestIdleCallback(
        () => void initializeScrollExperience(),
        { timeout: 400 },
      );
    } else {
      fallbackTimer = setTimeout(() => void initializeScrollExperience(), 0);
    }

    return () => {
      disposed = true;
      if (idleCallback !== undefined) cancelIdleCallback(idleCallback);
      if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
      teardown?.();
    };
  }, [
    liteExperience,
    ready,
    reduced,
    setAssemblyProgress,
    setProgress,
    setStageProgress,
  ]);

  const openProjectGallery = useCallback(
    (projectName: string, initialIndex: number, trigger: HTMLButtonElement) => {
      const card = trigger.closest<HTMLElement>(".project-card");
      card?.style.setProperty("--card-rx", "0deg");
      card?.style.setProperty("--card-ry", "0deg");
      setMenu(false);
      galleryOpen.current = true;
      galleryTrigger.current = trigger;
      scrollController.current?.stop();
      setGallerySelection({ projectName, initialIndex, returnFocus: trigger });
    },
    [],
  );

  const closeProjectGallery = useCallback(() => {
    const trigger = galleryTrigger.current;
    galleryOpen.current = false;
    galleryTrigger.current = null;
    setGallerySelection(null);
    if (!mobileMenuOpen.current) scrollController.current?.start();
    setTimeout(() => {
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      refreshScroll.current?.();
    }, 0);
  }, []);

  return (
    <div className="universe" data-language="en" lang="en" dir="ltr">
      <div
        className={`boot ${loaded ? "is-complete" : ""} ${ready ? "world-ready" : ""}`.trim()}
        aria-hidden={loaded}
      >
        <div className="boot-core">
          <Braces />
          <p>ALI.OS / PORTFOLIO</p>
          <h2>{ready ? "WORLD ONLINE" : "INITIALIZING 3D ENGINE"}</h2>
          <div className="boot-track">
            <i />
          </div>
          <span>{ready ? "WELCOME" : "LOADING EXPERIENCE..."}</span>
        </div>
      </div>
      <div className="world">
        <WorldCanvas
          active={loaded && !gallerySelection}
          reduced={reduced || liteExperience !== false}
          theme={theme}
        />
      </div>
      <div className="nebula" aria-hidden="true" />
      <div className="scroll-portals" aria-hidden="true">
        <div className="portal-orb portal-entry" />
        <div className="portal-orb portal-exit" />
        <div className="portal-beam" />
        <div className="scroll-progress">
          <i />
        </div>
      </div>
      <header className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <a
          className="nav-brand"
          href="#home"
          aria-label="Ali Albayati — back to home"
          onClick={(event) => handleAnchorClick(event, "#home")}
        >
          <span className="nav-brand__mark" aria-hidden="true">
            <Braces />
          </span>
          <span className="nav-brand__identity">
            <b>Ali Albayati</b>
            <small>Full-stack · Mobile</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          {(isArabic
            ? ar.nav
            : ["About", "Skills", "Experience", "Projects", "Lab", "Contact"]
          ).map((x, index) => {
            const target = ar.navTargets[index];
            return (
              <a
                key={x}
                href={`#${target}`}
                aria-current={activeNav === target ? "location" : undefined}
                onClick={(event) => handleAnchorClick(event, `#${target}`)}
              >
                {x}
              </a>
            );
          })}
        </nav>
        <div className="nav-actions">
          <div
            ref={cvMenuRef}
            className={`cv-menu ${cvMenu ? "is-open" : ""}`.trim()}
            onBlurCapture={(event) => {
              if (
                !(event.relatedTarget instanceof Node) ||
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                setCvMenu(false);
              }
            }}
          >
            <button
              ref={cvButtonRef}
              className="navbar-cv"
              type="button"
              aria-expanded={cvMenu}
              aria-haspopup="menu"
              aria-controls="cv-download-menu"
              aria-label="Choose a resume to download"
              onClick={() => {
                setMenu(false);
                setCvMenu((open) => !open);
              }}
              onKeyDown={handleCvTriggerKeyDown}
            >
              <span>
                <b>Resume</b>
                <small>4 tailored PDFs</small>
              </span>
              <i aria-hidden="true">
                <Download />
              </i>
            </button>
            <div
              id="cv-download-menu"
              className="cv-menu__panel"
              aria-hidden={!cvMenu}
              inert={!cvMenu}
            >
              <div className="cv-menu__header">
                <span>RESUME ARCHIVE</span>
                <strong>Choose your specialization</strong>
              </div>
              <div
                className="cv-menu__list"
                role="menu"
                aria-label="Resume downloads"
                onKeyDown={handleCvMenuKeyDown}
              >
                {cvOptions.map((option, index) => (
                  <a
                    key={option.label}
                    href={option.href}
                    download={option.filename}
                    role="menuitem"
                    onClick={() => setCvMenu(false)}
                  >
                    <small>0{index + 1}</small>
                    <span>
                      <b>{option.label}</b>
                      <em>{option.detail}</em>
                    </span>
                    <i aria-hidden="true">
                      <Download />
                    </i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <button
            className={`theme-toggle ${theme}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Switch color theme"
          >
            <Sun className="sun-icon" />
            <Moon className="moon-icon" />
            <i aria-hidden="true" />
          </button>
          <button
            ref={menuButtonRef}
            className="menu-button"
            onClick={() => {
              setCvMenu(false);
              setMenu(!menu);
            }}
            aria-label="Toggle navigation"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <nav
        id="mobile-navigation"
        data-lenis-prevent
        className={`mobile-menu ${menu ? "is-open" : ""}`.trim()}
        aria-label="Mobile navigation"
        aria-hidden={!menu}
        inert={!menu}
      >
        {(isArabic
          ? ar.nav
          : ["About", "Skills", "Experience", "Projects", "Lab", "Contact"]
        ).map((x, i) => (
          <a
            key={x}
            href={`#${ar.navTargets[i]}`}
            aria-current={
              activeNav === ar.navTargets[i] ? "location" : undefined
            }
            onClick={(event) =>
              handleAnchorClick(event, `#${ar.navTargets[i]}`)
            }
          >
            <span>0{i + 1}</span>
            {x}
          </a>
        ))}
      </nav>
      <main>
        <section
          id="home"
          className="scene hero-scene stage-scene"
          data-stage="origin"
        >
          <div className="hero-copy">
            <div className="hero-heading">
              <p className="kicker">
                {isArabic
                  ? ar.heroKicker
                  : "FULL-STACK & MOBILE DEVELOPER // CREATIVE ENGINEER"}
              </p>
              <h1
                className={`${isArabic ? "arabic-name " : ""}${nameReady ? "name-ready" : ""}`.trim()}
                style={
                  isArabic
                    ? {
                        width: "fit-content",
                        maxWidth: "78%",
                        fontSize: "clamp(2.8rem, 4.4vw, 4.6rem)",
                        lineHeight: 1.35,
                        letterSpacing: "-0.02em",
                        fontFamily: '"Cairo", Arial, sans-serif',
                      }
                    : undefined
                }
              >
                <span className="name-line name-first">ALI</span>
                <br />
                <span className="name-line name-last">ALBAYATI</span>
              </h1>
            </div>
            <div className="hero-bottom">
              <p>
                {isArabic ? (
                  ar.heroText
                ) : (
                  <>
                    Shipping web, backend, mobile & AI systems
                    <br />
                    with code & creativity.
                  </>
                )}
              </p>
              <div className="hero-actions">
                <a
                  href="#projects"
                  className="holo primary hero-cta hero-cta--primary"
                  onClick={(event) => handleAnchorClick(event, "#projects")}
                >
                  <span className="hero-cta__label">
                    {isArabic ? ar.explore : "Explore my work"}
                  </span>
                  <span className="hero-cta__icon" aria-hidden="true">
                    <ArrowDown />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="holo hero-cta"
                  onClick={(event) => handleAnchorClick(event, "#contact")}
                >
                  <span className="hero-cta__label">
                    {isArabic ? ar.contact : "Contact me"}
                  </span>
                  <span className="hero-cta__icon" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className={`hero-portrait ${loaded || reduced ? "is-loaded" : ""}`.trim()}
          >
            <HeroAvatar alt={profile.name} />
          </div>
          <div className="scroll-mark">
            <span>{isArabic ? ar.scroll : "SCROLL TO ENTER"}</span>
            <i />
          </div>
        </section>
        <section
          id="about"
          className="scene content-scene stage-scene"
          data-stage="profile"
        >
          <div className="panel reveal align-left">
            <SectionNo n="01" text={isArabic ? ar.sections[0] : "About me"} />
            <h2>
              {isArabic ? ar.aboutTitle[0] : "I engineer interfaces"}
              <br />
              {isArabic ? (
                <em>{ar.aboutTitle[1]}</em>
              ) : (
                <>
                  that feel <em>alive.</em>
                </>
              )}
            </h2>
            <p>
              {isArabic
                ? ar.aboutText
                : "I’m Ali, a full-stack and mobile developer based in Aleppo. I ship production systems across Next.js, NestJS, React Native, databases, real-time services, and applied AI — including apps published on both Google Play and the Apple App Store."}
            </p>
            <div className="stat-line">
              <b>04</b>
              <span>
                {isArabic ? (
                  ar.years
                ) : (
                  <>
                    Years building
                    <br />
                    digital products
                  </>
                )}
              </span>
              <b>04</b>
              <span>
                {isArabic ? (
                  ar.disciplines
                ) : (
                  <>
                    Engineering
                    <br />
                    disciplines
                  </>
                )}
              </span>
            </div>
          </div>
        </section>
        <section
          id="skills"
          className="scene content-scene stage-scene"
          data-stage="systems"
        >
          <div className="panel reveal align-right">
            <SectionNo
              n="02"
              text={isArabic ? ar.sections[1] : "Skills universe"}
            />
            <h2>
              {isArabic ? ar.skillsTitle[0] : "Technology in"}
              <br />
              <em>{isArabic ? ar.skillsTitle[1] : "orbit."}</em>
            </h2>
            <p>
              {isArabic
                ? ar.skillsText
                : "Every tool has a purpose. Together they form a production stack for modern interfaces, reliable APIs, mobile products, and data-driven systems."}
            </p>
            <div className="skill-list">
              {portfolioSkills.map((s, i) => (
                <div key={s.category}>
                  <span>0{i + 1}</span>
                  <p>
                    <b>{isArabic ? arSkillCategories[i] : s.category}</b>
                    {s.value}
                  </p>
                  <i />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="experience"
          className="scene content-scene stage-scene"
          data-stage="trajectory"
        >
          <div className="panel reveal align-left wide">
            <SectionNo
              n="03"
              text={isArabic ? ar.sections[2] : "Experience road"}
            />
            <h2>
              {isArabic ? ar.experienceTitle[0] : "Checkpoints in"}
              <br />
              <em>{isArabic ? ar.experienceTitle[1] : "production."}</em>
            </h2>
            <div className="experience-list">
              {portfolioExperiences.map((e, i) => (
                <article key={e.year + e.role}>
                  <span>0{i + 1}</span>
                  <time>{e.year}</time>
                  <div>
                    <h3>{isArabic ? arExperiences[i].role : e.role}</h3>
                    <p>{isArabic ? arExperiences[i].company : e.company}</p>
                    <small>
                      {isArabic ? arExperiences[i].detail : e.detail}
                    </small>
                  </div>
                  <ArrowUpRight />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="projects"
          className="scene project-scene stage-scene"
          data-stage="artifacts"
        >
          <div className="section-top reveal">
            <SectionNo
              n="04"
              text={isArabic ? ar.sections[3] : "Project museum"}
            />
            <h2>
              {isArabic ? ar.projectsTitle[0] : "Selected digital"}
              <br />
              <em>{isArabic ? ar.projectsTitle[1] : "artifacts."}</em>
            </h2>
          </div>
          <div className="project-cards">
            {portfolioProjects.map((p, i) => {
              const mediaPreview = projectMediaPreviews[p.name];

              return (
                <article
                  key={p.id}
                  className={`project-card reveal ${mediaPreview ? "project-card--media" : ""}`.trim()}
                  onPointerMove={handleProjectTilt}
                  onPointerLeave={resetProjectTilt}
                  onPointerCancel={resetProjectTilt}
                >
                  <div className="card-index">
                    {p.id}
                    <span>/08</span>
                  </div>
                  {mediaPreview ? (
                    <ProjectMediaPreview
                      media={mediaPreview}
                      projectCode={p.code}
                      projectName={p.name}
                      onOpen={(initialIndex, trigger) =>
                        openProjectGallery(p.name, initialIndex, trigger)
                      }
                      onPreload={preloadProjectGallery}
                    />
                  ) : (
                    <div className={`artifact a${(i % 3) + 1}`}>
                      <i />
                      <b />
                      <span>{p.code}</span>
                    </div>
                  )}
                  <p className="project-type">
                    {isArabic ? arProjects[i].type : p.type}
                  </p>
                  <h3>{p.name}</h3>
                  <p>{isArabic ? arProjects[i].desc : p.desc}</p>
                  <footer>
                    {p.tech}
                    <ArrowUpRight />
                  </footer>
                </article>
              );
            })}
          </div>
        </section>
        <section
          id="lab"
          className="scene content-scene stage-scene"
          data-stage="laboratory"
        >
          <div className="panel reveal align-right lab-panel">
            <SectionNo
              n="05"
              text={isArabic ? ar.sections[4] : "Code laboratory"}
            />
            <h2>
              {isArabic ? ar.labTitle[0] : "Inside the"}
              <br />
              <em>{isArabic ? ar.labTitle[1] : "machine."}</em>
            </h2>
            <div className="code-window">
              <header>
                <i />
                <i />
                <i />
                <span>experience.tsx</span>
              </header>
              <pre>
                <code>
                  <b>const</b> experience = &#123;{"\n"} craft: <em>true</em>,
                  {"\n"} performance: <em>95</em>,{"\n"} details:{" "}
                  <span>&quot;intentional&quot;</span>,{"\n"} limits:{" "}
                  <b>undefined</b>
                  {"\n"}&#125;
                </code>
              </pre>
            </div>
            <div className="terminal-line">
              <Code2 /> npm run create-future <i />
            </div>
            <div className="credentials-grid">
              <article>
                <span>{isArabic ? ar.education : "EDUCATION"}</span>
                <h3>{isArabic ? ar.educationName : profile.education}</h3>
                <p>{profile.educationDates} · Aleppo, Syria</p>
                <small>
                  {isArabic
                    ? ar.educationDetail
                    : "Software Engineering, Networks, Databases, Web Technologies, and Communication Systems."}
                </small>
              </article>
              <article>
                <span>{isArabic ? ar.certification : "CERTIFICATION"}</span>
                <h3>
                  {isArabic ? ar.certificationName : profile.certification}
                </h3>
                <p>{profile.certificationDates}</p>
                <small>
                  {isArabic
                    ? ar.certificationDetail
                    : "Network security, web penetration testing, threat detection, incident response, and vulnerability management. Official recommendation received."}
                </small>
              </article>
              <article>
                <span>{isArabic ? ar.languages : "LANGUAGES"}</span>
                <h3>
                  {isArabic ? ar.languageName : "Arabic — Native / Bilingual"}
                </h3>
                <p>
                  {isArabic
                    ? ar.languageDetail
                    : "English — B2 Upper Intermediate"}
                </p>
                <small>
                  {isArabic
                    ? "كفاءة مهنية في العمل."
                    : "Professional working proficiency."}
                </small>
              </article>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="scene contact-scene stage-scene"
          data-stage="signal"
        >
          <div className="contact-copy reveal">
            <SectionNo
              n="06"
              text={isArabic ? ar.sections[5] : "Communication portal"}
            />
            <h2>
              {isArabic ? ar.contactTitle[0] : "LET’S CREATE"}
              <br />
              <em>{isArabic ? ar.contactTitle[1] : "THE FUTURE."}</em>
            </h2>
            <p>
              {isArabic ? (
                ar.contactText
              ) : (
                <>
                  Have an ambitious product, interface, or interactive idea?
                  <br />
                  Transmit a signal.
                </>
              )}
            </p>
            <div className="contact-actions">
              <a className="portal-button" href={`mailto:${profile.email}`}>
                <Mail /> {isArabic ? ar.start : "Start a conversation"}{" "}
                <ArrowUpRight />
              </a>
              <div className="socials">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail />
                </a>
              </div>
            </div>
            <div className="contact-details">
              <a href={`mailto:${profile.email}`}>
                <Mail />
                <span>{isArabic ? ar.email : "Email"}</span>
                {profile.email}
              </a>
              <a
                href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Contact me on WhatsApp"
              >
                <MessageCircle />
                <span>WhatsApp</span>
                {profile.phone}
              </a>
              <p>
                <MapPin />
                <span>{isArabic ? ar.location : "Location"}</span>
                {isArabic ? "حلب، سوريا" : profile.location}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()}{" "}
          {isArabic ? "علي البياتي" : "ALI ALBAYATI"}
        </span>
        <a href="#home" onClick={(event) => handleAnchorClick(event, "#home")}>
          {isArabic ? ar.back : "BACK TO TOP ↑"}
        </a>
      </footer>
      {gallerySelection && (
        <ProjectGallery
          key={gallerySelection.projectName}
          projectName={gallerySelection.projectName}
          initialIndex={gallerySelection.initialIndex}
          returnFocus={gallerySelection.returnFocus}
          onClose={closeProjectGallery}
        />
      )}
    </div>
  );
}
function SectionNo({ n, text }: { n: string; text: string }) {
  return (
    <p className="section-no">
      <span>{n}</span> / 06 — {text}
    </p>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.27c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.34 7.93H1.72V19.5h3.62V7.93ZM3.53 2.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM19.5 7.66c-1.94 0-3.24 1.06-3.77 2.07h-.05v-1.8h-3.47V19.5h3.62v-5.72c0-1.51.29-2.98 2.17-2.98 1.85 0 1.87 1.73 1.87 3.08v5.62h3.62v-6.34c0-3.11-.67-5.5-3.99-5.5Z" />
    </svg>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return reduced;
}

function GalleryLoading() {
  return (
    <div className="project-gallery-loading" role="status" aria-live="polite">
      <span />
      <p>Preparing project archive…</p>
    </div>
  );
}
