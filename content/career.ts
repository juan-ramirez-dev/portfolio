export type Job = {
  company: string
  role: string
  years: string
  /** what got built, in a few words */
  built: string
  /** links the row to its case page */
  caseId?: string
}

export const career: Job[] = [
  {
    company: 'Katapult Labs',
    role: 'Senior Full Stack Developer',
    years: '2025 — Now',
    built: 'Payments, API and CI/CD, end to end',
    caseId: 'stripe',
  },
  { company: 'Neura', role: 'Full Stack Developer', years: '2025', built: 'An AI assistant from zero', caseId: 'neura' },
  {
    company: 'Devsu',
    role: 'Mobile & Frontend Developer',
    years: '2024 — 25',
    built: 'Offline payments for a national wallet',
    caseId: 'offline-wallet',
  },
  { company: 'GooDev', role: 'Full Stack Developer', years: '2023 — 24', built: 'MySQL architecture and payment gateways' },
  {
    company: 'Kuepa Edutech',
    role: 'Full Stack Developer',
    years: '2022 — 24',
    built: 'Micro-frontends, real-time and Redis',
    caseId: 'mfe',
  },
  {
    company: 'Independent',
    role: 'Web development tutor',
    years: '2022 — 23',
    built: 'Taught web development and helped students land jobs',
  },
  { company: 'AKE lab', role: 'Frontend Developer', years: '2021 — 22', built: 'Drag-and-drop interfaces, Node and Oracle on AWS' },
  { company: 'Editorial H&G', role: 'Frontend Developer', years: '2021', built: 'React and Redux interfaces' },
]
