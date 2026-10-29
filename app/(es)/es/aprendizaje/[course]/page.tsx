import { CoursePage } from '@/sections/learning/CoursePage'
import { courseMetadata, courseParams, resolveCourse } from '@/sections/learning/metadata'

type Props = { params: Promise<{ course: string }> }

export const dynamicParams = false
export const generateStaticParams = () => courseParams('es')

export async function generateMetadata({ params }: Props) {
  return courseMetadata('es', (await params).course)
}

export default async function Page({ params }: Props) {
  return <CoursePage lang="es" course={resolveCourse('es', (await params).course)} />
}
