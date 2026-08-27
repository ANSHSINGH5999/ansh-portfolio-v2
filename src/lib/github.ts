// Server-only GitHub data layer.
// GITHUB_TOKEN (no NEXT_PUBLIC_ prefix) never reaches the client bundle —
// this module must only be imported from Server Components / Route Handlers.

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "ANSHSINGH5999";
const TOKEN = process.env.GITHUB_TOKEN;
const REVALIDATE_SECONDS = 60 * 30; // 30 min — "live" via ISR, not a client poll

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  isFork: boolean;
  updatedAt: string;
  topics: string[];
};

export type ContributionDay = { date: string; count: number };
export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionDay[][];
};

export type CommitActivity = {
  repo: string;
  message: string;
  url: string;
  date: string;
};

function restHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  return headers;
}

/** All public repos for the user, most recently pushed first. Used to render
 * the full "every project on my GitHub" grid, and to resolve live stats for
 * the hand-written featured project cards. */
export async function fetchAllRepos(): Promise<{ repos: Repo[]; error: string | null }> {
  try {
    const perPage = 100;
    let page = 1;
    const all: Repo[] = [];
    for (;;) {
      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=${perPage}&page=${page}&sort=pushed`,
        { headers: restHeaders(), next: { revalidate: REVALIDATE_SECONDS } }
      );
      if (!res.ok) {
        if (res.status === 403) {
          return { repos: [], error: "GitHub API rate limit hit. Add GITHUB_TOKEN to raise the limit." };
        }
        return { repos: [], error: `GitHub API error (${res.status}).` };
      }
      const batch = (await res.json()) as Array<Record<string, unknown>>;
      for (const r of batch) {
        all.push({
          name: r.name as string,
          description: (r.description as string | null) ?? null,
          url: r.html_url as string,
          homepage: (r.homepage as string | null) || null,
          stars: (r.stargazers_count as number) ?? 0,
          forks: (r.forks_count as number) ?? 0,
          language: (r.language as string | null) ?? null,
          isFork: Boolean(r.fork),
          updatedAt: r.pushed_at as string,
          topics: (r.topics as string[]) ?? [],
        });
      }
      if (batch.length < perPage) break;
      page += 1;
      if (page > 10) break; // hard stop, 1000 repos is plenty
    }
    return { repos: all, error: null };
  } catch {
    return { repos: [], error: "Could not reach the GitHub API." };
  }
}

/** GraphQL contribution calendar (heatmap). Requires GITHUB_TOKEN — the
 * GraphQL API has no unauthenticated tier. Returns null (not a crash) when
 * no token is configured, and callers render an explanatory empty state. */
export async function fetchContributionCalendar(): Promise<{
  calendar: ContributionCalendar | null;
  error: string | null;
}> {
  if (!TOKEN) {
    return { calendar: null, error: "Set GITHUB_TOKEN to enable the contribution heatmap." };
  }
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: USERNAME } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return { calendar: null, error: `GitHub GraphQL error (${res.status}).` };
    const json = await res.json();
    if (json.errors) return { calendar: null, error: json.errors[0]?.message ?? "GraphQL error." };
    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return { calendar: null, error: "No contribution data returned." };
    return {
      calendar: {
        totalContributions: cal.totalContributions,
        weeks: cal.weeks.map((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
          w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
        ),
      },
      error: null,
    };
  } catch {
    return { calendar: null, error: "Could not reach the GitHub GraphQL API." };
  }
}

/** Recent public push activity, flattened to individual commits, newest first. */
export async function fetchRecentCommits(limit = 5): Promise<{
  commits: CommitActivity[];
  error: string | null;
}> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
      { headers: restHeaders(), next: { revalidate: 60 * 10 } }
    );
    if (!res.ok) {
      return { commits: [], error: `GitHub API error (${res.status}).` };
    }
    const events = (await res.json()) as Array<Record<string, unknown>>;
    const commits: CommitActivity[] = [];
    for (const e of events) {
      if (e.type !== "PushEvent") continue;
      const repoName = (e.repo as { name: string }).name;
      const payload = e.payload as { commits?: Array<{ sha: string; message: string }> };
      for (const c of payload.commits ?? []) {
        commits.push({
          repo: repoName,
          message: c.message.split("\n")[0],
          url: `https://github.com/${repoName}/commit/${c.sha}`,
          date: e.created_at as string,
        });
        if (commits.length >= limit) break;
      }
      if (commits.length >= limit) break;
    }
    return { commits, error: null };
  } catch {
    return { commits: [], error: "Could not reach the GitHub API." };
  }
}
