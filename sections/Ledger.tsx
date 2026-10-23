'use client'

import { skills } from '@/content/skills'
import { SplitText } from '@/components/scroll/SplitText'
import { scrollToId } from '@/components/scroll/SmoothScroll'

export function Ledger() {
  const rows = skills.flatMap((s) => s.cases.map((c) => ({ skill: s, case: c })))
  return (
    <section id="index" className="panel index t-paper" data-panel data-label="Index" data-folio="—">
      <div className="frame">
        <header className="case__head label" data-reveal>
          <span>{rows.length} cases</span>
          <span>Where the work happened</span>
        </header>
        <SplitText text="Where." className="index__title" />
        <ol className="ledger">
          {rows.map(({ skill, case: c }) => (
            <li key={c.id} className={`a-${skill.colour}`} data-reveal>
              <a
                href={`#${c.id}`}
                className="ledger__row"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(c.id)
                }}
              >
                <span className="ledger__n">
                  <i className="contents__swatch" aria-hidden />
                  {skill.n}
                </span>
                <span className="ledger__company">{c.company}</span>
                <span className="ledger__built">{c.title}</span>
                <span className="ledger__years">{c.years}</span>
                <span className="ledger__arrow" aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
