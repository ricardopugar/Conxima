// src/app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-400 md:flex-row">
        <p>© {year} CONXIMA S.A.S · Todos los derechos reservados</p>

        <nav className="flex items-center gap-5">
          <Link href="/#inicio" className="hover:text-white">
            Inicio
          </Link>
          <Link href="/#quienes" className="hover:text-white">
            Quiénes somos
          </Link>
          <Link href="/#servicios" className="hover:text-white">
            Servicios
          </Link>
          <Link href="/#porque" className="hover:text-white">
            Por qué nosotros
          </Link>
          <Link href="/#contacto" className="hover:text-white">
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  );
}
