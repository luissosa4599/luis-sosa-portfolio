import { cn } from "@/lib/utils"
import { sceneVars, type SceneDirection } from "@/lib/scene"

type Tag = "div" | "p" | "h2" | "h3" | "span" | "section" | "article" | "figure" | "li"

interface FadeInProps {
  children: React.ReactNode
  /** Etiqueta del elemento (li dentro de ul, figure, article…). */
  as?: Tag
  direction?: SceneDirection
  /** Cascada: retrasa la entrada en pasos de scroll (0, 1, 2…). */
  stagger?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Escena: el elemento entra desde abajo de la pantalla y sale por arriba siguiendo el
 * scroll, en ambos sentidos (CSS scroll-driven, ver "Escenas" en globals.css). Entrada y
 * salida van en el MISMO elemento: sus tramos nunca se cruzan y cada una solo se aplica
 * mientras corre (en reposo no queda ninguna).
 *
 * Cristal: si el contenido lleva .glass/.glass-panel, la escena debe ser ese elemento
 * (className="glass-panel …"), no un envoltorio. Un ancestro con una animación de opacidad
 * atada al scroll corta el desenfoque: el cristal solo vería lo que hay dentro del envoltorio.
 *
 * Sin soporte del navegador o con "reducir movimiento", queda quieto y visible.
 */
export function FadeIn({ children, as: Tag = "div", direction = "up", stagger = 0, className, style }: FadeInProps) {
  return (
    <Tag className={cn("scene", className)} style={{ ...sceneVars(direction, stagger), ...style }}>
      {children}
    </Tag>
  )
}
