import { ScrubWords } from '@/components/scroll/SplitText'

const principles = [
  { n: '01', title: 'Architecture over syntax', body: 'Placeholder. Languages change every few years; the shape of a good system does not.' },
  { n: '02', title: 'Value over velocity', body: 'Placeholder. Shipping fast only matters when what ships moves a number someone cares about.' },
  { n: '03', title: 'Pipelines over heroics', body: 'Placeholder. The best release is the boring one, repeated a thousand times.' },
]

export function Manifesto() {
  return (
    <section id="note" className="section theme-dial">
      <div className="frame">
        <header className="kicker-row" data-reveal>
          <span>Editor&rsquo;s note</span>
          <span>p. 03</span>
        </header>
        <ScrubWords
          className="manifesto__text"
          text="I don't collect frameworks. I design systems that move money, survive bad connections and let teams ship without stepping on each other. This issue is a tour of those movements — how they were built, and what they were worth."
        />
        <p className="manifesto__sign" data-reveal>
          — J.R.
        </p>
        <div className="principles">
          {principles.map((p) => (
            <article key={p.n} className="principle" data-reveal>
              <span className="principle__n">{p.n}</span>
              <h3 className="principle__title">{p.title}</h3>
              <p className="principle__body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
