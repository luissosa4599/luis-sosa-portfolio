/**
 * Barra de progreso de lectura arriba de la página. Crece con el scroll en CSS
 * (animation-timeline: scroll(root), ver .scroll-progress en globals.css), sin listener de
 * scroll ni re-render de React en cada cuadro.
 */
export function SectionProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent origin-left pointer-events-none"
    />
  )
}
