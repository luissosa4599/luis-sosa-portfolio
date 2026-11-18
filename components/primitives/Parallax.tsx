"use client"

import { useEffect, useRef } from "react"
import { onScrollFrame } from "@/lib/scroll-frame"
import { cn } from "@/lib/utils"

interface ParallaxProps {
  children?: React.ReactNode
  /** Cuánto se mueve respecto al scroll. Positivo: más lento que la página. */
  factor: number
  /**
   * Para imágenes dentro de un marco con overflow-hidden: la imagen va ampliada (`zoom`)
   * y su desplazamiento se limita al 7 % del alto del marco, para que nunca se vean bordes.
   */
  photo?: boolean
  /** Ampliación de la imagen cuando `photo` (por defecto 1.15). */
  zoom?: number
  className?: string
}

/**
 * Desplaza su contenido con el scroll (parallax), como en la landing de Grupo Cumulus:
 *
 *   c   = centro del PADRE − centro de la ventana
 *   lim = photo ? alto del padre × 0.07 : 160
 *   y   = clamp(−c × factor, −lim, +lim)
 *
 * Se mide el padre, no el propio elemento, para no retroalimentarse con su transform.
 * En el HTML del servidor no hay desplazamiento; con "reducir movimiento" no se registra.
 */
export function Parallax({ children, factor, photo = false, zoom = 1.15, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    return onScrollFrame(() => {
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return // fuera de vista
      const c = rect.top + rect.height / 2 - window.innerHeight / 2
      const lim = photo ? rect.height * 0.07 : 160
      const y = Math.max(-lim, Math.min(lim, -c * factor))
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)${photo ? ` scale(${zoom})` : ""}`
    })
  }, [factor, photo, zoom])

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={photo ? { transform: `scale(${zoom})` } : undefined}
    >
      {children}
    </div>
  )
}
