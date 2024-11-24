'use server'

import { CustomExercise, User, Prisma } from '@prisma/client'
import { prisma } from '@/app/utils/db'
import { ExerciseSortField, SortDirection } from '@/app/types'

export const createCustomExerciseAction = async (
  exercise: Omit<CustomExercise, 'id' | 'createdAt'>,
  user: User
) => {
  const createData: Prisma.CustomExerciseCreateInput = {
    name: exercise.name,
    type: exercise.type || null,
    equipment: exercise.equipment || null,
    difficulty: exercise.difficulty || null,
    description: exercise.description || null,
    primaryMuscles: {
      set: exercise.primaryMuscles || []
    },
    secondaryMuscles: {
      set: exercise.secondaryMuscles || []
    },
    user: {
      connect: { id: user.id }
    }
  }

  const createdExercise = await prisma.customExercise.create({
    data: createData
  })

  return createdExercise
}

export const getCustomExercises = async (userId: string) => {
  const customExercises = await prisma.customExercise.findMany({
    where: { userId: userId }
  })

  return {
    exercises: customExercises
  }
}

export const editCustomExerciseAction = async (exercise: CustomExercise) => {
  const editedExercise = await prisma.customExercise.update({
    where: { id: exercise.id },
    data: exercise
  })

  return editedExercise
}
