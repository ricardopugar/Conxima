import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("cableado-fibra-optica");

export default function Page() {
  return <ServicioPageTemplate slug="cableado-fibra-optica" />;
}
