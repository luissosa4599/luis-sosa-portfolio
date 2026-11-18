"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LanguageToggle } from "@/components/primitives/LanguageToggle"
import { PalettePicker } from "@/components/primitives/PalettePicker"
import { useLanguage } from "@/lib/i18n"

export function CaseStudyHeader() {
  const { language } = useLanguage()

  return (
    // Entrada con CSS (.enter-down en globals.css): arranca con el HTML, sin esperar a JS
    <header className="enter-down fixed top-4 inset-x-0 z-50 px-[clamp(1.25rem,4vw,2.5rem)]">
      <div className="max-w-[75rem] mx-auto">
        <div className="glass rounded-[1.75rem]">
          <div className="flex h-12 items-center justify-between px-4 md:px-5">

            {/* Back link */}
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-150 font-medium"
            >
              <ArrowLeft size={14} />
              {language === "es" ? "Volver" : "Back"}
            </Link>

            {/* Center — "Case Study" label */}
            <span className="hidden md:block text-xs font-mono text-muted-2 tracking-widest uppercase">
              {language === "es" ? "Caso de estudio" : "Case Study"}
            </span>

            {/* Right — toggles */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <PalettePicker />
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}
