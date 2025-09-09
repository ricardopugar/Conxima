import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import RouteTransition from "./RouteTransition";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CONXIMA S.A.S — Seguridad y Conectividad",
  description:
    "Soluciones integrales en telecomunicaciones y seguridad electrónica. Diseño, instalación y mantenimiento con profesionales certificados.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}