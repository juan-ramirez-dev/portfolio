import type { Chapter as ChapterData } from '@/content/chapters'
import { SplitText } from '@/components/scroll/SplitText'
import { ArchDiagram } from '@/components/diagrams/ArchDiagram'
import { Pipeline } from '@/components/diagrams/Pipeline'

type Props = { chapter: ChapterData; number: number; theme: 'dial' | 'bezel' }

const parts = ['The problem', 'The architecture', 'The delivery', 'The impact']

export function Chapter({ chapter: c, number, theme }: Props) {
  return (
    <section id={c.id} className={`chapter theme-${theme}`}>
      <header className="chapter__cover frame">
        <div className="chapter__numeral" aria-hidden>
          <span data-parallax="0.25">{c.roman}</span>
        </div>
        <div className="kicker-row" data-reveal>
          <span>
            Chapter {c.roman} — {c.calibre}
          </span>
          <span>
            {c.company} · {c.years}
          </span>
        </div>
        <SplitText text={c.title} emphasis={c.emphasis} className="chapter__title" />
        <div className="chapter__cover-foot">
          <p className="chapter__kicker" data-reveal>
            {c.kicker}
          </p>
          <dl className="specs" data-reveal>
            <div className="specs__head">Specifications</div>
            {c.specs.map((s) => (
              <div key={s.label} className="specs__row">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="chapter__body frame">
        <aside className="chapter__aside">
          <div className="chapter__aside-inner">
            <p className="chapter__aside-roman">{c.roman}</p>
            <p className="chapter__aside-role">{c.role}</p>
            <p className="chapter__aside-meta">
              {c.company}
              <br />
              {c.years}
            </p>
            <ol className="chapter__toc">
              {parts.map((p, i) => (
                <li key={p}>
                  <span>{String(i + 1).padStart(2, '0')}</span> {p}
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="chapter__content">
          <article className="chapter__part">
            <h3 className="part-title" data-reveal>
              <span>01</span> The problem
            </h3>
            <p className="dropcap" data-reveal>
              {c.problem}
            </p>
            <blockquote className="pullquote" data-reveal>
              <p>{c.pullQuote}</p>
            </blockquote>
          </article>

          <article className="chapter__part">
            <h3 className="part-title" data-reveal>
              <span>02</span> The architecture
            </h3>
            <ArchDiagram
              nodes={c.diagram.nodes}
              edges={c.diagram.edges}
              figure={`${number}.1`}
              caption={c.diagram.caption}
            />
          </article>

          <article className="chapter__part">
            <h3 className="part-title" data-reveal>
              <span>03</span> The delivery
            </h3>
            <Pipeline steps={c.pipeline} figure={`${number}.2`} />
          </article>

          <article className="chapter__part">
            <h3 className="part-title" data-reveal>
              <span>04</span> The impact
            </h3>
            <div className="metrics">
              {c.metrics.map((m) => (
                <div key={m.label} className="metric" data-reveal>
                  <p className="metric__value">
                    {m.prefix}
                    <span data-countup={m.value} data-decimals={m.decimals ?? 0}>
                      {m.value.toFixed(m.decimals ?? 0)}
                    </span>
                    <span className="metric__suffix">{m.suffix}</span>
                  </p>
                  <p className="metric__label">{m.label}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
