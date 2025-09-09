import Link from "next/link";

export const metadata = {
  title: "Sistemas de Alarma — CONXIMA",
  description: "Perímetro, intrusión, armado/desarmado remoto y monitoreo móvil.",
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

      <section className="relative isolate overflow-hidden">
        <div className="h-56 md:h-72 w-full bg-gradient-to-r from-primary/30 to-primary/10" />
        <svg className="absolute inset-0 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs><pattern id="g" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 8h8M8 0v8" stroke="currentColor" strokeWidth="0.2" />
          </pattern></defs>
          <rect width="100" height="100" fill="url(#g)" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 translate-y-1/2">
          <div className="rounded-2xl bg-card/90 p-6 ring-1 ring-white/10 backdrop-blur">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Sistemas de Alarma</h1>
            <p className="mt-2 text-slate-300">Protección perimetral y de intrusión con app móvil y automatizaciones.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 pb-12">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">Incluye</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {["Sensores perimetrales", "PIR y magnéticos", "Sirenas y estrobos", "Automatizaciones", "Notificaciones móviles", "Integración con monitoreo"].map((x, i) => (
            <div key={i} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">{x}</div>
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
