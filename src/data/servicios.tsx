export type Servicio = {
  slug: string;
  title: string;
  resumen: string;
  imagen?: string;
  detalle: {
    queHace: string;
    alcance: string[];
    beneficios: string[];
  };
};

export const servicios: Servicio[] = [
  {
    slug: "control-de-acceso",
    title: "Control de Acceso Biometrico",
    resumen:
      "Lectores de huella, reconocimiento facial, tarjetas inteligentes e integracion con software de gestion.",
    imagen: "/images/servicios/acceso.jpeg",
    detalle: {
      queHace:
        "Este servicio administra quien entra, cuando entra y a que zonas puede acceder cada persona dentro de tus instalaciones.",
      alcance: [
        "Levantamiento de puertas, horarios y niveles de acceso por area.",
        "Instalacion de lectores biometricos, tarjetas o doble factor.",
        "Configuracion de perfiles, reglas de acceso y reportes de auditoria.",
        "Integracion con software de asistencia o gestion de personal."
      ],
      beneficios: [
        "Reduce accesos no autorizados en zonas criticas.",
        "Deja trazabilidad completa de ingresos y salidas.",
        "Agiliza el control operativo en sedes y turnos."
      ]
    }
  },
  {
    slug: "sistemas-de-alarma",
    title: "Sistemas de Alarma",
    resumen:
      "Perimetro, intrusion, armado/desarmado remoto y monitoreo movil.",
    imagen: "/images/servicios/alarma.jpeg",
    detalle: {
      queHace:
        "Este servicio detecta eventos de riesgo en tiempo real y activa alertas para respuesta rapida del equipo responsable.",
      alcance: [
        "Diseno de zonas de deteccion perimetral e interior.",
        "Instalacion de sensores de movimiento, apertura y sirenas.",
        "Configuracion de armado por horarios y control remoto.",
        "Enlace de alertas a app movil y protocolos de atencion."
      ],
      beneficios: [
        "Disuade intentos de intrusion y reduce tiempos de reaccion.",
        "Permite operar con alertas centralizadas y trazables.",
        "Mejora la continuidad operativa fuera de horario."
      ]
    }
  },
  {
    slug: "cuarto-de-monitoreo",
    title: "Cuarto de Monitoreo",
    resumen:
      "Diseno tecnico, NVR/VMS, switches y cableado; capacitacion de operadores.",
    imagen: "/images/servicios/monitoreo.jfif",
    detalle: {
      queHace:
        "Este servicio crea un centro operativo para supervision continua de camaras, alarmas y eventos de seguridad.",
      alcance: [
        "Diseno del layout de puestos, videowall y energia respaldada.",
        "Implementacion de NVR/VMS, red dedicada y almacenamiento.",
        "Configuracion de vistas, roles de operador y bitacoras.",
        "Capacitacion en protocolos de escalamiento y reporte."
      ],
      beneficios: [
        "Centraliza la vigilancia y mejora la toma de decisiones.",
        "Reduce puntos ciegos en supervision y gestion de incidentes.",
        "Estandariza la operacion con procesos claros."
      ]
    }
  },
  {
    slug: "cableado-estructurado",
    title: "Cableado Estructurado",
    resumen:
      "Planos, canalizacion, racks, certificacion y documentacion.",
    imagen: "/images/servicios/cableado.jpg",
    detalle: {
      queHace:
        "Este servicio organiza la infraestructura fisica de datos y voz para que la red sea estable, escalable y facil de mantener.",
      alcance: [
        "Levantamiento de puntos de red, rutas y cuartos tecnicos.",
        "Tendido de cableado UTP/fibra con canalizacion adecuada.",
        "Ponchado, etiquetado y ordenamiento en patch panels.",
        "Certificacion de enlaces y entrega de planos as-built."
      ],
      beneficios: [
        "Disminuye fallas por instalaciones improvisadas.",
        "Facilita ampliaciones futuras sin rehacer la red.",
        "Mejora el rendimiento general de conectividad."
      ]
    }
  },
  {
    slug: "racks-y-gabinetes",
    title: "Racks y Gabinetes",
    resumen:
      "Montaje seguro, ventilacion, orden y crecimiento.",
    imagen: "/images/servicios/racks-gabinetes.jfif",
    detalle: {
      queHace:
        "Este servicio implementa gabinetes tecnicos ordenados y protegidos para alojar equipos de red, energia y comunicaciones.",
      alcance: [
        "Seleccion del tipo de rack segun carga, espacio y ambiente.",
        "Montaje de organizadores, PDU y sistema de ventilacion.",
        "Ordenamiento de patch cords y etiquetado por servicio.",
        "Plan de crecimiento para nuevos equipos y enlaces."
      ],
      beneficios: [
        "Extiende la vida util de equipos por mejor gestion termica.",
        "Reduce tiempos de mantenimiento por orden y trazabilidad.",
        "Minimiza riesgos electricos y de desconexion accidental."
      ]
    }
  },
  {
    slug: "servicios-en-la-nube",
    title: "Servicios en la Nube",
    resumen:
      "Instancias seguras, almacenamiento, backups y acceso remoto.",
    imagen: "/images/servicios/nube.jfif",
    detalle: {
      queHace:
        "Este servicio migra o implementa cargas en la nube para mejorar disponibilidad, escalabilidad y continuidad del negocio.",
      alcance: [
        "Evaluacion de cargas para migracion o despliegue desde cero.",
        "Configuracion de redes, identidades, permisos y cifrado.",
        "Implementacion de backups, monitoreo y alertamiento.",
        "Optimizacion inicial de costos y politicas de uso."
      ],
      beneficios: [
        "Permite crecer recursos sin grandes inversiones iniciales.",
        "Mejora la recuperacion ante incidentes o caidas.",
        "Facilita acceso remoto seguro para equipos de trabajo."
      ]
    }
  },
  {
    slug: "cableado-fibra-optica",
    title: "Cableado de Fibra Optica",
    resumen:
      "Instalacion profesional de fibra optica monomodo y multimodo para backbone y redes empresariales.",
    imagen: "/images/servicios/fibra-optica.jpg",
    detalle: {
      queHace:
        "Este servicio construye enlaces de alta capacidad y baja latencia entre edificios, pisos o nodos criticos de la red.",
      alcance: [
        "Diseno de rutas de fibra segun distancia y capacidad requerida.",
        "Tendido, fusion y proteccion de hilos en bandejas y ductos.",
        "Medicion con OTDR y certificacion de calidad del enlace.",
        "Documentacion de empalmes, cajas y puntos terminales."
      ],
      beneficios: [
        "Aumenta velocidad y estabilidad en troncales de red.",
        "Reduce perdida de senal en trayectos largos.",
        "Prepara la infraestructura para crecimiento de trafico."
      ]
    }
  },
  {
    slug: "cctv",
    title: "Circuito Cerrado de Television (CCTV)",
    resumen:
      "Diseno e instalacion de sistemas de videovigilancia con camaras IP, NVR y monitoreo remoto.",
    imagen: "/images/servicios/cctv.jpg",
    detalle: {
      queHace:
        "Este servicio instala un sistema de videovigilancia para observacion continua, grabacion de evidencia y control operativo.",
      alcance: [
        "Analisis de puntos criticos y cobertura por camara.",
        "Instalacion de camaras, NVR/VMS y almacenamiento.",
        "Configuracion de grabacion, acceso remoto y alertas.",
        "Puesta en marcha con pruebas de vision diurna/nocturna."
      ],
      beneficios: [
        "Aumenta capacidad de prevencion y respuesta ante incidentes.",
        "Genera evidencia visual para auditoria e investigacion.",
        "Mejora la supervision de operaciones en tiempo real."
      ]
    }
  }
];

export function getServicioBySlug(slug: string): Servicio | undefined {
  return servicios.find((servicio) => servicio.slug === slug);
}

export function getServicioNavigation(slug: string): {
  previous?: Servicio;
  next?: Servicio;
} {
  const index = servicios.findIndex((servicio) => servicio.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previous: index > 0 ? servicios[index - 1] : undefined,
    next: index < servicios.length - 1 ? servicios[index + 1] : undefined
  };
}
