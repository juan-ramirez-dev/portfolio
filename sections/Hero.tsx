'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { chapters } from '@/content/chapters'
import { profile } from '@/content/profile'
import { scrollToId } from '@/components/scroll/SmoothScroll'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current!
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      if (!prefersReducedMotion()) {
        intro
          .from('.hero__mast > *', { y: -20, opacity: 0, duration: 1, stagger: 0.08 })
          .from('.hero__name .split-word', { yPercent: 110, duration: 1.4, stagger: 0.08 }, 0.1)
          .from('.hero__lines li, .hero__foot > *', { y: 24, opacity: 0, duration: 1, stagger: 0.06 }, 0.5)
      }
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
        .to('.hero__name', { yPercent: -30, letterSpacing: '0.04em', opacity: 0.08, ease: 'none' }, 0)
        .to('.hero__lines, .hero__foot', { y: -60, opacity: 0, ease: 'none', duration: 0.6 }, 0)
        .to('.hero__glow', { scale: 1.5, opacity: 0, ease: 'none' }, 0)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="cover" className="hero theme-bezel">
      <div className="hero__sticky" data-hero-sticky>
        <div className="hero__glow" aria-hidden />
        <div className="hero__mast">
          <span>{profile.issue}</span>
          <span>The Architecture Issue</span>
          <span>{profile.season}</span>
        </div>

        <h1 className="hero__name" aria-label={profile.name}>
          <span className="split-mask" aria-hidden>
            <span className="split-word">{profile.firstName}</span>
          </span>{' '}
          <span className="split-mask" aria-hidden>
            <span className="split-word">{profile.lastName}</span>
          </span>
        </h1>

        <div className="hero__slot" data-hero-slot />

        <ul className="hero__lines">
          {chapters.slice(0, 4).map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(c.id)
                }}
              >
                <span className="hero__page">p. {12 + i * 14}</span>
                <span>{c.title}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hero__foot">
          <p className="hero__title">
            {profile.title.split(' ')[0]} <em>{profile.title.split(' ').slice(1).join(' ')}</em>
          </p>
          <p className="hero__sub">{profile.subtitle}</p>
          <p className="hero__wind">Scroll to wind ↓</p>
        </div>
      </div>
    </section>
  )
}
