import type { Metadata } from 'next'
import { LOCALES, type Locale } from '@/content/i18n'
import { BASE_PATH } from '@/lib/site'

type Page = {
  lang: Locale
  title: string
  description: string
  /** the same page in each language, relative to the basePath */
  paths: Record<Locale, string>
  type?: 'website' | 'article'
  published?: string
}

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_CO' }

/** title, description, canonical, hreflang and social cards for one page */
export function pageMetadata({ lang, title, description, paths, type = 'website', published }: Page): Metadata {
  const url = `${BASE_PATH}${paths[lang]}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${BASE_PATH}${paths[l]}`])),
        'x-default': `${BASE_PATH}${paths.en}`,
      },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: 'Juan Ramírez',
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      ...(published ? { publishedTime: published, authors: ['Juan Ramírez'] } : {}),
    },
    twitter: { card: 'summary', title, description },
  }
}

/** a <script type="application/ld+json"> body, safe against </script> in the copy */
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })
