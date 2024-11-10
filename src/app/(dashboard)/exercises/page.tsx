import ExerciseTable from './components/ExerciseTable'
import { prisma } from '@/app/utils/db'
import { type ExerciseSortField, type SortDirection } from '@/app/types'

export default async function Exercises({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const sortBy = params?.sortBy as ExerciseSortField
  const order = params?.order as SortDirection
  const currentPage = Number(params?.page) || 1
  const itemsPerPage = 10

  const totalExercises = await prisma.exercise.count()
  const totalPages = Math.ceil(totalExercises / itemsPerPage)

  const exercises = await prisma.exercise.findMany({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    ...(sortBy &&
      order && {
        orderBy: {
          [sortBy]: order
        }
      })
  })

  return (
    <ExerciseTable
      exercises={exercises}
      sortBy={sortBy}
      order={order}
      page={currentPage}
      totalPages={totalPages}
    />
  )
}
