import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("control-de-acceso");

export default function Page() {
  return <ServicioPageTemplate slug="control-de-acceso" />;
}
