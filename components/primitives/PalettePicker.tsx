"use client"

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import {
  PALETTES,
  GLASS_MIN,
  GLASS_MAX,
  setGlass,
  setPalette,
  useGlass,
  usePalette,
  type PaletteId,
} from "@/lib/palette"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const COPY = {
  en: { button: "Change color", color: "Color", glass: "Glass", clear: "Clear", tinted: "Tinted" },
  es: { button: "Cambiar color", color: "Color", glass: "Cristal", clear: "Transparente", tinted: "Tintado" },
}

const subscribeNoop = () => () => {}

/**
 * Selector de paleta (6 colores, azul por defecto) + deslizante de transparencia del cristal
 * (como el de iOS 27). Va junto al selector de idioma en ambos headers.
 * Accesible: el botón abre un diálogo; las muestras son un radiogroup (flechas para moverse,
 * Enter/Espacio para elegir); Escape o clic fuera cierra y devuelve el foco al botón.
 */
export function PalettePicker({ className }: { className?: string }) {
  const { language } = useLanguage()
  const t = COPY[language]
  const palette = usePalette()
  const glass = useGlass()
  const reduced = useReducedMotion()
  // false en servidor e hidratación: evita que la muestra difiera del HTML del servidor
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const radiosRef = useRef<(HTMLButtonElement | null)[]>([])
  const dialogId = useId()

  const current = PALETTES.find((p) => p.id === palette) ?? PALETTES[0]
  const swatch = mounted ? current.swatch : PALETTES[0].swatch

  // Cerrar con Escape o clic fuera; al abrir, el foco va a la paleta activa
  useEffect(() => {
    if (!open) return
    const activeIndex = PALETTES.findIndex((p) => p.id === palette)
    radiosRef.current[activeIndex]?.focus()

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
    // Solo al abrir: mover el foco en cada cambio de paleta lo quitaría del deslizante
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function choose(id: PaletteId) {
    if (id !== palette) setPalette(id)
  }

  // Flechas: mueven el foco y eligen (patrón radiogroup)
  function onRadioKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (index + keys[e.key] + PALETTES.length) % PALETTES.length
    radiosRef.current[next]?.focus()
    choose(PALETTES[next].id)
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${t.button}: ${current.label[language]}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="no-theme-transition flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/[0.07] transition-colors"
      >
        <span
          aria-hidden
          className="block h-4 w-4 rounded-full ring-2 ring-foreground/25 shadow-[inset_0_1px_0_oklch(1_0_0/0.4)]"
          style={{ background: swatch }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={dialogId}
            role="dialog"
            aria-label={t.button}
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            className="glass-menu absolute right-0 top-full z-50 mt-3 w-64 rounded-3xl p-4"
          >
            <p className="text-xs font-semibold text-foreground">{t.color}</p>
            <div role="radiogroup" aria-label={t.color} className="mt-3 grid grid-cols-6 gap-1.5">
              {PALETTES.map((p, i) => {
                const selected = p.id === palette
                return (
                  <button
                    key={p.id}
                    ref={(el) => { radiosRef.current[i] = el }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={p.label[language]}
                    title={p.label[language]}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(p.id)}
                    onKeyDown={(e) => onRadioKey(e, i)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110",
                      selected && "ring-2 ring-foreground/70 ring-offset-2 ring-offset-transparent"
                    )}
                    style={{ background: p.swatch }}
                  >
                    {selected && <Check size={14} strokeWidth={3} className="text-white" aria-hidden />}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-muted">{current.label[language]}</p>

            <label className="mt-4 block">
              <span className="text-xs font-semibold text-foreground">{t.glass}</span>
              <input
                type="range"
                min={GLASS_MIN}
                max={GLASS_MAX}
                step={0.05}
                value={glass}
                onChange={(e) => setGlass(Number(e.target.value))}
                aria-valuetext={`${Math.round(((glass - GLASS_MIN) / (GLASS_MAX - GLASS_MIN)) * 100)}% ${t.tinted.toLowerCase()}`}
                className="glass-range mt-2 w-full"
              />
              <span aria-hidden className="mt-1 flex justify-between text-[12px] text-muted-2">
                <span>{t.clear}</span>
                <span>{t.tinted}</span>
              </span>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
