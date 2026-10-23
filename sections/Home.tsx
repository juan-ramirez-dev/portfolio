import { Fragment } from 'react'
import { getContent } from '@/content'
import type { Locale } from '@/content/i18n'
import { Animations } from '@/components/scroll/Animations'
import { Panels } from '@/components/scroll/Panels'
import { Hero } from '@/sections/Hero'
import { Separator } from '@/sections/Separator'
import { Case } from '@/sections/Case'
import { Ledger } from '@/sections/Ledger'
import { Projects } from '@/sections/Projects'
import { Colophon } from '@/sections/Colophon'

export function Home({ lang }: { lang: Locale }) {
  const { skills, ui } = getContent(lang)
  const total = String(skills.length).padStart(2, '0')
  return (
    <>
      <Hero lang={lang} />
      {skills.map((s) => (
        <Fragment key={s.id}>
          <Separator skill={s} ui={ui} folio={`${s.n} / ${total}`} />
          {s.cases.map((c, i) => (
            <Case key={c.id} data={c} skill={s} ui={ui} number={i + 1} folio={`${s.n} / ${total}`} />
          ))}
        </Fragment>
      ))}
      <Ledger lang={lang} />
      <Projects lang={lang} />
      <Colophon lang={lang} />
      <Panels />
      <Animations />
    </>
  )
}
