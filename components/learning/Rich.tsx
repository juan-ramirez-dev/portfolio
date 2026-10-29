import { Fragment } from 'react'

/** a line of copy with **bold** and `code`, the only markup chapters use */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((chunk, i) => {
        if (chunk.startsWith('**')) return <strong key={i}>{chunk.slice(2, -2)}</strong>
        if (chunk.startsWith('`')) return <code key={i}>{chunk.slice(1, -1)}</code>
        return <Fragment key={i}>{chunk}</Fragment>
      })}
    </>
  )
}
