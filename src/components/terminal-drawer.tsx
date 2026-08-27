"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import {
  achievements,
  education,
  experience,
  featuredProjects,
  profile,
  skillGroups,
} from "@/data/resume";
import { cn } from "@/lib/utils";

type Line = { kind: "input" | "output" | "error"; text: string };

const PROMPT = `${profile.githubUsername.toLowerCase()}@portfolio:~$`;

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [];

  switch (cmd) {
    case "help":
      return [
        "Available commands:",
        "  help          show this list",
        "  whoami        who you're looking at",
        "  about         short summary",
        "  skills        tech stack, grouped",
        "  projects      shipped Web3 / full-stack projects",
        "  experience    work / team history",
        "  achievements  competitions & wins",
        "  education     degree in progress",
        "  contact       how to reach me",
        "  github        open my GitHub profile",
        "  linkedin      open my LinkedIn profile",
        "  resume        open the résumé PDF",
        "  clear         clear the terminal",
        "  exit          close the terminal",
      ];
    case "whoami":
      return [profile.name, profile.role, profile.tagline];
    case "about":
      return [profile.summary, "", profile.status];
    case "skills":
      return skillGroups.flatMap((g) => [`${g.title}:`, `  ${g.skills.join(", ")}`, ""]);
    case "projects":
      return featuredProjects.flatMap((p) => [
        `${p.name} — ${p.tags.join(" / ")}`,
        `  ${p.description}`,
        `  repo: ${p.repo ? `github.com/${profile.githubUsername}/${p.repo}` : "see github.com/" + profile.githubUsername}`,
        "",
      ]);
    case "experience":
      return [`${experience.role} — ${experience.org} (${experience.period})`, ...experience.bullets.map((b) => `  - ${b}`)];
    case "achievements":
      return achievements.flatMap((a) => [`- ${a.title}`, `  ${a.description}`]);
    case "education":
      return [
        education.degree,
        `  ${education.specialization}`,
        `  ${education.school}`,
        `  ${education.expected} · ${education.cgpa}`,
      ];
    case "contact":
      return [
        `Email    ${profile.email}`,
        `Phone    ${profile.phoneDisplay}`,
        `LinkedIn ${profile.linkedinDisplay}`,
        `GitHub   github.com/${profile.githubUsername}`,
        `Location ${profile.location}`,
      ];
    case "github":
      window.open(profile.github, "_blank", "noopener");
      return [`Opening ${profile.github} …`];
    case "linkedin":
      window.open(profile.linkedin, "_blank", "noopener");
      return [`Opening ${profile.linkedin} …`];
    case "resume":
      window.open(profile.resumeFile, "_blank", "noopener");
      return ["Opening résumé.pdf …"];
    case "sudo hire-me":
    case "sudo":
      return ["Permission granted. See you at the interview.", "(no actual privileges were escalated)"];
    default:
      return [`command not found: ${cmd}`, "type 'help' for a list of commands"];
  }
}

export function TerminalDrawer() {
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState<Line[]>([
    { kind: "output", text: `${profile.name} — interactive terminal. Type 'help' to get started.` },
  ]);
  const [input, setInput] = React.useState("");
  const [pastCommands, setPastCommands] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "`" && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = input;
    setInput("");
    setHistoryIndex(-1);

    if (value.trim().toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    if (value.trim().toLowerCase() === "exit") {
      setHistory((h) => [...h, { kind: "input", text: value }]);
      setOpen(false);
      return;
    }

    setPastCommands((prev) => [...prev, value]);
    const output = runCommand(value);
    setHistory((h) => [
      ...h,
      { kind: "input", text: value },
      ...output.map((text): Line => ({ kind: "output", text })),
    ]);
  }

  function onKeyDownInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!pastCommands.length) return;
      const nextIndex = historyIndex === -1 ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(pastCommands[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= pastCommands.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      }
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="terminal-drawer"
        title="Toggle terminal (`)"
        whileHover={{ scale: 1.08, rotateY: 15 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        style={{ transformPerspective: 400 }}
        className={cn(
          "fixed bottom-5 right-5 z-[100] grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-line bg-paper text-accent shadow-lg transition-colors hover:border-accent cursor-pointer",
          open && "border-accent"
        )}
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
              key="terminal"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 grid place-items-center"
            >
              <TerminalSquare className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="terminal-drawer"
            role="dialog"
            aria-label="Interactive terminal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-[95] h-[min(55vh,26rem)] overflow-hidden rounded-t-2xl border border-b-0 border-white/10 bg-[#0b0b12] text-[#f4f4f6] shadow-[0_-16px_50px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/50">
              <span>{profile.githubUsername.toLowerCase()} — terminal</span>
              <span className="hidden sm:inline">esc to close · ` to toggle</span>
            </div>
            <div ref={scrollRef} className="h-[calc(100%-6rem)] overflow-y-auto px-4 py-3 font-mono text-[0.83rem] leading-relaxed">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "whitespace-pre-wrap",
                    line.kind === "input" && "text-[#a3e635]",
                    line.kind === "error" && "text-[#ff6b81]",
                    line.kind === "output" && "text-white/80"
                  )}
                >
                  {line.kind === "input" ? `${PROMPT} ${line.text}` : line.text}
                </div>
              ))}
            </div>
            <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-sm">
              <span className="text-[#a3e635]">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDownInput}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent text-[#f4f4f6] outline-none"
                aria-label="Terminal command input"
              />
              <span className="w-2 animate-blink border-l border-[#f4f4f6]" aria-hidden="true" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
