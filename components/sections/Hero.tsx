"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { heroSequence } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"
import type { Language } from "@/lib/language"

// ── Headline: 3 lines, one accent (italic + color) word at the end ──────────
type HeadlineLine = {
  before: string
  accent?: string
}

const HEADLINE: Record<Language, HeadlineLine[]> = {
  en: [
    { before: "Interfaces" },
    { before: "where complexity" },
    { before: "finally ", accent: "disappears." },
  ],
  es: [
    { before: "Interfaces" },
    { before: "donde la complejidad" },
    { before: "por fin ", accent: "desaparece." },
  ],
}

export function Hero() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()

  const copy = {
    en: {
      aria: "Interfaces where complexity finally disappears.",
      subtitle:
        "Frontend engineer with [X]+ years shipping production interfaces. Focused on dashboards, internal tools, and data products for teams that work with complex workflows.",
      projects: "Selected work",
      contact: "Get in touch",
      resume: "Download CV",
    },
    es: {
      aria: "Interfaces donde la complejidad por fin desaparece.",
      subtitle:
        "Frontend engineer con [X]+ años entregando interfaces en producción. Enfocado en dashboards, herramientas internas y productos de datos para equipos con flujos complejos.",
      projects: "Ver proyectos",
      contact: "Contáctame",
      resume: "Descargar CV",
    },
  }[language]

  const seq = (i: number) =>
    reduced
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : heroSequence(i)

  const lineVariant = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }

  const headlineContainer = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      }

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-svh pt-14 overflow-hidden"
    >
      {/* Ambient glow — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(213 100% 70% / 0.07) 0%, transparent 65%)",
        }}
      />

      <Container className="w-full py-24 lg:py-0">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left column ─────────────────────────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Headline — line-by-line stagger */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="text-[clamp(2.8rem,5.2vw,4.6rem)] font-semibold tracking-tight leading-[1.08] text-foreground"
              aria-label={copy.aria}
            >
              {HEADLINE[language].map((line, i) => (
                <motion.span
                  key={i}
                  variants={lineVariant}
                  style={{ display: "block" }}
                >
                  {line.before}
                  {line.accent && (
                    <span className="text-accent italic">{line.accent}</span>
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={seq(1)}
              initial="hidden"
              animate="visible"
              className="text-base text-muted leading-relaxed max-w-md"
            >
              {copy.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={seq(2)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
              >
                {copy.projects}
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted hover:text-foreground hover:border-border-strong transition-colors duration-200"
              >
                {copy.contact}
              </a>
              <a
                href="/CV_eng_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted hover:text-foreground hover:border-border-strong transition-colors duration-200"
              >
                {copy.resume}
              </a>
            </motion.div>
          </div>

          {/* ── Right column — Dashboard mockup ─────────────────── */}
          <motion.div
            variants={seq(3)}
            initial="hidden"
            animate="visible"
            className="relative hidden md:block"
          >
            {/* Glow behind mockup */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 55% 50%, hsl(213 100% 70% / 0.12) 0%, transparent 70%)",
              }}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dashboard-dark.png"
              alt="Operations dashboard preview"
              className="theme-dark-only w-full h-auto rounded-xl shadow-2xl"
              style={{
                transform:
                  "perspective(900px) rotateY(-7deg) rotateX(3deg) translateZ(0)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dashboard-light.png"
              alt="Operations dashboard preview"
              className="theme-light-only w-full h-auto rounded-xl shadow-2xl"
              style={{
                transform:
                  "perspective(900px) rotateY(-7deg) rotateX(3deg) translateZ(0)",
              }}
            />
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
