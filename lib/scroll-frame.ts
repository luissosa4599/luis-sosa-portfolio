// Un solo listener de scroll/resize para todo el parallax, con requestAnimationFrame para no
// recalcular más de una vez por cuadro. Lenis mueve el scroll nativo de window, así que el
// evento `scroll` llega en cada cuadro de su animación.

type Callback = () => void

const callbacks = new Set<Callback>()
let rafId = 0

function run() {
  rafId = 0
  for (const cb of callbacks) cb()
}

function schedule() {
  if (!rafId) rafId = requestAnimationFrame(run)
}

/** Registra un callback por cuadro tras scroll/resize. Devuelve la baja. */
export function onScrollFrame(cb: Callback): () => void {
  if (callbacks.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
  }
  callbacks.add(cb)
  schedule()
  return () => {
    callbacks.delete(cb)
    if (callbacks.size === 0) {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }
}
