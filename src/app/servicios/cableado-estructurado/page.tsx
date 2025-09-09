import Link from "next/link";

export const metadata = {
  title: "Cableado Estructurado — CONXIMA",
  description: "Planificación, canalización, racks, certificación y documentación.",
};

export default function Page() {
  const pasos = [
    { t: "Levantamiento & Diseño", d: "Planos, cálculo de puntos y rutas." },
    { t: "Canalización & Tendido", d: "Canaletas, bandejas, etiquetado." },
    { t: "Racks & Patch Panels", d: "Organización y gestión de cable." },
    { t: "Certificación & Entrega", d: "Pruebas, planos As-Built y manual." },
  ];
  return (
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm hover:underline">← Volver</Link>
          <Link href="/#contacto" className="btn-outline-tech text-xs rounded-full px-3 py-1.5">Cotiza ahora</Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="h-56 md:h-72 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(600px_300px_at_70%_30%,rgba(0,0,0,.08),transparent_40%)]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Cableado Estructurado</h1>
          <p className="mt-2 max-w-3xl text-slate-300">Ejecución ordenada, certificada y documentada para escalar sin dolores.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <ol className="relative border-l border-white/10 pl-6 space-y-6">
          {pasos.map((p, i) => (
            <li key={i}>
              <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-secondary" />
              <h3 className="font-heading font-semibold">{p.t}</h3>
              <p className="text-slate-300">{p.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn-tech" href="/#contacto">Solicitar asesoría</Link>
          <Link className="btn-outline-tech" href="/#servicios">Ver otros servicios</Link>
        </div>
      </section>
    </main>
  );
}
