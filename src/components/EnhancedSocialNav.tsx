import React, { useState, useEffect } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

interface SocialLink {
  Icon: React.ElementType;
  href: string;
  label: string;
  hoverColor: string;
  glowColor: string;
}

const EnhancedSocialNav: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Ensure window is available before accessing it
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const socialLinks: SocialLink[] = [
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/ali-al-bayati-59b41b319/",
      label: "LinkedIn",
      hoverColor: "hover:text-blue-500",
      glowColor: "from-blue-400/40 to-blue-600/40",
    },
    {
      Icon: Github,
      href: "https://github.com/Ali4681",
      label: "GitHub",
      hoverColor: "hover:text-purple-500",
      glowColor: "from-purple-400/40 to-purple-600/40",
    },
    {
      Icon: Mail,
      href: "mailto:alialbayati468@gmail.com",
      label: "Email",
      hoverColor: "hover:text-red-500",
      glowColor: "from-red-400/40 to-red-600/40",
    },
  ];

  return (
    <div className="relative">
      {/* Social Links */}
      <div className="flex justify-center items-center space-x-12">
        {socialLinks.map(({ Icon, href, label, hoverColor, glowColor }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6"
          >
            {/* Magnetic glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${glowColor} rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:scale-150`}
              style={{
                transform: `translate(${
                  (mousePosition.x -
                    (typeof window !== "undefined"
                      ? window.innerWidth / 2
                      : 0)) /
                  50
                }px, ${
                  (mousePosition.y -
                    (typeof window !== "undefined"
                      ? window.innerHeight / 2
                      : 0)) /
                  50
                }px)`,
              }}
            />

            {/* Icon container */}
            <div className="relative z-10">
              <Icon
                size={32}
                className={`transform transition-all duration-500 ${hoverColor} group-hover:scale-125 group-hover:rotate-[360deg]`}
              />
            </div>

            {/* Label Animation */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-6 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {label.split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block transform translate-y-full group-hover:translate-y-0 transition-transform"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EnhancedSocialNav;
