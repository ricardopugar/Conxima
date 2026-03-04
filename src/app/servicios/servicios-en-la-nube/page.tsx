import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("servicios-en-la-nube");

export default function Page() {
  return <ServicioPageTemplate slug="servicios-en-la-nube" />;
}
