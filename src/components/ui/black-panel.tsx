import { cn } from "@/lib/utils";

/** The recurring black, film-grain divider panel — used for the hero and
 * every section-opener slab, matching the reference's alternating
 * black/cream rhythm. A plain flat edge marks the transition back to cream. */
export function BlackPanel({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("grain relative overflow-hidden bg-panel text-on-panel", className)}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
