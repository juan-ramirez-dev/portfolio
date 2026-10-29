'use client'

import { useEffect, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { prefersReducedMotion } from '@/lib/gsap'
import { Lab } from './Lab'

const copy = {
  title: { en: 'Peel the layers', es: 'Pela las capas' },
  hint: {
    en: 'Every layer does the same job as the one above, with more detail and less help.',
    es: 'Cada capa hace el mismo trabajo que la de arriba, con más detalle y menos ayuda.',
  },
  down: { en: 'One layer down', es: 'Bajar una capa' },
  top: { en: 'Back to the top', es: 'Volver arriba' },
}

const LAYERS = [
  { name: { en: 'Python', es: 'Python' }, code: 'print("hello, world")', who: { en: 'You write this.', es: 'Esto lo escribes tú.' } },
  {
    name: { en: 'C', es: 'C' },
    code: 'printf("hello, world\\n");',
    who: { en: 'Python itself is written in C.', es: 'Python mismo está escrito en C.' },
  },
  {
    name: { en: 'Machine code', es: 'Código máquina' },
    code: '01111111 01000101 01001100 01000110 …',
    who: { en: 'A compiler turns C into this.', es: 'Un compilador convierte C en esto.' },
  },
  {
    name: { en: 'Transistors', es: 'Transistores' },
    code: '',
    who: { en: 'Billions of switches, on or off.', es: 'Miles de millones de interruptores, prendidos o apagados.' },
  },
]

const SWITCHES = 24
// a fixed first pattern, so the server and the browser draw the same thing
const SEED = Array.from({ length: SWITCHES }, (_, i) => (i * 7) % 3 === 0)

export function AbstractionStack({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const layers = localize(LAYERS, lang)
  const [depth, setDepth] = useState(0)
  const [switches, setSwitches] = useState(SEED)
  const bottom = depth === layers.length - 1

  useEffect(() => {
    if (!bottom || prefersReducedMotion()) return
    const id = window.setInterval(() => setSwitches((sw) => sw.map(() => Math.random() > 0.55)), 180)
    return () => window.clearInterval(id)
  }, [bottom])

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <ol className="stack">
        {layers.slice(0, depth + 1).map((l, i) => (
          <li key={l.name} className="stack__layer" data-current={i === depth || undefined}>
            <span className="stack__n label">{String(i + 1).padStart(2, '0')}</span>
            <span className="stack__name">{l.name}</span>
            {l.code ? (
              <code className="stack__code">{l.code}</code>
            ) : (
              <span className="stack__switches" aria-hidden>
                {switches.map((on, j) => (
                  <span key={j} className="bulb" data-on={on || undefined} />
                ))}
              </span>
            )}
            <span className="stack__who">{l.who}</span>
          </li>
        ))}
      </ol>

      <div className="lab__btns">
        <button type="button" className="lab__btn lab__btn--solid" onClick={() => setDepth(bottom ? 0 : depth + 1)}>
          {bottom ? t.top : t.down}
        </button>
      </div>
    </Lab>
  )
}
