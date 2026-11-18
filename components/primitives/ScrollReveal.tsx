import { cn } from "@/lib/utils"
import { sceneVars, type SceneDirection } from "@/lib/scene"

type Tag = "div" | "article" | "section" | "li"

interface ScrollRevealProps {
  children: React.ReactNode
  /** Etiqueta del elemento EXTERNO (li dentro de ul, article…): conserva la semántica. */
  as?: Tag
  direction?: SceneDirection
  /** Cascada: retrasa la entrada en pasos de scroll (0, 1, 2…). */
  stagger?: number
  /** Clases del contenido (la tarjeta en sí). */
  className?: string
  style?: React.CSSProperties
  /** Clases del elemento externo (su lugar en la cuadrícula o lista). */
  outerClassName?: string
}

/**
 * Como FadeIn, pero con la etiqueta externa a elegir: un `li` sigue siendo hijo directo de
 * su `ul`. La tarjeta (className) va en el elemento interno y llena el alto del externo,
 * para que las tarjetas de una misma fila de la cuadrícula midan lo mismo.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  direction = "up",
  stagger = 0,
  className,
  style,
  outerClassName,
}: ScrollRevealProps) {
  return (
    <Tag className={cn("scene-out", outerClassName)} style={sceneVars(direction, stagger)}>
      <div className={cn("scene-in h-full", className)} style={style}>
        {children}
      </div>
    </Tag>
  )
}
