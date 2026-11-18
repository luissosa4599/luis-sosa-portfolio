import type { SimpleIcon } from "simple-icons"
import {
  siAngular, siReact, siNextdotjs, siTypescript, siKotlin, siFlutter,
  siNodedotjs, siSpringboot, siPostgresql, siApachekafka, siDocker, siGooglecloud,
} from "simple-icons"

// Stack principal (subconjunto de Skills). Decorativa: el detalle completo está en Skills.
// .NET va sin ícono: el de simple-icons ya es el texto ".NET" y se leía doble.
const STACK: { label: string; icon?: SimpleIcon }[] = [
  { label: "Angular", icon: siAngular },
  { label: "React", icon: siReact },
  { label: "Next.js", icon: siNextdotjs },
  { label: "TypeScript", icon: siTypescript },
  { label: ".NET" },
  { label: ".NET MAUI" },
  { label: "React Native", icon: siReact },
  { label: "Kotlin", icon: siKotlin },
  { label: "Flutter", icon: siFlutter },
  { label: "Node.js", icon: siNodedotjs },
  { label: "Spring Boot", icon: siSpringboot },
  { label: "PostgreSQL", icon: siPostgresql },
  { label: "Apache Kafka", icon: siApachekafka },
  { label: "Docker", icon: siDocker },
  { label: "Google Cloud", icon: siGooglecloud },
]

// Cada grupo repite el stack 2 veces (~4,800 px) para cubrir pantallas anchas sin hueco.
// Si se quitan tecnologías, comprobar que un grupo siga siendo más ancho que la pantalla.
const GROUP = [...STACK, ...STACK]

/**
 * Cinta de tecnologías entre el hero y About (como la cinta de giros de la landing de Grupo
 * Cumulus). Componente de servidor: cero JS; la animación es CSS (.marquee-track en
 * globals.css), se pausa con hover y se detiene con "reducir movimiento".
 */
export function TechMarquee() {
  return (
    <div aria-hidden className="marquee bg-band-deep overflow-hidden py-5 select-none">
      <div className="marquee-track flex w-max">
        {[0, 1].map((group) => (
          <ul key={group} className="flex shrink-0 items-center gap-12 pr-12">
            {GROUP.map((tech, i) => (
              <li
                key={`${tech.label}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-lg font-medium text-muted"
              >
                {tech.icon && (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current opacity-80">
                    <path d={tech.icon.path} />
                  </svg>
                )}
                {tech.label}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
