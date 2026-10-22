'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

let lenisInstance: Lenis | null = null
export const getLenis = () => lenisInstance

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { duration: 1.6, force: true })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function SmoothScroll() {
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }
    document.fonts?.ready.then(refresh)
    const late = window.setTimeout(refresh, 600)

    if (prefersReducedMotion()) return () => window.clearTimeout(late)

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.clearTimeout(late)
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}
