import { cn } from "@/lib/utils"
import { sceneVars, type SceneDirection } from "@/lib/scene"

interface FadeInProps {
  children: React.ReactNode
  direction?: SceneDirection
  /** Cascada: retrasa la entrada en pasos de scroll (0, 1, 2…). */
  stagger?: number
  /** Clases del contenedor del contenido (layout interno). */
  className?: string
  /** Clases del envoltorio externo (su lugar dentro del padre: grid, márgenes, z-index). */
  outerClassName?: string
}

/**
 * Bloque que entra desde abajo de la pantalla y sale por arriba siguiendo el scroll, en
 * ambos sentidos (CSS scroll-driven, ver "Escenas" en globals.css). Dos elementos porque
 * entrar y salir son dos animaciones que se pisarían opacity y translate en uno solo:
 * el externo sale (.scene-out) y el interno entra (.scene-in).
 * Sin soporte del navegador o con "reducir movimiento", el contenido queda quieto y visible.
 */
export function FadeIn({ children, direction = "up", stagger = 0, className, outerClassName }: FadeInProps) {
  return (
    <div className={cn("scene-out", outerClassName)} style={sceneVars(direction, stagger)}>
      <div className={cn("scene-in", className)}>{children}</div>
    </div>
  )
}
