import "./globals.css";
import type { Metadata } from "next";
import RouteTransition from "./RouteTransition";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CONXIMA Ecuador: Seguridad y conectividad para empresas",
  description:
    "Soluciones integrales en telecomunicaciones, redes, ciberseguridad y seguridad electrónica para empresas en Ecuador.",
  applicationName: SITE_NAME,
  keywords: [
    "seguridad electrónica en Ecuador",
    "telecomunicaciones para empresas",
    "infraestructura de red",
    "ciberseguridad",
    "CONXIMA"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "CONXIMA Ecuador: Seguridad y conectividad para empresas",
    description:
      "Soluciones integrales en telecomunicaciones, redes, ciberseguridad y seguridad electrónica para empresas en Ecuador.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CONXIMA Ecuador: Seguridad y conectividad para empresas",
    description:
      "Soluciones integrales en telecomunicaciones, redes, ciberseguridad y seguridad electrónica para empresas en Ecuador.",
    images: [DEFAULT_OG_IMAGE]
  },
  icons: {
    icon: [
      { url: "/images/logo-conxima.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-conxima.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-conxima.svg", type: "image/svg+xml" }
    ],
    shortcut: "/images/logo-conxima.png",
    apple: "/images/logo-conxima.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased bg-[var(--app-bg)] text-[var(--app-fg)]">
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
