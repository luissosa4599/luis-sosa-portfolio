"use client"

import { FadeIn } from "@/components/primitives/FadeIn"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"

const PREVIOUS_COMPANIES = ["Cantilever", "Teleurban"]

export function About() {
  const { language } = useLanguage()

  const copy = {
    en: {
      role: "Full Stack Developer",
      years: "3+ years shipping production software",
      location: "Mexico City · CST (UTC-6)",
      english: "Professional English",
      availability: "Open to full-time remote",
      bio: "Full stack developer with 3+ years building production software. Focused on frontend — dashboards, internal tools, and data-heavy interfaces for teams with complex operational workflows. HCI researcher, published at HCI International 2025 (Springer Nature).",
      previously: "Previously at",
    },
    es: {
      role: "Full Stack Developer",
      years: "3+ años de software en producción",
      location: "Ciudad de México · CST (UTC-6)",
      english: "Inglés profesional",
      availability: "Disponible para trabajo remoto",
      bio: "Full stack developer con 4+ años construyendo software en producción. Me especializo en frontend: dashboards, herramientas internas e interfaces complejas para equipos con flujos de trabajo operativos. Investigador en HCI, publicado en HCI International 2025 (Springer Nature).",
      previously: "Anteriormente en",
    },
  }[language]

  return (
    <section id="about" className="border-y border-border py-14 scroll-mt-20">
      <Container>
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start gap-6">

            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo.png"
              alt="Luis Sosa"
              className="w-16 h-16 rounded-full shrink-0 object-cover border border-border"
            />

            {/* Info */}
            <div className="flex-1 flex flex-col gap-2">

              {/* Name + availability */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div>
                  <h2 className="text-base font-semibold text-foreground">Luis Sosa</h2>
                  <p className="text-sm text-muted">
                    {copy.role} · {copy.years}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-500 shrink-0">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  {copy.availability}
                </span>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted leading-relaxed max-w-2xl">{copy.bio}</p>

              {/* Meta row */}
              <p className="font-mono text-xs text-muted-2">
                {copy.location} · {copy.english}
              </p>

              {/* Previous companies */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-muted-2">{copy.previously}:</span>
                {PREVIOUS_COMPANIES.map((company) => (
                  <span
                    key={company}
                    className="text-xs text-muted-2 border border-border rounded px-2 py-0.5"
                  >
                    {company}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
