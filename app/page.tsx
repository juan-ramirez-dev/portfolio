import { chapters } from '@/content/chapters'
import { Animations } from '@/components/scroll/Animations'
import { Hero } from '@/sections/Hero'
import { Manifesto } from '@/sections/Manifesto'
import { Chapter } from '@/sections/Chapter'
import { Ledger } from '@/sections/Ledger'
import { Movement } from '@/sections/Movement'
import { Colophon } from '@/sections/Colophon'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      {chapters.map((c, i) => (
        <Chapter key={c.id} chapter={c} number={i + 1} theme={i % 2 === 0 ? 'bezel' : 'dial'} />
      ))}
      <Ledger />
      <Movement />
      <Colophon />
      <Animations />
    </>
  )
}
