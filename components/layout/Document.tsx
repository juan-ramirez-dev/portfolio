import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import '@/app/globals.css'
import { SmoothScroll } from '@/components/scroll/SmoothScroll'
import { RunningHead } from '@/components/layout/RunningHead'
import { getContent } from '@/content'
import { HOME, type Locale } from '@/content/i18n'

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export function metadataFor(lang: Locale): Metadata {
  const { ui } = getContent(lang)
  return {
    metadataBase: new URL('https://juan-ramirez-dev.github.io'),
    title: ui.meta.title,
    description: ui.meta.description,
    alternates: {
      canonical: `/portfolio${HOME[lang]}`,
      languages: { en: `/portfolio${HOME.en}`, es: `/portfolio${HOME.es}` },
    },
  }
}

/** The <html> shell shared by each language's root layout. */
export function Document({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        <RunningHead lang={lang} />
        <main className="main">{children}</main>
      </body>
    </html>
  )
}
