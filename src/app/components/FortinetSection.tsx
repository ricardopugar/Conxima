"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import InteractiveCTA from "./InteractiveCTA";

const FORTIGATE_WA_URL =
  "https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20conocer%20cómo%20FortiGate%20puede%20proteger%20la%20red%20de%20mi%20empresa.";

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
  },
  {
    title: "Sedes conectadas",
    
  },
  {
    title: "Usuarios remotos",
    
  }
];

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;

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

function GhostButton({
  children,
  href,
  external = false
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
}) {
  return (
    <HeroAction
      href={href}
      external={external}
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

function FortinetHero() {
  return (
    <section id="fortinet" className="relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(0,124,198,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_28%)]" />
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="relative"
        >
          <GlowingChip>Ciberseguridad • Partner Fortinet</GlowingChip>
        </motion.div>

        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeInOut" }}
          className="type-title mt-6 max-w-4xl text-balance text-[2rem] leading-tight text-zinc-50 sm:text-[2.35rem] md:text-[2.9rem] lg:text-[4rem]"
        >
          FortiGate con CONXIMA para proteger la red, los usuarios y la
          información crítica de tu empresa en Ecuador.
        </motion.h1>

        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          FortiGate es un firewall de nueva generación desarrollado por
          Fortinet para proteger redes empresariales, controlar el tráfico de
          internet y detectar amenazas cibernéticas. En CONXIMA acompañamos a
          empresas de Guayaquil y Ecuador desde la evaluación inicial hasta la
          implementación y el soporte de la plataforma.
        </motion.p>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: "easeInOut" }}
          className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <InteractiveCTA>
            <SplashButton href="/#contacto">
              Quiero proteger mi empresa
              <FiArrowRight />
            </SplashButton>
          </InteractiveCTA>
          <InteractiveCTA>
            <GhostButton href={FORTIGATE_WA_URL} external>
              Solicitar asesoría FortiGate
            </GhostButton>
          </InteractiveCTA>
        </motion.div>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: "easeInOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {FORTIGATE_CAPABILITIES.map((item) => (
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
          className="mt-12 w-full max-w-6xl rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 text-left shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur sm:p-5 md:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[1.12fr,0.88fr]">
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30 p-3">
              <div className="relative min-h-[18rem] overflow-hidden rounded-[1.1rem] sm:min-h-[22rem]">
                <Image
                  src="/images/fortigate.jpg"
                  alt="Implementación FortiGate con CONXIMA"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex flex-col gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                      Solución destacada
                    </p>
                    <p className="font-heading mt-1 text-lg text-white">
                      FortiGate NGFW
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                    Especialistas en seguridad IT certificados
                  </div>
                </div>

                <div className="absolute inset-x-4 bottom-4 hidden gap-3 sm:grid sm:grid-cols-3">
                  {FORTIGATE_SCENARIOS.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md"
                    >
                      <p className="type-subtitle text-sm text-white">
                        {card.title}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:hidden">
                {FORTIGATE_SCENARIOS.map((card) => (
                  <article
                    key={`${card.title}-mobile`}
                    className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md"
                  >
                    <p className="type-subtitle text-sm text-white">
                      {card.title}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between lg:flex-col">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                    Cobertura de la solución
                  </p>
                  <h2 className="type-title mt-2 text-2xl text-white md:text-3xl">
                    Protección, control y soporte sobre una misma arquitectura
                  </h2>
                  <p className="mt-3 text-sm text-slate-300">
                    Diseñamos, configuramos y acompañamos la solución para que
                    FortiGate responda a escenarios reales de operación,
                    crecimiento y seguridad empresarial.
                  </p>
                </div>

                <div className="w-full rounded-[1.35rem] border border-white/10 bg-black/50 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:w-auto">
                  <Image
                    src="/images/fortinetlogo.png"
                    alt="Logo de Fortinet"
                    width={180}
                    height={180}
                    className="h-auto w-[140px] object-contain md:w-[160px]"
                    sizes="(min-width: 768px) 160px, 140px"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  {
                    label: "Cobertura",
                    text: "Firewall, VPN, filtrado, inspección y políticas de acceso."
                  },
                  {
                    label: "Implementación",
                    text: "Diseño, configuración, pruebas y puesta en marcha asistida."
                  },
                  {
                    label: "Soporte",
                    text: "Acompañamiento local para operación, ajuste y crecimiento."
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm text-white">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Beams />
      <GradientGrid />
    </section>
  );
}

export default function FortinetSection() {
  return (
    <>
      <FortinetHero />

      <section
        id="fortinet-detalle"
        className="section relative overflow-hidden"
        data-tone="2"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:p-8">
              <h2 className="type-subtitle text-2xl">
                Qué integra una solución FortiGate
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                El alcance puede variar según el tamaño de la empresa y el nivel
                de protección requerido, pero normalmente incluye estos
                componentes clave:
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
                  perimetral, diseñar la arquitectura recomendada e implementar
                  la solución con criterios de operación reales.
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  También puedes revisar nuestra{" "}
                  <Link
                    href="/ciberseguridad"
                    className="text-[var(--color-secondary)] hover:underline"
                  >
                    página de ciberseguridad
                  </Link>{" "}
                  o la{" "}
                  <Link
                    href="/servicios/cableado-estructurado"
                    className="text-[var(--color-secondary)] hover:underline"
                  >
                    solución de infraestructura de red
                  </Link>{" "}
                  para complementar esta implementación.
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

              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-wrap">
                <InteractiveCTA>
                  <a href="/#contacto" className="btn-tech block w-full text-center md:w-auto">
                    Hablar con un especialista
                  </a>
                </InteractiveCTA>
                <InteractiveCTA>
                  <a
                    href={FORTIGATE_WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline-tech block w-full text-center md:w-auto"
                  >
                    Escribir por WhatsApp
                  </a>
                </InteractiveCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
