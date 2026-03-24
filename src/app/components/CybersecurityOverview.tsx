"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import InteractiveCTA from "./InteractiveCTA";

const CYBERSECURITY_CAPABILITIES = [
  "Protección perimetral",
  "Acceso remoto seguro",
  "Visibilidad del tráfico",
  "Control de políticas"
];

const CYBERSECURITY_PILLARS = [
  {
    title: "Prevención",
    description:
      "Reducimos superficie de ataque con políticas, segmentación y tecnologías de control."
  },
  {
    title: "Detección",
    description:
      "Monitoreamos comportamientos, tráfico y eventos para identificar riesgos con mayor rapidez."
  },
  {
    title: "Continuidad",
    description:
      "Diseñamos soluciones que ayudan a sostener la operación y responder mejor ante incidentes."
  }
];

const CYBERSECURITY_PARTNERS = [
  {
    name: "Fortinet",
    href: "/ciberseguridad/fortinet",
    logo: "/images/fortinetlogo.png",
    description: "Firewall, VPN y seguridad perimetral para redes empresariales."
  }
] as const;

type CybersecurityPartner = (typeof CYBERSECURITY_PARTNERS)[number];

function PartnerMarqueeTile({ partner }: { partner: CybersecurityPartner }) {
  return (
    <Link
      href={partner.href}
      className="group flex h-24 min-w-[220px] items-center justify-center rounded-[1.4rem] border border-white/10 bg-black px-6 py-4 shadow-[0_16px_36px_rgba(0,0,0,0.24)] transition hover:border-white/20 hover:bg-black/95"
      aria-label={`Ver partner ${partner.name}`}
    >
      <Image
        src={partner.logo}
        alt={`Logo de ${partner.name}`}
        width={150}
        height={56}
        className="h-auto w-[140px] object-contain"
      />
    </Link>
  );
}

function PartnerMarqueeTrack({
  partners,
  reverse = false
}: {
  partners: readonly CybersecurityPartner[];
  reverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {partners.map((partner, index) => (
        <PartnerMarqueeTile
          key={`${partner.name}-${partner.href}-${index}`}
          partner={partner}
        />
      ))}
    </motion.div>
  );
}

function CybersecurityPartnersMarquee() {
  const row = Array.from({ length: 4 }, (_, index) => {
    return CYBERSECURITY_PARTNERS[index % CYBERSECURITY_PARTNERS.length];
  });

  return (
    <div className="mt-6">
      <div className="flex overflow-hidden">
        <PartnerMarqueeTrack partners={row} />
        <PartnerMarqueeTrack partners={row} />
        <PartnerMarqueeTrack partners={row} />
      </div>
      <div className="mt-4 flex overflow-hidden">
        <PartnerMarqueeTrack partners={row} reverse />
        <PartnerMarqueeTrack partners={row} reverse />
        <PartnerMarqueeTrack partners={row} reverse />
      </div>
    </div>
  );
}

export default function CybersecurityOverview() {
  return (
    <main>
      <section className="section relative overflow-hidden" data-tone="1">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/75">
                <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                Ciberseguridad CONXIMA
              </span>

              <h1 className="type-title mt-5 max-w-3xl text-3xl md:text-5xl">
                Protegemos redes, usuarios y datos con una estrategia pensada para la operación real de tu empresa.
              </h1>

              <p className="mt-4 max-w-3xl text-base text-slate-300 md:text-lg">
                La ciberseguridad es el conjunto de prácticas, políticas y
                tecnologías que ayudan a proteger redes, dispositivos,
                aplicaciones e información frente a accesos no autorizados,
                malware, fuga de datos e interrupciones operativas.
              </p>

              <p className="mt-4 max-w-3xl text-slate-300">
                En CONXIMA la abordamos como una capa crítica para empresas que
                dependen de internet, múltiples sedes, acceso remoto o
                infraestructura conectada. Evaluamos riesgos, ordenamos la
                arquitectura y desplegamos soluciones que mejoran visibilidad,
                control y continuidad.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {CYBERSECURITY_CAPABILITIES.map((item) => (
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
                  <Link href="/ciberseguridad/fortinet" className="btn-tech">
                    Ver solución Fortinet
                  </Link>
                </InteractiveCTA>
                <InteractiveCTA>
                  <a href="/#contacto" className="btn-outline-tech">
                    Hablar con un especialista
                  </a>
                </InteractiveCTA>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,14,29,0.96),rgba(13,24,43,0.92))] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                    Partners tecnológicos
                  </p>
                  <h2 className="type-subtitle mt-2 text-2xl text-white">
                    Soluciones respaldadas por fabricantes líderes
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-300">
                    Hoy trabajamos con Fortinet para fortalecer seguridad
                    perimetral, acceso remoto seguro y control del tráfico en
                    entornos empresariales.
                  </p>
                </div>

                <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] px-4 py-3 text-sm text-slate-100">
                  Partner actual:{" "}
                  <span className="font-semibold text-white">Fortinet</span>
                </div>
              </div>

              <CybersecurityPartnersMarquee />

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  "Evaluación de riesgos y necesidades reales",
                  "Diseño de arquitectura y políticas de seguridad",
                  "Implementación y acompañamiento local"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section relative" data-tone="2">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <article className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                Qué es ciberseguridad
              </p>
              <h2 className="type-subtitle mt-3 text-2xl text-white">
                Una capa estratégica para continuidad, control y confianza digital
              </h2>
              <div className="mt-5 space-y-4 text-slate-300">
                <p>
                  No se trata solo de bloquear amenazas. También implica definir
                  accesos, segmentar redes, proteger usuarios remotos, mantener
                  visibilidad del tráfico y reducir el impacto operativo ante un
                  incidente.
                </p>
                <p>
                  Para muchas empresas, la ciberseguridad empieza en la
                  protección perimetral y se extiende a la forma en que los
                  equipos, sedes y servicios se conectan entre sí.
                </p>
              </div>
            </article>

            <aside className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                Enfoque CONXIMA
              </p>
              <div className="mt-5 space-y-4">
                {CYBERSECURITY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <h3 className="type-subtitle text-lg text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
