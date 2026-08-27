"use client";

import { motion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Generic scroll-triggered entrance — fade + rise, once per element. Used
 * to wrap plain server-rendered content (cards, list rows) so every section
 * gets consistent motion without needing its own IntersectionObserver
 * plumbing. `delay` lets a mapped list fake a stagger without a shared
 * variants context.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.55,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
