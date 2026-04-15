"use client"

import { motion } from "framer-motion"
import { Eye, Target, MessageSquare, Cpu } from "lucide-react"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { FadeIn } from "@/components/primitives/FadeIn"
import { approach } from "@/lib/data/approach"

const ICONS = [Eye, Target, MessageSquare, Cpu]

export function Approach() {
  return (
    <SectionWrapper id="approach">
      <FadeIn>
        <SectionLabel>Approach</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          How I work
        </h2>
      </FadeIn>

      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {approach.map((principle, i) => {
          const Icon = ICONS[i]
          return (
            <motion.article
              key={principle.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: "easeOut" }}
              className="group relative flex flex-col gap-6 rounded-2xl border border-border bg-surface p-7 md:p-8 overflow-hidden hover:border-accent/25 transition-colors duration-300"
            >
              {/* Ambient glow blob — top-right corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, hsl(213 100% 70% / 0.14), transparent 70%)" }}
              />

              {/* Top row: icon left, number right */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Icon size={20} />
                </div>
                <span className="font-mono text-5xl font-bold text-foreground/[0.04] select-none leading-none -mt-1">
                  {principle.index}
                </span>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {principle.heading}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {principle.body}
                </p>
              </div>

              {/* Bottom accent line — appears on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, hsl(213 90% 53% / 0.45), transparent)" }}
              />
            </motion.article>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
