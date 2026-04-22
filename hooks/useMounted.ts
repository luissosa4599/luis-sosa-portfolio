"use client"

import { useState, useEffect } from "react"

/**
 * Returns true after two animation frames have passed since mount.
 *
 * The double-rAF pattern guarantees the browser paints at least one frame
 * before the returned value flips to true. This is necessary in Next.js App
 * Router because "use client" components are still SSR'd — Framer Motion
 * renders at the final (animate) state on the server, so the animation never
 * fires on hydration. Gating `animate` behind this hook ensures the animation
 * always starts from the initial state on the client.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let id1: number, id2: number
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setMounted(true))
    })
    return () => {
      cancelAnimationFrame(id1)
      cancelAnimationFrame(id2)
    }
  }, [])

  return mounted
}
