"use client"

import type { SimpleIcon } from "simple-icons"
import {
  siVuedotjs, siNuxt, siReact, siAngular, siNextdotjs,
  siTypescript, siJavascript, siHtml5, siCss, siTailwindcss,
  siNodedotjs, siPhp, siLaravel, siPython, siGo, siOpenjdk, siDotnet,
  siDocker, siMysql, siSqlite, siLinux, siGooglecloud,
  siGit, siGithub, siPostman,
} from "simple-icons"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/primitives/FadeIn"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"

// ── Icon renderer ────────────────────────────────────────────────────────────
function SkillIcon({ icon }: { icon: SimpleIcon }) {
  const hex = icon.hex
  // Luminance check — very dark icons get inverted in dark mode
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const isDark = luminance < 0.18

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("w-3 h-3 shrink-0", isDark && "dark:invert")}
      style={{ fill: `#${hex}` }}
    >
      <path d={icon.path} />
    </svg>
  )
}

// ── Skill data ───────────────────────────────────────────────────────────────
type SkillItem = { label: string; icon?: SimpleIcon }
type SkillGroup = {
  category: { en: string; es: string }
  items: SkillItem[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: { en: "Frontend", es: "Frontend" },
    items: [
      { label: "Vue.js",       icon: siVuedotjs    },
      { label: "Nuxt",         icon: siNuxt        },
      { label: "React",        icon: siReact       },
      { label: "Angular",      icon: siAngular     },
      { label: "Next.js",      icon: siNextdotjs   },
      { label: "TypeScript",   icon: siTypescript  },
      { label: "JavaScript",   icon: siJavascript  },
      { label: "HTML5",        icon: siHtml5       },
      { label: "CSS",          icon: siCss         },
      { label: "Tailwind CSS", icon: siTailwindcss },
    ],
  },
  {
    category: { en: "Backend", es: "Backend" },
    items: [
      { label: "Node.js", icon: siNodedotjs },
      { label: "PHP",     icon: siPhp       },
      { label: "Laravel", icon: siLaravel   },
      { label: "Python",  icon: siPython    },
      { label: "Go",      icon: siGo        },
      { label: "Java",    icon: siOpenjdk   },
      { label: ".NET · C#", icon: siDotnet  },
    ],
  },
  {
    category: { en: "Infrastructure", es: "Infraestructura" },
    items: [
      { label: "Docker",     icon: siDocker      },
      { label: "MySQL",      icon: siMysql       },
      { label: "SQL Server", icon: siSqlite      },
      { label: "Azure",                          },
      { label: "AWS",                            },
      { label: "Linux",      icon: siLinux       },
      { label: "GCP",        icon: siGooglecloud },
    ],
  },
  {
    category: { en: "Tools & Practices", es: "Herramientas y prácticas" },
    items: [
      { label: "Git",          icon: siGit     },
      { label: "GitHub",       icon: siGithub  },
      { label: "Postman",      icon: siPostman },
      { label: "Agile · Scrum"                 },
      { label: "REST APIs"                     },
      { label: "Code Review"                   },
    ],
  },
]

// ── Section ──────────────────────────────────────────────────────────────────
export function Skills() {
  const { language } = useLanguage()

  const copy = {
    en: {
      title: "Skills & Tools",
      subtitle: "Technologies I use daily — from frontend frameworks to backend services and infra.",
    },
    es: {
      title: "Skills & Herramientas",
      subtitle: "Tecnologías con las que trabajo a diario, desde frameworks frontend hasta backend e infraestructura.",
    },
  }[language]

  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        {/* Heading */}
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {copy.title}<span className="text-accent">.</span>
            </h2>
            <p className="mt-2 text-sm text-muted max-w-lg">{copy.subtitle}</p>
          </div>
        </FadeIn>

        {/* Skill groups — title above pills */}
        <div className="grid gap-10 sm:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <FadeIn key={group.category.en} delay={i * 0.07}>
              <div className="flex flex-col gap-3">
                {/* Category title */}
                <span className="font-mono text-xs uppercase tracking-widest text-muted-2">
                  {group.category[language]}
                </span>

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map(({ label, icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted hover:text-foreground hover:border-border-strong transition-colors duration-150"
                    >
                      {icon && <SkillIcon icon={icon} />}
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
