'use client'

import { useEffect, useRef, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { prefersReducedMotion } from '@/lib/gsap'
import { Lab, formatNumber } from './Lab'

const SIZES = [1000, 2000, 1_000_000]

const copy = {
  title: { en: 'Three ways to find a name', es: 'Tres formas de encontrar un nombre' },
  hint: {
    en: 'All three get there. Switch to 2,000 pages: splitting in half needs just one more step.',
    es: 'Los tres llegan. Cambia a 2.000 páginas: partir a la mitad solo necesita un paso más.',
  },
  pages: { en: 'pages', es: 'páginas' },
  page: { en: 'page', es: 'página' },
  steps: { en: 'steps', es: 'pasos' },
  run: { en: 'Race', es: 'Competir' },
  again: { en: 'Race again', es: 'Otra vez' },
  worst: { en: 'Worst case', es: 'Peor caso' },
  lanes: {
    en: ['Page by page', 'Two at a time', 'Split in half'],
    es: ['Página por página', 'De dos en dos', 'Partir a la mitad'],
  },
}

type Range = { lo: number; hi: number; mid: number }

function halving(size: number, target: number) {
  const seq: Range[] = []
  let lo = 1
  let hi = size
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    seq.push({ lo, hi, mid })
    if (mid === target) break
    if (target < mid) hi = mid - 1
    else lo = mid + 1
  }
  return seq
}

// two at a time overshoots odd pages by one, then steps back
const twosSteps = (target: number) => Math.ceil(target / 2) + (target % 2)

export function PhonebookRace({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const names = copy.lanes[lang]
  const [size, setSize] = useState(1000)
  const [target, setTarget] = useState(620)
  const [s, setS] = useState(0)
  const [running, setRunning] = useState(false)
  const speed = useRef(3)
  const elapsed = useRef(0)

  const seq = halving(size, target)
  const need = [target, twosSteps(target), seq.length]
  const total = Math.max(...need)

  useEffect(() => {
    if (!running) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      // a calm pace while halving works, then fast-forward the slow two
      if (elapsed.current > seq.length + 1.5) speed.current *= 1.07
      elapsed.current = Math.min(elapsed.current + speed.current * dt, total)
      setS(elapsed.current)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [running, seq.length, total])

  useEffect(() => {
    if (running && s >= total) setRunning(false)
  }, [running, s, total])

  const race = (nextSize = size, fresh = s > 0) => {
    const nextTarget = fresh || nextSize !== size ? 1 + Math.floor(Math.random() * nextSize) : target
    setSize(nextSize)
    setTarget(nextTarget)
    speed.current = 3
    if (prefersReducedMotion()) {
      elapsed.current = Math.max(nextTarget, twosSteps(nextTarget), halving(nextSize, nextTarget).length)
      setS(elapsed.current)
      return
    }
    elapsed.current = 0
    setS(0)
    setRunning(true)
  }

  const at = need.map((n) => Math.min(Math.floor(s), n))
  const linearPage = at[0]
  const twosPage = at[1] === need[1] ? target : Math.min(at[1] * 2, size)
  const range: Range = at[2] === 0 ? { lo: 1, hi: size, mid: 0 } : seq[at[2] - 1]
  const pct = (page: number) => `${(page / size) * 100}%`

  const lanes = [
    { fill: pct(linearPage), page: linearPage },
    { fill: pct(twosPage), page: twosPage },
  ]

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <div className="lab__btns">
        {SIZES.map((n) => (
          <button key={n} type="button" className="lab__btn" aria-pressed={size === n} onClick={() => race(n, true)}>
            {formatNumber(n, lang)} {t.pages}
          </button>
        ))}
      </div>

      <div className="race">
        {names.map((name, i) => {
          const done = s > 0 && at[i] === need[i]
          return (
            <div key={name} className="race__lane" data-done={done || undefined}>
              <div className="race__meta">
                <span className="race__name">{name}</span>
                <span className="race__steps">
                  {formatNumber(at[i], lang)} {t.steps}
                  {done && ' ✓'}
                </span>
              </div>
              <div className="race__track">
                {i < 2 ? (
                  <span className="race__fill" style={{ width: lanes[i].fill }} />
                ) : (
                  <span
                    className="race__range"
                    style={{ left: pct(range.lo - 1), width: pct(range.hi - range.lo + 1) }}
                  />
                )}
                <span className="race__target" style={{ left: pct(target) }} aria-hidden />
              </div>
            </div>
          )
        })}
        <p className="race__goal label">
          {t.page} {formatNumber(target, lang)} / {formatNumber(size, lang)}
        </p>
      </div>

      <dl className="readout">
        {['n', 'n / 2', 'log₂ n'].map((label, i) => (
          <div key={label}>
            <dt className="label">
              {t.worst} · {label}
            </dt>
            <dd>{formatNumber([size, size / 2, Math.ceil(Math.log2(size))][i], lang)}</dd>
          </div>
        ))}
      </dl>

      <div className="lab__btns">
        <button type="button" className="lab__btn lab__btn--solid" onClick={() => race()} disabled={running}>
          {s > 0 ? t.again : t.run}
        </button>
      </div>
    </Lab>
  )
}
