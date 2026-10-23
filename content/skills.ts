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
export const skills: Skill[] = [
  {
    id: 'micro-frontends',
    n: '01',
    title: ['Micro—', 'frontends'],
    label: 'Micro-frontends',
    line: 'Splitting one frontend into many, so teams ship on their own clock.',
    colour: 'yellow',
    page: 'black',
    accent: 'yellow',
    cases: pick('mfe-platform'),
  },
  {
    id: 'payments',
    n: '02',
    title: ['Payment', 'gateways'],
    label: 'Payment gateways',
    line: 'Checkouts, marketplaces and webhooks that never charge twice.',
    colour: 'blue',
    page: 'paper',
    accent: 'blue',
    cases: pick('mercado-pago', 'stripe-connect'),
  },
  {
    id: 'microservices',
    n: '03',
    title: ['Micro—', 'services'],
    label: 'Microservices',
    line: 'Bounded contexts that talk in events, not in shared tables.',
    colour: 'black',
    page: 'paper',
    accent: 'red',
    cases: pick('event-bus'),
  },
  {
    id: 'mobile-fintech',
    n: '04',
    title: ['Mobile &', 'fintech'],
    label: 'Mobile & fintech',
    line: 'Money on devices that lose their connection.',
    colour: 'red',
    page: 'black',
    accent: 'red',
    cases: pick('offline-payments'),
  },
  {
    id: 'databases',
    n: '05',
    title: ['Data—', 'bases'],
    label: 'Databases',
    line: 'Ledgers, replicas and change streams that keep their promises.',
    colour: 'paper',
    page: 'black',
    accent: 'paper',
    cases: pick('ledger-data'),
  },
  {
    id: 'ci-cd',
    n: '06',
    title: ['CI/CD'],
    label: 'CI/CD',
    line: 'The boring, repeatable path from commit to production.',
    colour: 'yellow',
    page: 'black',
    accent: 'yellow',
    cases: pick('delivery'),
  },
]

export const skillOf = (caseId: string) => skills.find((s) => s.cases.some((c) => c.id === caseId))!
