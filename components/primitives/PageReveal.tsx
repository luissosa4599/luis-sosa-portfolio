"use client"

import type { ReactNode } from "react"
import { PageReadyProvider, usePageReady } from "@/lib/page-ready"

function PageRevealOverlay() {
  const ready = usePageReady()
  if (ready) return null
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9999,
        background: "var(--background)",
        animation: "overlay-out 0.5s ease-out 0.05s both",
      }}
    />
  )
}

export function PageReveal({ children }: { children: ReactNode }) {
  return (
    <PageReadyProvider>
      {children}
      <PageRevealOverlay />
    </PageReadyProvider>
  )
}
