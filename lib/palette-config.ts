// Datos de las paletas y script de arranque. Sin React: lo importa layout.tsx (servidor).
// La tienda y los hooks viven en lib/palette.ts (cliente).

// Cada paleta solo cambia el tono (--hue) o quita el croma (neutral): ver "Paleta" en
// globals.css. La muestra del selector es el acento de esa paleta.
export const PALETTES = [
  { id: "blue",    label: { en: "Blue",      es: "Azul" },     swatch: "oklch(0.55 0.17 255)" },
  { id: "violet",  label: { en: "Violet",    es: "Violeta" },  swatch: "oklch(0.55 0.17 292)" },
  { id: "teal",    label: { en: "Turquoise", es: "Turquesa" }, swatch: "oklch(0.55 0.17 195)" },
  { id: "pink",    label: { en: "Pink",      es: "Rosa" },     swatch: "oklch(0.55 0.17 350)" },
  { id: "amber",   label: { en: "Amber",     es: "Ámbar" },    swatch: "oklch(0.55 0.17 70)" },
  { id: "neutral", label: { en: "Neutral",   es: "Neutral" },  swatch: "oklch(0.55 0 0)" },
] as const

export type PaletteId = (typeof PALETTES)[number]["id"]
export const DEFAULT_PALETTE: PaletteId = "blue"
export const PALETTE_IDS = PALETTES.map((p) => p.id) as readonly string[]

// Intensidad del cristal (deslizante de iOS 27: Transparente ↔ Tintado)
export const GLASS_MIN = 0.35
export const GLASS_MAX = 0.9
export const DEFAULT_GLASS = 0.6

export const PALETTE_STORAGE_KEY = "portfolio-palette"
export const GLASS_STORAGE_KEY = "portfolio-glass"

/**
 * Se ejecuta en <head> antes del primer pintado (layout.tsx): aplica la paleta y el
 * cristal guardados para que no haya un destello del azul por defecto.
 */
export const PALETTE_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;var p=localStorage.getItem("${PALETTE_STORAGE_KEY}");if(p&&p!=="${DEFAULT_PALETTE}"&&${JSON.stringify(PALETTE_IDS)}.indexOf(p)>-1)d.dataset.palette=p;var g=parseFloat(localStorage.getItem("${GLASS_STORAGE_KEY}"));if(g>=${GLASS_MIN}&&g<=${GLASS_MAX})d.style.setProperty("--glass-opacity",String(g))}catch(e){}})()`
