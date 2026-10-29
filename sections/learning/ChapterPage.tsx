import { getContent } from '@/content'
import { HOME, localize, type Locale } from '@/content/i18n'
import { learningPath, type Chapter, type Course } from '@/content/learning'
import { Animations } from '@/components/scroll/Animations'
import { Panels } from '@/components/scroll/Panels'
import { SplitText } from '@/components/scroll/SplitText'
import { CopyForClaude } from '@/components/learning/CopyForClaude'
import { PartIndex } from '@/components/learning/PartIndex'
import { Rich } from '@/components/learning/Rich'
import { WordBulbs } from '@/components/learning/WordBulbs'
import { widgets } from '@/components/learning/widgets'
import { asset } from '@/lib/asset'
import { plainText } from '@/lib/learning/plainText'
import { jsonLd } from '@/lib/metadata'
import { absolute } from '@/lib/site'

const pad = (n: number) => String(n).padStart(2, '0')

/** A chapter: a cover, one stacked page per part (idea + something to touch), and a way out. */
export function ChapterPage({ lang, course, chapter }: { lang: Locale; course: Course; chapter: Chapter }) {
  const { ui, profile } = getContent(lang)
  const l = ui.learning
  const c = localize(course, lang)
  const ch = localize(chapter, lang)
  const total = pad(ch.parts.length)
  const copy = { prompt: l.prompt, keyIdea: l.keyIdea, week: l.week }
  const name = `${l.week} ${ch.n}`

  const weekIndex = course.weeks.findIndex((w) => w.chapter === chapter)
  const nextWeek = course.weeks[weekIndex + 1]
  const other: Locale = lang === 'en' ? 'es' : 'en'

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    headline: ch.seo.title,
    description: ch.seo.description,
    inLanguage: lang,
    url: absolute(learningPath(lang, course, chapter)),
    datePublished: chapter.published,
    author: { '@type': 'Person', name: profile.name, url: absolute(HOME[lang]) },
    learningResourceType: 'Summary',
    educationalLevel: 'Beginner',
    teaches: ch.parts.map((p) => p.title),
    isBasedOn: { '@type': 'CreativeWork', name: `${c.name} ${name}`, url: chapter.sources.week },
    about: {
      '@type': 'Course',
      name: c.title,
      url: course.url,
      provider: { '@type': 'CollegeOrUniversity', name: course.provider },
    },
    [lang === 'en' ? 'workTranslation' : 'translationOfWork']: {
      '@id': absolute(learningPath(other, course, chapter)),
    },
  }

  const sources = [
    { label: l.transcript, href: chapter.sources.transcript },
    { label: l.officialNotes, href: chapter.sources.notes },
    { label: l.video, href: chapter.sources.video },
    { label: l.official, href: chapter.sources.week },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />

      <section
        id="cover"
        className={`panel lesson-cover t-${chapter.colour}`}
        data-panel
        data-label={ch.cover.kicker}
        data-folio={`00 / ${total}`}
      >
        <div className="separator__top">
          <span className="label">{ch.cover.kicker}</span>
          <span className="label">{course.provider}</span>
          <span className="label">
            {ch.parts.length} {l.parts}
          </span>
        </div>

        <div className="lesson-cover__body">
          <h1 className="lesson-cover__title" data-split aria-label={`${c.name} ${name}: ${ch.cover.title.join(' ')}`}>
            {ch.cover.title.map((line, i) => (
              <span key={line} className="separator__line" data-drift={i % 2 ? -4 : 4}>
                <span className="split-mask" aria-hidden>
                  <span className="split-word">{line}</span>
                </span>
              </span>
            ))}
          </h1>
          {ch.cover.word && <WordBulbs word={ch.cover.word} />}
        </div>

        <div className="lesson-cover__foot">
          <div>
            <p className="lesson-cover__line">{ch.cover.line}</p>
            <p className="lesson-cover__intro">{ch.intro}</p>
          </div>
          <PartIndex label={l.contents} parts={ch.parts.map((p) => ({ id: p.id, title: p.title }))} />
        </div>
        <div className="panel__shade" aria-hidden />
      </section>

      {ch.parts.map((p, i) => {
        const Widget = p.widget ? widgets[p.widget] : undefined
        const n = pad(i + 1)
        return (
          <section
            key={p.id}
            id={p.id}
            className={`panel lesson t-${p.colour}`}
            data-panel
            data-label={`${n} · ${p.title}`}
            data-folio={`${n} / ${total}`}
          >
            <div className="frame lesson__frame">
              <header className="case__head label">
                <span>
                  {c.name} · {name}
                </span>
                <span>
                  {n} / {total}
                </span>
              </header>

              <div className="lesson__grid">
                <div className="lesson__text">
                  <span className="lesson__n" aria-hidden>
                    {n}
                  </span>
                  <h2 className="lesson__title">{p.title}</h2>
                  <p className="lesson__key">
                    <span className="label">{l.keyIdea}</span>
                    <Rich text={p.key} />
                  </p>
                  <ul className="lesson__points">
                    {p.points.map((pt, j) => (
                      <li key={j}>
                        <Rich text={pt} />
                      </li>
                    ))}
                  </ul>
                  <CopyForClaude
                    text={plainText(c, ch, copy, i + 1)}
                    label={l.copyPart}
                    done={l.copied}
                    className="lesson__copy label"
                  />
                </div>
                {Widget && (
                  <div className="lesson__lab" data-reveal>
                    <Widget lang={lang} />
                  </div>
                )}
              </div>
            </div>
            <div className="panel__shade" aria-hidden />
          </section>
        )
      })}

      <section id="end" className="panel t-blue" data-panel data-label={l.endLabel} data-folio={ui.contact.folio}>
        <div className="frame colophon__inner">
          <header className="case__head label" data-reveal>
            <span>{l.endLabel}</span>
            <span>
              {c.name} · {name}
            </span>
          </header>
          <SplitText text={l.endTitle} className="lesson-end__title" />
          <p className="colophon__availability" data-reveal>
            {l.endLine}
          </p>
          <div className="lesson-end__copy" data-reveal>
            <CopyForClaude text={plainText(c, ch, copy)} label={l.copyChapter} done={l.copied} className="lesson-end__btn" />
          </div>

          <div className="colophon__body">
            <div>
              <p className="label lesson-end__label">{l.sources}</p>
              <ul className="colophon__links lesson-end__sources">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <nav className="lesson-end__nav label">
              <a href={asset(learningPath(lang, course))}>← {l.allWeeks}</a>
              {nextWeek &&
                (nextWeek.chapter ? (
                  <a href={asset(learningPath(lang, course, nextWeek.chapter))}>
                    {l.next}: {l.week} {nextWeek.n} →
                  </a>
                ) : (
                  <span>
                    {l.next}: {l.week} {nextWeek.n} · {l.soon}
                  </span>
                ))}
            </nav>
          </div>
        </div>
      </section>

      <Panels />
      <Animations />
    </>
  )
}
