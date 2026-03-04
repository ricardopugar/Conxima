import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("cuarto-de-monitoreo");

export default function Page() {
  return <ServicioPageTemplate slug="cuarto-de-monitoreo" />;
}
