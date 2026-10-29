import { CoursePage } from '@/sections/learning/CoursePage'
import { courseMetadata, courseParams, resolveCourse } from '@/sections/learning/metadata'

type Props = { params: Promise<{ course: string }> }

export const dynamicParams = false
export const generateStaticParams = () => courseParams('en')

export async function generateMetadata({ params }: Props) {
  return courseMetadata('en', (await params).course)
}

export default async function Page({ params }: Props) {
  return <CoursePage lang="en" course={resolveCourse('en', (await params).course)} />
}
