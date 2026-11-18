@AGENTS.md

---

# Reglas de trabajo

## Antes de investigar código
Consultar este archivo primero. Si la información relevante ya está en la sección de arquitectura, usarla directamente sin explorar el repo. Solo explorar el código si la respuesta no se encuentra aquí.

## Al terminar cualquier tarea (feat / fix / refactor)
Revisar si hay información nueva sobre arquitectura, patrones o decisiones técnicas que valga documentar. Si la hay, proponer agregarla o actualizarla en este archivo — la documentación es incremental, no hay obligación de documentar todo. Si hubo un cambio en la arquitectura durante la tarea, sobrescribir la sección correspondiente.

## Antes de implementar cualquier cambio
1. Diseñar un plan: qué se va a hacer, por qué y de qué manera.
2. Revisar si en el scope entra alguna buena práctica o mejora aplicable al código existente. Solo preguntar si se encuentra algo concreto — si no hay nada que mejorar, no sugerir.
3. Presentar plan (y mejoras si las hay) y **esperar autorización antes de tocar código**.

## Commits
- Sin co-author. El mensaje del commit va limpio, sin líneas `Co-Authored-By`.

---

# Arquitectura del proyecto

## Stack
- **Framework:** Next.js App Router (ver `node_modules/next/dist/docs/` antes de escribir código — puede haber breaking changes)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + shadcn/ui
- **Animaciones:** Framer Motion v12
- **Scroll suave:** Lenis 1.3.27 (`lerp: 0.1`, `autoRaf`, sin wrapper personalizado — usa el scroll nativo de window)
- **i18n:** Sistema propio (EN/ES), sin librería externa

## Estructura de carpetas relevante
```
app/
  layout.tsx       — Root layout: ThemeProvider > LanguageProvider > SkipLink + (LanguageTransition > SmoothScroll)
  page.tsx         — Server Component. Renderiza todas las secciones. <main id="main"> es el destino del SkipLink
  work/[slug]/page.tsx — Case studies. Slugs y metadata salen de lib/data/projects.ts; dynamicParams=false → slug desconocido = 404
  robots.ts, sitemap.ts, opengraph-image.tsx — SEO. La OG es estática (sin edge runtime); en ImageResponse todo div con >1 hijo necesita display:flex
  globals.css      — Tokens, y las entradas CSS al cargar: .enter-rise (hero) y .enter-down (headers)
components/
  layout/
    LanguageTransition.tsx  — AnimatePresence mode="wait", key={language}, remonta el tree al cambiar idioma
    SmoothScroll.tsx        — Inicializa Lenis en useEffect, solo passthrough en render. Intercepta clicks en links #hash: los desliza y pasa el foco a la sección
    SkipLink.tsx            — "Saltar al contenido"; mueve el foco a #main manualmente porque Lenis intercepta el hash
    SiteHeader.tsx
    SiteFooter.tsx
  primitives/
    FadeIn.tsx       — Entrada al hacer scroll con dirección. Usa useScrollReveal (llega visible en el HTML)
    ScrollReveal.tsx — Igual que FadeIn pero acepta cualquier tag HTML y variantes propias
    ThemedImage.tsx  — Par de screenshots dark/light con next/image (lazy: solo se descarga la del tema activo)
    Parallax.tsx     — Desplaza su contenido con el scroll (capturas de proyectos, brillo del hero). Usa lib/scroll-frame.ts
  sections/
    Hero.tsx        — Entrada con CSS (.enter-rise); solo el título rotativo usa Framer
    TechMarquee.tsx — Cinta de tecnologías entre el hero y About. Server component, animación CSS (.marquee-track)
    About.tsx, Skills.tsx, Experience.tsx, Projects.tsx, Research.tsx, Approach.tsx, Contact.tsx
hooks/
  useMounted.ts       — Retorna true después de 2 requestAnimationFrame (garantiza hidratación)
  useScrollReveal.ts  — Revelado al hacer scroll sin ocultar nada en el HTML del servidor (+ instantHidden)
  useReducedMotion.ts — Wrapper de useReducedMotion de Framer Motion
lib/
  motion.ts        — Variantes de Framer Motion: fadeUp, fadeLeft, fadeRight, zoomIn, cardReveal, fadeIn, heroSequence; alternateReveal(i) y withDelay()
  scroll-frame.ts  — Un solo listener de scroll/resize con rAF para todo el parallax
  i18n.tsx         — LanguageProvider y useLanguage. Store sobre localStorage vía useSyncExternalStore (server snapshot "en" → sin hydration mismatch). Sincroniza <html lang>
  language.ts      — Constante LANGUAGE_STORAGE_KEY y tipo Language
  site.ts          — SITE_URL, base de metadata, robots y sitemap. Hoy es la URL de Vercel (ver docs/dominio-propio.md)
```

