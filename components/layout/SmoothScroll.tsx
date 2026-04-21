"use client"

import { useEffect } from "react"
import Lenis from "lenis"

const HEADER_OFFSET = -80

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.08 })

    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]")
      if (!anchor) return
      const href = anchor.getAttribute("href") ?? ""

      // Match both "#section" and "/#section" formats
      const hash = href.startsWith("/#")
        ? href.slice(1)          // "/#about" → "#about"
        : href.startsWith("#")
          ? href                 // "#about" → "#about"
          : null

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
