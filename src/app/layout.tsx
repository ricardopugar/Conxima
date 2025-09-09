import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import RouteTransition from "./RouteTransition";

export const metadata: Metadata = {
  title: "CONXIMA S.A.S",
  description: "Tecnología al servicio de tu Seguridad y Conectividad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Suspense>
          <RouteTransition>{children}</RouteTransition>
        </Suspense>
      </body>
    </html>
  );
}
