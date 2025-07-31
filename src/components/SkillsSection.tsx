import {
  Cloud,
  Code,
  Database,
  GitBranch,
  Layout,
  Network,
  Paintbrush,
  Shield,
  Target,
  Terminal,
  Users,
} from "lucide-react";
import { useState } from "react";
import ScrollAnimationWrapper from "./Scroll Animation Wrapper ";

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<
    keyof typeof skills | "all"
  >("all");

  const skills = {
    frontend: [
      { name: "React", level: 94, icon: <Code />, years: 3 },
      { name: "Next.js", level: 95, icon: <Layout />, years: 3 },
      { name: "TypeScript", level: 92, icon: <Terminal />, years: 3 },
      { name: "Tailwind CSS", level: 97, icon: <Paintbrush />, years: 3 },
    ],
    backend: [
      { name: "Node.js", level: 85, icon: <Terminal />, years: 2 },
      { name: "PostgreSQL", level: 82, icon: <Database />, years: 2 },
    ],
    tools: [{ name: "Github", level: 80, icon: <GitBranch />, years: 1 }],
    cybersecurity: [
      {
        name: "Network Security Fundamentals",
        level: 85,
        icon: <Network />,
        years: 1,
        description: "Network fundamentals from a cybersecurity perspective",
      },
      {
        name: "Cybersecurity Fundamentals",
        level: 88,
        icon: <Shield />,
        years: 1,
        description: "Core cybersecurity principles and practices",
      },
      {
        name: "Operating Systems & Cloud Computing",
        level: 82,
        icon: <Cloud />,
        years: 1,
        description: "OS security and cloud computing fundamentals",
      },
      {
        name: "Red Team Skills",
        level: 80,
        icon: <Target />,
        years: 1,
        description: "Offensive security and penetration testing",
      },
      {
        name: "Blue Team Skills",
        level: 90,
        icon: <Shield />,
        years: 1,
        description: "Defensive security and incident response",
      },
      {
        name: "Non-Technical Skills",
        level: 90,
        icon: <Users />,
        years: 1,
        description: "Soft skills required for cybersecurity professionals",
      },
    ],
  };

  const categories = {
    all: "All Skills",
    frontend: "Frontend",
    backend: "Backend",
    cybersecurity: "Cybersecurity",
    tools: "Tools & Others",
  };

  const getAllSkills = () => {
    if (activeCategory === "all") {
      return Object.values(skills).flat();
    }
    return skills[activeCategory] || [];
  };

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500/5 rounded-full mix-blend-screen animate-float"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency
            levels
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() =>
                setActiveCategory(key as keyof typeof skills | "all")
              }
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === key
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <ScrollAnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getAllSkills().map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                {/* Skill Header */}
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-200">
                    {skill.name}
                  </h3>
                </div>

                {/* Skill Level */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="text-sm text-gray-400">
                  {skill.years} years experience
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default SkillsSection;
