"use client"

import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { SectionHeading } from "@/components/primitives/SectionHeading"
import { ThemedImage } from "@/components/primitives/ThemedImage"
import { Parallax } from "@/components/primitives/Parallax"
import { AmbientBlobs } from "@/components/primitives/AmbientBlobs"
import { getProjects } from "@/lib/data/projects"
import { useLanguage } from "@/lib/i18n"
import { sceneVars } from "@/lib/scene"
import type { ProjectEntry } from "@/lib/types"

// ─── Visuals ──────────────────────────────────────────────────────────────────

const CARD_IMAGE_SIZES = "(min-width: 768px) 620px, 100vw"

function DashboardVisual() {
  return (
    <ThemedImage
      src="/dashboard-dark.png"
      srcLight="/dashboard-light.png"
      alt=""
      sizes={CARD_IMAGE_SIZES}
      fill
      className="object-cover object-left-top"
    />
  )
}

function TempoVisual() {
  return (
    <ThemedImage
      src="/tempo/explore-map-dark.jpg"
      srcLight="/tempo/explore-map-light.jpg"
      alt=""
      sizes={CARD_IMAGE_SIZES}
      fill
      className="object-cover object-left-top"
    />
  )
}

function SalvaLomitosVisual() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden px-6"
      style={{
        background:
          `linear-gradient(135deg, color-mix(in oklch, var(--color-accent) 14%, transparent) 0%, color-mix(in oklch, var(--color-accent-deep) 12%, transparent) 100%)`,
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            `linear-gradient(color-mix(in oklch, var(--color-accent) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-accent) 7%, transparent) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Publication badge */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border"
          style={{
            borderColor: "color-mix(in oklch, var(--color-accent) 35%, transparent)",
            background: "color-mix(in oklch, var(--color-accent) 10%, transparent)",
            color: "var(--color-accent-fg)",
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
                style={{ color: "var(--color-accent-fg)" }}
              >
                {value}
              </span>
              <span className="text-[12px] font-mono uppercase tracking-widest text-muted-2">
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
              className="text-[12px] font-mono px-2 py-0.5 rounded border"
              style={{
                borderColor: "color-mix(in oklch, var(--color-accent) 25%, transparent)",
                background: "color-mix(in oklch, var(--color-accent) 8%, transparent)",
                color: "var(--color-accent-fg)",
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
  if (slug === "tempo") return <TempoVisual />
  if (slug === "operations-dashboard") return <DashboardVisual />
  if (slug === "salva-lomitos") return <SalvaLomitosVisual />
  return null
}

// ─── Card ─────────────────────────────────────────────────────────────────────
// Tarjeta ancha: captura a la izquierda y texto a la derecha (en celular, una sobre otra).

function ProjectCard({ project, style }: { project: ProjectEntry; style?: React.CSSProperties }) {
  const { language } = useLanguage()

  return (
    <div
      className="scene glass-panel group relative flex flex-col md:flex-row rounded-3xl overflow-clip hover:border-accent/40 transition-colors duration-300"
      style={style}
    >
      {/* Visual */}
      <div className="relative overflow-clip h-[200px] md:h-auto md:min-h-[320px] md:w-[55%] shrink-0">
        {/* Las capturas se desplazan dentro de su marco al hacer scroll (parallax); la tarjeta
            de investigación es texto y va fija. */}
        {project.slug === "salva-lomitos" ? (
          <ProjectVisual slug={project.slug} />
        ) : (
          <Parallax photo factor={0.15} className="absolute inset-0">
            <ProjectVisual slug={project.slug} />
          </Parallax>
        )}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-background/30 pointer-events-none" />
        {project.featured && (
          <span className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 glass rounded-full text-xs font-medium text-accent-fg">
            {language === "es" ? "Destacado" : "Featured"}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-border/50 flex-1">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-accent-fg transition-colors duration-200">
            {project.title}
          </h2>
          <p className="mt-2 text-body text-muted line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[12px] px-1.5 py-0.5 rounded border border-border text-muted-2"
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
            className="flex items-center gap-1.5 text-sm font-medium text-accent-fg after:absolute after:inset-0"
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
              className="relative z-10 inline-flex items-center gap-1.5 py-1 -my-1 text-xs text-muted-2 hover:text-accent-fg transition-colors duration-150"
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
// Cartas apiladas (globals.css, "Cartas apiladas"): cada tarjeta se queda fija arriba
// (sticky, un escalón más abajo que la anterior) y la siguiente sube encima mientras la
// de abajo se encoge y se oscurece, según el avance de la pila (--stack) por la pantalla.

export function Projects() {
  const { language } = useLanguage()
  const projects = getProjects(language)

  return (
    <section id="work" className="section-scope section-y scroll-mt-20 relative overflow-clip">
      <AmbientBlobs />
      <Container size="md">
        <SectionHeading title={language === "es" ? "Proyectos seleccionados" : "Selected work"} />

        <div className="stack" style={{ "--cards": projects.length } as React.CSSProperties}>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="stack-item"
              style={{ "--i": i, "--rev": projects.length - 1 - i } as React.CSSProperties}
            >
              <div className="stack-card relative">
                {/* Llega creciendo desde abajo antes de fijarse (la escena es la tarjeta) */}
                <ProjectCard project={project} style={sceneVars("zoom")} />
                <div aria-hidden className="stack-dim pointer-events-none absolute inset-0 rounded-3xl bg-background" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
