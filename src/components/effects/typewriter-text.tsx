"use client";

import * as React from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const HOLD_MS = 1600;

/** Cycles through a list of phrases, typing and deleting each in turn. The
 * animated text is aria-hidden; a static, visually-hidden label carries the
 * accessible name so screen readers get one clean phrase, not a stream of
 * rapidly-changing partial words. Falls back to the first phrase, fully
 * typed and static, under reduced-motion. */
export function TypewriterText({
  words,
  label,
  className,
}: {
  words: readonly string[];
  label: string;
  className?: string;
}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [display, setDisplay] = React.useState(reduced ? words[0] : "");

  React.useEffect(() => {
    if (reduced) return;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setDisplay(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
        timer = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        setDisplay(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        timer = setTimeout(tick, DELETE_SPEED);
      }
    }

    timer = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [reduced, words]);

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {display}
        <span
          className="animate-blink ml-0.5 inline-block w-[2px] translate-y-[0.1em] bg-current align-middle"
          style={{ height: "0.9em" }}
        />
      </span>
    </span>
  );
}
