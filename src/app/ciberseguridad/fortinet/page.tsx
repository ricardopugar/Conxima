import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FortinetSection from "../../components/FortinetSection";
import Footer from "../../components/Footer";
import { buildMetadata } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  serializeJsonLd
} from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "FortiGate y Fortinet para empresas en Ecuador | CONXIMA",
  description:
    "Soluciones FortiGate con CONXIMA para proteger redes empresariales en Ecuador con firewall, VPN, filtrado, control de aplicaciones y soporte local.",
  path: "/ciberseguridad/fortinet",
  keywords: [
    "FortiGate en Ecuador",
    "Fortinet para empresas",
    "firewall FortiGate",
    "seguridad perimetral en Ecuador",
    "CONXIMA Fortinet"
  ]
});

export default function FortinetPage() {
  const breadcrumbJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Ciberseguridad", path: "/ciberseguridad" },
      { name: "Fortinet", path: "/ciberseguridad/fortinet" }
    ])
  );
  const serviceJsonLd = serializeJsonLd(
    buildServiceJsonLd({
      name: "FortiGate y Fortinet para empresas en Ecuador",
      description:
        "Soluciones FortiGate con CONXIMA para proteger redes empresariales en Ecuador con firewall, VPN, filtrado, control de aplicaciones y soporte local.",
      path: "/ciberseguridad/fortinet"
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
      <main>
        <FortinetSection />
      </main>
      <Footer />
    </div>
  );
}
