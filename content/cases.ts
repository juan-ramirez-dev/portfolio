// PLACEHOLDER CONTENT — layout prototype only. Companies, metrics and copy get
// replaced with real data once the design is settled.

export type DiagramNode = {
  id: string
  label: string
  sub?: string
  /** center, in a 1000 × 520 drawing space */
  x: number
  y: number
  accent?: boolean
}

export type DiagramEdge = {
  from: string
  to: string
  label?: string
  dashed?: boolean
}

export type Metric = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export type Chapter = {
  id: string
  roman: string
  calibre: string
  title: string
  /** word of the title set in italic */
  emphasis: string
  kicker: string
  company: string
  role: string
  years: string
  problem: string
  pullQuote: string
  specs: { label: string; value: string }[]
  diagram: { caption: string; nodes: DiagramNode[]; edges: DiagramEdge[] }
  pipeline: string[]
  metrics: Metric[]
}

const lorem =
  'Placeholder brief. Describe the situation the team was in, the constraint that made it hard, and why the obvious solution was not enough. Two or three sentences that a senior engineer would nod along to.'

export const chapters: Chapter[] = [
  {
    id: 'micro-frontends',
    roman: 'I',
    calibre: 'CAL. 01',
    title: 'Micro-frontends that ship alone',
    emphasis: 'alone',
    kicker: 'Splitting a monolithic frontend so every team could deploy on its own clock.',
    company: '[Company A]',
    role: 'Frontend Architect',
    years: '20XX — 20XX',
    problem: lorem,
    pullQuote: 'One shell, many movements — each team winds its own.',
    specs: [
      { label: 'Movement', value: 'Module Federation' },
      { label: 'Complications', value: 'Shared auth · Routing · Design system' },
      { label: 'Case', value: 'React · TypeScript · Webpack' },
      { label: 'Resistance', value: 'Isolated failures per remote' },
    ],
    diagram: {
      caption: 'App shell composing independently deployed remotes at runtime.',
      nodes: [
        { id: 'browser', label: 'Browser', sub: 'user session', x: 110, y: 230 },
        { id: 'shell', label: 'App Shell', sub: 'host · routing · auth', x: 370, y: 230, accent: true },
        { id: 'cdn', label: 'CDN', sub: 'remoteEntry.js', x: 370, y: 430 },
        { id: 'checkout', label: 'Checkout MFE', sub: 'team payments', x: 640, y: 90 },
        { id: 'catalog', label: 'Catalog MFE', sub: 'team discovery', x: 640, y: 230 },
        { id: 'account', label: 'Account MFE', sub: 'team identity', x: 640, y: 370 },
        { id: 'ds', label: 'Design System', sub: 'shared singleton', x: 890, y: 230 },
      ],
      edges: [
        { from: 'browser', to: 'shell' },
        { from: 'cdn', to: 'shell', label: 'manifest', dashed: true },
        { from: 'shell', to: 'checkout' },
        { from: 'shell', to: 'catalog' },
        { from: 'shell', to: 'account' },
        { from: 'checkout', to: 'ds', dashed: true },
        { from: 'catalog', to: 'ds', dashed: true },
        { from: 'account', to: 'ds', dashed: true },
      ],
    },
    pipeline: ['Commit', 'Lint & types', 'Unit tests', 'Build remote', 'Contract check', 'Deploy to CDN'],
    metrics: [
      { value: 6, label: 'Teams deploying independently' },
      { value: 40, suffix: '%', label: 'Shorter release cycle' },
      { value: 0, label: 'Coordinated release trains' },
    ],
  },
  {
    id: 'offline-payments',
    roman: 'II',
    calibre: 'CAL. 02',
    title: 'Payments that survive the dark',
    emphasis: 'dark',
    kicker: 'Taking payments with no connection, and reconciling every cent once back online.',
    company: '[Company B]',
    role: 'Senior Software Engineer',
    years: '20XX — 20XX',
    problem: lorem,
    pullQuote: 'A payment is a promise. Offline, you keep it in a queue.',
    specs: [
      { label: 'Movement', value: 'Offline-first queue + sync' },
      { label: 'Complications', value: 'Idempotency keys · Retries · Reconciliation' },
      { label: 'Case', value: 'PWA · IndexedDB · Node' },
      { label: 'Resistance', value: 'Zero lost transactions' },
    ],
    diagram: {
      caption: 'Client-side queue, idempotent sync and nightly reconciliation.',
      nodes: [
        { id: 'pos', label: 'POS Client', sub: 'PWA', x: 110, y: 120 },
        { id: 'queue', label: 'Local Queue', sub: 'IndexedDB', x: 370, y: 120 },
        { id: 'sync', label: 'Sync Worker', sub: 'retry · idempotency', x: 630, y: 120, accent: true },
        { id: 'api', label: 'Payments API', sub: 'charges', x: 890, y: 120 },
        { id: 'psp', label: 'Card Processor', sub: 'authorize · capture', x: 890, y: 380 },
        { id: 'recon', label: 'Reconciliation', sub: 'settlement match', x: 630, y: 380 },
        { id: 'ledger', label: 'Ledger', sub: 'double entry', x: 370, y: 380 },
      ],
      edges: [
        { from: 'pos', to: 'queue', label: 'enqueue' },
        { from: 'queue', to: 'sync', label: 'when online' },
        { from: 'sync', to: 'api' },
        { from: 'api', to: 'psp', label: 'authorize' },
        { from: 'psp', to: 'recon', label: 'settlement', dashed: true },
        { from: 'recon', to: 'ledger' },
      ],
    },
    pipeline: ['Commit', 'Lint & types', 'Unit tests', 'Offline e2e', 'Canary', 'Production'],
    metrics: [
      { value: 99.9, decimals: 1, suffix: '%', label: 'Transactions reconciled automatically' },
      { value: 0, label: 'Payments lost offline' },
      { value: 72, suffix: 'h', label: 'Longest offline window supported' },
    ],
  },
  {
    id: 'mercado-pago',
    roman: 'III',
    calibre: 'CAL. 03',
    title: 'Mercado Pago, end to end',
    emphasis: 'end to end',
    kicker: 'A checkout integration built for LATAM payment methods and unreliable webhooks.',
    company: '[Company C]',
    role: 'Full-stack Engineer',
    years: '20XX — 20XX',
    problem: lorem,
    pullQuote: 'Trust the webhook, verify the webhook, then trust it again.',
    specs: [
      { label: 'Movement', value: 'Preferences API + IPN' },
      { label: 'Complications', value: 'Signature check · Idempotency · Refunds' },
      { label: 'Case', value: 'Next.js · Node · PostgreSQL' },
      { label: 'Resistance', value: 'Duplicate-safe event handling' },
    ],
    diagram: {
      caption: 'Preference creation, webhook verification and order fulfilment.',
      nodes: [
        { id: 'ui', label: 'Checkout UI', sub: 'web · mobile', x: 110, y: 230 },
        { id: 'bff', label: 'Payments BFF', sub: 'preferences', x: 370, y: 230 },
        { id: 'mp', label: 'Mercado Pago', sub: 'Checkout Pro', x: 640, y: 90, accent: true },
        { id: 'hook', label: 'Webhook Handler', sub: 'signature · idempotency', x: 640, y: 370 },
        { id: 'orders', label: 'Orders Service', sub: 'state machine', x: 890, y: 230 },
      ],
      edges: [
        { from: 'ui', to: 'bff' },
        { from: 'bff', to: 'mp', label: 'create preference' },
        { from: 'mp', to: 'hook', label: 'notifications', dashed: true },
        { from: 'hook', to: 'orders', label: 'payment.approved' },
        { from: 'bff', to: 'hook', dashed: true },
      ],
    },
    pipeline: ['Commit', 'Lint & types', 'Unit tests', 'Sandbox e2e', 'Staging', 'Production'],
    metrics: [
      { value: 30, suffix: '%', label: 'Higher checkout conversion' },
      { value: 5, label: 'Payment methods supported' },
      { value: 100, suffix: '%', label: 'Webhooks verified' },
    ],
  },
  {
    id: 'stripe-connect',
    roman: 'IV',
    calibre: 'CAL. 04',
    title: 'A marketplace on Stripe Connect',
    emphasis: 'Stripe Connect',
    kicker: 'Routing donations to many organizations, with onboarding, transfers and payouts.',
    company: 'When Justice',
    role: 'Software Engineer',
    years: '20XX — 20XX',
    problem: lorem,
    pullQuote: 'The platform never holds the money — it just keeps perfect time.',
    specs: [
      { label: 'Movement', value: 'Connect · destination charges' },
      { label: 'Complications', value: 'Onboarding · Transfers · Payouts' },
      { label: 'Case', value: 'Next.js · Supabase · Stripe' },
      { label: 'Resistance', value: 'Event-sourced webhook log' },
    ],
    diagram: {
      caption: 'Platform charges routed to connected accounts, settled by payouts.',
      nodes: [
        { id: 'web', label: 'Platform', sub: 'donor checkout', x: 110, y: 230 },
        { id: 'api', label: 'Donations API', sub: 'payment intents', x: 370, y: 230 },
        { id: 'stripe', label: 'Stripe Connect', sub: 'destination charges', x: 640, y: 230, accent: true },
        { id: 'a', label: 'Connected Account', sub: 'organization A', x: 890, y: 90 },
        { id: 'b', label: 'Connected Account', sub: 'organization B', x: 890, y: 230 },
        { id: 'payouts', label: 'Payouts', sub: 'bank settlement', x: 890, y: 370 },
        { id: 'hooks', label: 'Webhooks', sub: 'event log', x: 370, y: 430 },
      ],
      edges: [
        { from: 'web', to: 'api' },
        { from: 'api', to: 'stripe', label: 'transfer_data' },
        { from: 'stripe', to: 'a' },
        { from: 'stripe', to: 'b' },
        { from: 'stripe', to: 'payouts' },
        { from: 'stripe', to: 'hooks', label: 'events', dashed: true },
      ],
    },
    pipeline: ['Commit', 'Lint & types', 'Unit tests', 'Stripe test mode', 'Preview', 'Production'],
    metrics: [
      { value: 120, suffix: '+', label: 'Organizations onboarded' },
      { value: 2, prefix: '<', suffix: 'min', label: 'Onboarding to first payout' },
      { value: 0, label: 'Manual transfers' },
    ],
  },
  {
    id: 'microservices',
    roman: 'V',
    calibre: 'CAL. 05',
    title: 'Services that talk in events',
    emphasis: 'events',
    kicker: 'Decomposing a monolith into services coordinated by an event bus.',
    company: '[Company D]',
    role: 'Backend Engineer',
    years: '20XX — 20XX',
    problem: lorem,
    pullQuote: 'Services should gossip in events, never in shared tables.',
    specs: [
      { label: 'Movement', value: 'Event-driven microservices' },
      { label: 'Complications', value: 'Outbox · Sagas · Dead-letter queues' },
      { label: 'Case', value: 'Node · Kafka · Docker · AWS' },
      { label: 'Resistance', value: 'At-least-once, idempotent consumers' },
    ],
    diagram: {
      caption: 'Gateway, bounded-context services and an event backbone.',
      nodes: [
        { id: 'gw', label: 'API Gateway', sub: 'auth · rate limit', x: 110, y: 230 },
        { id: 'auth', label: 'Identity', sub: 'service', x: 370, y: 80 },
        { id: 'orders', label: 'Orders', sub: 'service', x: 370, y: 230 },
        { id: 'inv', label: 'Inventory', sub: 'service', x: 370, y: 380 },
        { id: 'bus', label: 'Event Bus', sub: 'topics · DLQ', x: 640, y: 230, accent: true },
        { id: 'notif', label: 'Notifications', sub: 'consumer', x: 890, y: 120 },
        { id: 'analytics', label: 'Analytics', sub: 'consumer', x: 890, y: 340 },
      ],
      edges: [
        { from: 'gw', to: 'auth' },
        { from: 'gw', to: 'orders' },
        { from: 'gw', to: 'inv' },
        { from: 'orders', to: 'bus', label: 'OrderPlaced' },
        { from: 'inv', to: 'bus', dashed: true },
        { from: 'bus', to: 'notif' },
        { from: 'bus', to: 'analytics' },
      ],
    },
    pipeline: ['Commit', 'Lint & types', 'Unit tests', 'Contract tests', 'Container build', 'Rolling deploy'],
    metrics: [
      { value: 8, label: 'Services extracted' },
      { value: 3, suffix: '×', label: 'Deploy frequency' },
      { value: 60, suffix: '%', label: 'Fewer cross-team incidents' },
    ],
  },
  {
    id: 'delivery',
    roman: 'VI',
    calibre: 'CAL. 06',
    title: 'Delivery as a craft',
    emphasis: 'craft',
    kicker: 'CI/CD, preview environments and the guardrails that let teams move fast safely.',
    company: '[Company E]',
    role: 'Tech Lead',
    years: '20XX — 20XX',
    problem: lorem,
    pullQuote: 'A good pipeline is a metronome — nobody notices until it stops.',
    specs: [
      { label: 'Movement', value: 'Trunk-based CI/CD' },
      { label: 'Complications', value: 'Preview envs · Feature flags · Rollbacks' },
      { label: 'Case', value: 'GitHub Actions · Vercel · Docker' },
      { label: 'Resistance', value: 'One-click rollback' },
    ],
    diagram: {
      caption: 'From pull request to production with promotion gates.',
      nodes: [
        { id: 'pr', label: 'Pull Request', sub: 'trunk-based', x: 110, y: 230 },
        { id: 'ci', label: 'CI', sub: 'lint · test · types', x: 370, y: 230, accent: true },
        { id: 'preview', label: 'Preview Env', sub: 'per PR', x: 640, y: 90 },
        { id: 'artifact', label: 'Build Artifact', sub: 'immutable', x: 640, y: 370 },
        { id: 'staging', label: 'Staging', sub: 'smoke tests', x: 890, y: 370 },
        { id: 'prod', label: 'Production', sub: 'flags · rollback', x: 890, y: 90 },
      ],
      edges: [
        { from: 'pr', to: 'ci' },
        { from: 'ci', to: 'preview', label: 'deploy' },
        { from: 'ci', to: 'artifact' },
        { from: 'artifact', to: 'staging', label: 'promote' },
        { from: 'staging', to: 'prod', label: 'approve' },
      ],
    },
    pipeline: ['Pull request', 'Static checks', 'Tests', 'Preview', 'Staging', 'Production'],
    metrics: [
      { value: 12, suffix: 'min', label: 'Commit to production' },
      { value: 20, suffix: '+', label: 'Deploys per week' },
      { value: 1, label: 'Click to roll back' },
    ],
  },
]
