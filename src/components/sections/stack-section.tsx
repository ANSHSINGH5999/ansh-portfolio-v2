import { skillGroups } from "@/data/resume";
import { SectionDivider } from "@/components/section-divider";
import { PaperCard } from "@/components/ui/paper-card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";

const HARDWARE_SPECS = [
  { label: "Messaging", value: "MQTT pub/sub" },
  { label: "Wireless", value: "BLE" },
  { label: "Control loop", value: "PID tuning" },
  { label: "Layout tool", value: "KiCad" },
] as const;

const TOOLS = [
  "React",
  "Next.js",
  "Solidity",
  "Soroban",
  "Node.js",
  "Firebase",
  "ESP32",
  "n8n",
  "Tailwind",
  "Hardhat",
  "KiCad",
  "Python",
] as const;

export function StackSection() {
  return (
    <>
      <SectionDivider id="stack" n="01" title="Tech" titleAccent="Stack" caption="The stack behind everything I ship." />
      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={(i % 3) * 0.08}>
                <TiltCard maxTilt={7}>
                  <PaperCard className="p-5">
                    <h3
                      className="font-display text-sm font-bold uppercase tracking-wide text-accent-deep"
                      style={{ transform: "translateZ(24px)" }}
                    >
                      {group.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.skills.map((skill, si) => (
                        <Reveal key={skill} delay={si * 0.04} duration={0.35} y={8}>
                          <Badge>{skill}</Badge>
                        </Reveal>
                      ))}
                    </div>
                  </PaperCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <TiltCard maxTilt={4}>
              <PaperCard className="p-6 sm:p-8">
                <h3
                  className="font-display text-sm font-bold uppercase tracking-wide text-accent-deep"
                  style={{ transform: "translateZ(20px)" }}
                >
                  Embedded Hardware
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Hands-on with Arduino, ESP8266/ESP32, and Raspberry Pi Pico W — designing PCBs in KiCad,
                  tuning PID control loops, and wiring up MQTT/BLE for connected devices.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
                  {HARDWARE_SPECS.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-[0.7rem] uppercase tracking-wide text-muted">{spec.label}</dt>
                      <dd className="mt-0.5 font-display text-base font-bold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </PaperCard>
            </TiltCard>
          </Reveal>

          <Reveal className="mt-6" delay={0.1}>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-muted">Tools I build with</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {TOOLS.map((tool, ti) => (
                  <Reveal key={tool} delay={ti * 0.04} duration={0.4} y={14}>
                    <div
                      className="animate-tag-float"
                      style={{ animationDelay: `${(ti % 6) * 0.35}s` }}
                    >
                      <div className="flex items-center justify-center rounded-2xl border border-line bg-paper-2 px-4 py-5 text-center font-display text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:rotate-1 hover:border-accent-deep hover:text-accent-deep hover:shadow-[0_16px_30px_-20px_rgba(20,19,15,0.3)]">
                        {tool}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
