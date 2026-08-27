"use client";

import { motion } from "framer-motion";
import { Award, MessageSquare } from "lucide-react";
import linkedinData from "@/data/linkedin-signal.json";
import { profile } from "@/data/resume";
import { LinkedinIcon } from "@/components/icons/brand-icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export function LinkedInSignalCard() {
  const entries = [...linkedinData.entries].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted">
          <LinkedinIcon className="h-3.5 w-3.5" aria-hidden="true" /> Signal &amp; activity
        </p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener"
          className="font-mono text-[0.68rem] text-accent hover:underline"
        >
          View profile
        </a>
      </div>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={container}
        className="max-h-[420px] divide-y divide-line overflow-y-auto"
      >
        {entries.map((entry) => (
          <motion.li
            key={entry.title}
            variants={item}
            className="flex gap-3 px-4 py-3 transition-colors duration-200 hover:bg-paper-2"
          >
            <span className="mt-0.5 text-accent">
              {entry.type === "achievement" ? (
                <Award className="h-4 w-4" aria-hidden="true" />
              ) : (
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-wide text-muted">{entry.date}</p>
              <a href={entry.url} target="_blank" rel="noopener" className="text-sm font-medium text-ink hover:text-accent">
                {entry.title}
              </a>
              <p className="text-sm text-muted">{entry.summary}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
