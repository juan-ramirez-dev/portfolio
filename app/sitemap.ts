import type { MetadataRoute } from 'next'
import { LOCALES } from '@/content/i18n'
import { allPages } from '@/content/learning'
import { absolute } from '@/lib/site'

export const dynamic = 'force-static'

// every page once per language, each listing its translations (hreflang for crawlers)
export default function sitemap(): MetadataRoute.Sitemap {
  return allPages().flatMap((page) =>
    LOCALES.map((lang) => ({
      url: absolute(page[lang]),
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, absolute(page[l])])) },
    })),
  )
}
