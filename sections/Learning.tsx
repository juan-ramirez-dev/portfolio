import { getContent } from '@/content'
import { localize, type Locale } from '@/content/i18n'
import { chaptersOf, courses, learningPath } from '@/content/learning'
import { SplitText } from '@/components/scroll/SplitText'
import { asset } from '@/lib/asset'

/** Courses taken: a page on the home after the side projects, and the section's own index. */
export function Learning({ lang, page = false }: { lang: Locale; page?: boolean }) {
  const { ui } = getContent(lang)
  const l = ui.learning
  return (
    <section id="learning" className="panel learning t-red" data-panel data-label={l.label} data-folio="—">
      <div className="frame">
        <header className="case__head label" data-reveal>
          <span>
            {courses.length} {courses.length === 1 ? l.course : l.courses}
          </span>
          <span>{l.notes}</span>
        </header>
        <SplitText as={page ? 'h1' : 'h2'} text={l.title} className="projects__title" />
        <p className="learning__line" data-reveal>
          {l.line}
        </p>
        <ul className="ledger" data-reveal>
          {courses.map((course) => {
            const chapters = chaptersOf(course)
            const latest = chapters.at(-1)
            return (
              <li key={course.id}>
                <a className="ledger__row" href={asset(learningPath(lang, course))}>
                  <span className="ledger__n">{course.name}</span>
                  <span className="ledger__company">{localize(course.title, lang)}</span>
                  <span className="ledger__built">
                    {latest &&
                      `${l.latest}: ${l.week} ${latest.n} · ${localize(latest.cover.title, lang).join(' ')}`}
                  </span>
                  <span className="ledger__years">
                    {chapters.length} / {course.weeks.length} {l.published}
                  </span>
                  <span className="ledger__arrow" aria-hidden>
                    →
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
        {!page && (
          <a className="learning__all label" href={asset(learningPath(lang))} data-reveal>
            {l.all} →
          </a>
        )}
      </div>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
