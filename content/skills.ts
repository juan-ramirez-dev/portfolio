import { cases, type Case } from './cases'
import type { T } from './i18n'

export type Colour = 'yellow' | 'blue' | 'red' | 'black' | 'paper'

export type Skill = {
  id: string
  n: string
  /** separator headline, one entry per line */
  title: T[]
  label: T
  /** the one sentence printed on the separator */
  line: T
  /** separator background */
  colour: Colour
  /** case pages that follow the separator */
  page: 'paper' | 'black'
  /** diagrams, numbers and highlights on those pages */
  accent: Colour
  cases: Case[]
}

const pick = (...ids: string[]) => ids.map((id) => cases.find((c) => c.id === id)!)

// Colours alternate so a page never follows a separator of its own colour.
// Order is weight: fintech first, then AI, backend, CI/CD and micro-frontends.
export const skills: Skill[] = [
  {
    id: 'fintech',
    n: '01',
    title: [
      { en: 'Fintech &', es: 'Fintech' },
      { en: 'payments', es: 'y pagos' },
    ],
    label: { en: 'Fintech & payments', es: 'Fintech y pagos' },
    line: {
      en: 'Real money, real cards, phones with no signal — flows that hold up.',
      es: 'Dinero real, tarjetas reales, celulares sin señal: flujos que aguantan.',
    },
    colour: 'blue',
    page: 'paper',
    accent: 'blue',
    cases: pick('stripe', 'offline-wallet'),
  },
  {
    id: 'ai',
    n: '02',
    title: [
      { en: 'Building', es: 'Construir' },
      { en: 'with AI', es: 'con IA' },
    ],
    label: { en: 'Building with AI', es: 'Construir con IA' },
    line: {
      en: 'Agents do the typing. I own the architecture, the review and the result.',
      es: 'Los agentes escriben. La arquitectura, la revisión y el resultado son míos.',
    },
    colour: 'red',
    page: 'paper',
    accent: 'red',
    cases: pick('build-loop', 'neura', 'ai-in-product'),
  },
  {
    id: 'backend',
    n: '03',
    title: [
      { en: 'Backend', es: 'Backend' },
      { en: '& data', es: 'y datos' },
    ],
    label: { en: 'Backend & data', es: 'Backend y datos' },
    line: {
      en: 'APIs that serve hundreds of people at once, on SQL, NoSQL and Redis.',
      es: 'APIs que atienden a cientos de personas a la vez, sobre SQL, NoSQL y Redis.',
    },
    colour: 'black',
    page: 'paper',
    accent: 'blue',
    cases: pick('api', 'redis'),
  },
  {
    id: 'ci-cd',
    n: '04',
    title: [{ en: 'CI/CD', es: 'CI/CD' }],
    label: { en: 'CI/CD', es: 'CI/CD' },
    line: {
      en: 'Every rule checked three times before anything reaches production.',
      es: 'Cada regla se revisa tres veces antes de que algo llegue a producción.',
    },
    colour: 'yellow',
    page: 'black',
    accent: 'yellow',
    cases: pick('checked-three-times'),
  },
  {
    id: 'micro-frontends',
    n: '05',
    title: [
      { en: 'Micro—', es: 'Micro—' },
      { en: 'frontends', es: 'frontends' },
    ],
    label: { en: 'Micro-frontends', es: 'Micro-frontends' },
    line: {
      en: 'Smaller deploys, a smaller bill, teams that ship on their own.',
      es: 'Despliegues más pequeños, una factura más pequeña, equipos que publican solos.',
    },
    colour: 'paper',
    page: 'black',
    accent: 'paper',
    cases: pick('mfe'),
  },
]

export const skillOf = (caseId: string) => skills.find((s) => s.cases.some((c) => c.id === caseId))!
