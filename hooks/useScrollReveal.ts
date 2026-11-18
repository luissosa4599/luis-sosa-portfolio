"use client"

import { useEffect, useRef, useState } from "react"
import type { Variants } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type RevealState = "hidden" | "visible" | undefined

/**
 * Revelado al hacer scroll sin ocultar nada en el HTML del servidor.
 *
 * El elemento se renderiza visible (`initial={false}` y sin `animate`), así que el HTML
 * prerenderizado se ve completo aunque el JS tarde o falle (antes 98 elementos llegaban con
 * opacity:0 y la página salía negra sin JS). Ya en el navegador:
 * - Si al montar está fuera de pantalla, pasa a "hidden" (al instante, ver `instantHidden`;
 *   nadie lo ve) y se anima a "visible" al entrar (umbral 15 %, margen inferior −8 %, una vez).
 * - Si ya está en pantalla, se queda como vino: sin parpadeo.
 * - Con "reducir movimiento" nunca se oculta.
 *
 * Es declarativo (`animate={state}`) y no `useAnimation().set()`: al hidratar, Framer conecta
 * los controls después de que corre este efecto y `set` no se aplicaba. Los hijos con
 * `variants` heredan los estados, igual que antes (cascada de Framer).
 *
 * Uso: `const { ref, animate } = useScrollReveal()`
 *      `<motion.div ref={ref} initial={false} animate={animate} variants={instantHidden(v)}>`
 */
export function useScrollReveal<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [animate, setAnimate] = useState<RevealState>(undefined)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || typeof IntersectionObserver === "undefined") return

    // El primer aviso del observer llega con la posición inicial: si cualquier parte del
    // elemento ya está en pantalla se deja como vino; si no, se oculta (fuera de vista).
    let first = true
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (first) {
          first = false
          const { top, bottom } = entry.boundingClientRect
          if (top < window.innerHeight && bottom > 0) observer.disconnect()
          else setAnimate("hidden")
          return
        }
        if (entry.isIntersecting) {
          setAnimate("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return { ref, animate }
}

/** Misma variante, pero el paso a "hidden" es instantáneo (ocurre fuera de pantalla). */
export function instantHidden(variants: Variants): Variants {
  const hidden = variants.hidden
  if (!hidden || typeof hidden === "function") return variants
  return { ...variants, hidden: { ...hidden, transition: { duration: 0 } } }
}
