export type Servicio = {
  slug: string;
  title: string;
  pageTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  resumen: string;
  imagen?: string;
  badges?: string[];
  detalle: {
    queHace: string;
    descripcion: string[];
    incluye: string[];
    beneficios: string[];
    idealPara: string[];
  };
};

export const servicios: Servicio[] = [
  {
    slug: "control-de-acceso",
    title: "Control de Acceso Biométrico",
    resumen:
      "Autoriza o restringe el ingreso con biometría, tarjetas o reconocimiento facial, integrando control físico y trazabilidad.",
    imagen: "/images/servicios-landing/control de acceso.png",
    badges: ["Biometría", "Trazabilidad", "Integración"],
    detalle: {
      queHace:
        "Autoriza o restringe el ingreso de personas a un lugar mediante características biométricas únicas, tarjetas o validación facial.",
      descripcion: [
        "Permite definir quién ingresa, a qué zonas, en qué horarios y con qué nivel de autorización, manteniendo trazabilidad completa de entradas y salidas.",
        "CONXIMA integra el lector, la cerradura, el software de administración y la puesta en marcha para que el sistema quede listo para operar desde el primer día."
      ],
      incluye: [
        "Equipo biométrico (lector)",
        "Controlador o sistema de control",
        "Software de administración",
        "Cerradura eléctrica",
        "Botón de salida",
        "Fuente de poder",
        "Sensores o accesorios",
        "Cableado e instalación"
      ],
      beneficios: [
        "Reduce ingresos no autorizados en zonas críticas.",
        "Genera registros confiables de entradas y salidas.",
        "Agiliza la gestión de personal, visitantes y horarios."
      ],
      idealPara: [
        "Oficinas administrativas y corporativas",
        "Plantas, bodegas y áreas restringidas",
        "Instalaciones con control de visitantes o turnos"
      ]
    }
  },
  {
    slug: "cctv",
    title: "Circuito Cerrado de Televisión (CCTV)",
    resumen:
      "Vigilancia, grabación y monitoreo en tiempo real con cámaras IP, NVR y acceso remoto para operación continua.",
    imagen: "/images/servicios/cctv.jpg",
    badges: ["Videovigilancia", "NVR", "Monitoreo remoto"],
    detalle: {
      queHace:
        "Permite vigilar, grabar y monitorear áreas en tiempo real mediante cámaras conectadas a un sistema de grabación y visualización.",
      descripcion: [
        "Es una solución utilizada en casas, empresas, urbanizaciones, bodegas y comercios para mejorar control operativo, prevención y evidencia ante incidentes.",
        "Cuando CONXIMA diseña e instala CCTV con cámaras IP, NVR y monitoreo remoto, entrega una plataforma lista para supervisión local o a distancia."
      ],
      incluye: [
        "Diseño del sistema de videovigilancia",
        "Cámaras de seguridad IP",
        "Grabador de video en red (NVR)",
        "Discos duros de videovigilancia",
        "Monitores de visualización",
        "Infraestructura de red",
        "Cableado estructurado",
        "Fuente de energía y respaldo",
        "Configuración del sistema",
        "Monitoreo remoto",
        "Capacitación al usuario"
      ],
      beneficios: [
        "Aumenta prevención y capacidad de respuesta ante incidentes.",
        "Genera evidencia visual para auditoría e investigación.",
        "Mejora supervisión de operaciones en tiempo real."
      ],
      idealPara: [
        "Empresas, bodegas y comercios",
        "Urbanizaciones, conjuntos y espacios comunes",
        "Procesos que requieren evidencia y monitoreo constante"
      ]
    }
  },
  {
    slug: "sistemas-de-alarma",
    title: "Sistemas de Alarma",
    resumen:
      "Detectan intrusiones, movimientos o situaciones de riesgo y activan alertas sonoras o notificaciones en tiempo real.",
    imagen: "/images/servicios/alarma.jpeg",
    badges: ["Intrusión", "Alertamiento", "Respuesta rápida"],
    detalle: {
      queHace:
        "Detecta intrusiones, movimientos o situaciones de riesgo y activa una alerta sonora o notificación para responder con rapidez.",
      descripcion: [
        "El sistema combina sensores, sirenas y comunicación remota para advertir incidentes en oficinas, comercios, bodegas o instalaciones residenciales.",
        "CONXIMA configura la lógica de armado, los tiempos de respuesta y la notificación al usuario para que la solución funcione de forma simple y confiable."
      ],
      incluye: [
        "Panel de control (central de alarma)",
        "Sensores o detectores",
        "Sirena",
        "Teclado o panel de armado",
        "Comunicador",
        "Fuente de poder y batería",
        "Controles remotos o tags",
        "Aplicación móvil"
      ],
      beneficios: [
        "Disuade intrusiones y mejora la capacidad de reacción.",
        "Centraliza alertas con operación remota desde app o panel.",
        "Protege la continuidad operativa fuera de horario."
      ],
      idealPara: [
        "Locales comerciales y oficinas",
        "Viviendas y urbanizaciones",
        "Bodegas, depósitos y áreas perimetrales"
      ]
    }
  },
  {
    slug: "cuarto-de-monitoreo",
    title: "Cuarto de Monitoreo",
    resumen:
      "Centro operativo para supervisión de cámaras, alarmas y otros sistemas de seguridad desde un único punto de control.",
    imagen: "/images/servicios-landing/cuarto monitoreo.png",
    badges: ["NVR / VMS", "Videowall", "Operación continua"],
    detalle: {
      queHace:
        "Crea un entorno técnico para la supervisión de cámaras, alarmas y otros sistemas de seguridad con visibilidad centralizada.",
      descripcion: [
        "El cuarto de monitoreo concentra la operación, la grabación, la red y la visualización para que el equipo tenga información clara y capacidad de respuesta en tiempo real.",
        "CONXIMA diseña la distribución técnica, integra la infraestructura y capacita a los operadores para que el sistema quede listo para uso continuo."
      ],
      incluye: [
        "Diseño técnico del cuarto de monitoreo",
        "Sistema de grabación (NVR o servidores)",
        "Software de gestión de video (VMS)",
        "Monitores o videowall",
        "Infraestructura de red",
        "Cableado estructurado",
        "Rack de comunicaciones",
        "Sistema eléctrico y respaldo",
        "Puestos de monitoreo",
        "Configuración del sistema",
        "Capacitación de operadores"
      ],
      beneficios: [
        "Centraliza la supervisión y mejora la toma de decisiones.",
        "Reduce puntos ciegos en la operación de seguridad.",
        "Ordena la infraestructura para crecer con menos fricción."
      ],
      idealPara: [
        "Empresas con operación 24/7",
        "Centros logísticos, industrias y campus",
        "Proyectos con múltiples cámaras o sedes"
      ]
    }
  },
  {
    slug: "cableado-estructurado",
    title: "Infraestructura de Red y Centro de Datos",
    pageTitle: "Infraestructura de Red y Centro de Datos",
    seoTitle: "Infraestructura de red y centro de datos en Ecuador | CONXIMA",
    seoDescription:
      "Infraestructura de red y centro de datos para empresas en Ecuador: conectividad, servidores, almacenamiento, energía, respaldo y gestión segura.",
    seoKeywords: [
      "infraestructura de red y centro de datos",
      "infraestructura de red en Guayaquil",
      "data center en Ecuador",
      "servidores y almacenamiento empresarial",
      "CONXIMA redes"
    ],
    resumen:
      "Conjunto integral de recursos físicos, tecnológicos y lógicos para conectar, procesar, almacenar, gestionar y proteger la información de una organización.",
    imagen: "/images/servicios-landing/infraestructura de red y gabinetes2 .png",
    badges: [
      "Redes y conectividad",
      "Servidores y almacenamiento",
      "Continuidad operativa"
    ],
    detalle: {
      queHace:
        "La infraestructura de red y centro de datos es el conjunto integral de recursos físicos, tecnológicos y lógicos que permiten la conectividad, procesamiento, almacenamiento, gestión y protección de la información dentro de una organización.",
      descripcion: [
        "Este ecosistema garantiza la comunicación eficiente entre dispositivos, así como la operación continua y segura de los sistemas críticos del negocio.",
        "En CONXIMA diseñamos, implementamos y administramos esta infraestructura con enfoque en rendimiento, continuidad, protección y crecimiento ordenado para empresas en Ecuador."
      ],
      incluye: [
        "Cableado estructurado (cobre y fibra óptica)",
        "Equipos de red (routers, switches, access points, firewalls)",
        "Puntos de red y conectividad inalámbrica",
        "Racks y gabinetes de comunicaciones y servidores",
        "Servidores físicos y virtuales",
        "Sistemas de almacenamiento (NAS, SAN)",
        "Sistemas de energía (UPS, reguladores, generadores)",
        "Climatización y control ambiental",
        "Sistemas de seguridad física y lógica (control de accesos, CCTV, ciberseguridad)",
        "Sistemas de respaldo y recuperación de información (backups)",
        "Monitoreo y gestión de la infraestructura",
        "Configuración y administración de la red"
      ],
      beneficios: [
        "Integra conectividad, procesamiento, almacenamiento y protección bajo una misma estrategia operativa.",
        "Mejora la continuidad del negocio con respaldo, monitoreo y administración centralizada.",
        "Reduce riesgos de indisponibilidad y facilita el crecimiento ordenado de la infraestructura."
      ],
      idealPara: [
        "Empresas con sistemas críticos, crecimiento tecnológico o múltiples áreas conectadas",
        "Organizaciones que requieren servidores, almacenamiento y respaldo centralizado",
        "Proyectos nuevos, ampliaciones o modernización de infraestructura tecnológica"
      ]
    }
  },
  {
    slug: "servicios-en-la-nube",
    title: "Servicios en la Nube",
    resumen:
      "Plataformas, almacenamiento y respaldo en internet sin depender de servidores físicos dentro de la empresa.",
    imagen: "/images/servicios/nube.jfif",
    badges: ["Cloud Services", "Backups", "Acceso remoto"],
    detalle: {
      queHace:
        "Permite almacenar información, ejecutar sistemas y acceder a plataformas desde internet sin necesidad de mantener servidores físicos en la empresa.",
      descripcion: [
        "Los servicios en la nube se usan con frecuencia para cámaras de seguridad, monitoreo remoto, respaldo de datos y sistemas empresariales que requieren disponibilidad continua.",
        "CONXIMA diseña la arquitectura inicial, configura seguridad y acceso remoto, y deja una base preparada para crecer con control operativo."
      ],
      incluye: [
        "Instancias o servidores virtuales",
        "Almacenamiento en la nube",
        "Backups o copias de seguridad",
        "Acceso remoto seguro",
        "Seguridad en la nube",
        "Escalabilidad",
        "Monitoreo y administración"
      ],
      beneficios: [
        "Reduce dependencia de infraestructura física local.",
        "Mejora continuidad operativa, respaldo y recuperación.",
        "Facilita acceso seguro para equipos distribuidos."
      ],
      idealPara: [
        "Empresas con trabajo remoto o múltiples sedes",
        "Plataformas que requieren respaldo continuo",
        "Soluciones de monitoreo y videovigilancia en línea"
      ]
    }
  },
  {
    slug: "cableado-fibra-optica",
    title: "Cableado de Fibra Óptica",
    resumen:
      "Enlaces de alta velocidad para backbone de red, interconexión entre sedes y proyectos de videovigilancia empresarial.",
    imagen: "/images/servicios-landing/cableado de fibra optica.jpg",
    badges: ["Backbone", "Alta velocidad", "Certificación"],
    detalle: {
      queHace:
        "Es una solución de alta velocidad para transmitir datos mediante señales de luz, utilizada principalmente como backbone de red.",
      descripcion: [
        "La fibra óptica es clave para empresas, centros de datos, urbanizaciones y sistemas de videovigilancia que requieren capacidad, estabilidad y menor pérdida de señal en largas distancias.",
        "CONXIMA diseña, instala, empalma y certifica los enlaces para dejar una infraestructura preparada para crecer en tráfico y desempeño."
      ],
      incluye: [
        "Diseño y planificación de la red",
        "Cable de fibra óptica",
        "Canalización y protección",
        "Empalmes de fibra óptica",
        "Cajas de empalme o distribución",
        "Conectores y adaptadores",
        "Patch cords de fibra",
        "Equipos de red para fibra",
        "Pruebas y certificación"
      ],
      beneficios: [
        "Aumenta velocidad y estabilidad en troncales de red.",
        "Reduce pérdida de señal en trayectos extensos.",
        "Prepara la infraestructura para crecimiento de tráfico."
      ],
      idealPara: [
        "Backbone entre pisos, edificios o sedes",
        "Centros de datos e industrias",
        "Urbanizaciones y proyectos de videovigilancia amplia"
      ]
    }
  },
];

function normalizeServicioSlug(slug: string): string {
  if (slug === "racks-y-gabinetes") {
    return "cableado-estructurado";
  }

  return slug;
}

export function getServicioBySlug(slug: string): Servicio | undefined {
  const normalizedSlug = normalizeServicioSlug(slug);
  return servicios.find((servicio) => servicio.slug === normalizedSlug);
}

export function getServicioNavigation(slug: string): {
  previous?: Servicio;
  next?: Servicio;
} {
  const normalizedSlug = normalizeServicioSlug(slug);
  const index = servicios.findIndex(
    (servicio) => servicio.slug === normalizedSlug
  );

  if (index === -1) {
    return {};
  }

  return {
    previous: index > 0 ? servicios[index - 1] : undefined,
    next: index < servicios.length - 1 ? servicios[index + 1] : undefined
  };
}
