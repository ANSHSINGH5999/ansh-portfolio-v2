import { cn } from "@/lib/utils";

/** Solid paper card with a soft lift on hover — the base surface for every
 * card in the cream sections. No blur/glass; this is a print-inspired
 * system, cards read as cut paper, not glass panels. */
export function PaperCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-paper shadow-[0_1px_2px_rgba(20,19,15,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(20,19,15,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}
