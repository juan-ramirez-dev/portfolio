import type { T } from '../i18n'
import type { Colour } from '../skills'

/** interactive pieces a part can show, see components/learning/widgets */
export type WidgetId =
  | 'prompt'
  | 'blackbox'
  | 'bits'
  | 'ascii'
  | 'rgb'
  | 'phonebook'
  | 'pseudocode'
  | 'abstraction'
  | 'loops'

/** one screen of a chapter: an idea, something to touch, a few lines */
export type Part = {
  id: string
  title: T
  /** the one sentence to remember */
  key: T
  /** page colour; neighbours never share one */
  colour: Colour
  widget?: WidgetId
  /** 2–4 short lines. **bold** and `code` are allowed */
  points: T[]
}

export type Chapter = {
  /** what the course calls it: '0', '1', 'AI' */
  n: string
  slug: T
  colour: Colour
  /** ISO date, for structured data and the sitemap */
  published: string
  seo: { title: T; description: T }
  /** `word` is spelled in light bulbs next to the title */
  cover: { kicker: T; title: T[]; line: T; word?: string }
  /** the paragraph search engines read first */
  intro: T
  sources: { week: string; notes: string; transcript: string; video: string }
  parts: Part[]
}

export type Week = {
  n: string
  title: T
  /** set once the chapter is written */
  chapter?: Chapter
}

export type Course = {
  id: string
  slug: T
  name: string
  title: T
  provider: string
  url: string
  colour: Colour
  line: T
  seo: { title: T; description: T }
  weeks: Week[]
}
