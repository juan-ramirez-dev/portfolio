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

/** the parts of a product a case touched, lit on the layer strip */
export const LAYERS = ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'] as const
export type Layer = (typeof LAYERS)[number]

export type Case = {
  id: string
  title: string
  kicker: string
  /** one line on how AI took part, when it did */
  ai?: string
  company: string
  role: string
  years: string
  stack: string[]
  layers: Layer[]
  /** path under /public */
  logo?: string
  diagram: {
    caption: string
    /** nodes appear in this order as you scroll */
    nodes: DiagramNode[]
    edges: DiagramEdge[]
    /** one line per node, shown while that node is being built */
    story?: string[]
  }
  /** label over the track — what it shows: a delivery flow or what got built */
  pipelineLabel?: string
  pipeline: string[]
  /** empty hides the Impact block */
  metrics: Metric[]
}

export const cases: Case[] = [
  {
    id: 'build-loop',
    title: 'My build loop',
    kicker: "I don't trust AI to write good code. So I built a system that doesn't need trust.",
    company: 'Every project',
    role: 'AI-augmented workflow',
    years: '2025 — Now',
    stack: ['Claude Code', 'MCP', 'Agents', 'Skills', 'Hooks'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: 'From a meeting to a reviewed pull request, with agents doing the typing.',
      nodes: [
        { id: 'notes', label: 'Meeting notes', sub: 'Granola', x: 110, y: 120 },
        { id: 'tickets', label: 'Tickets', sub: 'written by Claude', x: 370, y: 120 },
        { id: 'planner', label: 'Planner agent', sub: 'decisions → questions', x: 630, y: 120 },
        { id: 'agent', label: 'Claude Code', sub: 'rules · Figma · code', x: 890, y: 120, accent: true },
        { id: 'hooks', label: 'Hooks', sub: 'block · lint · format', x: 890, y: 380 },
        { id: 'tests', label: 'Test planner', sub: 'Jest · Cypress', x: 630, y: 380 },
        { id: 'review', label: 'AI review', sub: '4 reviewers + refuter', x: 370, y: 380 },
        { id: 'pr', label: 'Pull request', sub: 'live preview', x: 110, y: 380 },
      ],
      edges: [
        { from: 'notes', to: 'tickets' },
        { from: 'tickets', to: 'planner' },
        { from: 'planner', to: 'agent', label: 'plan' },
        { from: 'agent', to: 'hooks', label: 'every edit' },
        { from: 'hooks', to: 'tests' },
        { from: 'tests', to: 'review' },
        { from: 'review', to: 'pr' },
      ],
      story: [
        'It starts in a meeting. Granola takes the notes.',
        'Claude turns them into tickets.',
        'A planner agent writes the plan. Every decision becomes a question I answer.',
        'Claude codes against one short, strict rules file and the Figma design.',
        'Hooks check every edit. Hardcoded colour, wrong file name, push to main: blocked.',
        'A test planner proposes the edge cases. I pick. Jest and Cypress run them.',
        'Four AI reviewers check the code in parallel. A fifth tries to prove them wrong.',
        'Every pull request ships with a live preview.',
      ],
    },
    pipelineLabel: 'The loop',
    pipeline: ['Notes', 'Ticket', 'Plan', 'Code', 'Hooks', 'Tests', 'AI review', 'PR'],
    metrics: [
      { value: 200, prefix: '+', suffix: '%', label: 'Delivery output since AI joined the loop' },
      { value: 3, suffix: ' days', label: 'To build a complete application' },
      { value: 2, suffix: ' wks', label: 'To ship a feature scoped at three months' },
    ],
  },
  {
    id: 'neura',
    title: 'An assistant you talk to',
    kicker:
      'Neura, a personal AI assistant built from zero: send a voice note, get emails written and tasks created. Web, mobile and backend, with a team of three.',
    ai: 'AI inside the product, and across the build: screens, API integration and UI iteration.',
    company: 'Neura',
    role: 'Full Stack Developer',
    years: '2025',
    stack: ['Next.js', 'React Native', 'Express', 'Supabase', 'Redis', 'OpenAI'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations', 'AI'],
    logo: '/media/neura-logo.png',
    diagram: {
      caption: 'A voice note in, emails and tasks out.',
      nodes: [
        { id: 'voice', label: 'Voice note', sub: 'mobile app', x: 110, y: 230 },
        { id: 'api', label: 'Backend API', sub: 'Express · auth', x: 370, y: 230 },
        { id: 'stt', label: 'Transcription', sub: 'speech → text', x: 370, y: 430 },
        { id: 'intent', label: 'AI intent', sub: 'what to do next', x: 640, y: 230, accent: true },
        { id: 'email', label: 'Email', sub: 'written and sent', x: 890, y: 90 },
        { id: 'tasks', label: 'Tasks', sub: 'created and scheduled', x: 890, y: 370 },
        { id: 'web', label: 'Web app', sub: 'review everything', x: 640, y: 470 },
      ],
      edges: [
        { from: 'voice', to: 'api' },
        { from: 'api', to: 'stt', dashed: true },
        { from: 'api', to: 'intent', label: 'transcript' },
        { from: 'intent', to: 'email' },
        { from: 'intent', to: 'tasks' },
        { from: 'tasks', to: 'web', dashed: true },
      ],
      story: [
        'The person just talks: a voice note from the phone.',
        'One backend receives it, with auth and rate limits.',
        'The audio becomes text.',
        'An AI step decides what was asked for.',
        'Emails get written and sent.',
        'Tasks get created.',
        'A web app shows everything Neura did.',
      ],
    },
    pipelineLabel: 'Delivery',
    pipeline: ['Idea', 'Scope', 'Design', 'Build', 'Integrate', 'Release'],
    metrics: [
      { value: 15, suffix: '+', label: 'Screens delivered' },
      { value: 3, prefix: '<', label: 'Months from idea to working app' },
      { value: 3, label: 'Apps: web, mobile and backend' },
    ],
  },
  {
    id: 'ai-in-product',
    title: 'AI inside the product',
    kicker:
      'In Lucka and Lexio, AI writes data the app keeps: expenses from a voice note, lessons from a phrase. One schema, any provider, nothing saved unchecked.',
    company: 'Lucka · Lexio',
    role: 'Side projects',
    years: '2026',
    stack: ['Tauri', 'Rust', 'SQLite', 'whisper.cpp', 'llama.cpp'],
    layers: ['Frontend', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: 'Untrusted model output, turned into rows the app can rely on.',
      nodes: [
        { id: 'input', label: 'Voice or text', sub: 'what the user gives', x: 110, y: 230 },
        { id: 'whisper', label: 'Whisper', sub: 'on device', x: 370, y: 230 },
        { id: 'schema', label: 'One JSON schema', sub: 'structured output', x: 640, y: 230, accent: true },
        { id: 'local', label: 'Local model', sub: 'Qwen · llama.cpp', x: 640, y: 70 },
        { id: 'cloud', label: 'Your own key', sub: 'OpenAI · Claude · Gemini', x: 640, y: 400 },
        { id: 'validate', label: 'Validation', sub: 'typed · tested', x: 890, y: 230 },
        { id: 'db', label: 'SQLite', sub: 'through Rust', x: 890, y: 430 },
      ],
      edges: [
        { from: 'input', to: 'whisper' },
        { from: 'whisper', to: 'schema', label: 'text' },
        { from: 'schema', to: 'local', dashed: true },
        { from: 'schema', to: 'cloud', dashed: true },
        { from: 'schema', to: 'validate', label: 'answer' },
        { from: 'validate', to: 'db', label: 'confirmed' },
      ],
      story: [
        'The user speaks or pastes a text.',
        'Speech becomes text on the machine itself.',
        'One JSON schema tells every model exactly what to return.',
        'A local model can answer, with a grammar it cannot break.',
        'Or OpenAI, Anthropic or Gemini, with the user’s own key.',
        'Every answer is validated and mapped to real records in tested code.',
        'Only then is it saved, after the user confirms.',
      ],
    },
    pipelineLabel: 'Flow',
    pipeline: ['Speak', 'Transcribe', 'Interpret', 'Validate', 'Confirm', 'Save'],
    metrics: [
      { value: 4, label: 'AI providers behind one interface' },
      { value: 1, label: 'Schema that every provider fills' },
      { value: 0, label: 'Model answers saved without validation' },
    ],
  },
  {
    id: 'stripe',
    title: 'Payments, end to end',
    kicker:
      'A transaction platform on Stripe: checkout, saved cards, subscriptions, platform fees, payouts and receipts — one flow, built and maintained by me.',
    ai: 'Tests, debugging and pixel-precise UI, accelerated with AI.',
    company: 'Katapult Labs',
    role: 'Senior Full Stack Developer',
    years: '2025 — Now',
    stack: ['Next.js', 'NestJS', 'Stripe', 'Supabase Postgres', 'Redis'],
    layers: ['Frontend', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: 'Checkout, a guarded charge, signed webhooks and one persisted record.',
      nodes: [
        { id: 'checkout', label: 'Checkout', sub: 'Stripe Elements', x: 110, y: 230 },
        { id: 'api', label: 'NestJS API', sub: 'commands · queries', x: 370, y: 230 },
        { id: 'guard', label: 'Abuse guard', sub: 'Redis · per device', x: 370, y: 440 },
        { id: 'stripe', label: 'Stripe', sub: 'intents · subscriptions', x: 640, y: 230, accent: true },
        { id: 'accounts', label: 'Connected accounts', sub: 'fees · payouts', x: 640, y: 70 },
        { id: 'hooks', label: 'Webhooks', sub: 'signature-verified', x: 640, y: 440 },
        { id: 'db', label: 'Postgres', sub: 'state · RPC', x: 890, y: 440 },
        { id: 'receipts', label: 'Receipts', sub: 'PDF · CSV · S3', x: 890, y: 230 },
      ],
      edges: [
        { from: 'checkout', to: 'api' },
        { from: 'api', to: 'guard', label: 'check', dashed: true },
        { from: 'api', to: 'stripe', label: 'intent' },
        { from: 'stripe', to: 'accounts' },
        { from: 'stripe', to: 'hooks', label: 'events', dashed: true },
        { from: 'hooks', to: 'db', label: 'persist' },
        { from: 'db', to: 'receipts' },
      ],
      story: [
        'Buyers pay inside the product with Stripe Elements.',
        'A NestJS API creates and confirms every PaymentIntent.',
        'Before a card is charged, a Redis guard checks the device.',
        'Stripe handles cards, saved methods and subscriptions.',
        'Connected accounts get their share; the platform keeps its fee.',
        'Signed webhooks report what really happened.',
        'Every transaction state lands in Postgres.',
        'Receipts and exports are generated from that one record.',
      ],
    },
    pipelineLabel: 'Built',
    pipeline: ['Auth', 'Users', 'Checkout', 'Subscriptions', 'Webhooks', 'Payouts', 'Receipts', 'Reports'],
    metrics: [
      { value: 100, prefix: '$', suffix: 'K+', label: 'In transactions, hundreds of thousands of dollars' },
      { value: 100, suffix: '%', label: 'Of the payment flow built and maintained by me' },
    ],
  },
  {
    id: 'offline-wallet',
    title: 'Paying without signal',
    kicker:
      "Mobile payments for Ecuador's largest digital wallet: QR codes, deep links and offline payments encrypted on the device.",
    company: 'Devsu',
    role: 'Mobile & Frontend Developer',
    years: '2024 — 2025',
    stack: ['React Native', 'NestJS', 'TypeScript', 'AWS'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Integrations'],
    diagram: {
      caption: 'A payment that starts offline and settles once the network is back.',
      nodes: [
        { id: 'phone', label: 'Wallet app', sub: 'React Native', x: 110, y: 120 },
        { id: 'qr', label: 'QR · deep link', sub: 'start a payment', x: 370, y: 120 },
        { id: 'offline', label: 'Offline payment', sub: 'encrypted on device', x: 630, y: 120, accent: true },
        { id: 'sync', label: 'Back online', sub: 'sync', x: 890, y: 120 },
        { id: 'services', label: 'Backend services', sub: 'NestJS · AWS', x: 890, y: 380 },
        { id: 'cache', label: 'Cache', sub: 'no empty responses', x: 630, y: 380 },
        { id: 'charts', label: 'Charts', sub: 'money, made visual', x: 370, y: 380 },
      ],
      edges: [
        { from: 'phone', to: 'qr' },
        { from: 'qr', to: 'offline', label: 'no signal' },
        { from: 'offline', to: 'sync', dashed: true },
        { from: 'sync', to: 'services' },
        { from: 'services', to: 'cache' },
        { from: 'cache', to: 'charts' },
      ],
      story: [
        'A wallet app, often on a weak network.',
        'Pay by scanning a QR code or opening a deep link.',
        'With no signal, the payment is encrypted and kept on the device.',
        'When the network returns, it syncs.',
        'Backend services take over, across a large distributed team.',
        'A cache layer stops empty or invalid responses from reaching the user.',
        'Interactive charts show people where their money goes.',
      ],
    },
    pipelineLabel: 'Built',
    pipeline: ['QR payments', 'Deep links', 'Offline mode', 'Encryption', 'Charts', 'Service migration'],
    metrics: [
      { value: 1000, suffix: 's', label: 'Of people paying with no connection' },
      { value: 1, prefix: '#', label: 'Digital wallet in Ecuador' },
    ],
  },
  {
    id: 'api',
    title: 'An API in 18 modules',
    kicker:
      'The backend behind the payments: NestJS split into commands and queries, Supabase Postgres underneath, jobs and providers on the side.',
    ai: 'Implementation plans, backend code and tests drafted with AI, reviewed line by line.',
    company: 'Katapult Labs',
    role: 'Senior Full Stack Developer',
    years: '2025 — Now',
    stack: ['NestJS', 'CQRS', 'Supabase', 'PostgreSQL', 'Redis', 'Sentry'],
    layers: ['Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: 'Guards in front, commands and queries apart, Postgres as the source of truth.',
      nodes: [
        { id: 'clients', label: 'Clients', sub: 'web · admin', x: 110, y: 230 },
        { id: 'guards', label: 'Guards', sub: 'auth · roles · throttle', x: 370, y: 230 },
        { id: 'cmd', label: 'Commands', sub: 'write side', x: 630, y: 110 },
        { id: 'qry', label: 'Queries', sub: 'read side', x: 630, y: 350 },
        { id: 'pg', label: 'Postgres', sub: 'RPC · RLS · migrations', x: 890, y: 230, accent: true },
        { id: 'jobs', label: 'Scheduled jobs', sub: 'activate · expire · report', x: 370, y: 450 },
        { id: 'providers', label: 'Providers', sub: 'Stripe · S3 · PDF · email', x: 890, y: 450 },
      ],
      edges: [
        { from: 'clients', to: 'guards' },
        { from: 'guards', to: 'cmd' },
        { from: 'guards', to: 'qry' },
        { from: 'cmd', to: 'pg', label: 'write' },
        { from: 'qry', to: 'pg', label: 'read', dashed: true },
        { from: 'jobs', to: 'qry', dashed: true },
        { from: 'qry', to: 'providers', dashed: true },
      ],
      story: [
        'Web and admin clients talk to one API.',
        'Guards run first: auth, roles and rate limits.',
        'Writes go through commands…',
        '…reads through queries. A lint rule in CI keeps them apart.',
        'Postgres holds the truth: RPC functions, row-level security, versioned migrations.',
        'Scheduled jobs activate, expire and report on their own.',
        'Providers wrap Stripe, S3, PDF receipts and email.',
      ],
    },
    pipelineLabel: 'Built',
    pipeline: ['Auth & roles', 'Commands', 'Queries', 'RPC functions', 'Cron jobs', 'Providers', 'OpenAPI'],
    metrics: [
      { value: 18, label: 'Backend modules' },
      { value: 15, label: 'Postgres RPC functions' },
      { value: 237, label: 'Test files' },
    ],
  },
  {
    id: 'redis',
    title: 'Redis, from cache to shield',
    kicker:
      'First to make an edtech platform answer faster. Later, to rate-limit an API and stop card testing before a stolen card is ever charged.',
    company: 'Kuepa → Katapult Labs',
    role: 'Full Stack Developer',
    years: '2022 — Now',
    stack: ['Redis', 'Node', 'NestJS', 'Lua', 'Stripe'],
    layers: ['Backend', 'Database', 'Integrations'],
    diagram: {
      caption: 'A two-layer circuit breaker that counts declines, not traffic.',
      nodes: [
        { id: 'req', label: 'Payment request', sub: 'with a device id', x: 110, y: 120 },
        { id: 'bucket', label: 'Device · IP bucket', sub: 'who is asking', x: 370, y: 120 },
        { id: 'velocity', label: 'Velocity check', sub: 'intents per 10 min', x: 630, y: 120 },
        { id: 'stripe', label: 'Stripe', sub: 'charge attempt', x: 890, y: 120 },
        { id: 'decline', label: 'Decline webhook', sub: 'card fingerprint', x: 890, y: 380 },
        { id: 'counters', label: 'Redis counters', sub: 'atomic Lua scripts', x: 630, y: 380, accent: true },
        { id: 'breaker', label: 'Circuit breaker', sub: 'block · retry-after', x: 370, y: 380 },
      ],
      edges: [
        { from: 'req', to: 'bucket' },
        { from: 'bucket', to: 'velocity' },
        { from: 'velocity', to: 'stripe', label: 'allowed' },
        { from: 'stripe', to: 'decline', label: 'declined', dashed: true },
        { from: 'decline', to: 'counters' },
        { from: 'counters', to: 'breaker', label: 'tripped' },
      ],
      story: [
        'Every payment request carries a device id.',
        'Each one is bucketed by device and by IP.',
        'Too many payment intents from one device in ten minutes: blocked on the spot.',
        'Otherwise, Stripe tries the card.',
        'Declines come back by webhook, with the card fingerprint.',
        'Redis counts distinct declined cards per bucket, atomically.',
        'Three bad cards on one device trip the breaker. A crowd on shared Wi-Fi never does.',
      ],
    },
    pipelineLabel: 'Over the years',
    pipeline: ['Response cache', 'Rate limiting', 'Throttler storage', 'Velocity cap', 'Card-testing breaker'],
    metrics: [
      { value: 3, label: 'Declined cards per device before a block' },
      { value: 2, label: 'Layers: device first, IP as backstop' },
      { value: 10, suffix: ' min', label: 'Velocity window for new payments' },
    ],
  },
  {
    id: 'checked-three-times',
    title: 'Checked three times',
    kicker:
      'Every rule runs when the agent writes, when I commit and when CI merges. Desktop apps go further: real macOS and Windows builds are launched before each release.',
    ai: 'The same rules guard humans and agents. Neither can skip them.',
    company: 'Katapult Labs · Lucka',
    role: 'Full Stack Developer',
    years: '2025 — Now',
    stack: ['GitHub Actions', 'Husky', 'Jest', 'Cypress', 'Supabase CLI', 'Vercel'],
    layers: ['Database', 'CI/CD', 'AI'],
    diagram: {
      caption: 'Three guardrail layers, a preview per pull request and migrations per environment.',
      nodes: [
        { id: 'write', label: 'On write', sub: 'Claude hooks', x: 110, y: 120 },
        { id: 'commit', label: 'On commit', sub: 'Husky · lint-staged', x: 370, y: 120 },
        { id: 'ci', label: 'On merge', sub: 'lint · types · Jest', x: 630, y: 120, accent: true },
        { id: 'migrations', label: 'Migrations', sub: 'applied to a fresh DB', x: 890, y: 120 },
        { id: 'preview', label: 'Preview', sub: 'Vercel, per PR', x: 630, y: 380 },
        { id: 'e2e', label: 'Cypress', sub: 'against the preview', x: 370, y: 380 },
        { id: 'envs', label: 'Environments', sub: 'feedback → staging → main', x: 890, y: 380 },
      ],
      edges: [
        { from: 'write', to: 'commit' },
        { from: 'commit', to: 'ci' },
        { from: 'ci', to: 'migrations' },
        { from: 'ci', to: 'preview', label: 'deploy' },
        { from: 'preview', to: 'e2e' },
        { from: 'migrations', to: 'envs', label: 'promote' },
      ],
      story: [
        'On write: Claude hooks block what the rules forbid and lint every edit.',
        'On commit: Husky and lint-staged run the same rules again.',
        'On merge: CI runs lint, types and unit tests.',
        'Every migration is applied to a fresh local database before it can ship.',
        'Each pull request gets its own Vercel preview.',
        'Cypress tests the real preview in a browser.',
        'Migrations roll out one environment at a time: feedback, staging, main.',
      ],
    },
    pipelineLabel: 'Delivery',
    pipeline: ['Write', 'Commit', 'CI', 'Migrations', 'Preview', 'Cypress', 'Staging', 'Production'],
    metrics: [
      { value: 350, suffix: '+', label: 'Test files running in CI' },
      { value: 3, label: 'Environments, each with its own database' },
      { value: 3, label: 'Times every rule is checked' },
    ],
  },
  {
    id: 'mfe',
    title: 'Splitting an edtech frontend',
    kicker:
      'Proposed and built a Module Federation architecture for an education platform, then kept it fast: real-time updates, jobs, legacy clean-up and unit tests.',
    company: 'Kuepa Edutech',
    role: 'Full Stack Developer',
    years: '2022 — 2024',
    stack: ['React', 'Module Federation', 'Node', 'Socket.io', 'AWS'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations'],
    diagram: {
      caption: 'A thin shell loading independently deployed remotes, with a live backend behind.',
      nodes: [
        { id: 'users', label: 'Users', sub: 'students · advisors', x: 110, y: 230 },
        { id: 'shell', label: 'App shell', sub: 'host · routing', x: 370, y: 230, accent: true },
        { id: 'aws', label: 'AWS', sub: 'remoteEntry.js', x: 370, y: 440 },
        { id: 'dash', label: 'Dashboards', sub: 'remote', x: 640, y: 90 },
        { id: 'leads', label: 'Leads & reports', sub: 'remote', x: 640, y: 230 },
        { id: 'pay', label: 'Payments', sub: 'remote', x: 640, y: 370 },
        { id: 'node', label: 'Node API', sub: 'Socket.io · jobs', x: 890, y: 230 },
      ],
      edges: [
        { from: 'users', to: 'shell' },
        { from: 'aws', to: 'shell', label: 'manifest', dashed: true },
        { from: 'shell', to: 'dash' },
        { from: 'shell', to: 'leads' },
        { from: 'shell', to: 'pay' },
        { from: 'leads', to: 'node', label: 'live', dashed: true },
      ],
      story: [
        'Students and advisors, one entry point.',
        'A thin shell owns routing and loads the rest.',
        'Remotes are fetched at runtime from AWS.',
        'Dashboards ship on their own.',
        'Leads and reports ship on their own.',
        'Payments ship on their own.',
        'A Node backend pushes live updates over Socket.io and runs the jobs.',
      ],
    },
    pipelineLabel: 'Built',
    pipeline: ['Proposal', 'Shell', 'Remotes', 'Real-time', 'Jobs', 'Unit tests'],
    metrics: [
      { value: 50, prefix: '~', suffix: '%', label: 'Smaller deployments' },
      { value: 30, prefix: '~', suffix: '%', label: 'Lower AWS bill' },
      { value: 2, suffix: '+', label: 'Years on the platform' },
    ],
  },
]
