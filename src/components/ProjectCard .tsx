// components/ProjectCard.tsx
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  features: string[];
  links?: {
    github: string;
    live: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, image, technologies, features, links } = project;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/50 p-6 transition-transform duration-300 hover:scale-105 hover:border-blue-500">
      {/* Project Image */}
      <div
        className="relative w-full h-48 mb-4 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:opacity-80 transition-opacity duration-300"
        />
      </div>

      {/* Project Content */}
      <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
      <p className="text-gray-400 mb-2">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="text-gray-400 text-sm mb-4 list-disc pl-4">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {/* Links Section */}
      {links && (
        <div className="flex gap-4">
          <Link
            href={links.github}
            target="_blank"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            GitHub Repo
          </Link>
          <Link
            href={links.live}
            target="_blank"
            className="text-green-400 hover:text-green-300 transition-colors duration-300"
          >
            Live Demo
          </Link>
        </div>
      )}

      {/* Improved Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close when clicking outside the image
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative bg-gray-900 p-6 rounded-xl max-w-4xl w-full mx-4">
            <div className="relative w-full h-96 mb-4">
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-300 mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Features
                </h3>
                <ul className="text-gray-400 list-disc pl-4">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {links && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={links.github}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      GitHub Repo <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={links.live}
                      target="_blank"
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300"
                    >
                      Live Demo <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
