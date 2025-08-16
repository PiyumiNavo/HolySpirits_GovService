import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@myorg/ui"],
  output: 'standalone',
};

export default nextConfig;
