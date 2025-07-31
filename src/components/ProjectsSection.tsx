import { ExternalLink, Github, Sparkles, X } from "lucide-react";
import { useState } from "react";
import ScrollAnimationWrapper from "./Scroll Animation Wrapper ";

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: " Shop X Store",
      description:
        "A full-stack e-commerce solution with real-time inventory management and payment processing.",
      image: "/store.png",
      technologies: ["React", "Next.js", "Firebase", "TailwindCSS", "API"],
      category: "Full Stack",
      features: [
        "User Authentication",
        "Payment Integration",
        "Real-time Updates",
      ],
    },
    {
      id: 2,
      title: "Movie List",
      description:
        "A dynamic movie catalog app that lets you explore, search, classify your favorite films and have a clean, server-side interface.",
      image: "/films.png",
      technologies: ["React", "Next.js", "Firebase", "TailwindCSS", "API"],
      category: "Full Stack",
      features: [
        "Personalized Recommendations",
        "Advanced Search and Filters",
        "Watchlist Management",
        "Trending Movies Section",
        "Server-side Rendering for Performance",
      ],
    },
    {
      id: 3,
      title: "Quize",
      description:
        "An interactive quiz platform with customizable questions, instant feedback, and performance tracking to make learning fun and engaging.",
      image: "/quize.png",
      technologies: ["React", "Next.js", "Firebase", "TailwindCSS"],
      category: "FrontEnd",
      features: [
        "Customizable Question Sets",
        "Instant Feedback and Score Tracking",
        "Timer and Challenge Modes",
        "Leaderboard and Performance Stats",
        "Mobile-Friendly, Multi-Platform Support",
      ],
    },
    {
      id: 4,
      title: "News",
      description:
        "An advanced dashboard that delivers real-time insights into breaking news, media coverage patterns, and trending topics from around the web.",
      image: "/news.png",
      technologies: ["React", "Next.js", "Firebase", "TailwindCSS", "API"],
      category: "FrontEnd",
      links: {
        github: "https://github.com",
        live: "https://example.com",
      },
      features: [
        "Real-time News Updates",
        "Trending Topics Tracker",
        "Source Comparison and Analysis",
        "Personalized News Feed",
      ],
    },
    {
      id: 5,
      title: "Dectionary",
      description:
        "An intelligent dictionary platform that provides instant definitions, word translations, synonyms, and usage examples in real-time.",
      image: "/dectionary.png",
      technologies: ["React", "Next.js", "Firebase", "TailwindCSS", "API"],
      category: "FrontEnd",
      links: {
        github: "https://github.com",
        live: "https://example.com",
      },
      features: [
        "Instant Word Definitions",
        "Synonyms and Antonyms Finder",
        "Multilingual Translations",
        "Pronunciation Guide",
        "Word of the Day & Vocabulary Builder",
      ],
    },
    {
      id: 6,
      title: "Weather",
      description:
        "A dynamic weather dashboard providing real-time forecasts, temperature trends, and severe weather alerts for any location worldwide.",
      image: "/weather.png",
      technologies: ["React", "Next.js", "Firebase", "TailwindCSS", "API"],
      category:  "FrontEnd",
      links: {
        github: "https://github.com",
        live: "https://example.com",
      },
      features: [
        "Real-time Weather Updates",
        "Hourly and Weekly Forecasts",
        "Severe Weather Alerts",
        "Interactive Maps with Radar",
        "Location-based Weather Tracking",
      ],
    },
  ];

  const openModal = (project: any) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimationWrapper animation="fade-up" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore my latest work and creative solutions.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Project Grid with Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimationWrapper
              key={project.id}
              animation="auto"
              autoIndex={index}
              autoTotal={projects.length}
            >
              <div
                className="group relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Project Image with Click Handler */}
                <div
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1 rounded-full text-sm bg-blue-500/20 border border-blue-500/30 text-blue-400">
                      {project.category}
                    </span>
                  </div>

                  {/* View Image Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-blue-500/70 px-4 py-2 rounded-lg text-white text-sm font-medium">
                      View Image
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-gray-700/50 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full overflow-hidden border border-gray-700 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-white z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-3/5 h-80 md:h-auto relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-2/5 p-6">
                <div className="mb-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 border border-blue-500/30 text-blue-400">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {selectedProject.description}
                </p>

                <h4 className="text-lg font-medium text-gray-200 mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech: any) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-700/50 rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-lg font-medium text-gray-200 mb-2">
                  Key Features
                </h4>
                <div className="space-y-2 mb-6">
                  {selectedProject.features.map((feature: any) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Links if available */}
                {selectedProject.links && (
                  <div className="flex space-x-4 mt-6">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    )}
                    {selectedProject.links.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
