"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

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
      "Diseñamos soluciones que ayudan a sostener la operacion y responder mejor ante incidentes."
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

const CYBERSECURITY_SOLUTIONS = [
  {
    title: "Seguridad de redes y perímetros",
    description:
      "Fortalecemos el borde de la red con políticas, filtrado, VPN, segmentación y control de tráfico para reducir exposición y mejorar visibilidad.",
    href: "/ciberseguridad/fortinet",
    cta: "Ver Fortinet"
  },
  {
    title: "Protección de datos y usuarios",
    description:
      "Diseñamos controles para accesos, usuarios remotos, navegación, aplicaciones y segmentación interna según el riesgo real de cada operación.",
    href: "/#contacto",
    cta: "Solicitar asesoría"
  },
  {
    title: "Detección y respuesta a incidentes",
    description:
      "Planteamos arquitecturas con monitoreo, alertamiento y acompañamiento técnico para actuar con mayor rapidez ante eventos y cambios operativos.",
    href: "/servicios/cableado-estructurado",
    cta: "Ver infraestructura"
  }
];

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;

type CybersecurityPartner = (typeof CYBERSECURITY_PARTNERS)[number];

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

type BeamType = {
  top: number;
  left: number;
  transition?: Transition;
};

type HeroActionProps = {
  children: ReactNode;
  href: string;
  className: string;
  external?: boolean;
};

function HeroAction({
  children,
  href,
  className,
  external = false
}: HeroActionProps) {
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function GlowingChip({ children }: { children: string }) {
  return (
    <span className="font-heading relative z-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
      {children}
      <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-white/0 via-cyan-300/70 to-white/0" />
    </span>
  );
}

function SplashButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <HeroAction
      href={href}
      className="font-heading inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-sky-400 to-blue-700 px-5 py-3 text-sm text-zinc-50 ring-2 ring-blue-500/40 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] sm:w-auto"
    >
      {children}
    </HeroAction>
  );
}

function GhostButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <HeroAction
      href={href}
      className="font-heading inline-flex w-full items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98] sm:w-auto"
    >
      {children}
    </HeroAction>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

function Beam({ top, left, transition = {} }: BeamType) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ opacity: [0, 1, 0], y: GRID_BOX_SIZE * 8 }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition
      }}
      style={{ top, left }}
      className="absolute z-10 h-16 w-px bg-gradient-to-b from-blue-500/0 to-blue-400"
    />
  );
}

function Beams() {
  const { width } = useWindowSize();
  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: { duration: 3.5, repeatDelay: 5, delay: 2 }
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: { duration: 3.5, repeatDelay: 10, delay: 4 }
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: { duration: 2, repeatDelay: 7.5, delay: 3.5 }
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: { duration: 3, repeatDelay: 2, delay: 1 }
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: { duration: 5, repeatDelay: 5, delay: 5 }
    }
  ];

  return (
    <>
      {placements.map((placement, index) => (
        <Beam
          key={`${placement.top}-${placement.left}-${index}`}
          top={placement.top}
          left={placement.left - BEAM_WIDTH_OFFSET}
          transition={placement.transition}
        />
      ))}
    </>
  );
}

function GradientGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      className="absolute inset-0 z-0"
    >
      <div
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='1.5' stroke='rgb(30 58 138 / 0.34)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")"
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,124,198,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-zinc-950/40 to-zinc-950" />
    </motion.div>
  );
}

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

function CybersecurityHero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(0,124,198,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_28%)]" />
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center md:px-8 md:py-32">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="relative"
        >
          <GlowingChip>Ciberseguridad para operaciones reales</GlowingChip>
        </motion.div>

        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeInOut" }}
          className="type-title mt-6 max-w-4xl text-balance text-[2rem] leading-tight text-zinc-50 sm:text-[2.35rem] md:text-[2.9rem] lg:text-[4rem]"
        >
          Protegemos redes, usuarios y datos con una estrategia de
          ciberseguridad para empresas en Ecuador.
        </motion.h1>

        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          En CONXIMA combinamos evaluación, arquitectura, tecnología y
          acompañamiento local para fortalecer seguridad perimetral, acceso
          remoto, visibilidad del tráfico y control operativo en empresas de
          Guayaquil y Ecuador.
        </motion.p>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: "easeInOut" }}
          className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <InteractiveCTA>
            <SplashButton href="/ciberseguridad/fortinet">
              Ver solución Fortinet
              <FiArrowRight />
            </SplashButton>
          </InteractiveCTA>
          <InteractiveCTA>
            <GhostButton href="/#contacto">Hablar con un especialista</GhostButton>
          </InteractiveCTA>
        </motion.div>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: "easeInOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {CYBERSECURITY_CAPABILITIES.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-100 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.75, ease: "easeInOut" }}
          className="mt-12 w-full max-w-5xl rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 text-left shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur md:p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                Partners tecnológicos
              </p>
              <h2 className="type-title mt-2 text-2xl text-white md:text-3xl">
                Soluciones respaldadas por fabricantes líderes
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">
                Hoy trabajamos con Fortinet para fortalecer seguridad
                perimetral, acceso remoto seguro y control del tráfico en
                entornos empresariales en Ecuador.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-slate-100">
              Partner actual: <span className="font-heading text-white">Fortinet</span>
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
        </motion.div>
      </div>

      <Beams />
      <GradientGrid />
    </section>
  );
}

export default function CybersecurityOverview() {
  return (
    <main>
      <CybersecurityHero />

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
                <p>
                  Si tu operación depende de una base física sólida, también
                  puedes revisar nuestra{" "}
                  <Link
                    href="/servicios/cableado-estructurado"
                    className="text-[var(--color-secondary)] hover:underline"
                  >
                    solución de infraestructura de red y cableado estructurado
                  </Link>
                  .
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

      <section className="section relative" data-tone="1">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.16em] text-white/60">
              Nuestras soluciones
            </p>
            <h2 className="type-title mt-3 text-2xl md:text-4xl">
              Ciberseguridad aplicada a redes, usuarios y continuidad operativa
            </h2>
            <p className="mt-3 text-slate-300">
              Traducimos la estrategia de ciberseguridad en capas concretas que
              acompañan a la operación: perímetro, accesos, visibilidad y
              capacidad de respuesta según el contexto real de cada empresa.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CYBERSECURITY_SOLUTIONS.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-[var(--color-card)]/80 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <h3 className="type-subtitle text-xl text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex text-sm font-semibold text-[var(--color-secondary)] hover:underline"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
