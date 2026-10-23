import type { T } from './i18n'

export type DiagramNode = {
  id: string
  label: T
  sub?: T
  /** center, in a 1000 × 520 drawing space */
  x: number
  y: number
  accent?: boolean
}

export type DiagramEdge = {
  from: string
  to: string
  label?: T
  dashed?: boolean
}

export type Metric = {
  /** counted up on scroll */
  value?: number
  /** a word in place of a number, when what matters is what, not how many */
  word?: T
  prefix?: string
  suffix?: string | T
  decimals?: number
  label: T
}

/** the parts of a product a case touched, lit on the layer strip */
export const LAYERS = ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'] as const
export type Layer = (typeof LAYERS)[number]

export type Case = {
  id: string
  title: T
  kicker: T
  /** one line on how AI took part, when it did */
  ai?: T
  company: string | T
  role: string | T
  years: string | T
  stack: string[]
  layers: Layer[]
  /** path under /public */
  logo?: string
  diagram: {
    caption: T
    /** nodes appear in this order as you scroll */
    nodes: DiagramNode[]
    edges: DiagramEdge[]
    /** one line per node, shown while that node is being built */
    story?: T[]
  }
  /** label over the track — what it shows: a delivery flow or what got built */
  pipelineLabel?: T
  pipeline: T[]
  /** empty hides the Impact block */
  metrics: Metric[]
}

const NOW: T = { en: '2025 — Now', es: '2025 — Hoy' }
const BUILT: T = { en: 'Built', es: 'Construido' }
const DELIVERY: T = { en: 'Delivery', es: 'Entrega' }

