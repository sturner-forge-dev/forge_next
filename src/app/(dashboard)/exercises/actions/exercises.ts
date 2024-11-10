'use server'

import { createCustomExercise } from '@/app/api/data-layer/customExercise'
import { type CustomExercise, type User } from '@/app/types'

export async function createExerciseAction(
  exercise: CustomExercise,
  user: User
) {
  return createCustomExercise(exercise, user)
}
