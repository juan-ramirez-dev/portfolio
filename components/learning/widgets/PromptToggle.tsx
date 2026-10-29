'use client'

import { useEffect, useState } from 'react'
import { localize, type Locale } from '@/content/i18n'
import { prefersReducedMotion } from '@/lib/gsap'
import { Lab } from './Lab'

const copy = {
  title: { en: 'System prompt vs user prompt', es: 'System prompt vs user prompt' },
  hint: {
    en: 'Hand-written replies to show the idea. Nothing here calls a real AI.',
    es: 'Respuestas escritas a mano para mostrar la idea. Aquí nada llama a una IA de verdad.',
  },
  system: { en: 'System', es: 'Sistema' },
  user: { en: 'User', es: 'Usuario' },
  assistant: { en: 'Assistant', es: 'Asistente' },
  question: { en: 'What is CS50?', es: '¿Qué es CS50?' },
  pick: { en: 'Pick a system prompt', es: 'Elige un system prompt' },
}

const SYSTEMS = [
  {
    id: 'none',
    label: { en: 'None', es: 'Ninguno' },
    prompt: { en: '(empty)', es: '(vacío)' },
    reply: {
      en: 'CS50 is Harvard’s introduction to computer science, taught by David J. Malan. It starts with Scratch, then moves through C, Python, SQL and web development.',
      es: 'CS50 es la introducción de Harvard a la ciencia de la computación, con David J. Malan. Empieza con Scratch y pasa por C, Python, SQL y desarrollo web.',
    },
  },
  {
    id: 'short',
    label: { en: 'One sentence', es: 'Una frase' },
    prompt: { en: 'Answer in one short sentence.', es: 'Responde en una sola frase corta.' },
    reply: { en: 'Harvard’s intro to computer science.', es: 'La intro de Harvard a la computación.' },
  },
  {
    id: 'cat',
    label: { en: 'Be a cat', es: 'Sé un gato' },
    prompt: { en: 'Pretend you are a cat.', es: 'Finge que eres un gato.' },
    reply: {
      en: 'Meow. It’s where humans learn to talk to computers. I mostly sleep on the keyboard. Meow.',
      es: 'Miau. Es donde los humanos aprenden a hablarle a las computadoras. Yo casi siempre duermo sobre el teclado. Miau.',
    },
  },
  {
    id: 'kid',
    label: { en: 'Explain like I’m 5', es: 'Como si tuviera 5' },
    prompt: { en: 'Explain it to a five-year-old.', es: 'Explícaselo a un niño de cinco años.' },
    reply: {
      en: 'It’s a class where you learn how computers think, starting by building little games out of blocks.',
      es: 'Es una clase donde aprendes cómo piensan las computadoras, empezando por armar jueguitos con bloques.',
    },
  },
]

export function PromptToggle({ lang }: { lang: Locale }) {
  const t = localize(copy, lang)
  const systems = localize(SYSTEMS, lang)
  const [pick, setPick] = useState(0)
  const reply = systems[pick].reply
  const [shown, setShown] = useState(reply.length)

  // type the reply out, the way chat apps stream it
  useEffect(() => {
    if (prefersReducedMotion()) return setShown(reply.length)
    setShown(0)
    const id = window.setInterval(() => setShown((n) => (n >= reply.length ? n : n + 2)), 16)
    return () => window.clearInterval(id)
  }, [reply])

  return (
    <Lab lang={lang} title={t.title} hint={t.hint}>
      <div className="lab__btns" role="group" aria-label={t.pick}>
        {systems.map((s, i) => (
          <button key={s.id} type="button" className="lab__btn" aria-pressed={pick === i} onClick={() => setPick(i)}>
            {s.label}
          </button>
        ))}
      </div>

      <ol className="chat">
        <li className="chat__msg chat__msg--system">
          <span className="label">{t.system}</span>
          <p>{systems[pick].prompt}</p>
        </li>
        <li className="chat__msg">
          <span className="label">{t.user}</span>
          <p>{t.question}</p>
        </li>
        <li className="chat__msg chat__msg--reply" aria-live="polite">
          <span className="label">{t.assistant}</span>
          <p>
            {reply.slice(0, shown)}
            {shown < reply.length && <span className="chat__caret" aria-hidden />}
          </p>
        </li>
      </ol>
    </Lab>
  )
}
