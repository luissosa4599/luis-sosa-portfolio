"use client"

import { FadeIn } from "@/components/primitives/FadeIn"
import { ScrollReveal } from "@/components/primitives/ScrollReveal"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"
import { cardReveal } from "@/lib/motion"

// ── Experience data ───────────────────────────────────────────────────────────
type ExperienceItem = {
  year:        { en: string; es: string }
  role:        { en: string; es: string }
  company:     string          // short name (shown in gray)
  companyFull: string          // corporate legal name (linked)
  companyUrl?: string
  bullets:     { en: string[]; es: string[] }
  stack:       string[]
}

const EXPERIENCE: ExperienceItem[] = [
  {
    year:        { en: "2025 — Present", es: "2025 — Hoy"  },
    role:        { en: "Full Stack Developer", es: "Full Stack Developer" },
    company:     "IFD Tech",
    companyFull: "IFD Technologies",
    companyUrl:  "https://ifd.com.mx/es/",
    bullets: {
      en: [
        "Delivered multidisciplinary projects under tight deadlines and structured code-review cycles",
        "Frontend development in Vue.js and Nuxt within a collaborative team environment",
        "Applied Git best practices and remote server workflows for consistent, reliable releases",
      ],
      es: [
        "Entregué proyectos multidisciplinarios bajo deadlines ajustados y ciclos de revisión estructurados",
        "Desarrollé el frontend con Vue.js y Nuxt en un entorno de equipo colaborativo",
        "Apliqué buenas prácticas de Git y flujos de trabajo en servidor remoto para entregas consistentes",
      ],
    },
    stack: ["Vue", "Nuxt", "TypeScript", "Git"],
  },
  {
    year:        { en: "2024 — 2025",   es: "2024 — 2025" },
    role:        { en: "Junior Developer", es: "Junior Developer" },
    company:     "Cantilever",
    companyFull: "Distribuciones Cantilever S. de R.L. de C.V.",
    companyUrl:  "https://cantilever.com.mx/",
    bullets: {
      en: [
        "Built and maintained full-stack web applications with React and Laravel",
        "Designed responsive frontend interfaces integrated with backend APIs",
        "Contributed to business workflow automation and delivery pipelines",
      ],
      es: [
        "Construí y mantuve aplicaciones web full-stack con React y Laravel",
        "Diseñé interfaces frontend responsivas integradas con APIs backend",
        "Contribuí a la automatización de flujos de negocio y pipelines de entrega",
      ],
    },
    stack: ["React", "Laravel", "PHP", "MySQL"],
  },
  {
    year:        { en: "2023 — 2024",   es: "2023 — 2024" },
    role:        { en: "Programming Intern", es: "Practicante de Programación" },
    company:     "Teleurban",
    companyFull: "Grupo Tele Urban",
    companyUrl:  "https://grupoteleurban.com/",
    bullets: {
      en: [
        "Developed and maintained cross-platform desktop applications for internal business use",
        "Implemented backend solutions across Python, C#, Java and PHP stacks",
      ],
      es: [
        "Desarrollé y mantuve aplicaciones de escritorio multiplataforma para uso interno",
        "Implementé soluciones backend en Python, C#, Java y PHP",
      ],
    },
    stack: ["Python", "C#", "Java", "PHP"],
  },
  {
    year:        { en: "2018 — 2024",   es: "2018 — 2024" },
    role:        { en: "B.S. Computer Systems Engineering", es: "Ing. en Sistemas Computacionales" },
    company:     "ESCOM IPN",
    companyFull: "ESCOM IPN",
    bullets: {
      en: [
        "Thesis: computer-vision system for identifying and reuniting lost dogs with their families",
        "Presented at HCI International 2025 (Gothenburg, Sweden)",
        "Published in the International Journal of Human-Computer Interaction",
      ],
      es: [
        "Tesis: sistema de visión por computadora para identificar y reunir perros perdidos con sus familias",
        "Presentado en HCI International 2025 (Gotemburgo, Suecia)",
        "Publicado en el International Journal of Human-Computer Interaction",
      ],
    },
    stack: ["Python", "OpenCV", "ML"],
  },
]

// ── Section ──────────────────────────────────────────────────────────────────
export function Experience() {
  const { language } = useLanguage()

  const copy = {
    en: {
      title: "Experience",
      subtitle: "Four years shipping production software — from internship to full-stack lead.",
    },
    es: {
      title: "Experiencia",
      subtitle: "Cuatro años construyendo software en producción — de pasante a full-stack.",
    },
  }[language]

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-20">
      <Container size="md">
        {/* Heading */}
        <FadeIn>
          <div className="mb-14">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {copy.title}<span className="text-accent">.</span>
            </h2>
            <p className="mt-2 text-sm text-muted max-w-lg">{copy.subtitle}</p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent/80 via-accent/50 to-accent/10"
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((item, i) => (
              <ScrollReveal
                key={item.company}
                variants={cardReveal}
                transition={{ delay: i * 0.09 }}
              >
                <div className="flex gap-6">
                  {/* Dot */}
                  <div className="relative z-10 shrink-0 mt-1.5">
                    <span
                      className={`block w-3.5 h-3.5 rounded-full border-2 ${
                        i === 0 ? "bg-accent" : "bg-background"
                      }`}
                      style={{ borderColor: "var(--color-accent)" }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-xl border border-border p-5 sm:p-6 -mt-px transition-all duration-200 hover:border-accent/40 backdrop-blur-sm"
                    style={{ backgroundColor: "var(--card-bg)" }}
                  >

                    {/* Top row: role + date */}
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-1">
                      <h3 className="text-sm font-semibold text-foreground leading-snug">
                        {item.role[language]}
                      </h3>
                      <span className="font-mono text-xs text-muted-2 shrink-0">
                        {item.year[language]}
                      </span>
                    </div>

                    {/* Company — linked full name + short name in gray */}
                    <p className="text-sm mb-4">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent hover:underline underline-offset-2"
                        >
                          {item.companyFull}
                        </a>
                      ) : (
                        <span className="font-medium text-accent">{item.companyFull}</span>
                      )}
                      {item.companyFull !== item.company && (
                        <span className="ml-2 text-xs text-muted-2">{item.company}</span>
                      )}
                    </p>

                    {/* Bullets */}
                    <ul className="flex flex-col gap-1.5 mb-4">
                      {item.bullets[language].map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted leading-relaxed">
                          <span
                            className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                            style={{ background: "var(--color-accent)" }}
                            aria-hidden
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Stack pills */}
                    {item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-mono text-muted-2"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
