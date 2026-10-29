'use client'

import { useEffect, useState } from 'react'

type Props = { text: string; label: string; done: string; className?: string }

/** copies a summary, with its prompt, for the reader to paste into their own Claude */
export function CopyForClaude({ text, label, done, className = 'lab__btn' }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2600)
    return () => window.clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // older browsers and non-secure contexts: a hidden textarea and the old command
      const area = document.createElement('textarea')
      area.value = text
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
  }

  return (
    <button type="button" className={className} onClick={copy} data-on={copied || undefined}>
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  )
}
