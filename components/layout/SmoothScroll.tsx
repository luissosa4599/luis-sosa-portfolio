"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/**
 * Scroll suavizado de la rueda del mouse (Lenis 1.3.27).
 * - `lerp: 0.06`: un giro de rueda llega al 95 % en ~0.85 s, parecido a GSAP ScrollSmoother.
 *   Con 0.1 eran ~0.58 s; se igualó al de Corazón Cafetalero, que el usuario prefirió (2026-11-20).
 *   No cambia la velocidad, solo cuánto se desliza.
 * - Celular y trackpad conservan su scroll nativo (`syncTouch` apagado por defecto).
 * - Rama inmersivo: `respectReducedMotion: false`, el suavizado sigue aunque el sistema pida
 *   reducir movimiento (decisión del usuario, 2026-11-18).
 * - Links internos (`#seccion` y `/#seccion`): se deslizan y le pasan el foco a la sección
 *   (`tabindex="-1"`), igual que un ancla nativa, para que teclado y lectores de pantalla
 *   sigan desde ahí. Sin esto, el foco se quedaba en el link del menú.
 * - El espacio para el header fijo lo da `scroll-mt-20` de cada sección: Lenis 1.3.27 respeta
 *   `scroll-margin-top` (antes hacía falta `offset: -80`; con las dos, quedaba a 160 px).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.06, respectReducedMotion: false })

    function onAnchorClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
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
      const target = document.querySelector<HTMLElement>(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target)
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
      target.focus({ preventScroll: true })
    }

    document.addEventListener("click", onAnchorClick)

    return () => {
      document.removeEventListener("click", onAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
