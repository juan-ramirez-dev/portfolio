export const profile = {
  name: 'Juan Ramírez',
  firstName: 'Juan',
  lastName: 'Ramírez',
  title: { en: 'Full Stack Developer, building with AI', es: 'Full Stack Developer que construye con IA' },
  subtitle: {
    en: 'Complete products — frontend, backend, data, payments and the pipeline that ships them.',
    es: 'Productos completos: frontend, backend, datos, pagos y el pipeline que los lleva a producción.',
  },
  availability: {
    en: 'Open to remote Full Stack and AI-augmented developer roles. I work in English and Spanish.',
    es: 'Disponible para roles remotos de Full Stack y desarrollo aumentado con IA. Trabajo en inglés y español.',
  },
  /** path under /public; until then the cover shows a coloured placeholder */
  portrait: '/media/portrait.jpg' as string | undefined,
  email: 'rjuandavid1002@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jdrmpj/' },
    { label: 'GitHub', href: 'https://github.com/juan-ramirez-dev' },
  ],
}
