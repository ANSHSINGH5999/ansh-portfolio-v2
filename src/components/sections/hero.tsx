"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { profile } from "@/data/resume";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { BlackPanel } from "@/components/ui/black-panel";
import { RotatingStamp } from "@/components/effects/rotating-stamp";
import { MarqueeTicker } from "@/components/marquee-ticker";
import { GithubIcon, InstagramIcon, LinkedinIcon, XLogoIcon } from "@/components/icons/brand-icons";
import { ArrowUpRight } from "lucide-react";
import { TypewriterText } from "@/components/effects/typewriter-text";
import { ChromeText } from "@/components/effects/chrome-text";
import { PerspectiveTilt } from "@/components/effects/perspective-tilt";
import { SwooshArrow } from "@/components/effects/swoosh-arrow";
import { WireframeOrb } from "@/components/effects/wireframe-orb";

const ROLE_WORDS = [
  "Blockchain Developer",
  "Full-Stack Engineer",
  "Embedded Systems Builder",
  "AI Workflow Automator",
] as const;

const EASE = [0.2, 0.7, 0.2, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Hero() {
  return (
    <BlackPanel id="hero" className="pb-28 pt-40 sm:pt-48">
      <WireframeOrb className="absolute left-1/2 top-1/2 z-0 hidden h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-70 sm:block lg:h-[32rem] lg:w-[32rem]" />

      <RotatingStamp
        text="OPEN TO WORK • OPEN TO WORK • "
        className="absolute right-8 top-8 hidden h-28 w-28 text-on-panel-muted sm:block"
        center={<ArrowUpRight className="h-6 w-6 text-accent" />}
      />

      <PerspectiveTilt maxTilt={4}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center md:px-12 [transform-style:preserve-3d]"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-panel-line px-3.5 py-2 text-xs uppercase tracking-wide text-on-panel-muted"
          >
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
            <TypewriterText words={ROLE_WORDS} label={profile.role} className="min-w-[13ch] text-left" />
          </motion.div>

          <motion.h1
            variants={item}
            className="balance font-display text-[clamp(3.5rem,2rem+8vw,8rem)] font-black uppercase leading-[0.9] tracking-tight break-words [transform:translateZ(50px)]"
          >
            <ChromeText>Builder</ChromeText>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-script mt-2 text-[clamp(2rem,1.4rem+3vw,3.5rem)] text-accent [transform:translateZ(30px)]"
          >
            {profile.name}
          </motion.p>

          <motion.p variants={item} className="mt-6 w-full max-w-xl break-words text-[1.05rem] text-on-panel-muted">
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <SwooshArrow className="pointer-events-none absolute -left-24 -top-16 hidden h-16 w-28 -rotate-6 text-accent lg:block" />
            <Magnetic>
              <Button href="#deployed" variant="solid-on-panel" size="default" className="px-6 py-3 text-[0.95rem]">
                View projects
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="#connect" variant="outline-on-panel" size="default" className="px-6 py-3 text-[0.95rem]">
                Get in touch
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex gap-3">
            <SocialIcon href={profile.github} label={`${profile.name} on GitHub`}>
              <GithubIcon className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={profile.linkedin} label={`${profile.name} on LinkedIn`}>
              <LinkedinIcon className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={profile.x} label={`${profile.name} on X`}>
              <XLogoIcon className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={profile.instagram} label={`${profile.name} on Instagram`}>
              <InstagramIcon className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={`mailto:${profile.email}`} label={`Email ${profile.name}`}>
              <Mail className="h-5 w-5" />
            </SocialIcon>
          </motion.div>
        </motion.div>
      </PerspectiveTilt>

      <div className="relative z-10 mt-16 flex justify-center text-on-panel-muted" aria-hidden="true">
        <ChevronDown className="h-5 w-5 animate-bob" />
      </div>

      <div className="relative z-10 mt-16">
        <MarqueeTicker />
      </div>
    </BlackPanel>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener" : undefined}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-panel-line text-on-panel-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
