import Link from "next/link";

export const metadata = {
  title: "Servicios en la Nube — CONXIMA",
  description: "Instancias seguras, almacenamiento, backups y acceso remoto.",
};

export default function Page() {
  const planes = [
    { n: "Esencial", d: "Instancia única + backup semanal", p: "Desde $X/mes" },
    { n: "Avanzado", d: "HA + backup diario + monitoreo", p: "Desde $Y/mes" },
    { n: "Enterprise", d: "Multi-región + DR + auditoría", p: "A medida" },
  ];
  return (
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm hover:underline">← Volver</Link>
          <Link href="/#contacto" className="btn-outline-tech text-xs rounded-full px-3 py-1.5">Cotiza ahora</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Servicios en la Nube</h1>
            <p className="mt-3 text-slate-300">
              Arquitectura segura, escalable y con políticas de respaldo y recuperación probadas.
            </p>
            <ul className="mt-5 space-y-2 text-slate-200">
              <li>• Endurecimiento y acceso seguro</li>
              <li>• Backups automáticos + pruebas de restauración</li>
              <li>• Monitoreo y alertas</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img src="/images/servicios/nube.jpg" alt="Servicios en la Nube" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {planes.map((p, i) => (
            <div key={i} className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">
              <div className="font-heading text-xl">{p.n}</div>
              <div className="text-slate-300">{p.d}</div>
              <div className="mt-2 text-secondary">{p.p}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn-tech" href="/#contacto">Solicitar asesoría</Link>
          <Link className="btn-outline-tech" href="/#servicios">Ver otros servicios</Link>
        </div>
      </section>
    </main>
  );
}
