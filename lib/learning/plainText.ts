import type { Localized } from '@/content/i18n'
import type { Chapter, Course, Part } from '@/content/learning'

type Copy = { prompt: string; keyIdea: string; week: string }

const partText = (p: Localized<Part>, n: number, keyIdea: string) =>
  [`## ${String(n).padStart(2, '0')} · ${p.title}`, `${keyIdea}: ${p.key}`, ...p.points.map((pt) => `- ${pt}`)].join('\n')

/**
 * What "Copy for Claude" puts on the clipboard: a prompt, the official transcript and
 * the summary in Markdown. Pass `only` to copy a single part.
 */
export function plainText(course: Localized<Course>, chapter: Localized<Chapter>, copy: Copy, only?: number) {
  const name = `${copy.week} ${chapter.n}`
  const prompt = copy.prompt
    .replace('{chapter}', name)
    .replace('{course}', course.name)
    .replace('{provider}', course.provider)
    .replace('{transcript}', chapter.sources.transcript)
  const parts = chapter.parts
    .map((p, i) => ({ p, n: i + 1 }))
    .filter(({ n }) => only === undefined || n === only)
    .map(({ p, n }) => partText(p, n, copy.keyIdea))
  return [prompt, `# ${course.name} · ${name}: ${chapter.cover.title.join(' ')}`, ...parts].join('\n\n')
}
