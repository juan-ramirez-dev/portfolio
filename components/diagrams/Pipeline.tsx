'use client'

import { useRef } from 'react'
import { ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'

type Props = { steps: string[]; figure: string }

/** CI/CD track: a rose-gold bead travels the stations as you scroll. */
export function Pipeline({ steps, figure }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current!
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'))
      const paint = (p: number) => {
        root.style.setProperty('--p', p.toFixed(4))
        items.forEach((el, i) => el.toggleAttribute('data-on', p >= i / (steps.length - 1) - 0.001))
      }
      if (prefersReducedMotion()) return paint(1)
      paint(0)
      ScrollTrigger.create({
        trigger: root,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: true,
        onUpdate: (self) => paint(self.progress),
      })
    },
    { scope: ref },
  )

  return (
    <figure ref={ref} className="pipeline" style={{ ['--n' as string]: steps.length, ['--p' as string]: 0 }}>
      <div className="pipeline__rail">
        <div className="pipeline__track" aria-hidden>
          <div className="pipeline__fill" />
          <div className="pipeline__bead" />
        </div>
        <ol className="pipeline__steps">
          {steps.map((step, i) => (
            <li key={step} data-step className="pipeline__step">
              <span className="pipeline__dot" />
              <span className="pipeline__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="pipeline__name">{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="caption">
        <span className="caption__fig">Fig. {figure}</span> Delivery pipeline — every merge walks the same path to production.
      </figcaption>
    </figure>
  )
}
