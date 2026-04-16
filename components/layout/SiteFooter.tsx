import { Container } from "./Container"
import { contact } from "@/lib/data/contact"

const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: contact.github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: contact.linkedin,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    external: false,
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Luis Sosa
          </p>

          <nav className="flex items-center gap-5" aria-label="Footer links">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
