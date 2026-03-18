"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timerId) => window.clearTimeout(timerId));
    timers.current = [];
  };

  useEffect(() => {
    clearTimers();

    const behavior = reduceMotion ? "auto" : "smooth";
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));

    if (hash) {
      const hashTimer = window.setTimeout(() => {
        const target = document.getElementById(hash);

        if (target) {
          target.scrollIntoView({ block: "start", behavior });
          return;
        }

        try {
          window.scrollTo({ top: 0, behavior });
        } catch {}
      }, 80);

      timers.current.push(hashTimer);
    } else {
      try {
        window.scrollTo({ top: 0, behavior });
      } catch {}
    }

    if (!pageRef.current) return;

    const nodes = Array.from(
      pageRef.current.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (nodes.length === 0) return () => clearTimers();

    nodes.forEach((element) => element.classList.remove("reveal-in"));

    if (reduceMotion) {
      requestAnimationFrame(() => {
        nodes.forEach((element) => element.classList.add("reveal-in"));
      });
      return () => clearTimers();
    }

    const baseDelay = 120;
    const step = 90;

    nodes.forEach((element, index) => {
      const timerId = window.setTimeout(() => {
        void element.offsetHeight;
        element.classList.add("reveal-in");
      }, baseDelay + index * step);

      timers.current.push(timerId);
    });

    return () => clearTimers();
  }, [pathname, reduceMotion]);

  const durationIn = reduceMotion ? 0 : 0.22;
  const durationOut = reduceMotion ? 0 : 0.16;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        ref={pageRef}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: durationIn, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{
          opacity: 0,
          y: -8,
          transition: { duration: durationOut, ease: [0.65, 0, 0.35, 1] },
        }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
