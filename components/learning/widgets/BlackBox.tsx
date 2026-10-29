'use client'

import { useEffect, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { Lab } from './Lab'

const copy = {
  title: { en: 'Input → black box → output', es: 'Entrada → caja negra → salida' },
  hint: {
    en: 'Run it, then peek inside. The algorithm is just the steps in the middle.',
    es: 'Ejecútalo y luego mira adentro. El algoritmo son solo los pasos del medio.',
  },
  input: { en: 'Input', es: 'Entrada' },
  output: { en: 'Output', es: 'Salida' },
  box: { en: 'Algorithm', es: 'Algoritmo' },
  run: { en: 'Run', es: 'Ejecutar' },
  peek: { en: 'Peek inside', es: 'Mirar adentro' },
  hide: { en: 'Close the box', es: 'Cerrar la caja' },
}

const PROBLEMS = [
  {
    id: 'binary',
    label: { en: 'Number → binary', es: 'Número → binario' },
    input: '50',
    output: (50).toString(2),
    steps: { en: 'Divide by 2, keep the remainders, read them backwards.', es: 'Divide entre 2, guarda los residuos y léelos al revés.' },
  },
  {
    id: 'text',
    label: { en: 'Text → numbers', es: 'Texto → números' },
    input: 'HI!',
    output: [...'HI!'].map((c) => c.charCodeAt(0)).join(' '),
    steps: { en: 'Look each letter up in the ASCII table.', es: 'Busca cada letra en la tabla ASCII.' },
  },
  {
    id: 'sort',
    label: { en: 'Sort numbers', es: 'Ordenar números' },
    input: '7 2 9 4',
    output: '2 4 7 9',
    steps: { en: 'Find the smallest, set it aside, repeat.', es: 'Busca el más pequeño, apártalo, repite.' },
  },
]

export function BlackBox({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const problems = localize(PROBLEMS, lang)
  const [pick, setPick] = useState(0)
  // 0 waiting · 1 inside the box · 2 answered
  const [phase, setPhase] = useState(2)
  const [open, setOpen] = useState(false)
  const p = problems[pick]

  useEffect(() => {
    if (phase === 2) return
    const id = window.setTimeout(() => setPhase(phase + 1), phase === 0 ? 300 : 900)
    return () => window.clearTimeout(id)
  }, [phase])

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <div className="lab__btns">
        {problems.map((pr, i) => (
          <button
            key={pr.id}
            type="button"
            className="lab__btn"
            aria-pressed={pick === i}
            onClick={() => {
              setPick(i)
              setPhase(0)
            }}
          >
            {pr.label}
          </button>
        ))}
      </div>

      <div className="flow" data-phase={phase}>
        <div className="flow__end">
          <span className="label">{t.input}</span>
          <strong>{p.input}</strong>
        </div>
        <span className="flow__arrow" data-on={phase >= 1 || undefined} aria-hidden>
          →
        </span>
        <div className="flow__box" data-open={open || undefined} data-busy={phase === 1 || undefined}>
          <span className="label">{t.box}</span>
          <strong>{open ? p.steps : '?'}</strong>
        </div>
        <span className="flow__arrow" data-on={phase >= 2 || undefined} aria-hidden>
          →
        </span>
        <div className="flow__end" aria-live="polite">
          <span className="label">{t.output}</span>
          <strong>{phase === 2 ? p.output : '…'}</strong>
        </div>
      </div>

      <div className="lab__btns">
        <button type="button" className="lab__btn lab__btn--solid" onClick={() => setPhase(0)}>
          {t.run}
        </button>
        <button type="button" className="lab__btn" aria-pressed={open} onClick={() => setOpen(!open)}>
          {open ? t.hide : t.peek}
        </button>
      </div>
    </Lab>
  )
}
