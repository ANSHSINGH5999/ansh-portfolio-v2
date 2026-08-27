"use client";

import { motion } from "framer-motion";
import { ParallaxNumeral } from "@/components/effects/parallax-numeral";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** The big headline + caption slab that opens every real content section —
 * cream, matching the surrounding sections, with the bold word in ink and
 * the script accent in the deep-olive accent (no black divider panel). */
export function SectionDivider({
  id,
  n,
  title,
  titleAccent,
  caption,
}: {
  id: string;
  n: string;
  title: string;
  titleAccent: string;
  caption: string;
}) {
  return (
    <section id={id} className="halftone relative overflow-hidden bg-paper py-20 sm:py-28">
      <ParallaxNumeral className="absolute right-2 top-4 select-none font-display text-[7rem] font-black leading-none text-line sm:right-6 sm:text-[10rem] md:text-[13rem]">
        {n}
      </ParallaxNumeral>

      <div className="relative mx-auto max-w-7xl px-6 text-left md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-block font-mono text-xs tracking-[0.3em] text-muted"
        >
          ( {n} )
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="balance font-display text-[clamp(2.75rem,1.6rem+6vw,5.5rem)] font-black uppercase leading-[0.9] text-ink"
        >
          <span className="relative inline-block">
            {title}
            <svg
              viewBox="0 0 160 14"
              className="absolute -bottom-1 left-0 h-3 w-full text-accent-deep/60 sm:-bottom-2"
              aria-hidden="true"
              fill="none"
            >
              <path
                d="M2 8 C 30 2, 60 12, 90 6 S 140 3, 158 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-script -mt-3 block text-[1.15em] normal-case leading-[0.8] text-accent-deep sm:-mt-5">
            {titleAccent}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-4 max-w-md text-[1.05rem] text-muted"
        >
          {caption}
        </motion.p>
      </div>
    </section>
  );
}
