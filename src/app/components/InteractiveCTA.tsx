"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type InteractiveCTAProps = {
  children: ReactNode;
  className?: string;
};

export default function InteractiveCTA({
  children,
  className = "inline-flex"
}: InteractiveCTAProps) {
  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
