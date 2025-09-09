import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático para publicar en Cloudflare Pages (carpeta ./out)
  output: "export",
  // Usamos next/image pero sin optimizador del servidor (apto para export)
  images: { unoptimized: true },
};

export default nextConfig;
