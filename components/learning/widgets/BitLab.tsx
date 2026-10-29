'use client'

import { useEffect, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { Lab } from './Lab'

const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1]
const PRESETS = [0, 7, 65, 72, 255]

const copy = {
  title: { en: 'One byte, eight bulbs', es: 'Un byte, ocho bombillos' },
  hint: {
    en: 'Tap a bulb to flip that bit. Add up the numbers above the lit ones and you get the decimal.',
    es: 'Toca un bombillo para cambiar ese bit. Suma los números encima de los prendidos y te da el decimal.',
  },
  bit: { en: 'Bit worth', es: 'Bit que vale' },
  binary: { en: 'Binary', es: 'Binario' },
  decimal: { en: 'Decimal', es: 'Decimal' },
  ascii: { en: 'As ASCII', es: 'Como ASCII' },
  count: { en: 'Count to 255', es: 'Contar hasta 255' },
  stop: { en: 'Stop', es: 'Parar' },
}

export const asChar = (n: number) => (n >= 33 && n <= 126 ? String.fromCharCode(n) : n === 32 ? '␠' : '—')

export function BitLab({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const [value, setValue] = useState(72)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (!counting) return
    const id = window.setInterval(() => setValue((v) => Math.min(v + 1, 255)), 70)
    return () => window.clearInterval(id)
  }, [counting])

  useEffect(() => {
    if (counting && value === 255) setCounting(false)
  }, [counting, value])

  const set = (v: number) => {
    setCounting(false)
    setValue(v)
  }

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <div className="bits">
        {WEIGHTS.map((w) => {
          const on = (value & w) !== 0
          return (
            <button
              key={w}
              type="button"
              className="bit"
              aria-pressed={on}
              aria-label={`${t.bit} ${w}`}
              onClick={() => set(value ^ w)}
            >
              <span className="bit__w">{w}</span>
              <span className="bulb" data-on={on || undefined} />
              <span className="bit__d">{on ? 1 : 0}</span>
            </button>
          )
        })}
      </div>

      <dl className="readout">
        <div>
          <dt className="label">{t.binary}</dt>
          <dd>{value.toString(2).padStart(8, '0')}</dd>
        </div>
        <div>
          <dt className="label">{t.decimal}</dt>
          <dd>{value}</dd>
        </div>
        <div>
          <dt className="label">{t.ascii}</dt>
          <dd>{asChar(value)}</dd>
        </div>
      </dl>

      <div className="lab__btns">
        {PRESETS.map((p) => (
          <button key={p} type="button" className="lab__btn" aria-pressed={!counting && value === p} onClick={() => set(p)}>
            {p}
            {p >= 33 ? ` · ${asChar(p)}` : ''}
          </button>
        ))}
        <button
          type="button"
          className="lab__btn lab__btn--solid"
          onClick={() => {
            if (counting) return setCounting(false)
            setValue(0)
            setCounting(true)
          }}
        >
          {counting ? t.stop : t.count}
        </button>
      </div>
    </Lab>
  )
}