export const cases: Case[] = [
  {
    id: 'build-loop',
    title: { en: 'My build loop', es: 'Mi ciclo de trabajo' },
    kicker: {
      en: "I don't trust AI to write good code. So I built a system that doesn't need trust.",
      es: 'No confío en que la IA escriba buen código. Así que construí un sistema que no necesita confianza.',
    },
    company: { en: 'Every project', es: 'Cada proyecto' },
    role: { en: 'AI-augmented workflow', es: 'Flujo aumentado con IA' },
    years: NOW,
    stack: ['Claude Code', 'MCP', 'Agents', 'Skills', 'Hooks'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: {
        en: 'From a meeting to a reviewed pull request, with agents doing the typing.',
        es: 'De una reunión a un pull request revisado, con agentes escribiendo el código.',
      },
      nodes: [
        { id: 'notes', label: { en: 'Meeting notes', es: 'Notas de reunión' }, sub: { en: 'Granola', es: 'Granola' }, x: 110, y: 120 },
        { id: 'tickets', label: { en: 'Tickets', es: 'Tickets' }, sub: { en: 'written by Claude', es: 'escritos por Claude' }, x: 370, y: 120 },
        {
          id: 'planner',
          label: { en: 'Planner agent', es: 'Agente planner' },
          sub: { en: 'decisions → questions', es: 'decisiones → preguntas' },
          x: 630,
          y: 120,
        },
        {
          id: 'agent',
          label: { en: 'Claude Code', es: 'Claude Code' },
          sub: { en: 'rules · Figma · code', es: 'reglas · Figma · código' },
          x: 890,
          y: 120,
          accent: true,
        },
        { id: 'hooks', label: { en: 'Hooks', es: 'Hooks' }, sub: { en: 'block · lint · format', es: 'bloquear · lint · formato' }, x: 890, y: 380 },
        { id: 'tests', label: { en: 'Test planner', es: 'Planner de tests' }, sub: { en: 'Jest · Cypress', es: 'Jest · Cypress' }, x: 630, y: 380 },
        { id: 'review', label: { en: 'AI review', es: 'Revisión con IA' }, sub: { en: '4 reviewers + refuter', es: '4 revisores + refutador' }, x: 370, y: 380 },
        { id: 'pr', label: { en: 'Pull request', es: 'Pull request' }, sub: { en: 'live preview', es: 'preview en vivo' }, x: 110, y: 380 },
      ],
      edges: [
        { from: 'notes', to: 'tickets' },
        { from: 'tickets', to: 'planner' },
        { from: 'planner', to: 'agent', label: { en: 'plan', es: 'plan' } },
        { from: 'agent', to: 'hooks', label: { en: 'every edit', es: 'cada cambio' } },
        { from: 'hooks', to: 'tests' },
        { from: 'tests', to: 'review' },
        { from: 'review', to: 'pr' },
      ],
      story: [
        { en: 'It starts in a meeting. Granola takes the notes.', es: 'Empieza en una reunión. Granola toma las notas.' },
        { en: 'Claude turns them into tickets.', es: 'Claude las convierte en tickets.' },
        {
          en: 'A planner agent writes the plan. Every decision becomes a question I answer.',
          es: 'Un agente planner escribe el plan. Cada decisión se vuelve una pregunta que yo respondo.',
        },
        {
          en: 'Claude codes against one short, strict rules file and the Figma design.',
          es: 'Claude programa con un archivo de reglas corto y estricto, y el diseño de Figma.',
        },
        {
          en: 'Hooks check every edit. Hardcoded colour, wrong file name, push to main: blocked.',
          es: 'Los hooks revisan cada cambio. Color quemado, nombre de archivo mal, push a main: bloqueado.',
        },
        {
          en: 'A test planner proposes the edge cases. I pick. Jest and Cypress run them.',
          es: 'Un planner de tests propone los casos borde. Yo elijo. Jest y Cypress los corren.',
        },
        {
          en: 'Four AI reviewers check the code in parallel. A fifth tries to prove them wrong.',
          es: 'Cuatro revisores con IA revisan el código en paralelo. Un quinto intenta demostrar que se equivocan.',
        },
        { en: 'Every pull request ships with a live preview.', es: 'Cada pull request sale con un preview en vivo.' },
      ],
    },
    pipelineLabel: { en: 'The loop', es: 'El ciclo' },
    pipeline: [
      { en: 'Notes', es: 'Notas' },
      { en: 'Ticket', es: 'Ticket' },
      { en: 'Plan', es: 'Plan' },
      { en: 'Code', es: 'Código' },
      { en: 'Hooks', es: 'Hooks' },
      { en: 'Tests', es: 'Tests' },
      { en: 'AI review', es: 'Revisión IA' },
      { en: 'PR', es: 'PR' },
    ],
    metrics: [
      {
        value: 200,
        prefix: '+',
        suffix: '%',
        label: { en: 'Delivery output since AI joined the loop', es: 'Más entregas desde que la IA entró al ciclo' },
      },
      {
        value: 3,
        suffix: { en: ' days', es: ' días' },
        label: { en: 'To build a complete application', es: 'Para construir una aplicación completa' },
      },
      {
        value: 2,
        suffix: { en: ' wks', es: ' sem' },
        label: { en: 'To ship a feature scoped at three months', es: 'Para lanzar una funcionalidad estimada en tres meses' },
      },
    ],
  },
  {
    id: 'neura',
    title: { en: 'An assistant you talk to', es: 'Un asistente al que le hablas' },
    kicker: {
      en: 'Neura, a personal AI assistant built from zero: send a voice note, get emails written and tasks created. Web, mobile and backend, with a team of three.',
      es: 'Neura, un asistente personal con IA construido desde cero: mandas una nota de voz y se escriben correos y se crean tareas. Web, móvil y backend, con un equipo de tres.',
    },
    ai: {
      en: 'AI inside the product, and across the build: screens, API integration and UI iteration.',
      es: 'IA dentro del producto y en toda la construcción: pantallas, integración con la API e iteración de UI.',
    },
    company: 'Neura',
    role: 'Full Stack Developer',
    years: '2025',
    stack: ['Next.js', 'React Native', 'Express', 'Supabase', 'Redis', 'OpenAI', 'Design system'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations', 'AI'],
    logo: '/media/neura-logo.png',
    diagram: {
      caption: { en: 'A voice note in, emails and tasks out.', es: 'Entra una nota de voz, salen correos y tareas.' },
      nodes: [
        { id: 'voice', label: { en: 'Voice note', es: 'Nota de voz' }, sub: { en: 'mobile app', es: 'app móvil' }, x: 110, y: 230 },
        { id: 'api', label: { en: 'Backend API', es: 'API backend' }, sub: { en: 'Express · auth', es: 'Express · auth' }, x: 370, y: 230 },
        { id: 'stt', label: { en: 'Transcription', es: 'Transcripción' }, sub: { en: 'speech → text', es: 'voz → texto' }, x: 370, y: 430 },
        {
          id: 'intent',
          label: { en: 'AI intent', es: 'Intención (IA)' },
          sub: { en: 'what to do next', es: 'qué hacer después' },
          x: 640,
          y: 230,
          accent: true,
        },
        { id: 'email', label: { en: 'Email', es: 'Correo' }, sub: { en: 'written and sent', es: 'escrito y enviado' }, x: 890, y: 90 },
        { id: 'tasks', label: { en: 'Tasks', es: 'Tareas' }, sub: { en: 'created and scheduled', es: 'creadas y agendadas' }, x: 890, y: 370 },
        { id: 'web', label: { en: 'Web app', es: 'App web' }, sub: { en: 'review everything', es: 'revisa todo' }, x: 640, y: 470 },
      ],
      edges: [
        { from: 'voice', to: 'api' },
        { from: 'api', to: 'stt', dashed: true },
        { from: 'api', to: 'intent', label: { en: 'transcript', es: 'transcripción' } },
        { from: 'intent', to: 'email' },
        { from: 'intent', to: 'tasks' },
        { from: 'tasks', to: 'web', dashed: true },
      ],
      story: [
        { en: 'The person just talks: a voice note from the phone.', es: 'La persona solo habla: una nota de voz desde el celular.' },
        { en: 'One backend receives it, with auth and rate limits.', es: 'Un backend la recibe, con autenticación y límites de uso.' },
        { en: 'The audio becomes text.', es: 'El audio se vuelve texto.' },
        { en: 'An AI step decides what was asked for.', es: 'Un paso con IA decide qué se pidió.' },
        { en: 'Emails get written and sent.', es: 'Los correos se escriben y se envían.' },
        { en: 'Tasks get created.', es: 'Las tareas se crean.' },
        { en: 'A web app shows everything Neura did.', es: 'Una app web muestra todo lo que hizo Neura.' },
      ],
    },
    pipelineLabel: DELIVERY,
    pipeline: [
      { en: 'Idea', es: 'Idea' },
      { en: 'Scope', es: 'Alcance' },
      { en: 'Design', es: 'Diseño' },
      { en: 'Build', es: 'Desarrollo' },
      { en: 'Integrate', es: 'Integración' },
      { en: 'Release', es: 'Lanzamiento' },
    ],
    metrics: [
      { value: 15, suffix: '+', label: { en: 'Screens delivered', es: 'Pantallas entregadas' } },
      { value: 3, prefix: '<', label: { en: 'Months from idea to working app', es: 'Meses de la idea a una app funcionando' } },
      { value: 3, label: { en: 'Apps: web, mobile and backend', es: 'Apps: web, móvil y backend' } },
    ],
  },
  {
    id: 'ai-in-product',
    title: { en: 'AI inside the product', es: 'IA dentro del producto' },
    kicker: {
      en: 'In Lucka and Lexio, AI writes data the app keeps: expenses from a voice note, lessons from a phrase. One schema, any provider, nothing saved unchecked.',
      es: 'En Lucka y Lexio, la IA escribe datos que la app guarda: gastos desde una nota de voz, lecciones desde una frase. Un esquema, cualquier proveedor, nada se guarda sin validar.',
    },
    company: 'Lucka · Lexio',
    role: { en: 'Side projects', es: 'Proyectos propios' },
    years: '2026',
    stack: ['Tauri', 'Rust', 'SQLite', 'whisper.cpp', 'llama.cpp'],
    layers: ['Frontend', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: {
        en: 'Untrusted model output, turned into rows the app can rely on.',
        es: 'Respuestas de un modelo en las que no se puede confiar, convertidas en filas confiables.',
      },
      nodes: [
        { id: 'input', label: { en: 'Voice or text', es: 'Voz o texto' }, sub: { en: 'what the user gives', es: 'lo que da el usuario' }, x: 110, y: 230 },
        { id: 'whisper', label: { en: 'Whisper', es: 'Whisper' }, sub: { en: 'on device', es: 'en el equipo' }, x: 370, y: 230 },
        {
          id: 'schema',
          label: { en: 'One JSON schema', es: 'Un esquema JSON' },
          sub: { en: 'structured output', es: 'salida estructurada' },
          x: 640,
          y: 230,
          accent: true,
        },
        { id: 'local', label: { en: 'Local model', es: 'Modelo local' }, sub: { en: 'Qwen · llama.cpp', es: 'Qwen · llama.cpp' }, x: 640, y: 70 },
        {
          id: 'cloud',
          label: { en: 'Your own key', es: 'Tu propia key' },
          sub: { en: 'OpenAI · Claude · Gemini', es: 'OpenAI · Claude · Gemini' },
          x: 640,
          y: 400,
        },
        { id: 'validate', label: { en: 'Validation', es: 'Validación' }, sub: { en: 'typed · tested', es: 'tipada · testeada' }, x: 890, y: 230 },
        { id: 'db', label: { en: 'SQLite', es: 'SQLite' }, sub: { en: 'through Rust', es: 'a través de Rust' }, x: 890, y: 430 },
      ],
      edges: [
        { from: 'input', to: 'whisper' },
        { from: 'whisper', to: 'schema', label: { en: 'text', es: 'texto' } },
        { from: 'schema', to: 'local', dashed: true },
        { from: 'schema', to: 'cloud', dashed: true },
        { from: 'schema', to: 'validate', label: { en: 'answer', es: 'respuesta' } },
        { from: 'validate', to: 'db', label: { en: 'confirmed', es: 'confirmado' } },
      ],
      story: [
        { en: 'The user speaks or pastes a text.', es: 'El usuario habla o pega un texto.' },
        { en: 'Speech becomes text on the machine itself.', es: 'La voz se vuelve texto en la misma máquina.' },
        {
          en: 'One JSON schema tells every model exactly what to return.',
          es: 'Un esquema JSON le dice a cada modelo exactamente qué devolver.',
        },
        {
          en: 'A local model can answer, with a grammar it cannot break.',
          es: 'Puede responder un modelo local, con una gramática que no puede romper.',
        },
        {
          en: 'Or OpenAI, Anthropic or Gemini, with the user’s own key.',
          es: 'O OpenAI, Anthropic o Gemini, con la key del propio usuario.',
        },
        {
          en: 'Every answer is validated and mapped to real records in tested code.',
          es: 'Cada respuesta se valida y se convierte en registros reales con código testeado.',
        },
        { en: 'Only then is it saved, after the user confirms.', es: 'Solo entonces se guarda, después de que el usuario confirma.' },
      ],
    },
    pipelineLabel: { en: 'Flow', es: 'Flujo' },
    pipeline: [
      { en: 'Speak', es: 'Hablar' },
      { en: 'Transcribe', es: 'Transcribir' },
      { en: 'Interpret', es: 'Interpretar' },
      { en: 'Validate', es: 'Validar' },
      { en: 'Confirm', es: 'Confirmar' },
      { en: 'Save', es: 'Guardar' },
    ],
    metrics: [
      { value: 4, label: { en: 'AI providers behind one interface', es: 'Proveedores de IA detrás de una sola interfaz' } },
      { value: 1, label: { en: 'Schema that every provider fills', es: 'Esquema que llena cada proveedor' } },
      { value: 0, label: { en: 'Model answers saved without validation', es: 'Respuestas del modelo guardadas sin validar' } },
    ],
  },
  {
    id: 'stripe',
    title: { en: 'Payments, end to end', es: 'Pagos, de punta a punta' },
    kicker: {
      en: 'A transaction platform on Stripe: checkout, saved cards, subscriptions, platform fees, payouts and receipts — one flow, built and maintained by me.',
      es: 'Una plataforma de transacciones sobre Stripe: checkout, tarjetas guardadas, suscripciones, comisiones, payouts y recibos. Un solo flujo, construido y mantenido por mí.',
    },
    ai: {
      en: 'Tests, debugging and pixel-precise UI, accelerated with AI.',
      es: 'Tests, debugging y UI al píxel, acelerados con IA.',
    },
    company: 'Katapult Labs',
    role: 'Senior Full Stack Developer',
    years: NOW,
    stack: ['Next.js', 'NestJS', 'Stripe', 'Supabase Postgres', 'Redis', 'Design system'],
    layers: ['Frontend', 'Backend', 'Database', 'Integrations', 'CI/CD', 'AI'],
    diagram: {
      caption: {
        en: 'Checkout, a guarded charge, signed webhooks and one persisted record.',
        es: 'Checkout, un cobro protegido, webhooks firmados y un único registro persistido.',
      },
      nodes: [
        { id: 'checkout', label: { en: 'Checkout', es: 'Checkout' }, sub: { en: 'Stripe Elements', es: 'Stripe Elements' }, x: 110, y: 230 },
        { id: 'api', label: { en: 'NestJS API', es: 'API NestJS' }, sub: { en: 'commands · queries', es: 'commands · queries' }, x: 370, y: 230 },
        { id: 'guard', label: { en: 'Abuse guard', es: 'Guard antiabuso' }, sub: { en: 'Redis · per device', es: 'Redis · por dispositivo' }, x: 370, y: 440 },
        {
          id: 'stripe',
          label: { en: 'Stripe', es: 'Stripe' },
          sub: { en: 'intents · subscriptions', es: 'intents · suscripciones' },
          x: 640,
          y: 230,
          accent: true,
        },
        {
          id: 'accounts',
          label: { en: 'Connected accounts', es: 'Cuentas conectadas' },
          sub: { en: 'fees · payouts', es: 'comisiones · payouts' },
          x: 640,
          y: 70,
        },
        { id: 'hooks', label: { en: 'Webhooks', es: 'Webhooks' }, sub: { en: 'signature-verified', es: 'firma verificada' }, x: 640, y: 440 },
        { id: 'db', label: { en: 'Postgres', es: 'Postgres' }, sub: { en: 'state · RPC', es: 'estado · RPC' }, x: 890, y: 440 },
        { id: 'receipts', label: { en: 'Receipts', es: 'Recibos' }, sub: { en: 'PDF · CSV · S3', es: 'PDF · CSV · S3' }, x: 890, y: 230 },
      ],
      edges: [
        { from: 'checkout', to: 'api' },
        { from: 'api', to: 'guard', label: { en: 'check', es: 'revisa' }, dashed: true },
        { from: 'api', to: 'stripe', label: { en: 'intent', es: 'intent' } },
        { from: 'stripe', to: 'accounts' },
        { from: 'stripe', to: 'hooks', label: { en: 'events', es: 'eventos' }, dashed: true },
        { from: 'hooks', to: 'db', label: { en: 'persist', es: 'persiste' } },
        { from: 'db', to: 'receipts' },
      ],
      story: [
        { en: 'Buyers pay inside the product with Stripe Elements.', es: 'Los compradores pagan dentro del producto con Stripe Elements.' },
        { en: 'A NestJS API creates and confirms every PaymentIntent.', es: 'Una API en NestJS crea y confirma cada PaymentIntent.' },
        {
          en: 'Before a card is charged, a Redis guard checks the device.',
          es: 'Antes de cobrar una tarjeta, un guard en Redis revisa el dispositivo.',
        },
        {
          en: 'Stripe handles cards, saved methods and subscriptions.',
          es: 'Stripe maneja tarjetas, métodos guardados y suscripciones.',
        },
        {
          en: 'Connected accounts get their share; the platform keeps its fee.',
          es: 'Las cuentas conectadas reciben su parte; la plataforma se queda con su comisión.',
        },
        { en: 'Signed webhooks report what really happened.', es: 'Webhooks firmados reportan lo que de verdad pasó.' },
        { en: 'Every transaction state lands in Postgres.', es: 'Cada estado de la transacción queda en Postgres.' },
        {
          en: 'Receipts and exports are generated from that one record.',
          es: 'Los recibos y las exportaciones salen de ese único registro.',
        },
      ],
    },
    pipelineLabel: BUILT,
    pipeline: [
      { en: 'Auth', es: 'Auth' },
      { en: 'Users', es: 'Usuarios' },
      { en: 'Checkout', es: 'Checkout' },
      { en: 'Subscriptions', es: 'Suscripciones' },
      { en: 'Webhooks', es: 'Webhooks' },
      { en: 'Payouts', es: 'Payouts' },
      { en: 'Receipts', es: 'Recibos' },
      { en: 'Reports', es: 'Reportes' },
    ],
    metrics: [
      {
        value: 100,
        prefix: '$',
        suffix: 'K+',
        label: { en: 'In transactions, hundreds of thousands of dollars', es: 'En transacciones, cientos de miles de dólares' },
      },
      {
        value: 100,
        suffix: '%',
        label: { en: 'Of the payment flow built and maintained by me', es: 'Del flujo de pagos construido y mantenido por mí' },
      },
    ],
  },
  {
    id: 'offline-wallet',
    title: { en: 'Paying without signal', es: 'Pagar sin señal' },
    kicker: {
      en: "Mobile payments for Ecuador's largest digital wallet: QR codes, deep links and offline payments encrypted on the device.",
      es: 'Pagos móviles para la billetera digital más grande de Ecuador: códigos QR, deep links y pagos sin conexión cifrados en el dispositivo.',
    },
    company: 'Devsu',
    role: 'Mobile & Frontend Developer',
    years: '2024 — 2025',
    stack: ['React Native', 'NestJS', 'TypeScript', 'AWS', 'Design system'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Integrations'],
    diagram: {
      caption: {
        en: 'A payment that starts offline and settles once the network is back.',
        es: 'Un pago que empieza sin conexión y se liquida cuando vuelve la red.',
      },
      nodes: [
        { id: 'phone', label: { en: 'Wallet app', es: 'App billetera' }, sub: { en: 'React Native', es: 'React Native' }, x: 110, y: 120 },
        { id: 'qr', label: { en: 'QR · deep link', es: 'QR · deep link' }, sub: { en: 'start a payment', es: 'iniciar un pago' }, x: 370, y: 120 },
        {
          id: 'offline',
          label: { en: 'Offline payment', es: 'Pago sin conexión' },
          sub: { en: 'encrypted on device', es: 'cifrado en el equipo' },
          x: 630,
          y: 120,
          accent: true,
        },
        { id: 'sync', label: { en: 'Back online', es: 'Vuelve la red' }, sub: { en: 'sync', es: 'sincroniza' }, x: 890, y: 120 },
        {
          id: 'services',
          label: { en: 'Backend services', es: 'Servicios backend' },
          sub: { en: 'NestJS · AWS', es: 'NestJS · AWS' },
          x: 890,
          y: 380,
        },
        { id: 'cache', label: { en: 'Cache', es: 'Caché' }, sub: { en: 'no empty responses', es: 'sin respuestas vacías' }, x: 630, y: 380 },
        { id: 'charts', label: { en: 'Charts', es: 'Gráficas' }, sub: { en: 'money, made visual', es: 'el dinero, visual' }, x: 370, y: 380 },
      ],
      edges: [
        { from: 'phone', to: 'qr' },
        { from: 'qr', to: 'offline', label: { en: 'no signal', es: 'sin señal' } },
        { from: 'offline', to: 'sync', dashed: true },
        { from: 'sync', to: 'services' },
        { from: 'services', to: 'cache' },
        { from: 'cache', to: 'charts' },
      ],
      story: [
        { en: 'A wallet app, often on a weak network.', es: 'Una app de billetera, muchas veces con mala señal.' },
        { en: 'Pay by scanning a QR code or opening a deep link.', es: 'Se paga escaneando un QR o abriendo un deep link.' },
        {
          en: 'With no signal, the payment is encrypted and kept on the device.',
          es: 'Sin señal, el pago se cifra y se guarda en el dispositivo.',
        },
        { en: 'When the network returns, it syncs.', es: 'Cuando vuelve la red, se sincroniza.' },
        {
          en: 'Backend services take over, across a large distributed team.',
          es: 'Los servicios backend toman el control, con un equipo grande y distribuido.',
        },
        {
          en: 'A cache layer stops empty or invalid responses from reaching the user.',
          es: 'Una capa de caché evita que respuestas vacías o inválidas lleguen al usuario.',
        },
        {
          en: 'Interactive charts show people where their money goes.',
          es: 'Gráficas interactivas le muestran a la gente a dónde va su dinero.',
        },
      ],
    },
    pipelineLabel: BUILT,
    pipeline: [
      { en: 'QR payments', es: 'Pagos QR' },
      { en: 'Deep links', es: 'Deep links' },
      { en: 'Offline mode', es: 'Modo offline' },
      { en: 'Encryption', es: 'Cifrado' },
      { en: 'Charts', es: 'Gráficas' },
      { en: 'Service migration', es: 'Migración de servicios' },
    ],
    metrics: [
      { value: 1000, suffix: 's', label: { en: 'Of people paying with no connection', es: 'De personas pagando sin conexión' } },
      { value: 1, prefix: '#', label: { en: 'Digital wallet in Ecuador', es: 'Billetera digital de Ecuador' } },
    ],
  },
  {
    id: 'api',
    title: { en: 'Backends that hold the load', es: 'Backends que aguantan la carga' },
    kicker: {
      en: 'APIs that answer hundreds of people at the same time: relational and non-relational data, webhooks from payment providers, and Redis in front of whatever gets slow.',
      es: 'APIs que responden a cientos de personas al mismo tiempo: datos relacionales y no relacionales, webhooks de proveedores de pago, y Redis delante de lo que se pone lento.',
    },
    ai: {
      en: 'Implementation plans, backend code and tests drafted with AI, reviewed line by line.',
      es: 'Planes de implementación, código backend y tests hechos con IA, revisados línea por línea.',
    },
    company: 'Katapult Labs · Kuepa · GooDev',
    role: 'Full Stack Developer',
    years: { en: '2022 — Now', es: '2022 — Hoy' },
    stack: ['NestJS', 'Express', 'PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'Redis'],
    layers: ['Backend', 'Database', 'Integrations', 'AI'],
    diagram: {
      caption: {
        en: 'Many users at once, one API, a cache in front and the right database behind.',
        es: 'Muchos usuarios a la vez, una API, una caché delante y la base de datos correcta detrás.',
      },
      nodes: [
        {
          id: 'users',
          label: { en: 'Hundreds of users', es: 'Cientos de usuarios' },
          sub: { en: 'at the same time', es: 'al mismo tiempo' },
          x: 110,
          y: 230,
        },
        { id: 'api', label: { en: 'API', es: 'API' }, sub: { en: 'NestJS · Express', es: 'NestJS · Express' }, x: 370, y: 230 },
        {
          id: 'hooks',
          label: { en: 'Webhooks', es: 'Webhooks' },
          sub: { en: 'signature-verified', es: 'firma verificada' },
          x: 370,
          y: 440,
        },
        {
          id: 'cache',
          label: { en: 'Redis cache', es: 'Caché Redis' },
          sub: { en: 'answers from memory', es: 'responde desde memoria' },
          x: 630,
          y: 80,
          accent: true,
        },
        {
          id: 'orm',
          label: { en: 'Prisma · TypeORM', es: 'Prisma · TypeORM' },
          sub: { en: 'Sequelize · Mongoose', es: 'Sequelize · Mongoose' },
          x: 630,
          y: 300,
        },
        {
          id: 'sql',
          label: { en: 'Relational', es: 'Relacional' },
          sub: { en: 'Postgres · MySQL', es: 'Postgres · MySQL' },
          x: 890,
          y: 230,
        },
        {
          id: 'nosql',
          label: { en: 'Non-relational', es: 'No relacional' },
          sub: { en: 'MongoDB', es: 'MongoDB' },
          x: 890,
          y: 380,
        },
      ],
      edges: [
        { from: 'users', to: 'api' },
        { from: 'hooks', to: 'api', label: { en: 'events', es: 'eventos' }, dashed: true },
        { from: 'api', to: 'cache', label: { en: 'read', es: 'lee' } },
        { from: 'api', to: 'orm', label: { en: 'write', es: 'escribe' } },
        { from: 'cache', to: 'sql', label: { en: 'miss', es: 'si no está' }, dashed: true },
        { from: 'orm', to: 'sql' },
        { from: 'orm', to: 'nosql' },
      ],
      story: [
        {
          en: 'Hundreds of people at once, each asking for their own data.',
          es: 'Cientos de personas a la vez, cada una pidiendo sus propios datos.',
        },
        {
          en: 'One API answers them all, with auth, roles and rate limits in front.',
          es: 'Una API les responde a todas, con autenticación, roles y límites de uso delante.',
        },
        {
          en: 'Providers like Stripe push events by webhook; each one is verified before it counts.',
          es: 'Proveedores como Stripe mandan eventos por webhook; cada uno se verifica antes de contar.',
        },
        {
          en: 'Redis answers the frequent reads from memory, so the database is not asked twice.',
          es: 'Redis responde desde memoria las lecturas frecuentes, para no preguntarle dos veces a la base de datos.',
        },
        {
          en: 'Writes go through an ORM: Prisma, TypeORM, Sequelize or Mongoose, or plain SQL, whichever the project calls for.',
          es: 'Las escrituras pasan por un ORM: Prisma, TypeORM, Sequelize o Mongoose, o SQL puro, lo que pida el proyecto.',
        },
        {
          en: 'Data with strict relations lives in Postgres or MySQL.',
          es: 'Los datos con relaciones estrictas viven en Postgres o MySQL.',
        },
        {
          en: 'Documents that change shape live in MongoDB.',
          es: 'Los documentos que cambian de forma viven en MongoDB.',
        },
      ],
    },
    pipelineLabel: BUILT,
    pipeline: [
      { en: 'Auth & roles', es: 'Auth y roles' },
      { en: 'REST APIs', es: 'APIs REST' },
      { en: 'SQL', es: 'SQL' },
      { en: 'NoSQL', es: 'NoSQL' },
      { en: 'ORMs', es: 'ORMs' },
      { en: 'Webhooks', es: 'Webhooks' },
      { en: 'Redis cache', es: 'Caché Redis' },
      { en: 'Jobs', es: 'Jobs' },
    ],
    metrics: [
      {
        value: 100,
        suffix: 's',
        label: { en: 'Of users at the same time, each reading their own data', es: 'De usuarios al mismo tiempo, cada uno con sus propios datos' },
      },
      {
        word: { en: 'SQL + NoSQL', es: 'SQL + NoSQL' },
        label: { en: 'Postgres, MySQL and MongoDB, chosen by what the data needs', es: 'Postgres, MySQL y MongoDB, según lo que necesiten los datos' },
      },
      {
        word: { en: 'Webhooks', es: 'Webhooks' },
        label: { en: 'Payment events, verified before anything is saved', es: 'Eventos de pago, verificados antes de guardar nada' },
      },
    ],
  },
  {
    id: 'redis',
    title: { en: 'Redis, from cache to shield', es: 'Redis, de caché a escudo' },
    kicker: {
      en: 'First to make an edtech platform answer faster. Later, to rate-limit an API and stop card testing before a stolen card is ever charged.',
      es: 'Primero, para que una plataforma edtech respondiera más rápido. Después, para limitar el uso de una API y frenar el card testing antes de que se cobre una tarjeta robada.',
    },
    company: 'Kuepa → Katapult Labs',
    role: 'Full Stack Developer',
    years: { en: '2022 — Now', es: '2022 — Hoy' },
    stack: ['Redis', 'Node', 'NestJS', 'Lua', 'Stripe'],
    layers: ['Backend', 'Database', 'Integrations'],
    diagram: {
      caption: {
        en: 'A two-layer circuit breaker that counts declines, not traffic.',
        es: 'Un circuit breaker de dos capas que cuenta rechazos, no tráfico.',
      },
      nodes: [
        {
          id: 'req',
          label: { en: 'Payment request', es: 'Solicitud de pago' },
          sub: { en: 'with a device id', es: 'con id de dispositivo' },
          x: 110,
          y: 120,
        },
        {
          id: 'bucket',
          label: { en: 'Device · IP bucket', es: 'Bucket equipo · IP' },
          sub: { en: 'who is asking', es: 'quién pregunta' },
          x: 370,
          y: 120,
        },
        {
          id: 'velocity',
          label: { en: 'Velocity check', es: 'Control de ritmo' },
          sub: { en: 'intents per 10 min', es: 'intents por 10 min' },
          x: 630,
          y: 120,
        },
        { id: 'stripe', label: { en: 'Stripe', es: 'Stripe' }, sub: { en: 'charge attempt', es: 'intento de cobro' }, x: 890, y: 120 },
        {
          id: 'decline',
          label: { en: 'Decline webhook', es: 'Webhook de rechazo' },
          sub: { en: 'card fingerprint', es: 'huella de tarjeta' },
          x: 890,
          y: 380,
        },
        {
          id: 'counters',
          label: { en: 'Redis counters', es: 'Contadores Redis' },
          sub: { en: 'atomic Lua scripts', es: 'scripts Lua atómicos' },
          x: 630,
          y: 380,
          accent: true,
        },
        {
          id: 'breaker',
          label: { en: 'Circuit breaker', es: 'Circuit breaker' },
          sub: { en: 'block · retry-after', es: 'bloqueo · retry-after' },
          x: 370,
          y: 380,
        },
      ],
      edges: [
        { from: 'req', to: 'bucket' },
        { from: 'bucket', to: 'velocity' },
        { from: 'velocity', to: 'stripe', label: { en: 'allowed', es: 'permitido' } },
        { from: 'stripe', to: 'decline', label: { en: 'declined', es: 'rechazado' }, dashed: true },
        { from: 'decline', to: 'counters' },
        { from: 'counters', to: 'breaker', label: { en: 'tripped', es: 'se dispara' } },
      ],
      story: [
        { en: 'Every payment request carries a device id.', es: 'Cada solicitud de pago lleva un id de dispositivo.' },
        { en: 'Each one is bucketed by device and by IP.', es: 'Cada una se agrupa por dispositivo y por IP.' },
        {
          en: 'Too many payment intents from one device in ten minutes: blocked on the spot.',
          es: 'Demasiados intentos de pago desde un dispositivo en diez minutos: bloqueado en el acto.',
        },
        { en: 'Otherwise, Stripe tries the card.', es: 'Si no, Stripe intenta cobrar la tarjeta.' },
        {
          en: 'Declines come back by webhook, with the card fingerprint.',
          es: 'Los rechazos vuelven por webhook, con la huella de la tarjeta.',
        },
        {
          en: 'Redis counts distinct declined cards per bucket, atomically.',
          es: 'Redis cuenta las tarjetas rechazadas distintas por bucket, de forma atómica.',
        },
        {
          en: 'Three bad cards on one device trip the breaker. A crowd on shared Wi-Fi never does.',
          es: 'Tres tarjetas malas en un dispositivo disparan el breaker. Mucha gente en el mismo Wi-Fi, nunca.',
        },
      ],
    },
    pipelineLabel: { en: 'Over the years', es: 'Con los años' },
    pipeline: [
      { en: 'Response cache', es: 'Caché de respuestas' },
      { en: 'Rate limiting', es: 'Rate limiting' },
      { en: 'Throttler storage', es: 'Storage del throttler' },
      { en: 'Velocity cap', es: 'Tope de ritmo' },
      { en: 'Card-testing breaker', es: 'Breaker de card testing' },
    ],
    metrics: [
      {
        word: { en: 'Faster', es: 'Más rápido' },
        label: {
          en: 'Frequent reads served from memory instead of the database',
          es: 'Lecturas frecuentes servidas desde memoria y no desde la base de datos',
        },
      },
      {
        word: { en: 'Fair use', es: 'Uso justo' },
        label: {
          en: 'Rate limits shared by every server, so no one can flood the API',
          es: 'Límites compartidos por todos los servidores, para que nadie sature la API',
        },
      },
      {
        word: { en: 'Fraud', es: 'Fraude' },
        label: { en: 'Stolen cards blocked before they are ever charged', es: 'Tarjetas robadas bloqueadas antes de cobrarse' },
      },
    ],
  },
  {
    id: 'checked-three-times',
    title: { en: 'Checked three times', es: 'Revisado tres veces' },
    kicker: {
      en: 'Every rule runs when the agent writes, when I commit and when CI merges. Desktop apps go further: real macOS and Windows builds are launched before each release.',
      es: 'Cada regla corre cuando el agente escribe, cuando hago commit y cuando CI hace merge. Las apps de escritorio van más allá: se lanzan builds reales de macOS y Windows antes de cada release.',
    },
    ai: {
      en: 'The same rules guard humans and agents. Neither can skip them.',
      es: 'Las mismas reglas cuidan a humanos y agentes. Ninguno se las puede saltar.',
    },
    company: 'Katapult Labs · Lucka',
    role: 'Full Stack Developer',
    years: NOW,
    stack: ['GitHub Actions', 'Husky', 'Jest', 'Cypress', 'Supabase CLI', 'Vercel'],
    layers: ['Database', 'CI/CD', 'AI'],
    diagram: {
      caption: {
        en: 'Three guardrail layers, a preview per pull request and migrations per environment.',
        es: 'Tres capas de control, un preview por pull request y migraciones por ambiente.',
      },
      nodes: [
        { id: 'write', label: { en: 'On write', es: 'Al escribir' }, sub: { en: 'Claude hooks', es: 'hooks de Claude' }, x: 110, y: 120 },
        { id: 'commit', label: { en: 'On commit', es: 'Al hacer commit' }, sub: { en: 'Husky · lint-staged', es: 'Husky · lint-staged' }, x: 370, y: 120 },
        {
          id: 'ci',
          label: { en: 'On merge', es: 'Al hacer merge' },
          sub: { en: 'lint · types · Jest', es: 'lint · tipos · Jest' },
          x: 630,
          y: 120,
          accent: true,
        },
        {
          id: 'migrations',
          label: { en: 'Migrations', es: 'Migraciones' },
          sub: { en: 'applied to a fresh DB', es: 'sobre una DB limpia' },
          x: 890,
          y: 120,
        },
        { id: 'preview', label: { en: 'Preview', es: 'Preview' }, sub: { en: 'Vercel, per PR', es: 'Vercel, por PR' }, x: 630, y: 380 },
        { id: 'e2e', label: { en: 'Cypress', es: 'Cypress' }, sub: { en: 'against the preview', es: 'contra el preview' }, x: 370, y: 380 },
        {
          id: 'envs',
          label: { en: 'Environments', es: 'Ambientes' },
          sub: { en: '3, one database each', es: '3, una base cada uno' },
          x: 890,
          y: 380,
        },
      ],
      edges: [
        { from: 'write', to: 'commit' },
        { from: 'commit', to: 'ci' },
        { from: 'ci', to: 'migrations' },
        { from: 'ci', to: 'preview', label: { en: 'deploy', es: 'deploy' } },
        { from: 'preview', to: 'e2e' },
        { from: 'migrations', to: 'envs', label: { en: 'promote', es: 'promueve' } },
      ],
      story: [
        {
          en: 'On write: Claude hooks block what the rules forbid and lint every edit.',
          es: 'Al escribir: los hooks de Claude bloquean lo que las reglas prohíben y pasan lint a cada cambio.',
        },
        {
          en: 'On commit: Husky and lint-staged run the same rules again.',
          es: 'Al hacer commit: Husky y lint-staged vuelven a correr las mismas reglas.',
        },
        { en: 'On merge: CI runs lint, types and unit tests.', es: 'Al hacer merge: CI corre lint, tipos y tests unitarios.' },
        {
          en: 'Every migration is applied to a fresh local database before it can ship.',
          es: 'Cada migración se aplica sobre una base de datos local limpia antes de poder salir.',
        },
        { en: 'Each pull request gets its own Vercel preview.', es: 'Cada pull request tiene su propio preview en Vercel.' },
        { en: 'Cypress tests the real preview in a browser.', es: 'Cypress prueba el preview real en un navegador.' },
        {
          en: 'Migrations roll out one environment at a time: feedback, staging, main.',
          es: 'Las migraciones avanzan un ambiente a la vez: feedback, staging, main.',
        },
      ],
    },
    pipelineLabel: DELIVERY,
    pipeline: [
      { en: 'Write', es: 'Escribir' },
      { en: 'Commit', es: 'Commit' },
      { en: 'CI', es: 'CI' },
      { en: 'Migrations', es: 'Migraciones' },
      { en: 'Preview', es: 'Preview' },
      { en: 'Cypress', es: 'Cypress' },
      { en: 'Staging', es: 'Staging' },
      { en: 'Production', es: 'Producción' },
    ],
    metrics: [
      {
        word: { en: 'Checkout', es: 'Checkout' },
        label: {
          en: 'One-time and recurring payments, run end to end in a real browser on every PR',
          es: 'Pagos únicos y recurrentes, probados de punta a punta en un navegador real en cada PR',
        },
      },
      {
        word: { en: 'Roles', es: 'Roles' },
        label: {
          en: 'Who can see and do what, checked by unit tests on every PR',
          es: 'Quién puede ver y hacer qué, revisado con tests unitarios en cada PR',
        },
      },
      {
        word: { en: 'Migrations', es: 'Migraciones' },
        label: {
          en: 'Every database change applied to a fresh database before it ships',
          es: 'Cada cambio de base de datos aplicado a una base limpia antes de salir',
        },
      },
    ],
  },
  {
    id: 'mfe',
    title: { en: 'Splitting an edtech frontend', es: 'Dividir un frontend edtech' },
    kicker: {
      en: 'Proposed and built a Module Federation architecture for an education platform, then kept it fast: real-time updates, jobs, legacy clean-up and unit tests.',
      es: 'Propuse y construí una arquitectura con Module Federation para una plataforma educativa, y la mantuve rápida: tiempo real, jobs, limpieza de legacy y tests unitarios.',
    },
    company: 'Kuepa Edutech',
    role: 'Full Stack Developer',
    years: '2022 — 2024',
    stack: ['React', 'Module Federation', 'Node', 'Socket.io', 'AWS', 'Design system'],
    layers: ['Frontend', 'Mobile', 'Backend', 'Database', 'Integrations'],
    diagram: {
      caption: {
        en: 'A thin shell loading independently deployed remotes, with a live backend behind.',
        es: 'Un shell liviano que carga remotes desplegados por separado, con un backend en vivo detrás.',
      },
      nodes: [
        { id: 'users', label: { en: 'Users', es: 'Usuarios' }, sub: { en: 'students · advisors', es: 'estudiantes · asesores' }, x: 110, y: 230 },
        {
          id: 'shell',
          label: { en: 'App shell', es: 'App shell' },
          sub: { en: 'host · routing', es: 'host · rutas' },
          x: 370,
          y: 230,
          accent: true,
        },
        { id: 'aws', label: { en: 'AWS', es: 'AWS' }, sub: { en: 'remoteEntry.js', es: 'remoteEntry.js' }, x: 370, y: 440 },
        { id: 'dash', label: { en: 'Dashboards', es: 'Dashboards' }, sub: { en: 'remote', es: 'remote' }, x: 640, y: 90 },
        { id: 'leads', label: { en: 'Leads & reports', es: 'Leads y reportes' }, sub: { en: 'remote', es: 'remote' }, x: 640, y: 230 },
        { id: 'pay', label: { en: 'Payments', es: 'Pagos' }, sub: { en: 'remote', es: 'remote' }, x: 640, y: 370 },
        { id: 'node', label: { en: 'Node API', es: 'API Node' }, sub: { en: 'Socket.io · jobs', es: 'Socket.io · jobs' }, x: 890, y: 230 },
      ],
      edges: [
        { from: 'users', to: 'shell' },
        { from: 'aws', to: 'shell', label: { en: 'manifest', es: 'manifest' }, dashed: true },
        { from: 'shell', to: 'dash' },
        { from: 'shell', to: 'leads' },
        { from: 'shell', to: 'pay' },
        { from: 'leads', to: 'node', label: { en: 'live', es: 'en vivo' }, dashed: true },
      ],
      story: [
        { en: 'Students and advisors, one entry point.', es: 'Estudiantes y asesores, una sola entrada.' },
        { en: 'A thin shell owns routing and loads the rest.', es: 'Un shell liviano maneja las rutas y carga el resto.' },
        { en: 'Remotes are fetched at runtime from AWS.', es: 'Los remotes se descargan en tiempo de ejecución desde AWS.' },
        { en: 'Dashboards ship on their own.', es: 'Los dashboards se despliegan solos.' },
        { en: 'Leads and reports ship on their own.', es: 'Leads y reportes se despliegan solos.' },
        { en: 'Payments ship on their own.', es: 'Pagos se despliega solo.' },
        {
          en: 'A Node backend pushes live updates over Socket.io and runs the jobs.',
          es: 'Un backend en Node envía actualizaciones en vivo por Socket.io y corre los jobs.',
        },
      ],
    },
    pipelineLabel: BUILT,
    pipeline: [
      { en: 'Proposal', es: 'Propuesta' },
      { en: 'Shell', es: 'Shell' },
      { en: 'Remotes', es: 'Remotes' },
      { en: 'Real-time', es: 'Tiempo real' },
      { en: 'Jobs', es: 'Jobs' },
      { en: 'Unit tests', es: 'Tests unitarios' },
    ],
    metrics: [
      { value: 50, prefix: '~', suffix: '%', label: { en: 'Smaller deployments', es: 'Despliegues más pequeños' } },
      { value: 30, prefix: '~', suffix: '%', label: { en: 'Lower AWS bill', es: 'Menos en la factura de AWS' } },
      { value: 2, suffix: '+', label: { en: 'Years on the platform', es: 'Años en la plataforma' } },
    ],
  },
]
