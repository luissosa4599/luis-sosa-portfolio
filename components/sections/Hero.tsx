"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Download } from "lucide-react"
import { transition } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useMounted } from "@/hooks/useMounted"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"

// ── Rotating titles ───────────────────────────────────────────────────────────
const TITLES = {
  en: [
    "Full Stack Developer",
    "Frontend Engineer",
    "Systems Engineer",
    "HCI Researcher",
    "UI/UX Implementer",
  ],
  es: [
    "Full Stack Developer",
    "Frontend Engineer",
    "Ingeniero en Sistemas",
    "Investigador en HCI",
    "Implementador UI/UX",
  ],
}

export function Hero() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES[language].length)
    }, 2600)
    return () => clearInterval(id)
  }, [language, reduced])

  // Reset index on language change
  useEffect(() => { setTitleIndex(0) }, [language])

  const copy = {
    en: {
      greeting: "Hi, I'm",
      name: "Luis Sosa",
      subtitle:
        "Full stack developer with 3+ years shipping production interfaces. Focused on dashboards, internal tools, and data products for teams that work with complex workflows.",
      projects: "Selected work",
      contact:  "Get in touch",
      resume:   "Download CV",
    },
    es: {
      greeting: "Hola, soy",
      name: "Luis Sosa",
      subtitle:
        "Full stack developer con 4+ años construyendo interfaces en producción. Enfocado en dashboards, herramientas internas y productos de datos para equipos con flujos de trabajo complejos.",
      projects: "Ver proyectos",
      contact:  "Contáctame",
      resume:   "Descargar CV",
    },
  }[language]

  // ── Entrance variants — each element has its own trajectory ──────────────
  const skip = { hidden: { opacity: 1, y: 0, scale: 1, x: 0 }, visible: { opacity: 1, y: 0, scale: 1, x: 0 } }

  const v = {
    greeting: reduced ? skip : {
      hidden:  { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: transition.easeOut, delay: 0.25 } },
    },
    name: reduced ? skip : {
      hidden:  { opacity: 0, y: 52, scale: 0.92 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: transition.easeOut, delay: 0.42 } },
    },
    title: reduced ? skip : {
      hidden:  { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5,  ease: transition.easeOut, delay: 0.88 } },
    },
    subtitle: reduced ? skip : {
      hidden:  { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6,  ease: transition.easeOut, delay: 1.1  } },
    },
    ctas: reduced ? skip : {
      hidden:  { opacity: 0, y: 22 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: transition.easeOut, delay: 1.32 } },
    },
  }

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-svh pt-20 overflow-hidden text-center"
    >
      {/* Ambient glow — fades in slowly after content */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(213 100% 70% / 0.06) 0%, transparent 65%)",
        }}
      />

      <Container size="md" className="w-full py-24">
        <div className="flex flex-col items-center gap-6">

          {/* Greeting */}
          <motion.span
            variants={v.greeting}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="text-base text-muted font-mono"
          >
            {copy.greeting}
          </motion.span>

          {/* Name — main event */}
          <motion.h1
            variants={v.name}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="text-[clamp(3rem,6vw,5rem)] font-semibold tracking-tight leading-[1.05] text-foreground -mt-4"
          >
            {copy.name}<span className="text-accent">.</span>
          </motion.h1>

          {/* Rotating title */}
          <motion.div
            variants={v.title}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="h-8 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${language}-${titleIndex}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: transition.easeOut }}
                className="text-lg font-mono text-accent"
              >
                {TITLES[language][titleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={v.subtitle}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="text-base text-muted leading-relaxed max-w-lg"
          >
            {copy.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={v.ctas}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
              style={{ background: "var(--btn-bg)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--btn-bg-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--btn-bg)")}
            >
              <Mail size={14} />
              {copy.contact}
            </a>
            <a
              href={language === "en" ? "/CV_Luis_Sosa_EN.pdf" : "/CV_Luis_Sosa_ES.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
              style={{ background: "var(--btn-bg)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--btn-bg-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--btn-bg)")}
            >
              <Download size={14} />
              {copy.resume}
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
