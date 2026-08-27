"use client";

import * as React from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * A two-layer custom cursor — a small dot plus a slower trailing ring that
 * expands over interactive elements, squeezes on click, and stretches
 * along its direction of travel like a liquid blob. Uses
 * mix-blend-mode: difference, so one fixed color correctly inverts over
 * both black panels and cream sections with no per-section theming
 * needed. Fine-pointer, motion-safe devices only.
 */
export function CustomCursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const dotRef = React.useRef<HTMLDivElement>(null);
  const dotInnerRef = React.useRef<HTMLSpanElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  const active = fine && !reduced;

  React.useEffect(() => {
    if (!active) return;
    document.body.style.cursor = "none";

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let hovering = false;
    let pressed = false;
    let raf = 0;

    function updateDotScale() {
      if (dotInnerRef.current) {
        dotInnerRef.current.style.transform = `scale(${hovering ? 0.4 : pressed ? 0.6 : 1})`;
      }
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
    }

    function onOver(e: MouseEvent) {
      hovering = Boolean((e.target as HTMLElement)?.closest?.("a, button, [data-cursor-hover]"));
      updateDotScale();
    }

    function onDown() {
      pressed = true;
      updateDotScale();
    }
    function onUp() {
      pressed = false;
      updateDotScale();
    }

    function loop() {
      const dx = targetX - ringX;
      const dy = targetY - ringY;
      ringX += dx * 0.18;
      ringY += dy * 0.18;

      const speed = Math.min(Math.hypot(dx, dy), 60);
      const stretch = (speed / 60) * 0.35;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const baseScale = (hovering ? 2.2 : 1) * (pressed ? 0.82 : 1);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) rotate(${angle}deg) scale(${baseScale * (1 + stretch)}, ${baseScale * (1 - stretch * 0.5)}) rotate(${-angle}deg)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference" aria-hidden="true">
      <div ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2">
        <span
          ref={dotInnerRef}
          className="block h-full w-full rounded-full bg-white transition-transform duration-150 ease-out"
        />
      </div>
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
      />
    </div>
  );
}
