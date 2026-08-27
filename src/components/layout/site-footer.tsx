"use client";

import { Mail } from "lucide-react";
import { gmailComposeUrl, profile } from "@/data/resume";
import { GithubIcon, InstagramIcon, LinkedinIcon, XLogoIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/effects/reveal";

const LINKS = [
  { href: profile.github, label: "GitHub", icon: GithubIcon },
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.x, label: "X", icon: XLogoIcon },
  { href: profile.instagram, label: "Instagram", icon: InstagramIcon },
  { href: gmailComposeUrl, label: "Email", icon: Mail },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-paper py-6">
      <Reveal y={12} duration={0.5} className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col gap-3 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {profile.name}</span>
          <div className="flex items-center gap-1">
            {LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent-deep"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <span>Built with Next.js · Tailwind CSS · Framer Motion</span>
        </div>
      </Reveal>
    </footer>
  );
}
