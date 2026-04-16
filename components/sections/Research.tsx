"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Eye, ScanFace, Award, Search, Copy, Check } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { AccentLink } from "@/components/primitives/AccentLink"
import { getResearch } from "@/lib/data/research"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { heroSequence } from "@/lib/motion"
import { useLanguage } from "@/lib/i18n"
import type { ResearchEntry } from "@/lib/types"

// ─── Dog silhouette ─────────────────────────────────────────────────────────────

function DogSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1541.153 1634.092"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M455.23,1572.439c-16.285,0.53-35.549-0.428-54.624,2.659c-28.536,4.618-30.71,17.206-49.271,32.122c-35.074,28.187-53.918-9.699-73.893-25.23c-2.308-1.794-4.556-4.194-5.745-6.81c-5.127-11.289-12.816-20.761-20.408-30.365c-12.551-15.878,6.073-35.756,15.944-41.601c12.45-7.372-10.99-10.569-10.871-25.82c0.026-3.314-4.412-5.398-7.689,0.409c-9.611,17.03-33.046,67.198-77.78,92.227c-37.627,21.052-58.55,4.259-67.317,0.935c-17.483-6.63-33.058-16.628-48.125-27.452c-4.852-3.486-12.316-3.637-14.218-10.999c-2.545-9.847-7.228-19.429-1.698-29.895c5.025-9.511,22.339-8.767,10.22-19.94c-9.443-8.707-10.284-25.343-1.856-35.879c11.316-14.145,17.433-26.52,43.397-28.755c24.778-2.133,36.067,2.518,53.985-20.571c7.883-10.158,86.397-187.045,106.029-254.612c5.762-19.831,6.528-23.232,0.732-26.672c-31.174-18.504-54.552-48.747-63.3-54.683c-4.983-3.381-7.565-8.731-8.425-15.132c-19.713-146.839-14.17-78.6-17.414-174.219c-0.727-21.427,4.601-42.276,10.275-62.997c13.29-48.53,50.394-47.128,50.133-121.473c-0.159-45.208,5.952-69.554,22.391-129.521c15.687-57.222,10.907-14.109,18.404-103.624c2.571-30.7,26.226-51.947,35.581-104.969c2.688-15.236-57.947-92.77-66.214-103.329c-32.502-41.509-47.987-70.849-44.81-104.262c1.551-16.312,0.979-33.605,11.616-47.496c11.783-15.388,11.972-48.039,27.226-67.232c30.139-37.921,74.188,35.978,151.04,75.884c19.673,10.215,18.461-0.832,30.557-1.884c43.596-3.79,111.256,34.641,148.396,57.545c107.875,66.527,96.499,252.601,61.575,263.75c-5.091,1.625-6.596,4.158-4.937,10.218c6.921,25.275,16.087,50.248,13.685,77.204c-9.756,109.493,4.44,166.167,96.732,259.573c76.869,77.795,184.622,286.07,231.696,392.892c5.142,11.669,5.991,24.017,8.697,36.073c17.8,79.303,16.172,28.874,13.646,145.139c-0.278,12.786-11.902,21.755,3.716,26.282c48.225,13.978,56.921,21.514,78.769,39.095c117.521,94.567,151.027,96.534,251.692,106.115c20.17,1.919,39.537,7.556,59.344,11.093c11.52,2.057,23.263,2.028,34.718,4.667c7.656,1.764,61.684-7.534,62.703-7.704c35.26-5.861,63.108,31.798-16.949,66.058c-34.28,14.67-35.89,16.388-55.687,16.764c-40.096,0.762-140.317-7.699-197.115-5.23c-50.525,2.197-127.339-40.346-176.608-64.386c-12.563-6.13-26.575-6.191-40.077-6.228c-21.746-0.061-42.345-6.419-63.515-9.526c-96.738-14.196-29.144,7.928-165.329,24.345c-25.402,3.062-50.236-1.739-75.011-5.986c-11.193-1.919-19.592-9.881-27.287-17.803c-10.548-10.86-23.91-18.774-32.7-31.453c-0.769-1.109-2.14-1.958-3.646-1.326c-3.937,1.653-1.588,3.078-3.321,22.488c-4.782,53.537-37.292,55.213-73.072,57.355C512.211,1569.883,485.227,1572.281,455.23,1572.439z M380.271,1409.033c9.495-3.053,21.287-2.185,32.87-4.307c53.909-9.874,63.493-7.046,40.958-48.365c-9.258-16.974-15.408-35.339-23.767-52.701c-4.252-8.83-8.172-17.435-6.771-27.672c8.142-59.499,1.327-32.664,13.513-78.531c0.761-2.866,0.513-4.959-1.705-6.781c-9.825-8.076-20.641-6.559-27.255,4.526c-73.541,123.249-108.242,151.221-115.57,193.225c-1.653,9.478,2.738,7.884,19.73,21.188c9.875,7.732,15.717-5.116,45.531-2.688C364.654,1407.484,371.489,1408.203,380.271,1409.033z M412.268,1503.314c5.185,1.103,9.954-1.546,14.972-1.617c9.187-0.131,43.923,0.326,88.951-9.386c21.812-4.705,11.457-17.555,7.903-30.899c-4.798-18.016-17.588,4.204-138.822,12.105c-49.865,3.249-45.65-5.912-65.319,4.112c-5.621,2.865-3.801,7.942,1.866,6.88c17.143-3.214,18.55,14.804,38.04,15.904C377.331,1501.398,394.855,1501.476,412.268,1503.314z" />
    </svg>
  )
}

