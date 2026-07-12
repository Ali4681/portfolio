"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const roles = [
  {
    date: "Jul 2025 — Feb 2026",
    role: "Mobile Developer",
    company: "RADAR Company",
    focus: "Mobile product development",
  },
  {
    date: "Mar 2025 — May 2025",
    role: "Frontend Developer (Part-time)",
    company: "RAIZER",
    focus: "Frontend product development",
  },
  {
    date: "Apr 2024 — Dec 2024",
    role: "Backend Developer",
    company: "RADAR Company",
    focus: "Backend systems development",
  },
  {
    date: "Feb 2023 — Oct 2023",
    role: "Frontend Developer",
    company: "RADAR Company",
    focus: "Frontend application development",
  },
];

export default function ExperienceTimeline({
  lang,
  reduced,
}: {
  lang: "en" | "ar";
  reduced: boolean;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="timeline">
      {roles.map((item, i) => (
        <motion.article
          key={item.date}
          className={`timeline-item ${active === i ? "active" : ""}`}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: i * 0.08 }}
        >
          <button
            onClick={() => setActive(active === i ? -1 : i)}
            aria-expanded={active === i}
          >
            <span className="timeline-dot" />
            <time>{item.date}</time>
            <div>
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>
            <Plus />
          </button>
          {active === i && (
            <motion.div
              className="console-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <p>
                <span>role.focus</span>{" "}
                {lang === "ar"
                  ? "— تطوير منتجات وأنظمة جاهزة للإنتاج"
                  : `— ${item.focus} for production products.`}
              </p>
              <p>
                <span>status</span> — shipped
              </p>
            </motion.div>
          )}
        </motion.article>
      ))}
    </div>
  );
}
