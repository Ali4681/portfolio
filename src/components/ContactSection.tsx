import { Alert, AlertDescription } from "@/components/ui/alert";
import { send } from "emailjs-com";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import ScrollAnimationWrapper from "./Scroll Animation Wrapper ";

const ContactSection = () => {
  // Form state management
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);

  // Social media accounts data
  const socialAccounts = [
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6 text-blue-400" />,
      username: "alialbayati468",
      link: "https://x.com/alialbayati468?s=21",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6 text-blue-500" />,
      username: "Ali Al-bayati",
      link: "https://www.linkedin.com/in/ali-al-bayati-59b41b319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6 text-pink-500" />,
      username: "ali_albayati468",
      link: "https://www.instagram.com/ali_albayati468?igsh=MTN5OTY1N3FnZXI4eQ%3D%3D&utm_source=qr",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6 text-blue-600" />,
      username: "Ali M Al-bayati",
      link: "https://www.facebook.com/ghost.bayati?mibextid=wwXIfr&mibextid=wwXIfr",
    },
  ];

  // Form submission handler
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await send(
        "service_36x5a43",
        "ali123456789",
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        "FkZCzFn4iJrgKtyaU"
      );
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" }); // Clear form after success
    } catch (err) {
      console.log("Error sending message", err);
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            style={{
              backgroundColor:
                i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#6366f1",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "30rem",
              height: "30rem",
              animation: `blob-spin ${15 + i * 2}s infinite linear`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Have a question or want to work together? Let's connect!
          </p>
        </div>

        {/* Contact Form Card */}
        <ScrollAnimationWrapper>
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

              <form
                onSubmit={handleSubmit}
                className="relative bg-gray-900/90 p-8 rounded-lg backdrop-blur-sm border border-gray-800"
              >
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-600"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-600"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <textarea
                        name="message"
                        id="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-600"
                        placeholder="Your message here..."
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium 
                    flex items-center justify-center space-x-2
                    hover:from-blue-600 hover:to-purple-600 
                    focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    transform hover:-translate-y-0.5 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <Alert className="mt-6 bg-green-500/10 text-green-500 border-green-500/20">
                    <AlertDescription>
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}
                {submitStatus === "error" && (
                  <Alert className="mt-6 bg-red-500/10 text-red-500 border-red-500/20">
                    <AlertDescription>
                      Something went wrong. Please try again later.
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <a
                href="mailto:alialbayati468@gmail.com"
                className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-6 h-6 mx-auto mb-3 text-blue-400" />
                <p className="text-gray-400">alialbayati468@gmail.com</p>
              </a>

              <button
                onClick={() => setIsVisible(!isVisible)}
                className="w-full p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <MessageSquare
                  className={`w-6 h-6 mx-auto mb-3 text-purple-400 transition-transform duration-300 ${
                    isVisible ? "rotate-180" : ""
                  }`}
                />
                <p className="text-gray-400">Let's connect on social media</p>
              </button>
            </div>

            {/* Social Media Links */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isVisible ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
              } overflow-hidden`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {socialAccounts.map((account, index) => (
                  <a
                    key={account.name}
                    href={account.link}
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer" // Security best practice
                    className={`p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 transform 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="transform transition-transform duration-300 hover:rotate-12">
                        {account.icon}
                      </div>
                      <div>
                        <h3 className="text-gray-200 font-medium">
                          {account.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {account.username}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default ContactSection;
