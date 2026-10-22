import { chapters } from './chapters'

// Every section the watch tracks. Station i sits on hour index i of the dial.
export type Station = { id: string; label: string; numeral: string }

export const stations: Station[] = [
  { id: 'cover', label: 'Cover', numeral: '—' },
  { id: 'note', label: "Editor's note", numeral: '—' },
  ...chapters.map((c) => ({ id: c.id, label: c.title, numeral: c.roman })),
  { id: 'index', label: 'The index', numeral: '—' },
  { id: 'calibre', label: 'The calibre', numeral: '—' },
  { id: 'colophon', label: 'Colophon', numeral: '—' },
]
