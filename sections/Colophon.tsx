import { getContent } from '@/content'
import type { Locale } from '@/content/i18n'
import { SplitText } from '@/components/scroll/SplitText'

export function Colophon({ lang }: { lang: Locale }) {
  const { profile, ui } = getContent(lang)
  return (
    <section id="contact" className="panel colophon t-blue" data-panel data-label={ui.contact.label} data-folio={ui.contact.folio}>
      <div className="frame colophon__inner">
        <header className="case__head label" data-reveal>
          <span>{ui.contact.touch}</span>
          <span>{ui.contact.end}</span>
        </header>
        <SplitText text={ui.contact.title} className="colophon__title" />
        <p className="colophon__availability" data-reveal>
          {profile.availability}
        </p>
        <div className="colophon__body">
          <a className="colophon__mail" href={`mailto:${profile.email}`} data-reveal>
            {profile.email}
          </a>
          <ul className="colophon__links" data-reveal>
            {profile.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer className="colophon__foot label">
          <span>© 2026 {profile.name}</span>
          <span>{ui.contact.type}</span>
          <span>{ui.contact.built}</span>
        </footer>
      </div>
    </section>
  )
}
