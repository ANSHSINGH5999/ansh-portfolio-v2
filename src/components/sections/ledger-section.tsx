import { experience } from "@/data/resume";
import { SectionDivider } from "@/components/section-divider";
import { PaperCard } from "@/components/ui/paper-card";
import { Reveal } from "@/components/effects/reveal";
import { ParallaxNumeral } from "@/components/effects/parallax-numeral";
import { TiltCard } from "@/components/effects/tilt-card";

export function LedgerSection() {
  return (
    <>
      <SectionDivider id="ledger" n="02" title="Work" titleAccent="Experience" caption="Where I've put in the work so far." />
      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="relative max-w-2xl">
            <ParallaxNumeral className="absolute -left-2 -top-10 font-display text-8xl font-black text-line sm:-left-4 sm:-top-14 sm:text-9xl">
              02
            </ParallaxNumeral>
            <TiltCard maxTilt={5}>
              <PaperCard className="relative border-l-[3px] border-l-accent-deep p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-deep/10 px-2 py-0.5 text-accent-deep">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-deep" />
                    Current
                  </span>
                  <span>{experience.period}</span>
                  <span>·</span>
                  <span>{experience.org}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-black" style={{ transform: "translateZ(24px)" }}>
                  {experience.role}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[0.98rem] text-ink">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-deep" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </PaperCard>
            </TiltCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
