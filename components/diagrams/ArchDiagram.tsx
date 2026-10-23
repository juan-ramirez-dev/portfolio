'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import type { DiagramEdge, DiagramNode } from '@/content/cases'

const W = 1000
const H = 520
const NODE_W = 184
const NODE_H = 66

type Point = { x: number; y: number }

// Connects the facing sides of two nodes with a smooth S-curve.
function route(a: DiagramNode, b: DiagramNode) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const horizontal = Math.abs(dx) / NODE_W >= Math.abs(dy) / NODE_H
  let p0: Point, p3: Point, p1: Point, p2: Point
  if (horizontal) {
    const s = Math.sign(dx) || 1
    p0 = { x: a.x + (s * NODE_W) / 2, y: a.y }
    p3 = { x: b.x - (s * NODE_W) / 2, y: b.y }
    const mx = (p0.x + p3.x) / 2
    p1 = { x: mx, y: p0.y }
    p2 = { x: mx, y: p3.y }
  } else {
    const s = Math.sign(dy) || 1
    p0 = { x: a.x, y: a.y + (s * NODE_H) / 2 }
    p3 = { x: b.x, y: b.y - (s * NODE_H) / 2 }
    const my = (p0.y + p3.y) / 2
    p1 = { x: p0.x, y: my }
    p2 = { x: p3.x, y: my }
  }
  const mid = {
    x: (p0.x + 3 * p1.x + 3 * p2.x + p3.x) / 8,
    y: (p0.y + 3 * p1.y + 3 * p2.y + p3.y) / 8,
  }
  return { d: `M${p0.x} ${p0.y} C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`, end: p3, mid }
}

type Props = { nodes: DiagramNode[]; edges: DiagramEdge[]; story?: string[]; figure: string; caption: string }

/**
 * Architecture that assembles itself as you scroll: one node per step, each edge
 * drawn once both its ends exist, with a running line of narration underneath.
 * The drawing holds still (sticky) while the steps play.
 */
export function ArchDiagram({ nodes, edges, story, figure, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const order = Object.fromEntries(nodes.map((n, i) => [n.id, i]))
  const routes = edges.map((e) => ({
    edge: e,
    step: Math.max(order[e.from], order[e.to]),
    ...route(byId[e.from], byId[e.to]),
  }))
  const lines = nodes.map((n, i) => story?.[i] ?? `${n.label} — ${n.sub ?? ''}`)
  const steps = nodes.length

  useGSAP(
    () => {
      const root = ref.current!
      const q = (sel: string) => Array.from(root.querySelectorAll<SVGElement | HTMLElement>(sel))
      const nodeEls = q('[data-node]')
      const lineEls = q('[data-line]')
      const count = root.querySelector<HTMLElement>('[data-count]')!
      const scroller = root.querySelector<HTMLElement>('.stage__scroller')!

      let current = -1
      const setStep = (k: number) => {
        if (k === current) return
        current = k
        nodeEls.forEach((el, i) => el.toggleAttribute('data-current', i === k))
        lineEls.forEach((el, i) => el.toggleAttribute('data-on', i === k))
        count.textContent = String(k + 1).padStart(2, '0')
        // narrow screens scroll the drawing sideways: keep the new node in view
        const overflow = scroller.scrollWidth - scroller.clientWidth
        if (overflow > 0) {
          const left = (nodes[k].x / W) * scroller.scrollWidth - scroller.clientWidth / 2
          scroller.scrollTo({ left: Math.max(0, Math.min(overflow, left)), behavior: 'smooth' })
        }
      }

      if (prefersReducedMotion()) {
        root.setAttribute('data-static', '')
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top 40%', end: 'bottom bottom', scrub: 0.5 },
        onUpdate: () => setStep(Math.min(steps - 1, Math.floor(tl.time() + 0.15))),
      })

      // nodes wait as a faint blueprint until their step
      nodeEls.forEach((el, i) => tl.from(el, { opacity: 0.1, y: 10, duration: 0.5, ease: 'power2.out' }, i))
      routes.forEach(({ edge, step }, j) => {
        const path = root.querySelector<SVGPathElement>(`[data-path="${j}"]`)!
        if (edge.dashed) {
          tl.from(path, { opacity: 0, duration: 0.4 }, step + 0.35)
        } else {
          const len = path.getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          tl.to(path, { strokeDashoffset: 0, duration: 0.55 }, step + 0.3)
        }
        tl.from(q(`[data-extra="${j}"]`), { opacity: 0, duration: 0.25 }, step + 0.75)
      })
      // hold the finished drawing for a beat before the page moves on
      tl.to({}, { duration: 0.8 })
      setStep(0)
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="stage" style={{ ['--steps' as string]: steps }}>
      <figure className="stage__sticky">
        <div className="stage__scroller">
          <svg viewBox={`0 0 ${W} ${H}`} className="stage__svg" role="img" aria-label={caption}>
            {routes.map(({ edge, d }, j) => (
              <path
                key={j}
                d={d}
                data-path={j}
                fill="none"
                stroke={edge.dashed ? 'var(--line-strong)' : 'var(--accent)'}
                strokeWidth={edge.dashed ? 1.2 : 1.8}
                strokeDasharray={edge.dashed ? '5 6' : undefined}
              />
            ))}
            {routes.map(({ edge, d }, j) =>
              edge.dashed ? null : (
                <circle key={j} r="3.6" fill="var(--accent)" data-extra={j}>
                  <animateMotion dur={`${2.4 + (j % 3) * 0.5}s`} begin={`${j * 0.35}s`} repeatCount="indefinite" path={d} />
                </circle>
              ),
            )}
            {routes.map(({ end }, j) => (
              <circle key={j} cx={end.x} cy={end.y} r="3.5" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.4" data-extra={j} />
            ))}
            {routes.map(({ edge, mid }, j) =>
              edge.label ? (
                <text key={j} x={mid.x} y={mid.y - 9} textAnchor="middle" className="stage__edge-label" data-extra={j}>
                  {edge.label}
                </text>
              ) : null,
            )}

            {nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}>
                <g data-node className={n.accent ? 'node node--accent' : 'node'}>
                  <rect width={NODE_W} height={NODE_H} className="node__box" />
                  <text x="16" y={n.sub ? 30 : 39} className="node__label">
                    {n.label}
                  </text>
                  {n.sub && (
                    <text x="16" y="49" className="node__sub">
                      {n.sub}
                    </text>
                  )}
                </g>
              </g>
            ))}
          </svg>
        </div>

        <figcaption className="stage__foot">
          <span className="stage__count">
            <b data-count>01</b> / {String(steps).padStart(2, '0')}
          </span>
          <ol className="stage__story">
            {lines.map((line, i) => (
              <li key={i} data-line data-on={i === 0 ? '' : undefined}>
                {line}
              </li>
            ))}
          </ol>
          <span className="stage__fig">
            Fig. {figure} — {caption}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
