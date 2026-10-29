import type { T } from './i18n'

export type Project = {
  name: string
  kind: T
  line: T
  stack: (string | T)[]
  href: string
}

export const projects: Project[] = [
  {
    name: 'Lucka',
    kind: { en: 'Desktop app · AI', es: 'App de escritorio · IA' },
    line: {
      en: 'Personal finance that lives on your machine. Say what you spent; local AI writes it down.',
      es: 'Finanzas personales que viven en tu máquina. Dices lo que gastaste; una IA local lo anota.',
    },
    stack: ['Tauri', 'Rust', 'SQLite', 'Whisper', 'llama.cpp'],
    href: 'https://juan-ramirez-dev.github.io/lucka-landing/',
  },
  {
    name: 'Lexio',
    kind: { en: 'Desktop app · AI', es: 'App de escritorio · IA' },
    line: {
      en: 'English from your own readings and meetings. Swipe the phrases you want; AI writes a lesson and exercises for each.',
      es: 'Inglés desde tus propias lecturas y reuniones. Deslizas las frases que quieres; la IA escribe una lección y ejercicios para cada una.',
    },
    stack: ['Tauri', 'Rust', 'SQLite', 'llama.cpp', { en: '4 AI providers', es: '4 proveedores de IA' }],
    href: 'https://juan-ramirez-dev.github.io/lexio-landing/',
  },
  {
    name: 'Mercado Pago template',
    kind: { en: 'Open source', es: 'Open source' },
    line: {
      en: 'The Mercado Pago checkout I used at GooDev, published for other developers.',
      es: 'El checkout de Mercado Pago que usé en GooDev, publicado para otros desarrolladores.',
    },
    stack: ['Next.js', 'MongoDB', 'Mercado Pago'],
    href: 'https://github.com/juan-ramirez-dev/mercado-pago-template-nextjs',
  },
  {
    name: 'Next + Supabase template',
    kind: { en: 'Open source', es: 'Open source' },
    line: {
      en: 'Day one of every project: auth, role guards, CI, migrations and agent rules.',
      es: 'El día uno de cada proyecto: auth, guards por rol, CI, migraciones y reglas para agentes.',
    },
    stack: ['Next.js', 'Supabase', 'GitHub Actions'],
    href: 'https://github.com/juan-ramirez-dev/next-supabase-template',
  },
]
