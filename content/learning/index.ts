import { HOME, LOCALES, type Locale } from '../i18n'
import { cs50 } from './cs50'
import type { Chapter, Course } from './types'

export type { Chapter, Course, Part, Week, WidgetId } from './types'

export const courses: Course[] = [cs50]

/** the section's own slug in each language */
export const SECTION: Record<Locale, string> = { en: 'learning', es: 'aprendizaje' }

/** paths are relative to the basePath and end in a slash, like trailingSlash builds them */
export function learningPath(lang: Locale, course?: Course, chapter?: Chapter) {
  let path = `${HOME[lang]}${SECTION[lang]}/`
  if (course) path += `${course.slug[lang]}/`
  if (chapter) path += `${chapter.slug[lang]}/`
  return path
}

export const chaptersOf = (course: Course) => course.weeks.flatMap((w) => (w.chapter ? [w.chapter] : []))

export const findCourse = (lang: Locale, slug: string) => courses.find((c) => c.slug[lang] === slug)

export const findChapter = (lang: Locale, course: Course, slug: string) =>
  chaptersOf(course).find((ch) => ch.slug[lang] === slug)

type Pair = Record<Locale, string>

/** every page in both languages: drives the language switch, hreflang and the sitemap */
export function allPages(): Pair[] {
  const both = (fn: (lang: Locale) => string) =>
    Object.fromEntries(LOCALES.map((l) => [l, fn(l)])) as Pair
  return [
    both((l) => HOME[l]),
    both((l) => learningPath(l)),
    ...courses.flatMap((c) => [
      both((l) => learningPath(l, c)),
      ...chaptersOf(c).map((ch) => both((l) => learningPath(l, c, ch))),
    ]),
  ]
}

/** the same page in the other language, or that language's home */
export function alternatePath(pathname: string, from: Locale) {
  const to: Locale = from === 'en' ? 'es' : 'en'
  const here = pathname.endsWith('/') ? pathname : `${pathname}/`
  return allPages().find((p) => p[from] === here)?.[to] ?? HOME[to]
}
