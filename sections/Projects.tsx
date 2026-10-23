import { getContent } from '@/content'
import type { Locale } from '@/content/i18n'
import { SplitText } from '@/components/scroll/SplitText'

/** Side projects and open source: one page, after the career index. */
export function Projects({ lang }: { lang: Locale }) {
  const { projects, ui } = getContent(lang)
  return (
    <section id="projects" className="panel projects t-yellow" data-panel data-label={ui.projects.label} data-folio="—">
      <div className="frame">
        <header className="case__head label" data-reveal>
          <span>
            {projects.length} {ui.projects.count}
          </span>
          <span>{ui.projects.own}</span>
        </header>
        <SplitText text={ui.projects.title} className="projects__title" />
        <ul className="projects__grid">
          {projects.map((p) => (
            <li key={p.name} data-reveal>
              <a className="project" href={p.href} target="_blank" rel="noreferrer">
                <span className="project__kind label">{p.kind}</span>
                <span className="project__name">
                  {p.name} <span aria-hidden>↗</span>
                </span>
                <span className="project__line">{p.line}</span>
                <span className="project__stack label">{p.stack.join(' / ')}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
