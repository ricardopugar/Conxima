// src/app/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

type FlyoutItem = {
  href: string;
  title: string;
  description?: string;
};

type ServiceGroup = {
  title: string;
  items: FlyoutItem[];
};

const SERVICE_FLYOUT_ITEMS: FlyoutItem[] = [
  {
    href: "/servicios/control-de-acceso",
    title: "Control de Acceso Biometrico",
    description: "Gestion de ingreso por huella, tarjeta o rostro."
  },
  {
    href: "/servicios/sistemas-de-alarma",
    title: "Sistemas de Alarma",
    description: "Alertas de intrusion con monitoreo en tiempo real."
  },
  {
    href: "/servicios/cuarto-de-monitoreo",
    title: "Cuarto de Monitoreo",
    description: "Centro operativo para vigilancia y respuesta."
  },
  {
    href: "/servicios/cableado-estructurado",
    title: "Cableado Estructurado",
    description: "Infraestructura ordenada para datos y voz."
  },
  {
    href: "/servicios/racks-y-gabinetes",
    title: "Racks y Gabinetes",
    description: "Orden, proteccion y crecimiento de equipos."
  },
  {
    href: "/servicios/servicios-en-la-nube",
    title: "Servicios en la Nube",
    description: "Implementacion segura de cargas cloud."
  },
  {
    href: "/servicios/cableado-fibra-optica",
    title: "Cableado de Fibra Optica",
    description: "Backbone de alta capacidad para tu red."
  },
  {
    href: "/servicios/cctv",
    title: "CCTV",
    description: "Videovigilancia con grabacion y acceso remoto."
  }
];

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Seguridad",
    items: [
      { href: "/servicios/control-de-acceso", title: "Control de Acceso" },
      { href: "/servicios/sistemas-de-alarma", title: "Sistemas de Alarma" },
      { href: "/servicios/cctv", title: "CCTV" }
    ]
  },
  {
    title: "Infraestructura",
    items: [
      { href: "/servicios/cuarto-de-monitoreo", title: "Cuarto de Monitoreo" },
      {
        href: "/servicios/cableado-estructurado",
        title: "Cableado Estructurado"
      },
      { href: "/servicios/racks-y-gabinetes", title: "Racks y Gabinetes" }
    ]
  },
  {
    title: "Conectividad",
    items: [
      {
        href: "/servicios/cableado-fibra-optica",
        title: "Fibra Optica"
      },
      { href: "/servicios/servicios-en-la-nube", title: "Servicios en la Nube" }
    ]
  }
];

const CYBER_FLYOUT_ITEMS: FlyoutItem[] = [
  {
    href: "/ciberseguridad/fortinet",
    title: "Fortinet",
    description: "Firewalls, SD-WAN y seguridad perimetral."
  }
];

