import { projects } from '@/content/projects'
import { SplitText } from '@/components/scroll/SplitText'

/** Side projects and open source: one page, after the career index. */
export function Projects() {
  return (
    <section id="projects" className="panel projects t-yellow" data-panel data-label="Side projects" data-folio="—">
      <div className="frame">
        <header className="case__head label" data-reveal>
          <span>{projects.length} projects</span>
          <span>Built on my own time</span>
        </header>
        <SplitText text="On the side." className="projects__title" />
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
