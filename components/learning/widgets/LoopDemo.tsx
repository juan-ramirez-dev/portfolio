'use client'

import { useEffect, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { Lab } from './Lab'

const copy = {
  title: { en: 'Copy and paste vs a loop', es: 'Copiar y pegar vs un bucle' },
  hint: {
    en: 'Move the slider. The copied version keeps growing, the loop stays at three blocks.',
    es: 'Mueve el slider. La versión copiada no para de crecer, el bucle se queda en tres bloques.',
  },
  times: { en: 'Meows', es: 'Maullidos' },
  copied: { en: 'Copied', es: 'Copiado' },
  loop: { en: 'Loop', es: 'Bucle' },
  blocks: { en: 'blocks', es: 'bloques' },
  flag: { en: 'when green flag clicked', es: 'al hacer clic en la bandera' },
  say: { en: 'say Meow', es: 'decir Miau' },
  repeat: { en: 'repeat', es: 'repetir' },
  run: { en: 'Run both', es: 'Ejecutar ambos' },
  meow: { en: 'Meow', es: 'Miau' },
  pet: { en: 'Pet the cat', es: 'Acariciar al gato' },
  once: { en: 'if touching mouse', es: 'si toca el ratón' },
  forever: { en: 'forever', es: 'por siempre' },
  purr: { en: 'Purr!', es: '¡Rrrr!' },
  sayPurr: { en: 'say Purr!', es: 'decir ¡Rrrr!' },
  ignored: { en: '… (it only checked once)', es: '… (solo revisó una vez)' },
  withLoop: { en: 'With “forever”', es: 'Con “por siempre”' },
  without: { en: 'Without', es: 'Sin' },
}

export function LoopDemo({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const [n, setN] = useState(3)
  const [said, setSaid] = useState(0)
  const [running, setRunning] = useState(false)
  const [forever, setForever] = useState(true)
  const [reply, setReply] = useState('')

  useEffect(() => {
    if (!running) return
    if (said >= n) return setRunning(false)
    const id = window.setTimeout(() => setSaid(said + 1), 380)
    return () => window.clearTimeout(id)
  }, [running, said, n])

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <label className="loops__slider">
        <span className="label">
          {t.times}: {n}
        </span>
        <input
          type="range"
          min={1}
          max={8}
          value={n}
          onChange={(e) => {
            setN(Number(e.target.value))
            setSaid(0)
            setRunning(false)
          }}
        />
      </label>

      <div className="loops">
        <div className="loops__col">
          <p className="label">
            {t.copied} · {n + 1} {t.blocks}
          </p>
          <div className="script">
            <span className="block block--event">{t.flag}</span>
            {Array.from({ length: n }, (_, i) => (
              <span key={i} className="block block--looks" data-on={i < said || undefined}>
                {t.say}
              </span>
            ))}
          </div>
        </div>
        <div className="loops__col">
          <p className="label">
            {t.loop} · 3 {t.blocks}
          </p>
          <div className="script">
            <span className="block block--event">{t.flag}</span>
            <span className="block block--control">
              {t.repeat} <i className="block__arg">{n}</i>
            </span>
            <span className="block block--looks block--inner" data-on={said > 0 || undefined}>
              {t.say}
            </span>
          </div>
        </div>
        <div className="loops__cat" aria-live="polite">
          <span className="loops__bubble" data-on={said > 0 || undefined}>
            {said > 0 ? `${t.meow} ×${said}` : '…'}
          </span>
          <span className="loops__emoji" aria-hidden>
            🐱
          </span>
        </div>
      </div>

      <div className="lab__btns">
        <button
          type="button"
          className="lab__btn lab__btn--solid"
          onClick={() => {
            setSaid(0)
            setRunning(true)
          }}
        >
          {t.run}
        </button>
      </div>

      <div className="loops__forever">
        <div className="lab__btns" role="group">
          <button type="button" className="lab__btn" aria-pressed={forever} onClick={() => (setForever(true), setReply(''))}>
            {t.withLoop}
          </button>
          <button type="button" className="lab__btn" aria-pressed={!forever} onClick={() => (setForever(false), setReply(''))}>
            {t.without}
          </button>
        </div>
        <div className="script script--small">
          <span className="block block--event">{t.flag}</span>
          {forever && <span className="block block--control">{t.forever}</span>}
          <span className={`block block--control${forever ? ' block--inner' : ''}`}>{t.once}</span>
          <span className={`block block--looks block--inner${forever ? ' block--inner2' : ''}`}>{t.sayPurr}</span>
        </div>
        <div className="loops__pet">
          <button type="button" className="lab__btn" onClick={() => setReply(forever ? t.purr : t.ignored)}>
            🐱 {t.pet}
          </button>
          <span className="loops__reply" aria-live="polite">
            {reply}
          </span>
        </div>
      </div>
    </Lab>
  )
}
