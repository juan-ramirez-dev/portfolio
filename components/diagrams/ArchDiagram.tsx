'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import type { DiagramEdge, DiagramNode } from '@/content/chapters'

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
  return { d: `M${p0.x} ${p0.y} C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`, start: p0, end: p3, mid }
}

type Props = { nodes: DiagramNode[]; edges: DiagramEdge[]; figure: string; caption: string }

export function ArchDiagram({ nodes, edges, figure, caption }: Props) {
  const ref = useRef<HTMLElement>(null)
  const gridId = `grid-${figure.replace(/\W/g, '-')}`
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const routes = edges.map((e) => ({ edge: e, ...route(byId[e.from], byId[e.to]) }))

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const root = ref.current!
      const solid = root.querySelectorAll<SVGPathElement>('[data-edge="solid"]')
      solid.forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
      })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 78%', end: 'bottom 55%', scrub: 0.6 },
      })
      tl.from(root.querySelectorAll('[data-node]'), { opacity: 0, y: 18, duration: 0.5, stagger: 0.12 }, 0)
        .to(solid, { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: 'none' }, 0.25)
        .from(root.querySelectorAll('[data-edge="dashed"], [data-port]'), { opacity: 0, duration: 0.4, stagger: 0.05 }, 0.5)
        .from(root.querySelectorAll('[data-edge-label]'), { opacity: 0, duration: 0.3, stagger: 0.05 }, 0.8)
        .from(root.querySelectorAll('[data-packet]'), { opacity: 0, duration: 0.2 }, 1.1)
    },
    { scope: ref },
  )

  return (
    <figure ref={ref} className="diagram">
      <div className="diagram__scroller">
        <svg viewBox={`0 0 ${W} ${H}`} className="diagram__svg" role="img" aria-label={caption}>
          <defs>
            <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--line)" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill={`url(#${gridId})`} />
          {[
            [8, 8],
            [W - 8, 8],
            [8, H - 8],
            [W - 8, H - 8],
          ].map(([x, y], i) => (
            <path key={i} d={`M${x - 8} ${y} h16 M${x} ${y - 8} v16`} stroke="var(--muted)" strokeWidth="1" />
          ))}

          {routes.map(({ edge, d }, i) => (
            <path
              key={i}
              d={d}
              data-edge={edge.dashed ? 'dashed' : 'solid'}
              fill="none"
              stroke={edge.dashed ? 'var(--muted)' : 'var(--accent)'}
              strokeWidth={edge.dashed ? 1.2 : 1.6}
              strokeDasharray={edge.dashed ? '5 6' : undefined}
            />
          ))}
          {routes.map(({ edge, d }, i) =>
            edge.dashed ? null : (
              <circle key={i} r="3.2" fill="var(--accent)" data-packet>
                <animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
              </circle>
            ),
          )}
          {routes.map(({ end }, i) => (
            <circle key={i} cx={end.x} cy={end.y} r="3.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" data-port />
          ))}
          {routes.map(({ edge, mid }, i) =>
            edge.label ? (
              <text
                key={i}
                x={mid.x}
                y={mid.y - 8}
                textAnchor="middle"
                className="diagram__edge-label"
                data-edge-label
              >
                {edge.label}
              </text>
            ) : null,
          )}

          {nodes.map((n) => (
            <g key={n.id} transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}>
              <g data-node>
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="2"
                  fill="var(--surface)"
                  stroke={n.accent ? 'var(--accent)' : 'var(--line-strong)'}
                  strokeWidth={n.accent ? 1.6 : 1}
                />
                {n.accent && <path d={`M0 10 V0 H10 M${NODE_W - 10} ${NODE_H} H${NODE_W} V${NODE_H - 10}`} stroke="var(--accent)" strokeWidth="3" fill="none" />}
                <text x={NODE_W / 2} y={n.sub ? 29 : 38} textAnchor="middle" className="diagram__node-label">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={NODE_W / 2} y="48" textAnchor="middle" className="diagram__node-sub">
                    {n.sub}
                  </text>
                )}
              </g>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="caption">
        <span className="caption__fig">Fig. {figure}</span> {caption}
      </figcaption>
    </figure>
  )
}
