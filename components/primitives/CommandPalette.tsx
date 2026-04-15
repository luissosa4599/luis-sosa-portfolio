"use client"

import { useEffect, useState, useCallback } from "react"
import { Command } from "cmdk"
import { AnimatePresence, motion } from "framer-motion"
import {
  House,
  BookOpen,
  Briefcase,
  Compass,
  Mail,
  Copy,
  Check,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Inline brand SVGs — avoids a dependency on a separate icon package
// ---------------------------------------------------------------------------

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { id: "home", label: "Home", anchor: "hero", icon: House },
  { id: "research", label: "Research", anchor: "research", icon: BookOpen },
  { id: "work", label: "Work", anchor: "work", icon: Briefcase },
  { id: "approach", label: "Approach", anchor: "approach", icon: Compass },
  { id: "contact", label: "Contact", anchor: "contact", icon: Mail },
] as const

const LINK_ITEMS = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/luissosa4599",
    icon: GitHubIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com/in/luissosa4599",
    icon: LinkedInIcon,
  },
] as const

const EMAIL = "luissosa4599@gmail.com"

// ---------------------------------------------------------------------------
// Shared class strings
// ---------------------------------------------------------------------------

const GROUP_CLS =
  "[&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:text-muted [&>[cmdk-group-heading]]:uppercase [&>[cmdk-group-heading]]:tracking-wider [&>[cmdk-group-heading]]:font-medium [&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:select-none"

const ITEM_CLS =
  "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-foreground hover:bg-surface-2 data-[selected=true]:bg-surface-2 data-[selected=true]:text-accent outline-none transition-colors"

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Cmd+K / Ctrl+K toggle; Escape close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const scrollTo = useCallback(
    (anchor: string) => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" })
      close()
    },
    [close]
  )

  const openLink = useCallback(
    (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer")
      close()
    },
    [close]
  )

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — silently ignore
    }
    close()
  }, [close])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
            <motion.div
              key="cmd-panel"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0, 0, 0.2, 1] }}
              className="pointer-events-auto w-full max-w-[520px]"
            >
              <Command
                loop
                label="Command palette"
                className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
              >
                {/* Search input */}
                <div className="flex items-center border-b border-border px-3">
                  <Command.Input
                    autoFocus
                    placeholder="Search..."
                    className="w-full bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted outline-none ring-0 border-0 focus:ring-0 focus:outline-none"
                  />
                </div>

                <Command.List className="max-h-[360px] overflow-y-auto overscroll-contain p-1.5">
                  <Command.Empty className="py-8 text-center text-sm text-muted select-none">
                    No results found.
                  </Command.Empty>

                  {/* Navigate group */}
                  <Command.Group heading="Navigate" className={GROUP_CLS}>
                    {NAV_ITEMS.map(({ id, label, anchor, icon: Icon }) => (
                      <Command.Item
                        key={id}
                        value={label}
                        onSelect={() => scrollTo(anchor)}
                        className={ITEM_CLS}
                      >
                        <Icon size={15} className="shrink-0 text-muted" />
                        {label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Separator className="my-1 h-px bg-border mx-2" />

                  {/* Links group */}
                  <Command.Group heading="Links" className={GROUP_CLS}>
                    {LINK_ITEMS.map(({ id, label, url, icon: Icon }) => (
                      <Command.Item
                        key={id}
                        value={label}
                        onSelect={() => openLink(url)}
                        className={ITEM_CLS}
                      >
                        <span className="shrink-0 text-muted">
                          <Icon size={15} />
                        </span>
                        {label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Separator className="my-1 h-px bg-border mx-2" />

                  {/* Actions group */}
                  <Command.Group heading="Actions" className={GROUP_CLS}>
                    <Command.Item
                      value="copy email"
                      onSelect={copyEmail}
                      className={ITEM_CLS}
                    >
                      {copied ? (
                        <Check size={15} className="shrink-0 text-accent" />
                      ) : (
                        <Copy size={15} className="shrink-0 text-muted" />
                      )}
                      {copied ? "Copied!" : "Copy email"}
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                {/* Footer hint */}
                <div className="flex items-center justify-end gap-3 border-t border-border px-3 py-2">
                  <span className="text-xs text-muted select-none">
                    <kbd className="inline-flex items-center rounded border border-border px-1 py-0.5 font-mono text-[10px]">
                      ↑↓
                    </kbd>{" "}
                    navigate
                  </span>
                  <span className="text-xs text-muted select-none">
                    <kbd className="inline-flex items-center rounded border border-border px-1 py-0.5 font-mono text-[10px]">
                      ↵
                    </kbd>{" "}
                    select
                  </span>
                  <span className="text-xs text-muted select-none">
                    <kbd className="inline-flex items-center rounded border border-border px-1 py-0.5 font-mono text-[10px]">
                      Esc
                    </kbd>{" "}
                    close
                  </span>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
