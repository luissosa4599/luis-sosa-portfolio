"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Eye, ScanFace, Award } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { AccentLink } from "@/components/primitives/AccentLink"
import { FadeIn } from "@/components/primitives/FadeIn"
import { research } from "@/lib/data/research"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { heroSequence } from "@/lib/motion"

// ─── Paw silhouette ────────────────────────────────────────────────────────────

function PawSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="currentColor">
      <ellipse cx="50" cy="67" rx="24" ry="20" />
      <ellipse cx="22" cy="42" rx="11" ry="14" />
      <ellipse cx="41" cy="34" rx="11" ry="14" />
      <ellipse cx="59" cy="34" rx="11" ry="14" />
      <ellipse cx="78" cy="42" rx="11" ry="14" />
    </svg>
  )
}

// ─── Detection circle ──────────────────────────────────────────────────────────

function DetectionCircle({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
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

      {/* Rotating scan arc */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "hsl(213 90% 53% / 0.8)",
            borderRightColor: "hsl(213 90% 53% / 0.2)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Dashed outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px dashed hsl(213 90% 53% / 0.2)" }}
      />

      {/* Cardinal targeting marks */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-px h-4 bg-accent/55" />
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-px h-4 bg-accent/55" />
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-px w-4 bg-accent/55" />
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-px w-4 bg-accent/55" />

      {/* Inner circle */}
      <div
        className="absolute inset-4 rounded-full border border-accent/15 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle, hsl(213 100% 70% / 0.1) 0%, hsl(220 12% 8% / 0.6) 60%, hsl(220 14% 6% / 0.8) 100%)",
        }}
      >
        <PawSilhouette className="w-20 h-20 md:w-24 md:h-24 text-accent/20" />
      </div>

      {/* Second inner ring for depth */}
      <div
        className="absolute inset-8 rounded-full"
        style={{ border: "1px solid hsl(213 90% 53% / 0.08)" }}
      />
    </div>
  )
}

// ─── Floating badge ────────────────────────────────────────────────────────────

function FloatingBadge({
  icon,
  label,
  sub,
  delay = 0,
  floatY = -5,
  wrapperStyle,
  reduced,
}: {
  icon: ReactNode
  label: string
  sub: string
  delay?: number
  floatY?: number
  wrapperStyle?: React.CSSProperties
  reduced: boolean
}) {
  return (
    <div className="absolute" style={wrapperStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center gap-2.5 bg-surface/80 border border-border backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-xl"
          animate={reduced ? {} : { y: [0, floatY, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.6,
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
            {icon}
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground whitespace-nowrap leading-tight">
              {label}
            </div>
            <div className="text-[10px] text-muted whitespace-nowrap leading-tight mt-0.5">
              {sub}
            </div>
          </div>
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

// ─── Main section ──────────────────────────────────────────────────────────────

const seq = (i: number, reduced: boolean) =>
  reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : heroSequence(i)

export function Research() {
  const reduced = useReducedMotion()
  const particlesRef = useRef<HTMLDivElement>(null)

  const entry = research[0]
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
              <SectionLabel>Published Research</SectionLabel>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={seq(1, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold tracking-tight leading-[1.1] text-foreground"
            >
              Academic work
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

            {/* Year + venue + tags */}
            <motion.div
              variants={seq(4, reduced)}
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
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Topics">
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

            {/* CTA */}
            <motion.div
              variants={seq(5, reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AccentLink href={entry.url} external>
                View publication
              </AccentLink>
            </motion.div>
          </div>

          {/* ── Right column — detection visual ───────────────────── */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-[420px] h-[460px] flex items-center justify-center">

              {/* Badge 1: Computer Vision — upper-left */}
              <FloatingBadge
                label="Computer Vision"
                sub="Feature extraction"
                icon={<Eye size={14} />}
                delay={0.6}
                floatY={-6}
                reduced={reduced}
                wrapperStyle={{ top: "4%", left: "0%" }}
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

              {/* Badge 2: Pattern Recognition — middle-right */}
              <FloatingBadge
                label="Pattern Recognition"
                sub="98.3% accuracy"
                icon={<ScanFace size={14} />}
                delay={0.8}
                floatY={-7}
                reduced={reduced}
                wrapperStyle={{ top: "36%", right: "0%" }}
              />

              {/* Badge 3: HCI — bottom-left */}
              <FloatingBadge
                label="HCI International"
                sub="Published · 2025"
                icon={<Award size={14} />}
                delay={1.0}
                floatY={-5}
                reduced={reduced}
                wrapperStyle={{ bottom: "4%", left: "0%" }}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
