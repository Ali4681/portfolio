import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EnhancedSkillsSection from "./EnhancedSkillsSection";
import EnhancedSocialNav from "./EnhancedSocialNav"; // Import Enhanced Social Nav
import ScrollAnimationWrapper from "./Scroll Animation Wrapper ";
import TypingHeading from "./TypingHeading";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Main content */}
      <ScrollAnimationWrapper>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          {/* Avatar */}
          <div className="mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div
              className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-800 transform group-hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                src="/ali.jpg"
                alt="Ali's Picture"
                width={500} // Set desired width
                height={500} // Set desired height
              />
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-6 mb-12">
            <TypingHeading />
            <div className="relative">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-400 max-w-3xl mx-auto">
                Building seamless digital experiences with
                <span className="relative inline-block mx-2 group">
                  <span className="relative z-10 font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    passion and precision
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full transform group-hover:h-3 transition-all duration-300" />
                </span>
              </p>
            </div>
          </div>

          {/* Skills Pills */}
          <EnhancedSkillsSection />

          {/* Enhanced Social Links */}
          <EnhancedSocialNav />

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown size={32} className="animate-bounce text-gray-400" />
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default HeroSection;
