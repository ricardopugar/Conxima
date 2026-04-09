import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiEye,
  FiMail,
  FiMapPin,
  FiWatch
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

export type CatalogItem = {
  slug: string;
  title: string;
  resumen: string;
  imagen?: string;
  href?: string;
  ctaLabel?: string;
};

const CONXIMA_WHATSAPP_URL =
  "https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20solicitar%20asesoria.";

type GridEntry =
  | { kind: "title" }
  | { kind: "contact" }
  | { kind: "coverage" }
  | { kind: "service"; item: CatalogItem };

export default function ServiciosBentoCatalog({
  items
}: {
  items: CatalogItem[];
}) {
  const entries: GridEntry[] = [
    { kind: "title" },
    { kind: "service", item: items[0] },
    { kind: "service", item: items[1] },
    { kind: "contact" },
    { kind: "service", item: items[2] },
    { kind: "service", item: items[3] },
    { kind: "coverage" },
    ...items.slice(4).map((item) => ({ kind: "service", item }) satisfies GridEntry)
  ];

  const rows = chunk(entries, 3);

  return (
    <section className="mt-10 bg-neutral-900 p-3 text-neutral-50 sm:p-4 md:p-8">
      <div className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden">
        {entries.map((entry, index) => (
          <div
            key={`mobile-entry-${index}`}
            className="min-h-[20rem] w-[84vw] max-w-[22rem] shrink-0 snap-center"
          >
            {renderEntry(entry)}
          </div>
        ))}
      </div>

      <div className="hidden md:block">
      {rows.map((row, index) => (
        <div
          key={`row-${index}`}
          className={`mx-auto grid max-w-6xl grid-cols-1 divide-y divide-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0 ${
            index === 0
              ? "border border-neutral-700"
              : "border-x border-b border-neutral-700"
          }`}
        >
          {row.map((entry, entryIndex) => (
            <div
              key={`entry-${index}-${entryIndex}`}
              className="min-h-[18rem] sm:min-h-[19rem] md:min-h-[22rem] lg:min-h-[23rem]"
            >
              {renderEntry(entry)}
            </div>
          ))}
        </div>
      ))}
      </div>
    </section>
  );
}

function renderEntry(entry: GridEntry) {
  switch (entry.kind) {
    case "title":
      return <TitleCard />;
    case "contact":
      return <ContactCard />;
    case "coverage":
      return <CoverageCard />;
    case "service":
      return <ServiceCard item={entry.item} />;
    default:
      return null;
  }
}

function TitleCard() {
  return (
    <Link
      href="/#contacto"
      className="group relative flex h-full flex-col justify-between overflow-hidden bg-neutral-950 p-5 sm:p-6 md:p-9"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_34%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div>
        <p className="relative z-10 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
          Catálogo CONXIMA
        </p>
        <h1 className="relative z-10 mt-4 max-w-[11ch] text-3xl uppercase leading-[1.02] sm:text-4xl">
          <span className="text-neutral-400 transition-colors duration-500 group-hover:text-[var(--color-secondary)]">
            Infra- <br></br>
            estructura
          </span>
          <br />
          Seguridad y red
        </h1>
        <p className="relative z-10 mt-4 max-w-sm text-sm leading-6 text-neutral-400 transition-colors duration-500 group-hover:text-neutral-200">
          Infraestructura de red, CCTV, ciberseguridad, puntos de datos y más
          soluciones para empresas en Guayaquil y Ecuador.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-[11px] uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
        <FiBookOpen className="text-base" />
        <span>Ir al contacto comercial</span>
      </div>

      <FiArrowUpRight className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors duration-500 group-hover:text-[var(--color-secondary)]" />
    </Link>
  );
}

function ContactCard() {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,rgba(7,17,28,1),rgba(5,42,59,0.95))] p-5 sm:p-6 md:p-9">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_34%)]" />
      <div>
        <p className="relative z-10 text-[11px] uppercase tracking-[0.24em] text-neutral-400">
          Hablemos
        </p>
        <h2 className="relative z-10 mt-4 max-w-[14ch] text-2xl leading-tight sm:text-3xl">
          Recibe una recomendación comercial clara para tu proyecto.
        </h2>
      </div>

      <div className="relative z-10 mt-6 space-y-3">
        <a
          href="mailto:info@conxima.com"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <FiMail className="h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
            <span className="truncate">info@conxima.com</span>
          </span>
          <FiArrowRight className="h-4 w-4 shrink-0" />
        </a>
        <a
          href={CONXIMA_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <FaWhatsapp className="h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
            WhatsApp comercial
          </span>
          <FiArrowRight className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}

