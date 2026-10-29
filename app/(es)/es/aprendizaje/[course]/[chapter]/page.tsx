import { ChapterPage } from '@/sections/learning/ChapterPage'
import { chapterMetadata, chapterParams, resolveChapter } from '@/sections/learning/metadata'

type Props = { params: Promise<{ course: string; chapter: string }> }

export const dynamicParams = false
export const generateStaticParams = () => chapterParams('es')

export async function generateMetadata({ params }: Props) {
  const { course, chapter } = await params
  return chapterMetadata('es', course, chapter)
}

export default async function Page({ params }: Props) {
  const { course, chapter } = await params
  return <ChapterPage lang="es" {...resolveChapter('es', course, chapter)} />
}
