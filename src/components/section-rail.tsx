"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { navItems } from "@/data/resume";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

/** A fixed side rail of dots, one per section, tracking scroll position —
 * a quiet orientation aid (and quick-jump nav) for anyone deep in the page.
 * Desktop only: there's no spare margin for it below `lg`, and the mobile
 * menu already covers navigation there. */
export function SectionRail() {
  const active = useActiveSection(navItems);
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {navItems.map((item) => {
        const id = item.href.slice(1);
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <a
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center gap-2 py-1"
          >
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "whitespace-nowrap rounded-full bg-ink px-2.5 py-1 font-mono text-[0.7rem] text-paper",
                    !isHovered && "opacity-70"
                  )}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              animate={{
                scale: isActive ? 1 : 1,
                width: isActive ? 22 : 8,
                backgroundColor: isActive ? "var(--color-accent-deep)" : "var(--color-line)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="h-2 rounded-full"
            />
          </a>
        );
      })}
    </nav>
  );
}