## Legibilidad (contraste y tamaños)

Auditado con WCAG AA en ambos temas (2026-11-18): **0 textos bajo 4.5:1** (antes 103 en oscuro y 111 en claro). Al tocar colores o fondos, mantenerlo:

- **Azul como texto = `text-accent-fg`**, nunca `text-accent`. `--color-accent` es para fondos, botones, puntos y bordes (texto blanco encima: 5.1:1). `--color-accent-fg` cambia por tema (`--accent-fg` en `:root` / `.light`).
- **`--muted-2`** (metadatos, etiquetas): 58 % en oscuro y 42 % en claro, calculado contra el peor fondo (`surface-2`, badges, botones y bandas). No volver a aclararlo.
- **Nada de colores fijos pensados solo para oscuro** (p. ej. `hsl(213 90% 70%)` inline): en claro bajaban a 1.8:1. Usar los tokens.
- **Dos familias de tamaño** (definidas en `@theme`, `globals.css`):
  - **Lectura, fluida con `clamp()`** (crece con la pantalla, como la landing de Grupo Cumulus):
    - `text-body` (16 → 18 px): párrafos y viñetas.
    - `text-lead` (17 → 20 px): entradillas del hero y del contacto.
    - `text-meta` (14 → 15 px): fechas, empresa y metadatos.
    - `text-section` (30 → 44 px): h2 de sección.
  - **Interfaz, fija:** `text-xs` = 13 px y `text-sm` = 15 px (sobrescritos). Para menú, botones y etiquetas. No subirla: el menú en español deja de caber a 1024 px.
  - **Todo texto que se lee va en `text-body`/`text-lead`**, nunca en `text-sm`. Mínimo en el sitio: 12 px (`text-[12px]`, solo etiquetas mono).
- **Ancho de línea:** los párrafos llevan `max-w-[60ch]`–`[75ch]` aunque el contenedor sea más ancho (medido: ~55 caracteres por línea).
- **Espacio:**
  - Aire de sección: `section-y` (`@utility`, `clamp(56px, 7vw, 104px)` por lado), no `py-24 md:py-32`.
  - `Container`: `md` = 1120 px y `lg` = 1280 px con margen fluido `clamp(20px, 4vw, 40px)` (contenido de hasta 1200 px). El header usa el mismo ancho y margen para quedar alineado.
- **Medido contra la landing (2026-11-18), texto de lectura:** 16.1 px en celular, 17.6 px a 1280 y 18 px a 1920 (antes 15.1 px fijo, 91 % bajo 16 px). Aire por sección: 108 px en celular y 158 px en escritorio (antes 168 y 216).

## Color y paletas

Todos los colores salen de **un solo tono** (`--hue`) en **OKLCH** (`app/globals.css`), como la landing de Grupo Cumulus: fondos, bandas, tinta, texto secundario, bordes, acento, brillos, cuadrícula y partículas. OKLCH mantiene la luminosidad al cambiar de tono, así que el contraste se conserva en todas las paletas.

- **Paletas:** `<html data-palette="…">`. Sin atributo = azul (255), `violet` 292, `teal` 195, `pink` 350, `amber` 70, `neutral` (`--k: 0`, quita el croma: grises).
  - Turquesa oscurece su acento (`--accent-l`): al recortarse a sRGB el texto blanco del botón bajaba a 4.0:1.
- **Papeles del color:**
  - `accent` → fondos y botones; texto encima en `text-on-accent`.
  - `accent-fg` → acento como texto.
  - `accent-glow` y `accent-deep` → brillos y degradados.
  - `ink` e `ink-deep` → bloques oscuros teñidos del color.
  - `success` (verde menta, fijo en todas las paletas) → estados: "disponible", puesto actual. Texto en `text-success-fg`.
  - `--blob-a` y `--blob-b` → manchas de luz. Usar `radial-gradient(circle closest-side, …)` para que no se vea el borde del disco.
