import React from "react";

const skills = ["React", "Next.js", "TypeScript", "JavaScript"];

const EnhancedSkillsSection: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {skills.map((skill, index) => (
        <div
          key={skill}
          className="relative px-6 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-lg shadow-lg 
                     hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 group"
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          />

          {/* Skill Name */}
          <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
            {skill}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EnhancedSkillsSection;
