import Image from "next/image";

import InteractiveCTA from "./InteractiveCTA";

const FORTIGATE_WA_URL =
  "https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20conocer%20como%20FortiGate%20puede%20proteger%20la%20red%20de%20mi%20empresa.";

const FORTIGATE_CAPABILITIES = [
  "NGFW + IPS",
  "VPN segura",
  "Filtrado web",
  "Control de aplicaciones",
  "FortiGuard",
  "Monitoreo y reportes"
];

const FORTIGATE_INCLUDED = [
  "Hardware del firewall",
  "Sistema operativo FortiOS",
  "Firewall de nueva generación (NGFW)",
  "Sistema de prevención de intrusiones (IPS)",
  "Antivirus de red",
  "Filtrado web",
  "Control de aplicaciones",
  "VPN (Red Privada Virtual)",
  "Protección contra amenazas avanzadas",
  "Monitoreo y reportes",
  "Licencias de seguridad (FortiGuard)"
];

const FORTIGATE_BENEFITS = [
  "Visibilidad completa de lo que sucede en la red y en el tráfico de internet.",
  "Menor exposición a amenazas, accesos no autorizados y brechas de seguridad.",
  "Políticas centralizadas para usuarios, sedes, servicios y aplicaciones.",
  "Acceso remoto seguro para colaboradores y operaciones distribuidas.",
  "Acompañamiento local de CONXIMA en diseño, implementación y soporte."
];

const FORTIGATE_SCENARIOS = [
  {
    title: "Protección perimetral",
    desc: "Controla el tráfico entrante y saliente con inspección profunda y políticas de seguridad activas."
  },
  {
    title: "Sedes conectadas",
    desc: "Integra sucursales, oficinas o plantas con VPN segura y administración más ordenada."
  },
  {
    title: "Usuarios remotos",
    desc: "Habilita acceso confiable para colaboradores, proveedores o personal que opera fuera de la oficina."
  }
];

export default function FortinetSection() {
  return (
    <section id="fortinet" className="section relative overflow-hidden" data-tone="2">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,14,29,0.98),rgba(16,26,46,0.92))] shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,87,47,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(17,124,184,0.18),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />

          <div className="relative grid grid-cols-1 gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1fr,1fr] lg:items-stretch lg:px-12 lg:py-12">
            <div className="flex h-full flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/75">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                  Ciberseguridad • Partner Fortinet
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/70 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                  Especialistas en seguridad IT certificados
                </span>
              </div>

              <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
                <div>
                  <h1 className="type-title max-w-3xl text-3xl md:text-5xl">
                    FortiGate con CONXIMA para proteger la red, los usuarios y la información crítica de tu organización.
                  </h1>

                  <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
                    FortiGate es un firewall de nueva generación desarrollado
                    por Fortinet para proteger redes empresariales, controlar el
                    tráfico de internet y detectar amenazas cibernéticas. En
                    CONXIMA te acompañamos desde la evaluación inicial hasta la
                    implementación y el soporte de la plataforma.
                  </p>
                </div>

                <div className="justify-self-center lg:justify-self-end">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
                    <Image
                      src="/images/fortinetlogo.png"
                      alt="Logo de Fortinet"
                      width={180}
                      height={180}
                      className="h-auto w-[140px] object-contain md:w-[180px]"
                      sizes="(min-width: 768px) 180px, 140px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {FORTIGATE_CAPABILITIES.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-100 backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <InteractiveCTA>
                  <a href="/#navbcontacto" className="btn-tech">
                    Quiero proteger mi empresa
                  </a>
                </InteractiveCTA>
                <InteractiveCTA>
                  <a
                    href={FORTIGATE_WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline-tech"
                  >
                    Solicitar asesoría FortiGate
                  </a>
                </InteractiveCTA>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                    Cobertura
                  </p>
                  <p className="mt-2 text-sm text-white">
                    Firewall, VPN, filtrado, inspección y políticas de acceso.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                    Implementación
                  </p>
                  <p className="mt-2 text-sm text-white">
                    Diseño, configuración, pruebas y puesta en marcha asistida.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                    Soporte
                  </p>
                  <p className="mt-2 text-sm text-white">
                    Acompañamiento local para operación, ajuste y crecimiento.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 p-3 shadow-[0_20px_48px_rgba(0,0,0,0.35)]">
              <div className="relative min-h-[460px] h-full overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/images/fortigate.jpg"
                  alt="Implementación FortiGate con CONXIMA"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                        Solución destacada
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        FortiGate NGFW
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                    Especialistas en seguridad IT certificados
                  </div>
                </div>

                <div className="absolute inset-x-4 bottom-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {FORTIGATE_SCENARIOS.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md"
                    >
                      <p className="text-sm font-semibold text-white">
                        {card.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-200">
                        {card.desc}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:p-8">
            <h2 className="type-subtitle text-2xl">
              Qué integra una solución FortiGate
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              El alcance puede variar según el tamaño de la empresa y el nivel
              de protección requerido, pero normalmente incluye estos componentes
              clave:
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {FORTIGATE_INCLUDED.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:p-8">
            <h2 className="type-subtitle text-2xl">
              Lo que gana tu empresa con CONXIMA
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              {FORTIGATE_BENEFITS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-secondary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[1.5rem] border border-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/65">
                Acompañamiento CONXIMA
              </p>
              <p className="mt-3 text-sm text-slate-200">
                Podemos ayudarte a evaluar el estado actual de tu seguridad
                perimetral, diseñar la arquitectura recomendada e implementar la
                solución con criterios de operación reales.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                Siguiente paso
              </p>
              <h2 className="type-subtitle mt-3 text-2xl">
                Evaluemos cómo FortiGate encaja en tu operación actual.
              </h2>
              <p className="mt-3 text-slate-300">
                Si ya tienes firewall, múltiples sedes, acceso remoto o
                necesidades de segmentación, podemos ayudarte a definir el
                alcance ideal y la ruta de implementación.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <InteractiveCTA>
                <a href="/#contacto" className="btn-tech">
                  Hablar con un especialista
                </a>
              </InteractiveCTA>
              <InteractiveCTA>
                <a
                  href={FORTIGATE_WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-tech"
                >
                  Escribir por WhatsApp
                </a>
              </InteractiveCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
