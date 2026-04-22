"use client"

import type { SimpleIcon } from "simple-icons"
import {
  siVuedotjs, siNuxt, siReact, siAngular, siNextdotjs,
  siTypescript, siJavascript, siHtml5, siCss, siTailwindcss,
  siNodedotjs, siPhp, siLaravel, siPython, siGo, siOpenjdk, siDotnet,
  siDocker, siMysql, siSqlite, siLinux, siGooglecloud,
  siGit, siGithub, siPostman,
} from "simple-icons"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/primitives/FadeIn"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"

// ── Animation variants ───────────────────────────────────────────────────────

/** Group wrapper: slides up as it enters view, then staggers its children */
const groupVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.04,
      delayChildren: 0.12,
    },
  },
}

/** Category label: slides in from the left */
const labelVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0, 0, 0.2, 1] } },
}

/** Pills row: passes "visible" down to stagger its children */
const pillsRowVariant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.038 } },
}

/** Individual pill: pops in with scale + lift */
const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.26, ease: [0, 0, 0.2, 1] } },
}

// ── Icon renderer ────────────────────────────────────────────────────────────
function SkillIcon({ icon }: { icon: SimpleIcon }) {
  const hex = icon.hex
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const isDark = luminance < 0.18

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("w-4 h-4 shrink-0", isDark && "dark:invert")}
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
      { label: "Node.js",    icon: siNodedotjs },
      { label: "PHP",        icon: siPhp       },
      { label: "Laravel",    icon: siLaravel   },
      { label: "Python",     icon: siPython    },
      { label: "Go",         icon: siGo        },
      { label: "Java",       icon: siOpenjdk   },
      { label: ".NET · C#",  icon: siDotnet    },
    ],
  },
  {
    category: { en: "Infrastructure", es: "Infraestructura" },
    items: [
      { label: "Docker",     icon: siDocker      },
      { label: "MySQL",      icon: siMysql       },
      { label: "SQL Server", icon: siSqlite      },
      { label: "Azure"                           },
      { label: "AWS"                             },
      { label: "Linux",      icon: siLinux       },
      { label: "GCP",        icon: siGooglecloud },
    ],
  },
  {
    category: { en: "Tools & Practices", es: "Herramientas y prácticas" },
    items: [
      { label: "Git",           icon: siGit     },
      { label: "GitHub",        icon: siGithub  },
      { label: "Postman",       icon: siPostman },
      { label: "Agile · Scrum"                  },
      { label: "REST APIs"                      },
      { label: "Code Review"                    },
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
      subtitle: "Tecnologías que uso en el día a día, desde frameworks de frontend hasta backend e infraestructura.",
    },
  }[language]

  return (
    <section id="skills" className="py-24 md:py-32 scroll-mt-20">
      <Container size="md">
        {/* Heading */}
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {copy.title}<span className="text-accent">.</span>
            </h2>
            <p className="mt-2 text-sm text-muted max-w-lg">{copy.subtitle}</p>
          </div>
        </FadeIn>

        {/* Skill groups */}
        <div className="flex flex-col gap-8">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.category.en}
              variants={groupVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="w-full flex flex-col gap-4"
            >
              {/* Category label */}
              <motion.span
                variants={labelVariant}
                className="font-mono text-xs uppercase tracking-widest text-muted-2"
              >
                {group.category[language]}
              </motion.span>

              {/* Pills — nested stagger */}
              <motion.div variants={pillsRowVariant} className="flex flex-wrap gap-2.5">
                {group.items.map(({ label, icon }) => (
                  <motion.span
                    key={label}
                    variants={pillVariant}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-mono text-muted hover:text-foreground hover:border-border-strong transition-colors duration-150 backdrop-blur-sm"
                    style={{ backgroundColor: "var(--badge-bg)" }}
                  >
                    {icon && <SkillIcon icon={icon} />}
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
