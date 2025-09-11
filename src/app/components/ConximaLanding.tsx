"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ConximaLanding() {
  // Refs para reveal por sección (compatibilidad + control fino)
  const revealRefs = useRef<Array<HTMLElement | null>>([]);
  const setRevealRef = (idx: number) => (el: HTMLElement | null) => {
    revealRefs.current[idx] = el;
  };

  // IntersectionObserver: reveal por sección al hacer scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Unir refs + todos los elementos .reveal del DOM (por si algún ref no se asigna)
    const nodeSet = new Set<HTMLElement>();
    revealRefs.current.forEach((el) => el && nodeSet.add(el));
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => nodeSet.add(el));

    if (nodeSet.size === 0) return;

    // Fallback: sin animación si reduce motion o si no existe IO
    if (reduce || !(window as any).IntersectionObserver) {
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
      { threshold: 0.12, rootMargin: "0px 0px -15% 0px" } // dispara un poco antes
    );

    nodeSet.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Hero video (rota por refresh)
  const HERO_VIDEOS = ["hero-1", "hero-2", "hero-3", "hero-4"];
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

  // Iconos para Servicios (SVGs inline; usan currentColor)
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
      {/* Tokens/utilidades locales + estilos de paleta para iconos */}
      <style>{`
        :root {
          --font-heading: 'Montserrat', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
          --font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
        }
        .font-heading { font-family: var(--font-heading); }
        .bg-card { background-color: var(--color-card); }
        .text-secondary { color: var(--color-secondary); }
        .text-muted { color: var(--color-muted); }

        /* Overlay del hero */
        .hero-overlay {
          background:
            radial-gradient(1200px 600px at 70% 30%, rgba(0,0,0,.06), transparent 40%),
            linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.6));
        }

        /* —— Badge de icono siguiendo la paleta —— */
        .icon-badge {
          color: var(--color-secondary);
          background: color-mix(in srgb, var(--color-secondary) 16%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-secondary) 36%, transparent);
        }
        .group:hover .icon-badge {
          background: color-mix(in srgb, var(--color-secondary) 24%, transparent);
        }
      `}</style>

      {/* —— Estilos “tech” (helpers visuales) —— */}
      <style>{`
        .btn-tech { position: relative; display: inline-flex; align-items: center; justify-content: center; gap:.5rem; padding: .9rem 1.2rem; border-radius: 1rem; font-weight: 600; color: #0b1220; background: linear-gradient(180deg, var(--color-secondary), var(--color-primary)); box-shadow: 0 8px 30px -12px rgba(0,0,0,.6); transition: transform .2s ease, box-shadow .2s ease; overflow:hidden; }
        .btn-tech::before { content: ""; position: absolute; inset: -2px; border-radius: inherit; background: conic-gradient(from 0deg, var(--color-secondary), var(--color-primary), var(--color-secondary)); filter: blur(10px); opacity: .35; z-index: -1; animation: spin 6s linear infinite; }
        .btn-tech::after { content:""; position:absolute; inset:0; border-radius:inherit; background: radial-gradient(closest-side, rgba(255,255,255,.35), transparent 60%); transform: scale(0); opacity:0; transition: transform .45s ease, opacity .6s ease; }
        .btn-tech:hover { transform: translateY(-1px); box-shadow: 0 12px 34px -14px var(--color-secondary); }
        .btn-tech:active { transform: translateY(0); }
        .btn-tech:active::after { transform: scale(1.35); opacity:.35; transition: none; }

        .btn-outline-tech { position: relative; display: inline-flex; align-items: center; justify-content: center; gap:.5rem; padding: .9rem 1.2rem; border-radius: 1rem; font-weight: 600; color: currentColor; background: transparent; overflow:hidden; }
        .btn-outline-tech::before { content:""; position: absolute; inset: 0; padding: 1px; border-radius: inherit; background: linear-gradient(90deg, var(--color-secondary), var(--color-primary)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .btn-outline-tech::after { content:""; position:absolute; inset:0; border-radius:inherit; background: radial-gradient(closest-side, rgba(0,0,0,.2), transparent 60%); transform: scale(0); opacity:0; transition: transform .45s ease, opacity .6s ease; }
        .btn-outline-tech:hover { color: var(--app-fg); background: linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%); }
        .btn-outline-tech:active::after { transform: scale(1.35); opacity:.25; transition: none; }

        .input-tech { position: relative; }
        .input-tech-icon { position: absolute; left: .9rem; top: 50%; transform: translateY(-50%); opacity: .8; pointer-events: none; }
        .input-tech-field { width: 100%; background: rgba(255,255,255,.06); border-radius: 1rem; padding: 1rem 1rem 1rem 2.75rem; border: 1px solid rgba(255,255,255,.08); outline: none; color: inherit; transition: box-shadow .2s ease, background .2s ease, border-color .2s ease; }
        .input-tech-field:focus { box-shadow: 0 0 0 2px var(--color-secondary); background: rgba(255,255,255,.09); }
        .textarea-tech { min-height: 7.5rem; }
        .input-tech-label { position: absolute; left: 2.75rem; top: .95rem; font-size: .875rem; color: var(--color-muted); pointer-events: none; transform-origin: left center; transition: transform .2s ease, opacity .2s ease; opacity:.9; }
        .input-tech-field:focus + .input-tech-label, .input-tech-field:not(:placeholder-shown) + .input-tech-label { transform: translateY(-1.55rem) scale(.9); opacity: .95; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ——— Navbar ——— */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#inicio" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
              <img
                src="/images/logo-conxima.png"
                alt="Logo Conxima"
                className="h-6 w-6"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </span>
            <span className="font-heading text-lg tracking-wide">CONXIMA S.A.S</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
            <a href="#quienes" className="hover:text-white">Quiénes somos</a>
            <a href="#servicios" className="hover:text-white">Servicios</a>
            <a href="#porque" className="hover:text-white">Por qué nosotros</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>

            <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="#contacto" className="btn-outline-tech text-xs ml-2 rounded-full px-3 py-1.5">
              Cotiza ahora
            </motion.a>
          </nav>
        </div>
      </header>

      {/* ——— Hero ——— */}
      <section id="inicio" className="relative isolate min-h-[85vh] w-full overflow-hidden">
        <video
          key={selectedVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-label="Video de actividades y soluciones tecnológicas de seguridad y conectividad"
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
              <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="#contacto" className="btn-tech">Solicita una asesoría</motion.a>
              <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="#servicios" className="btn-outline-tech">Explorar servicios</motion.a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
      </section>

      {/* ——— Quiénes somos ——— */}
      <section id="quienes" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="reveal" ref={setRevealRef(1)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">Quiénes somos</span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold">Líderes en telecomunicaciones y seguridad electrónica</h2>
              <p className="mt-4 text-slate-300">
                CONXIMA S.A.S es una empresa comprometida con ofrecer tecnología de vanguardia y servicio de excelencia. Nuestro equipo cuenta con amplia experiencia en el diseño, instalación y mantenimiento de sistemas integrales adaptados a cada cliente.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <article className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
                  <h3 className="font-heading font-semibold">Misión</h3>
                  <p className="mt-2 text-sm text-slate-300">Proporcionar soluciones tecnológicas innovadoras que garanticen la seguridad y eficiencia en las operaciones de nuestros clientes.</p>
                </article>
                <article className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
                  <h3 className="font-heading font-semibold">Visión</h3>
                  <p className="mt-2 text-sm text-slate-300">Ser referente en soluciones integrales de telecomunicaciones y seguridad electrónica.</p>
                </article>
              </div>
            </div>

            <div className="reveal" ref={setRevealRef(2)}>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img src="/images/team-install.jpg" alt="Equipo técnico instalando cableado estructurado" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Servicios (cada card → su página) ——— */}
      <section id="servicios" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <header className="reveal" ref={setRevealRef(3)}>
            <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">Servicios</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold">Seguridad electrónica & Telecomunicaciones</h2>
            <p className="mt-3 max-w-3xl text-slate-300">Implementamos sistemas de última generación, integrados a tus operaciones.</p>
          </header>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { slug: "control-de-acceso",     title: "Control de Acceso Biométrico", desc: "Lectores de huella, reconocimiento facial, tarjetas e integración con software de gestión.", icon: Icons.acceso },
              { slug: "sistemas-de-alarma",    title: "Sistemas de Alarma",           desc: "Perímetro, intrusión, armado/desarmado remoto y monitoreo móvil.",                    icon: Icons.alarma },
              { slug: "cuarto-de-monitoreo",   title: "Cuarto de Monitoreo",          desc: "Diseño técnico, NVR/VMS, switches y cableado; capacitación de operadores.",        icon: Icons.monitoreo },
              { slug: "cableado-estructurado", title: "Cableado Estructurado",        desc: "Planos, canalización, racks, certificación y documentación.",                       icon: Icons.cableado },
              { slug: "racks-y-gabinetes",     title: "Racks y Gabinetes",            desc: "Montaje seguro, ventilación, orden y crecimiento.",                                 icon: Icons.racks },
              { slug: "servicios-en-la-nube",  title: "Servicios en la Nube",         desc: "Instancias seguras, almacenamiento, backups y acceso remoto.",                      icon: Icons.nube },
            ].map((s, i) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`} className="group block" aria-label={`Abrir servicio: ${s.title}`}>
                <article
                  ref={setRevealRef(4 + i)}
                  className="reveal rounded-2xl bg-card/80 p-6 ring-1 ring-white/10 hover:ring-white/20 hover:translate-y-[-2px] transition"
                  style={{ transitionDelay: `${i * 80}ms` }}   // stagger suave
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

      {/* ——— Por qué nosotros ——— */}
      <section id="porque" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="reveal" ref={setRevealRef(10)}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">¿Por qué nosotros?</h2>
              <p className="mt-3 text-slate-300 max-w-xl">Soluciones a medida, tecnología certificada y acompañamiento experto de principio a fin.</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Soluciones personalizadas según tus necesidades",
                  "Tecnología de punta y equipos certificados",
                  "Servicio técnico permanente",
                  "Garantía total en todos nuestros trabajos",
                  "Asesoría profesional continua",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-black text-sm font-bold">{idx + 1}</span>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" ref={setRevealRef(11)}>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img src="/images/monitoring-room.jpg" alt="Centro de monitoreo y cableado ordenado" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-xl bg-black/60 px-3 py-1 text-xs">Implementaciones profesionales</span>
                  <span className="rounded-xl bg-black/60 px-3 py-1 text-xs">Integración de plataformas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Contacto ——— */}
      <section id="contacto" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 reveal" ref={setRevealRef(12)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">Contacto</span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold">Hablemos de tu proyecto</h2>
              <p className="mt-3 text-slate-300 max-w-2xl">Cuéntanos tus necesidades y te proponemos una solución integral con tiempos y costos claros.</p>

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
                  <motion.button whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-tech">Enviar consulta</motion.button>
                  <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="mailto:arivera@conxima.com,rguambo@conxima.com?subject=Consulta%20web" className="btn-outline-tech">Escribir correo</motion.a>
                  <motion.a whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.99 }} href="https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20una%20cotizaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="btn-outline-tech">WhatsApp</motion.a>
                </div>
                <p className="sm:col-span-2 text-xs text-muted">Al enviar aceptas nuestro tratamiento de datos personales.</p>
              </form>
            </div>

            <aside className="lg:col-span-2 reveal" ref={setRevealRef(13)}>
              <div className="rounded-2xl bg-card/80 p-6 ring-1 ring-white/10">
                <h3 className="font-heading text-xl font-semibold">Contacto directo</h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                  <li className="flex items-center gap-3"><span className="text-secondary">📞</span> <a href="tel:+593939011017" className="hover:underline">+593 93 901 1017</a></li>
                  <li className="flex items-center gap-3"><span className="text-secondary">✉️</span> <a href="mailto:arivera@conxima.com" className="hover:underline">arivera@conxima.com</a></li>
                  <li className="flex items-center gap-3"><span className="text-secondary">✉️</span> <a href="mailto:rguambo@conxima.com" className="hover:underline">rguambo@conxima.com</a></li>
                  <li className="flex items-center gap-3"><span className="text-secondary">📍</span> Cdla. Simon Bolivar Mz.5 V.18</li>
                </ul>
                <div className="mt-6 rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-slate-300">Podemos añadir mapa de Google y botones de WhatsApp con mensaje pre-llenado.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ——— Footer ——— */}
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
