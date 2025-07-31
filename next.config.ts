import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // مهم جدًا
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compress: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
