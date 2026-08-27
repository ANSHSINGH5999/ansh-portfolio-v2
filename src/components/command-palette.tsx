"use client";

import * as React from "react";
import { Command } from "cmdk";
import { motion } from "framer-motion";
import {
  Blocks,
  BookMarked,
  FolderGit2,
  GraduationCap,
  Home,
  Mail,
  Radio,
  Download,
  Search,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";

/** `compact` narrows the trigger to icon-only until `lg` — used in the
 * header, where the tablet-width nav + actions row is tight on space. The
 * mobile-nav dropdown usage leaves it at the default (label from `sm`),
 * since that context has plenty of width regardless of breakpoint. */
export function CommandPalette({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    window.location.hash = href;
  }
  function visit(url: string) {
    setOpen(false);
    window.open(url, "_blank", "noopener");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-paper rounded-full border border-line px-3.5 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span className={cn("hidden", compact ? "lg:inline" : "sm:inline")}>Search</span>
        <kbd className="ml-1 rounded-md border border-line px-1.5 py-0.5 text-[0.65rem]">⌘K</kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        className="fixed inset-0 z-[110]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateX: -8, y: -8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          style={{ transformPerspective: 1200 }}
          className="fixed left-1/2 top-24 z-10 w-[92vw] max-w-lg -translate-x-1/2 bg-paper/98 backdrop-blur-sm overflow-hidden rounded-2xl border border-line shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <Search className="h-4 w-4 text-muted" aria-hidden="true" />
            <Command.Input
              autoFocus
              placeholder="Jump to a section, open a link, run a command…"
              className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center font-mono text-xs text-muted">
              No matches.
            </Command.Empty>

            <Command.Group heading="Navigate" className="px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
              <Item icon={<Home className="h-4 w-4" />} onSelect={() => go("#hero")}>Home</Item>
              <Item icon={<Blocks className="h-4 w-4" />} onSelect={() => go("#stack")}>Stack</Item>
              <Item icon={<BookMarked className="h-4 w-4" />} onSelect={() => go("#ledger")}>Ledger</Item>
              <Item icon={<FolderGit2 className="h-4 w-4" />} onSelect={() => go("#deployed")}>Deployed Work</Item>
              <Item icon={<Radio className="h-4 w-4" />} onSelect={() => go("#signal")}>Signal</Item>
              <Item icon={<GraduationCap className="h-4 w-4" />} onSelect={() => go("#origin")}>Origin</Item>
              <Item icon={<Mail className="h-4 w-4" />} onSelect={() => go("#connect")}>Connect</Item>
            </Command.Group>

            <Command.Group heading="Actions" className="px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
              <Item icon={<Download className="h-4 w-4" />} onSelect={() => visit(profile.resumeFile)}>
                Download résumé (PDF)
              </Item>
              <Item icon={<GithubIcon className="h-4 w-4" />} onSelect={() => visit(profile.github)}>
                Open GitHub profile
              </Item>
              <Item icon={<LinkedinIcon className="h-4 w-4" />} onSelect={() => visit(profile.linkedin)}>
                Open LinkedIn profile
              </Item>
              <Item icon={<Mail className="h-4 w-4" />} onSelect={() => visit(`mailto:${profile.email}`)}>
                Email {profile.name}
              </Item>
            </Command.Group>
          </Command.List>
        </motion.div>
      </Command.Dialog>
    </>
  );
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-ink data-[selected=true]:bg-paper-2 data-[selected=true]:text-accent"
    >
      <span className="text-muted">{icon}</span>
      {children}
    </Command.Item>
  );
}
