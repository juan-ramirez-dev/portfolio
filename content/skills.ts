import { cases, type Case } from './cases'

export type Colour = 'yellow' | 'blue' | 'red' | 'black' | 'paper'

export type Skill = {
  id: string
  n: string
  /** separator headline, one entry per line */
  title: string[]
  label: string
  /** the one sentence printed on the separator */
  line: string
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
// Order is weight: AI first, then fintech, backend, CI/CD and micro-frontends.
export const skills: Skill[] = [
  {
    id: 'ai',
    n: '01',
    title: ['Building', 'with AI'],
    label: 'Building with AI',
    line: 'Agents do the typing. I own the architecture, the review and the result.',
    colour: 'red',
    page: 'black',
    accent: 'red',
    cases: pick('build-loop', 'neura', 'ai-in-product'),
  },
  {
    id: 'fintech',
    n: '02',
    title: ['Fintech &', 'payments'],
    label: 'Fintech & payments',
    line: 'Real money, real cards, phones with no signal — flows that hold up.',
    colour: 'blue',
    page: 'paper',
    accent: 'blue',
    cases: pick('stripe', 'offline-wallet'),
  },
  {
    id: 'backend',
    n: '03',
    title: ['Backend', '& data'],
    label: 'Backend & data',
    line: 'APIs, Postgres and Redis: the parts nobody sees and everything depends on.',
    colour: 'black',
    page: 'paper',
    accent: 'red',
    cases: pick('api', 'redis'),
  },
  {
    id: 'ci-cd',
    n: '04',
    title: ['CI/CD'],
    label: 'CI/CD',
    line: 'Every rule checked three times before anything reaches production.',
    colour: 'yellow',
    page: 'black',
    accent: 'yellow',
    cases: pick('checked-three-times'),
  },
  {
    id: 'micro-frontends',
    n: '05',
    title: ['Micro—', 'frontends'],
    label: 'Micro-frontends',
    line: 'Smaller deploys, a smaller bill, teams that ship on their own.',
    colour: 'paper',
    page: 'black',
    accent: 'paper',
    cases: pick('mfe'),
  },
]

export const skillOf = (caseId: string) => skills.find((s) => s.cases.some((c) => c.id === caseId))!
