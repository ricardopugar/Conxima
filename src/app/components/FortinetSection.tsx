// src/app/components/FortinetSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function FortinetSection() {
  return (
    <section id="fortinet" className="section relative" data-tone="2">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* HERO FORTINET: LOGO + TEXTO */}
        <div className="rounded-3xl bg-card/80 p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/40">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            {/* 1. COLUMNA LOGO (Modificada para máximo tamaño) */}
            <div className="flex flex-1 items-center justify-center w-full">
              <div className="inline-flex items-center justify-center px-0 md:pr-10 border-r border-white/25 w-full">
                <Image
                  src="/images/fortinetlogo.png"
                  alt="Fortinet & CONXIMA"
                  width={900}
                  height={320}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* 2. COLUMNA TEXTO */}
            <div className="flex-1 max-w-xl text-center md:text-left">
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Ciberseguridad • Partner Fortinet
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
                Protección de clase mundial con{" "}
                <span className="text-secondary">Fortinet</span>
              </h1>

              {/* Frase + sticker de especialistas */}
              <div className="mt-2 inline-flex items-center justify-center gap-2 md:justify-start">
                <p className="mt-2 text-lg font-bold tracking-wide text-secondary">
                  Especialistas de Seguridad IT Certificados
                </p>
                {/* Sticker / logo al lado de la frase */}
                <span
                  className="
                    inline-flex h-6 w-6 items-center justify-center
                    rounded-full border border-[var(--color-secondary)]/60
                    bg-[color-mix(in_srgb,var(--color-secondary)_18%,transparent)]
                    text-[var(--color-secondary)]
                    shadow-sm shadow-black/40
                  "
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3 5 6v6c0 4.243 2.686 6.878 7 9 4.314-2.122 7-4.757 7-9V6l-7-3Z"
                      fill="currentColor"
                      opacity="0.18"
                    />
                    <path
                      d="M12 3 5 6v6c0 4.243 2.686 6.878 7 9 4.314-2.122 7-4.757 7-9V6l-7-3Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="m9.5 11.8 1.9 1.9 3.6-3.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-3 text-slate-300">
                CONXIMA integra soluciones de Fortinet para proteger la
                red, los usuarios y la información crítica de tu organización.
                Como partner, te acompañamos en el diseño, implementación y
                soporte de tu infraestructura de ciberseguridad.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Link href="/#contacto" className="btn-tech">
                  ¡Quiero proteger mi empresa!
                </Link>
                <span className="text-xs text-muted">
                  Implementaciones a la medida para empresas en crecimiento.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE SOLUCIONES Y BENEFICIOS */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Soluciones */}
          <div className="rounded-2xl bg-card/80 p-6 ring-1 ring-white/10">
            <h2 className="font-heading text-xl font-semibold">
              Soluciones que podemos ofrecerte
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Firewalls de próxima generación (NGFW).</li>
              <li>• SD-WAN segura para múltiples sedes.</li>
              <li>• Protección perimetral y segmentación de red.</li>
              <li>• Seguridad para VPN de usuarios remotos.</li>
              <li>• Integración con servicios en la nube.</li>
              <li>• Monitoreo y soporte continuo a tu plataforma.</li>
            </ul>
          </div>

          {/* Beneficios */}
          <div className="rounded-2xl bg-card/80 p-6 ring-1 ring-white/10">
            <h2 className="font-heading text-xl font-semibold">
              Beneficios para tu empresa
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Visibilidad completa de lo que sucede en tu red.</li>
              <li>• Reducción de riesgos de ataques y brechas.</li>
              <li>• Cumplimiento más sencillo de normativas y auditorías.</li>
              <li>• Infraestructura preparada para crecer contigo.</li>
              <li>• Acompañamiento local y soporte de CONXIMA.</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/#contacto"
                className="btn-outline-tech inline-flex"
              >
                ¡Quiero evaluar mi seguridad actual!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
