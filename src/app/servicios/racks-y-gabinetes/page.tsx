import type { Metadata } from "next";
import {
  buildServicioMetadata,
  ServicioPageTemplate
} from "../components/ServicioPageTemplate";

export const metadata: Metadata = {
  ...buildServicioMetadata("cableado-estructurado"),
  robots: {
    index: false,
    follow: true
  }
};

export default function Page() {
  return <ServicioPageTemplate slug="cableado-estructurado" />;
}
