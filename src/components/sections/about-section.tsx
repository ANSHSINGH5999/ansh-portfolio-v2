"use client";

import { motion } from "framer-motion";
import { education, featuredProjects, profile } from "@/data/resume";
import { PencilPortrait } from "@/components/effects/pencil-portrait";
import { ArrowDoodle } from "@/components/effects/arrow-doodle";
import { CountUp } from "@/components/effects/count-up";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const STATS = [
  { count: featuredProjects.length, decimals: 0, label: "Shipped projects" },
  { static: "1st", label: "Robofest Line Follower" },
  { count: Number(education.cgpa.replace("CGPA ", "")), decimals: 1, label: "CGPA" },
  { count: Number(education.expected.replace("Expected ", "")), decimals: 0, label: "Grad year" },
] as const;

export function AboutSection() {
  return (
    <section className="halftone relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-paper)_0%,transparent_15%,transparent_85%,var(--color-paper)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="relative inline-block font-display text-[clamp(2.75rem,1.8rem+4vw,4.5rem)] font-black leading-[0.95]">
            Hello!
            <svg
              viewBox="0 0 160 14"
              className="absolute -bottom-2 left-0 h-3 w-full text-accent"
              aria-hidden="true"
              fill="none"
            >
              <path
                d="M2 8 C 30 2, 60 12, 90 6 S 140 3, 158 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <p className="mt-5 text-lg font-medium">I am {profile.name}.</p>
          <div className="mt-1 flex items-start gap-1">
            <span className="font-script -rotate-3 text-2xl text-accent-deep">About me</span>
            <ArrowDoodle className="mt-1 h-9 w-11 -translate-y-1 text-accent-deep" />
          </div>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">{profile.summary}</p>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Based in {profile.location} — currently pursuing a {education.degree} at{" "}
            {education.school.split(" — ")[0]}, {education.expected}.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
              >
                <p className="font-display text-3xl font-black text-accent-deep sm:text-4xl">
                  {"static" in stat ? stat.static : <CountUp value={stat.count} decimals={stat.decimals} />}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto w-full max-w-sm"
        >
          <PencilPortrait src={profile.photo} alt={`Pencil-sketch style portrait of ${profile.name}`} className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}
