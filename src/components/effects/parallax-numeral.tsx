"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/** Giant background numeral that drifts as the section scrolls past —
 * a slower scroll-linked motion, distinct from the once-per-element
 * fade-ins used everywhere else. */
export function ParallaxNumeral({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);

  return (
    <motion.span ref={ref} style={{ y }} className={cn("pointer-events-none select-none", className)} aria-hidden="true">
      {children}
    </motion.span>
  );
}
