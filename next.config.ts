import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel packages its own server output; standalone is for self-hosting.
  output: process.env.VERCEL ? undefined : "standalone",
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
