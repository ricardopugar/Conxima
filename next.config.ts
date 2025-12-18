// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera HTML estático en la carpeta `out`
  output: "export",

  // Hace que /ciberseguridad/fortinet sea una carpeta con index.html
  // en lugar de fortinet.html
  trailingSlash: true,

  // Como lo vas a subir a cPanel, desactivamos la optimización de imágenes
  // del lado del servidor de Next.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
