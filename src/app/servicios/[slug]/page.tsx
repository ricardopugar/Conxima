import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { servicios } from "@/data/servicios";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const svc = servicios.find((s) => s.slug === params.slug);
  const title = svc ? `${svc.title} | CONXIMA` : "Servicio | CONXIMA";
  const description = svc?.resumen ?? "Detalle del servicio de CONXIMA";
  return { title, description };
}

export default function ServicioPage({ params }: Props) {
  const svc = servicios.find((s) => s.slug === params.slug);

  if (!svc) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-20">
        <h1 className="text-2xl font-semibold">Servicio no encontrado</h1>
        <p className="mt-3 text-slate-500">El servicio solicitado no existe.</p>
        <Link href="/#servicios" className="mt-6 inline-block underline">
          Volver a servicios
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Link href="/#servicios" className="text-sm text-slate-400 hover:underline">
        ← Volver
      </Link>

      <header className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{svc.title}</h1>
          <p className="mt-2 text-slate-500 max-w-2xl">{svc.resumen}</p>
        </div>
        <Link href="/#contacto" className="btn-tech rounded-xl px-4 py-2">
          Solicitar cotización
        </Link>
      </header>

      {svc.imagen && (
        <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-black/10">
          <Image
            src={svc.imagen}
            alt={svc.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Aquí puedes ampliar el contenido específico de cada servicio */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="lg:col-span-2 rounded-2xl bg-[var(--color-card)] p-6 ring-1 ring-white/10">
          <h2 className="text-xl font-semibold">¿Qué incluye?</h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-300">
            <li>Levantamiento técnico y diseño de la solución.</li>
            <li>Instalación, configuración y pruebas de funcionamiento.</li>
            <li>Documentación y capacitación al usuario.</li>
            <li>Garantía y soporte postventa.</li>
          </ul>
        </article>

        <aside className="rounded-2xl bg-[var(--color-card)] p-6 ring-1 ring-white/10">
          <h3 className="font-semibold">Contacto</h3>
          <p className="mt-2 text-slate-300">
            ¿Listo para cotizar {svc.title}? Escríbenos.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a className="btn-tech rounded-xl px-4 py-2 text-center" href="/#contacto">Formulario</a>
            <a className="btn-outline-tech rounded-xl px-4 py-2 text-center" href="mailto:arivera@conxima.com,rguambo@conxima.com?subject=Cotización%20-%20Conxima">
              Email
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
