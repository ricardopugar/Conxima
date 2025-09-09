import { notFound } from "next/navigation";
import Link from "next/link";
import { servicios } from "../../../data/servicios";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = servicios.find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: `${s.title} — CONXIMA`,
    description: s.resumen,
    alternates: { canonical: `/servicios/${s.slug}` },
  };
}

export default function ServicioPage({ params }: Props) {
  const s = servicios.find((x) => x.slug === params.slug);
  if (!s) notFound();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm hover:underline">
            ← Volver al inicio
          </Link>
          <Link href="/#contacto" className="btn-outline-tech text-xs rounded-full px-3 py-1.5">
            Cotiza ahora
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        {s.cover ? (
          <img src={s.cover} alt={s.title} className="h-64 md:h-80 w-full object-cover opacity-80" />
        ) : (
          <div className="h-56 md:h-72 bg-gradient-to-r from-primary/30 to-primary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{s.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-300">{s.resumen}</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">¿Qué incluye?</h2>
        <ul className="mt-4 grid gap-3">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-black text-xs">
                ✓
              </span>
              <span className="text-slate-200">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#contacto" className="btn-tech">
            Solicitar asesoría
          </Link>
          <Link href="/#servicios" className="btn-outline-tech">
            Ver otros servicios
          </Link>
        </div>
      </main>
    </div>
  );
}
