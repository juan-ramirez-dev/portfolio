import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import '@/app/globals.css'
import { SmoothScroll } from '@/components/scroll/SmoothScroll'
import { RunningHead } from '@/components/layout/RunningHead'
import { getContent } from '@/content'
import { HOME, type Locale } from '@/content/i18n'
import { pageMetadata } from '@/lib/metadata'
import { SITE_URL } from '@/lib/site'

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

/** the home's metadata; every other page overrides title, description and alternates */
export function metadataFor(lang: Locale): Metadata {
  const { ui } = getContent(lang)
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({ lang, title: ui.meta.title, description: ui.meta.description, paths: HOME }),
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
