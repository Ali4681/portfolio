"use client";
import { useState } from "react";

const nodes = [
  ["Next.js", 15, 22, "Frontend"],
  ["React", 34, 13, "Frontend"],
  ["TypeScript", 50, 25, "Frontend"],
  ["Tailwind", 28, 38, "Frontend"],
  ["NestJS", 69, 18, "Backend"],
  ["Node.js", 84, 31, "Backend"],
  ["WebSockets", 67, 42, "Backend"],
  ["React Native", 15, 64, "Mobile"],
  ["Expo", 33, 73, "Mobile"],
  ["Firebase", 48, 61, "Infra"],
  ["PostgreSQL", 72, 66, "Data"],
  ["MongoDB", 88, 76, "Data"],
  ["Prisma", 57, 79, "Data"],
  ["TensorFlow", 27, 91, "AI"],
  ["MobileNetV2", 9, 84, "AI"],
  ["Docker", 83, 50, "Infra"],
] as const;
const edges = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [4, 5],
  [4, 6],
  [4, 10],
  [4, 12],
  [5, 15],
  [6, 9],
  [7, 8],
  [7, 9],
  [8, 9],
  [10, 12],
  [11, 12],
  [13, 14],
];
const colors: Record<string, string> = {
  Frontend: "#2de1c2",
  Backend: "#7a8b5c",
  Mobile: "#71a7ff",
  Data: "#d4a66a",
  AI: "#c481ff",
  Infra: "#829197",
};

export default function SkillsNetwork({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div
      className={`network ${reduced ? "reduced" : ""}`}
      role="img"
      aria-label="Interactive network of Ali's development skills"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][1]}
            y1={nodes[a][2]}
            x2={nodes[b][1]}
            y2={nodes[b][2]}
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <button
          key={n[0]}
          className={`skill-node ${active === i ? "active" : ""}`}
          style={
            {
              left: `${n[1]}%`,
              top: `${n[2]}%`,
              "--node-color": colors[n[3]],
            } as React.CSSProperties
          }
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
        >
          <i />
          <span>{n[0]}</span>
          <small>{n[3]}</small>
        </button>
      ))}
      <div className="network-legend">
        {Object.entries(colors).map(([k, v]) => (
          <span key={k}>
            <i style={{ background: v }} />
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
