// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // genera ./out
  images: { unoptimized: true }, // si luego usas next/image sin loader
};

export default nextConfig;
