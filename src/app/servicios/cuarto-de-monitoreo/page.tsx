import Link from "next/link";

export const metadata = {
  title: "Cuarto de Monitoreo — CONXIMA",
  description: "Diseño de sala, NVR/VMS, cableado ordenado y capacitación de operadores.",
};

export default function Page() {
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
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Cuarto de Monitoreo</h1>
            <p className="mt-3 text-slate-300">
              Diseño técnico, ergonomía, NVR/VMS, segmentación de red y playbooks operativos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-xs">Ergonomía</span>
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-xs">Seguridad de red</span>
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-xs">Procedimientos</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img src="/images/servicios/monitoreo.jpg" alt="Cuarto de Monitoreo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {["Layout y cableado ordenado", "VMS/NVR con retención adecuada", "Hardening y VLANs", "Formación de operadores"].map((x, i) => (
            <div key={i} className="rounded-xl bg-card/80 p-5 ring-1 ring-white/10">{x}</div>
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
