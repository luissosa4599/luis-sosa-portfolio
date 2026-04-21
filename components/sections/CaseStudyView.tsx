"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import { FadeIn } from "@/components/primitives/FadeIn"
import { getProjects } from "@/lib/data/projects"
import { useLanguage } from "@/lib/i18n"
import type { CaseStudyDecision, CaseStudyScreenshot } from "@/lib/types"

// ─── Primitives ───────────────────────────────────────────────────────────────

function MetaChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border border-border bg-surface text-muted-2">
      {label}
    </span>
  )
}

function CsHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="block w-4 h-px bg-accent shrink-0" />
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-accent">
        {children}
      </h2>
    </div>
  )
}

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function Decisions({ decisions }: { decisions: CaseStudyDecision[] }) {
  return (
    <div className="flex flex-col gap-7">
      {decisions.map((d, i) => (
        <div key={i} className="flex gap-5">
          <span className="font-mono text-3xl font-bold text-foreground/[0.05] select-none shrink-0 leading-none mt-0.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5">{d.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{d.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Screenshots({ screenshots }: { screenshots: CaseStudyScreenshot[] }) {
  return (
    <div className="flex flex-col gap-8">
      {screenshots.map((s, i) => (
        <figure key={i}>
          <div className="rounded-xl overflow-hidden border border-border">
            {s.srcLight ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} className="theme-dark-only w-full h-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.srcLight} alt={s.alt} className="theme-light-only w-full h-auto" />
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.src} alt={s.alt} className="w-full h-auto" />
            )}
          </div>
          {s.caption && (
            <figcaption className="mt-2 text-xs text-muted-2 text-center">
              {s.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

// ─── Main view ────────────────────────────────────────────────────────────────

export function CaseStudyView({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const projects = getProjects(language)
  const idx = projects.findIndex((p) => p.slug === slug)
  const project = projects[idx]
  const nextProject = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null

  const labels = {
    en: {
      back: "Back to work",
      caseStudy: "Case Study",
      viewLive: "View live",
      viewCode: "View code",
      context: "Context",
      myRole: "My Role",
      keyDecisions: "Key Decisions",
      whatIBuilt: "What I Built",
      videoDemo: "Video Demo",
      challenges: "Challenges & Tradeoffs",
      impact: "Impact",
      lessons: "Lessons",
      allWork: "All work",
      next: "Next",
    },
    es: {
      back: "Volver a proyectos",
      caseStudy: "Caso de Estudio",
      viewLive: "Ver demo",
      viewCode: "Ver código",
      context: "Contexto",
      myRole: "Mi Rol",
      keyDecisions: "Decisiones Clave",
      whatIBuilt: "Qué Construí",
      videoDemo: "Demo en Video",
      challenges: "Retos y Tradeoffs",
      impact: "Impacto",
      lessons: "Lecciones",
      allWork: "Todos los proyectos",
      next: "Siguiente",
    },
  }[language]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container className="text-center py-32">
          <p className="text-muted mb-4">Project not found.</p>
          <Link href="/#work" className="text-accent hover:underline text-sm">
            ← Back to work
          </Link>
        </Container>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      {/* Dot-grid background */}
      <div
        aria-hidden
        className="dot-grid fixed inset-0 pointer-events-none z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div className="relative z-10">

        {/* Back link */}
        <Container className="pt-24 pb-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            {labels.back}
          </Link>
        </Container>

        {/* ── Project hero ─────────────────────────────────────── */}
        <Container className="pb-14">
          <FadeIn>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border border-accent/20 bg-accent/[0.06] text-accent mb-6">
              {labels.caseStudy}
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="mt-3 text-lg text-muted max-w-2xl leading-relaxed">
                {project.subtitle}
              </p>
            )}

            {/* Meta chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.role && <MetaChip label={project.role} />}
              {project.timeline && <MetaChip label={project.timeline} />}
              {project.teamSize && <MetaChip label={project.teamSize} />}
              {project.tags.map((tag) => (
                <MetaChip key={tag} label={tag} />
              ))}
            </div>

            {/* External links */}
            <div className="mt-5 flex flex-wrap gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  {labels.viewLive}
                  <ArrowRight size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                >
                  {labels.viewCode}
                  <ArrowRight size={14} />
                </a>
              )}
            </div>
          </FadeIn>

          {/* Hero screenshot */}
          {project.screenshots && project.screenshots.length > 0 && (
            <FadeIn delay={0.1} className="mt-10">
              <div className="rounded-2xl overflow-hidden border border-border">
                {project.screenshots[0].srcLight ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.screenshots[0].src}
                      alt={project.screenshots[0].alt}
                      className="theme-dark-only w-full h-auto"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.screenshots[0].srcLight}
                      alt={project.screenshots[0].alt}
                      className="theme-light-only w-full h-auto"
                    />
                  </>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    className="w-full h-auto"
                  />
                )}
              </div>
              {project.screenshots[0].caption && (
                <p className="mt-2 text-xs text-muted-2 text-center">
                  {project.screenshots[0].caption}
                </p>
              )}
            </FadeIn>
          )}
        </Container>

        {/* ── Case study content ───────────────────────────────── */}
        <Container className="pb-24" size="sm">
          <div className="flex flex-col gap-16">

            {project.context && (
              <FadeIn>
                <CsHeading>{labels.context}</CsHeading>
                <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                  {project.context}
                </p>
              </FadeIn>
            )}

            {project.myRole && (
              <FadeIn>
                <CsHeading>{labels.myRole}</CsHeading>
                <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                  {project.myRole}
                </p>
              </FadeIn>
            )}

            {project.keyDecisions && project.keyDecisions.length > 0 && (
              <FadeIn>
                <CsHeading>{labels.keyDecisions}</CsHeading>
                <Decisions decisions={project.keyDecisions} />
              </FadeIn>
            )}

            {project.screenshots && project.screenshots.length > 1 && (
              <FadeIn>
                <CsHeading>{labels.whatIBuilt}</CsHeading>
                <Screenshots screenshots={project.screenshots.slice(1)} />
              </FadeIn>
            )}

            {project.loomUrl && (
              <FadeIn>
                <CsHeading>{labels.videoDemo}</CsHeading>
                <div
                  className="relative rounded-xl overflow-hidden border border-border"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    src={project.loomUrl}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    title={`${project.title} demo`}
                  />
                </div>
              </FadeIn>
            )}

            {project.challenges && (
              <FadeIn>
                <CsHeading>{labels.challenges}</CsHeading>
                <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                  {project.challenges}
                </p>
              </FadeIn>
            )}

            {project.impact && project.impact.length > 0 && (
              <FadeIn>
                <CsHeading>{labels.impact}</CsHeading>
                <ul className="flex flex-col gap-3">
                  {project.impact.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-base text-foreground/85">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </FadeIn>
            )}

            {project.lessons && (
              <FadeIn>
                <CsHeading>{labels.lessons}</CsHeading>
                <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                  {project.lessons}
                </p>
              </FadeIn>
            )}

          </div>
        </Container>

        {/* ── Bottom navigation ────────────────────────────────── */}
        <Container className="pb-20">
          <div className="flex items-center justify-between border-t border-border pt-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              {labels.allWork}
            </Link>
            {nextProject && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                {labels.next}:{" "}
                <span className="font-medium text-foreground">{nextProject.title}</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </Container>

      </div>
    </div>
  )
}
