import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // GitHub project site: /mcpgo-next; custom domain: empty prefix.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH === "/" ? undefined : process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
