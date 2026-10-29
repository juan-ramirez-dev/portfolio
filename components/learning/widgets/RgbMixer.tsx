'use client'

import { useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { Lab } from './Lab'
import { asChar } from './BitLab'

type RGB = [number, number, number]

const PRESETS: { label: string; rgb: RGB }[] = [
  { label: 'HI!', rgb: [72, 73, 33] },
  { label: '0 0 0', rgb: [0, 0, 0] },
  { label: '255 255 255', rgb: [255, 255, 255] },
  { label: '255 0 0', rgb: [255, 0, 0] },
  { label: '242 194 0', rgb: [242, 194, 0] },
]

const copy = {
  title: { en: 'Three bytes, one colour', es: 'Tres bytes, un color' },
  hint: {
    en: '72, 73, 33 is “HI!” in a text message and this olive in a photo editor. Same bytes, different context.',
    es: '72, 73, 33 es “HI!” en un chat y este verde oliva en un editor de fotos. Los mismos bytes, otro contexto.',
  },
  channels: { en: ['Red', 'Green', 'Blue'], es: ['Rojo', 'Verde', 'Azul'] },
  asText: { en: 'Read as text', es: 'Leído como texto' },
  swatch: { en: 'Mixed colour', es: 'Color mezclado' },
}

const hex = (rgb: RGB) => `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`

export function RgbMixer({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const channels = copy.channels[lang]
  const [rgb, setRgb] = useState<RGB>([72, 73, 33])

  const setChannel = (i: number, v: number) => setRgb((c) => c.map((x, j) => (j === i ? v : x)) as RGB)

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <div className="rgb">
        <div className="rgb__sliders">
          {rgb.map((v, i) => (
            <label key={i} className="rgb__channel">
              <span className="label">{channels[i]}</span>
              <input type="range" min={0} max={255} value={v} onChange={(e) => setChannel(i, Number(e.target.value))} />
              <span className="rgb__value">{v}</span>
              <span className="rgb__bin">{v.toString(2).padStart(8, '0')}</span>
            </label>
          ))}
        </div>
        <div className="rgb__swatch" role="img" aria-label={`${t.swatch}: rgb(${rgb.join(', ')})`} style={{ background: hex(rgb) }}>
          <span className="label">{hex(rgb)}</span>
        </div>
      </div>

      <dl className="readout">
        <div>
          <dt className="label">RGB</dt>
          <dd>{rgb.join(' · ')}</dd>
        </div>
        <div>
          <dt className="label">{t.asText}</dt>
          <dd>{rgb.map(asChar).join(' ')}</dd>
        </div>
      </dl>

      <div className="lab__btns">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className="lab__btn"
            aria-pressed={p.rgb.every((v, i) => v === rgb[i])}
            onClick={() => setRgb(p.rgb)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </Lab>
  )
}
