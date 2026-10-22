import { Fragment, type ElementType } from 'react'

type Props = {
  text: string
  /** words inside this phrase render in italic */
  emphasis?: string
  as?: ElementType
  className?: string
}

/** Headline whose words rise out of a mask (driven by <Animations>). */
export function SplitText({ text, emphasis, as: Tag = 'h2', className }: Props) {
  const emphasised = new Set(emphasis?.toLowerCase().split(' ') ?? [])
  return (
    <Tag className={className} data-split aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="split-mask" aria-hidden>
            <span className={`split-word${emphasised.has(word.toLowerCase()) ? ' italic text-[var(--accent)]' : ''}`}>
              {word}
            </span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  )
}

/** Paragraph whose words brighten as it scrolls through the viewport. */
export function ScrubWords({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className} data-scrub-words>
      {text.split(' ').map((word, i) => (
        <span key={i} className="scrub-word">
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
