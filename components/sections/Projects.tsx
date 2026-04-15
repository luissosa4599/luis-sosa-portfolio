"use client"

import { Lock, ArrowUpRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { FadeIn } from "@/components/primitives/FadeIn"
import { StaggerList } from "@/components/primitives/StaggerList"
import { projects } from "@/lib/data/projects"

function DashboardScreenshot() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const src =
    mounted && resolvedTheme === "light"
      ? "/dashboard-light.png"
      : "/dashboard-dark.png"
  const alt =
    mounted && resolvedTheme === "light"
      ? "Operations dashboard — light mode"
      : "Operations dashboard — dark mode"

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="relative w-full h-auto rounded-t-lg" />
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function Projects() {
  const featured = projects.find((p) => p.featured)
  const secondary = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="work">
      <FadeIn>
        <SectionLabel>Work</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Selected projects
        </h2>
      </FadeIn>

      {/* ── Featured project ─────────────────────────────────── */}
      {featured && (
        <FadeIn className="mt-12">
          <article className="group relative rounded-2xl border border-border bg-surface overflow-hidden transition-colors duration-300 hover:border-accent/25">

            {/* Screenshot preview */}
            <div className="relative overflow-hidden bg-background px-6 pt-6 md:px-10 md:pt-10">
              {/* Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 100%, hsl(213 100% 70% / 0.07) 0%, transparent 70%)",
                }}
              />
              <DashboardScreenshot />
            </div>

            {/* Info */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 p-6 md:p-8">
              <div className="flex flex-col gap-3 max-w-xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {featured.title}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                    Featured
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {featured.description}
                </p>
                <ul className="flex flex-wrap gap-2 mt-1" aria-label="Technologies">
                  {featured.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-2.5 py-0.5 rounded text-xs font-mono text-muted bg-surface-2 border border-border"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 shrink-0">
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on GitHub"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                )}
                {featured.url && featured.url !== featured.githubUrl && (
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors duration-200 group/link"
                  >
                    View project
                    <ArrowUpRight
                      size={14}
                      className="opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                    />
                  </a>
                )}
              </div>
            </div>
          </article>
        </FadeIn>
      )}

      {/* ── Secondary projects ───────────────────────────────── */}
      {secondary.length > 0 && (
        <StaggerList className="mt-6 flex flex-col gap-4">
          {secondary.map((project) => (
            <FadeIn key={project.slug} asChild>
              <article className="rounded-xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row sm:items-start gap-6 hover:border-border-strong transition-colors duration-200">

                {/* Lock icon */}
                <div className="shrink-0 w-10 h-10 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-muted">
                  <Lock size={16} />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-muted-2 border border-border bg-surface-2">
                      Private
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="px-2.5 py-0.5 rounded text-xs font-mono text-muted bg-surface-2 border border-border"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-muted-2 shrink-0 sm:pt-0.5">
                  Details on request
                </p>
              </article>
            </FadeIn>
          ))}
        </StaggerList>
      )}
    </SectionWrapper>
  )
}
