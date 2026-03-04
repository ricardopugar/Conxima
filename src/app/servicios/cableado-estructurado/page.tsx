import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("cableado-estructurado");

export default function Page() {
  return <ServicioPageTemplate slug="cableado-estructurado" />;
}
