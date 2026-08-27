"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const RINGS = [
  { rotateX: 0, rotateY: 0 },
  { rotateX: 60, rotateY: 0 },
  { rotateX: 120, rotateY: 0 },
  { rotateX: 0, rotateY: 60 },
  { rotateX: 0, rotateY: 120 },
] as const;

/**
 * A CSS-only "wireframe mesh" — several rings fixed at different angles
 * inside a shared 3D space (transform-style: preserve-3d), then the whole
 * group continuously tumbles. No WebGL: it's the classic pure-CSS wireframe
 * sphere trick, standing in for a "rotating smart-contract mesh" without a
 * render-loop or GPU scene graph. Drifts slightly with the cursor for a
 * parallax cue; the tumble itself is a CSS animation so it never competes
 * with that motion-value-driven drift on the same transform.
 */
export function WireframeOrb({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  React.useEffect(() => {
    if (reduced) return;
    const panel = containerRef.current?.closest("section, .grain") as HTMLElement | null;
    if (!panel) return;

    function onMove(e: MouseEvent) {
      const rect = panel!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px * 28);
      y.set(py * 28);
    }
    panel.addEventListener("mousemove", onMove);
    return () => panel.removeEventListener("mousemove", onMove);
  }, [reduced, x, y]);

  return (
    <motion.div
      ref={containerRef}
      style={{ x: springX, y: springY, perspective: 900 }}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          !reduced && "animate-orb-tumble"
        )}
      >
        {RINGS.map((ring, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/25 [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${ring.rotateX}deg) rotateY(${ring.rotateY}deg)` }}
          />
        ))}
        <div className="absolute inset-[15%] rounded-full border border-accent/15" />
        <div className="absolute inset-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 shadow-[0_0_20px_6px_rgba(163,230,53,0.35)]" />
      </div>
    </motion.div>
  );
}
