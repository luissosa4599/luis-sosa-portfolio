"use client"

import { useState, useRef, useCallback } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { getProjects } from "@/lib/data/projects"
import { useLanguage } from "@/lib/i18n"
import type { ProjectEntry } from "@/lib/types"

const GAP = 20 // px between cards

// ─── Visuals ──────────────────────────────────────────────────────────────────

function DashboardVisual() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dashboard-dark.png"
        alt=""
        aria-hidden
        className="theme-dark-only h-full w-full object-cover object-left-top"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dashboard-light.png"
        alt=""
        aria-hidden
        className="theme-light-only h-full w-full object-cover object-left-top"
      />
    </>
  )
}

function SalvaLomitosVisual() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(213 90% 53% / 0.12) 0%, hsl(250 80% 55% / 0.08) 100%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(213 90% 53% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(213 90% 53% / 0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <svg viewBox="0 0 80 80" className="w-24 h-24 relative z-10" aria-hidden fill="none">
        <ellipse cx="24" cy="18" rx="7" ry="8" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="42" cy="13" rx="7" ry="8" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="59" cy="18" rx="7" ry="8" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="14" cy="33" rx="6" ry="7" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="42" cy="52" rx="20" ry="18" fill="hsl(213 90% 53% / 0.45)" />
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, hsl(213 90% 53% / 0.12) 0%, transparent 70%)" }}
      />
    </div>
  )
}

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "operations-dashboard") return <DashboardVisual />
  if (slug === "salva-lomitos") return <SalvaLomitosVisual />
  return null
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, cardWidth }: { project: ProjectEntry; cardWidth: number }) {
  const { language } = useLanguage()

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-border-strong transition-colors duration-300 shrink-0"
      style={{ width: cardWidth, height: "clamp(460px, 58vh, 560px)" }}
    >
      {/* Visual — clicking opens project URL */}
      <div
        onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")}
        role={project.url ? "link" : undefined}
        tabIndex={project.url ? 0 : undefined}
        onKeyDown={(e) => {
          if (project.url && (e.key === "Enter" || e.key === " ")) {
            window.open(project.url, "_blank", "noopener,noreferrer")
          }
        }}
        aria-label={project.url ? `Open ${project.title}` : undefined}
        style={{
          flex: 1,
          cursor: project.url ? "pointer" : "default",
          position: "relative",
          overflow: "hidden",
          minHeight: 150,
        }}
      >
        <ProjectVisual slug={project.slug} />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 50%, var(--surface) 100%)" }}
        />

        {/* Action pills — stop propagation so they don't trigger the div's onClick */}
        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          {/* Temporarily hidden while the repository remains private. */}
          {/* {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-background/75 backdrop-blur-sm border border-border/60 text-muted hover:text-foreground hover:bg-background/90 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          )} */}
          {project.url && project.url !== project.githubUrl && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-background/75 backdrop-blur-sm border border-border/60 text-muted hover:text-accent hover:bg-background/90 transition-colors"
              aria-label="View project"
            >
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-3 px-5 pb-5 pt-4 border-t border-border/50 shrink-0">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-semibold text-accent leading-snug">{project.title}</h2>
          {project.featured && (
            <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              {language === "es" ? "Destacado" : "Featured"}
            </span>
          )}
        </div>

        <p className="text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>

        <ul className="flex flex-wrap gap-2" aria-label={language === "es" ? "Tecnologías" : "Technologies"}>
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="px-2.5 py-1 rounded text-xs font-mono text-muted-2 bg-surface-2 border border-border"
            >
              {tag}
            </li>
          ))}
          {project.tags.length > 4 && (
            <li className="px-2.5 py-1 rounded text-xs font-mono text-muted-2 bg-surface-2 border border-border">
              +{project.tags.length - 4}
            </li>
          )}
        </ul>

      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

const VISIBLE = 2 // cards shown at once on desktop

export function Projects() {
  const { language } = useLanguage()
  const [idx, setIdx] = useState(0)
  const [cardWidth, setCardWidth] = useState(320)
  const [visible, setVisible] = useState(VISIBLE)
  const trackRef = useRef<HTMLDivElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const projects = getProjects(language)

  const measure = useCallback(() => {
    if (!trackRef.current) return
    const w = trackRef.current.offsetWidth
    const v = w < 560 ? 1 : 2
    setVisible(v)
    setCardWidth(Math.floor((w - GAP * (v - 1)) / v))
  }, [])

  const setTrackRef = useCallback(
    (node: HTMLDivElement | null) => {
      resizeObserverRef.current?.disconnect()
      trackRef.current = node
      if (!node) return

      measure()
      const ro = new ResizeObserver(measure)
      ro.observe(node)
      resizeObserverRef.current = ro
    },
    [measure]
  )

  const maxIdx = Math.max(0, projects.length - visible)

  function prev() { setIdx((i) => Math.max(0, i - 1)) }
  function next() { setIdx((i) => Math.min(maxIdx, i + 1)) }

  const step = cardWidth + GAP

  return (
    <section id="work" className="h-[100svh] flex flex-col justify-center">
      <Container size="md" className="w-full">
        <div className="flex flex-col gap-6">

          {/* Header row — mb-0 on SectionLabel to fix flex alignment */}
          <div className="flex items-center justify-between">
            <SectionLabel className="mb-0">{language === "es" ? "Trabajo" : "Work"}</SectionLabel>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-2 tabular-nums">
                {idx + 1}–{Math.min(idx + visible, projects.length)} / {projects.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={prev}
                  disabled={idx === 0}
                  aria-label="Previous project"
                  className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-muted hover:text-foreground hover:border-border-strong disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={next}
                  disabled={idx === maxIdx}
                  aria-label="Next project"
                  className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-muted hover:text-foreground hover:border-border-strong disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel track */}
          <div ref={setTrackRef} className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ gap: GAP }}
              animate={{ x: -(idx * step) }}
              transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} cardWidth={cardWidth} />
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2" role="tablist" aria-label={language === "es" ? "Proyectos" : "Projects"}>
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to position ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 20 : 6,
                  height: 6,
                  backgroundColor:
                    i === idx ? "hsl(213 90% 53%)" : "hsl(220 8% 65% / 0.35)",
                }}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
