import Link from "next/link";

export const metadata = {
  title: "Control de Acceso Biométrico — CONXIMA",
  description: "Lectores biométricos, faciales y tarjetas con integración a software de gestión.",
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

      <section className="relative overflow-hidden reveal">
        <img src="/images/servicios/acceso.jpg" alt="Control de Acceso" className="h-72 md:h-96 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Control de Acceso Biométrico</h1>
          <p className="mt-2 max-w-3xl text-slate-300">
            Lectores de huella, reconocimiento facial y tarjetas. Gestión centralizada y auditorías.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/10">Huella</span>
            <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/10">Facial</span>
            <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/10">Tarjetas</span>
            <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/10">API / Integraciones</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 reveal">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold">Beneficios</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-4">
          {[
            "Control granular por horarios, áreas y roles",
            "Reportes y auditoría de eventos",
            "Escalabilidad por sedes y niveles",
            "Integración con CCTV y alarmas",
          ].map((b, i) => (
            <li key={i} className="rounded-2xl bg-card/80 p-5 ring-1 ring-white/10">{b}</li>
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
