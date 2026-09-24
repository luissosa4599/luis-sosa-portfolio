"use client"

import { useLanguage } from "@/lib/i18n"

export function SkipLink() {
  const { language } = useLanguage()

  return (
    <a
      href="#main"
      // SmoothScroll intercepts hash links, so move focus explicitly
      onClick={() => document.getElementById("main")?.focus({ preventScroll: true })}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-white focus:text-sm focus:font-semibold"
    >
      {language === "es" ? "Saltar al contenido" : "Skip to content"}
    </a>
  )
}
