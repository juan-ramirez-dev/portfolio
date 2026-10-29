import { getContent } from '@/content'
import { HOME, localize, type Locale } from '@/content/i18n'
import { chaptersOf, learningPath, type Course } from '@/content/learning'
import { Animations } from '@/components/scroll/Animations'
import { Panels } from '@/components/scroll/Panels'
import { asset } from '@/lib/asset'
import { jsonLd } from '@/lib/metadata'
import { absolute } from '@/lib/site'

/** A course: its cover, then every week, written or still to come. */
export function CoursePage({ lang, course }: { lang: Locale; course: Course }) {
  const { ui, profile } = getContent(lang)
  const l = ui.learning
  const c = localize(course, lang)
  const chapters = chaptersOf(course)
  const progress = `${chapters.length} / ${course.weeks.length}`

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: c.seo.title,
    description: c.seo.description,
    inLanguage: lang,
    url: absolute(learningPath(lang, course)),
    author: { '@type': 'Person', name: profile.name, url: absolute(HOME[lang]) },
    about: {
      '@type': 'Course',
      name: c.title,
      url: course.url,
      provider: { '@type': 'CollegeOrUniversity', name: course.provider },
    },
    hasPart: chapters.map((ch) => ({
      '@type': 'Article',
      headline: localize(ch.seo.title, lang),
      url: absolute(learningPath(lang, course, ch)),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />

      <section id="cover" className={`panel separator t-${course.colour}`} data-panel data-label={course.name} data-folio={progress}>
        <div className="separator__top">
          <span className="label">{l.course}</span>
          <span className="label">{course.provider}</span>
          <span className="label">
            {progress} {l.published}
          </span>
        </div>

        <h1 className="separator__title" data-split aria-label={c.title}>
          <span className="separator__line" data-drift={5}>
            <span className="split-mask" aria-hidden>
              <span className="split-word">{course.name}</span>
            </span>
          </span>
        </h1>

        <div className="separator__foot">
          <span className="dashes" aria-hidden>
            <i />
            <i />
            <i className="dashes__long" />
            <i />
          </span>
          <p className="separator__line-text">{c.line}</p>
          <a className="separator__cases" href={course.url} target="_blank" rel="noreferrer">
            {l.official} ↗
          </a>
        </div>
        <div className="panel__shade" aria-hidden />
      </section>

      <section id="weeks" className="panel index t-paper" data-panel data-label={l.weeks} data-folio={progress}>
        <div className="frame">
          <header className="case__head label" data-reveal>
            <span>{l.weeks}</span>
            <span>{c.title}</span>
          </header>
          <h2 className="index__title" data-reveal>
            {l.weeks}.
          </h2>
          <ul className="ledger">
            {course.weeks.map((w) => {
              const row = (
                <>
                  <span className="ledger__n">{w.n}</span>
                  <span className="ledger__company">{localize(w.title, lang)}</span>
                  <span className="ledger__built">
                    {w.chapter ? localize(w.chapter.cover.title, lang).join(' ') : l.soon}
                  </span>
                  <span className="ledger__years">{w.chapter && `${w.chapter.parts.length} ${l.parts}`}</span>
                  <span className="ledger__arrow" aria-hidden>
                    {w.chapter && '→'}
                  </span>
                </>
              )
              return (
                <li key={w.n} className={w.chapter ? undefined : 'ledger__plain learning__soon'}>
                  {w.chapter ? (
                    <a className="ledger__row" href={asset(learningPath(lang, course, w.chapter))}>
                      {row}
                    </a>
                  ) : (
                    <div className="ledger__row">{row}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <Panels />
      <Animations />
    </>
  )
}
