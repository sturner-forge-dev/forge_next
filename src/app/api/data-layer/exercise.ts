import { ExerciseSortField, SortDirection } from '@/app/types'
import { prisma } from '@/app/utils/db'

export const getExercises = async (
  currentPage: number,
  itemsPerPage: number,
  sortBy: ExerciseSortField,
  order: SortDirection
) => {
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

  return exercises
}
