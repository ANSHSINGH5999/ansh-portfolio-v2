"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D parallax on a whole content block — tracks the cursor across
 * the full panel it sits in (not just its own bounds) and tilts gently in
 * response, like looking through a window rather than a card trick. Small
 * angle range on purpose: this is meant to read as polish, not a gimmick.
 */
export function PerspectiveTilt({
  children,
  className,
  maxTilt = 5,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20, mass: 0.5 });

  React.useEffect(() => {
    if (!enabled) return;
    const panel = containerRef.current?.closest("section, .grain") ?? document.body;

    function onMove(e: MouseEvent) {
      const rect = (panel as HTMLElement).getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY.set((px - 0.5) * maxTilt * 2);
      rotateX.set((0.5 - py) * maxTilt);
    }
    function onLeave() {
      rotateX.set(0);
      rotateY.set(0);
    }

    panel.addEventListener("mousemove", onMove as EventListener);
    panel.addEventListener("mouseleave", onLeave);
    return () => {
      panel.removeEventListener("mousemove", onMove as EventListener);
      panel.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, maxTilt, rotateX, rotateY]);

  return (
    <div ref={containerRef} className={cn("relative", className)} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}
