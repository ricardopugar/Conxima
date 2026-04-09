"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

const LOOP_DURATION = 3.6;

type NavbarSocialPingLinkProps = {
  href: string;
  label: string;
  Icon: IconType;
};

export default function NavbarSocialPingLink({
  href,
  label,
  Icon
}: NavbarSocialPingLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative inline-flex h-9 w-9 items-center justify-center"
    >
      <Band delay={0} />
      <Band delay={LOOP_DURATION * 0.34} />
      <Band delay={LOOP_DURATION * 0.68} />

      <motion.span
        className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
          y: [0, -1.5, 0],
          borderColor: [
            "rgba(255,255,255,0.10)",
            "rgba(34,211,238,0.55)",
            "rgba(255,255,255,0.10)"
          ],
          color: [
            "rgb(226 232 240)",
            "rgb(34 211 238)",
            "rgb(226 232 240)"
          ],
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 0 rgba(34,211,238,0)",
            "0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 22px rgba(34,211,238,0.18)",
            "0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 0 rgba(34,211,238,0)"
          ]
        }}
        transition={{
          duration: LOOP_DURATION,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </motion.span>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-0.5 -top-0.5 z-20 h-2.5 w-2.5 rounded-full bg-[var(--color-secondary)] shadow-[0_0_16px_rgba(34,211,238,0.45)]"
        animate={{
          scale: [1, 1.45, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: LOOP_DURATION * 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </a>
  );
}

function Band({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden
      style={{ translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, scale: 0.32 }}
      animate={{ opacity: [0, 0.28, 0.18, 0], scale: [0.32, 0.68, 1] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.5, 0.78, 1],
        duration: LOOP_DURATION,
        ease: "linear",
        delay
      }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-12 w-12 rounded-full border border-[var(--color-secondary)]/25 bg-[radial-gradient(circle,rgba(34,211,238,0.18),rgba(34,211,238,0.03)_62%,transparent_74%)] shadow-[0_0_26px_rgba(34,211,238,0.12)]"
    />
  );
}
