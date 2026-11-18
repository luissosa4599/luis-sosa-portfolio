"use client"

import { Eye, Target, MessageSquare, Cpu } from "lucide-react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { FadeIn } from "@/components/primitives/FadeIn"
import { ScrollReveal } from "@/components/primitives/ScrollReveal"
import { AmbientBlobs } from "@/components/primitives/AmbientBlobs"
import { alternateReveal, withDelay } from "@/lib/motion"
import { getApproach } from "@/lib/data/approach"
import { useLanguage } from "@/lib/i18n"

// Barra superior de cada tarjeta: recorre la paleta (acento, brillo, verde de estados, profundo)
const BAR_COLORS = [
  "var(--color-accent)",
  "var(--color-accent-glow)",
  "var(--color-success)",
  "var(--color-accent-deep)",
]

const ICONS = [Eye, Target, MessageSquare, Cpu]

export function Approach() {
  const { language } = useLanguage()
  const approach = getApproach(language)

  return (
    <SectionWrapper id="approach" className="relative overflow-hidden">
      <AmbientBlobs flip />
      <FadeIn>
        <SectionLabel>{language === "es" ? "Enfoque" : "Approach"}</SectionLabel>
        <h2 className="text-section font-semibold tracking-tight text-foreground">
          {language === "es" ? "Cómo trabajo" : "How I work"}
        </h2>
      </FadeIn>

      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {approach.map((principle, i) => {
          const Icon = ICONS[i]
          return (
            <ScrollReveal
              key={principle.index}
              as="article"
              variants={withDelay(alternateReveal(i), (i % 2) * 0.12)}
              className="glass-panel group relative flex flex-col gap-6 rounded-3xl p-7 md:p-8 overflow-hidden hover:border-accent/40 transition-colors duration-300"
            >
              {/* Barra superior de color */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                style={{ background: BAR_COLORS[i % BAR_COLORS.length] }}
              />

              {/* Ambient glow blob — top-right corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, var(--blob-a), transparent 70%)" }}
              />

              {/* Top row: icon left, number right */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-fg shrink-0">
                  <Icon size={20} />
                </div>
                {/* Número decorativo (marca de agua): aria-hidden, no se lee ni cuenta para contraste */}
                <span aria-hidden className="font-mono text-5xl font-bold text-accent/[0.14] select-none leading-none -mt-1">
                  {principle.index}
                </span>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {principle.heading}
                </h3>
                <p className="text-body text-muted">
                  {principle.body}
                </p>
              </div>

              {/* Bottom accent line — appears on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
              />
            </ScrollReveal>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
