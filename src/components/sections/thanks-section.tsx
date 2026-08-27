"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { gmailComposeUrl, profile } from "@/data/resume";
import { GithubIcon } from "@/components/icons/brand-icons";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function ThanksSection() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="balance font-display text-[clamp(2.5rem,1.6rem+5vw,4.5rem)] font-black uppercase leading-[0.95] text-ink"
        >
          Thanks for scrolling!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mx-auto mt-5 max-w-md text-[1.05rem] text-muted"
        >
          If any of this made you want to talk — a star on a repo or a quick email both mean a lot.
          I read every message myself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="relative mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="pointer-events-none absolute -left-8 -top-14 hidden -rotate-3 items-start gap-1 sm:-left-16 sm:flex">
            <svg viewBox="0 0 60 60" className="mt-6 h-10 w-10 -scale-x-100 text-accent-deep" aria-hidden="true" fill="none">
              <path
                d="M50 8 C 30 10, 14 22, 12 40 C 11 46, 13 50, 16 53"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M8 44 L16 53 L22 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-script -rotate-3 whitespace-nowrap text-2xl text-accent-deep">
              Let&rsquo;s work
              <br />
              together
            </span>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            className="hand-underline inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <GithubIcon className="h-4 w-4" /> Star on GitHub
          </a>
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hand-underline inline-flex items-center gap-2 text-sm font-semibold text-accent-deep"
          >
            <Mail className="h-4 w-4" /> Say hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
