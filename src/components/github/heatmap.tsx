"use client";

import { motion } from "framer-motion";
import type { ContributionCalendar } from "@/lib/github";
import { useMediaQuery } from "@/lib/use-media-query";

function intensity(count: number): string {
  if (count === 0) return "bg-[var(--color-paper-2)]";
  if (count < 3) return "bg-[color-mix(in_srgb,var(--color-accent-deep)_35%,var(--color-paper-2))]";
  if (count < 6) return "bg-[color-mix(in_srgb,var(--color-accent-deep)_65%,var(--color-paper-2))]";
  if (count < 10) return "bg-[color-mix(in_srgb,var(--color-accent-deep)_90%,transparent)]";
  return "bg-[var(--color-accent-deep)]";
}

export function GithubHeatmap({ calendar }: { calendar: ContributionCalendar | null }) {
  // No GITHUB_TOKEN configured (GraphQL has no unauthenticated tier) or the
  // API call failed — never surface a setup instruction to a site visitor;
  // just omit the block. The `error` string is still there for local dev
  // (check the server console / lib/github.ts) if you need to debug it.
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  if (!calendar) return null;

  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-xs uppercase tracking-wide text-muted">Contribution activity</p>
        <p className="text-xs font-semibold text-accent-deep">{calendar.totalContributions} in the last year</p>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1" role="img" aria-label="GitHub contribution heatmap">
        {calendar.weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <motion.div
                key={day.date}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                initial={reduced ? false : { opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={reduced ? undefined : { scale: 1.35 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.25, delay: reduced ? 0 : (wi * week.length + di) * 0.002 }}
                className={`h-[10px] w-[10px] rounded-[2px] ${intensity(day.count)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
