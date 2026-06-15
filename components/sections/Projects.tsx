"use client"

import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { FadeIn } from "@/components/primitives/FadeIn"
import { ScrollReveal } from "@/components/primitives/ScrollReveal"
import { getProjects } from "@/lib/data/projects"
import { useLanguage } from "@/lib/i18n"
import { cardReveal } from "@/lib/motion"
import type { ProjectEntry } from "@/lib/types"

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
      className="w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden px-6"
      style={{
        background:
          "linear-gradient(135deg, hsl(213 90% 53% / 0.10) 0%, hsl(250 80% 55% / 0.06) 100%)",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(hsl(213 90% 53% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(213 90% 53% / 0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Publication badge */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border"
          style={{
            borderColor: "hsl(213 90% 53% / 0.35)",
            background: "hsl(213 90% 53% / 0.10)",
            color: "hsl(213 90% 70%)",
          }}
        >
          HCI International 2025 · Springer Nature
        </span>

        {/* Stats row */}
        <div className="flex items-center gap-5">
          {[
            { value: "92%", label: "accuracy" },
            { value: "60+", label: "dogs" },
            { value: "8mo", label: "research" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span
                className="text-2xl font-semibold tabular-nums"
                style={{ color: "hsl(213 90% 65%)" }}
              >
                {value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-2">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-[220px]">
          {["Computer Vision", "React Native", "OpenCV", "Python"].map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{
                borderColor: "hsl(213 90% 53% / 0.25)",
                background: "hsl(213 90% 53% / 0.07)",
                color: "hsl(213 90% 70% / 0.8)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "operations-dashboard") return <DashboardVisual />
  if (slug === "salva-lomitos") return <SalvaLomitosVisual />
  return null
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: ProjectEntry }) {
  const { language } = useLanguage()

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 h-full backdrop-blur-sm"
      style={{ backgroundColor: "var(--card-bg)" }}
    >
      {/* Visual */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <ProjectVisual slug={project.slug} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--card-bg)] pointer-events-none" />
        {project.featured && (
          <span className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {language === "es" ? "Destacado" : "Featured"}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 px-5 pb-5 pt-4 border-t border-border/50 flex-1">
        <div>
          <h2 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Stretched link — covers the entire card */}
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0"
          >
            {language === "es" ? "Leer caso de estudio" : "Read case study"}
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-xs text-muted-2 hover:text-accent transition-colors duration-150"
            >
              <ExternalLink size={12} />
              {language === "es" ? "Abrir proyecto" : "Open project"}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Projects() {
  const { language } = useLanguage()
  const projects = getProjects(language)

  return (
    <section id="work" className="py-24 md:py-32 scroll-mt-20">
      <Container size="md">
        <FadeIn>
          <SectionLabel>{language === "es" ? "Trabajo" : "Work"}</SectionLabel>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              variants={cardReveal}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
