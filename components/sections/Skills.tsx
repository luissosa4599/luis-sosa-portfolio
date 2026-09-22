"use client"

import { useRef } from "react"
import type { SimpleIcon } from "simple-icons"
import {
  siVuedotjs, siNuxt, siReact, siAngular, siNextdotjs,
  siTypescript, siJavascript, siHtml5, siCss, siTailwindcss, siSass,
  siNodedotjs, siLaravel, siPython, siOpenjdk, siDotnet, siSpringboot,
  siDocker, siMysql, siPostgresql, siLinux, siApachekafka,
  siGit, siGithubactions, siGraphql, siJest, siJsonwebtokens,
  siReactquery, siExpo, siFlutter, siKotlin, siIos, siAndroid,
  siGooglecloud, siVercel,
} from "simple-icons"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/primitives/FadeIn"
import { Container } from "@/components/layout/Container"
import { useLanguage } from "@/lib/i18n"
import { usePageReady } from "@/lib/page-ready"

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
type SkillItem = { label: string; es?: string; icon?: SimpleIcon }
type SkillGroup = {
  category: { en: string; es: string }
  items: SkillItem[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: { en: "Frontend", es: "Frontend" },
    items: [
      { label: "Angular",          icon: siAngular     },
      { label: "React",            icon: siReact       },
      { label: "Next.js",          icon: siNextdotjs   },
      { label: "Vue.js",           icon: siVuedotjs    },
      { label: "Nuxt.js",          icon: siNuxt        },
      { label: "TypeScript",       icon: siTypescript  },
      { label: "JavaScript (ES6+)", icon: siJavascript },
      { label: "HTML5",            icon: siHtml5       },
      { label: "CSS3",             icon: siCss         },
      { label: "SCSS",             icon: siSass        },
      { label: "TailwindCSS",      icon: siTailwindcss },
      { label: "Kendo UI"                              },
      { label: "PrimeNG"                               },
      { label: "TanStack Query",   icon: siReactquery  },
      { label: "Zustand"                               },
      { label: "Vuex"                                  },
      { label: "Pinia"                                 },
    ],
  },
  {
    category: { en: "Backend & APIs", es: "Backend y APIs" },
    items: [
      { label: "ASP.NET Core",   icon: siDotnet     },
      { label: ".NET",           icon: siDotnet     },
      { label: "EF Core"                            },
      { label: "C#"                                 },
      { label: "Java",           icon: siOpenjdk    },
      { label: "Spring Boot",    icon: siSpringboot },
      { label: "Node.js",        icon: siNodedotjs  },
      { label: "Laravel (PHP)",  icon: siLaravel    },
      { label: "Python",         icon: siPython     },
      { label: "REST APIs"                          },
      { label: "GraphQL",        icon: siGraphql    },
    ],
  },
  {
    category: { en: "Mobile & Desktop", es: "Móvil y escritorio" },
    items: [
      { label: ".NET MAUI",           icon: siDotnet  },
      { label: "React Native (Expo)", icon: siExpo    },
      { label: "Flutter",             icon: siFlutter },
      { label: "Kotlin (Android)",    icon: siKotlin  },
      { label: "WPF"                                  },
      { label: "WCF"                                  },
      { label: "XAML/MVVM"                            },
      { label: "iOS",                 icon: siIos     },
      { label: "Android",             icon: siAndroid },
      { label: "BLE"                                  },
      { label: "QR/Camera Scanning", es: "Escaneo QR con cámara"                   },
    ],
  },
  {
    category: { en: "Architecture & Data", es: "Arquitectura y datos" },
    items: [
      { label: "Microservices", es: "Microservicios"                              },
      { label: "Event-Driven Architecture", es: "Arquitectura orientada a eventos"                  },
      { label: "Transactional Outbox"                       },
      { label: "Apache Kafka",  icon: siApachekafka         },
      { label: "SQL"                                        },
      { label: "PostgreSQL",    icon: siPostgresql          },
      { label: "Azure SQL"                                  },
      { label: "SQL Server"                                 },
      { label: "MySQL",         icon: siMysql               },
    ],
  },
  {
    category: { en: "Cloud & DevOps", es: "Cloud y DevOps" },
    items: [
      { label: "Microsoft Azure"                       },
      { label: "AWS"                                   },
      { label: "Google Cloud",   icon: siGooglecloud   },
      { label: "Docker",         icon: siDocker        },
      { label: "Git",            icon: siGit           },
      { label: "GitHub Actions", icon: siGithubactions },
      { label: "CI/CD"                                 },
      { label: "Linux",          icon: siLinux         },
      { label: "Vercel",         icon: siVercel        },
    ],
  },
  {
    category: { en: "Security & Testing", es: "Seguridad y pruebas" },
    items: [
      { label: "JWT",              icon: siJsonwebtokens },
      { label: "OAuth2/OIDC"                             },
      { label: "RSA/AES Encryption", es: "Cifrado RSA/AES"                      },
      { label: "SHA256withRSA Signatures", es: "Firmas SHA256withRSA"                },
      { label: "Azure Key Vault"                         },
      { label: "Managed Identity"                        },
      { label: "xUnit"                                   },
      { label: "Testcontainers"                          },
      { label: "Playwright"                              },
      { label: "Jest",             icon: siJest          },
    ],
  },
  {
    category: { en: "Practices", es: "Prácticas" },
    items: [
      { label: "Scrum"              },
      { label: "Agile"              },
      { label: "Pull Requests"      },
      { label: "Code Review"        },
      { label: "Continuous Delivery", es: "Entrega continua" },
    ],
  },
]

// ── Skill group item — own ref so useInView works inside a map ────────────────
type Language = "en" | "es"

function SkillGroupItem({
  group,
  language,
  ready,
}: {
  group: SkillGroup
  language: Language
  ready: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px" })

  return (
    <motion.div
      ref={ref}
      variants={groupVariant}
      initial="hidden"
      animate={inView && ready ? "visible" : "hidden"}
      className="w-full flex flex-col gap-4"
    >
      <motion.span
        variants={labelVariant}
        className="font-mono text-xs uppercase tracking-widest text-muted-2"
      >
        {group.category[language]}
      </motion.span>

      <motion.div variants={pillsRowVariant} className="flex flex-wrap gap-2.5">
        {group.items.map(({ label, es, icon }) => (
          <motion.span
            key={label}
            variants={pillVariant}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-mono text-muted hover:text-foreground hover:border-border-strong transition-colors duration-150 backdrop-blur-sm"
            style={{ backgroundColor: "var(--badge-bg)" }}
          >
            {icon && <SkillIcon icon={icon} />}
            {language === "es" && es ? es : label}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
export function Skills() {
  const { language } = useLanguage()
  const ready = usePageReady()

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
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {copy.title}<span className="text-accent">.</span>
            </h2>
            <p className="mt-2 text-sm text-muted max-w-lg">{copy.subtitle}</p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-8">
          {SKILL_GROUPS.map((group) => (
            <SkillGroupItem
              key={group.category.en}
              group={group}
              language={language}
              ready={ready}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
