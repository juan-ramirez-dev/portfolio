import { notFound } from 'next/navigation'
import { getContent } from '@/content'
import { localize, LOCALES, type Locale } from '@/content/i18n'
import { chaptersOf, courses, findChapter, findCourse, learningPath } from '@/content/learning'
import { pageMetadata } from '@/lib/metadata'

const SUFFIX = ' | Juan Ramírez'

/** the same page in every language */
export const pathsOf = (fn: (lang: Locale) => string) =>
  Object.fromEntries(LOCALES.map((l) => [l, fn(l)])) as Record<Locale, string>

export function resolveCourse(lang: Locale, slug: string) {
  const course = findCourse(lang, slug)
  if (!course) notFound()
  return course
}

export function resolveChapter(lang: Locale, courseSlug: string, chapterSlug: string) {
  const course = resolveCourse(lang, courseSlug)
  const chapter = findChapter(lang, course, chapterSlug)
  if (!chapter) notFound()
  return { course, chapter }
}

export const courseParams = (lang: Locale) => courses.map((c) => ({ course: c.slug[lang] }))

export const chapterParams = (lang: Locale) =>
  courses.flatMap((c) => chaptersOf(c).map((ch) => ({ course: c.slug[lang], chapter: ch.slug[lang] })))

export function indexMetadata(lang: Locale) {
  const { meta } = getContent(lang).ui.learning
  return pageMetadata({ lang, ...meta, paths: pathsOf((l) => learningPath(l)) })
}

export function courseMetadata(lang: Locale, slug: string) {
  const course = resolveCourse(lang, slug)
  const seo = localize(course.seo, lang)
  return pageMetadata({
    lang,
    title: seo.title + SUFFIX,
    description: seo.description,
    paths: pathsOf((l) => learningPath(l, course)),
  })
}

export function chapterMetadata(lang: Locale, courseSlug: string, chapterSlug: string) {
  const { course, chapter } = resolveChapter(lang, courseSlug, chapterSlug)
  const seo = localize(chapter.seo, lang)
  return pageMetadata({
    lang,
    title: seo.title + SUFFIX,
    description: seo.description,
    paths: pathsOf((l) => learningPath(l, course, chapter)),
    type: 'article',
    published: chapter.published,
  })
}
