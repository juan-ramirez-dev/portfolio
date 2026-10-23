'use client'

import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

// Declarative scroll effects, opted into with data attributes:
//   data-reveal            fade + rise once when entering
//   data-split             words slide up out of a mask (see <SplitText>)
//   data-drift="6"         slides sideways by ±6% while its panel crosses the screen
//   data-countup="42"      counts up once when entering
export function Animations() {
  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.set('[data-reveal]', { opacity: 0 })
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
    })

    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll('.split-word'),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
      const shift = Number(el.dataset.drift) || 6
      gsap.fromTo(
        el,
        { xPercent: shift },
        {
          xPercent: -shift,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('[data-panel]') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-countup]').forEach((el) => {
      const target = Number(el.dataset.countup)
      const decimals = Number(el.dataset.decimals ?? 0)
      const counter = { v: 0 }
      gsap.to(counter, {
        v: target,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = counter.v.toFixed(decimals)
        },
      })
    })
  })

  return null
}
