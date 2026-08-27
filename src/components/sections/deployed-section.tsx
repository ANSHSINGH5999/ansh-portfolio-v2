import { ExternalLink, Star } from "lucide-react";
import { featuredProjects, profile } from "@/data/resume";
import { fetchAllRepos, type Repo } from "@/lib/github";
import { SectionDivider } from "@/components/section-divider";
import { PaperCard } from "@/components/ui/paper-card";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal } from "@/components/effects/reveal";
import { AllReposGrid } from "@/components/github/all-repos-grid";
import { LanguageDot } from "@/components/github/language-dot";

export async function DeployedSection() {
  const { repos, error } = await fetchAllRepos();
  const repoBySlug = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  return (
    <>
      <SectionDivider id="deployed" n="03" title="Featured" titleAccent="Projects" caption="Four things I've shipped end-to-end." />
      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredProjects.map((project, i) => {
              const live = project.repo ? repoBySlug.get(project.repo.toLowerCase()) : undefined;
              return (
                <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                  <TiltCard>
                    <PaperCard className="dog-ear flex h-full flex-col gap-3 p-5 transition-[transform,box-shadow,border-color] hover:border-accent-deep/50 hover:shadow-[0_24px_50px_-20px_rgba(163,230,53,0.35),0_10px_25px_-12px_rgba(20,19,15,0.3)]">
                      <span className="text-xs tracking-wide text-accent-deep">
                        {String(i + 1).padStart(2, "0")} / {project.tags[0].toUpperCase()}
                      </span>
                      <h3 className="font-display text-2xl font-black" style={{ transform: "translateZ(24px)" }}>
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted">{project.description}</p>
                      <ul className="flex flex-col gap-1.5">
                        {project.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-sm text-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-deep" />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {live && (
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <LanguageDot language={live.language} />
                          <span className="inline-flex items-center gap-1 text-[0.72rem] text-muted">
                            <Star className="h-3.5 w-3.5" /> {live.stars}
                          </span>
                        </div>
                      )}

                      <div className="mt-auto border-t border-line pt-3">
                        <a
                          href={live ? live.url : profile.github}
                          target="_blank"
                          rel="noopener"
                          className="hand-underline inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink hover:text-accent-deep"
                        >
                          Source on GitHub <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </PaperCard>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-16">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted">
              Every public repository — live from{" "}
              <a href={profile.github} target="_blank" rel="noopener" className="hand-underline text-accent-deep">
                github.com/{profile.githubUsername}
              </a>
            </p>
            {repos.length > 0 ? (
              <AllReposGrid repos={repos as Repo[]} />
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-paper p-6 text-sm text-muted">
                <p className="text-xs uppercase tracking-wide text-accent-deep">Repositories unavailable</p>
                <p className="mt-2">{error ?? "Could not load repositories."}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
