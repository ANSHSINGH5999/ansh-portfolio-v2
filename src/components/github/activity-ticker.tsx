import { GitCommitHorizontal } from "lucide-react";
import type { CommitActivity } from "@/lib/github";

export function ActivityTicker({ commits }: { commits: CommitActivity[] }) {
  // No recent public pushes (or the API call failed) — omit the block
  // rather than showing visitors an empty/dev-facing status message.
  if (commits.length === 0) return null;

  const items = [...commits, ...commits];

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <p className="border-b border-line px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">
        Recent commits
      </p>
      <div className="group overflow-hidden">
        <ul className="animate-marquee flex w-max gap-8 whitespace-nowrap px-4 py-4 group-hover:[animation-play-state:paused]">
          {items.map((c, i) => (
            <li key={`${c.url}-${i}`} className="flex items-center gap-2 font-mono text-sm">
              <GitCommitHorizontal className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={c.url} target="_blank" rel="noopener" className="text-ink hover:text-accent">
                {c.message}
              </a>
              <span className="text-muted">· {c.repo.split("/")[1]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
