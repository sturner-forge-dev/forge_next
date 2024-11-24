'use server'

import { getCustomExercises } from '@/app/api/data-layer/customExercise'
import { User } from '@/app/types'
export async function getCustomExercisesAction(
  user: User,
  page: number = 1,
  itemsPerPage: number = 10
) {
  const { exercises, totalCount } = await getCustomExercises(user.id)

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // Calculate pagination slice
  const start = (page - 1) * itemsPerPage
  const paginatedExercises = exercises.slice(start, start + itemsPerPage)

  return {
    exercises: paginatedExercises,
    totalPages,
    totalCount
  }
}
