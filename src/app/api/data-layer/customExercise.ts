'use server'

import { CustomExercise, User } from '@prisma/client'
import { prisma } from '@/app/utils/db'
import { ExerciseSortField, SortDirection } from '@/app/types'

export const createCustomExerciseAction = async (
  exercise: Omit<CustomExercise, 'id' | 'createdAt'>,
  user: User
) => {
  const createdExercise = await prisma.customExercise.create({
    data: {
      name: exercise.name,
      type: exercise.type,
      equipment: exercise.equipment,
      difficulty: exercise.difficulty,
      description: exercise.description,
      user: {
        connect: { id: user.id }
      }
    }
  })

  return createdExercise
}

export const getCustomExercises = async (
  currentPage: number,
  itemsPerPage: number,
  sortBy: ExerciseSortField,
  order: SortDirection,
  userId: string
) => {
  const customExercises = await prisma.customExercise.findMany({
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    where: { userId: userId },
    ...(sortBy &&
      order && {
        orderBy: {
          [sortBy]: order
        }
      })
  })

  const totalCount = await prisma.customExercise.count({
    where: { userId: userId }
  })

  return {
    exercises: customExercises,
    totalCount
  }
}
