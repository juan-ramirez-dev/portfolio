'use client'

import { Fragment, useEffect, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { Lab } from './Lab'

const BOOK = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elena', 'Felipe', 'Gabi', 'Hugo', 'Isabel', 'Juan', 'Karen', 'Luis', 'Mateo', 'Nora', 'Oscar', 'Paula']
const TARGETS = ['Juan', 'Carla', 'Paula', 'Zoe']

// {verb} marks a function, [word] a conditional or loop
const LINES = [
  { en: '{Pick up} the phone book', es: '{Toma} el directorio' },
  { en: '{Open} to the middle', es: '{Ábrelo} por la mitad' },
  { en: '{Look at} the page', es: '{Mira} la página' },
  { en: '[If] the person is on the page', es: '[Si] la persona está en la página' },
  { en: '    {Call} the person', es: '    {Llámala}' },
  { en: '[Else if] the person is earlier in the book', es: '[Si no, si] la persona está antes' },
  { en: '    {Open} to the middle of the left half', es: '    {Abre} la mitad de la parte izquierda' },
  { en: '    [Go back] to line 3', es: '    [Vuelve] a la línea 3' },
  { en: '[Else if] the person is later in the book', es: '[Si no, si] la persona está después' },
  { en: '    {Open} to the middle of the right half', es: '    {Abre} la mitad de la parte derecha' },
  { en: '    [Go back] to line 3', es: '    [Vuelve] a la línea 3' },
  { en: '[Else]', es: '[Si no]' },
  { en: '    {Quit}', es: '    {Termina}' },
]

const copy = {
  title: { en: 'Run the pseudocode', es: 'Ejecuta el pseudocódigo' },
  hint: {
    en: 'Step one line at a time. Look for Zoe: she isn’t in the book, so the last “else” saves the program.',
    es: 'Avanza línea por línea. Busca a Zoe: no está en el libro, así que el último “si no” salva el programa.',
  },
  find: { en: 'Find', es: 'Buscar' },
  step: { en: 'Step', es: 'Paso' },
  auto: { en: 'Play', es: 'Reproducir' },
  pause: { en: 'Pause', es: 'Pausa' },
  reset: { en: 'Reset', es: 'Reiniciar' },
  lines: { en: 'lines run', es: 'líneas ejecutadas' },
  found: { en: 'Found', es: 'Encontrado' },
  missing: { en: 'Not in the book', es: 'No está en el libro' },
  yes: { en: 'true', es: 'verdadero' },
  no: { en: 'false', es: 'falso' },
}

type State = {
  pc: number
  lo: number
  hi: number
  mid: number | null
  ran: number
  check?: { line: number; value: boolean }
  end?: 'found' | 'missing'
}

const START: State = { pc: 1, lo: 0, hi: BOOK.length - 1, mid: null, ran: 0 }
const middle = (lo: number, hi: number) => (lo <= hi ? Math.floor((lo + hi) / 2) : null)

/** runs one line of the program above */
function step(s: State, target: string): State {
  const page = s.mid === null ? undefined : BOOK[s.mid]
  const next = { ...s, ran: s.ran + 1, check: undefined }
  const test = (value: boolean, yes: number, no: number) => ({ ...next, check: { line: s.pc, value }, pc: value ? yes : no })
  switch (s.pc) {
    case 2:
      return { ...next, mid: middle(s.lo, s.hi), pc: 3 }
    case 4:
      return test(page === target, 5, 6)
    case 5:
      return { ...next, end: 'found' }
    case 6:
      return test(page !== undefined && target < page, 7, 9)
    case 7:
      return { ...next, hi: s.mid! - 1, mid: middle(s.lo, s.mid! - 1), pc: 8 }
    case 9:
      return test(page !== undefined && target > page, 10, 12)
    case 10:
      return { ...next, lo: s.mid! + 1, mid: middle(s.mid! + 1, s.hi), pc: 11 }
    case 8:
    case 11:
      return { ...next, pc: 3 }
    case 13:
      return { ...next, end: 'missing' }
    default:
      return { ...next, pc: s.pc + 1 }
  }
}

function Line({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{[^}]+\}|\[[^\]]+\])/).map((chunk, i) =>
        chunk.startsWith('{') ? (
          <b key={i} className="code__fn">
            {chunk.slice(1, -1)}
          </b>
        ) : chunk.startsWith('[') ? (
          <b key={i} className="code__cond">
            {chunk.slice(1, -1)}
          </b>
        ) : (
          <Fragment key={i}>{chunk}</Fragment>
        ),
      )}
    </>
  )
}

export function PseudocodeStepper({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const lines = localize(LINES, lang)
  const [target, setTarget] = useState('Juan')
  const [s, setS] = useState(START)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (s.end) return setPlaying(false)
    const id = window.setTimeout(() => setS((cur) => step(cur, target)), 550)
    return () => window.clearTimeout(id)
  }, [playing, s, target])

  const reset = (name = target) => {
    setTarget(name)
    setS(START)
    setPlaying(false)
  }

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <div className="lab__btns" role="group" aria-label={t.find}>
        {TARGETS.map((name) => (
          <button key={name} type="button" className="lab__btn" aria-pressed={target === name} onClick={() => reset(name)}>
            {t.find} {name}
          </button>
        ))}
      </div>

      <div className="book" aria-hidden>
        {BOOK.map((name, i) => (
          <span
            key={name}
            className="book__page"
            data-out={i < s.lo || i > s.hi || undefined}
            data-mid={i === s.mid || undefined}
            data-hit={(s.end === 'found' && i === s.mid) || undefined}
          >
            {name}
          </span>
        ))}
      </div>

      <ol className="code">
        {lines.map((line, i) => {
          const n = i + 1
          return (
            <li key={n} data-current={(!s.end && s.pc === n) || undefined}>
              <span className="code__n">{n}</span>
              <span className="code__text">
                <Line text={line} />
              </span>
              {s.check?.line === n && <span className="code__check">{s.check.value ? t.yes : t.no}</span>}
            </li>
          )
        })}
      </ol>

      <div className="code__status label" aria-live="polite">
        <span>
          {s.ran} {t.lines}
        </span>
        {s.end && <span>{s.end === 'found' ? `${t.found}: ${target}` : t.missing}</span>}
      </div>

      <div className="lab__btns">
        <button type="button" className="lab__btn lab__btn--solid" disabled={!!s.end} onClick={() => setS(step(s, target))}>
          {t.step}
        </button>
        <button type="button" className="lab__btn" disabled={!!s.end} aria-pressed={playing} onClick={() => setPlaying(!playing)}>
          {playing ? t.pause : t.auto}
        </button>
        <button type="button" className="lab__btn" onClick={() => reset()}>
          {t.reset}
        </button>
      </div>
    </Lab>
  )
}
