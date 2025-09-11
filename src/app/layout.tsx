import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "CONXIMA S.A.S",
  description: "Soluciones integrales en telecomunicaciones y seguridad electrónica.",
  icons: {
    icon: [
      { url: "/images/logo-conxima.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-conxima.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-conxima.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/logo-conxima.png",
    apple: "/images/logo-conxima.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased bg-[var(--app-bg)] text-[var(--app-fg)]`}
      >
        {children}
      </body>
    </html>
  );
}
