export type Servicio = {
  slug: string;
  title: string;
  resumen: string;
  imagen?: string; // opcional para banners
};

export const servicios: Servicio[] = [
  {
    slug: "control-de-acceso",
    title: "Control de Acceso Biométrico",
    resumen:
      "Lectores de huella, reconocimiento facial, tarjetas inteligentes e integración con software de gestión.",
    imagen: "/images/servicios/control-acceso.jpg"
  },
  {
    slug: "sistemas-de-alarma",
    title: "Sistemas de Alarma",
    resumen:
      "Perímetro, intrusión, armado/desarmado remoto y monitoreo móvil.",
    imagen: "/images/servicios/alarma.jpg"
  },
  {
    slug: "cuarto-de-monitoreo",
    title: "Cuarto de Monitoreo",
    resumen:
      "Diseño técnico, NVR/VMS, switches y cableado; capacitación de operadores.",
    imagen: "/images/servicios/monitoreo.jpg"
  },
  {
    slug: "cableado-estructurado",
    title: "Cableado Estructurado",
    resumen:
      "Planos, canalización, racks, certificación y documentación.",
    imagen: "/images/servicios/cableado.jpg"
  },
  {
    slug: "racks-y-gabinetes",
    title: "Racks y Gabinetes",
    resumen:
      "Montaje seguro, ventilación, orden y crecimiento.",
    imagen: "/images/servicios/racks.jpg"
  },
  {
    slug: "servicios-en-la-nube",
    title: "Servicios en la Nube",
    resumen:
      "Instancias seguras, almacenamiento, backups y acceso remoto.",
    imagen: "/images/servicios/nube.jpg"
  }
];
