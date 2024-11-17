'use server'

import { createCustomExerciseAction } from '@/app/api/data-layer/customExercise'
import { CustomExercise, User } from '@prisma/client'

export async function createExerciseAction(
  exercise: CustomExercise,
  user: User
) {
  return createCustomExerciseAction(exercise, user)
}
