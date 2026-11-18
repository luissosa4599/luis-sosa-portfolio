import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/primitives/FadeIn"
import { WordReveal } from "@/components/primitives/WordReveal"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  /**
   * Fondo de la sección: color de la franja que tapa el contenido que pasa por debajo del
   * título fijo. Tiene que coincidir con el fondo real de la sección.
   */
  bg?: "background" | "band" | "ink"
  /** Fijo arriba mientras se recorre la sección (no hace falta dentro de un escenario sticky) */
  sticky?: boolean
  className?: string
}

/**
 * Título de sección con el formato único del sitio: título grande con punto de acento, que
 * se enciende palabra por palabra, y subtítulo opcional debajo.
 *
 * El título (una sola línea) se queda fijo debajo del header mientras se recorre la sección
 * (.section-head en globals.css); el subtítulo se va con el contenido. La sección necesita la
 * clase `section-scope` para que la franja de fondo aparezca solo cuando el título ya está fijo.
 */
export function SectionHeading({ title, subtitle, bg = "background", sticky = true, className }: SectionHeadingProps) {
  return (
    <>
      <div
        className={cn(sticky && "section-head", !subtitle && "mb-10 md:mb-12", className)}
        style={{ "--section-bg": `var(--${bg})` } as React.CSSProperties}
      >
        <h2 className="text-section font-semibold tracking-tight text-foreground">
          <WordReveal text={title} suffix={<span className="text-accent-fg">.</span>} />
        </h2>
      </div>
      {subtitle && (
        <FadeIn as="p" className="-mt-1 mb-10 md:mb-12 text-body text-muted max-w-[60ch]">
          {subtitle}
        </FadeIn>
      )}
    </>
  )
}
