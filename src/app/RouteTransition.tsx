"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    // Scroll al tope en cada navegación
    try { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); } catch {}

    if (!pageRef.current) return;
    clearTimers();

    const nodes = Array.from(
      pageRef.current.querySelectorAll<HTMLElement>(".reveal")
    );

    if (nodes.length === 0) return;

    // Resetea para re-revelar
    nodes.forEach((el) => el.classList.remove("reveal-in"));

    if (reduceMotion) {
      requestAnimationFrame(() => nodes.forEach((el) => el.classList.add("reveal-in")));
      return;
    }

    // Stagger suave
    const baseDelay = 120; // ms
    const step = 90;       // ms
    nodes.forEach((el, i) => {
      const id = window.setTimeout(() => {
        void el.offsetHeight; // fuerza reflow
        el.classList.add("reveal-in");
      }, baseDelay + i * step);
      timers.current.push(id);
    });

    return () => clearTimers();
  }, [pathname, reduceMotion]);

  const durationIn  = reduceMotion ? 0 : 0.22;
  const durationOut = reduceMotion ? 0 : 0.16;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        ref={pageRef}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: durationIn, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -8, transition: { duration: durationOut, ease: [0.65, 0, 0.35, 1] } }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
