import { Fragment, type ElementType } from 'react'

type Props = {
  text: string
  as?: ElementType
  className?: string
}

/** Headline whose words rise out of a mask (driven by <Animations>). */
export function SplitText({ text, as: Tag = 'h2', className }: Props) {
  return (
    <Tag className={className} data-split aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="split-mask" aria-hidden>
            <span className="split-word">{word}</span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  )
}