function CoverageCard() {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden bg-neutral-900 p-5 sm:p-6 md:p-9">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%)]" />
      <div className="relative z-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--color-secondary)]">
          <FiMapPin className="text-xl" />
        </div>
        <h2 className="mt-6 max-w-[12ch] text-2xl leading-tight sm:text-3xl">
          Guayaquil, Ecuador
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-neutral-400">
          Implementacion, soporte y acompanamiento local para empresas que
          necesitan seguridad, conectividad y continuidad operativa.
        </p>
      </div>

      <div className="relative z-10 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
        Cobertura local CONXIMA
      </div>
    </div>
  );
}

function ServiceCard({ item }: { item: CatalogItem }) {
  const href = item.href ?? `/servicios/${item.slug}`;
  const metaLabel = getMetaLabel(item.slug);
  const ctaLabel =
    item.ctaLabel ??
    (item.slug === "cableado-estructurado"
      ? "Solicitar diagnostico de red"
      : item.slug === "cableado-fibra-optica"
        ? "Cotizar fibra optica"
        : "Ver detalle");

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col justify-end overflow-hidden bg-neutral-900 p-5 transition-colors hover:bg-neutral-950 sm:p-6 md:p-9"
    >
      <div className="absolute left-3 top-4 z-10 flex max-w-[calc(100%-5rem)] items-center gap-1.5 text-[11px] uppercase text-neutral-300 transition-colors duration-500 group-hover:text-neutral-50 sm:left-5 sm:top-5">
        <FiWatch className="text-base" />
        <span className="truncate">{metaLabel}</span>
      </div>

      <div className="relative z-10 mt-auto pr-8 transition-transform duration-500 group-hover:-translate-y-3 sm:pr-10">
        <h2 className="max-w-[12ch] text-xl leading-[1.06] text-white sm:text-2xl md:max-w-[13ch] md:text-[2rem]">
          {item.title}
        </h2>
        <p className="mt-3 max-w-[28ch] text-sm leading-6 text-neutral-200/85 transition-colors duration-500 group-hover:text-neutral-50">
          {item.resumen}
        </p>
        <div className="mt-5 inline-flex max-w-full items-center gap-2 text-sm font-medium text-[var(--color-secondary)]">
          <span className="truncate">{ctaLabel}</span>
          <FiArrowUpRight className="h-4 w-4 shrink-0" />
        </div>
      </div>

      <FiEye className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50" />

      {item.imagen ? (
        <>
          <div
            className="absolute inset-0 scale-[1.02] opacity-[0.34] transition-all duration-500 group-hover:scale-[1.06] group-hover:opacity-[0.52]"
            style={{
              backgroundImage: `url(${encodeURI(item.imagen)})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.42)_38%,rgba(10,10,10,0.86)_74%,rgba(10,10,10,0.96))]" />
        </>
      ) : null}

      <Corners />
    </Link>
  );
}

function Corners() {
  return (
    <>
      <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
      <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-[var(--color-secondary)] transition-all duration-500 group-hover:scale-100" />
    </>
  );
}

function getMetaLabel(slug: string) {
  const map: Record<string, string> = {
    "cableado-estructurado": "Infraestructura",
    cctv: "Videovigilancia",
    ciberseguridad: "Proteccion digital",
    "puntos-de-datos": "Conectividad",
    "control-de-acceso": "Seguridad fisica",
    "sistemas-de-alarma": "Alertamiento",
    "cuarto-de-monitoreo": "Operacion central",
    "cableado-fibra-optica": "Backbone",
    "servicios-en-la-nube": "Cloud"
  };

  return map[slug] ?? "Servicio";
}

function chunk<T>(items: T[], size: number) {
  const rows: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }

  return rows;
}
