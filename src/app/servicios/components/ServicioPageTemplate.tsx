import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { getServicioBySlug, getServicioNavigation } from "@/data/servicios";

export function buildServicioMetadata(slug: string): Metadata {
  const servicio = getServicioBySlug(slug);

  if (!servicio) {
    return {
      title: "Servicio | CONXIMA",
      description: "Detalle del servicio de CONXIMA"
    };
  }

  return {
    title: `${servicio.pageTitle ?? servicio.title} | CONXIMA`,
    description: servicio.detalle.queHace
  };
}

export function ServicioPageTemplate({ slug }: { slug: string }) {
  const servicio = getServicioBySlug(slug);

  if (!servicio) {
    notFound();
  }

  const nav = getServicioNavigation(slug);
  const heading = servicio.pageTitle ?? servicio.title;
  const imageSrc = servicio.imagen ? encodeURI(servicio.imagen) : null;

  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white">
            Servicios
          </Link>
          <span>/</span>
          <span className="text-slate-200">{heading}</span>
        </div>

        <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--color-card)]/80 shadow-[0_24px_72px_rgba(0,0,0,0.32)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />

          <div className="relative grid grid-cols-1 gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70">
                Solución especializada CONXIMA
              </span>

              <h1 className="type-title mt-5 max-w-3xl text-3xl md:text-5xl">
                {heading}
              </h1>

              <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
                {servicio.resumen}
              </p>

              {servicio.badges?.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {servicio.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-100 backdrop-blur"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/#contacto" className="btn-tech rounded-xl px-5 py-3">
                  Solicitar cotización
                </a>
                <a
                  className="btn-outline-tech rounded-xl px-5 py-3"
                  href="mailto:arivera@conxima.com,rguambo@conxima.com?subject=Cotizacion%20-%20Conxima"
                >
                  Solicitar por email
                </a>
              </div>
            </div>

            {imageSrc ? (
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/25 p-3">
                <div className="relative min-h-[320px] overflow-hidden rounded-[1.2rem]">
                  <Image
                    src={imageSrc}
                    alt={heading}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/20 to-transparent" />

                  <div className="absolute inset-x-4 bottom-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                        Qué resuelve
                      </p>
                      <p className="mt-1 text-sm text-white">
                        {servicio.detalle.queHace}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                        Incluye
                      </p>
                      <p className="mt-1 text-sm text-white">
                        {servicio.detalle.incluye.length} componentes y entregables clave.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <article className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_20px_48px_rgba(0,0,0,0.2)] md:p-8">
            <h2 className="font-heading text-xl font-medium uppercase tracking-[0.14em] text-white/90">
              Qué resuelve este servicio
            </h2>

            <p className="mt-4 text-lg text-white">{servicio.detalle.queHace}</p>

            <div className="mt-5 space-y-4 text-slate-300">
              {servicio.detalle.descripcion.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/15 p-5 md:p-6">
              <h3 className="type-subtitle text-lg">Qué incluye</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {servicio.detalle.incluye.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <h3 className="type-subtitle text-xl">Beneficios operativos</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {servicio.detalle.beneficios.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-secondary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-[var(--color-card)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <h3 className="type-subtitle text-xl">Ideal para</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {servicio.detalle.idealPara.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <p className="text-xs uppercase tracking-[0.16em] text-white/65">
                Hablemos de tu proyecto
              </p>
              <h3 className="type-subtitle mt-3 text-xl">
                Diseñamos la solución con alcance técnico claro y acompañamiento local.
              </h3>
              <p className="mt-3 text-sm text-slate-200">
                Si ya tienes planos, requerimientos o una idea inicial, podemos
                ayudarte a aterrizar la implementación y definir el siguiente paso.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a href="/#contacto" className="btn-tech rounded-xl px-4 py-3 text-center">
                  Ir al formulario
                </a>
                <a
                  className="btn-outline-tech rounded-xl px-4 py-3 text-center"
                  href="https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20mas%20informacion%20sobre%20este%20servicio."
                  target="_blank"
                  rel="noreferrer"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {nav.previous ? (
            <Link
              href={`/servicios/${nav.previous.slug}`}
              className="rounded-2xl border border-white/10 bg-[var(--color-card)]/80 p-5 transition hover:border-white/20"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Servicio anterior
              </p>
              <p className="mt-1 font-semibold text-white">{nav.previous.title}</p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[var(--color-card)]/80 p-5 text-slate-500">
              Primer servicio del catálogo
            </div>
          )}

          {nav.next ? (
            <Link
              href={`/servicios/${nav.next.slug}`}
              className="rounded-2xl border border-white/10 bg-[var(--color-card)]/80 p-5 transition hover:border-white/20"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Siguiente servicio
              </p>
              <p className="mt-1 font-semibold text-white">{nav.next.title}</p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[var(--color-card)]/80 p-5 text-slate-500">
              Último servicio del catálogo
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
