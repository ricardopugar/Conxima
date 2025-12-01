// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera HTML estático en la carpeta `out`
  output: "export",

  // Como lo vas a subir a cPanel, desactivamos la optimización de imágenes
  // del lado del servidor de Next.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
