'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { profile } from '@/content/profile'

/** "The calibre": the full stack as an exploded watch movement. */
export function Movement() {
  const ref = useRef<HTMLElement>(null)
  const layers = profile.layers

  useGSAP(
    () => {
      const plates = gsap.utils.toArray<HTMLElement>('.plate')
      const legend = gsap.utils.toArray<HTMLElement>('.layers__item')
      // plates are listed top (interface) to bottom (infrastructure)
      const z = (i: number, gap: number) => (plates.length - 1 - i) * gap

      if (prefersReducedMotion()) {
        plates.forEach((p, i) => gsap.set(p, { z: z(i, 70) }))
        legend.forEach((l) => l.setAttribute('data-on', ''))
        return
      }

      const mm = gsap.matchMedia()
      mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, (ctx) => {
        const desktop = Boolean(ctx.conditions?.desktop)
        const gap = desktop ? 78 : 46
        plates.forEach((p, i) => gsap.set(p, { z: z(i, 4) }))
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.movement__pin',
            start: desktop ? 'top top' : 'top 70%',
            end: desktop ? '+=160%' : 'bottom 40%',
            pin: desktop,
            scrub: 0.8,
            onUpdate: (self) =>
              legend.forEach((l, i) => l.toggleAttribute('data-on', self.progress >= 0.05 + (i / legend.length) * 0.7)),
          },
        })
        plates.forEach((p, i) => {
          tl.to(p, { z: z(i, gap), ease: 'power2.out', duration: 1 }, i * 0.12)
        })
        tl.to('.stack__iso', { rotateZ: -38, ease: 'none', duration: 1.6 }, 0)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="calibre" className="movement theme-dial">
      <div className="movement__pin frame">
        <div className="movement__copy">
          <header className="kicker-row" data-reveal>
            <span>The calibre</span>
            <span>Exploded view</span>
          </header>
          <h2 className="section__title">
            How the <em>movement</em> is built.
          </h2>
          <p className="section__lede">
            Placeholder. Five layers I design across, from the pixel to the pipeline. Scroll to take the movement apart.
          </p>
          <ol className="layers">
            {layers.map((l, i) => (
              <li key={l.name} className="layers__item">
                <span className="layers__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="layers__name">{l.name}</span>
                <span className="layers__detail">{l.detail}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="stack" aria-hidden>
          <div className="stack__iso">
            {layers.map((l, i) => (
              <div key={l.name} className={`plate plate--${i}`}>
                <span className="plate__label">
                  {String(i + 1).padStart(2, '0')} · {l.name}
                </span>
                <div className="plate__parts">
                  {Array.from({ length: 4 + (i % 3) }, (_, k) => (
                    <span key={k} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
