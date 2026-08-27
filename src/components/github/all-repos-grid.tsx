"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Search, Star } from "lucide-react";
import type { Repo } from "@/lib/github";
import { PaperCard } from "@/components/ui/paper-card";
import { LanguageDot } from "@/components/github/language-dot";
import { TiltCard } from "@/components/effects/tilt-card";

function isMeaningful(repo: Repo) {
  return Boolean(repo.description) || repo.stars > 0 || repo.forks > 0;
}

export function AllReposGrid({ repos }: { repos: Repo[] }) {
  const [query, setQuery] = React.useState("");
  const [showForks, setShowForks] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  const nonForkCount = React.useMemo(() => repos.filter((r) => !r.isFork).length, [repos]);
  const curatedCount = React.useMemo(
    () => repos.filter((r) => !r.isFork && isMeaningful(r)).length,
    [repos]
  );
  const hiddenByCuration = nonForkCount - curatedCount;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos
      .filter((r) => (showForks ? true : !r.isFork))
      .filter((r) => (showAll ? true : isMeaningful(r)))
      .filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          (r.description ?? "").toLowerCase().includes(q) ||
          (r.language ?? "").toLowerCase().includes(q)
      )
      .sort((a, b) => b.stars - a.stars || +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }, [repos, query, showForks, showAll]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, language…"
            className="w-full rounded-sm border border-line bg-paper py-2.5 pl-9 pr-3 font-mono text-sm text-ink outline-none placeholder:text-muted focus-visible:border-accent"
          />
        </div>
        <label className="flex select-none items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted">
          <input
            type="checkbox"
            checked={showForks}
            onChange={(e) => setShowForks(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          Show forks
        </label>
      </div>

      <p className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted">
        <span>
          {filtered.length} {filtered.length === 1 ? "repository" : "repositories"} synced live from GitHub
        </span>
        {!showAll && hiddenByCuration > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="cursor-pointer text-accent underline-offset-2 hover:underline"
            >
              show {hiddenByCuration} more without a description or activity
            </button>
          </>
        )}
        {showAll && hiddenByCuration > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="cursor-pointer text-accent underline-offset-2 hover:underline"
            >
              show curated only
            </button>
          </>
        )}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((repo, i) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.03 }}
          >
            <TiltCard maxTilt={6}>
              <PaperCard className="h-full p-4">
                <RepoCardBody repo={repo} />
              </PaperCard>
            </TiltCard>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center font-mono text-sm text-muted">
            No repositories match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}

function RepoCardBody({ repo }: { repo: Repo }) {
  return (
    <a href={repo.url} target="_blank" rel="noopener" className="flex h-full flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-sans text-base font-semibold text-ink" style={{ transform: "translateZ(16px)" }}>
          {repo.name}
        </h3>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
      </div>
      <p className="line-clamp-2 flex-1 text-sm text-muted">{repo.description ?? "No description provided."}</p>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <LanguageDot language={repo.language} />
        <span className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-muted">
          <Star className="h-3.5 w-3.5" aria-hidden="true" /> {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-muted">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" /> {repo.forks}
        </span>
        {repo.isFork && (
          <span className="font-mono text-[0.68rem] uppercase tracking-wide text-accent">fork</span>
        )}
      </div>
    </a>
  );
}