export default function Navbar() {
  const { scrollY } = useScroll();

  const navBg = useTransform(scrollY, [0, 200], [
    "linear-gradient(180deg, rgba(6,9,16,0) 0%, rgba(6,9,16,0) 100%)",
    "linear-gradient(180deg, rgba(6,9,16,0.85) 0%, rgba(6,9,16,0.35) 60%, rgba(6,9,16,0) 100%)"
  ]);
  const navBlur = useTransform(scrollY, [0, 200], [
    "blur(0px) saturate(1)",
    "blur(14px) saturate(1.25)"
  ]);
  const navBorder = useTransform(scrollY, [0, 200], [
    "rgba(255,255,255,0)",
    "rgba(255,255,255,0.12)"
  ]);
  const navShadow = useTransform(scrollY, [0, 200], [
    "0 0 0 rgba(0,0,0,0)",
    "0 2px 20px rgba(0,0,0,0.25)"
  ]);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileCyberOpen, setIsMobileCyberOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = document.documentElement;
    const setProgressVar = () => {
      const h = el.scrollHeight - el.clientHeight;
      const pct = Math.max(0, Math.min(1, window.scrollY / (h || 1)));
      el.style.setProperty("--scroll", `${pct * 100}%`);
    };

    setProgressVar();
    window.addEventListener("scroll", setProgressVar, { passive: true });
    window.addEventListener("resize", setProgressVar);

    return () => {
      window.removeEventListener("scroll", setProgressVar);
      window.removeEventListener("resize", setProgressVar);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
        setIsMobileServicesOpen(false);
        setIsMobileCyberOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileCyberOpen(false);
  };

  return (
    <motion.header
      className="sticky top-0 z-40 border-b transition-[background-color,box-shadow] duration-300"
      style={{
        backgroundColor: navBg,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
        borderBottomColor: navBorder,
        boxShadow: navShadow
      }}
    >
      <span
        aria-hidden
        className="block h-[2px] w-full bg-transparent"
        style={{
          background:
            "linear-gradient(90deg, var(--color-secondary) var(--scroll), transparent 0)"
        }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/#inicio" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
            <Image
              src="/images/isotipo_blanco.png"
              alt="Logo Conxima"
              width={24}
              height={24}
              priority
              data-preload="true"
              style={{ width: "auto", height: "auto" }}
            />
          </span>
          <span className="font-heading text-lg tracking-wide text-white">CONXIMA</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-200 transition-colors md:flex">
          <DesktopFlyoutLink
            label="Quienes somos"
            href="/#quienes"
            widthClass="w-[42rem]"
            flyout={<AboutFlyoutContent />}
          />

          <DesktopFlyoutLink
            label="Servicios"
            href="/servicios"
            widthClass="w-[52rem]"
            flyout={<ServicesFlyoutContent />}
          />

          <DesktopFlyoutLink
            label="Ciberseguridad"
            href="/ciberseguridad/fortinet"
            widthClass="w-[22rem]"
            flyout={<CyberFlyoutContent />}
          />

          <PlainNavLink href="/#porque">Por que nosotros</PlainNavLink>
          <PlainNavLink href="/#contacto">Contacto</PlainNavLink>

          <motion.a
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href="/#contacto"
            className="ml-2 rounded-full px-3 py-1.5 text-xs transition btn-tech"
          >
            Cotiza ahora
          </motion.a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label="Abrir menu"
        >
          <span className="relative flex h-5 w-6 items-center justify-center">
            <span
              className={`absolute h-[2px] w-full bg-current transition-transform duration-200 ${
                isMobileOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-[2px] w-full bg-current transition-opacity duration-200 ${
                isMobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-full bg-current transition-transform duration-200 ${
                isMobileOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </span>
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-t border-white/10 bg-[color:rgba(6,9,16,0.96)] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-slate-200">
            <Link
              href="/#quienes"
              className="rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={handleMobileLinkClick}
            >
              Quienes somos
            </Link>

            <button
              type="button"
              className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={() => setIsMobileServicesOpen((open) => !open)}
            >
              <span>Servicios</span>
              <ChevronIcon open={isMobileServicesOpen} />
            </button>
            {isMobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                <Link
                  href="/servicios"
                  className="rounded-lg px-2 py-2 text-xs text-slate-200 hover:bg-white/5"
                  onClick={handleMobileLinkClick}
                >
                  Ver todos los servicios
                </Link>
                {SERVICE_FLYOUT_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-2 py-2 text-xs text-slate-200 hover:bg-white/5"
                    onClick={handleMobileLinkClick}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={() => setIsMobileCyberOpen((open) => !open)}
            >
              <span>Ciberseguridad</span>
              <ChevronIcon open={isMobileCyberOpen} />
            </button>
            {isMobileCyberOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                {CYBER_FLYOUT_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-2 py-2 text-xs text-slate-200 hover:bg-white/5"
                    onClick={handleMobileLinkClick}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/#porque"
              className="rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={handleMobileLinkClick}
            >
              Por que nosotros
            </Link>

            <Link
              href="/#contacto"
              className="rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={handleMobileLinkClick}
            >
              Contacto
            </Link>

            <Link
              href="/#contacto"
              className="mt-2 inline-flex items-center justify-center rounded-full px-3 py-2 text-xs btn-tech"
              onClick={handleMobileLinkClick}
            >
              Cotiza ahora
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  );
}

function PlainNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="relative py-1 hover:text-white">
      {children}
    </Link>
  );
}

function DesktopFlyoutLink({
  label,
  href,
  widthClass,
  flyout
}: {
  label: string;
  href: string;
  widthClass: string;
  flyout: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative h-fit w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={href} className="group inline-flex items-center gap-1 py-1 hover:text-white">
        <span>{label}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-[var(--color-secondary)] transition-transform duration-200"
          style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute left-1/2 top-full mt-4 -translate-x-1/2 ${widthClass}`}
          >
            <div className="absolute inset-x-0 -top-4 h-4 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white shadow-xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
              {flyout}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AboutFlyoutContent() {
  return (
    <div className="grid grid-cols-12 bg-white text-black">
      <div className="col-span-12 bg-[#070b17] px-6 py-6 text-white lg:col-span-4">
        <h3 className="text-2xl font-semibold">Quienes somos</h3>
        <p className="mt-3 text-sm text-slate-300">
          CONXIMA es una empresa comprometida con ofrecer tecnologia de vanguardia y servicio de excelencia.
        </p>
        <Link href="/#quienes" className="mt-6 inline-flex text-xs text-[var(--color-secondary)] hover:underline">
          Ver seccion completa
        </Link>
      </div>

      <div className="col-span-12 grid grid-cols-2 gap-3 p-5 lg:col-span-8">
        <FlyoutCard
          href="/#quienes"
          title="Nuestra experiencia"
          description="Conoce nuestro enfoque en proyectos de seguridad y telecomunicaciones."
        />
        <FlyoutCard
          href="/#quienes"
          title="Mision"
          description="Proporcionar soluciones tecnologicas innovadoras para tus operaciones."
        />
        <FlyoutCard
          href="/#quienes"
          title="Vision"
          description="Ser referente en soluciones integrales de seguridad electronica."
        />
        <FlyoutCard
          href="/#contacto"
          title="Contactar equipo"
          description="Solicita asesoria para tu siguiente implementacion."
        />
      </div>
    </div>
  );
}

function ServicesFlyoutContent() {
  return (
    <div className="grid grid-cols-12 bg-white text-black">
      <div className="col-span-12 bg-[var(--color-primary)] px-6 py-6 text-white lg:col-span-4">
        <h3 className="text-2xl font-semibold">Servicios</h3>
        <p className="mt-3 text-sm text-cyan-100">
          Soluciones de seguridad electronica y telecomunicaciones para empresas.
        </p>
        <Link href="/servicios" className="mt-6 inline-flex text-xs text-white/90 hover:underline">
          Ver catalogo completo
        </Link>
      </div>

      <div className="col-span-12 grid grid-cols-3 gap-6 p-6 lg:col-span-8">
        {SERVICE_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <h4 className="text-sm font-semibold text-neutral-900">{group.title}</h4>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-neutral-700 transition hover:text-black hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CyberFlyoutContent() {
  return (
    <div className="bg-white p-3 text-black">
      {CYBER_FLYOUT_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-lg px-3 py-2 transition hover:bg-neutral-100"
        >
          <div className="text-sm font-medium">{item.title}</div>
          <p className="mt-0.5 text-[11px] text-neutral-600">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}

function FlyoutCard({
  href,
  title,
  description
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="rounded-lg border border-neutral-200 p-3 transition hover:bg-neutral-100">
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-neutral-700">{description}</p>
    </Link>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
