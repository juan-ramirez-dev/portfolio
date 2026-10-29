import { Learning } from '@/sections/Learning'
import { Animations } from '@/components/scroll/Animations'
import { indexMetadata } from '@/sections/learning/metadata'

export const metadata = indexMetadata('en')

export default function Page() {
  return (
    <>
      <Learning lang="en" page />
      <Animations />
    </>
  )
}
