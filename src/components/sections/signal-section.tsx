import { Trophy } from "lucide-react";
import { achievements } from "@/data/resume";
import { fetchContributionCalendar, fetchRecentCommits } from "@/lib/github";
import { SectionDivider } from "@/components/section-divider";
import { Reveal } from "@/components/effects/reveal";
import { FlipCard } from "@/components/effects/flip-card";
import { GithubHeatmap } from "@/components/github/heatmap";
import { ActivityTicker } from "@/components/github/activity-ticker";
import { XFeed } from "@/components/x-feed";
import { LinkedInSignalCard } from "@/components/linkedin-signal-card";

export async function SignalSection() {
  const [{ calendar }, { commits }] = await Promise.all([
    fetchContributionCalendar(),
    fetchRecentCommits(5),
  ]);

  return (
    <>
      <SectionDivider id="signal" n="04" title="Live" titleAccent="Activity" caption="Live from GitHub, updated automatically." />
      <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <FlipCard
                className="h-full"
                front={
                  <div className="flex h-full items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent-deep text-accent-deep">
                      <Trophy className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold text-ink">{a.title}</h3>
                  </div>
                }
                back={<p className="text-sm text-muted">{a.description}</p>}
              />
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* GithubHeatmap, ActivityTicker, and XFeed may all render null
              (no token / no recent pushes / no handle configured) —
              leaving them unwrapped lets the grid reflow cleanly instead
              of leaving an empty animated cell behind. */}
          {calendar && (
            <Reveal>
              <GithubHeatmap calendar={calendar} />
            </Reveal>
          )}
          {commits.length > 0 && (
            <Reveal delay={0.08}>
              <ActivityTicker commits={commits} />
            </Reveal>
          )}
          <XFeed />
          <Reveal delay={0.16}>
            <LinkedInSignalCard />
          </Reveal>
        </div>
      </div>
      </section>
    </>
  );
}
