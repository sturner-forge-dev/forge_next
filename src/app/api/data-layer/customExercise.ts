import { CustomExercise, User } from '@/app/types'
import { prisma } from '@/app/utils/db'

export const createCustomExercise = async (
  exercise: CustomExercise,
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

export const getCustomExercises = async (userId: string) => {
  const customExercises = await prisma.customExercise.findMany({
    where: { userId: userId }
  })
  return customExercises
}
