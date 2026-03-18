// src/app/ciberseguridad/fortinet/page.tsx
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FortinetSection from "../../components/FortinetSection";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "FortiGate y Fortinet | CONXIMA",
  description:
    "Soluciones FortiGate con CONXIMA para proteger redes empresariales, controlar el trafico y fortalecer la ciberseguridad."
};

export default function FortinetPage() {
  return (
    <div className="app min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      <Navbar />
      <main>
        <FortinetSection />
      </main>
      <Footer />
    </div>
  );
}
