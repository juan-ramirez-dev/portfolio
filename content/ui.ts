import type { Layer } from './cases'
import type { T } from './i18n'

/** interface copy: everything on the page that isn't a case or the profile */
export const ui = {
  meta: {
    title: {
      en: 'Juan Ramírez — Full Stack Developer, building with AI',
      es: 'Juan Ramírez — Full Stack Developer que construye con IA',
    },
    description: {
      en: 'Payments, AI products, backends and delivery pipelines, built end to end by Juan Ramírez.',
      es: 'Pagos, productos con IA, backends y pipelines de entrega, construidos de punta a punta por Juan Ramírez.',
    },
  },
  /** shown on the switch: the other language */
  switchTo: { en: 'ES', es: 'EN' },
  switchLabel: { en: 'Leer en español', es: 'Read in English' },
  cover: {
    label: { en: 'Portfolio', es: 'Portafolio' },
    portrait: { en: 'Portrait', es: 'Retrato' },
    contents: { en: 'Contents/', es: 'Contenido/' },
  },
  separator: {
    skill: { en: 'Skill', es: 'Skill' },
    case: { en: 'case', es: 'caso' },
    cases: { en: 'cases', es: 'casos' },
  },
  case: {
    layers: { en: 'Layers', es: 'Capas' },
    ai: { en: 'AI in the loop', es: 'IA en el proceso' },
    delivery: { en: 'Delivery', es: 'Entrega' },
    impact: { en: 'Impact', es: 'Impacto' },
    pipeline: {
      en: 'Delivery pipeline — every merge walks the same path to production.',
      es: 'Pipeline de entrega: cada merge recorre el mismo camino a producción.',
    },
  },
  layers: {
    Frontend: { en: 'Frontend', es: 'Frontend' },
    Mobile: { en: 'Mobile', es: 'Móvil' },
    Backend: { en: 'Backend', es: 'Backend' },
    Database: { en: 'Database', es: 'Base de datos' },
    Integrations: { en: 'Integrations', es: 'Integraciones' },
    'CI/CD': { en: 'CI/CD', es: 'CI/CD' },
    AI: { en: 'AI', es: 'IA' },
  } satisfies Record<Layer, T>,
  index: {
    label: { en: 'Index', es: 'Índice' },
    roles: { en: 'roles', es: 'roles' },
    where: { en: 'Where the work happened', es: 'Dónde pasó el trabajo' },
    title: { en: 'Where.', es: 'Dónde.' },
  },
  projects: {
    label: { en: 'Side projects', es: 'Proyectos propios' },
    count: { en: 'projects', es: 'proyectos' },
    own: { en: 'Built on my own time', es: 'Construidos en mi tiempo' },
    title: { en: 'On the side.', es: 'Por mi cuenta.' },
  },
  contact: {
    label: { en: 'Contact', es: 'Contacto' },
    folio: { en: 'End', es: 'Fin' },
    touch: { en: 'Get in touch', es: 'Escríbeme' },
    end: { en: 'End of portfolio', es: 'Fin del portafolio' },
    title: { en: "Let's talk.", es: 'Hablemos.' },
    type: { en: 'Set in Inter Tight & JetBrains Mono', es: 'Compuesto en Inter Tight y JetBrains Mono' },
    built: { en: 'Built with Next.js & GSAP', es: 'Hecho con Next.js y GSAP' },
  },
}
