import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}

function capitalizeWords(string) {
  return string
    .split('_')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ')
}

function mapDifficulty(level) {
  const difficultyMap = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    expert: 'Advanced',
    advanced: 'Advanced'
  }
  return difficultyMap[level.toLowerCase()] || 'Intermediate'
}

async function main() {
  // Clear existing exercises
  await prisma.exercise.deleteMany({})

  // Read and parse the JSON file
  const jsonPath = path.join(
    process.cwd(),
    'src',
    'app',
    'data',
    'exercise.json'
  )
  console.log('looking for file at', jsonPath)

  const exercisesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  // Transform and insert exercises
  for (const exercise of exercisesData) {
    const transformedExercise = {
      name: exercise.name,
      type: exercise.mechanic ? capitalizeWords(exercise.mechanic) : null,
      category: exercise.category ? capitalizeWords(exercise.category) : null,
      primaryMuscles: exercise.primaryMuscles.map((muscle) =>
        capitalizeWords(muscle)
      ),
      secondaryMuscles: exercise.secondaryMuscles.map((muscle) =>
        capitalizeWords(muscle)
      ),
      equipment: exercise.equipment
        ? capitalizeWords(exercise.equipment)
        : null,
      difficulty: mapDifficulty(exercise.level),
      description: exercise.instructions
        ? exercise.instructions.join(' ')
        : null
    }

    await prisma.exercise.create({
      data: transformedExercise
    })
  }

  console.log(`Database seeded with ${exercisesData.length} exercises`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
