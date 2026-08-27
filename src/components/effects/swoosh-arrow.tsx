/** Hand-drawn swoosh-to-checkmark doodle — a "look here" annotation for
 * pointing at a nearby CTA. Vector, not a raster screenshot, so it inherits
 * `currentColor` and scales cleanly on both panel themes. */
export function SwooshArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 44 C 10 12, 42 -2, 64 5 C 82 11, 92 21, 90 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M90 32 L 77 43 L 102 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
