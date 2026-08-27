"use client";

import { useId } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/** A slowly-spinning circular text stamp — the editorial-poster equivalent
 * of a wax seal / rubber stamp. Center content stays upright; only the
 * ring of text and its border rotate. */
export function RotatingStamp({
  text,
  className,
  center,
}: {
  text: string;
  className?: string;
  center?: React.ReactNode;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className={`relative ${className ?? ""}`} style={{ perspective: 600 }}>
      <svg
        viewBox="0 0 200 200"
        className={`h-full w-full ${reduced ? "" : "animate-stamp-tumble"}`}
        role="presentation"
      >
        <defs>
          <path id={`stamp-ring-${id}`} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <text fill="currentColor" fontSize="12" letterSpacing="2" className="font-mono">
          <textPath href={`#stamp-ring-${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      {center && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">{center}</div>
      )}
    </div>
  );
}
