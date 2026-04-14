import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { AccentLink } from "@/components/primitives/AccentLink"
import { FadeIn } from "@/components/primitives/FadeIn"
import { StaggerList } from "@/components/primitives/StaggerList"
import { research } from "@/lib/data/research"

export function Research() {
  return (
    <SectionWrapper id="research">
      <FadeIn>
        <SectionLabel>Published Research</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Academic work
        </h2>
      </FadeIn>

      <StaggerList className="mt-12 flex flex-col divide-y divide-border">
        {research.map((entry) => (
          <FadeIn
            key={entry.title}
            asChild
            className="py-8 first:pt-0 last:pb-0 grid md:grid-cols-[120px_1fr_auto] gap-4 md:gap-8 items-start group"
          >
            {/* Year + venue */}
            <div className="flex md:flex-col gap-3 md:gap-1.5">
              <span className="text-sm font-medium text-foreground tabular-nums">
                {entry.year}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20 w-fit">
                {entry.venue}
              </span>
            </div>

            {/* Title + abstract + tags */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base md:text-lg font-medium text-foreground leading-snug tracking-tight">
                {entry.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                {entry.abstract}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Topics">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-xs font-mono text-muted bg-surface-2 border border-border"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="md:pt-1">
              <AccentLink href={entry.url} external>
                View publication
              </AccentLink>
            </div>
          </FadeIn>
        ))}
      </StaggerList>
    </SectionWrapper>
  )
}
