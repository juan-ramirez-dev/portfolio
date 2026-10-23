import { career } from './career'
import { localize, type Locale, type Localized } from './i18n'
import { profile } from './profile'
import { projects } from './projects'
import { skills } from './skills'
import { ui } from './ui'

const all = { career, profile, projects, skills, ui }

const cache = new Map<Locale, Content>()

/** every piece of copy, resolved to one language */
export function getContent(lang: Locale) {
  if (!cache.has(lang)) cache.set(lang, localize(all, lang))
  return cache.get(lang)!
}

export type Content = Localized<typeof all>
export type LocalSkill = Content['skills'][number]
export type LocalCase = LocalSkill['cases'][number]
