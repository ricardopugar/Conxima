import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { servicios } from "@/data/servicios";

export const dynamic = "force-static";

const staticRoutes = [
  "/",
  "/servicios",
  "/ciberseguridad",
  "/ciberseguridad/fortinet"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "/" : `${route}/`}`,
    lastModified: new Date()
  }));

  const serviceEntries = servicios.map((servicio) => ({
    url: `${SITE_URL}/servicios/${servicio.slug}/`,
    lastModified: new Date()
  }));

  return [...staticEntries, ...serviceEntries];
}
