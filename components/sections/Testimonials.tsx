"use client"

import { FadeIn } from "@/components/primitives/FadeIn"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { useLanguage } from "@/lib/i18n"

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

// Replace with real testimonials — ideally in English from managers or colleagues
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "[Placeholder] Luis took ownership of the dashboard from day one. He asked the right questions upfront, surfaced problems early, and shipped clean, maintainable code. The kind of engineer you want on a product team.",
    name: "[Name]",
    role: "[Role]",
    company: "[Company]",
  },
  {
    quote:
      "[Placeholder] What stood out about Luis was how he thought about the user, not just the implementation. He'd push back if something didn't make sense for the workflow, and he was usually right.",
    name: "[Name]",
    role: "[Role]",
    company: "[Company]",
  },
]

export function Testimonials() {
  const { language } = useLanguage()

  return (
    <SectionWrapper id="testimonials" containerSize="md">
      <FadeIn>
        <SectionLabel className="mb-0">
          {language === "es" ? "Referencias" : "Testimonials"}
        </SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {language === "es" ? "Lo que dicen de mi trabajo" : "What people say"}
        </h2>
      </FadeIn>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <figure className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-7 h-full">
              {/* Quote mark */}
              <span
                className="font-serif text-5xl leading-none text-accent select-none"
                aria-hidden
              >
                &ldquo;
              </span>

              <blockquote className="flex-1">
                <p className="text-sm text-muted leading-relaxed">{t.quote}</p>
              </blockquote>

              <figcaption className="flex items-center gap-3 border-t border-border/50 pt-4">
                {/* Avatar placeholder */}
                <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center font-mono text-xs text-muted-2 shrink-0">
                  {t.name[1] ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-2">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}
