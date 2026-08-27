"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FlipCard } from "@/components/effects/flip-card";
import { useMediaQuery } from "@/lib/use-media-query";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const ITEMS = [
  { n: "01", bold: "Skills", script: "Stack", href: "#stack" },
  { n: "02", bold: "Work", script: "Experience", href: "#ledger" },
  { n: "03", bold: "Projects", script: "Deployed", href: "#deployed" },
  { n: "04", bold: "Live", script: "Activity", href: "#signal" },
  { n: "05", bold: "Education", script: "SRM", href: "#origin" },
  { n: "06", bold: "Let's", script: "Connect", href: "#connect" },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cell3d = {
  hidden: { opacity: 0, y: 30, rotateX: -60 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: EASE } },
};
const cellFlat = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function TocSection() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const cell = reduced ? cellFlat : cell3d;

  return (
    <section className="halftone relative overflow-hidden bg-paper-2 py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="font-script block -rotate-1 text-2xl text-accent-deep">Table Of</span>
          <h2 className="-mt-1 font-display text-[clamp(2.5rem,1.6rem+4vw,4rem)] font-black">Contents</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          style={{ perspective: 1400 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ITEMS.map((item) => (
            <motion.div key={item.n} variants={cell} style={{ transformOrigin: "top center" }}>
              <a href={item.href} className="group block">
                <FlipCard
                  className="h-32"
                  front={
                    <div className="relative flex h-full flex-col justify-between">
                      <span className="select-none font-display text-3xl font-black text-line">{item.n}</span>
                      <span className="font-display text-2xl font-black transition-colors group-hover:text-accent-deep sm:text-3xl">
                        {item.bold}
                      </span>
                    </div>
                  }
                  back={
                    <div className="flex h-full flex-col items-start justify-between">
                      <span className="font-script text-3xl text-accent-deep sm:text-4xl">{item.script}</span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-accent-deep">
                        Go there <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  }
                />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
