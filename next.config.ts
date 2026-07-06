import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.strapi.io",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.up.railway.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow local/private IPs for development with Strapi
    dangerouslyAllowLocalIP: true,
  },

  // Environment variables available on the client
  env: {
    NEXT_PUBLIC_STRAPI_API_URL:
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
  },
};

export default nextConfig;
