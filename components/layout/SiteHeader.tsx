"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { useMounted } from "@/hooks/useMounted"
import { ThemeToggle } from "@/components/primitives/ThemeToggle"
import { LanguageToggle } from "@/components/primitives/LanguageToggle"

// ── Nav config ───────────────────────────────────────────────────────────────
const NAV_LABELS = {
  en: ["Home", "About", "Work", "Skills", "Experience", "Research", "Contact"],
  es: ["Inicio", "Sobre mí", "Proyectos", "Skills", "Experiencia", "Research", "Contacto"],
} as const

const NAV_LINKS = [
  { href: "/#hero",       section: "hero"       },
  { href: "/#about",      section: "about"      },
  { href: "/#work",       section: "work"       },
  { href: "/#skills",     section: "skills"     },
  { href: "/#experience", section: "experience" },
  { href: "/#research",   section: "research"   },
  { href: "/#contact",    section: "contact"    },
] as const

// ── Logo ─────────────────────────────────────────────────────────────────────
function BracketLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="text-sm font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors shrink-0"
    >
      Luis Sosa
    </Link>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function SiteHeader() {
  const { language } = useLanguage()
  const mounted = useMounted()
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.section)

    const update = () => {
      const threshold = window.scrollY + window.innerHeight * 0.45
      let current = "hero"
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= threshold) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* ── Floating pill ─────────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-4 inset-x-0 z-50 px-4 md:px-6"
        initial={{ opacity: 0, y: -28 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -28 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto">
        <div
          className={cn(
            "rounded-2xl border border-border shadow-lg backdrop-blur-md transition-shadow duration-300",
            open && "rounded-b-none border-b-0"
          )}
          style={{ background: "var(--nav-bg)" }}
        >
          <div className="flex h-12 items-center justify-between px-4 md:px-5">

            {/* Logo */}
            <BracketLogo onClick={() => setOpen(false)} />

            {/* Desktop nav — centered via flex-1 */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-0.5">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.section
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-1.5 rounded-2xl text-sm transition-colors duration-150",
                      isActive ? "text-foreground font-semibold" : "text-muted hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: "var(--nav-active-bg)",
                          border: "1.5px solid var(--color-accent)",
                          boxShadow: "var(--nav-active-shadow)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{NAV_LABELS[language][i]}</span>
                  </a>
                )
              })}
            </nav>

            {/* Right — toggles + CV + hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageToggle />
              <ThemeToggle />
              {/* Hamburger — mobile only */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

          </div>

          {/* ── Mobile menu — drops inline from the pill ─────────────────── */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden md:hidden border-t border-border"
              >
                <nav className="flex flex-col px-4 py-3 gap-0.5">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = activeSection === link.section
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.14, delay: i * 0.03 }}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "relative px-3 py-2.5 rounded-2xl text-sm transition-colors duration-150",
                          isActive ? "text-foreground font-semibold" : "text-muted hover:text-foreground"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-highlight"
                            className="absolute inset-0 rounded-2xl bg-accent/[0.22] border border-accent/30"
                            style={{ boxShadow: "0 0 10px -5px var(--color-accent)" }}
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{NAV_LABELS[language][i]}</span>
                      </motion.a>
                    )
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rounded bottom corners when mobile menu is open */}
        {open && (
          <div className="rounded-b-2xl border-x border-b border-border backdrop-blur-md -mt-px h-2" style={{ background: "var(--nav-bg)" }} />
        )}
        </div>{/* /max-w-6xl */}
      </motion.header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-background/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
