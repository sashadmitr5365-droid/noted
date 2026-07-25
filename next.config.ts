import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel/Next.js: native modules (pg, ws) should not be bundled
  serverExternalPackages: ["pg", "ws", "@neondatabase/serverless"],
  // Allow remote image domains if you add any later
  images: {
    remotePatterns: [],
  },
  // Strict mode helps catch issues early in dev
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Powered-by header off for security
  poweredByHeader: false,
};

export default nextConfig;
