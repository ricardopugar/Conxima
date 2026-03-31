import type { Metadata } from "next";
import ConximaLanding from "./components/ConximaLanding";
import { buildMetadata } from "@/lib/seo";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd
} from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "CONXIMA Ecuador: Seguridad y conectividad para empresas",
  description:
    "Soluciones integrales en telecomunicaciones, infraestructura de red, ciberseguridad y seguridad electrónica para empresas en Ecuador.",
  path: "/",
  keywords: [
    "seguridad y conectividad para empresas",
    "infraestructura de red en Ecuador",
    "ciberseguridad para empresas en Ecuador",
    "telecomunicaciones en Guayaquil",
    "CONXIMA Ecuador"
  ]
});

export default function Page() {
  const organizationJsonLd = serializeJsonLd(buildOrganizationJsonLd());
  const websiteJsonLd = serializeJsonLd(buildWebsiteJsonLd());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
      />
      <ConximaLanding />
    </>
  );
}
