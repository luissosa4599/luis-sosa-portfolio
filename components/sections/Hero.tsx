"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { wordReveal, heroSequence } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"
import type { Language } from "@/lib/language"

const HEADLINE: Record<
  Language,
  { text: string; accent?: boolean; break?: boolean }[]
> = {
  en: [
    { text: "Frontend" },
    { text: "engineer" },
    { text: "for", break: true },
    { text: "dashboards", accent: true },
    { text: "&" },
    { text: "data" },
    { text: "products" },
  ],
  es: [
    { text: "Frontend" },
    { text: "engineer" },
    { text: "para", break: true },
    { text: "dashboards", accent: true },
    { text: "y" },
    { text: "productos" },
    { text: "de datos" },
  ],
}

const CORE_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Laravel",
  "Product UI",
] as const

export function Hero() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const copy = {
    en: {
      aria: "Frontend engineer for dashboards and data products",
      subtitle:
        "Frontend engineer focused on dashboards, internal tools, and product UI for teams working with complex workflows and data.",
      projects: "See projects",
      contact: "Get in touch",
      resume: "Request resume",
    },
    es: {
      aria: "Frontend engineer para dashboards y productos de datos",
      subtitle:
        "Frontend engineer enfocado en dashboards, herramientas internas y producto UI para equipos que trabajan con flujos complejos y datos.",
      projects: "Ver proyectos",
      contact: "Contactar",
      resume: "Pedir CV",
    },
  }[language]

  const container = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
      }

  const wordVariant = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : wordReveal

  const seq = (i: number) =>
    reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : heroSequence(i)

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-svh pt-14 overflow-hidden"
    >
      {/* Subtle ambient glow — top-right */}
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
          <div className="flex flex-col gap-6">

            {/* Headline — word-by-word stagger */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate="visible"
              className="text-[clamp(2.4rem,5.5vw,4rem)] font-semibold tracking-tight leading-[1.1] text-foreground"
              aria-label={copy.aria}
            >
              {HEADLINE[language].map((word, i) => (
                <span key={i} className="inline">
                  <motion.span
                    variants={wordVariant}
                    className={
                      word.accent
                        ? "text-accent"
                        : "text-foreground"
                    }
                    style={{ display: "inline-block" }}
                  >
                    {word.text}
                  </motion.span>
                  {word.break ? <br className="hidden sm:block" /> : " "}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={seq(0)}
              initial="hidden"
              animate="visible"
              className="text-base text-muted leading-relaxed max-w-md"
            >
              {copy.subtitle}
            </motion.p>

            <motion.ul
              variants={seq(1)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 max-w-lg"
              aria-label="Core stack"
            >
              {CORE_STACK.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted"
                >
                  {item}
                </li>
              ))}
            </motion.ul>

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
