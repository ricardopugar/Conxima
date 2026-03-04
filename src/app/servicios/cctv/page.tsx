import { buildServicioMetadata, ServicioPageTemplate } from "../components/ServicioPageTemplate";

export const metadata = buildServicioMetadata("cctv");

export default function Page() {
  return <ServicioPageTemplate slug="cctv" />;
}
