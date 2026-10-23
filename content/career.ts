import type { T } from './i18n'

export type Job = {
  company: string | T
  role: string | T
  years: string | T
  /** what got built, in a few words */
  built: T
  /** links the row to its case page */
  caseId?: string
}

export const career: Job[] = [
  {
    company: 'Katapult Labs',
    role: 'Senior Full Stack Developer',
    years: { en: '2025 — Now', es: '2025 — Hoy' },
    built: { en: 'Payments, API and CI/CD, end to end', es: 'Pagos, API y CI/CD, de punta a punta' },
    caseId: 'stripe',
  },
  {
    company: 'Neura',
    role: 'Full Stack Developer',
    years: '2025',
    built: { en: 'An AI assistant from zero', es: 'Un asistente con IA desde cero' },
    caseId: 'neura',
  },
  {
    company: 'Devsu',
    role: 'Mobile & Frontend Developer',
    years: '2024 — 25',
    built: { en: 'Offline payments for a national wallet', es: 'Pagos sin conexión para una billetera nacional' },
    caseId: 'offline-wallet',
  },
  {
    company: 'GooDev',
    role: 'Full Stack Developer',
    years: '2023 — 24',
    built: { en: 'MySQL architecture and payment gateways', es: 'Arquitectura MySQL y pasarelas de pago' },
  },
  {
    company: 'Kuepa Edutech',
    role: 'Full Stack Developer',
    years: '2022 — 24',
    built: { en: 'Micro-frontends, real-time and Redis', es: 'Micro-frontends, tiempo real y Redis' },
    caseId: 'mfe',
  },
  {
    company: { en: 'Independent', es: 'Independiente' },
    role: { en: 'Web development tutor', es: 'Tutor de desarrollo web' },
    years: '2022 — 23',
    built: {
      en: 'Taught web development and helped students land jobs',
      es: 'Enseñé desarrollo web y ayudé a estudiantes a conseguir trabajo',
    },
  },
  {
    company: 'AKE lab',
    role: 'Frontend Developer',
    years: '2021 — 22',
    built: { en: 'Drag-and-drop interfaces, Node and Oracle on AWS', es: 'Interfaces drag-and-drop, Node y Oracle en AWS' },
  },
  {
    company: 'Editorial H&G',
    role: 'Frontend Developer',
    years: '2021',
    built: { en: 'React and Redux interfaces', es: 'Interfaces con React y Redux' },
  },
]
