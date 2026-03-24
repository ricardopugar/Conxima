"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import Navbar from "./Navbar";
import Footer from "./Footer";
import InteractiveCTA from "./InteractiveCTA";
/** Vídeos del hero */
const HERO_VIDEOS = ["hero-1", "hero-2", "hero-3", "hero-4"] as const;

function getBubbleLevel(
  hoveredIndex: number | null,
  currentIndex: number,
  char: string
): "base" | "near" | "active" {
  if (char === " " || hoveredIndex === null) return "base";

  const distance = Math.abs(hoveredIndex - currentIndex);
  if (distance === 0) return "active";
  if (distance === 1) return "near";
  return "base";
}

function BubbleHeroText({ text }: { text: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span
      className="bubble-hero mt-2 block"
      onMouseLeave={() => setHoveredIndex(null)}
      aria-label={text}
    >
      {Array.from(text).map((char, idx) => {
        const level = getBubbleLevel(hoveredIndex, idx, char);

        return (
          <span
            key={`${char}-${idx}`}
            className={`bubble-hero__char bubble-hero__char--${level}`}
            onMouseEnter={() => setHoveredIndex(idx)}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

export default function ConximaLanding() {
  /* =========================
   *  PRELOADER (pantalla de carga)
   * ========================= */
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const MIN_SHOW_MS = 600;
    const TIMEOUT_MS = 5000;
    const start = Date.now();

    const targets: Array<HTMLVideoElement | HTMLImageElement> = [];
    document
      .querySelectorAll<HTMLElement>('[data-preload="true"]')
      .forEach((el) => {
        if (el instanceof HTMLVideoElement || el instanceof HTMLImageElement)
          targets.push(el);
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
        if (already) update();
        else {
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
        if (el.complete && el.naturalWidth > 0) update();
        else {
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
  const setRevealRef =
    (idx: number) =>
    (el: HTMLElement | null): void => {
      revealRefs.current[idx] = el;
    };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const nodeSet = new Set<HTMLElement>();
    revealRefs.current.forEach((el) => el && nodeSet.add(el));
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      nodeSet.add(el);
    });
    if (nodeSet.size === 0) return;

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
      const next = Number.isInteger(last)
        ? (last + 1) % HERO_VIDEOS.length
        : 0;
      setSelectedVideo(HERO_VIDEOS[next]);
      window.localStorage.setItem(key, String(next));
    } catch {
      setSelectedVideo(
        HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)]
      );
    }
  }, []);

  /* =========================
   *  WhatsApp helpers
   * ========================= */
  const WA_NUMBER = "593939011017"; // Conxima
  const GENERIC_WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hola CONXIMA, vengo desde la web y quiero solicitar asesoría."
  )}`;

  const buildWhatsAppURL = () => {
    const name =
      (document.getElementById("name") as HTMLInputElement)?.value?.trim() ||
      "";
    const email =
      (document.getElementById("email") as HTMLInputElement)?.value?.trim() ||
      "";
    const phone =
      (document.getElementById("phone") as HTMLInputElement)?.value?.trim() ||
      "";
    const msg =
      (document.getElementById("msg") as HTMLTextAreaElement)?.value?.trim() ||
      "";

    const text =
      `Hola CONXIMA, vengo desde la web.` +
      (name ? ` Soy ${name}.` : "") +
      (phone ? ` Tel: ${phone}.` : "") +
      (email ? ` Email: ${email}.` : "") +
      (msg ? `\nResumen: ${msg}` : "");

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const openWhatsApp = (e?: React.MouseEvent) => {
    e?.preventDefault?.();
    const url = buildWhatsAppURL();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* =========================
   *  Estado envío formulario
   * ========================= */
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] =
    useState<"idle" | "success" | "error">("idle");

  const handleContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setSendStatus("error");
      return;
    }

    try {
      setSending(true);
      setSendStatus("idle");

      const endpoint = form.getAttribute("action") || "/contact.php";
      const method = (form.getAttribute("method") || "POST").toUpperCase();

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Error al enviar");

      setSendStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      {/* PRELOADER */}
      <div
        className={`preloader ${loading ? "" : "preloader--hidden"}`}
        aria-hidden={!loading}
        aria-live="polite"
      >
        <div className="preloader__card">
          <div className="preloader__spinner">
            <div className="preloader__logo">
              <Image
                src="/images/logo-conxima.png"
                alt="Conxima"
                width={26}
                height={26}
                priority
                data-preload="true"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
          <div
            className="preloader__progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="preloader__progress-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="preloader__text">
            Cargando experiencia… {progress}%
          </div>
        </div>
      </div>

      {/* Estilos locales */}
      <style>{`
        .bg-card { background-color: var(--color-card); }
        .text-secondary { color: var(--color-secondary); }
        .text-muted { color: var(--color-muted); }
        .hero-overlay {
          background:
            radial-gradient(1200px 600px at 70% 30%, rgba(0, 4, 48, 0.06), transparent 40%),
            linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.6));
        }
        .icon-badge {
          color: var(--color-secondary);
          background: color-mix(in srgb, var(--color-secondary) 16%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-secondary) 36%, transparent);
        }
        .group:hover .icon-badge { background: color-mix(in srgb, var(--color-secondary) 24%, transparent); }
        .bubble-hero {
          text-wrap: balance;
          color: var(--color-secondary);
          text-shadow: 0 0 24px rgba(34, 211, 238, 0.18);
        }
        .bubble-hero__char {
          display: inline-block;
          padding-inline: 0.015em;
          font-weight: 320;
          color: var(--color-secondary);
          text-shadow: 0 0 0 rgba(34, 211, 238, 0);
          transform: translateY(0) scale(1);
          transition:
            color 220ms ease,
            font-weight 220ms ease,
            text-shadow 220ms ease,
            transform 220ms ease;
          will-change: color, transform;
        }
        .bubble-hero__char--near {
          font-weight: 500;
          color: color-mix(in srgb, var(--color-secondary) 86%, white);
          text-shadow: 0 0 16px rgba(34, 211, 238, 0.16);
          transform: translateY(-1px) scale(1.02);
        }
        .bubble-hero__char--active {
          font-weight: 700;
          color: color-mix(in srgb, var(--color-secondary) 72%, white);
          text-shadow:
            0 0 18px rgba(34, 211, 238, 0.3),
            0 0 34px rgba(0, 124, 198, 0.18);
          transform: translateY(-2px) scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .bubble-hero__char {
            transition: color 140ms ease;
            transform: none;
          }
        }

        :root { --scroll: 0%; }
        @supports(selector(:root)) { html { scroll-behavior: smooth; } }

        .reveal { opacity: 0; transform: translateY(8px); transition: opacity .45s ease, transform .45s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* NAVBAR reutilizable */}
      <Navbar />

      {/* HERO */}
      <section
        id="inicio"
        className="relative isolate min-h-[85vh] w-full overflow-hidden"
      >
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
            <h1 className="type-title text-4xl leading-tight md:text-6xl">
              Tecnología al servicio de tu
              <BubbleHeroText text="Seguridad y Conectividad" />
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              Soluciones integrales en telecomunicaciones y seguridad
              electrónica. Diseño, instalación y mantenimiento con profesionales
              certificados.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={GENERIC_WA_URL}
                className="btn-tech"
                aria-label="Abrir WhatsApp para solicitar asesoría"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicita una asesoría
              </motion.a>
              <motion.a
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href="#servicios"
                className="btn-outline-tech"
              >
                Explorar servicios
              </motion.a>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
      </section>

      {/* =========================
          QUIÉNES SOMOS
      ========================== */}
      <section id="quienes" className="section relative" data-tone="1">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* TEXTO */}
            <div className="reveal" ref={setRevealRef(1)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Quiénes somos
              </span>
              <h2 className="type-title mt-4 text-3xl md:text-4xl">
                Ingeniería aplicada a la seguridad y conectividad de tu operación
              </h2>
              <p className="mt-4 text-slate-300">
                En CONXIMA diseñamos, implementamos y mantenemos soluciones
                tecnológicas que protegen activos, optimizan procesos y mejoran
                la continuidad operativa de cada cliente.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: "360°", label: "Cobertura del proyecto" },
                  { value: "A medida", label: "Soluciones personalizadas" },
                  { value: "Continuo", label: "Acompañamiento técnico" },
                ].map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-2xl bg-card/80 px-4 py-3 ring-1 ring-white/10"
                  >
                    <p className="type-subtitle text-2xl text-secondary">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-300">{stat.label}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <article className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
                  <h3 className="type-subtitle">Misión</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Entregar soluciones robustas, escalables y seguras que
                    respondan a los retos reales de cada entorno empresarial.
                  </p>
                </article>
                <article className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
                  <h3 className="type-subtitle">Visión</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Consolidarnos como aliado estratégico en infraestructura
                    tecnológica para seguridad y conectividad en la región.
                  </p>
                </article>
              </div>
            </div>

            {/* IMAGEN ÚNICA (sin carrusel) */}
            <div className="reveal lg:justify-self-end" ref={setRevealRef(2)}>
              <div className="relative w-full max-w-[560px] rounded-2xl ring-1 ring-white/10 bg-card/80 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                {/* Altura garantizada para evitar colapso con Image fill */}
                <div className="relative min-h-[22rem] md:min-h-[26rem] lg:min-h-[30rem] bg-black/20">
                  <Image
                    src="/images/team-install.jpeg"
                    alt="Equipo técnico instalando cableado estructurado"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 38rem, (min-width: 768px) 70vw, 100vw"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                </div>

                {/* Pie de foto opcional */}
                <div className="px-4 py-3 text-xs text-slate-300 bg-black/40 backdrop-blur-sm flex justify-between">
                  <span>Instalaciones profesionales con equipo altamente calificado y certificado</span>
                </div>
              </div>
            </div>
            {/* FIN Imagen única */}
          </div>
        </div>
      </section>

      {/* =========================
          SERVICIOS
      ========================== */}
      <section id="servicios" className="section relative" data-tone="2">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <header className="reveal" ref={setRevealRef(3)}>
            <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
              Servicios
            </span>
            <h2 className="type-title mt-4 text-3xl md:text-4xl">Seguridad electrónica &amp; Telecomunicaciones</h2>
            <p className="mt-3 max-w-3xl text-slate-300">Implementamos sistemas de última generación, integrados a tus operaciones.</p>
          </header>

          <ServicesCarousel
            items={[
              {
                slug: "cableado-estructurado",
                title: "Infraestructura de Red",
                desc: "Cableado, puntos de red, switches, racks y crecimiento ordenado de tu infraestructura.",
                category: "Infraestructura",
                src: "/images/servicios-landing/infraestructura de red y gabinetes2 .png",
              },
              {
                slug: "puntos-de-datos",
                title: "Puntos de Datos",
                legend: "Salidas de red para puestos, cámaras, telefonía y equipos conectados.",
                desc: "Implementación ordenada de puntos de red y datos para conectar tu operación con estándar profesional.",
                category: "Infraestructura",
                src: "/images/servicios-landing/infraestructura de red y gabinetes .png",
                href: "/servicios/cableado-estructurado",
              },
              {
                slug: "ciberseguridad",
                title: "Ciberseguridad",
                legend: "Protección de redes, usuarios y datos frente a amenazas digitales.",
                desc: "Estrategias, soluciones y partners para blindar la operación tecnológica de tu empresa.",
                category: "Protección digital",
                src: "/images/fortigate.jpg",
                href: "/ciberseguridad",
              },
              {
                slug: "servicios-en-la-nube",
                title: "Servicios en la Nube",
                desc: "Instancias seguras, almacenamiento, backups y acceso remoto.",
                category: "Nube",
                src: "/images/servicios/nube.jfif",
              },
              {
                slug: "cableado-fibra-optica",
                title: "Cableado de Fibra Óptica",
                desc: "Tendido, fusión y certificación de enlaces de fibra para redes empresariales y backbone.",
                category: "Conectividad",
                src: "/images/servicios-landing/cableado de fibra optica.jpg",
              },
              {
                slug: "cctv",
                title: "Circuito Cerrado de Televisión (CCTV)",
                desc: "Cámaras IP/analógicas, NVR/VMS y monitoreo remoto 24/7.",
                category: "Videovigilancia",
                src: "/images/servicios/cctv.jpg",
              },
              {
                slug: "control-de-acceso",
                title: "Control de Acceso Biométrico",
                desc: "Lectores de huella, reconocimiento facial, tarjetas e integración con software de gestión.",
                category: "Control de acceso",
                src: "/images/servicios-landing/control de acceso.png",
              },
              {
                slug: "sistemas-de-alarma",
                title: "Sistemas de Alarma",
                desc: "Perímetro, intrusión, armado/desarmado remoto y monitoreo móvil.",
                category: "Seguridad",
                src: "/images/servicios/alarma.jpeg",
              },
              {
                slug: "cuarto-de-monitoreo",
                title: "Cuarto de Monitoreo",
                desc: "Diseño técnico, NVR/VMS, switches y cableado; capacitación de operadores.",
                category: "Monitoreo",
                src: "/images/servicios-landing/cuarto monitoreo.png",
              },
            ]}
          />
        </div>
      </section>

      {/* =========================
          POR QUÉ NOSOTROS
      ========================== */}
      <section id="porque" className="section relative" data-tone="t1">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* IMAGEN - izquierda en lg */}
            <div className="reveal lg:order-1" ref={setRevealRef(11)}>
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <div className="relative h-80 w-full">
                  <Image
                    src="/images/monitoring-room.jpeg"
                    alt="Cámaras"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Implementaciones profesionales",
                    "Integración de plataformas",
                    "Puesta en marcha asistida",
                    "Soporte postventa especializado",
                  ].map((label) => (
                    <span
                      key={label}
                      className="rounded-xl bg-black/60 px-3 py-1.5 text-xs text-center"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* TEXTO - derecha en lg */}
            <div className="reveal lg:order-2" ref={setRevealRef(10)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Ventajas CONXIMA
              </span>
              <h2 className="type-title mt-4 text-3xl md:text-4xl">
                ¿Por qué elegirnos para tu proyecto?
              </h2>
              <p className="mt-3 text-slate-300 max-w-xl">
                Combinamos ingeniería, experiencia en campo y seguimiento
                continuo para garantizar resultados medibles en seguridad y
                conectividad.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Diagnóstico técnico real",
                    desc: "Evaluamos riesgos, cobertura y crecimiento para definir una solución viable desde el inicio.",
                  },
                  {
                    title: "Implementación certificada",
                    desc: "Trabajamos con estándares de instalación, pruebas de rendimiento y protocolos de calidad.",
                  },
                  {
                    title: "Tecnología interoperable",
                    desc: "Integramos hardware y software para una operación centralizada, estable y escalable.",
                  },
                  {
                    title: "Acompañamiento continuo",
                    desc: "No cerramos al entregar: damos soporte, ajustes y mejora continua sobre la solución instalada.",
                  },
                ].map((item, idx) => (
                  <li key={item.title} className="rounded-2xl bg-card/80 p-4 ring-1 ring-white/10">
                    <p className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-secondary px-2 text-xs font-bold text-black">
                      0{idx + 1}
                    </p>
                    <h3 className="type-subtitle mt-3 text-base text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <InteractiveCTA>
                  <a href="#contacto" className="btn-tech">
                    Hablar con un especialista
                  </a>
                </InteractiveCTA>
                <p className="text-xs text-slate-400">
                  Te acompañamos desde el diagnóstico hasta la puesta en marcha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACTO
      ========================== */}
      <section id="contacto" className="section relative" data-tone="3">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 reveal" ref={setRevealRef(12)}>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Contacto
              </span>
              <h2 className="type-title mt-4 text-3xl md:text-4xl">Hablemos de tu proyecto</h2>
              <p className="mt-3 text-slate-300 max-w-2xl">
                Cuéntanos tus necesidades y te proponemos una solución integral con tiempos y costos claros.
              </p>

        <form
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          action="/contact.php"
          method="post"
          onSubmit={handleContactSubmit}
        >
          {/* NOMBRE */}
          <div className="sm:col-span-2 sm:col-span-1 space-y-1">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-slate-300"
            >
              Nombre
            </label>
            <div className="input-tech">
              <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                <path
                  d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4Z"
                  fill="currentColor"
                />
              </svg>
              <input
                id="name"
                name="name"
                className="input-tech-field"
                placeholder="Escribe tu nombre"
                aria-label="Nombre"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="sm:col-span-2 sm:col-span-1 space-y-1">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-300"
            >
              Email
            </label>
            <div className="input-tech">
              <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                className="input-tech-field"
                placeholder="tu@correo.com"
                aria-label="Email"
              />
            </div>
          </div>

          {/* TELÉFONO */}
          <div className="sm:col-span-2 space-y-1">
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-slate-300"
            >
              Teléfono / WhatsApp
            </label>
            <div className="input-tech">
              <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
                  fill="currentColor"
                />
              </svg>
              <input
                id="phone"
                name="phone"
                className="input-tech-field"
                placeholder="+593 99 999 9999"
                aria-label="Teléfono / WhatsApp"
              />
            </div>
          </div>

          {/* MENSAJE */}
          <div className="sm:col-span-2 space-y-1">
            <label
              htmlFor="msg"
              className="block text-xs font-medium text-slate-300"
            >
              Cuéntanos brevemente qué necesitas
            </label>
            <div className="input-tech">
              <svg viewBox="0 0 24 24" className="input-tech-icon h-5 w-5" aria-hidden>
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <textarea
                id="msg"
                name="message"
                rows={4}
                className="input-tech-field textarea-tech"
                placeholder="Escribe aquí tu mensaje"
                aria-label="Mensaje"
              />
            </div>
          </div>

          {/* BOTÓN + MENSAJES DE ESTADO */}
          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-tech"
              disabled={sending}
            >
              {sending ? "Enviando..." : "Enviar consulta"}
            </motion.button>
          </div>

          {sendStatus === "success" && (
            <p className="sm:col-span-2 text-xs text-muted">
              Tu mensaje fue enviado correctamente. Te contactaremos pronto.
            </p>
          )}
          {sendStatus === "error" && (
            <p className="sm:col-span-2 text-xs text-muted">
              Hubo un problema al enviar tu mensaje. Intenta nuevamente o escríbenos a info@conxima.com.
            </p>
          )}

          <p className="sm:col-span-2 text-xs text-muted">
            Al enviar aceptas nuestro tratamiento de datos personales.
          </p>
        </form>

              
            </div>

            <aside className="lg:col-span-2 reveal" ref={setRevealRef(13)}>
              <div className="rounded-2xl bg-card/80 p-6 ring-1 ring-white/10">
                <h3 className="type-subtitle text-xl">Contacto</h3>
                <ul className="mt-4 space-y-3 text-slate-200">
                  <li className="flex items-center gap-3">
                    <FiPhoneCall className="text-secondary" aria-hidden />
                    <a href="tel:+593939011017" className="hover:underline">
                      +593 93 901 1017
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiMail className="text-secondary" aria-hidden />
                    <a href="mailto:info@conxima.com" className="hover:underline">
                      info@conxima.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiMapPin className="text-secondary" aria-hidden />
                    Cdla. Simón Bolívar Mz.5 V.18
                  </li>
                </ul>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Redes sociales
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/conxima.ec"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook de CONXIMA"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
                    >
                      <FaFacebookF className="h-4 w-4" aria-hidden />
                    </a>
                    <a
                      href="https://www.instagram.com/conximaec/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram de CONXIMA"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
                    >
                      <FaInstagram className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>

                {/* Botón de WhatsApp en la tarjeta de contacto */}
                <div className="mt-4">
                  <InteractiveCTA className="w-full">
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="btn-tech w-full"
                      aria-label="Abrir WhatsApp con mensaje prellenado"
                    >
                      Escribir por WhatsApp 
                    </button>
                  </InteractiveCTA>
                </div>

                {/* Mapa de Google - ubicación exacta CONXIMA */}
                <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-white/10">
                  <iframe
                    title="Ubicación CONXIMA"
                    className="w-full h-[300px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=-2.15133452415466,-79.8876800537109&z=16&output=embed"
                    allowFullScreen
                  />
                </div>

                {/* Enlace para abrir la ubicación en Google Maps */}
                <div className="mt-3 text-sm">
                  <a
                    href="https://www.google.com/maps?q=-2.15133452415466,-79.8876800537109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    Abrir en Google Maps
                  </a>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <Footer />
    </div>
  );
}

