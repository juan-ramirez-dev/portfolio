export type Project = {
  name: string
  kind: string
  line: string
  stack: string[]
  href: string
}

export const projects: Project[] = [
  {
    name: 'Lucka',
    kind: 'Desktop app · AI',
    line: 'Personal finance that lives on your machine. Say what you spent; local AI writes it down.',
    stack: ['Tauri', 'Rust', 'SQLite', 'Whisper', 'llama.cpp'],
    href: 'https://juan-ramirez-dev.github.io/lucka-landing/',
  },
  {
    name: 'Lexio',
    kind: 'Desktop app · AI',
    line: 'Paste a reading, pick the phrases you want, and AI writes a lesson and exercises for each.',
    stack: ['Tauri', 'Rust', 'SQLite', '4 AI providers'],
    href: 'https://github.com/juan-ramirez-dev/random-english-terms',
  },
  {
    name: 'Mercado Pago template',
    kind: 'Open source',
    line: 'The Mercado Pago checkout I used at GooDev, published for other developers.',
    stack: ['Next.js', 'MongoDB', 'Mercado Pago'],
    href: 'https://github.com/juan-ramirez-dev/mercado-pago-template-nextjs',
  },
  {
    name: 'Next + Supabase template',
    kind: 'Open source',
    line: 'Day one of every project: auth, role guards, CI, migrations and agent rules.',
    stack: ['Next.js', 'Supabase', 'GitHub Actions'],
    href: 'https://github.com/juan-ramirez-dev/next-supabase-template',
  },
]