- **Bloques de tinta en ambos temas:** Contact (`surface-ink`) y el footer (`surface-ink bg-ink-deep`). `.surface-ink` reusa los tokens del tema oscuro dentro del tema claro; su regla de fondo vive en `@layer components` para que `bg-*` la pueda cambiar.
- **Prohibido escribir colores a mano** (`hsl(213 …)`, `#hex`, `emerald-500`) en componentes: no cambiarían con la paleta. Para transparencias del acento: `color-mix(in oklch, var(--color-accent) N%, transparent)` o `bg-accent/N`. Única excepción: `opengraph-image.tsx` (imagen estática, azul).
- **Auditoría (2026-11-18): 0 textos bajo WCAG AA en las 6 paletas × 2 temas.** El script convierte los colores computados (oklch/color-mix) a sRGB pintándolos en un canvas. Los auditores que solo leen `rgb()` se saltan esos textos sin avisar: así pasaron sin detectarse los números decorativos de Approach (1.2:1, ahora `aria-hidden`).

## Cristal (Liquid Glass) y selector de color

Estilo general en ambos temas, a partir del Liquid Glass de Apple (iOS 26) y su ajuste de iOS 27 (WWDC 2026): un deslizante para elegir qué tan transparente u opaco se ve el cristal. Utilidades en `globals.css`:

- **`glass`** → capa flotante: píldora del header (ambos headers), botones secundarios del hero, botones de Contact, la etiqueta Destacado y el botón de subir.
- **`glass-panel`** → tarjetas de contenido: Work, Experience, Approach, Research y Testimonials. Es más ligero, para que se vea el color de atrás.
  - Detrás de Work y Approach van `<AmbientBlobs>` (manchas de luz con parallax, en `-z-10`), para que el cristal tenga color que mostrar.
- **`glass-menu`** → menús que se abren desde el header (selector de color). **Es opaco:** un `backdrop-filter` dentro de otro (la píldora del header) solo desenfoca lo que hay dentro del padre, así que el texto del hero se veía nítido detrás del menú. Incluso con 98 % de opacidad se notaba (~1.15:1 sobre fondo oscuro).
- **El material:**
  - Tinte de la paleta con `--glass-opacity` (0.35 a 0.9, 0.6 por defecto), más desenfoque y saturación del fondo.
  - Brillo especular: sombra interna arriba y un reflejo diagonal.
- **Safari:** no resuelve variables dentro de `-webkit-backdrop-filter`, así que se usan valores literales.
- **No hay refracción real** (filtro SVG): solo funciona en Chromium y cuesta en el scroll.
- **Formas de cápsula** (`rounded-full`) en controles y botones, y `rounded-3xl` en paneles, como en iOS.
- **No combinar** `glass`/`glass-panel` con `border-border`, `bg-*` ni estilos `backgroundColor`: el cristal ya define borde y fondo.

**Selector de color** (`components/primitives/PalettePicker.tsx`): va junto a EN/ES en ambos headers.

- **Contenido:** 6 muestras (radiogroup: flechas, Enter y Espacio) y el deslizante de cristal. Escape o clic fuera cierran y devuelven el foco al botón.
- **Dónde vive:**
  - `lib/palette-config.ts`: datos y script de arranque, sin React (lo importa el layout de servidor).
  - `lib/palette.ts`: tienda sobre localStorage con `useSyncExternalStore` (como `i18n.tsx`). Claves: `portfolio-palette` y `portfolio-glass`.
- **Sin destello del azul:** `PALETTE_BOOT_SCRIPT` va en el `<head>` (`layout.tsx`) y aplica `data-palette` y `--glass-opacity` antes del primer pintado (verificado: antes de `DOMContentLoaded`). El servidor siempre pinta azul.
- Next no deja importar un módulo con `useSyncExternalStore` desde un componente de servidor, aunque sea para una constante. Por eso el archivo está separado en dos.
- **Auditoría (2026-11-18):** 0 fallas WCAG AA en las 6 paletas × 2 temas con el cristal por defecto, y también con el cristal en su punto más transparente (0.35).
  - El turquesa necesitó oscurecer su acento (`--accent-l`, `--accent-l-light`) y su texto de acento en claro (`--accent-fg-l-light`).

## Separadores por tono

Las secciones no llevan líneas (`border-y`, `hr`): alternan fondo (`bg-background`) y banda (`bg-band`), y la cinta de tecnologías y el footer van en `bg-band-deep`. Orden: Hero · About (banda) · Work · Skills (banda) · Experience · Research (banda) · Approach · Testimonials (banda) · Contact · footer (profundo). Al agregar una sección, respetar la alternancia. Las bandas tapan la cuadrícula de puntos y las partículas (fijas en `z-0`, debajo de `<main>` en `z-10`); el footer va `relative z-10` por lo mismo.

## Sistema de animaciones

### Regla base: el contenido llega visible en el HTML
Nada de contenido puede renderizarse con `opacity:0` en el HTML del servidor (antes 98 elementos lo hacían: la página salía negra sin JS y el LCP en celular era de ~3.9 s). Por eso:

