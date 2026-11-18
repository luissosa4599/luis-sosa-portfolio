"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/primitives/ThemeToggle"
import { LanguageToggle } from "@/components/primitives/LanguageToggle"
import { useLanguage } from "@/lib/i18n"

export function CaseStudyHeader() {
  const { language } = useLanguage()

  return (
    // Entrada con CSS (.enter-down en globals.css): arranca con el HTML, sin esperar a JS
    <header className="enter-down fixed top-4 inset-x-0 z-50 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl border border-border shadow-lg backdrop-blur-md"
          style={{ background: "var(--nav-bg)" }}
        >
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
              <ThemeToggle />
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}
