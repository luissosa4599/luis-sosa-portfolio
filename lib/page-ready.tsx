"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Default true so any component outside PageReveal animates normally
const PageReadyContext = createContext(true)

// Module-level flag: once ready fires for the first time, skip the delay on
// any subsequent mount (e.g. after LanguageTransition remounts the tree).
let hasBeenReady = false

export function PageReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(hasBeenReady)

  useEffect(() => {
    if (hasBeenReady) return
    const id = setTimeout(() => {
      hasBeenReady = true
      setReady(true)
    }, 560)
    return () => clearTimeout(id)
  }, [])

  return (
    <PageReadyContext.Provider value={ready}>
      {children}
    </PageReadyContext.Provider>
  )
}

export const usePageReady = () => useContext(PageReadyContext)
