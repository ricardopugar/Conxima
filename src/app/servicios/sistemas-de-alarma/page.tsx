import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("sistemas-de-alarma");

export default function Page() {
  return <ServicioPageTemplate slug="sistemas-de-alarma" />;
}
