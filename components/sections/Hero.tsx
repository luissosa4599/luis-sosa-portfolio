"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Download } from "lucide-react"
import { transition } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useMounted } from "@/hooks/useMounted"
import { Container } from "@/components/layout/Container"
import { Parallax } from "@/components/primitives/Parallax"
import { useLanguage } from "@/lib/i18n"

// ── Rotating titles ───────────────────────────────────────────────────────────
const TITLES = {
  en: [
    "Full-Stack Software Engineer",
    "Angular · React · .NET",
    "Fintech & Payments",
    "Mobile · .NET MAUI · React Native",
    "HCI Researcher",
  ],
  es: [
    "Ingeniero de Software Full-Stack",
    "Angular · React · .NET",
    "Fintech y Pagos",
    "Móvil · .NET MAUI · React Native",
    "Investigador en HCI",
  ],
}

export function Hero() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const mounted = useMounted()
  // Don't apply reduced-motion variants until mounted — the server has no
  // access to prefers-reduced-motion, so using it during SSR/hydration causes
  // a variants mismatch between server and client.
  const effectiveReduced = mounted && reduced
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES[language].length)
    }, 2600)
    return () => clearInterval(id)
  }, [language, reduced])
  // No manual reset on language change: LanguageTransition remounts the tree
  // (key={language}), so titleIndex starts at 0 again.

  const copy = {
    en: {
      greeting: "Hi, I'm",
      name: "Luis Sosa",
      subtitle:
        "Full-stack software engineer with 4+ years building and modernizing production systems across fintech, payments, SaaS, and enterprise — from banking integrations to web and mobile apps.",
      projects: "Selected work",
      contact:  "Get in touch",
      resume:   "Download CV",
    },
    es: {
      greeting: "Hola, soy",
      name: "Luis Sosa",
      subtitle:
        "Ingeniero de software full-stack con más de 4 años desarrollando y modernizando sistemas en producción para fintech, pagos, SaaS y empresas — desde integraciones bancarias hasta apps web y móviles.",
      projects: "Ver proyectos",
      contact:  "Contáctame",
      resume:   "Descargar CV",
    },
  }[language]

  // ── Entrance — CSS (.enter-rise en globals.css) ───────────────────────────
  // Arranca en cuanto llega el HTML, sin esperar a que hidrate React: el contenido ya
  // viene en el HTML del servidor y el LCP no depende del JS. Cada elemento tiene su
  // propio recorrido (--enter-y / --enter-scale) y retraso. Con "reducir movimiento"
  // la regla CSS la apaga.
  const enter = (delay: number, y: number, extra?: React.CSSProperties) =>
    ({ "--enter-delay": `${delay}s`, "--enter-y": `${y}px`, ...extra }) as React.CSSProperties

  return (
    <section
      id="hero"
      className="sticky top-0 flex items-center justify-center min-h-svh pt-20 overflow-clip text-center"
    >
      {/* Manchas de luz del color de la paleta (como el hero de Cumulus). Entran despacio y
          se mueven con el scroll en sentidos opuestos (parallax). */}
      <Parallax factor={0.32} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full animate-[glow-in_2s_ease-out_0.4s_both] motion-reduce:animate-none"
          style={{ background: "radial-gradient(circle closest-side, var(--blob-a), transparent)" }}
        />
      </Parallax>
      <Parallax factor={-0.22} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="absolute -bottom-48 -left-40 w-[36rem] h-[36rem] rounded-full animate-[glow-in_2s_ease-out_0.6s_both] motion-reduce:animate-none"
          style={{ background: "radial-gradient(circle closest-side, var(--blob-b), transparent)" }}
        />
      </Parallax>

      <Container size="md" className="w-full py-24">
        <div className="flex flex-col items-center gap-6">

          {/* Telón: dos capas que salen a distinto ritmo al hacer scroll (globals.css, "Telón
              del hero"). El nombre se acerca y se desenfoca; el texto sube más rápido. */}
          <div className="hero-layer-title flex flex-col items-center gap-6">

          {/* Greeting */}
          <span className="enter-rise text-base text-muted font-mono" style={enter(0.25, 20)}>
            {copy.greeting}
          </span>

          {/* Name — main event */}
          <h1
            className="enter-rise text-[clamp(3rem,6vw,5rem)] font-semibold tracking-tight leading-[1.05] text-foreground -mt-4"
            style={enter(0.42, 52, { "--enter-scale": "0.92", "--enter-duration": "0.85s" } as React.CSSProperties)}
          >
            {copy.name}<span className="text-accent-fg">.</span>
          </h1>

          {/* Rotating title — el primero llega visible en el HTML (initial={false}) */}
          <div className="enter-rise h-8 flex items-center justify-center" style={enter(0.88, 16)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${language}-${titleIndex}`}
                initial={effectiveReduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={effectiveReduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: transition.easeOut }}
                className="text-lg font-mono text-accent-fg"
              >
                {TITLES[language][titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          </div>

          {/* Capa del texto: la salida va en el párrafo y en cada botón por separado. Los botones
              son cristal y un envoltorio animado les cortaría el desenfoque. */}
          <div className="flex flex-col items-center gap-6">

          {/* Subtitle */}
          {/* Es el texto más grande del hero (el LCP): arranca en opacidad 0.2, ver globals.css */}
          <p
            className="hero-layer-body enter-rise text-lead text-muted max-w-[46ch]"
            style={enter(1.1, 28, { "--enter-opacity": "0.2" } as React.CSSProperties)}
          >
            {copy.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="enter-rise flex flex-wrap items-center justify-center gap-3 pt-2"
            style={enter(1.32, 22, { "--enter-duration": "0.55s" } as React.CSSProperties)}
          >
            <a
              href="#work"
              className="hero-layer-body inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-on-accent text-sm font-semibold shadow-[inset_0_1px_0_oklch(1_0_0/0.25)] hover:bg-accent/90 transition-colors duration-200"
            >
              {copy.projects}
              <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="hero-layer-body inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium text-foreground hover:text-accent-fg transition-colors duration-200"
            >
              <Mail size={14} />
              {copy.contact}
            </a>
            <a
              href={language === "en" ? "/CV_Luis_Sosa.pdf" : "/CV_Luis_Alberto.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-layer-body inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium text-foreground hover:text-accent-fg transition-colors duration-200"
            >
              <Download size={14} />
              {copy.resume}
            </a>
          </div>

          </div>

        </div>
      </Container>
    </section>
  )
}
