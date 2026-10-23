'use client'

import { getContent } from '@/content'
import type { Locale } from '@/content/i18n'
import { skillOf } from '@/content/skills'
import { SplitText } from '@/components/scroll/SplitText'
import { scrollToId } from '@/components/scroll/SmoothScroll'

export function Ledger({ lang }: { lang: Locale }) {
  const { career, ui } = getContent(lang)
  return (
    <section id="index" className="panel index t-paper" data-panel data-label={ui.index.label} data-folio="—">
      <div className="frame">
        <header className="case__head label" data-reveal>
          <span>
            {career.length} {ui.index.roles}
          </span>
          <span>{ui.index.where}</span>
        </header>
        <SplitText text={ui.index.title} className="index__title" />
        <ol className="ledger">
          {career.map((job, i) => {
            const n = String(i + 1).padStart(2, '0')
            const cells = (
              <>
                <span className="ledger__n">
                  <i className="contents__swatch" aria-hidden />
                  {n}
                </span>
                <span className="ledger__company">
                  {job.company}
                  <span className="ledger__role label">{job.role}</span>
                </span>
                <span className="ledger__built">{job.built}</span>
                <span className="ledger__years">{job.years}</span>
                <span className="ledger__arrow" aria-hidden>
                  {job.caseId ? '→' : ''}
                </span>
              </>
            )
            return (
              <li key={job.company} className={job.caseId ? `a-${skillOf(job.caseId).colour}` : 'ledger__plain'} data-reveal>
                {job.caseId ? (
                  <a
                    href={`#${job.caseId}`}
                    className="ledger__row"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(job.caseId!)
                    }}
                  >
                    {cells}
                  </a>
                ) : (
                  <div className="ledger__row">{cells}</div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
