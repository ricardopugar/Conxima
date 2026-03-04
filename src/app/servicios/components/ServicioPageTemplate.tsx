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
    title: `${servicio.title} | CONXIMA`,
    description: servicio.detalle.queHace
  };
}

export function ServicioPageTemplate({ slug }: { slug: string }) {
  const servicio = getServicioBySlug(slug);

  if (!servicio) {
    notFound();
  }

  const nav = getServicioNavigation(slug);

  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white">
            Servicios
          </Link>
          <span>/</span>
          <span className="text-slate-200">{servicio.title}</span>
        </div>

        <header className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="type-title text-3xl md:text-4xl">{servicio.title}</h1>
            <p className="mt-2 max-w-2xl text-slate-300">{servicio.resumen}</p>
          </div>

          <Link href="/#contacto" className="btn-tech rounded-xl px-4 py-2">
            Solicitar cotizacion
          </Link>
        </header>

        {servicio.imagen && (
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src={servicio.imagen}
              alt={servicio.title}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="rounded-2xl bg-[var(--color-card)] p-6 ring-1 ring-white/10 lg:col-span-2">
            <h2 className="font-heading text-xl font-medium tracking-wide uppercase">Que hace este servicio</h2>
            <p className="mt-3 text-slate-300">{servicio.detalle.queHace}</p>

            <h3 className="type-subtitle mt-7 text-lg">Alcance del servicio</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
              {servicio.detalle.alcance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <aside className="rounded-2xl bg-[var(--color-card)] p-6 ring-1 ring-white/10">
            <h3 className="type-subtitle">Beneficios esperados</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
              {servicio.detalle.beneficios.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <Link href="/#contacto" className="btn-tech rounded-xl px-4 py-2 text-center">
                Formulario de contacto
              </Link>
              <a
                className="btn-outline-tech rounded-xl px-4 py-2 text-center"
                href="mailto:arivera@conxima.com,rguambo@conxima.com?subject=Cotizacion%20-%20Conxima"
              >
                Solicitar por email
              </a>
            </div>
          </aside>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {nav.previous ? (
            <Link
              href={`/servicios/${nav.previous.slug}`}
              className="rounded-2xl bg-[var(--color-card)] p-5 ring-1 ring-white/10 transition hover:ring-white/20"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">Servicio anterior</p>
              <p className="mt-1 font-semibold text-white">{nav.previous.title}</p>
            </Link>
          ) : (
            <div className="rounded-2xl bg-[var(--color-card)] p-5 text-slate-500 ring-1 ring-white/10">
              Primer servicio del catalogo
            </div>
          )}

          {nav.next ? (
            <Link
              href={`/servicios/${nav.next.slug}`}
              className="rounded-2xl bg-[var(--color-card)] p-5 ring-1 ring-white/10 transition hover:ring-white/20"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">Siguiente servicio</p>
              <p className="mt-1 font-semibold text-white">{nav.next.title}</p>
            </Link>
          ) : (
            <div className="rounded-2xl bg-[var(--color-card)] p-5 text-slate-500 ring-1 ring-white/10">
              Ultimo servicio del catalogo
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
