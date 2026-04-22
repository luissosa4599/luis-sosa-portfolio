"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"

/**
 * Renders children normally (full opacity), then overlays a solid panel that
 * fades out via CSS animation. This avoids the core flaw of the opacity-0 wrapper
 * approach: IntersectionObserver ignores opacity, so whileInView animations fire
 * immediately inside an opacity:0 parent and complete before the wrapper fades in.
 *
 * With the overlay pattern, children render at their real initial states
 * (hidden Framer Motion elements) and animate correctly. The overlay just
 * provides the "blank start" visual without breaking IntersectionObserver.
 */
export function PageReveal({ children }: { children: ReactNode }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Remove overlay from DOM after animation completes (0.05s delay + 0.5s fade)
    const id = setTimeout(() => setGone(true), 650)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {children}
      {!gone && (
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9999,
            background: "var(--background)",
            animation: "overlay-out 0.5s ease-out 0.05s both",
          }}
        />
      )}
    </>
  )
}
