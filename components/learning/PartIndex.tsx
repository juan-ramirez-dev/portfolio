'use client'

import { scrollToId } from '@/components/scroll/SmoothScroll'

type Props = { label: string; parts: { id: string; title: string }[] }

/** the chapter's table of contents on its cover */
export function PartIndex({ label, parts }: Props) {
  return (
    <nav className="lesson-cover__index" aria-label={label}>
      <p className="label">{label}</p>
      <ol className="contents">
        {parts.map((p, i) => (
          <li key={p.id}>
            <a
              href={`#${p.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(p.id)
              }}
            >
              <span className="contents__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="contents__t">{p.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
