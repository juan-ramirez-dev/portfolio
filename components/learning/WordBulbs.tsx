const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1]

/** a word spelled in bytes, one row of bulbs per letter, lighting up one by one (CSS only) */
export function WordBulbs({ word }: { word: string }) {
  let i = 0
  return (
    <div className="word-bulbs" role="img" aria-label={`${word}: ${[...word].map((c) => c.charCodeAt(0)).join(', ')}`}>
      {[...word].map((ch, row) => {
        const code = ch.charCodeAt(0)
        return (
          <div key={row} className="word-bulbs__row">
            {WEIGHTS.map((w) => {
              const on = (code & w) !== 0
              return (
                <span
                  key={w}
                  className="bulb"
                  data-on={on || undefined}
                  style={on ? ({ '--i': i++ } as React.CSSProperties) : undefined}
                />
              )
            })}
            <span className="word-bulbs__char">{ch}</span>
            <span className="word-bulbs__code">{code}</span>
          </div>
        )
      })}
    </div>
  )
}
