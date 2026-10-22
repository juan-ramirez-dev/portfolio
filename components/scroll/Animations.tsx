'use client'

import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'

// Declarative scroll effects, opted into with data attributes:
//   data-reveal            fade + rise once when entering
//   data-split             words slide up out of a mask (see <SplitText>)
//   data-scrub-words       words brighten as you scroll through
//   data-parallax="0.2"    drifts vertically at the given speed
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
        { yPercent: 115, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll('.scrub-word'),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const speed = Number(el.dataset.parallax) || 0.2
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
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
