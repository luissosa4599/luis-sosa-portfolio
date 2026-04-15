"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, BookOpen, Briefcase, Compass, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/primitives/ThemeToggle"
import { Container } from "./Container"

const NAV_LINKS = [
  { label: "Research", href: "#research", icon: BookOpen },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "Approach", href: "#approach", icon: Compass },
  { label: "Contact", href: "#contact", icon: Mail },
]

function BracketLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="font-mono text-sm font-semibold tracking-tight group"
    >
      <span className="text-accent">&lt;</span>
      <span className="text-foreground group-hover:text-foreground/80 transition-colors px-px">LS</span>
      <span className="text-accent">/&gt;</span>
    </Link>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Scroll border + active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1))

    const update = () => {
      setScrolled(window.scrollY > 16)

      // The section whose top edge is within the upper 45% of the viewport is active
      const threshold = window.scrollY + window.innerHeight * 0.45
      let current = ""
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

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "bg-background/90 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <Container>
          <div className="flex h-14 items-center justify-between">
            <BracketLogo onClick={() => setOpen(false)} />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all duration-200",
                      isActive
                        ? "text-accent bg-accent/[0.08]"
                        : "text-muted hover:text-foreground hover:bg-surface"
                    )}
                    style={
                      isActive
                        ? { boxShadow: "0 0 14px hsl(213 90% 53% / 0.22)" }
                        : undefined
                    }
                  >
                    <link.icon
                      size={13}
                      className={cn("shrink-0 transition-opacity duration-200", isActive ? "opacity-100" : "opacity-60")}
                    />
                    {link.label}
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* Hamburger — mobile only */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-muted hover:text-foreground transition-colors"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0, 0, 0.2, 1] }}
            className="fixed inset-x-0 top-14 z-40 md:hidden bg-background/95 backdrop-blur-sm border-b border-border"
          >
            <Container>
              <nav className="flex flex-col py-6 gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: i * 0.04 }}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 text-2xl font-medium tracking-tight py-3 border-b border-border last:border-0 transition-colors duration-150",
                        isActive ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      <link.icon
                        size={20}
                        className={cn("shrink-0", isActive ? "text-accent" : "text-accent/60")}
                      />
                      {link.label}
                    </motion.a>
                  )
                })}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden bg-background/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