- **Al cargar (hero y headers): animaciones CSS** (`.enter-rise`, `.enter-down` en `globals.css`). Arrancan en cuanto llega el HTML, sin esperar a React. El hero pasa recorrido y retraso por variables (`--enter-y`, `--enter-scale`, `--enter-delay`, `--enter-duration`, `--enter-opacity`).
- **LCP:** Chrome no registra el LCP de un texto que empieza en `opacity: 0` y solo anima la opacidad (no lo vuelve a pintar). El párrafo del hero (el texto más grande) arranca en `--enter-opacity: 0.2`. Medido en celular simulado con CPU 4×: LCP ~0.6 s (antes ~3.9 s).
- **Al hacer scroll: `useScrollReveal`** (usado por `FadeIn`, `ScrollReveal`, `Skills`, `Research`). El elemento se renderiza con `initial={false}` y sin `animate` → visible. En el navegador, el primer aviso del IntersectionObserver decide: si alguna parte ya está en pantalla se queda como vino (sin parpadeo); si no, pasa a `"hidden"` al instante (`instantHidden`) y se anima a `"visible"` al entrar (umbral 15 %, margen inferior −8 %, una vez). Con reduced motion nunca se oculta.
- **Por qué declarativo (`animate={state}`) y no `useAnimation().set()`:** al hidratar, Framer v12 conecta los controls después de que corre el efecto del padre y `set` no se aplicaba (verificado).
- Los hijos con `variants` heredan `"hidden"`/`"visible"` (cascada de Research y Skills).
- Ya no existe `PageReveal` / `usePageReady` (la cortina de 560 ms que retrasaba todo).

### Language toggle
`LanguageTransition` usa `key={language}` dentro de `AnimatePresence mode="wait"`. Cambiar idioma remonta todo el tree: lo que está en pantalla queda visible y lo de abajo se vuelve a armar para revelarse.

La transición anima **solo `opacity`**. Un `transform` (p. ej. `y`) en ese `motion.div` lo convierte en containing block de todos los descendientes `position: fixed` (header, `DustField`, dot-grid, `SectionProgress`, `BackToTop`) y los hace saltar durante la transición.

### DustField
Partículas de fondo (`components/primitives/DustField.tsx`) creadas imperativamente en `useEffect`. Con `prefers-reduced-motion` se renderizan estáticas (sin `animation`), no se ocultan.

### Header
Nav de escritorio visible desde `lg` (1024px); debajo usa hamburguesa. En `md` los labels en español no caben.

### Hero
Entrada con CSS (ver "Regla base"). `useMounted` solo se usa para no aplicar reduced motion al título rotativo antes de hidratar.

### Reduced motion en animaciones CSS
Para animaciones CSS infinitas usar clases `motion-reduce:` de Tailwind (p. ej. `animate-[spin-cw_9s_linear_infinite] motion-reduce:animate-none`) en lugar de gatear con `useReducedMotion`: el server siempre ve `false` y causaría hydration mismatch.

### Variantes disponibles (`lib/motion.ts`)
`fadeUp`, `fadeLeft`, `fadeRight`, `zoomIn`, `cardReveal` (= zoomIn), `fadeIn`, `heroSequence(index)`, `alternateReveal(index)` (columna izquierda desde la izquierda, derecha desde la derecha).

Recorridos y curva iguales a la landing de Grupo Cumulus: subir 80 px, laterales ±160 px, zoom desde 0.8; transform 1.2 s con `revealEase` y opacidad 0.9 s.

- **`withDelay(variants, s)`** para escalonar: el `transition` de la variante tiene prioridad sobre la prop `transition` del componente y no se mezclan, así que `transition={{ delay }}` en el componente no retrasa nada.
- Los laterales necesitan `overflow-x-clip` en `<main>` (ya está). En `<body>` no sirve: el navegador lo pasa a la ventana y no recorta igual (medido: 127 px de desborde en celular).

### Parallax
`<Parallax factor photo>`: mide el padre (no a sí mismo) y se limita a ±160 px, o al 7 % del alto del marco si es `photo`, que además va con `scale(1.15)` para que no se vean bordes. Con reduced motion no se registra.

### Scroll suavizado y anclas
Lenis 1.3.27 respeta `scroll-margin-top`: el espacio para el header fijo lo da `scroll-mt-20` en cada sección (`SectionWrapper` ya lo pone). No volver a pasar `offset: -80` (se suman y la sección queda a 160 px).
