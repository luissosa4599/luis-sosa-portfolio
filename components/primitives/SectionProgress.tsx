"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

const SECTION_IDS = ["hero", "work", "research", "approach", "contact"] as const

const SECTION_LABELS = {
  en: ["Home", "Work", "Research", "Approach", "Contact"],
  es: ["Inicio", "Trabajo", "Research", "Enfoque", "Contacto"],
} as const

export function SectionProgress() {
  const { language } = useLanguage()
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const update = () => {
      const threshold = window.scrollY + window.innerHeight * 0.45
      let current = "hero"
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= threshold) current = id
      }
      setActive(current)
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  const label = SECTION_LABELS[language][SECTION_IDS.indexOf(active as typeof SECTION_IDS[number])] ?? ""

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-none select-none">
      {/* Dots */}
      <div className="flex flex-col gap-3">
        {SECTION_IDS.map((id) => (
          <motion.div
            key={id}
            animate={{
              width: id === active ? 3 : 2,
              height: id === active ? 24 : 8,
              backgroundColor:
                id === active
                  ? "hsl(213 90% 53%)"
                  : "hsl(213 90% 53% / 0.35)",
              opacity: id === active ? 1 : 0.6,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-full"
          />
        ))}
      </div>

      {/* Label */}
      <div className="relative h-24 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute text-xs font-mono font-semibold tracking-widest uppercase text-accent"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
