"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";

const REST_OPACITY = 0.25;

/**
 * Per-word opacity reveal keyed to normal scroll progress through the
 * paragraph itself (adapted from Motion's official "Scroll word reveal"
 * example) — no pinned/scroll-jacked section, just a natural in-flow
 * element that lights up word by word as it passes through the lower half
 * of the viewport. Falls back to fully-lit static text under
 * prefers-reduced-motion.
 */
export function ScrollWordReveal({ text, className }: { text: string; className?: string }) {
  const targetRef = React.useRef<HTMLParagraphElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.92", "start 0.35"],
  });
  const words = text.split(" ");

  if (reduced) {
    return (
      <p ref={targetRef} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={targetRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <Word progress={scrollYProgress} index={i} count={words.length}>
            {word}
          </Word>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  index,
  count,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const start = count <= 1 ? 0 : index / count;
  const end = Math.min(1, start + 1 / count + 0.05);
  const opacity = useTransform(progress, [start, end], [REST_OPACITY, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {children}
    </motion.span>
  );
}
