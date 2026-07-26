import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pg — нативный модуль, должен загружаться через require, не бандлиться
  serverExternalPackages: ["pg"],
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
