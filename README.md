# Ansh Singh — Portfolio v2

Production Next.js (App Router) portfolio: live GitHub sync, a Cmd+K command palette,
an interactive terminal drawer, glowing/tilting 21st.dev-style cards, and optional
retro sound effects.

## Stack

React 19 · Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
`cmdk` (command palette) · Lucide icons

## 1. Install & run locally

```bash
npm install
cp .env.example .env.local   # already done for you — just fill in the blanks below
npm run dev
```

Open http://localhost:3000.

## 2. Environment variables

Edit `.env.local` directly (it's gitignored — never commit it, never paste its
contents into a chat/AI tool):

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_GITHUB_USERNAME` | All GitHub sections | Already set to `ANSHSINGH5999`. |
| `GITHUB_TOKEN` | Contribution heatmap, higher REST rate limit | **Server-only** — never prefixed `NEXT_PUBLIC_`, so it's never sent to the browser. Create a fine-grained PAT at [github.com/settings/tokens](https://github.com/settings/tokens) scoped to read-only public repo access. |
| `NEXT_PUBLIC_X_HANDLE` | The X/Twitter live feed | Your handle without `@`, e.g. `ansh_dev`. Leave blank to hide the feed. |

**Security note:** an earlier GitHub token was pasted into chat during this build and
was **not** used or saved anywhere — treat any token that touches a chat log as
compromised and revoke it at github.com/settings/tokens, then generate a fresh one
and paste it only into `.env.local`.

Without `GITHUB_TOKEN`, everything still works except:
- the contribution heatmap shows an explanatory empty state (GraphQL has no
  unauthenticated tier)
- the REST-based sections (all-repos grid, recent commits) are capped at 60
  requests/hour instead of 5,000/hour

## 3. What's live vs. manual

- **All Repositories grid** (Deployed Work section) — every public, non-fork repo
  under your GitHub account, fetched live via REST, revalidated every 30 min. A
  "Show forks" checkbox reveals forked repos too, so nothing is hidden.
- **Recent commits ticker** — your last 5 public push-event commits, revalidated
  every 10 min.
- **Contribution heatmap** — GitHub's contribution calendar via GraphQL (needs
  `GITHUB_TOKEN`).
- **X feed** — X's official embedded-timeline widget for `NEXT_PUBLIC_X_HANDLE`.
  This is genuinely live (X's own script), not a scrape.
- **LinkedIn "Signal & Activity"** — **manually edited**, not live. LinkedIn has no
  public API for a personal profile's post feed, and scraping it violates their
  Terms of Service, so this repo doesn't attempt it. Edit
  `src/data/linkedin-signal.json` whenever you post or achieve something.
- **Featured project cards** (StellarPay, sXLM Liquid Staking, STLR Token Staking
  dApp, n8n AI Agent Hub) — descriptions are hand-written from the résumé in
  `src/data/resume.ts`. Two of them (`stellarpay`, `sxlm-liquid-staking`) are
  confirmed to match real repo slugs and show live stars/forks/language; the other
  two don't have a confirmed repo slug yet — add one in `featuredProjects` in
  `src/data/resume.ts` once you have it, and its live badge will appear
  automatically.

## 4. Interactive features

- **⌘K / Ctrl+K** — command palette: jump to any section, open GitHub/LinkedIn,
  email, download the résumé, toggle sound.
- **Terminal button** (bottom-right, or press `` ` ``) — type `help` for the full
  command list (`projects`, `skills`, `contact`, `resume`, etc.). All output is
  generated from the same `src/data/resume.ts` data as the rest of the site, so it
  can't drift out of sync.
- **Sound toggle** — off by default; synthesized retro blips via the Web Audio API,
  no audio file/license involved.
- All motion respects `prefers-reduced-motion` (see the global override in
  `src/app/globals.css`).

## 5. Editing your content

Everything résumé-shaped lives in one file: `src/data/resume.ts` (skills,
experience, featured projects, achievements, education, contact info). Change it
there and it propagates to the hero, sections, terminal commands, and command
palette automatically.

`public/resume.pdf` is the file served by "Download résumé" — replace it directly
when your résumé updates.

## 6. Deploy to Vercel

```bash
npm i -g vercel   # if you don't have the CLI
vercel login
vercel            # first run: link/create the project, deploy a preview
vercel --prod     # deploy to production
```

Or via the dashboard: [vercel.com/new](https://vercel.com/new) → import this repo
(push it to GitHub first) → it auto-detects Next.js, no build config needed.

**Before the first deploy**, add the environment variables from `.env.example` in
Vercel: Project → Settings → Environment Variables. Add `GITHUB_TOKEN` as a
server-only variable (do **not** prefix it `NEXT_PUBLIC_`), and
`NEXT_PUBLIC_GITHUB_USERNAME` / `NEXT_PUBLIC_X_HANDLE` as normal ones. Redeploy
after adding them.

## 7. Project structure

```
src/
  app/                 layout, globals.css, page.tsx
  components/
    sections/          Hero, Stack, Ledger, Deployed, Signal, Origin, Connect
    github/             live-data components (heatmap, activity ticker, repo grid)
    effects/            particle background, magnetic buttons, 3D tilt cards
    ui/                 button, badge, glow-border card
    command-palette.tsx, terminal-drawer.tsx, sound-toggle.tsx, x-feed.tsx,
    linkedin-signal-card.tsx
  data/                resume.ts (single source of truth), linkedin-signal.json
  lib/                 github.ts (server-only data fetching), sound.tsx, utils.ts
```
