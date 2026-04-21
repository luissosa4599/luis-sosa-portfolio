"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { FadeIn } from "@/components/primitives/FadeIn"
import { getProjects } from "@/lib/data/projects"
import { useLanguage } from "@/lib/i18n"
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
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(213 90% 53% / 0.12) 0%, hsl(250 80% 55% / 0.08) 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(213 90% 53% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(213 90% 53% / 0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <svg viewBox="0 0 80 80" className="w-20 h-20 relative z-10" aria-hidden fill="none">
        <ellipse cx="24" cy="18" rx="7" ry="8" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="42" cy="13" rx="7" ry="8" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="59" cy="18" rx="7" ry="8" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="14" cy="33" rx="6" ry="7" fill="hsl(213 90% 53% / 0.35)" />
        <ellipse cx="42" cy="52" rx="20" ry="18" fill="hsl(213 90% 53% / 0.45)" />
      </svg>
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
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-accent/30 transition-all duration-300 h-full"
    >
      {/* Visual */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <ProjectVisual slug={project.slug} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/70 pointer-events-none" />
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

        {/* CTA */}
        <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-accent">
          {language === "es" ? "Leer caso de estudio" : "Read case study"}
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
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
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
