import { education } from "@/data/resume";
import { SectionDivider } from "@/components/section-divider";
import { PaperCard } from "@/components/ui/paper-card";
import { Reveal } from "@/components/effects/reveal";
import { ParallaxNumeral } from "@/components/effects/parallax-numeral";

export function OriginSection() {
  return (
    <>
      <SectionDivider id="origin" n="05" title="Still" titleAccent="Learning" caption="The degree in progress behind all of this." />
      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="relative max-w-2xl">
            <ParallaxNumeral className="absolute -left-2 -top-10 font-display text-8xl font-black text-line sm:-left-4 sm:-top-14 sm:text-9xl">
              05
            </ParallaxNumeral>
            <PaperCard className="relative p-6">
              <h3 className="font-display text-xl font-black">{education.degree}</h3>
              <p className="mt-1 text-sm text-muted">{education.specialization}</p>
              <p className="mt-3 text-sm text-ink">{education.school}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                <span>{education.expected}</span>
                <span className="font-semibold text-accent-deep">{education.cgpa}</span>
              </div>
            </PaperCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
