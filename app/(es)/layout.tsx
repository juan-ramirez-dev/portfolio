import type { Viewport } from 'next'
import { Document, metadataFor } from '@/components/layout/Document'

export const metadata = metadataFor('es')

export const viewport: Viewport = {
  themeColor: '#f3f1ec',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="es">{children}</Document>
}
