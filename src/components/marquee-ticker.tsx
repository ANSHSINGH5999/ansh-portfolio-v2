const WORDS = ["Blockchain", "Full-Stack", "Embedded / IoT", "AI Automation", "Smart Contracts", "React & Next.js"];

/** Scrolling keyword band — a small, high-impact editorial device that also
 * doubles as a quick skim of what you do, right under the hero. */
export function MarqueeTicker() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="group/marquee overflow-hidden border-y border-panel-line py-4" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]">
        {items.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-xl font-bold uppercase text-on-panel transition-colors duration-200 hover:text-accent"
          >
            {word}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
