"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/** Lista fuera del componente para evitar advertencias de dependencias en useEffect */
const HERO_VIDEOS = ["hero-1", "hero-2", "hero-3", "hero-4"] as const;

export default function ConximaLanding() {
  /* =========================
   *  PRELOADER (pantalla de carga)
   * ========================= */
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const MIN_SHOW_MS = 600; // evita parpadeo
    const TIMEOUT_MS = 5000; // tope de espera
    const start = Date.now();

    const targets: Array<HTMLVideoElement | HTMLImageElement> = [];
    document
      .querySelectorAll<HTMLElement>('[data-preload="true"]')
      .forEach((el) => {
        if (el instanceof HTMLVideoElement || el instanceof HTMLImageElement) {
          targets.push(el);
        }
      });

    if (targets.length === 0) {
      const delay = Math.max(0, MIN_SHOW_MS - (Date.now() - start));
      const t = window.setTimeout(() => setLoading(false), delay);
      return () => clearTimeout(t);
    }

    let loaded = 0;
    const update = () => {
      loaded += 1;
      setProgress(Math.round((loaded / targets.length) * 100));
      if (loaded >= targets.length) {
        const delay = Math.max(0, MIN_SHOW_MS - (Date.now() - start));
        window.setTimeout(() => setLoading(false), delay);
      }
    };

    const cleanups: Array<() => void> = [];

    targets.forEach((el) => {
      if (el instanceof HTMLVideoElement) {
        const already =
          el.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA ||
          el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
        if (already) {
          update();
        } else {
          const onReady = () => {
            el.removeEventListener("loadeddata", onReady);
            el.removeEventListener("canplaythrough", onReady);
            update();
          };
          el.addEventListener("loadeddata", onReady, { once: true });
          el.addEventListener("canplaythrough", onReady, { once: true });
          cleanups.push(() => {
            el.removeEventListener("loadeddata", onReady);
            el.removeEventListener("canplaythrough", onReady);
          });
        }
      } else if (el instanceof HTMLImageElement) {
        if (el.complete && el.naturalWidth > 0) {
          update();
        } else {
          const onLoad = () => {
            el.removeEventListener("load", onLoad);
            el.removeEventListener("error", onLoad);
            update();
          };
          el.addEventListener("load", onLoad, { once: true });
          el.addEventListener("error", onLoad, { once: true });
          cleanups.push(() => {
            el.removeEventListener("load", onLoad);
            el.removeEventListener("error", onLoad);
          });
        }
      }
    });

    const timeout = window.setTimeout(() => setLoading(false), TIMEOUT_MS);
    return () => {
      cleanups.forEach((fn) => fn());
      clearTimeout(timeout);
    };
  }, []);

  /* =========================
   *  REVEAL ON SCROLL
   * ========================= */
  const revealRefs = useRef<Array<HTMLElement | null>>([]);
  const setRevealRef = (idx: number) => (el: HTMLElement | null) => {
    revealRefs.current[idx] = el;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Unir refs + todos los elementos .reveal (fallback si un ref no se asigna)
    const nodeSet = new Set<HTMLElement>();
    revealRefs.current.forEach((el) => el && nodeSet.add(el));
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => nodeSet.add(el));
    if (nodeSet.size === 0) return;

    // Fallback: mostrar sin animación si reduce motion o no hay IntersectionObserver
    if (reduce || !("IntersectionObserver" in window)) {
      nodeSet.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -15% 0px" }
    );

    nodeSet.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* =========================
   *  HERO VIDEO ROTATIVO
   * ========================= */
  const [selectedVideo, setSelectedVideo] = useState<string>(HERO_VIDEOS[0]);
  useEffect(() => {
    try {
      const key = "conxima_hero_idx";
      const last = Number(window.localStorage.getItem(key));
      const next = Number.isInteger(last) ? (last + 1) % HERO_VIDEOS.length : 0;
      setSelectedVideo(HERO_VIDEOS[next]);
      window.localStorage.setItem(key, String(next));
    } catch {
      setSelectedVideo(HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)]);
    }
  }, []);

  /* =========================
   *  ICONOS DE SERVICIOS (SVG inline, heredan currentColor)
   * ========================= */
  const Icons = {
    acceso: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M12 3a6 6 0 0 0-6 6v2a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9 12a3 3 0 1 0 6 0" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20a8 8 0 0 0 8 0" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    alarma: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M4 12h16l-8 8-8-8Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="10" r="3" fill="currentColor" />
        <path d="M5 5 3 7M21 7l-2-2" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    monitoreo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20h8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 10h5l2 2 5-4" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    cableado: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M4 7h16M4 12h10M4 17h7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="12" r="2" fill="currentColor" />
        <circle cx="15" cy="17" r="2" fill="currentColor" />
      </svg>
    ),
    racks: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 7h8M8 12h8M8 17h8" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    nube: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M7 16a4 4 0 1 1 0-8 5 5 0 0 1 9.7 1.5A4.5 4.5 0 1 1 17 16H7Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 13h6M8 15h8" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  } as const;

  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      {/* =========================
          PRELOADER OVERLAY
      ========================== */}
      <div className={`preloader ${loading ? "" : "preloader--hidden"}`} aria-hidden={!loading} aria-live="polite">
        <div className="preloader__card">
          <div className="preloader__spinner">
            <div className="preloader__logo">
              {/* Marca como crítico y prioridad de carga */}
              <Image src="/images/logo-conxima.png" alt="Conxima" width={26} height={26} priority data-preload="true" />
            </div>
          </div>
          <div className="preloader__progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div className="preloader__progress-inner" style={{ width: `${progress}%` }} />
          </div>
          <div className="preloader__text">Cargando experiencia… {progress}%</div>
        </div>
      </div>

      {/* =========================
          Estilos locales (tokens + helpers)
      ========================== */}
      <style>{`
        :root {
          --font-heading: 'Montserrat', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
          --font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
        }
        .font-heading { font-family: var(--font-heading); }
        .bg-card { background-color: var(--color-card); }
        .text-secondary { color: var(--color-secondary); }
        .text-muted { color: var(--color-muted); }
        .hero-overlay {
          background:
            radial-gradient(1200px 600px at 70% 30%, rgba(0,0,0,.06), transparent 40%),
            linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.6));
        }
        .icon-badge {
          color: var(--color-secondary);
          background: color-mix(in srgb, var(--color-secondary) 16%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-secondary) 36%, transparent);
        }
        .group:hover .icon-badge {
          background: color-mix(in srgb, var(--color-secondary) 24%, transparent);
        }
      `}</style>

      {/* =========================
          NAVBAR
      ========================== */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#inicio" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
              <Image
                src="/images/logo-conxima.png"
                alt="Logo Conxima"
                width={24}
                height={24}
                priority
                data-preload="true"
              />
            </span>
            <span className="font-heading text-lg tracking-wide">CONXIMA</span>
          </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
            <a href="#quienes" className="hover:text-white">Quiénes somos</a>
            <a href="#servicios" className="hover:text-white">Servicios</a>
            <a href="#porque" className="hover:text-white">Por qué nosotros</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>

            <motion.a
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              href="#contacto"
              className="btn-outline-tech text-xs ml-2 rounded-full px-3 py-1.5"
            >
              Cotiza ahora
            </motion.a>
          </nav>
        </div>
      </header>

      {/* =========================
          HERO
      ========================== */}
      <section id="inicio" className="relative isolate min-h-[85vh] w-full overflow-hidden">
        <video
          key={selectedVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          aria-label="Video de actividades y soluciones tecnológicas de seguridad y conectividad"
          data-preload="true"
        >
          <source src={`/videos/${selectedVideo}.mp4`} type="video/mp4" />
        </video>

        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-3xl reveal" ref={setRevealRef(0)}>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              Tecnología al servicio de tu
              <span className="block text-secondary">Seguridad y Conectividad</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-2xl">
              Soluciones integrales en telecomunicaciones y seguridad electrónica. Diseño, instalación y mantenimiento con profesionales certificados.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="#contacto" className="btn-tech">
                Solicita una asesoría
              </motion.a>
              <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="#servicios" className="btn-outline-tech">
                Explorar servicios
              </motion.a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
      </section>

      {/* =========================
          QUIÉNES SOMOS
      ========================== */}
      <section id="quienes" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="reveal" ref={setRevealRef(1)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Quiénes somos
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold">
                Líderes en telecomunicaciones y seguridad electrónica
              </h2>
              <p className="mt-4 text-slate-300">
                CONXIMA S.A.S es una empresa comprometida con ofrecer tecnología de vanguardia y servicio de excelencia. Nuestro equipo cuenta con amplia experiencia en el diseño, instalación y mantenimiento de sistemas integrales adaptados a cada cliente.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <article className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
                  <h3 className="font-heading font-semibold">Misión</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Proporcionar soluciones tecnológicas innovadoras que garanticen la seguridad y eficiencia en las operaciones de nuestros clientes.
                  </p>
                </article>
                <article className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
                  <h3 className="font-heading font-semibold">Visión</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Ser referente en soluciones integrales de telecomunicaciones y seguridad electrónica.
                  </p>
                </article>
              </div>
            </div>

            <div className="reveal" ref={setRevealRef(2)}>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <div className="relative h-72 w-full">
                  <Image
                    src="/images/team-install.jpg"
                    alt="Equipo técnico instalando cableado estructurado"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICIOS
      ========================== */}
      <section id="servicios" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <header className="reveal" ref={setRevealRef(3)}>
            <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
              Servicios
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold">
              Seguridad electrónica &amp; Telecomunicaciones
            </h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Implementamos sistemas de última generación, integrados a tus operaciones.
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: "control-de-acceso",
                title: "Control de Acceso Biométrico",
                desc: "Lectores de huella, reconocimiento facial, tarjetas e integración con software de gestión.",
                icon: Icons.acceso,
              },
              {
                slug: "sistemas-de-alarma",
                title: "Sistemas de Alarma",
                desc: "Perímetro, intrusión, armado/desarmado remoto y monitoreo móvil.",
                icon: Icons.alarma,
              },
              {
                slug: "cuarto-de-monitoreo",
                title: "Cuarto de Monitoreo",
                desc: "Diseño técnico, NVR/VMS, switches y cableado; capacitación de operadores.",
                icon: Icons.monitoreo,
              },
              {
                slug: "cableado-estructurado",
                title: "Cableado Estructurado",
                desc: "Planos, canalización, racks, certificación y documentación.",
                icon: Icons.cableado,
              },
              {
                slug: "racks-y-gabinetes",
                title: "Racks y Gabinetes",
                desc: "Montaje seguro, ventilación, orden y crecimiento.",
                icon: Icons.racks,
              },
              {
                slug: "servicios-en-la-nube",
                title: "Servicios en la Nube",
                desc: "Instancias seguras, almacenamiento, backups y acceso remoto.",
                icon: Icons.nube,
              },
            ].map((s, i) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group block"
                aria-label={`Abrir servicio: ${s.title}`}
              >
                <article
                  ref={setRevealRef(4 + i)}
                  className="reveal rounded-2xl bg-card/80 p-6 ring-1 ring-white/10 hover:ring-white/20 hover:translate-y-[-2px] transition"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="icon-badge inline-flex h-10 w-10 items-center justify-center rounded-xl">
                      {s.icon}
                    </span>
                    <h3 className="font-heading text-xl font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-slate-300">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-secondary">
                    Ver detalle
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                      <path d="M7 12h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          POR QUÉ NOSOTROS
      ========================== */}
      <section id="porque" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="reveal" ref={setRevealRef(10)}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">¿Por qué nosotros?</h2>
              <p className="mt-3 text-slate-300 max-w-xl">
                Soluciones a medida, tecnología certificada y acompañamiento experto de principio a fin.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Soluciones personalizadas según tus necesidades",
                  "Tecnología de punta y equipos certificados",
                  "Servicio técnico permanente",
                  "Garantía total en todos nuestros trabajos",
                  "Asesoría profesional continua",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-black text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" ref={setRevealRef(11)}>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <div className="relative h-72 w-full">
                  <Image
                    src="/images/monitoring-room.jpg"
                    alt="Centro de monitoreo y cableado ordenado"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-xl bg-black/60 px-3 py-1 text-xs">Implementaciones profesionales</span>
                  <span className="rounded-xl bg-black/60 px-3 py-1 text-xs">Integración de plataformas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACTO
      ========================== */}
      <section id="contacto" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 reveal" ref={setRevealRef(12)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Contacto
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold">Hablemos de tu proyecto</h2>
              <p className="mt-3 text-slate-300 max-w-2xl">
                Cuéntanos tus necesidades y te proponemos una solución integral con tiempos y costos claros.
              </p>

              <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="input-tech">
                  <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4Z" fill="currentColor" />
                  </svg>
                  <input id="name" placeholder=" " className="input-tech-field peer" aria-label="Nombre" />
                  <label htmlFor="name" className="input-tech-label">Nombre</label>
                </div>

                <div className="input-tech">
                  <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                    <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <input id="email" type="email" placeholder=" " className="input-tech-field peer" aria-label="Email" />
                  <label htmlFor="email" className="input-tech-label">Email</label>
                </div>

                <div className="input-tech sm:col-span-2">
                  <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" fill="currentColor" />
                  </svg>
                  <input id="phone" placeholder=" " className="input-tech-field peer" aria-label="Teléfono / WhatsApp" />
                  <label htmlFor="phone" className="input-tech-label">Teléfono / WhatsApp</label>
                </div>

                <div className="input-tech sm:col-span-2">
                  <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <textarea id="msg" placeholder=" " rows={4} className="input-tech-field textarea-tech peer" aria-label="Mensaje" />
                  <label htmlFor="msg" className="input-tech-label">Cuéntanos brevemente qué necesitas</label>
                </div>

                <div className="sm:col-span-2 flex flex-wrap gap-3">
                  <motion.button whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-tech">
                    Enviar consulta
                  </motion.button>
                  <motion.a
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    href="mailto:info@conxima.com,rguambo@conxima.com?subject=Consulta%20web"
                    className="btn-outline-tech"
                  >
                    Escribir correo
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    href="https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20una%20cotizaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-tech"
                  >
                    WhatsApp
                  </motion.a>
                </div>
                <p className="sm:col-span-2 text-xs text-muted">
                  Al enviar aceptas nuestro tratamiento de datos personales.
                </p>
              </form>
            </div>

            <aside className="lg:col-span-2 reveal" ref={setRevealRef(13)}>
              <div className="rounded-2xl bg-card/80 p-6 ring-1 ring-white/10">
                <h3 className="font-heading text-xl font-semibold">Contacto</h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                  <li className="flex items-center gap-3">
                    <span className="text-secondary">📞</span>{" "}
                    <a href="tel:+593939011017" className="hover:underline">
                      +593 93 901 1017
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-secondary">✉️</span>{" "}
                    <a href="mailto:arivera@conxima.com" className="hover:underline">
                      info@conxima.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-secondary">📍</span> Cdla. Simon Bolivar Mz.5 V.18
                  </li>
                </ul>
                <div className="mt-6 rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-slate-300">
                    Podemos añadir mapa de Google y botones de WhatsApp con mensaje pre-llenado.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} CONXIMA S.A.S · Todos los derechos reservados</p>
          <nav className="flex items-center gap-5">
            <a href="#inicio" className="hover:text-white">Inicio</a>
            <a href="#quienes" className="hover:text-white">Quiénes somos</a>
            <a href="#servicios" className="hover:text-white">Servicios</a>
            <a href="#porque" className="hover:text-white">Por qué nosotros</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
