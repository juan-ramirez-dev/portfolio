'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { stations } from '@/content/stations'
import { getLenis, scrollToId } from '@/components/scroll/SmoothScroll'
import { Watch } from './Watch'
import { drive } from './drive'

const pad = (n: number) => String(n).padStart(2, '0')

export function WatchRail() {
  const floatRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => drive.subscribe(() => setActive(drive.get().index)), [])

  // Each station reports its progress to the drive while it crosses mid-screen.
  useGSAP(() => {
    stations.forEach((station, i) => {
      const el = document.getElementById(station.id)
      if (!el) return
      const report = (self: ScrollTrigger) => {
        if (self.isActive) drive.set(i, self.progress)
      }
      ScrollTrigger.create({
        trigger: el,
        start: i === 0 ? 'top top' : 'top 55%',
        end: 'bottom 55%',
        onUpdate: report,
        onToggle: report,
      })
    })
  })

  // The hero watch flies into the rail slot while the cover is scrolled.
  useGSAP(() => {
    const hero = document.getElementById('cover')
    const heroSlot = document.querySelector<HTMLElement>('[data-hero-slot]')
    const sticky = heroSlot?.closest<HTMLElement>('[data-hero-sticky]')
    const float = floatRef.current
    const slot = slotRef.current
    if (!hero || !heroSlot || !sticky || !float || !slot) return

    const m = { hx: 0, hy: 0, hs: 1, rx: 0, ry: 0, rs: 1 }
    const measure = () => {
      const h = heroSlot.getBoundingClientRect()
      const s = sticky.getBoundingClientRect()
      const r = slot.getBoundingClientRect()
      Object.assign(m, { hx: h.left, hy: h.top - s.top, hs: h.width, rx: r.left, ry: r.top, rs: r.width })
      gsap.set(float, { width: m.hs, height: m.hs })
    }
    measure()
    ScrollTrigger.addEventListener('refreshInit', measure)

    gsap.set(float, { autoAlpha: 1 })
    const tl = gsap.timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true },
    })
    tl.fromTo(
      float,
      { x: () => m.hx, y: () => m.hy, scale: 1 },
      { x: () => m.rx, y: () => m.ry, scale: () => m.rs / m.hs, ease: 'power2.inOut', duration: 1 },
      0,
    )
      .fromTo(innerRef.current, { rotateX: 24, rotateZ: -14 }, { rotateX: 0, rotateZ: 0, ease: 'power2.inOut', duration: 1 }, 0)
      .to(float.querySelector('[data-bracelet]'), { opacity: 0, ease: 'power1.in', duration: 0.55 }, 0)
      .fromTo(
        panelRef.current,
        { clipPath: 'inset(0% 0% 0% 100%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.4 },
        0.6,
      )

    return () => ScrollTrigger.removeEventListener('refreshInit', measure)
  })

  // Hands follow the drive with a little inertia, like a sweeping movement.
  useEffect(() => {
    const svg = floatRef.current?.querySelector('svg')
    if (!svg) return
    const hourHand = svg.querySelector('[data-hand="hour"]')
    const minuteHand = svg.querySelector('[data-hand="minute"]')
    const bezel = svg.querySelector('[data-bezel]')
    const date = svg.querySelector('[data-date]')
    const indices = Array.from(svg.querySelectorAll<SVGGElement>('[data-index]'))
    const ease = prefersReducedMotion() ? 1 : 0.08

    let h = 0
    let m = 0
    let b = 0
    let lastIndex = -1
    let raf = 0
    const loop = () => {
      const { index, local } = drive.get()
      const t = index + local
      h += (t * 30 - h) * ease
      m += (t * 360 - m) * ease
      b += (-index * 6 - b) * ease
      hourHand?.setAttribute('transform', `rotate(${h})`)
      minuteHand?.setAttribute('transform', `rotate(${m})`)
      bezel?.setAttribute('transform', `rotate(${b})`)
      if (readoutRef.current) {
        readoutRef.current.textContent = `${pad(index === 0 ? 12 : index)}:${pad(Math.min(59, Math.floor(local * 60)))}`
      }
      if (index !== lastIndex) {
        lastIndex = index
        if (date) date.textContent = pad(index + 1)
        indices.forEach((el) => el.setAttribute('data-active', String(Number(el.dataset.index) === index % 12)))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    getLenis()?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const go = (id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <aside className="rail" aria-label="Chapters">
        <div ref={panelRef} className="rail__panel">
          <div className="rail__head">
            <span>Cal. JR—26</span>
            <span>Contents</span>
          </div>
          <div className="rail__slot-space" />
          <p className="rail__readout">
            <span ref={readoutRef}>12:00</span>
            <span>{stations[active]?.numeral !== '—' ? `Ch. ${stations[active].numeral}` : 'Feature'}</span>
          </p>
          <ol className="rail__list">
            {stations.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-active={i === active}
                  data-past={i < active}
                  onClick={(e) => {
                    e.preventDefault()
                    go(s.id)
                  }}
                >
                  <span className="rail__num">{pad(i + 1)}</span>
                  <span className="rail__label">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="rail__foot">Scroll to wind</p>
        </div>
        <button ref={slotRef} className="rail__slot" aria-label="Open the chapter dial" onClick={() => setMenuOpen(true)} />
      </aside>

      <div ref={floatRef} className="watch-float" aria-hidden>
        <div ref={innerRef} className="watch-float__inner">
          <Watch bracelet liveSeconds hour={0} minute={0} date="01" active={0} />
        </div>
      </div>

      <div className="dial-menu theme-bezel" data-open={menuOpen} aria-hidden={!menuOpen}>
        <div className="dial-menu__head">
          <span>Contents</span>
          <button onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
            Close
          </button>
        </div>
        <ol className="dial-menu__list">
          {stations.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-active={i === active}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault()
                  go(s.id)
                }}
              >
                <span className="dial-menu__num">{s.numeral !== '—' ? s.numeral : pad(i + 1)}</span>
                <span className="dial-menu__label">{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
