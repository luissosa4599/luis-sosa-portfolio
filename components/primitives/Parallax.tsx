import { cn } from "@/lib/utils"

interface ParallaxProps {
  children?: React.ReactNode
  /** Cuánto se mueve respecto al scroll. Positivo: más lento que la página. */
  factor: number
  /**
   * Para imágenes dentro de un marco recortado: la imagen va ampliada (`zoom`) y su
   * desplazamiento se limita al 7 % de su alto, para que nunca se vean bordes.
   */
  photo?: boolean
  /** Ampliación de la imagen cuando `photo` (por defecto 1.15). */
  zoom?: number
  className?: string
}

/**
 * Desplaza su contenido con el scroll (parallax), en CSS con animation-timeline: view()
 * ("Parallax" en globals.css): sin listeners de scroll ni medidas en JS.
 * - Recorrido: de +d a −d mientras el elemento cruza la pantalla (rango `cover`).
 *   d = min(160 px, |factor| × 450 px), con el signo del factor.
 * - En el HTML del servidor, sin soporte o con "reducir movimiento" se queda en su lugar.
 * - El marco que lo recorta debe usar overflow-clip, no overflow-hidden: hidden crea un
 *   contenedor de scroll y la línea de tiempo view() se quedaría quieta.
 */
export function Parallax({ children, factor, photo = false, zoom = 1.15, className }: ParallaxProps) {
  const travel = photo
    ? `${Math.sign(factor) * 7}%`
    : `${(Math.sign(factor) * Math.min(160, Math.abs(factor) * 450)).toFixed(0)}px`

  return (
    <div
      className={cn("parallax", className)}
      style={{ "--px": travel, scale: photo ? String(zoom) : undefined } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
