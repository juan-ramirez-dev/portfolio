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

export type Case = {
  id: string
  title: string
  kicker: string
  company: string
  role: string
  years: string
  stack: string[]
  diagram: {
    caption: string
    /** nodes appear in this order as you scroll */
    nodes: DiagramNode[]
    edges: DiagramEdge[]
    /** one line per node, shown while that node is being built */
    story?: string[]
  }
  pipeline: string[]
  metrics: Metric[]
}

export const cases: Case[] = [
  {
    id: 'mfe-platform',
    title: 'Micro-frontends that ship alone',
    kicker: 'Splitting a monolithic frontend so every team could deploy on its own clock.',
    company: '[Company A]',
    role: 'Frontend Architect',
    years: '20XX — 20XX',
    stack: ['React', 'TypeScript', 'Module Federation', 'Webpack'],
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
      story: [
        'One entry point for every user.',
        'A thin shell owns routing, auth and nothing else.',
        'Remotes are discovered at runtime from a manifest on the CDN.',
        'Checkout ships on its own pipeline.',
        'Catalog ships on its own pipeline.',
        'Account ships on its own pipeline.',
        'One design system, loaded once and shared by all.',
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
    id: 'mercado-pago',
    title: 'Mercado Pago, end to end',
    kicker: 'A checkout integration built for LATAM payment methods and unreliable webhooks.',
    company: '[Company C]',
    role: 'Full-stack Engineer',
    years: '20XX — 20XX',
    stack: ['Next.js', 'Node', 'PostgreSQL', 'Checkout Pro'],
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
      story: [
        'The buyer never talks to the gateway directly.',
        'A backend-for-frontend creates the payment preference.',
        'Mercado Pago handles cards, cash and local methods.',
        'Every notification is signature-checked and deduplicated.',
        'Orders move through a strict state machine, once.',
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
    title: 'A marketplace on Stripe Connect',
    kicker: 'Routing donations to many organizations, with onboarding, transfers and payouts.',
    company: 'When Justice',
    role: 'Software Engineer',
    years: '20XX — 20XX',
    stack: ['Next.js', 'Supabase', 'Stripe Connect'],
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
        { from: 'api', to: 'stripe', label: 'charge' },
        { from: 'stripe', to: 'a' },
        { from: 'stripe', to: 'b' },
        { from: 'stripe', to: 'payouts' },
        { from: 'stripe', to: 'hooks', label: 'events', dashed: true },
      ],
      story: [
        'Donors give through a single platform checkout.',
        'The API creates payment intents with a destination.',
        'Stripe Connect routes each charge — the platform never holds the money.',
        'Each organization onboards as its own connected account.',
        'Hundreds of them, without manual transfers.',
        'Payouts settle straight to their banks.',
        'Every event is logged, replayable and idempotent.',
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
    id: 'event-bus',
    title: 'Services that talk in events',
    kicker: 'Decomposing a monolith into services coordinated by an event bus.',
    company: '[Company D]',
    role: 'Backend Engineer',
    years: '20XX — 20XX',
    stack: ['Node', 'Kafka', 'Docker', 'AWS'],
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
      story: [
        'One gateway in front: auth and rate limits live here.',
        'Identity becomes its own bounded context.',
        'Orders owns its data — no shared tables.',
        'Inventory reacts instead of being called.',
        'Services gossip through topics, with dead-letter queues.',
        'Consumers subscribe without anyone changing the producer.',
        'New use cases plug in without a release train.',
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
    id: 'offline-payments',
    title: 'Payments that survive the dark',
    kicker: 'Taking payments with no connection, and reconciling every cent once back online.',
    company: '[Company B]',
    role: 'Senior Software Engineer',
    years: '20XX — 20XX',
    stack: ['React Native', 'PWA', 'IndexedDB', 'Node'],
    diagram: {
      caption: 'Client-side queue, idempotent sync and nightly reconciliation.',
      nodes: [
        { id: 'pos', label: 'POS Client', sub: 'mobile', x: 110, y: 120 },
        { id: 'queue', label: 'Local Queue', sub: 'on device', x: 370, y: 120 },
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
      story: [
        'The point of sale keeps selling with no signal.',
        'Every payment is written to a local queue first.',
        'When the network returns, a worker syncs with idempotency keys.',
        'The API charges exactly once, however many retries.',
        'The processor authorizes and captures.',
        'Settlements are matched against what the devices recorded.',
        'Every cent lands in a double-entry ledger.',
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
    id: 'ledger-data',
    title: 'A ledger that never drifts',
    kicker: 'One source of truth for money, with fast reads and a clean stream of changes.',
    company: '[Company B]',
    role: 'Senior Software Engineer',
    years: '20XX — 20XX',
    stack: ['PostgreSQL', 'Redis', 'Debezium', 'BigQuery'],
    diagram: {
      caption: 'Transactional writes, replicated reads and change data capture.',
      nodes: [
        { id: 'api', label: 'Services', sub: 'write path', x: 110, y: 120 },
        { id: 'pg', label: 'PostgreSQL', sub: 'primary · ledger', x: 370, y: 120, accent: true },
        { id: 'outbox', label: 'Outbox', sub: 'same transaction', x: 630, y: 120 },
        { id: 'cdc', label: 'CDC Stream', sub: 'change events', x: 890, y: 120 },
        { id: 'replica', label: 'Read Replicas', sub: 'reporting · search', x: 370, y: 380 },
        { id: 'cache', label: 'Cache', sub: 'hot reads', x: 110, y: 380 },
        { id: 'wh', label: 'Warehouse', sub: 'analytics', x: 890, y: 380 },
      ],
      edges: [
        { from: 'api', to: 'pg', label: 'write' },
        { from: 'pg', to: 'outbox', label: 'tx' },
        { from: 'outbox', to: 'cdc' },
        { from: 'pg', to: 'replica', label: 'replication', dashed: true },
        { from: 'cache', to: 'replica', label: 'miss', dashed: true },
        { from: 'cdc', to: 'wh' },
      ],
      story: [
        'Services write through a single, narrow path.',
        'The primary holds the ledger — constraints, not conventions.',
        'Events are written in the same transaction as the data.',
        'Change data capture streams them out, in order.',
        'Reads scale on replicas, never on the primary.',
        'Hot paths are served from cache.',
        'Analytics get a full history without touching production.',
      ],
    },
    pipeline: ['Migration PR', 'Schema lint', 'Shadow run', 'Backfill', 'Cut-over', 'Verify'],
    metrics: [
      { value: 0, label: 'Ledger discrepancies' },
      { value: 10, suffix: '×', label: 'Read capacity' },
      { value: 5, prefix: '<', suffix: 's', label: 'Change lag to warehouse' },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery as a craft',
    kicker: 'CI/CD, preview environments and the guardrails that let teams move fast safely.',
    company: '[Company E]',
    role: 'Tech Lead',
    years: '20XX — 20XX',
    stack: ['GitHub Actions', 'Docker', 'Vercel', 'Feature flags'],
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
      story: [
        'Small pull requests straight to trunk.',
        'Every check runs on every commit.',
        'Each PR gets its own live environment.',
        'One immutable artifact, built once.',
        'The same artifact is promoted, never rebuilt.',
        'Production behind flags, one click from rollback.',
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
