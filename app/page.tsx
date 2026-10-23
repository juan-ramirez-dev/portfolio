import { Fragment } from 'react'
import { skills } from '@/content/skills'
import { Animations } from '@/components/scroll/Animations'
import { Panels } from '@/components/scroll/Panels'
import { Hero } from '@/sections/Hero'
import { Separator } from '@/sections/Separator'
import { Case } from '@/sections/Case'
import { Ledger } from '@/sections/Ledger'
import { Colophon } from '@/sections/Colophon'

export default function Home() {
  const total = String(skills.length).padStart(2, '0')
  return (
    <>
      <Hero />
      {skills.map((s) => (
        <Fragment key={s.id}>
          <Separator skill={s} folio={`${s.n} / ${total}`} />
          {s.cases.map((c, i) => (
            <Case key={c.id} data={c} skill={s} number={i + 1} folio={`${s.n} / ${total}`} />
          ))}
        </Fragment>
      ))}
      <Ledger />
      <Colophon />
      <Panels />
      <Animations />
    </>
  )
}
