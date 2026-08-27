"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, Menu, X } from "lucide-react";
import { gmailComposeUrl, navItems, profile } from "@/data/resume";
import { CommandPalette } from "@/components/command-palette";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const active = useActiveSection(navItems);

  React.useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[120] h-0.5 bg-accent transition-[width]"
        style={{ width: `${progress}%` }}
      />

      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        className="fixed inset-x-0 top-4 z-[90] flex justify-center px-4"
      >
        <div className="bg-paper/95 backdrop-blur-sm flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-ink/10 px-2 py-2 shadow-[0_1px_1px_rgba(20,19,15,0.15),0_12px_32px_-10px_rgba(20,19,15,0.4),0_4px_12px_-4px_rgba(20,19,15,0.25)] sm:px-3">
          <a
            href="#hero"
            className="group/logo flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-semibold tracking-tight"
          >
            <motion.span
              whileHover={{ rotate: -12, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-accent-ink"
            >
              AS
            </motion.span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="group/nav relative shrink-0 rounded-full px-2 py-1.5 text-sm transition-colors lg:px-3"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-paper-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn("relative z-10", isActive ? "text-ink" : "text-muted group-hover/nav:text-ink")}>
                    {item.label}
                  </span>
                  <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-accent-deep transition-transform duration-300 group-hover/nav:scale-x-100" />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <CommandPalette compact />
            <Button
              href={profile.resumeFile}
              target="_blank"
              rel="noopener"
              variant="outline"
              size="default"
              className="group/resume hidden px-3.5 py-2 text-sm lg:inline-flex"
              aria-label={`Download ${profile.name}'s résumé (PDF)`}
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover/resume:translate-y-0.5" />
              <span className="hidden xl:inline">Résumé</span>
            </Button>
            <Magnetic strength={0.25}>
              <Button
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="default"
                className="group/hire px-3 py-2 text-sm lg:px-4"
                aria-label={`Email ${profile.name} — opens Gmail in a new tab`}
              >
                <span className="hidden lg:inline">Hire me</span>
                <Mail className="h-3.5 w-3.5 transition-transform duration-300 group-hover/hire:-translate-y-0.5 group-hover/hire:translate-x-0.5" />
              </Button>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full text-ink md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <div
        id="mobile-nav"
        className={cn(
          "bg-paper/98 backdrop-blur-sm fixed inset-x-4 top-[4.75rem] z-[85] rounded-2xl border border-line shadow-xl transition-[opacity,transform] duration-200 md:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.href.slice(1) ? "true" : undefined}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm transition-colors",
                active === item.href.slice(1) ? "bg-paper-2 text-ink" : "text-ink hover:bg-paper-2"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-paper-2"
          >
            <Download className="h-4 w-4" /> Download résumé
          </a>
          <div className="mt-2 border-t border-line pt-3">
            <CommandPalette />
          </div>
        </div>
      </div>
    </>
  );
}
