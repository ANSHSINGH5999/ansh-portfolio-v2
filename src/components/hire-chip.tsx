import { Mail } from "lucide-react";
import { gmailComposeUrl, profile } from "@/data/resume";
import { Button } from "@/components/ui/button";

/** Sticky "available for hire" status pill — bottom-left, mirroring the
 * reference's availability widget but built from your actual status text. */
export function HireChip() {
  return (
    <div className="fixed bottom-6 left-6 z-[90] hidden items-center gap-3 rounded-full border border-line bg-paper/95 py-2 pl-2 pr-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:flex">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-paper">
        AS
      </span>
      <span className="flex max-w-[11rem] items-center gap-1.5 text-xs leading-tight text-muted">
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent-deep" aria-hidden="true" />
        {profile.status}
      </span>
      <Button
        href={gmailComposeUrl}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
        className="group/hire h-8 w-auto shrink-0 gap-1.5 px-3 text-xs"
        aria-label={`Email ${profile.name} — opens Gmail in a new tab`}
      >
        Hire me
        <Mail className="h-3 w-3 transition-transform duration-300 group-hover/hire:-translate-y-0.5 group-hover/hire:translate-x-0.5" />
      </Button>
    </div>
  );
}
