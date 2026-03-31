import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { servicios } from "@/data/servicios";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de seguridad, redes y conectividad | CONXIMA",
  description:
    "Catálogo de servicios de infraestructura de red, cableado estructurado, fibra óptica, ciberseguridad y seguridad electrónica para empresas en Ecuador.",
  path: "/servicios",
  keywords: [
    "servicios tecnológicos para empresas en Ecuador",
    "cableado estructurado en Ecuador",
    "infraestructura de red en Guayaquil",
    "seguridad electrónica y telecomunicaciones",
    "ciberseguridad CONXIMA"
  ]
});

export default function ServiciosPage() {
  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-200">Servicios</span>
        </div>

        <header className="mt-5">
          <h1 className="type-title text-3xl md:text-5xl">
            Servicios de seguridad, redes y conectividad
          </h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Acompañamos proyectos de infraestructura de red, cableado
            estructurado, fibra óptica, ciberseguridad y seguridad electrónica
            para empresas en Guayaquil y Ecuador.
          </p>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicios.map((servicio) => (
            <article
              key={servicio.slug}
              className="overflow-hidden rounded-2xl bg-[var(--color-card)] ring-1 ring-white/10 transition hover:ring-white/20"
            >
              {servicio.imagen ? (
                <div className="relative h-44 w-full">
                  <Image
                    src={encodeURI(servicio.imagen)}
                    alt={`Servicio de ${servicio.title} de CONXIMA`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ) : null}

              <div className="p-5">
                <h2 className="font-heading text-xl font-medium tracking-wide">
                  {servicio.title}
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  {servicio.resumen}
                </p>

                <Link
                  href={`/servicios/${servicio.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-secondary)] hover:underline"
                >
                  Ver detalle
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
