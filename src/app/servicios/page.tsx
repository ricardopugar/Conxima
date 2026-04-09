import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ServiciosBentoCatalog, {
  type CatalogItem
} from "@/app/servicios/components/ServiciosBentoCatalog";
import { servicios } from "@/data/servicios";
import { buildMetadata } from "@/lib/seo";

const serviceMap = new Map(servicios.map((servicio) => [servicio.slug, servicio]));

const buildServiceCatalogItem = (slug: string): CatalogItem => {
  const servicio = serviceMap.get(slug);

  if (!servicio) {
    throw new Error(`Servicio no encontrado en catalogo: ${slug}`);
  }

  return {
    slug: servicio.slug,
    title: servicio.title,
    resumen: servicio.resumen,
    imagen: servicio.imagen
  };
};

const catalogItems: CatalogItem[] = [
  buildServiceCatalogItem("cableado-estructurado"),
  buildServiceCatalogItem("cctv"),
  {
    slug: "ciberseguridad",
    title: "Ciberseguridad",
    resumen:
      "Proteccion de red, usuarios, accesos y datos para empresas que necesitan operar con mas control y menos riesgo.",
    imagen: "/images/fortigate.jpg",
    href: "/ciberseguridad",
    ctaLabel: "Ver ciberseguridad"
  },
  {
    slug: "puntos-de-datos",
    title: "Puntos de Datos",
    resumen:
      "Implementacion ordenada de salidas de red para puestos, camaras, telefonia y equipos conectados sobre una infraestructura profesional.",
    imagen: "/images/servicios-landing/infraestructura de red y gabinetes .png",
    href: "/servicios/cableado-estructurado",
    ctaLabel: "Cotizar puntos"
  },
  ...servicios
    .filter((servicio) =>
      !["cableado-estructurado", "cctv"].includes(servicio.slug)
    )
    .map((servicio) => ({
      slug: servicio.slug,
      title: servicio.title,
      resumen: servicio.resumen,
      imagen: servicio.imagen
    }))
];

export const metadata: Metadata = buildMetadata({
  title: "Servicios de seguridad, redes y conectividad | CONXIMA",
  description:
    "Catalogo de servicios de infraestructura de red, cableado estructurado, fibra optica, ciberseguridad y seguridad electronica para empresas en Ecuador.",
  path: "/servicios",
  keywords: [
    "servicios tecnologicos para empresas en Ecuador",
    "cableado estructurado en Ecuador",
    "infraestructura de red en Guayaquil",
    "seguridad electronica y telecomunicaciones",
    "ciberseguridad CONXIMA"
  ]
});

export default function ServiciosPage() {
  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-200">Servicios</span>
        </div>

        <ServiciosBentoCatalog items={catalogItems} />
      </main>

      <Footer />
    </div>
  );
}
