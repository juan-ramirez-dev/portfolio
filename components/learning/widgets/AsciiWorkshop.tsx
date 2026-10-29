'use client'

import { useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { Lab, formatNumber } from './Lab'

const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1]
const PRESETS = ['HI!', 'hi!', 'CS50', 'ñ', '😂']
const MAX = 6

const copy = {
  title: { en: 'Letters into bytes', es: 'Letras a bytes' },
  hint: {
    en: 'Type anything. The 32 column is the only difference between upper and lower case.',
    es: 'Escribe lo que quieras. La columna del 32 es la única diferencia entre mayúscula y minúscula.',
  },
  input: { en: 'Text to encode', es: 'Texto para codificar' },
  flip: { en: 'Flip the 32 bit', es: 'Cambiar el bit del 32' },
  bytes: { en: 'bytes in UTF-8', es: 'bytes en UTF-8' },
  beyond: { en: 'Beyond ASCII', es: 'Fuera de ASCII' },
}

const encoder = new TextEncoder()
const flipCase = (s: string) =>
  [...s].map((c) => (/^[a-z]$/i.test(c) ? String.fromCharCode(c.charCodeAt(0) ^ 32) : c)).join('')

export function AsciiWorkshop({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const [text, setText] = useState('HI!')
  const chars = [...text]

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <input
        className="lab__input"
        value={text}
        aria-label={t.input}
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => setText([...e.target.value].slice(0, MAX).join(''))}
      />

      <div className="ascii">
        <div className="ascii__row ascii__row--head label" aria-hidden>
          <span />
          <span />
          <span className="ascii__bits">
            {WEIGHTS.map((w) => (
              <span key={w} data-flip={w === 32 || undefined}>
                {w}
              </span>
            ))}
          </span>
        </div>
        {chars.map((ch, i) => {
          const code = ch.codePointAt(0)!
          return (
            <div key={i} className="ascii__row">
              <span className="ascii__char">{ch === ' ' ? '␠' : ch}</span>
              <span className="ascii__code">{formatNumber(code, lang)}</span>
              {code < 128 ? (
                <span className="ascii__bits">
                  {WEIGHTS.map((w) => (
                    <span key={w} className="bulb" data-on={(code & w) !== 0 || undefined} data-flip={w === 32 || undefined} />
                  ))}
                </span>
              ) : (
                <span className="ascii__wide label">
                  {t.beyond} · U+{code.toString(16).toUpperCase().padStart(4, '0')} · {encoder.encode(ch).length} {t.bytes}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="lab__btns">
        {PRESETS.map((p) => (
          <button key={p} type="button" className="lab__btn" aria-pressed={text === p} onClick={() => setText(p)}>
            {p}
          </button>
        ))}
        <button type="button" className="lab__btn lab__btn--solid" onClick={() => setText(flipCase(text))}>
          {t.flip}
        </button>
      </div>
    </Lab>
  )
}