type ServiceCarouselItem = {
  slug: string;
  title: string;
  legend?: string;
  desc: string;
  category: string;
  src: string;
  href?: string;
};

function ServicesCarousel({ items }: { items: ServiceCarouselItem[] }) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateMetrics = () => {
      if (!targetRef.current || !trackRef.current) return;
      const viewportWidth = targetRef.current.clientWidth;
      const trackWidth = trackRef.current.scrollWidth;
      setMaxTranslate(Math.max(0, trackWidth - viewportWidth));
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [items.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  return (
    <section ref={targetRef} className="reveal relative mt-12 h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 px-4 md:px-8 lg:px-12">
          {items.map((item) => (
            <ServiceCarouselCard key={item.slug} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCarouselCard({ item }: { item: ServiceCarouselItem }) {
  const href = item.href ?? `/servicios/${item.slug}`;

  return (
    <Link
      href={href}
      className="group relative h-[430px] w-[84vw] max-w-[360px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
      style={{
        backgroundImage: `url("${encodeURI(item.src)}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      aria-label={`Abrir: ${item.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/20 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute inset-0 z-10 flex flex-col p-6 text-white">
        <span className="w-fit rounded-full border border-[color-mix(in_srgb,var(--color-secondary)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-secondary)_18%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
          {item.category}
        </span>
        <p className="type-subtitle mt-4 text-2xl leading-tight">{item.title}</p>
        {item.legend ? (
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/65">
            {item.legend}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-slate-200">{item.desc}</p>
        <span className="mt-auto text-xs uppercase tracking-[0.14em] text-slate-200/80">
          {item.href ? "Ver sección" : "Ver servicio"}
        </span>
      </div>
    </Link>
  );
}


