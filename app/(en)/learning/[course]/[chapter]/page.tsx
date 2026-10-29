import { ChapterPage } from '@/sections/learning/ChapterPage'
import { chapterMetadata, chapterParams, resolveChapter } from '@/sections/learning/metadata'

type Props = { params: Promise<{ course: string; chapter: string }> }

export const dynamicParams = false
export const generateStaticParams = () => chapterParams('en')

export async function generateMetadata({ params }: Props) {
  const { course, chapter } = await params
  return chapterMetadata('en', course, chapter)
}

export default async function Page({ params }: Props) {
  const { course, chapter } = await params
  return <ChapterPage lang="en" {...resolveChapter('en', course, chapter)} />
}
