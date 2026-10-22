import { profile } from '@/content/profile'
import { Watch } from '@/components/watch/Watch'
import { SplitText } from '@/components/scroll/SplitText'

export function Colophon() {
  return (
    <section id="colophon" className="colophon theme-bezel">
      <div className="frame colophon__inner">
        <header className="kicker-row" data-reveal>
          <span>Colophon</span>
          <span>End of issue</span>
        </header>
        <div className="colophon__grid">
          <div>
            <SplitText text="Let's build something that keeps time." emphasis="keeps time." className="colophon__title" />
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
          <div className="colophon__watch" data-reveal>
            <Watch hour={0} minute={0} liveSeconds date="12" label="Watch set to twelve o'clock" />
          </div>
        </div>
        <footer className="colophon__foot">
          <span>© 2026 {profile.name}</span>
          <span>Set in Bodoni Moda, Inter Tight &amp; JetBrains Mono</span>
          <span>Printed on the web</span>
        </footer>
      </div>
      <div className="colophon__wood" aria-hidden />
    </section>
  )
}
