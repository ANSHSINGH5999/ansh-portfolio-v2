"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

/** True 3D flip on hover (rotateY + backface-visibility) for fine-pointer
 * devices. On touch, hover has nowhere to happen, so both faces stack
 * instead of hiding the back behind a gesture no one will find. */
export function FlipCard({
  front,
  back,
  className,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  const canFlip = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!canFlip || reduced) {
    return (
      <div className={cn("rounded-2xl border border-line bg-paper p-5 shadow-[0_1px_2px_rgba(20,19,15,0.04)]", className)}>
        {front}
        {back}
      </div>
    );
  }

  return (
    <div className={cn("group [perspective:1400px]", className)}>
      <div className="relative h-full min-h-[7.5rem] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-2xl border border-line bg-paper p-5 shadow-[0_1px_2px_rgba(20,19,15,0.04)] [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 rounded-2xl border border-accent-deep/30 bg-paper-2 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
