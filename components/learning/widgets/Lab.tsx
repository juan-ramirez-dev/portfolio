import type { Locale } from '@/content/i18n'

const TRY = { en: 'Try it', es: 'Pruébalo' }

type Props = { lang: Locale; title: string; hint?: string; children: React.ReactNode }

/** the frame every interactive sits in: a rule, a title, the toy, one line of help */
export function Lab({ lang, title, hint, children }: Props) {
  return (
    <figure className="lab">
      <figcaption className="lab__head label">
        <span>{title}</span>
        <span>{TRY[lang]}</span>
      </figcaption>
      {children}
      {hint && <p className="lab__note">{hint}</p>}
    </figure>
  )
}

export const formatNumber = (n: number, lang: Locale) => n.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US')
