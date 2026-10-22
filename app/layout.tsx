import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'
import { SmoothScroll } from '@/components/scroll/SmoothScroll'
import { WatchRail } from '@/components/watch/WatchRail'

const display = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-display',
})
const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Juan Ramírez — The Architecture Issue',
  description: 'Software architecture, payment systems and delivery pipelines by Juan Ramírez.',
}

export const viewport: Viewport = {
  themeColor: '#111112',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        <WatchRail />
        <main className="main">{children}</main>
      </body>
    </html>
  )
}
