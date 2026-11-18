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
- **Animaciones:** CSS scroll-driven (`animation-timeline`) para todo lo que se mueve con el scroll; Framer Motion v12 para la interfaz (header, panel de apariencia, título rotativo)
- **Scroll suave:** Lenis 1.3.27 (`lerp: 0.1`, `autoRaf`, sin wrapper personalizado — usa el scroll nativo de window)
- **i18n:** Sistema propio (EN/ES), sin librería externa

## Estructura de carpetas relevante
```
app/
  layout.tsx       — Root layout: ThemeProvider > LanguageProvider > SkipLink + (LanguageTransition > SmoothScroll)
  page.tsx         — Server Component. Renderiza todas las secciones. <main id="main"> es el destino del SkipLink
  work/[slug]/page.tsx — Case studies. Slugs y metadata salen de lib/data/projects.ts; dynamicParams=false → slug desconocido = 404
  robots.ts, sitemap.ts, opengraph-image.tsx — SEO. La OG es estática (sin edge runtime); en ImageResponse todo div con >1 hijo necesita display:flex
  globals.css      — Tokens, entradas CSS al cargar (.enter-rise, .enter-down) y escenas atadas al scroll (.scene-in, .scene-out, .parallax, .scroll-progress)
components/
  layout/
    LanguageTransition.tsx  — AnimatePresence mode="wait", key={language}, remonta el tree al cambiar idioma
    SmoothScroll.tsx        — Inicializa Lenis en useEffect, solo passthrough en render. Intercepta clicks en links #hash: los desliza y pasa el foco a la sección
    SkipLink.tsx            — "Saltar al contenido"; mueve el foco a #main manualmente porque Lenis intercepta el hash
    SiteHeader.tsx
    SiteFooter.tsx
  primitives/
    FadeIn.tsx       — Escena: un elemento que entra y sale atado al scroll (as, direction, stagger). CSS puro, sin JS
    ScrollReveal.tsx — Alias de FadeIn para tarjetas (la tarjeta de cristal ES la escena)
    SectionHeading.tsx — Título de sección con el formato único (título + punto de acento, subtítulo opcional); fijo arriba al recorrer la sección
    WordReveal.tsx   — Título que se enciende palabra por palabra (rama inmersivo)
    ThemedImage.tsx  — Par de screenshots dark/light con next/image (lazy: solo se descarga la del tema activo)
    Parallax.tsx     — Desplaza su contenido con el scroll (capturas de proyectos, brillo del hero). CSS view(), sin JS
    SectionProgress.tsx — Barra de lectura arriba. CSS scroll(root), sin JS
  sections/
    Hero.tsx        — Entrada con CSS (.enter-rise); solo el título rotativo usa Framer
    TechMarquee.tsx — Cinta de tecnologías entre el hero y About. Server component, animación CSS (.marquee-track)
    About.tsx, Skills.tsx, Experience.tsx, Projects.tsx, Research.tsx, Approach.tsx, Contact.tsx
hooks/
  useMounted.ts       — Retorna true después de 2 requestAnimationFrame (garantiza hidratación)
  useReducedMotion.ts — Wrapper de useReducedMotion de Framer Motion
lib/
  scene.ts         — Recorridos de entrada por dirección (sceneVars) y alternate(i) para cuadrículas
  motion.ts        — Curvas de Framer Motion que quedan (título rotativo, header)
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

## Cristal (Liquid Glass) y panel de apariencia

Estilo general en ambos temas, a partir del Liquid Glass de Apple (iOS 26) y su ajuste de iOS 27 (WWDC 2026): un deslizante para elegir qué tan transparente u opaco se ve el cristal. Utilidades en `globals.css`:

- **`glass`** → capa flotante: píldora del header (ambos headers), botones secundarios del hero, botones de Contact, la etiqueta Destacado y el botón de subir.
- **`glass-panel`** → tarjetas de contenido: Work, Experience, Approach, Research y Testimonials. Es más ligero, para que se vea el color de atrás.
  - Detrás de Work y Approach van `<AmbientBlobs>` (manchas de luz con parallax, en `-z-10`), para que el cristal tenga color que mostrar.
- **`glass-menu`** → menús que se abren desde el header (panel de apariencia). **Es opaco:** un `backdrop-filter` dentro de otro (la píldora del header) solo desenfoca lo que hay dentro del padre, así que el texto del hero se veía nítido detrás del menú. Incluso con 98 % de opacidad se notaba (~1.15:1 sobre fondo oscuro).
- **El material:**
  - Tinte de la paleta con `--glass-opacity` (0.35 a 0.9, 0.6 por defecto), más desenfoque y saturación del fondo.
  - Brillo especular: sombra interna arriba y un reflejo diagonal.
- **Safari:** no resuelve variables dentro de `-webkit-backdrop-filter`, así que se usan valores literales.
- **No hay refracción real** (filtro SVG): solo funciona en Chromium y cuesta en el scroll.
- **Formas de cápsula** (`rounded-full`) en controles y botones, y `rounded-3xl` en paneles, como en iOS.
- **No combinar** `glass`/`glass-panel` con `border-border`, `bg-*` ni estilos `backgroundColor`: el cristal ya define borde y fondo.

**Panel de apariencia** (`components/primitives/PalettePicker.tsx`): el botón con la muestra de color va junto a EN/ES en ambos headers. Es el único control de tema: el botón sol/luna (`ThemeToggle`) se quitó del header el 2026-11-18 y su archivo se borró.

- **Contenido, en este orden:**
  - **Tema:** Claro / Oscuro / Sistema (control segmentado; `setTheme` de next-themes). Sistema sigue al dispositivo y es el valor por defecto.
  - **Color:** 6 muestras.
  - **Cristal:** el deslizante de transparencia.
- **Accesibilidad:** tema y color son radiogroups (flechas, Enter y Espacio). Al abrir, el foco va al tema activo. Escape o clic fuera cierran y devuelven el foco al botón, cuyo `aria-label` dice paleta y tema ("Apariencia: Azul, sistema").
- **Dónde vive:**
  - `lib/palette-config.ts`: datos y script de arranque, sin React (lo importa el layout de servidor).
  - `lib/palette.ts`: tienda sobre localStorage con `useSyncExternalStore` (como `i18n.tsx`). Claves: `portfolio-palette` y `portfolio-glass`.
- **Sin destello del azul:** `PALETTE_BOOT_SCRIPT` va en el `<head>` (`layout.tsx`) y aplica `data-palette` y `--glass-opacity` antes del primer pintado (verificado: antes de `DOMContentLoaded`). El servidor siempre pinta azul.
- **Apariencia al azar y candado (2026-11-18):**
  - Con el candado abierto, cada recarga sortea paleta (las 6) y cristal (0.35–0.90 en pasos de 0.05). Lo hace `PALETTE_BOOT_SCRIPT` antes del primer pintado y lo guarda, para que el panel muestre lo que salió.
  - Claro/oscuro no se sortea: sigue al sistema o a lo elegido.
  - **Candado** (`portfolio-appearance-lock`, "1"/"0"): cerrado, se aplica lo guardado. Elegir color, cristal o tema a mano lo cierra solo (`setPalette`, `setGlass` y `chooseMode` llaman a `setLocked(true)`).
  - **🎲 Sortear** (`shuffleAppearance`): cambia al momento a otra paleta y otro cristal sin tocar el candado.
  - **Visitantes de antes del candado:** si hay paleta o cristal guardados y no hay candado, cuenta como elección suya y se cierra.
  - **Verificado:**
    - El arranque aplica lo mismo que queda guardado.
    - Con candado, las recargas se mantienen.
    - Sin errores de hidratación.
    - Contraste en 0 fallas también con el cristal al máximo (0.9).
- Next no deja importar un módulo con `useSyncExternalStore` desde un componente de servidor, aunque sea para una constante. Por eso el archivo está separado en dos.
- **Auditoría (2026-11-18):** 0 fallas WCAG AA en las 6 paletas × 2 temas con el cristal por defecto, y también con el cristal en su punto más transparente (0.35).
  - El turquesa necesitó oscurecer su acento (`--accent-l`, `--accent-l-light`) y su texto de acento en claro (`--accent-fg-l-light`).

## Separadores por tono

Las secciones no llevan líneas (`border-y`, `hr`): alternan fondo (`bg-background`) y banda (`bg-band`), y la cinta de tecnologías y el footer van en `bg-band-deep`. Orden: Hero · About (banda) · Work · Skills (banda) · Experience · Research (banda) · Approach · Testimonials (banda) · Contact · footer (profundo). Al agregar una sección, respetar la alternancia. Las bandas tapan la cuadrícula de puntos y las partículas (fijas en `z-0`, debajo de `<main>` en `z-10`); el footer va `relative z-10` por lo mismo.

## Sistema de animaciones

> **Rama `inmersivo` (2026-11-18): el movimiento no se limita con "reducir movimiento".** Decisión del usuario: verlo "en toda su expresión". `useReducedMotion` devuelve siempre `false`, el CSS no tiene bloques `prefers-reduced-motion`, no hay clases `motion-reduce:` y Lenis va con `respectReducedMotion: false`.
>
> La rama `base-4-escenas` (y `main`) sí lo respeta. Donde este documento dice que algo "queda quieto con reducir movimiento", eso aplica solo a esas ramas. Si esta rama se publica, valorar volver a respetarlo: afecta a personas con trastornos vestibulares (WCAG 2.3.3, nivel AAA).

### Regla base: el contenido llega visible en el HTML
Nada de contenido puede renderizarse con `opacity:0` en el HTML del servidor (antes 98 elementos lo hacían: la página salía negra sin JS y el LCP en celular era de ~3.9 s). Por eso:

- **Al cargar (hero y headers): animaciones CSS** (`.enter-rise`, `.enter-down` en `globals.css`). Arrancan en cuanto llega el HTML, sin esperar a React. El hero pasa recorrido y retraso por variables (`--enter-y`, `--enter-scale`, `--enter-delay`, `--enter-duration`, `--enter-opacity`). Van con `fill: backwards` (no `both`) para que se suelten al terminar; ver "Cristal y animaciones".
- **LCP:** Chrome no registra el LCP de un texto que empieza en `opacity: 0` y solo anima la opacidad (no lo vuelve a pintar). El párrafo del hero (el texto más grande) arranca en `--enter-opacity: 0.2`. Medido en celular simulado con CPU 4×: LCP ~0.6 s (antes ~3.9 s).
- **Al hacer scroll: escenas CSS atadas al scroll** (ver "Escenas" abajo). Son CSS puro: funcionan sin JS y antes de hidratar. Sin soporte, con "reducir movimiento" o al imprimir no se aplican y el contenido queda quieto y visible.
- Ya no existen `useScrollReveal`, `instantHidden`, `PageReveal` ni `lib/scroll-frame.ts`.

### Escenas: entrar y salir atado al scroll (2026-11-18)
Scroll-driven animations (`animation-timeline: view()`): la animación avanza y retrocede con el scroll, no se "dispara" una vez. Soporte: Chrome 115, Safari 26 y Firefox 159 (Baseline). Verificado en Chrome, WebKit 27.2 y Firefox 159 con los mismos valores.

- **Un solo elemento por escena** (`.scene`, que pone `FadeIn`/`ScrollReveal`): entra y sale en el mismo elemento.
  - Las dos animaciones no se pisan porque sus tramos nunca se cruzan.
  - La entrada se aplica antes y durante su tramo (`backwards`) y la salida durante y después del suyo (`forwards`). En reposo no queda ninguna aplicada.
  - `.scene-in` (solo entrada) queda para hijos en cascada dentro de una escena (la columna de Research).
- **Rangos medidos en `svh`, no en %**, para que un bloque alto entre al mismo ritmo que uno bajo:
  - **Entrada:** mientras el borde superior sube del fondo de la pantalla al 60 % (`--scene-in-len`).
  - **Salida:** mientras el borde inferior cruza el 30 % superior (`--scene-out-len`). Se mide desde el borde inferior para que una tarjeta alta no se desvanezca mientras se lee.
- **Direcciones** en `lib/scene.ts`: `up`, `left`, `right`, `zoom`, `pop` y `none`. Recorridos iguales a la landing de Grupo Cumulus (80 px, ±160 px, zoom desde 0.8). Van como variables `--in-x`, `--in-y` y `--in-s`.
- **Cascada con `stagger`** (`--i`): en una línea de tiempo de scroll no hay `delay`, así que cada paso retrasa el rango `--scene-step` (3 svh). Las pastillas de Skills usan un paso de 1.2 svh.
- **`overflow-clip`, nunca `overflow-hidden`, en un ancestro de algo animado:** `hidden` crea un contenedor de scroll y `view()` se mediría contra él (quieto). Ya están en clip Hero, Work (sección, tarjeta y marco de la captura), Research, Approach y Contact.
- **Cartas apiladas (Proyectos):** cada `.stack-item` es `sticky`, un escalón (`--stack-step`) más abajo que el anterior, y la siguiente tarjeta sube encima.
  - La pila declara `view-timeline: --stack`, y sus descendientes la usan sin `timeline-scope`. Mientras la pila cruza el borde superior (`exit-crossing`), la tarjeta i se encoge (hasta 1 − 0.05·rev) y se oscurece (`.stack-dim`) en su tramo [i/n, (n−1)/n].
  - `.stack::after` (30 svh) sostiene las tres apiladas antes de irse. Tiene que ser contenido, no `padding`: `sticky` se suelta cuando el borde del contenido del contenedor lo alcanza.
  - Las tarjetas son anchas (captura a la izquierda, texto a la derecha; en celular, una sobre otra).
  - Verificado igual en Chrome, WebKit y Firefox.

### Títulos de sección fijos (rama inmersivo, 2026-11-18)
**Formato único** (`SectionHeading`): título `text-section` con punto de acento, que se enciende palabra por palabra, y subtítulo opcional debajo. Sin etiquetas pequeñas encima: `SectionLabel` se eliminó.

Títulos actuales: Selected work · Skills & Tools · Experience · Research Papers · How I work · What people say · Let's build something useful (Contact, centrado, con el mismo punto). About no lleva título: es la tarjeta de perfil.

- **Fijo:** solo el título (una línea) se queda fijo debajo del header (`.section-head`, `top: --head-top` = 4.5rem) mientras se recorre la sección. El subtítulo se va con el contenido. En Approach no hace falta: su escenario entero ya es sticky (`sticky={false}`).
- **Franja:** una franja del color de la sección (`--section-bg`, prop `bg`) sube desde el borde de la pantalla y baja 2rem por debajo del título, desvaneciéndose ahí. Así el título siempre queda sobre fondo sólido y el contenido pasa por detrás. Si el degradado empezara dentro del título, el texto de abajo se asomaba detrás de su parte baja.
- **La franja aparece solo cuando el título ya está fijo:** la sección lleva `section-scope` (`view-timeline: --sec`) y la franja se enciende en `exit-crossing 0 → 4 %`.
- **Cartas apiladas:** `--stack-top` = header + una línea de título + 2rem, para que se fijen debajo del título (152 px en escritorio, 137 en celular).
- **Verificado:** título a 72 px en Chrome, WebKit y Firefox.

### Desarrollo: si un cambio de CSS no se ve
Turbopack guarda una caché persistente en `.next/dev`. El 2026-11-18 dejó de detectar cambios en `globals.css` y siguió sirviendo el CSS viejo, aun reiniciando `npm run dev` (los `.tsx` sí recompilaban). La compilación de producción sí lo tenía.

Solución: detener el servidor, borrar `.next/dev` y volver a arrancar. Para confirmar, buscar la regla nueva en el `.css` que sirve la página.

### Cristal y animaciones (importante)
Una animación de `opacity` (o `filter`, `clip-path`, `mask`) en un **ancestro** de un `.glass`/`.glass-panel` lo vuelve "backdrop root": el cristal solo desenfoca lo que hay dentro de ese ancestro, no lo de atrás. Pasa también en reposo:
- **Animaciones atadas al scroll:** siempre están enganchadas a su línea de tiempo.
- **Animaciones por tiempo con `fill: both`:** se quedan aplicadas al terminar.

Se detectó porque la tarjeta de arriba de la pila dejaba leer nítido el texto de la de abajo. El header y los botones del hero lo tenían roto desde que llegó el cristal; no se notaba porque detrás solo había fondos difusos.

Reglas:
- **La escena debe ser el propio elemento de cristal** (`<ScrollReveal as="article" className="glass-panel …">`), nunca un envoltorio. La animación en el propio elemento no afecta su desenfoque.
- Así quedaron Experience (la tarjeta, sin el punto), Testimonials (la `figure`), Contact (cada botón es su escena), los botones del hero (cada uno lleva `.hero-layer-body`), las pastillas de Skills y las tarjetas de Proyectos.
- **Animaciones por tiempo con `fill: backwards`** (`.enter-rise`, `.enter-down`): se sueltan al terminar y el estado final es el mismo.
- Animar `translate` o `scale` en un ancestro sí está bien (`.stack-card`, `.parallax`).
### Inmersivo (solo rama `inmersivo`)
- **Más amplitud:**
  - Recorridos de entrada 1.5× (`lib/scene.ts`: 120 px hacia arriba, ±240 px a los lados con giro de ±4°, zoom desde 0.7).
  - Salida a −96 px con escala 0.9.
  - Rangos de 45 svh (entrada) y 32 svh (salida).
  - Parallax de hasta 240 px; la foto se mueve 10 % con zoom 1.24.
- **Títulos palabra por palabra** (`components/primitives/WordReveal.tsx`):
  - Cada `.word` pasa de tenue, más baja y desenfocada a nítida mientras el título sube por la mitad inferior. `--w` desplaza el rango por palabra.
  - Se usa en Experience, Skills, Research, Approach, Testimonials y Contact.
  - Sigue siendo texto normal: spans en línea separados por espacios.
- **Skills:** cada grupo (etiqueta + pastillas) entra como un solo bloque desde el lado contrario al anterior (`alternate(index)`), sin giro.
  - No animar cada pastilla por separado: eran ~35 escenas a la vez, cada una con `backdrop-blur`, y el recorrido temblaba.
  - Las pastillas van sin desenfoque (la banda de fondo es sólida).
- **Research:**
  - El visual se ve también en celular, con tamaño fluido.
  - `.research-reticle` (anillo y marcas cardinales) gira de −140° a 140° mientras el visual cruza la pantalla.
  - Cada ícono llega orbitando alrededor del centro: `.orbit` gira una capa del tamaño del visual y `.orbit-counter` contragira para que el ícono quede derecho.
  - El desvanecido va en el propio ícono (`.orbit-badge`), porque tiene desenfoque (ver "Cristal y animaciones").
- **Approach, "reparto" (escena fija):**
  - `.approach-scene` mide 100svh + 4 × 45svh y su escenario es `sticky`.
  - Con `view-timeline: --approach` (el rango `contain` es justo lo que dura fijo), la tarjeta k llega desde `--dx`/`--dy`/`--dr` en el tramo [k × 22 %, k × 22 % + 18 %].
  - **Escritorio:** caen en la cuadrícula de 2×2.
  - **Debajo de `md`:** comparten la celda (`grid-area: 1 / 1`) y se apilan como un mazo; cada una se lee mientras está arriba.
  - **Sin soporte:** la sección queda alta con el escenario fijo y las tarjetas quietas.
- **Auditoría de contraste:** `contrast-all.mjs` apaga las animaciones con CSS para medir en reposo, porque ya no se congelan emulando "reducir movimiento". 0 fallas en 284 textos.
- **Verificado igual en Chrome 157, WebKit 27.2 y Firefox 159.**
- **Para probar:** poner un texto de color nítido detrás del cristal (fijo, `z-index: 0`). Si se lee, está roto; si sale como brillo, desenfoca. Compararlo contra fondos difusos (manchas de luz) no detecta el problema.
### Escenas especiales (CSS, en globals.css)
- **Telón del hero:**
  - En `app/page.tsx`, el hero es `sticky top-0` dentro de un envoltorio que termina después de About. La cinta y About van en un `relative z-10` encima y son opacos (`bg-band-deep`, `bg-band`).
  - Sus dos capas salen con `scroll(root)` separándose:
    - `.hero-layer-title` sube, crece a 1.14 y se desenfoca en 65 svh.
    - `.hero-layer-body` se hunde 10 svh y se desvanece en 35 svh.
  - Si el texto subiera, cruzaría el título rotativo.
  - En scroll 0 no aplican nada, así que el LCP no cambia: medido con A/B intercalado, el ruido del equipo es mayor que cualquier diferencia.
- **Línea de Experiencia:** `.timeline-fill` crece con `scale: 1 0 → 1` y su punta queda siempre al 60 % de la pantalla (rango `cover 40svh` → `cover calc(100% - 60svh)`). Cada `.timeline-dot` se prende (relleno, halo y escala 1.2) cuando la punta lo alcanza. Debajo queda un riel tenue (`bg-accent/15`).
- **Apertura de Contacto:** `.contact-open` lleva `clip-path` de `inset(7% 6% 0 round 3rem)` a `inset(0)` mientras el bloque sube. El `to` es explícito porque de `inset()` a `none` no se interpola.
- **Verificado en Chrome, WebKit 27.2 y Firefox 159** con los mismos valores.
- **Para probar:** Lenis reacciona a los `scrollTo` programados y mueve el scroll un poco después del salto. En las pruebas automatizadas, medir con `offsetTop` (sin transforms) y leer después de esperar.

### Language toggle
`LanguageTransition` usa `key={language}` dentro de `AnimatePresence mode="wait"`. Cambiar idioma remonta todo el tree: lo que está en pantalla queda visible y lo de abajo se vuelve a armar para revelarse.

La transición anima **solo `opacity`**. Un `transform` (p. ej. `y`) en ese `motion.div` lo convierte en containing block de todos los descendientes `position: fixed` (header, `DustField`, dot-grid, `SectionProgress`, `BackToTop`) y los hace saltar durante la transición.

### DustField
Partículas de fondo (`components/primitives/DustField.tsx`) creadas imperativamente en `useEffect`. Con `prefers-reduced-motion` se renderizan estáticas (sin `animation`), no se ocultan.

### Header
Nav de escritorio visible desde `lg` (1024px); debajo usa hamburguesa. En `md` los labels en español no caben.

### Hero
Entrada con CSS (ver "Regla base"). Es sticky y sale con el telón (ver "Escenas especiales"). `useMounted` solo se usa para no aplicar reduced motion al título rotativo antes de hidratar.

### Reduced motion en animaciones CSS
(En la rama `inmersivo` no aplica: ver la nota al inicio de esta sección.) Para animaciones CSS infinitas usar clases `motion-reduce:` de Tailwind (p. ej. `animate-[spin-cw_9s_linear_infinite] motion-reduce:animate-none`) en lugar de gatear con `useReducedMotion`: el server siempre ve `false` y causaría hydration mismatch.

- Los laterales (±160 px) necesitan `overflow-x-clip` en `<main>` (ya está). En `<body>` no sirve: el navegador lo pasa a la ventana y no recorta igual (medido: 127 px de desborde en celular).

### Parallax
`<Parallax factor photo>`: CSS `view()` sobre el rango `cover`, de −d a +d mientras cruza la pantalla, con d = min(160 px, |factor| × 450 px). Con `photo`, d es el 7 % del alto y la imagen va con `scale: 1.15` para que no se vean bordes. `view()` mide la posición de layout (sin transforms), así que no se retroalimenta con su propio `translate`.

### Scroll suavizado y anclas
Lenis 1.3.27 respeta `scroll-margin-top`: el espacio para el header fijo lo da `scroll-mt-20` en cada sección (`SectionWrapper` ya lo pone). No volver a pasar `offset: -80` (se suman y la sección queda a 160 px).
