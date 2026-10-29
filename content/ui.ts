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
  learning: {
    label: { en: 'Learning', es: 'Aprendizaje' },
    title: { en: 'Still learning.', es: 'Sigo aprendiendo.' },
    line: {
      en: 'Courses I’ve taken, explained the way I understood them, with something to try for every idea.',
      es: 'Los cursos que he hecho, explicados como yo los entendí, con algo para probar en cada idea.',
    },
    meta: {
      title: {
        en: 'Learning — courses I’ve taken, explained interactively | Juan Ramírez',
        es: 'Aprendizaje — los cursos que he hecho, explicados de forma interactiva | Juan Ramírez',
      },
      description: {
        en: 'Summaries of the courses Juan Ramírez has taken, starting with Harvard’s CS50x, with interactive examples for every idea.',
        es: 'Resúmenes de los cursos que ha hecho Juan Ramírez, empezando por CS50x de Harvard, con ejemplos interactivos para cada idea.',
      },
    },
    courses: { en: 'courses', es: 'cursos' },
    course: { en: 'Course', es: 'Curso' },
    notes: { en: 'Notes, not lessons', es: 'Apuntes, no lecciones' },
    published: { en: 'published', es: 'publicados' },
    soon: { en: 'Coming soon', es: 'Próximamente' },
    latest: { en: 'Latest', es: 'Lo último' },
    week: { en: 'Week', es: 'Semana' },
    weeks: { en: 'Weeks', es: 'Semanas' },
    parts: { en: 'parts', es: 'partes' },
    contents: { en: 'Parts/', es: 'Partes/' },
    keyIdea: { en: 'Key idea', es: 'Idea clave' },
    copyPart: { en: 'Copy this part for Claude', es: 'Copiar esta parte para Claude' },
    copyChapter: { en: 'Copy the chapter for Claude', es: 'Copiar el capítulo para Claude' },
    copied: { en: 'Copied — paste it into Claude', es: 'Copiado: pégalo en Claude' },
    endLabel: { en: 'End of chapter', es: 'Fin del capítulo' },
    endTitle: { en: 'Take it with you.', es: 'Llévatelo.' },
    endLine: {
      en: 'Copy this summary and paste it into your own Claude. It comes with a prompt and the official transcript, so you can ask anything and get quizzed on it.',
      es: 'Copia este resumen y pégalo en tu propio Claude. Va con un prompt y el transcript oficial, para que preguntes lo que quieras y te haga preguntas.',
    },
    sources: { en: 'Sources', es: 'Fuentes' },
    transcript: { en: 'Official transcript', es: 'Transcript oficial' },
    officialNotes: { en: 'Official notes', es: 'Notas oficiales' },
    video: { en: 'Lecture video', es: 'Video de la clase' },
    official: { en: 'Course site', es: 'Sitio del curso' },
    allWeeks: { en: 'All weeks', es: 'Todas las semanas' },
    next: { en: 'Next', es: 'Siguiente' },
    all: { en: 'All learning', es: 'Todo el aprendizaje' },
    /** first line of what "Copy for Claude" puts on the clipboard */
    prompt: {
      en: 'Below is my summary of {chapter} from {course} ({provider}). Use it as context: explain anything that isn’t clear with simple examples, and ask me short questions to check I understood. The full official lecture transcript is here: {transcript}',
      es: 'Abajo está mi resumen de la {chapter} de {course} ({provider}). Úsalo como contexto: explícame lo que no quede claro con ejemplos simples y hazme preguntas cortas para comprobar que lo entendí. El transcript oficial completo de la clase está aquí: {transcript}',
    },
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
