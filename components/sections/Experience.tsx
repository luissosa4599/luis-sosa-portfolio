"use client"

import { FadeIn } from "@/components/primitives/FadeIn"
import { ScrollReveal } from "@/components/primitives/ScrollReveal"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"
import { cardReveal } from "@/lib/motion"
import { ExternalLink } from "lucide-react"

// ── Experience data ───────────────────────────────────────────────────────────
type BulletItem = string | { text: string; linkText: string; href: string }

type ExperienceItem = {
  year:        { en: string; es: string }
  role:        { en: string; es: string }
  company:     string          // short name (shown in gray)
  companyFull: string          // corporate legal name (linked)
  companyUrl?: string
  bullets:     { en: BulletItem[]; es: BulletItem[] }
  stack:       string[]
  pdf?:        { url: string; label: { en: string; es: string } }
}

const EXPERIENCE: ExperienceItem[] = [
  {
    year:        { en: "Apr 2026 — Present", es: "Abr 2026 — Presente" },
    role:        { en: "Full-Stack Engineer", es: "Ingeniero Full-Stack" },
    company:     "OM Payments",
    companyFull: "OM Payments / Grupo Cumulus",
    bullets: {
      en: [
        "Owning the end-to-end implementation of a production SPEI transfer platform — mobile app, .NET backend, banking integration, security architecture, certification, and deployment — for a system processing real customer funds.",
        "Implementing the banking integration across 7 certification blocks and 13 technical specifications, covering 24 integration endpoints required to enable production SPEI transfers.",
        "Building secure payment processing with .NET 10, Azure SQL, Azure Key Vault, and RSA/AES encryption, including reconciliation and explicit handling of successful, rejected, and unconfirmed transactions.",
        "Leading modernization across 4 production fintech platforms, standardizing reusable components, design tokens, and responsive layouts across web, desktop, and mobile.",
      ],
      es: [
        "Soy responsable de la implementación integral de una plataforma de transferencias SPEI en producción — app móvil, backend en .NET, integración bancaria, arquitectura de seguridad, certificación y despliegue — para un sistema que procesa fondos reales de clientes.",
        "Implemento la integración bancaria a través de 7 bloques de certificación y 13 especificaciones técnicas, cubriendo 24 endpoints de integración requeridos para habilitar las transferencias SPEI en producción.",
        "Desarrollo el procesamiento seguro de pagos con .NET 10, Azure SQL, Azure Key Vault y cifrado RSA/AES, incluyendo conciliación y manejo explícito de transacciones exitosas, rechazadas y no confirmadas.",
        "Lidero la modernización de 4 plataformas fintech en producción, estandarizando componentes reutilizables, design tokens y layouts responsivos en web, desktop y mobile.",
      ],
    },
    stack: [".NET 10", "ASP.NET Core", ".NET MAUI", "C#", "Angular 19", "TypeScript", "Azure SQL", "Azure Key Vault", "SCSS", "PrimeNG"],
  },
  {
    year:        { en: "Oct 2025 — Apr 2026", es: "Oct 2025 — Abr 2026" },
    role:        { en: "Full-Stack Engineer", es: "Ingeniero Full-Stack" },
    company:     "IFD Tech",
    companyFull: "IFD Technologies Inc.",
    companyUrl:  "https://ifd.com.mx/es/",
    bullets: {
      en: [
        "Solely owned a client engagement end-to-end — requirements, architecture, development, and delivery — translating technical decisions into business language for direct client communication.",
        "Delivered on schedule across 5 simultaneous client accounts while adapting to evolving requirements.",
        "Participated in client-facing kickoff meetings, weekly sprint reviews, and feature scoping sessions.",
      ],
      es: [
        "Gestioné de forma autónoma un proyecto completo de principio a fin — requerimientos, arquitectura, desarrollo y entrega — traduciendo decisiones técnicas a lenguaje de negocio con el cliente.",
        "Entregué en tiempo y forma en 5 cuentas de cliente simultáneas, adaptándome a requerimientos cambiantes.",
        "Participé en juntas de arranque, revisiones semanales de sprint y sesiones de definición de funcionalidades.",
      ],
    },
    stack: ["React", "TailwindCSS", "Laravel", "REST APIs", "GraphQL", "Docker", "AWS"],
  },
  {
    year:        { en: "Apr 2024 — Oct 2025", es: "Abr 2024 — Oct 2025" },
    role:        { en: "Software Engineer", es: "Ingeniero de Software" },
    company:     "Cantilever",
    companyFull: "Distribuciones Cantilever S. de R.L. de C.V.",
    companyUrl:  "https://cantilever.com.mx/",
    bullets: {
      en: [
        "Introduced unit testing (Jest) on a Vue 2 legacy codebase past LTS, safeguarding data integrity for utility meter readings and billing calculations across CFE government systems.",
        "Delivered frontend modules under strict public procurement deadlines for Mexico's national electric utility (CFE).",
        { text: "Co-author of ICE Management 2.0, officially registered with INDAUTOR — ", linkText: "Reg. No. 03-2025-112411030100-01", href: "/indautor-ice-management.pdf" },
      ],
      es: [
        "Introduje pruebas unitarias (Jest) en un codebase Vue 2 fuera de soporte LTS, garantizando la integridad de datos de medidores eléctricos y cálculos de facturación en sistemas de CFE.",
        "Entregué módulos frontend bajo estrictos plazos de licitación pública para la Comisión Federal de Electricidad (CFE).",
        { text: "Coautor de ICE Management 2.0, registrado ante el INDAUTOR — ", linkText: "Reg. No. 03-2025-112411030100-01", href: "/indautor-ice-management.pdf" },
      ],
    },
    stack: ["Vue.js", "Nuxt", "Vuex", "GraphQL", "Docker", "AWS", "Jest", "SSH"],
    pdf: {
      url:   "/indautor-ice-management.pdf",
      label: { en: "View INDAUTOR certificate", es: "Ver certificado INDAUTOR" },
    },
  },
  {
    year:        { en: "Jul 2022 — Apr 2024", es: "Jul 2022 — Abr 2024" },
    role:        { en: "Junior Developer", es: "Desarrollador Junior" },
    company:     "Teleurban",
    companyFull: "Grupo Tele Urban",
    companyUrl:  "https://grupoteleurban.com/",
    bullets: {
      en: [
        "Developed and maintained internal business applications supporting operational workflows across multiple departments.",
        "Collaborated with senior engineers on feature implementation, debugging, and system maintenance.",
      ],
      es: [
        "Desarrollé y mantuve aplicaciones internas de negocio que soportan flujos operativos en múltiples departamentos.",
        "Colaboré con ingenieros senior en implementación de funcionalidades, depuración y mantenimiento de sistemas.",
      ],
    },
    stack: ["Python", "C#", "Java", "PHP"],
  },
  {
    year:        { en: "2018 — 2024", es: "2018 — 2024" },
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
      subtitle: "Four years shipping production software — from junior developer to full-stack engineer.",
    },
    es: {
      title: "Experiencia",
      subtitle: "Cuatro años construyendo software en producción — de desarrollador junior a ingeniero full-stack.",
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
                          {typeof bullet === "string" ? bullet : (
                            <span>
                              {bullet.text}
                              <a
                                href={bullet.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline underline-offset-2"
                              >
                                {bullet.linkText}
                              </a>
                            </span>
                          )}
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

                    {/* Certificate link */}
                    {item.pdf && (
                      <a
                        href={item.pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-2 hover:text-accent transition-colors duration-150"
                      >
                        <ExternalLink size={12} />
                        {item.pdf.label[language]}
                      </a>
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
