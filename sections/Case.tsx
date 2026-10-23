import type { Case as CaseData } from '@/content/cases'
import type { Skill } from '@/content/skills'
import { SplitText } from '@/components/scroll/SplitText'
import { ArchDiagram } from '@/components/diagrams/ArchDiagram'
import { Pipeline } from '@/components/diagrams/Pipeline'

type Props = { data: CaseData; skill: Skill; number: number; folio: string }

export function Case({ data: c, skill, number, folio }: Props) {
  return (
    <section
      id={c.id}
      className={`panel case t-${skill.page} a-${skill.accent}`}
      data-panel
      data-label={skill.label}
      data-folio={folio}
    >
      <div className="frame">
        <header className="case__head label" data-reveal>
          <span>
            {skill.n}.{number} — {c.company}
          </span>
          <span>
            {c.role} · {c.years}
          </span>
        </header>

        <div className="case__intro">
          <SplitText text={c.title} className="case__title" />
          <div className="case__aside" data-reveal>
            <p className="case__kicker">{c.kicker}</p>
            <p className="case__stack label">{c.stack.join(' / ')}</p>
          </div>
        </div>

        <ArchDiagram
          nodes={c.diagram.nodes}
          edges={c.diagram.edges}
          story={c.diagram.story}
          figure={`${skill.n}.${number}.1`}
          caption={c.diagram.caption}
        />

        <div className="case__block">
          <p className="case__block-label label" data-reveal>
            Delivery
          </p>
          <Pipeline steps={c.pipeline} figure={`${skill.n}.${number}.2`} />
        </div>

        <div className="case__block">
          <p className="case__block-label label" data-reveal>
            Impact
          </p>
          <div className="metrics">
            {c.metrics.map((m) => (
              <div key={m.label} className="metric" data-reveal>
                <p className="metric__value">
                  {m.prefix}
                  <span data-countup={m.value} data-decimals={m.decimals ?? 0}>
                    {m.value.toFixed(m.decimals ?? 0)}
                  </span>
                  {m.suffix}
                </p>
                <p className="metric__label">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
