import { prisma } from '@/app/utils/db'

export const getExercises = async () => {
  const exercises = await prisma.exercise.findMany()

  return exercises
}
