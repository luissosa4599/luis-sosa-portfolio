import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { SectionLabel } from "@/components/primitives/SectionLabel"
import { FadeIn } from "@/components/primitives/FadeIn"
import { StaggerList } from "@/components/primitives/StaggerList"
import { approach } from "@/lib/data/approach"

export function Approach() {
  return (
    <SectionWrapper id="approach">
      <FadeIn>
        <SectionLabel>Approach</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          How I work
        </h2>
      </FadeIn>

      <StaggerList className="mt-12 flex flex-col divide-y divide-border">
        {approach.map((principle) => (
          <FadeIn
            key={principle.index}
            asChild
            className="py-8 first:pt-0 last:pb-0 grid md:grid-cols-[80px_1fr] gap-4 md:gap-12 items-start"
          >
            {/* Index */}
            <span className="text-sm font-mono text-muted/50 pt-0.5 select-none">
              {principle.index}
            </span>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {principle.heading}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-xl">
                {principle.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </StaggerList>
    </SectionWrapper>
  )
}
