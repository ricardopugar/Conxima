import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const CONXIMA_WHATSAPP_URL =
  "https://wa.me/593939011017?text=Hola%20CONXIMA%2C%20quiero%20solicitar%20asesor%C3%ADa.";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-400 md:flex-row">
        <p className="text-center md:text-left">
          &copy; {year} CONXIMA S.A.S · Todos los derechos reservados
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
          <a href="/#inicio" className="hover:text-white">
            Inicio
          </a>
          <a href="/#quienes" className="hover:text-white">
            Quiénes somos
          </a>
          <Link href="/servicios" className="hover:text-white">
            Servicios
          </Link>
          <Link href="/ciberseguridad" className="hover:text-white">
            Ciberseguridad
          </Link>
          <a href="/#porque" className="hover:text-white">
            Por qué nosotros
          </a>
          <a href="/#contacto" className="hover:text-white">
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/conxima.ec"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de CONXIMA"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
          >
            <FaFacebookF className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={CONXIMA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de CONXIMA"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="https://www.instagram.com/conximaec/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de CONXIMA"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
          >
            <FaInstagram className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
