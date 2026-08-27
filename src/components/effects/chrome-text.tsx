"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * The metallic headline text, but the gradient's highlight now tracks the
 * cursor — like brushed metal catching the light as you move your mouse —
 * instead of sitting static. Falls back to the plain static gradient on
 * touch devices and under reduced-motion. Always a <span>; wrap it in an
 * <h1>/<h2> at the call site if a heading is needed.
 */
export function ChromeText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canTrack = fine && !reduced;

  function onMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!canTrack || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    ref.current.style.setProperty("--shine-x", `${x}%`);
  }
  function onMouseLeave() {
    ref.current?.style.setProperty("--shine-x", "50%");
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("text-chrome", className)}
    >
      {children}
    </span>
  );
}
