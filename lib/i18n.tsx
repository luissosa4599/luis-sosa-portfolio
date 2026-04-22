"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { LANGUAGE_STORAGE_KEY, type Language } from "@/lib/language"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with "en" — same on server and client — to avoid hydration
  // mismatch. Read the real preference from localStorage after mount.
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored === "en" || stored === "es") {
      setLanguageState(stored)
    }
    // No auto-detection: navigator.language reflects OS region settings (e.g.
    // es-419) even when the user's display language is English. Defaulting to
    // English and letting the visitor choose via the toggle is more reliable.
  }, [])

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
  }

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }

  return context
}
