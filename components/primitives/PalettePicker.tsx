"use client"

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Check, Dices, Lock, LockOpen, Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import {
  PALETTES,
  GLASS_MIN,
  GLASS_MAX,
  GLASS_STEP,
  setGlass,
  setLocked,
  setPalette,
  shuffleAppearance,
  useGlass,
  useLocked,
  usePalette,
  type PaletteId,
} from "@/lib/palette"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const COPY = {
  en: {
    button: "Appearance", theme: "Theme", color: "Color", glass: "Glass", clear: "Clear", tinted: "Tinted",
    modes: { light: "Light", dark: "Dark", system: "System" },
    shuffle: "Shuffle", keep: "Keep",
    keepLabel: "Keep this look on reload",
    hintLocked: "This look stays when you reload.",
    hintRandom: "New color and glass on every reload.",
  },
  es: {
    button: "Apariencia", theme: "Tema", color: "Color", glass: "Cristal", clear: "Transparente", tinted: "Tintado",
    modes: { light: "Claro", dark: "Oscuro", system: "Sistema" },
    shuffle: "Sortear", keep: "Mantener",
    keepLabel: "Mantener esta apariencia al recargar",
    hintLocked: "Esta apariencia se mantiene al recargar.",
    hintRandom: "Color y cristal nuevos en cada recarga.",
  },
}

const MODES = [
  { id: "light", Icon: Sun },
  { id: "dark", Icon: Moon },
  { id: "system", Icon: Monitor },
] as const
type Mode = (typeof MODES)[number]["id"]

const subscribeNoop = () => () => {}

/** Flechas en un radiogroup: mueven el foco y eligen (patrón WAI-ARIA). */
function arrowIndex(e: KeyboardEvent, index: number, count: number): number | null {
  const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
  if (!(e.key in step)) return null
  e.preventDefault()
  return (index + step[e.key] + count) % count
}

/**
 * Panel de apariencia junto al selector de idioma (ambos headers):
 * - Tema: Claro / Oscuro / Sistema (next-themes; Sistema sigue al dispositivo).
 * - Color: 6 paletas, azul por defecto.
 * - Cristal: deslizante de transparencia, como el de iOS 27.
 * Accesible: el botón abre un diálogo; tema y color son radiogroups (flechas para moverse,
 * Enter/Espacio para elegir); Escape o clic fuera cierra y devuelve el foco al botón.
 */
export function PalettePicker({ className }: { className?: string }) {
  const { language } = useLanguage()
  const t = COPY[language]
  const palette = usePalette()
  const glass = useGlass()
  const locked = useLocked()
  const { theme, setTheme } = useTheme()
  const reduced = useReducedMotion()
  // false en servidor e hidratación: evita que la muestra o el tema difieran del HTML del servidor
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const modeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const colorRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dialogId = useId()

  const current = PALETTES.find((p) => p.id === palette) ?? PALETTES[0]
  const swatch = mounted ? current.swatch : PALETTES[0].swatch
  const mode: Mode | undefined = mounted ? ((theme as Mode | undefined) ?? "system") : undefined

  // Cerrar con Escape o clic fuera; al abrir, el foco va al tema activo (primer control)
  useEffect(() => {
    if (!open) return
    const activeMode = Math.max(0, MODES.findIndex((m) => m.id === mode))
    modeRefs.current[activeMode]?.focus()

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
    // Solo al abrir: mover el foco en cada cambio lo quitaría del control que se está usando
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function chooseMode(next: Mode) {
    if (next === mode) return
    // Misma transición de color que tenía el botón de tema
    document.documentElement.classList.add("theme-transitioning")
    setTheme(next)
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 600)
    // Elegir el tema a mano también es una preferencia: se cierra el candado
    setLocked(true)
  }

  // Siempre, aunque sea la paleta actual: elegirla a mano cierra el candado
  function choosePalette(id: PaletteId) {
    setPalette(id)
  }

  const label = mounted && mode
    ? `${t.button}: ${current.label[language]}, ${t.modes[mode].toLowerCase()}`
    : t.button

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
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
            {/* ── Tema ───────────────────────────────────────────────────── */}
            <p className="text-xs font-semibold text-foreground">{t.theme}</p>
            <div
              role="radiogroup"
              aria-label={t.theme}
              className="mt-2 grid grid-cols-3 gap-1 rounded-full bg-foreground/[0.07] p-1"
            >
              {MODES.map(({ id, Icon }, i) => {
                const selected = id === mode
                return (
                  <button
                    key={id}
                    ref={(el) => { modeRefs.current[i] = el }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected || (!mode && i === 0) ? 0 : -1}
                    onClick={() => chooseMode(id)}
                    onKeyDown={(e) => {
                      const next = arrowIndex(e, i, MODES.length)
                      if (next === null) return
                      modeRefs.current[next]?.focus()
                      chooseMode(MODES[next].id)
                    }}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition-colors",
                      selected
                        ? "bg-accent text-on-accent shadow-[inset_0_1px_0_oklch(1_0_0/0.25)]"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    <Icon size={13} aria-hidden />
                    {t.modes[id]}
                  </button>
                )
              })}
            </div>

            {/* ── Color ──────────────────────────────────────────────────── */}
            <p className="mt-4 text-xs font-semibold text-foreground">{t.color}</p>
            <div role="radiogroup" aria-label={t.color} className="mt-3 grid grid-cols-6 gap-1.5">
              {PALETTES.map((p, i) => {
                const selected = p.id === palette
                return (
                  <button
                    key={p.id}
                    ref={(el) => { colorRefs.current[i] = el }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={p.label[language]}
                    title={p.label[language]}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choosePalette(p.id)}
                    onKeyDown={(e) => {
                      const next = arrowIndex(e, i, PALETTES.length)
                      if (next === null) return
                      colorRefs.current[next]?.focus()
                      choosePalette(PALETTES[next].id)
                    }}
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

            {/* ── Cristal ────────────────────────────────────────────────── */}
            <label className="mt-4 block">
              <span className="text-xs font-semibold text-foreground">{t.glass}</span>
              <input
                type="range"
                min={GLASS_MIN}
                max={GLASS_MAX}
                step={GLASS_STEP}
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

            {/* ── Azar y candado ─────────────────────────────────────────── */}
            {/* Sin candado, cada recarga sortea color y cristal (PALETTE_BOOT_SCRIPT). Elegir
                algo a mano lo cierra solo; el dado sortea al momento sin tocarlo. */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
              <button
                type="button"
                onClick={shuffleAppearance}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-foreground/[0.07] transition-colors"
              >
                <Dices size={14} aria-hidden />
                {t.shuffle}
              </button>
              <button
                type="button"
                aria-pressed={locked}
                aria-label={t.keepLabel}
                title={t.keepLabel}
                onClick={() => setLocked(!locked)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  locked
                    ? "bg-accent text-on-accent shadow-[inset_0_1px_0_oklch(1_0_0/0.25)]"
                    : "text-muted hover:text-foreground hover:bg-foreground/[0.07]"
                )}
              >
                {locked ? <Lock size={14} aria-hidden /> : <LockOpen size={14} aria-hidden />}
                {t.keep}
              </button>
            </div>
            <p aria-live="polite" className="mt-2 text-[12px] text-muted-2">
              {locked ? t.hintLocked : t.hintRandom}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
