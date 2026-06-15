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
  layout.tsx       — Root layout: ThemeProvider > LanguageProvider > LanguageTransition > SmoothScroll
  page.tsx         — Server Component. Renderiza PageReveal + todas las secciones
  globals.css      — Incluye @keyframes overlay-out para el overlay de entrada
components/
  layout/
    LanguageTransition.tsx  — AnimatePresence mode="wait", key={language}, remonta el tree al cambiar idioma
    SmoothScroll.tsx        — Inicializa Lenis en useEffect, solo passthrough en render
    SiteHeader.tsx
    SiteFooter.tsx
  primitives/
    FadeIn.tsx       — Animación de entrada con dirección. Usa useAnimation() + controls.start()
    ScrollReveal.tsx — Igual que FadeIn pero acepta cualquier tag HTML
    StaggerList.tsx  — Contenedor para animar hijos en cascada
    PageReveal.tsx   — Overlay de entrada + PageReadyProvider
  sections/
    Hero.tsx        — Usa useMounted (2 rAFs) en vez de usePageReady
    About.tsx, Skills.tsx, Experience.tsx, Projects.tsx, Research.tsx, Approach.tsx, Contact.tsx
hooks/
  useMounted.ts       — Retorna true después de 2 requestAnimationFrame (garantiza hidratación)
  useReducedMotion.ts — Wrapper de useReducedMotion de Framer Motion
lib/
  page-ready.tsx   — PageReadyProvider + usePageReady. Controla cuándo arrancan las animaciones
  motion.ts        — Variantes de Framer Motion: fadeUp, fadeLeft, fadeRight, fadeIn, cardReveal, staggerContainer, etc.
  i18n.tsx         — LanguageProvider y useLanguage. Inicia en "en" para evitar hydration mismatch; lee localStorage en useEffect
  language.ts      — Constante LANGUAGE_STORAGE_KEY y tipo Language
```

## Sistema de animaciones

### Flujo de primer carga
1. `PageReadyProvider` monta con `ready = false` y `hasBeenReady = false` (flag de módulo)
2. `setTimeout(560ms)` dispara → `hasBeenReady = true`, `ready = true`
3. `PageRevealOverlay` cubre la página con un div fixed (CSS: `overlay-out` 0.5s ease-out 0.05s both) y se elimina del DOM cuando `ready = true`
4. `FadeIn` / `ScrollReveal` / `StaggerList` usan `useAnimation()` + `useEffect([inView, ready])` → `controls.start("visible")` cuando ambos son true

### Por qué `useAnimation()` y no `animate={inView && ready}`
En Framer Motion v12 + SSR, cuando `initial="hidden"` y `animate="hidden"` coinciden en el primer render (porque `ready=false`), FM puede no armar su sistema de animación. Cuando `ready` cambia a `true`, a veces no detecta el cambio de prop. `controls.start()` es imperativo y siempre dispara la animación.

### Language toggle
`LanguageTransition` usa `key={language}` dentro de `AnimatePresence mode="wait"`. Cambiar idioma remonta todo el tree. Como `hasBeenReady = true` después del primer ciclo, el nuevo `PageReadyProvider` arranca con `ready = true` y las animaciones se ejecutan en el siguiente frame.

### Hero
`Hero.tsx` no usa `usePageReady`. Usa `useMounted` (2 rAFs, ~32ms) para garantizar que el browser haya pintado un frame antes de arrancar sus animaciones.

### Variantes disponibles (`lib/motion.ts`)
`fadeUp`, `fadeLeft`, `fadeRight`, `fadeIn`, `cardReveal`, `wordReveal`, `wordContainer`, `staggerContainer(stagger, delay)`, `heroSequence(index)`