// ─── Detection circle ──────────────────────────────────────────────────────────

function DetectionCircle({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      {/* Expanding pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-accent/25"
          animate={
            reduced ? {} : { scale: [1, 1.35, 1.7], opacity: [0.35, 0.12, 0] }
          }
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: "easeOut" }}
        />
      ))}

      {/* Solid outer ring — fully colored, static */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: "2.5px solid hsl(213 90% 53% / 0.55)" }}
      />

      {/* Cardinal targeting marks */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-px h-4 bg-accent/55" />
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-px h-4 bg-accent/55" />
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-px w-4 bg-accent/55" />
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-px w-4 bg-accent/55" />

      {/* Inner circle */}
      <div
        className="absolute inset-4 rounded-full border border-accent/15 flex items-center justify-center bg-background/80 overflow-hidden"
      >
        {/* Glow layer */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(213 100% 70% / 0.12) 0%, transparent 65%)" }}
        />
        <DogSilhouette className="relative w-40 h-40 md:w-52 md:h-52 text-accent/30" />
      </div>

      {/* Spinning arc — inner ring, counter-clockwise */}
      {!reduced && (
        <motion.div
          className="absolute inset-4 rounded-full pointer-events-none"
          style={{
            border: "1.5px solid transparent",
            borderBottomColor: "hsl(213 90% 53% / 0.7)",
            borderLeftColor: "hsl(213 90% 53% / 0.2)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Spinning arc — innermost, clockwise, slowest */}
      {!reduced && (
        <motion.div
          className="absolute inset-10 rounded-full pointer-events-none"
          style={{
            border: "1px solid transparent",
            borderTopColor: "hsl(213 90% 53% / 0.45)",
            borderRightColor: "hsl(213 90% 53% / 0.12)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )
}

// ─── Floating badge ────────────────────────────────────────────────────────────

function FloatingBadge({
  icon,
  delay = 0,
  floatY = -6,
  wrapperStyle,
  reduced,
}: {
  icon: ReactNode
  delay?: number
  floatY?: number
  wrapperStyle?: React.CSSProperties
  reduced: boolean
}) {
  return (
    <div className="absolute z-10" style={wrapperStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, floatY, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
          className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm text-accent/50"
          style={{
            backgroundColor: "hsl(213 90% 53% / 0.22)",
            border: "1px solid hsl(213 90% 53% / 0.40)",
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Particle field ────────────────────────────────────────────────────────────

const SYMBOLS = [
  "{", "}", "[", "]", "(", ")", "</>", "=",
  "//", ";", "&&", "||", "=>",
  "σ", "λ", "∇", "∑", "∂", "≈", "π", "∞",
]

function ParticleField({
  containerRef,
  reduced,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  reduced: boolean
}) {
  useEffect(() => {
    if (reduced) return
    const container = containerRef.current
    if (!container) return

    const created: HTMLElement[] = []

    for (let i = 0; i < 30; i++) {
      const el = document.createElement("span")
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      const opacity = (0.08 + Math.random() * 0.16).toFixed(2)
      el.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        bottom: -20px;
        font-family: var(--font-mono, monospace);
        font-size: ${11 + Math.random() * 8}px;
        color: hsl(213 90% 53% / ${opacity});
        pointer-events: none;
        user-select: none;
        animation: research-particle-drift ${10 + Math.random() * 12}s linear ${Math.random() * 15}s infinite;
        will-change: transform, opacity;
      `
      container.appendChild(el)
      created.push(el)
    }

    return () => created.forEach((el) => el.remove())
  }, [containerRef, reduced])

  return null
}

// ─── Cite button ──────────────────────────────────────────────────────────

function CiteButton({ entry }: { entry: ResearchEntry }) {
  const [copied, setCopied] = useState(false)

  const bibtex = `@inproceedings{sosa2025dogs,
  title={${entry.title}},
  author={Sosa, Luis},
  booktitle={${entry.venue}},
  year={${entry.year}},
  publisher={${entry.publisher}},
  series={Communications in Computer and Information Science},
  url={${entry.url}}
}`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently ignore
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200"
    >
      {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
      {copied ? "Copied!" : "Cite (BibTeX)"}
    </button>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────

const seq = (i: number, reduced: boolean) =>
  reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : heroSequence(i)

export function Research() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const particlesRef = useRef<HTMLDivElement>(null)

  const entry = getResearch(language)[0]
  if (!entry) return null

  return (
    <section id="research" className="relative flex items-center min-h-[90svh] overflow-hidden">

      {/* Particle field — full section */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      />
      <ParticleField containerRef={particlesRef} reduced={reduced} />

      {/* Ambient glow — top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(213 100% 70% / 0.06) 0%, transparent 65%)",
        }}
      />

      {/* Ambient glow — bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(213 100% 70% / 0.05) 0%, transparent 65%)",
        }}
      />

      <Container className="w-full py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left column — content ─────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Section label */}
            <motion.div
              variants={seq(0, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionLabel>{language === "es" ? "Research" : "Research"}</SectionLabel>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={seq(1, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold tracking-tight leading-[1.1] text-foreground"
            >
              {language === "es" ? "Publicaciones" : "Research Papers"}
            </motion.h2>

            {/* Paper title */}
            <motion.h3
              variants={seq(2, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base md:text-lg font-medium text-muted leading-snug tracking-tight max-w-md"
            >
              {entry.title}
            </motion.h3>

            {/* Abstract */}
            <motion.p
              variants={seq(3, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-muted leading-relaxed max-w-md"
            >
              {entry.abstract}
            </motion.p>

            <motion.p
              variants={seq(4, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-muted-2 leading-relaxed max-w-md"
            >
              {language === "es"
                ? "Incluyo este trabajo porque refleja cómo abordo problemas de producto: research estructurado, decisiones claras y la capacidad de llevar una idea hasta un sistema real."
                : "I include this work because it reflects how I approach product problems: structured research, clear decision-making, and shipping an actual system instead of stopping at the concept."}
            </motion.p>

            {/* Year + venue + tags */}
            <motion.div
              variants={seq(5, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-foreground tabular-nums">
                  {entry.year}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  {entry.venue}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-surface text-muted border border-border">
                  {entry.publisher}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={language === "es" ? "Temas" : "Topics"}>
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-xs font-mono text-muted bg-surface border border-border"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA + Cite */}
            <motion.div
              variants={seq(6, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4 flex-wrap"
            >
              <AccentLink href={entry.url} external>
                {language === "es" ? "Ver publicación" : "View publication"}
              </AccentLink>
              <CiteButton entry={entry} />
            </motion.div>
          </div>

          {/* ── Right column — detection visual ───────────────────── */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-[480px] h-[520px] flex items-center justify-center">

              {/* Badge 1: Eye — top, left of center */}
              <FloatingBadge
                icon={<Eye size={22} />}
                delay={0.6}
                floatY={-8}
                reduced={reduced}
                wrapperStyle={{ top: "9%", left: "26%" }}
              />

              {/* Badge 2: Search — right side, mid-high */}
              <FloatingBadge
                icon={<Search size={22} />}
                delay={0.85}
                floatY={-5}
                reduced={reduced}
                wrapperStyle={{ top: "30%", right: "3%" }}
              />

              {/* Detection circle — centered */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
                viewport={{ once: true }}
              >
                <DetectionCircle reduced={reduced} />
              </motion.div>

              {/* Badge 3: Award — left side, mid-low */}
              <FloatingBadge
                icon={<Award size={22} />}
                delay={1.0}
                floatY={-6}
                reduced={reduced}
                wrapperStyle={{ bottom: "26%", left: "4%" }}
              />

              {/* Badge 4: ScanFace — bottom, right of center */}
              <FloatingBadge
                icon={<ScanFace size={22} />}
                delay={0.7}
                floatY={-4}
                reduced={reduced}
                wrapperStyle={{ bottom: "9%", right: "24%" }}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
