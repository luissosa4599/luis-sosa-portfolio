"use client"

import { useEffect } from "react"
import Lenis from "lenis"

// Height of the fixed SiteHeader — keep in sync with h-14 (56px)
const HEADER_OFFSET = -64

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.08 })

    // Intercept anchor clicks and route through Lenis for smooth scroll
    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']")
      if (!anchor) return
      const hash = anchor.getAttribute("href")
      if (!hash || hash === "#") return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET })
    }

    document.addEventListener("click", onAnchorClick)

    let rafId: number
    function animate(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("click", onAnchorClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
