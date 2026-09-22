"use client"

import { FadeIn } from "@/components/primitives/FadeIn"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"

const PREVIOUS_COMPANIES = ["IFD Technologies", "Cantilever"]

export function About() {
  const { language } = useLanguage()

  const copy = {
    en: {
      role: "Full-Stack Engineer",
      years: "4+ years shipping production software",
      location: "Mexico City · CST (UTC-6)",
      english: "English C1",
      availability: "Open to full-time remote",
      bio: "Full-Stack Software Engineer with 4+ years building and modernizing production systems across fintech, payments, SaaS, and enterprise. At OM Payments I led the end-to-end delivery and provider certification of a production SPEI integration processing real customer transfers, and modernized production Angular applications with zero downtime — after being hired directly from a client engagement I led at IFD Technologies. Strong cross-platform mobile and backend experience with .NET MAUI, React Native, Flutter, ASP.NET Core, Java, Spring Boot, and Kafka. Co-author of a peer-reviewed paper presented at HCI International 2025 (Springer).",
      previously: "Previously at",
    },
    es: {
      role: "Ingeniero Full-Stack",
      years: "Más de 4 años de software en producción",
      location: "Ciudad de México · CST (UTC-6)",
      english: "Inglés C1",
      availability: "Disponible para trabajo remoto",
      bio: "Ingeniero de Software Full-Stack con más de 4 años desarrollando y modernizando sistemas en producción para fintech, pagos, SaaS y empresas. En OM Payments lideré de principio a fin el desarrollo y la certificación ante el proveedor de una integración SPEI que hoy procesa transferencias reales de clientes, y modernicé aplicaciones Angular en producción sin interrumpir la operación, tras ser contratado directamente por el cliente cuyo proyecto lideré en IFD Technologies. Sólida experiencia en desarrollo móvil multiplataforma y backend con .NET MAUI, React Native, Flutter, ASP.NET Core, Java, Spring Boot y Kafka. Coautor de un artículo arbitrado presentado en HCI International 2025 (Springer).",
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
