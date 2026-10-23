'use client'

import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Stacked pages: every [data-panel] holds still once its last screen is in view,
 * and the next one slides up over it like a turned page. Desktop only.
 */
export function Panels() {
  useGSAP(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
      // the last page has nothing to cover it
      panels.slice(0, -1).forEach((panel) => {
        const shade = panel.querySelector('.panel__shade')
        ScrollTrigger.create({
          trigger: panel,
          start: () => (panel.offsetHeight <= window.innerHeight + 1 ? 'top top' : 'bottom bottom'),
          end: () => `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          animation: shade ? gsap.fromTo(shade, { opacity: 0 }, { opacity: 0.6, ease: 'none' }) : undefined,
          invalidateOnRefresh: true,
        })
      })
    })
    return () => mm.revert()
  })

  return null
}
