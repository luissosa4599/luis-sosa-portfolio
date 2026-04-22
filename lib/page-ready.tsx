"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Default true so any component outside PageReveal animates normally
const PageReadyContext = createContext(true)

export function PageReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Overlay animation: 50ms delay + 500ms fade = 550ms total, +10ms buffer
    const id = setTimeout(() => setReady(true), 560)
    return () => clearTimeout(id)
  }, [])

  return (
    <PageReadyContext.Provider value={ready}>
      {children}
    </PageReadyContext.Provider>
  )
}

export const usePageReady = () => useContext(PageReadyContext)
