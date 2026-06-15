"use client"

import { FadeIn } from "@/components/primitives/FadeIn"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { useLanguage } from "@/lib/i18n"
import { ExternalLink } from "lucide-react"

interface Testimonial {
  quote: { en: string; es: string }
  name: string
  role: string
  company: string
  pdf?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      en: "One of Luis Alberto's most outstanding qualities has been his ability to understand business needs and turn them into functional, efficient, and maintainable technical solutions. His analytical approach and results orientation let him identify opportunities for improvement and contribute significantly to the success of strategic projects.",
      es: "Uno de los aspectos más destacados de Luis Alberto ha sido su capacidad para comprender las necesidades del negocio y transformarlas en soluciones tecnológicas funcionales, eficientes y fáciles de mantener. Su enfoque analítico y orientación a resultados le permitieron identificar oportunidades de mejora y contribuir significativamente al éxito de distintos proyectos estratégicos.",
    },
    name: "Oscar Enrique Ramírez Díaz",
    role: "Coordinador de Software",
    company: "Cantilever",
    pdf: "/recommendation-cantilever.pdf",
  },
]

export function Testimonials() {
  const { language } = useLanguage()

  return (
    <SectionWrapper id="testimonials" containerSize="md">
      <FadeIn>
        <SectionLabel className="mb-0">
          {language === "es" ? "Referencias" : "References"}
        </SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {language === "es" ? "Lo que dicen de mi trabajo" : "What people say"}
        </h2>
      </FadeIn>

      <div className="mt-10 flex flex-col gap-4">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <figure className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-7">
              <span
                className="font-serif text-5xl leading-none text-accent select-none"
                aria-hidden
              >
                &ldquo;
              </span>

              <blockquote className="flex-1">
                <p className="text-sm text-muted leading-relaxed">{t.quote[language]}</p>
              </blockquote>

              <figcaption className="flex items-center justify-between gap-3 border-t border-border/50 pt-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center font-mono text-xs text-muted-2 shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-2">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>

                {t.pdf && (
                  <a
                    href={t.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-2 hover:text-accent transition-colors duration-150"
                  >
                    <ExternalLink size={12} />
                    {language === "es" ? "Ver carta completa" : "View full letter"}
                  </a>
                )}
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}
