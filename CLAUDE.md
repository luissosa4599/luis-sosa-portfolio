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
- **Scroll suave:** Lenis (`lerp: 0.08`, sin wrapper personalizado — usa el scroll nativo de window)
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
    SmoothScroll.tsx        — Inicializa Lenis en useEffect, solo passthrough en render. Intercepta clicks en links #hash
    SkipLink.tsx            — "Saltar al contenido"; mueve el foco a #main manualmente porque Lenis intercepta el hash
    SiteHeader.tsx
    SiteFooter.tsx
  primitives/
    FadeIn.tsx       — Entrada al hacer scroll con dirección. Usa useScrollReveal (llega visible en el HTML)
    ScrollReveal.tsx — Igual que FadeIn pero acepta cualquier tag HTML y variantes propias
    ThemedImage.tsx  — Par de screenshots dark/light con next/image (lazy: solo se descarga la del tema activo)
  sections/
    Hero.tsx        — Entrada con CSS (.enter-rise); solo el título rotativo usa Framer
    About.tsx, Skills.tsx, Experience.tsx, Projects.tsx, Research.tsx, Approach.tsx, Contact.tsx
hooks/
  useMounted.ts       — Retorna true después de 2 requestAnimationFrame (garantiza hidratación)
  useScrollReveal.ts  — Revelado al hacer scroll sin ocultar nada en el HTML del servidor (+ instantHidden)
  useReducedMotion.ts — Wrapper de useReducedMotion de Framer Motion
lib/
  motion.ts        — Variantes de Framer Motion: fadeUp, fadeLeft, fadeRight, fadeIn, cardReveal, heroSequence, etc.
  i18n.tsx         — LanguageProvider y useLanguage. Store sobre localStorage vía useSyncExternalStore (server snapshot "en" → sin hydration mismatch). Sincroniza <html lang>
  language.ts      — Constante LANGUAGE_STORAGE_KEY y tipo Language
  site.ts          — SITE_URL, base de metadata, robots y sitemap. Hoy es la URL de Vercel (ver docs/dominio-propio.md)
```

## Legibilidad (contraste y tamaños)

Auditado con WCAG AA en ambos temas (2026-11-18): **0 textos bajo 4.5:1** (antes 103 en oscuro y 111 en claro). Al tocar colores o fondos, mantenerlo:

- **Azul como texto = `text-accent-fg`**, nunca `text-accent`. `--color-accent` es para fondos, botones, puntos y bordes (texto blanco encima: 5.1:1). `--color-accent-fg` cambia por tema (`--accent-fg` en `:root` / `.light`).
- **`--muted-2`** (metadatos, etiquetas): 58 % en oscuro y 42 % en claro, calculado contra el peor fondo (`surface-2`, badges, botones y bandas). No volver a aclararlo.
- **Nada de colores fijos pensados solo para oscuro** (p. ej. `hsl(213 90% 70%)` inline): en claro bajaban a 1.8:1. Usar los tokens.
- **Escala de texto:** `text-xs` = 13 px y `text-sm` = 15 px (sobrescritos en `@theme`). Mínimo en el sitio: 12 px (`text-[12px]`, solo en etiquetas mono). No usar 10–11 px.

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
`fadeUp`, `fadeLeft`, `fadeRight`, `fadeIn`, `cardReveal`, `heroSequence(index)`
