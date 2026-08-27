"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMediaQuery } from "@/lib/use-media-query";

/** Scroll-to-top button with a slowly-rotating dashed ring — a smaller
 * relative of the hero's rotating stamp (full ring text doesn't read at
 * this size, so just the spinning dashed border carries the motif). */
export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      animate={{ y: visible ? 0 : 16, opacity: visible ? 1 : 0 }}
      whileHover={reduced ? undefined : { scale: 1.08, rotateX: 15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ transformPerspective: 400 }}
      className={`fixed bottom-20 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full bg-paper text-ink shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] ${
        visible ? "" : "pointer-events-none"
      }`}
    >
      <span
        className={`absolute inset-1 rounded-full border border-dashed border-accent-deep/50 ${reduced ? "" : "animate-spin-slow"}`}
        aria-hidden="true"
      />
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}
