"use client";

import * as React from "react";
import { motion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 };

/**
 * Real 3D pointer tilt via Framer Motion spring values (rotateX/rotateY/z),
 * adapted from Motion's official "Tilt card" example — driven by the
 * animation engine's own transforms rather than manual style mutation, so
 * the card settles with proper spring physics instead of a linear ease.
 * Fine-pointer devices only; a no-op wrapper elsewhere and under
 * prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canTilt = fine && !reduced;

  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);
  const z = useSpring(0, SPRING);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!canTilt || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    rotateX.set(maxTilt * (0.5 - y / box.height));
    rotateY.set(maxTilt * (x / box.width - 0.5));
  }
  function onPointerEnter() {
    if (canTilt) z.set(12);
  }
  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, z, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}
