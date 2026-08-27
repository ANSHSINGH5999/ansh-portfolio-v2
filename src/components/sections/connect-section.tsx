"use client";

import { motion, type Variants } from "framer-motion";
import { Contact, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/resume";
import { SectionDivider } from "@/components/section-divider";
import { ScrollWordReveal } from "@/components/effects/scroll-word-reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon, XLogoIcon } from "@/components/icons/brand-icons";
import { TiltCard } from "@/components/effects/tilt-card";
import { CopyButton } from "@/components/effects/copy-button";
import { downloadVCard } from "@/lib/vcard";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copy: profile.email },
  {
    label: "Phone",
    value: profile.phoneDisplay,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
    copy: profile.phone,
  },
  { label: "LinkedIn", value: profile.linkedinDisplay, href: profile.linkedin, icon: LinkedinIcon, copy: undefined },
  {
    label: "GitHub",
    value: `github.com/${profile.githubUsername}`,
    href: profile.github,
    icon: GithubIcon,
    copy: undefined,
  },
  { label: "X", value: profile.xDisplay, href: profile.x, icon: XLogoIcon, copy: undefined },
  { label: "Instagram", value: profile.instagramDisplay, href: profile.instagram, icon: InstagramIcon, copy: undefined },
  { label: "Location", value: profile.location, href: undefined, icon: MapPin, copy: undefined },
] as const;

const EASE = [0.2, 0.7, 0.2, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export function ConnectSection() {
  return (
    <>
      <SectionDivider id="connect" n="06" title="Let's" titleAccent="Talk" caption="Open to internships, trainee programs, and full-time roles." />
      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <ScrollWordReveal
              text="Let's build something that ships. Open to Blockchain / Full-Stack internships, trainee programs and full-time roles. I reply fast — reach out directly."
              className="max-w-lg text-[1.05rem] text-muted"
            />
            <motion.button
              type="button"
              onClick={downloadVCard}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper-2 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent-deep hover:text-accent-deep"
            >
              <Contact className="h-4 w-4" /> Save contact
            </motion.button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={gridVariants}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {links.map(({ label, value, href, icon: Icon, copy }) => {
              const content = (
                <>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-accent-deep"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.68rem] uppercase tracking-wide text-muted">{label}</span>
                    <span className="break-words text-[0.98rem]">{value}</span>
                  </span>
                  {copy && <CopyButton value={copy} label={label} style={{ transform: "translateZ(20px)" }} />}
                </>
              );
              return href ? (
                <motion.a
                  key={label}
                  variants={cardVariants}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener" : undefined}
                  className="block"
                >
                  <TiltCard maxTilt={8}>
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper-2 p-4 transition-colors hover:border-accent-deep/40 hover:text-accent-deep">
                      {content}
                    </div>
                  </TiltCard>
                </motion.a>
              ) : (
                <motion.div key={label} variants={cardVariants}>
                  <TiltCard maxTilt={8}>
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper-2 p-4">{content}</div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
