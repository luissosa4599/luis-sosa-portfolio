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
        "Designed and built from scratch an ASP.NET Core (.NET 10) SPEI integration through a provider operating as an indirect participant — webhook APIs, a typed provider client, and background workers — and integrated it into the production mobile app for real customer transfers.",
        "Led the provider's formal certification across 7 blocks, 13 technical specifications, and 24 integration endpoints, validating each case against sandbox evidence and backing the implementation with 137 automated unit and integration tests.",
        "Built secure payment processing with Azure SQL, Key Vault, Managed Identity, RSA/AES encryption, and SHA256withRSA signatures, including provider-response verification, pre-payment balance checks, transactional outbox retries, and reconciliation of successful, rejected, and unconfirmed transfers.",
        "Shipped the SPEI experience in .NET MAUI for Android and iOS — recipient onboarding, CLABE/RFC validation, biometric authorization, duplicate-transfer prevention, offline handling, and receipts — and improved production stability with Application Insights, global exception handling, and fixes for critical startup, threading, timeout, and session issues.",
        "Led the production web portal upgrade from Angular 19 to 21 and migrated 20+ components from PrimeNG to Kendo UI, adding centralized permissions, route guards, and server-side token invalidation through incremental releases with zero downtime.",
        "Modernized surrounding legacy systems: extended WPF/WCF back-office workflows, introduced Git and a standard GitHub workflow across 5 production systems and the new SPEI service, documented the production database, and surfaced security and PCI findings that informed a backend remediation plan.",
      ],
      es: [
        "Diseñé y construí desde cero en ASP.NET Core (.NET 10) la integración con SPEI a través de un proveedor que opera como participante indirecto — APIs de webhook, un cliente tipado para el proveedor y procesos en segundo plano — y la conecté a la app móvil en producción, donde hoy procesa transferencias reales de clientes.",
        "Lideré la certificación formal ante el proveedor: 7 bloques, 13 especificaciones técnicas y 24 endpoints de integración, validando cada caso con evidencia real de sandbox y respaldando el desarrollo con 137 pruebas automatizadas unitarias y de integración.",
        "Implementé el procesamiento seguro de pagos con Azure SQL, Key Vault, Managed Identity, cifrado RSA/AES y firmas SHA256withRSA, incluyendo verificación de las respuestas del proveedor, consulta de saldo antes de pagar, reintentos mediante un outbox transaccional y conciliación de transferencias exitosas, rechazadas y sin confirmar.",
        "Desarrollo el flujo de transferencias SPEI en .NET MAUI para Android e iOS — alta de beneficiarios, validación de CLABE y RFC, autorización biométrica, prevención de duplicados, manejo sin conexión y comprobantes — y estabilicé la app en producción con Application Insights, manejo global de excepciones y correcciones a fallas críticas de arranque, hilos, timeouts y sesión.",
        "Lideré la actualización del portal web de Angular 19 a 21 y la migración de más de 20 componentes de PrimeNG a Kendo UI, con permisos centralizados, route guards e invalidación del token en el servidor, todo con entregas graduales y sin interrumpir la operación.",
        "Modernizo los sistemas legacy de la empresa: amplié el back office en WPF/WCF, introduje Git y un flujo estándar en GitHub en 5 sistemas en producción y en el nuevo servicio SPEI, documenté la base de datos productiva y detecté hallazgos de seguridad y PCI que dieron origen a un plan de corrección del backend.",
      ],
    },
    stack: [".NET 10", "ASP.NET Core", "C#", ".NET MAUI", "Angular 21", "TypeScript", "WPF/WCF", "Azure SQL", "Kendo UI", "Azure Key Vault", "Application Insights", "xUnit"],
  },
  {
    year:        { en: "Oct 2025 — Apr 2026", es: "Oct 2025 — Abr 2026" },
    role:        { en: "Full-Stack Engineer", es: "Ingeniero Full-Stack" },
    company:     "IFD Tech",
    companyFull: "IFD Technologies Inc.",
    companyUrl:  "https://ifd.com.mx/es/",
    bullets: {
      en: [
        "Selected to independently own a client project replacing an error-prone, Excel-based fuel inventory process with a role-based web application, leading it from discovery and requirements through technical design, React/Laravel development, and client delivery.",
        "Led weekly client reviews, translating technical complexity into clear diagrams, tables, and business language so stakeholders could validate requirements, resolve open questions, and make informed decisions.",
        "Delivered across 5 simultaneous client accounts under Scrum, with testing, pull requests, iterative delivery, and regular client feedback cycles.",
      ],
      es: [
        "Me asignaron como único responsable de un proyecto para reemplazar el control de inventario de combustible, que se llevaba en Excel y generaba errores, por una aplicación web con roles; lo llevé desde el levantamiento de requerimientos y el diseño técnico hasta el desarrollo en React y Laravel y la entrega al cliente.",
        "Dirigí revisiones semanales con el cliente y expliqué los temas técnicos con diagramas, tablas y lenguaje de negocio, lo que le permitió validar requerimientos, resolver dudas y tomar decisiones durante todo el desarrollo.",
        "Trabajé en 5 cuentas de clientes de forma simultánea bajo Scrum, con pruebas, pull requests, entregas iterativas y retroalimentación constante del cliente.",
      ],
    },
    stack: ["React", "Laravel", "TailwindCSS", "REST APIs", "GraphQL", "Docker", "AWS"],
  },
  {
    year:        { en: "Apr 2024 — Oct 2025", es: "Abr 2024 — Oct 2025" },
    role:        { en: "Software Engineer", es: "Ingeniero de Software" },
    company:     "Cantilever",
    companyFull: "Distribuciones Cantilever S. de R.L. de C.V.",
    companyUrl:  "https://cantilever.com.mx/",
    bullets: {
      en: [
        "Built a native Android app in Kotlin for the field installation of IoT devices on CFE utility poles, using QR scanning for device identification, Bluetooth Low Energy (BLE) for configuration, and Telegram bots to coordinate and register installations.",
        "Designed and built a Java/Spring Boot microservice with Apache Kafka that processes IoT network data in biweekly cycles to calculate CFE electrical network usage costs, with an event-driven design aimed at the previous workflow's scalability limits.",
        "Introduced unit testing with Jest into a legacy Vue 2 codebase past LTS, adding automated coverage for utility billing and meter-reading workflows.",
        "Built a Flutter mobile version of an existing web platform, adapting its core workflows for mobile use.",
        { text: "Co-author of ICE Management 2.0, officially registered with INDAUTOR — ", linkText: "Reg. No. 03-2025-112411030100-01", href: "/indautor-ice-management.pdf" },
      ],
      es: [
        "Desarrollé una app nativa para Android en Kotlin para la instalación en campo de dispositivos IoT en postes de la CFE, con escaneo QR para identificar cada dispositivo, Bluetooth Low Energy (BLE) para configurarlo y bots de Telegram para coordinar y registrar las instalaciones.",
        "Diseñé y construí un microservicio en Java con Spring Boot y Apache Kafka que procesa los datos de la red de dispositivos IoT en cortes quincenales para calcular el costo de uso de la red eléctrica de la CFE, con un diseño orientado a eventos para resolver los problemas de escalabilidad del proceso anterior.",
        "Incorporé pruebas unitarias con Jest a un proyecto legacy en Vue 2 sin soporte LTS, agregando cobertura automatizada a los flujos de facturación y lectura de medidores.",
        "Desarrollé en Flutter la versión móvil de una plataforma web existente, adaptando sus flujos principales al celular.",
        { text: "Coautor de ICE Management 2.0, registrado ante el INDAUTOR — ", linkText: "Reg. No. 03-2025-112411030100-01", href: "/indautor-ice-management.pdf" },
      ],
    },
    stack: ["Kotlin", "BLE", "Java", "Spring Boot", "Apache Kafka", "Flutter", "Vue.js", "Nuxt.js", "Vuex", "GraphQL", "Docker", "Jest"],
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
        "Developed and maintained internal business applications with Next.js and React, supporting operational workflows across multiple departments.",
        "Delivered new features, bug fixes, and system enhancements in collaboration with senior engineers.",
        "Contributed across frontend and backend codebases in React, Python, Java, C#, and PHP, maintaining applications across different technology stacks.",
      ],
      es: [
        "Desarrollé y di mantenimiento a aplicaciones internas en Next.js y React que daban soporte a la operación de varias áreas.",
        "Implementé nuevas funcionalidades, correcciones y mejoras junto con ingenieros senior.",
        "Trabajé en código frontend y backend con React, Python, Java, C# y PHP, dando mantenimiento a aplicaciones con distintos stacks.",
      ],
    },
    stack: ["Next.js", "React", "Python", "Java", "C#", "PHP"],
  },
  {
    year:        { en: "2018 — 2024", es: "2018 — 2024" },
    role:        { en: "B.Sc. in Computer Systems Engineering", es: "Ingeniería en Sistemas Computacionales" },
    company:     "ESCOM IPN",
    companyFull: "Escuela Superior de Cómputo (ESCOM), Instituto Politécnico Nacional (IPN)",
    bullets: {
      en: [
        "Co-author of the peer-reviewed conference paper \"Application for Locating Dogs in México City Through Pattern Recognition.\"",
        "Presented at HCI International 2025.",
        { text: "Published by Springer in CCIS — ", linkText: "DOI 10.1007/978-3-032-12767-9_33", href: "https://doi.org/10.1007/978-3-032-12767-9_33" },
      ],
      es: [
        "Coautor del artículo arbitrado \"Application for Locating Dogs in México City Through Pattern Recognition\".",
        "Presentado en HCI International 2025.",
        { text: "Publicado por Springer en la serie CCIS — ", linkText: "DOI 10.1007/978-3-032-12767-9_33", href: "https://doi.org/10.1007/978-3-032-12767-9_33" },
      ],
    },
    stack: [],
  },
]

// ── Section ──────────────────────────────────────────────────────────────────
export function Experience() {
  const { language } = useLanguage()

  const copy = {
    en: {
      title: "Experience",
      subtitle: "4+ years shipping production software — from junior developer to full-stack engineer.",
    },
    es: {
      title: "Experiencia",
      subtitle: "Más de cuatro años construyendo software en producción — de desarrollador junior a ingeniero full-stack.",
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
