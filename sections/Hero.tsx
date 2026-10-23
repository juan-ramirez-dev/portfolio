'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { skills } from '@/content/skills'
import { profile } from '@/content/profile'
import { scrollToId } from '@/components/scroll/SmoothScroll'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.cover__name .split-word', { yPercent: 110, duration: 1.5, stagger: 0.1 }, 0.1)
        .fromTo(
          '.cover__portrait',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' },
          0,
        )
        .from('.cover__intro > *, .contents li', { y: 20, opacity: 0, duration: 1, stagger: 0.05 }, 0.6)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="cover" className="panel cover t-paper" data-panel data-label="Portfolio" data-folio="2026">
      <div className="cover__grid">
        <div className="cover__intro">
          <p className="cover__role">{profile.title}</p>
          <p className="cover__sub">{profile.subtitle}</p>
        </div>

        <div className="cover__portrait">
          {profile.portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.portrait} alt={profile.name} />
          ) : (
            <span className="cover__portrait-note">Portrait</span>
          )}
        </div>

        <nav className="cover__contents" aria-label="Contents">
          <p className="label">Contents/</p>
          <ol className="contents">
            {skills.map((s) => (
              <li key={s.id} className={`a-${s.colour}`}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(s.id)
                  }}
                >
                  <span className="contents__n">
                    <i className="contents__swatch" aria-hidden />
                    {s.n}
                  </span>
                  <span className="contents__t">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <h1 className="cover__name" aria-label={profile.name}>
        <span className="split-mask" aria-hidden>
          <span className="split-word">{profile.firstName}</span>
        </span>{' '}
        <span className="split-mask" aria-hidden>
          <span className="split-word">{profile.lastName}</span>
        </span>
      </h1>
      <div className="panel__shade" aria-hidden />
    </section>
  )
}
