import type { Metadata } from "next";

import CybersecurityOverview from "../components/CybersecurityOverview";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Ciberseguridad | CONXIMA",
  description:
    "Servicios y soluciones de ciberseguridad de CONXIMA para proteger redes, usuarios, datos y continuidad operativa."
};

export default function CybersecurityPage() {
  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Navbar />
      <CybersecurityOverview />
      <Footer />
    </div>
  );
}
