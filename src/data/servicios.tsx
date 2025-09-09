export type Servicio = {
  slug: string;
  title: string;
  resumen: string;
  bullets: string[];
  cover?: string;
};

export const servicios: Servicio[] = [
  {
    slug: "control-de-acceso",
    title: "Control de Acceso Biométrico",
    resumen:
      "Lectores de huella, reconocimiento facial, tarjetas inteligentes e integración con software de gestión.",
    bullets: [
      "Turnstiles, cerraduras magnéticas y control de puertas",
      "Reportes, horarios y auditoría de eventos",
      "Integración con CCTV y alarmas",
    ],
    cover: "/images/servicios/acceso.jpg",
  },
  {
    slug: "sistemas-de-alarma",
    title: "Sistemas de Alarma",
    resumen:
      "Detectores, sensores perimetrales, armado/desarmado remoto y monitoreo móvil.",
    bullets: [
      "Sensores perimetrales, PIR, magnéticos",
      "Automatizaciones y escenas",
      "Integración con central de monitoreo",
    ],
    cover: "/images/servicios/alarma.jpg",
  },
  {
    slug: "cuarto-de-monitoreo",
    title: "Cuarto de Monitoreo",
    resumen:
      "Diseño técnico, NVR/VMS, organización de switches y cableado, capacitación de operadores.",
    bullets: ["Layout y ergonomía", "Hardening y segmentación de red", "Playbooks operativos"],
    cover: "/images/servicios/monitoreo.jpg",
  },
  {
    slug: "cableado-estructurado",
    title: "Cableado Estructurado",
    resumen:
      "Planos, canalización, racks y patch panels, certificación y documentación.",
    bullets: ["Certificación de enlaces", "Etiquetado y documentación", "Racks y patch panels"],
    cover: "/images/servicios/cableado.jpg",
  },
  {
    slug: "racks-y-gabinetes",
    title: "Racks y Gabinetes",
    resumen: "Montaje seguro, ventilación, orden y espacio para crecimiento.",
    bullets: ["Gestión térmica", "Organización y seguridad", "Espacio para expansión"],
    cover: "/images/servicios/racks.jpg",
  },
  {
    slug: "servicios-en-la-nube",
    title: "Servicios en la Nube",
    resumen:
      "Instancias seguras, almacenamiento, backups y acceso remoto con buenas prácticas.",
    bullets: ["Backups y restauración", "Acceso remoto seguro", "Escalabilidad"],
    cover: "/images/servicios/nube.jpg",
  },
];
