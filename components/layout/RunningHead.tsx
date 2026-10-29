'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useGSAP, ScrollTrigger } from '@/lib/gsap'
import { getContent } from '@/content'
import { HOME, type Locale } from '@/content/i18n'
import { alternatePath, learningPath } from '@/content/learning'
import { asset } from '@/lib/asset'
import { scrollToId } from '@/components/scroll/SmoothScroll'

/**
 * Magazine running head. Takes its colours, section name and folio from whichever
 * [data-panel] is under it (data-label / data-folio).
 */
export function RunningHead({ lang }: { lang: Locale }) {
  const { profile, ui } = getContent(lang)
  const other: Locale = lang === 'en' ? 'es' : 'en'
  const pathname = usePathname()
  const onHome = `${pathname}/`.replace(/\/+$/, '/') === HOME[lang]
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const head = ref.current!
    const label = head.querySelector<HTMLElement>('[data-head-label]')!
    const folio = head.querySelector<HTMLElement>('[data-head-folio]')!
    const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'))

    const show = (panel?: HTMLElement) => {
      if (!panel) return
      const style = getComputedStyle(panel)
      head.style.color = style.color
      head.style.background = style.backgroundColor
      label.textContent = panel.dataset.label ?? ''
      folio.textContent = panel.dataset.folio ?? ''
    }

    show(panels[0])
    panels.forEach((panel, i) =>
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 26px',
        onEnter: () => show(panel),
        onLeaveBack: () => show(panels[i - 1]),
      }),
    )
  })

  return (
    <header ref={ref} className="head">
      <a
        href={onHome ? '#cover' : asset(HOME[lang])}
        className="head__name"
        onClick={(e) => {
          if (!onHome) return
          e.preventDefault()
          scrollToId('cover')
        }}
      >
        {profile.name}
      </a>
      <span className="head__label" data-head-label />
      <span className="head__end">
        <span className="head__folio" data-head-folio />
        <a className="head__link" href={asset(learningPath(lang))}>
          {ui.learning.label}
        </a>
        <a
          className="head__lang"
          href={asset(alternatePath(pathname, lang))}
          hrefLang={other}
          lang={other}
          aria-label={ui.switchLabel}
        >
          {ui.switchTo}
        </a>
      </span>
    </header>
  )
}
