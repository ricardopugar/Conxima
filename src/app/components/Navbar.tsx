// src/app/components/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isCyberOpen, setIsCyberOpen] = useState(false); // dropdown desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false); // menú móvil
  const [isMobileCyberOpen, setIsMobileCyberOpen] = useState(false); // submenú móvil
  const cyberRef = useRef<HTMLDivElement | null>(null);

  // Cambia estilos de navbar al hacer scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Barra de progreso superior (usa --scroll)
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

  // Cerrar dropdown desktop al hacer click fuera
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!cyberRef.current) return;
      if (!cyberRef.current.contains(event.target as Node)) {
        setIsCyberOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Cerrar menú móvil cuando se pasa a desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
        setIsMobileCyberOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
    setIsMobileCyberOpen(false);
  };

  return (
    <header
      className={[
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-[color:rgba(6,9,16,0.55)] bg-[color:rgba(6,9,16,0.85)] border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
          : "bg-transparent",
      ].join(" ")}
    >
      {/* barra de progreso superior */}
      <span
        aria-hidden
        className="block h-[2px] w-full bg-transparent"
        style={{
          background:
            "linear-gradient(90deg, var(--color-secondary) var(--scroll), transparent 0)",
        }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo → lleva al inicio de la home */}
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
          <span className="font-heading text-lg tracking-wide text-white">
            CONXIMA
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden items-center gap-6 text-sm text-slate-200 transition-colors md:flex">
          <Link href="/#quienes" className="hover:text-white">
            Quiénes somos
          </Link>

          <Link href="/#servicios" className="hover:text-white">
            Servicios
          </Link>

          {/* Ciberseguridad con dropdown controlado por estado (click) */}
          <div ref={cyberRef} className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsCyberOpen((open) => !open);
              }}
            >
              <span>Ciberseguridad</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isCyberOpen && (
              <div
                className="
                  absolute left-1/2 top-full z-[9999] mt-2 w-56
                  -translate-x-1/2 rounded-xl bg-[color:rgba(6,9,16,0.97)]
                  px-3 py-2 text-sm shadow-xl ring-1 ring-white/10
                "
              >
                <Link
                  href="/ciberseguridad/fortinet"
                  className="block rounded-lg px-2 py-1.5 text-left text-slate-200 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsCyberOpen(false)}
                >
                  <div className="font-medium">Fortinet</div>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Firewalls, SD-WAN y seguridad perimetral
                  </p>
                </Link>
              </div>
            )}
          </div>

          <Link href="/#porque" className="hover:text-white">
            Por qué nosotros
          </Link>

          <Link href="/#contacto" className="hover:text-white">
            Contacto
          </Link>

          <motion.a
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href="/#contacto"
            className="ml-2 rounded-full px-3 py-1.5 text-xs transition btn-tech"
          >
            Cotiza ahora
          </motion.a>
        </nav>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label="Abrir menú"
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

      {/* MENÚ MÓVIL */}
      {isMobileOpen && (
        <div className="border-t border-white/10 bg-[color:rgba(6,9,16,0.96)] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-slate-200">
            <Link
              href="/#quienes"
              className="rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={handleMobileLinkClick}
            >
              Quiénes somos
            </Link>

            <Link
              href="/#servicios"
              className="rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={handleMobileLinkClick}
            >
              Servicios
            </Link>

            {/* Grupo Ciberseguridad en móvil */}
            <button
              type="button"
              className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={() =>
                setIsMobileCyberOpen((open) => !open)
              }
            >
              <span>Ciberseguridad</span>
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 transition-transform ${
                  isMobileCyberOpen ? "rotate-180" : ""
                }`}
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
            </button>
            {isMobileCyberOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                <Link
                  href="/ciberseguridad/fortinet"
                  className="rounded-lg px-2 py-2 text-xs text-slate-200 hover:bg-white/5"
                  onClick={handleMobileLinkClick}
                >
                  Fortinet · Firewalls, SD-WAN y seguridad perimetral
                </Link>
              </div>
            )}

            <Link
              href="/#porque"
              className="rounded-lg px-2 py-2 hover:bg-white/5"
              onClick={handleMobileLinkClick}
            >
              Por qué nosotros
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
    </header>
  );
}
