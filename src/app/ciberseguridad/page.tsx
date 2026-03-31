import type { Metadata } from "next";
import CybersecurityOverview from "../components/CybersecurityOverview";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { buildMetadata } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  serializeJsonLd
} from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "Ciberseguridad para empresas en Ecuador | CONXIMA",
  description:
    "Servicios y soluciones de ciberseguridad para empresas en Ecuador: seguridad perimetral, acceso remoto seguro, visibilidad del tráfico y acompañamiento local.",
  path: "/ciberseguridad",
  keywords: [
    "ciberseguridad para empresas en Ecuador",
    "seguridad perimetral",
    "acceso remoto seguro",
    "Fortinet en Ecuador",
    "CONXIMA ciberseguridad"
  ]
});

export default function CybersecurityPage() {
  const breadcrumbJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Ciberseguridad", path: "/ciberseguridad" }
    ])
  );
  const serviceJsonLd = serializeJsonLd(
    buildServiceJsonLd({
      name: "Ciberseguridad para empresas en Ecuador",
      description:
        "Servicios y soluciones de ciberseguridad para empresas en Ecuador: seguridad perimetral, acceso remoto seguro, visibilidad del tráfico y acompañamiento local.",
      path: "/ciberseguridad"
    })
  );

  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJsonLd }}
      />
      <Navbar />
      <CybersecurityOverview />
      <Footer />
    </div>
  );
}
