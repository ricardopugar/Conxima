import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("racks-y-gabinetes");

export default function Page() {
  return <ServicioPageTemplate slug="racks-y-gabinetes" />;
}
