import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-muted bg-paper-2 border-line transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-deep hover:text-accent-deep hover:shadow-[0_4px_10px_-4px_rgba(20,19,15,0.25)]",
        tone === "accent" && "text-accent-deep border-accent-deep/30",
        className
      )}
    >
      {children}
    </span>
  );
}
