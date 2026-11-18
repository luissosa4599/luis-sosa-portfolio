"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="tablist"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full bg-foreground/[0.07] p-0.5",
        className
      )}
    >
      {(["en", "es"] as const).map((lang) => (
        <button
          key={lang}
          role="tab"
          type="button"
          aria-selected={language === lang}
          onClick={() => setLanguage(lang)}
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-semibold uppercase transition-colors duration-150",
            language === lang
              ? "bg-accent/15 text-accent-fg"
              : "text-muted hover:text-foreground"
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
