// src/app/ciberseguridad/fortinet/page.tsx
import Navbar from "../../components/Navbar";
import FortinetSection from "../../components/FortinetSection";
import Footer from "../../components/Footer";

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
