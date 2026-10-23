import type { Skill } from '@/content/skills'

/** Full-bleed, single-colour opener for a skill. */
export function Separator({ skill: s, folio }: { skill: Skill; folio: string }) {
  return (
    <section
      id={s.id}
      className={`panel separator t-${s.colour}`}
      data-panel
      data-label={s.label}
      data-folio={folio}
    >
      <div className="separator__top">
        <span className="label">{s.n}</span>
        <span className="label">Skill</span>
        <span className="label">
          {s.cases.length} {s.cases.length === 1 ? 'case' : 'cases'}
        </span>
      </div>

      <h2 className="separator__title" data-split aria-label={s.label}>
        {s.title.map((line, i) => (
          <span key={line} className="separator__line" data-drift={i % 2 ? -5 : 5}>
            <span className="split-mask" aria-hidden>
              <span className="split-word">{line}</span>
            </span>
          </span>
        ))}
      </h2>

      <div className="separator__foot">
        <span className="dashes" aria-hidden>
          <i />
          <i />
          <i className="dashes__long" />
          <i />
        </span>
        <p className="separator__line-text">
          {s.line}
        </p>
        <ul className="separator__cases">
          {s.cases.map((c) => (
            <li key={c.id}>{c.company}</li>
          ))}
        </ul>
      </div>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
