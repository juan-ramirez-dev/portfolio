import type { Course } from './types'
import { week0 } from './cs50/week-0'

// Weeks as CS50x 2026 lists them (cs50.harvard.edu/x). A week gets its chapter once it's written.
export const cs50: Course = {
  id: 'cs50',
  slug: { en: 'cs50', es: 'cs50' },
  name: 'CS50x',
  title: {
    en: 'Harvard CS50x: Introduction to Computer Science',
    es: 'Harvard CS50x: introducción a la ciencia de la computación',
  },
  provider: 'Harvard University',
  url: 'https://cs50.harvard.edu/x/',
  colour: 'blue',
  line: {
    en: 'Harvard’s introduction to computer science, taught by David J. Malan. My notes, one week at a time.',
    es: 'La introducción de Harvard a la ciencia de la computación, con David J. Malan. Mis apuntes, una semana a la vez.',
  },
  seo: {
    title: {
      en: 'CS50x Summary: Week-by-Week Notes with Interactive Examples',
      es: 'Resumen de CS50x: apuntes semana a semana con ejemplos interactivos',
    },
    description: {
      en: 'A summary of Harvard’s CS50x, week by week, with interactive examples for every idea: binary, C, algorithms, memory, Python, SQL and the web.',
      es: 'Resumen de CS50x de Harvard, semana a semana, con ejemplos interactivos para cada idea: binario, C, algoritmos, memoria, Python, SQL y la web.',
    },
  },
  weeks: [
    { n: '0', title: { en: 'Scratch', es: 'Scratch' }, chapter: week0 },
    { n: '1', title: { en: 'C', es: 'C' } },
    { n: '2', title: { en: 'Arrays', es: 'Arreglos' } },
    { n: '3', title: { en: 'Algorithms', es: 'Algoritmos' } },
    { n: '4', title: { en: 'Memory', es: 'Memoria' } },
    { n: '5', title: { en: 'Data Structures', es: 'Estructuras de datos' } },
    { n: '6', title: { en: 'Python', es: 'Python' } },
    { n: '7', title: { en: 'SQL', es: 'SQL' } },
    { n: 'AI', title: { en: 'Artificial Intelligence', es: 'Inteligencia artificial' } },
    { n: '8', title: { en: 'HTML, CSS, JavaScript', es: 'HTML, CSS y JavaScript' } },
    { n: '9', title: { en: 'Flask', es: 'Flask' } },
    { n: '10', title: { en: 'The End', es: 'El final' } },
  ],
}
