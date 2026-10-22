'use client'

import { profile } from '@/content/profile'
import { chapters } from '@/content/chapters'
import { SplitText } from '@/components/scroll/SplitText'
import { scrollToId } from '@/components/scroll/SmoothScroll'

export function Ledger() {
  return (
    <section id="index" className="section theme-bezel">
      <div className="frame">
        <header className="kicker-row" data-reveal>
          <span>The index</span>
          <span>Where the work happened</span>
        </header>
        <SplitText text="Not logos. Movements." emphasis="Movements." className="section__title" />
        <p className="section__lede" data-reveal>
          Every company below, and the one thing I built there that still matters. Each line opens its chapter.
        </p>
        <ol className="ledger">
          {profile.ledger.map((row, i) => {
            const chapter = chapters.find((c) => c.id === row.chapter)
            return (
              <li key={row.company + i} data-reveal>
                <a
                  href={`#${row.chapter}`}
                  className="ledger__row"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(row.chapter)
                  }}
                >
                  <span className="ledger__n">{chapter?.roman}</span>
                  <span className="ledger__company">{row.company}</span>
                  <span className="ledger__built">{row.built}</span>
                  <span className="ledger__years">{row.years}</span>
                  <span className="ledger__arrow" aria-hidden>
                    →
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
