'use client'

import { useEffect, useId, useRef } from 'react'

type WatchProps = {
  /** hand angles in degrees, 0 = twelve o'clock */
  hour?: number
  minute?: number
  second?: number
  /** sweep the seconds hand in real time */
  liveSeconds?: boolean
  bezel?: number
  date?: string
  /** hour index (0–11) that glows */
  active?: number
  bracelet?: boolean
  className?: string
  label?: string
}

const HOURS = Array.from({ length: 12 }, (_, i) => i)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const RAYS = Array.from({ length: 90 }, (_, i) => i)
const LINKS = Array.from({ length: 7 }, (_, i) => i)

// Dial geometry (viewBox centred on 0,0)
const R_CASE = 198
const R_BEZEL = 188
const R_BEZEL_IN = 152
const R_DIAL = 146

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return { x: r * Math.cos(a), y: r * Math.sin(a) }
}

export function Watch({
  hour = 300,
  minute = 50,
  second = 0,
  liveSeconds = false,
  bezel = 0,
  date = '01',
  active = -1,
  bracelet = false,
  className,
  label = 'Wristwatch with a black bezel and an ivory dial',
}: WatchProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = (name: string) => `${name}-${uid}`
  const secondRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!liveSeconds || !secondRef.current) return
    let raf = 0
    const tick = () => {
      const s = (Date.now() / 1000) % 60
      secondRef.current?.setAttribute('transform', `rotate(${s * 6})`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [liveSeconds])

  return (
    <svg
      viewBox="-200 -200 400 400"
      overflow="visible"
      role="img"
      aria-label={label}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={id('steel')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f5f6" />
          <stop offset="0.35" stopColor="#a9adb2" />
          <stop offset="0.55" stopColor="#e6e8ea" />
          <stop offset="1" stopColor="#5d6065" />
        </linearGradient>
        <linearGradient id={id('brushed')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6c6f74" />
          <stop offset="0.25" stopColor="#c9ccd0" />
          <stop offset="0.5" stopColor="#8d9095" />
          <stop offset="0.75" stopColor="#d6d8db" />
          <stop offset="1" stopColor="#5f6267" />
        </linearGradient>
        <linearGradient id={id('polished')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b3d41" />
          <stop offset="0.45" stopColor="#f1f2f3" />
          <stop offset="0.6" stopColor="#9ea2a7" />
          <stop offset="1" stopColor="#2f3134" />
        </linearGradient>
        <radialGradient id={id('bezel')} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#2b2b2e" />
          <stop offset="0.6" stopColor="#121213" />
          <stop offset="1" stopColor="#050505" />
        </radialGradient>
        <radialGradient id={id('dial')} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#fbfaf6" />
          <stop offset="0.7" stopColor="#f1eee7" />
          <stop offset="1" stopColor="#d9d4c8" />
        </radialGradient>
        <linearGradient id={id('gold')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3d3b2" />
          <stop offset="0.5" stopColor="#d9a77c" />
          <stop offset="0.51" stopColor="#b17b52" />
          <stop offset="1" stopColor="#8d5b38" />
        </linearGradient>
        <linearGradient id={id('glare')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id('dialClip')}>
          <circle r={R_DIAL} />
        </clipPath>
        <filter id={id('handShadow')} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2.5" dy="3.5" stdDeviation="2" floodColor="#2b1a0d" floodOpacity="0.35" />
        </filter>
        <filter id={id('glow')} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {bracelet && (
        <g data-bracelet>
          {[-1, 1].map((dir) => (
            <g key={dir} transform={dir === 1 ? 'rotate(180)' : undefined}>
              <path d="M-118 -150 L-112 -214 Q0 -226 112 -214 L118 -150 Z" fill={`url(#${id('brushed')})`} />
              {LINKS.map((i) => {
                const y = -216 - i * 66
                return (
                  <g key={i} transform={`translate(0 ${y})`}>
                    <rect x="-108" y="-62" width="64" height="62" rx="3" fill={`url(#${id('brushed')})`} />
                    <rect x="44" y="-62" width="64" height="62" rx="3" fill={`url(#${id('brushed')})`} />
                    <rect x="-42" y="-62" width="84" height="62" rx="4" fill={`url(#${id('polished')})`} />
                    <rect x="-108" y="-2" width="216" height="3" fill="#1a1b1d" opacity="0.6" />
                  </g>
                )
              })}
            </g>
          ))}
        </g>
      )}

      {/* crown */}
      <g transform="rotate(60)">
        <rect x="-16" y={-R_CASE - 22} width="32" height="28" rx="5" fill={`url(#${id('brushed')})`} />
        {[-10, -5, 0, 5, 10].map((x) => (
          <line key={x} x1={x} y1={-R_CASE - 20} x2={x} y2={-R_CASE + 2} stroke="#4b4e52" strokeWidth="1.2" />
        ))}
      </g>

      {/* case */}
      <circle r={R_CASE} fill={`url(#${id('steel')})`} />
      <circle r={R_CASE - 4} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* rotating bezel */}
      <g data-bezel transform={`rotate(${bezel})`}>
        <circle r={R_BEZEL} fill={`url(#${id('bezel')})`} />
        <circle r={R_BEZEL - 1} fill="none" stroke="#000" strokeWidth="2" />
        <path d={`M-8 ${-R_BEZEL + 10} L8 ${-R_BEZEL + 10} L0 ${-R_BEZEL + 25} Z`} fill="#d9a77c" />
        {[10, 20, 30, 40, 50].map((n) => (
          <text
            key={n}
            transform={`rotate(${n * 6}) translate(0 ${-(R_BEZEL + R_BEZEL_IN) / 2})`}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#d8d2c6"
            fontSize="17"
            letterSpacing="1"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
          >
            {n}
          </text>
        ))}
        {[5, 15, 25, 35, 45, 55].map((n) => {
          const a = polar(R_BEZEL - 12, n * 6)
          const b = polar(R_BEZEL - 24, n * 6)
          return <line key={n} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#d9a77c" strokeWidth="2" />
        })}
      </g>

      {/* rehaut + dial */}
      <circle r={R_BEZEL_IN} fill="#2a2b2e" />
      <circle r={R_DIAL + 3} fill="#c9c4b8" />
      <circle r={R_DIAL} fill={`url(#${id('dial')})`} />
      <g clipPath={`url(#${id('dialClip')})`} opacity="0.5">
        {RAYS.map((i) => {
          const a = polar(R_DIAL, i * 4)
          const b = polar(R_DIAL, i * 4 + 2)
          return <path key={i} d={`M0 0 L${a.x} ${a.y} L${b.x} ${b.y} Z`} fill="#000" opacity={i % 2 ? 0.018 : 0.04} />
        })}
      </g>
      <circle r="98" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="22" />

      {/* minute track */}
      {MINUTES.filter((m) => m % 5).map((m) => {
        const a = polar(R_DIAL - 4, m * 6)
        const b = polar(R_DIAL - 9, m * 6)
        return <line key={m} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#8f8a7f" strokeWidth="0.9" />
      })}

      {/* applied indices */}
      {HOURS.map((h) => {
        const deg = h * 30
        if (h === 3) {
          return (
            <g key={h} data-index={h} className="w-idx" data-active={active === h}>
              <rect x="96" y="-12" width="30" height="24" fill="#fff" stroke={`url(#${id('gold')})`} strokeWidth="3" />
              <text
                data-date
                x="111"
                y="1"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fill="#151515"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
              >
                {date}
              </text>
            </g>
          )
        }
        const lume = polar(94, deg)
        return (
          <g key={h} data-index={h} className="w-idx" data-active={active === h}>
            <g transform={`rotate(${deg})`}>
              <rect x="-9" y="-136" width="5.5" height="34" rx="0.8" fill={`url(#${id('gold')})`} stroke="#7b4f30" strokeWidth="0.5" />
              <rect x="3.5" y="-136" width="5.5" height="34" rx="0.8" fill={`url(#${id('gold')})`} stroke="#7b4f30" strokeWidth="0.5" />
              <rect x="-7.6" y="-132" width="1.6" height="26" fill="#2b1d12" opacity="0.7" />
              <rect x="4.9" y="-132" width="1.6" height="26" fill="#2b1d12" opacity="0.7" />
            </g>
            <rect x={lume.x - 3.2} y={lume.y - 3.2} width="6.4" height="6.4" fill="#fdfcf8" stroke="#a49e90" strokeWidth="0.7" />
          </g>
        )
      })}

      {/* dial printing */}
      <text
        y="-58"
        textAnchor="middle"
        fontSize="24"
        letterSpacing="2.5"
        fill="#161616"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
      >
        RAMÍREZ
      </text>
      <text
        y="52"
        textAnchor="middle"
        fontSize="15"
        letterSpacing="2"
        fill="#161616"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
      >
        CALIBRE
      </text>
      <text
        y="67"
        textAnchor="middle"
        fontSize="7.5"
        letterSpacing="2"
        fill="#2a2a2a"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        ARCHITECTURE
      </text>

      {/* hands */}
      <g filter={`url(#${id('handShadow')})`}>
        <g data-hand="hour" transform={`rotate(${hour})`}>
          <path d="M0 -84 L-7.5 -26 L0 14 Z" fill="#f0c9a2" />
          <path d="M0 -84 L7.5 -26 L0 14 Z" fill="#a8714a" />
        </g>
        <g data-hand="minute" transform={`rotate(${minute})`}>
          <path d="M0 -130 L-6.5 -36 L0 16 Z" fill="#f0c9a2" />
          <path d="M0 -130 L6.5 -36 L0 16 Z" fill="#a8714a" />
        </g>
        <g data-hand="second" ref={secondRef} transform={`rotate(${second})`}>
          <rect x="-0.9" y="-138" width="1.8" height="170" fill="#c8956a" />
          <circle cy="26" r="3.5" fill="#c8956a" />
        </g>
        <circle r="7" fill={`url(#${id('gold')})`} />
        <circle r="2.4" fill="#5b3a22" />
      </g>

      {/* crystal glare */}
      <g clipPath={`url(#${id('dialClip')})`} style={{ pointerEvents: 'none' }}>
        <ellipse cx="-60" cy="-80" rx="150" ry="70" transform="rotate(-35 -60 -80)" fill={`url(#${id('glare')})`} opacity="0.55" />
      </g>
    </svg>
  )
}
