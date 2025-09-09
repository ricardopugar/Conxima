import Link from "next/link";

export const metadata = {
  title: "Racks y Gabinetes — CONXIMA",
  description: "Montaje seguro, ventilación, orden y espacio para crecimiento.",
};

export default function Page() {
  const kpis = [
    { k: "U instaladas", v: "42U / 24U / 12U" },
    { k: "Gestión térmica", v: "Optimizada" },
    { k: "Orden & labeling", v: "100%" },
  ];
  return (
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm hover:underline">← Volver</Link>
          <Link href="/#contacto" className="btn-outline-tech text-xs rounded-full px-3 py-1.5">Cotiza ahora</Link>
        </div>
      </header>

      <section className="relative">
        <div className="h-56 md:h-72 bg-gradient-to-br from-primary/30 via-transparent to-primary/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Racks y Gabinetes</h1>
          <p className="mt-2 max-w-3xl text-slate-300">Estandarizamos tu infraestructura para mantener orden, seguridad y expansión futura.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {kpis.map((x, i) => (
            <div key={i} className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
              <div className="text-sm text-muted">{x.k}</div>
              <div className="text-xl font-heading">{x.v}</div>
            </div>
          ))}
        </div>

        <ul className="mt-8 grid sm:grid-cols-2 gap-4">
          {[
            "Selección de gabinetes y accesorios",
            "Organización de patch cords",
            "Seguridad física y acceso",
            "Plan de crecimiento",
          ].map((x, i) => (
            <li key={i} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">{x}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn-tech" href="/#contacto">Solicitar asesoría</Link>
          <Link className="btn-outline-tech" href="/#servicios">Ver otros servicios</Link>
        </div>
      </section>
    </main>
  );
}
