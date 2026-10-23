import { profile } from '@/content/profile'
import { SplitText } from '@/components/scroll/SplitText'

export function Colophon() {
  return (
    <section id="contact" className="panel colophon t-blue" data-panel data-label="Contact" data-folio="End">
      <div className="frame colophon__inner">
        <header className="case__head label" data-reveal>
          <span>Get in touch</span>
          <span>End of portfolio</span>
        </header>
        <SplitText text="Let's talk." className="colophon__title" />
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
          <span>Set in Inter Tight &amp; JetBrains Mono</span>
          <span>Built with Next.js &amp; GSAP</span>
        </footer>
      </div>
    </section>
  )
}
