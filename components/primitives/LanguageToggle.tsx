"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()
  const nextLanguage = language === "en" ? "es" : "en"

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className={cn(
        "relative flex h-8 min-w-10 items-center justify-center rounded-md border border-border bg-surface px-3 text-xs font-semibold uppercase text-muted transition-colors hover:text-foreground",
        className
      )}
      aria-label={`Switch language to ${nextLanguage.toUpperCase()}`}
    >
      {nextLanguage}
    </button>
  )
}
