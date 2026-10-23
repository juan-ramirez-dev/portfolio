import type { Metadata, Viewport } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'
import { SmoothScroll } from '@/components/scroll/SmoothScroll'
import { RunningHead } from '@/components/layout/RunningHead'

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Juan Ramírez — Software Architect',
  description: 'Micro-frontends, payment systems, microservices and delivery pipelines by Juan Ramírez.',
}

export const viewport: Viewport = {
  themeColor: '#f3f1ec',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        <RunningHead />
        <main className="main">{children}</main>
      </body>
    </html>
  )
}
