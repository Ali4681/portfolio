import { Code, Layout, Paintbrush, Shield } from "lucide-react";
import { useState } from "react";
import ScrollAnimationWrapper from "./Scroll Animation Wrapper ";
import Image from "next/image";

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const skills = [
    {
      icon: <Code size={24} />,
      title: "Development",
      description: "Full-stack web development with modern frameworks",
    },
    {
      icon: <Layout size={24} />,
      title: "Design",
      description: "UI/UX design with attention to detail",
    },
    {
      icon: <Shield size={24} />,
      title: "Security",
      description: "System protection and threat monitoring",
    },
    {
      icon: <Paintbrush size={24} />,
      title: "Creative",
      description: "Creative problem solving and innovation",
    },
  ];

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500/10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <ScrollAnimationWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Section */}
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"
                style={{ transform: "translate(-4px, -4px)" }}
              />
              <div className="relative bg-gray-900 p-8 rounded-lg border border-gray-700">
                <div
                  className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 transition-transform duration-500 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />

                  <Image
                    src="/alii.png"
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    fill // This ensures it behaves like an absolutely positioned, full-size background image
                    priority // Optional: makes sure the image loads faster if it's critical (like a profile pic)
                  />
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I am a passionate developer dedicated to crafting exceptional
                  digital experiences. With expertise in modern web technologies
                  and a keen eye for design, I transform complex challenges into
                  elegant solutions.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                      {skill.icon}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-200">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="text-gray-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Experience Bar */}
        <div className="mt-20">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Experience Level
            </h3>
            <div className="space-y-4">
              {["Next.js", "React", "TypeScript", "UI/UX"].map(
                (skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill}</span>
                      <span>{96 - index * 2}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${96 - index * 2}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
