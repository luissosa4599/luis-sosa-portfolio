"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { LANGUAGE_STORAGE_KEY, type Language } from "@/lib/language"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// ── localStorage-backed store ────────────────────────────────────────────────
// The server snapshot is always "en", so SSR and hydration render English and
// React re-renders with the stored preference right after hydrating — no
// hydration mismatch.
// No auto-detection: navigator.language reflects OS region settings (e.g.
// es-419) even when the user's display language is English. Defaulting to
// English and letting the visitor choose via the toggle is more reliable.
const listeners = new Set<() => void>()
// Fallback when localStorage is unavailable (private mode, blocked storage)
let memoryLanguage: Language = "en"

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function getSnapshot(): Language {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "es" ? "es" : "en"
  } catch {
    return memoryLanguage
  }
}

const getServerSnapshot = (): Language => "en"

function setLanguage(nextLanguage: Language) {
  memoryLanguage = nextLanguage
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
  } catch {
    // Storage unavailable (private mode, blocked) — preference won't persist
  }
  listeners.forEach((listener) => listener())
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Keep <html lang> in sync for screen readers and browser translation
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

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
