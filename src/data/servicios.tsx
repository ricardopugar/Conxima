export type Servicio = {
  slug: string;
  title: string;
  pageTitle?: string;
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
    title: "Cableado Estructurado",
    pageTitle: "Infraestructura de Red y Cableado Estructurado",
    resumen:
      "Base física de la red para datos, internet, cámaras, telefonía y crecimiento ordenado de tu operación.",
    imagen: "/images/servicios-landing/infraestructura de red y gabinetes .png",
    badges: ["UTP / FTP", "Patch panel", "Certificación"],
    detalle: {
      queHace:
        "Constituye el sistema físico que permite conectar y administrar redes de datos, internet, cámaras de seguridad, telefonía y otros sistemas tecnológicos.",
      descripcion: [
        "El cableado estructurado es la base de la red porque transmite información entre equipos mediante una instalación organizada, identificada y estandarizada.",
        "Cada punto se conecta a una infraestructura central de telecomunicaciones para facilitar mantenimiento, orden, crecimiento y mejor desempeño general de la red."
      ],
      incluye: [
        "Instalación de cableado estructurado de red (UTP / FTP según requerimiento)",
        "Puntos de red o salidas de datos",
        "Patch panel",
        "Patch cords",
        "Switch de red",
        "Canalización del cableado (tubería, canaletas o ductos)",
        "Etiquetado y organización del cableado",
        "Espacio para crecimiento de la red",
        "Certificación de red (si es requerido)",
        "Documentación de la red (si es requerido)"
      ],
      beneficios: [
        "Reduce fallas por instalaciones improvisadas.",
        "Facilita ampliaciones futuras sin rehacer la red.",
        "Mejora la estabilidad de datos, voz y videovigilancia."
      ],
      idealPara: [
        "Oficinas y edificios corporativos",
        "Comercios, hoteles y centros educativos",
        "Proyectos nuevos o ampliaciones tecnológicas"
      ]
    }
  },
  {
    slug: "racks-y-gabinetes",
    title: "Racks y Gabinetes",
    pageTitle: "Racks y Gabinetes de Comunicaciones",
    resumen:
      "Protege, organiza y prepara el punto central de telecomunicaciones para crecimiento, ventilación y mantenimiento seguro.",
    imagen: "/images/servicios-landing/infraestructura de red y gabinetes2 .png",
    badges: ["Organización", "Ventilación", "Seguridad física"],
    detalle: {
      queHace:
        "Centraliza y protege equipos de red, energía y comunicaciones dentro de un gabinete técnico ordenado, seguro y escalable.",
      descripcion: [
        "Los racks o gabinetes de telecomunicaciones permiten instalar, proteger y organizar switches, patch panels, servidores y grabadores de videovigilancia en un solo punto de control.",
        "Su uso facilita la gestión del cableado, la ventilación de los equipos, la seguridad física y el mantenimiento, además de permitir futuras ampliaciones de la infraestructura tecnológica."
      ],
      incluye: [
        "Rack o gabinete de telecomunicaciones",
        "Bandejas o repisas para equipos",
        "Organizadores de cable",
        "Sistema de ventilación para el rack",
        "Regletas o PDU de energía",
        "Sistema de seguridad para el gabinete",
        "Patch panel",
        "Patch cords",
        "Switch de red",
        "Etiquetado y organización del cableado",
        "Espacio para crecimiento de la red"
      ],
      beneficios: [
        "Extiende la vida útil de los equipos con mejor gestión térmica.",
        "Reduce tiempos de mantenimiento por orden y trazabilidad.",
        "Disminuye riesgos eléctricos y desconexiones accidentales."
      ],
      idealPara: [
        "Cuartos técnicos y centros de cableado",
        "Instalaciones con crecimiento de red planificado",
        "Operaciones que requieren orden físico y seguridad"
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
