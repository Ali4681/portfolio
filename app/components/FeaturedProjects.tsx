"use client";
import { motion } from "framer-motion";
import { BrainCircuit, Car, GitBranch } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "AutoService24",
    type: "Mobile marketplace",
    text: "A vehicle-services marketplace published on Google Play and the Apple App Store, with live WebSocket chat.",
    tags: ["React Native", "WebSockets", "NestJS"],
    icon: Car,
    visual: "map",
  },
  {
    id: "02",
    title: "ZAYTOUN",
    type: "Applied AI",
    text: "An olive-leaf disease detector classifying seven conditions with MobileNetV2 and approximately 97% validation accuracy.",
    tags: ["TensorFlow", "MobileNetV2", "Flask"],
    icon: BrainCircuit,
    visual: "scan",
  },
  {
    id: "03",
    title: "Islamic Inheritance System",
    type: "Full-stack / Fiqh",
    text: "A family-tree driven inheritance calculator with Arabic RTL PDF output through PDFKit, Cairo, and HarfBuzz.",
    tags: ["React Flow", "PDFKit", "RTL"],
    icon: GitBranch,
    visual: "tree",
  },
];

export default function FeaturedProjects({ reduced }: { reduced: boolean }) {
  return (
    <div className="featured-list">
      {projects.map((project) => {
        const Icon = project.icon;
        return (
          <motion.article
            key={project.id}
            className="featured-card"
            initial={reduced ? false : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className={`project-visual ${project.visual}`}
              aria-hidden="true"
            >
              <div className="visual-grid" />
              {project.visual === "map" && (
                <>
                  <i className="route" />
                  <b className="pin p1" />
                  <b className="pin p2" />
                  <span className="phone">
                    AS<span>24</span>
                  </span>
                </>
              )}
              {project.visual === "scan" && (
                <>
                  <span className="leaf">◒</span>
                  <i className="scanline" />
                  <strong>
                    97<small>%</small>
                  </strong>
                </>
              )}
              {project.visual === "tree" && (
                <div className="family-tree">
                  <i />
                  <i />
                  <i />
                  <i />
                  <span>1/2</span>
                  <span>1/4</span>
                  <span>1/8</span>
                </div>
              )}
            </div>
            <div className="project-info">
              <span className="project-number">{project.id} / 03</span>
              <div className="project-icon">
                <Icon />
              </div>
              <p className="eyebrow">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
