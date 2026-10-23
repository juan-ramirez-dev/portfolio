export const LOCALES = ['en', 'es'] as const
export type Locale = (typeof LOCALES)[number]

/** home of each language, relative to the basePath */
export const HOME: Record<Locale, string> = { en: '/', es: '/es/' }

/** copy written in both languages, side by side so neither falls behind */
export type T = { en: string; es: string }

/** the same shape with every T resolved to one language */
export type Localized<V> = V extends T
  ? string
  : V extends readonly (infer U)[]
    ? Localized<U>[]
    : V extends object
      ? { [K in keyof V]: Localized<V[K]> }
      : V

const isText = (v: object): v is T => Object.keys(v).length === 2 && 'en' in v && 'es' in v

export function localize<V>(value: V, lang: Locale): Localized<V> {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang)) as Localized<V>
  if (value && typeof value === 'object') {
    if (isText(value)) return value[lang] as Localized<V>
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, lang)])) as Localized<V>
  }
  return value as Localized<V>
}
