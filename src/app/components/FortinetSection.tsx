// ./components/FortinetSection.tsx
import type React from "react";
import Image from "next/image";

const FORTINET_PRODUCTS = [
  {
    id: "fortigate",
    name: "FortiGate",
    tagline: "Network Security Platform",
  },
  {
    id: "fortiswitch",
    name: "FortiSwitch",
    tagline: "Secured Access Switch",
  },
  {
    id: "fortiap",
    name: "FortiAP",
    tagline: "Advanced Endpoint Protection",
  },
  {
    id: "fortiweb",
    name: "FortiWeb",
    tagline: "Web Application Firewall",
  },
  {
    id: "fortimail",
    name: "FortiMail",
    tagline: "Messaging Security Server",
  },
  {
    id: "fortianalyzer",
    name: "FortiAnalyzer",
    tagline: "Advanced Security Analytics",
  },
  {
    id: "fortimanager",
    name: "FortiManager",
    tagline: "Centralized Network Management",
  },
  {
    id: "fortisiem",
    name: "FortiSIEM",
    tagline: "Event Correlation & Risk",
  },
  {
    id: "fortiauthenticator",
    name: "FortiAuthenticator",
    tagline: "User Identity Management",
  },
  {
    id: "forticlient",
    name: "FortiClient",
    tagline: "Endpoint Threat Protection",
  },
  {
    id: "fortitoken",
    name: "FortiToken",
    tagline: "One-Time Password Token",
  },
  {
    id: "fortipam",
    name: "FortiPAM",
    tagline: "Authenticator Solutions",
  },
  {
    id: "fortiedr",
    name: "FortiEDR",
    tagline: "Endpoint Security Solutions",
  },
  {
    id: "fortisandbox",
    name: "FortiSandbox",
    tagline: "Advanced Threat Prevention",
  },
  {
    id: "fortinac",
    name: "FortiNAC",
    tagline: "Network Access Control",
  },
  {
    id: "fortiddos",
    name: "FortiDDoS",
    tagline: "DDoS Attack Mitigation",
  },
  {
    id: "forticasb",
    name: "FortiCASB",
    tagline: "Cloud Access Security Broker",
  },
  {
    id: "fortisase",
    name: "FortiSASE",
    tagline: "Secure Access Service Edge",
  },
];

export default function FortinetSection() {
  return (
    <section id="fortinet" className="section relative" data-tone="2">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* HERO FORTINET: LOGO + TEXTO */}
        <div className="rounded-3xl bg-card/80 p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/40">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            {/* Logo Fortinet protagonista */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative inline-flex items-center justify-center rounded-3xl bg-black/40 px-8 py-6 ring-1 ring-white/15">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.1),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.1),transparent_55%)]" />
                <Image
                  src="/images/fortinetlogo.png"
                  alt="Fortinet & CONXIMA"
                  width={320}
                  height={120}
                  className="relative z-10 h-auto w-auto max-h-24 object-contain"
                  priority
                />
              </div>
            </div>

            {/* Texto principal */}
            <div className="flex-1 max-w-xl text-center md:text-left">
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs tracking-wider text-white/80 ring-1 ring-inset ring-white/10">
                Ciberseguridad • Partner Fortinet
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
                Protección de clase mundial con{" "}
                <span className="text-secondary">Fortinet</span> y CONXIMA
              </h1>
              <p className="mt-3 text-slate-300">
                CONXIMA S.A.S integra soluciones de Fortinet para proteger la
                red, los usuarios y la información crítica de tu organización.
                Como partner, te acompañamos en el diseño, implementación y
                soporte de tu infraestructura de ciberseguridad.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a href="/#contacto" className="btn-tech">
                  Hablar con un asesor Fortinet
                </a>
                <span className="text-xs text-muted">
                  Implementaciones a la medida para empresas en crecimiento.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE SOLUCIONES Y BENEFICIOS */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
            <p className="mt-4 text-xs text-muted">
              *Contenido referencial. Podrás ajustar esta sección cuando definan
              la oferta completa de CONXIMA como partner Fortinet.
            </p>
          </div>

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
              <a href="/#contacto" className="btn-outline-tech inline-flex">
                Quiero evaluar mi seguridad actual
              </a>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}
