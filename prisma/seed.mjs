import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.exercises.deleteMany({})

  const exercises = [
    {
      name: 'Squat',
      type: 'Lower Body',
      equipment: 'Barbell, Squat Rack',
      difficulty: 'hard',
      description:
        'A compound exercise where you bend your knees and hips to lower your body down, then stand back up. Primarily targets legs and core.'
    },
    {
      name: 'Deadlift',
      type: 'Full Body',
      equipment: 'Barbell',
      difficulty: 'hard',
      description:
        'Lift a barbell from the ground to hip level while maintaining a straight back. Works almost every major muscle group.'
    },
    {
      name: 'Push-ups',
      type: 'Upper Body',
      equipment: 'None',
      difficulty: 'easy',
      description:
        'A bodyweight exercise where you lower and raise your body using your arms. Targets chest, shoulders, and triceps.'
    },
    {
      name: 'Dumbbell Rows',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'easy',
      description:
        'Bend over and pull a dumbbell towards your hip. Great for back and bicep development.'
    },
    {
      name: 'Leg Press',
      type: 'Lower Body',
      equipment: 'Leg Press Machine',
      difficulty: 'medium',
      description:
        'Push weight away from your body using your legs while seated. Targets quadriceps, hamstrings, and glutes.'
    },
    {
      name: 'Shoulder Press',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'medium',
      description:
        'Press dumbbells overhead from shoulder level. Builds shoulder strength and stability.'
    },
    {
      name: 'Lat Pulldown',
      type: 'Upper Body',
      equipment: 'Cable Machine',
      difficulty: 'easy',
      description:
        'Pull a bar down to your chest while seated. Targets back muscles, particularly the latissimus dorsi.'
    },
    {
      name: 'Romanian Deadlift',
      type: 'Lower Body',
      equipment: 'Barbell',
      difficulty: 'medium',
      description:
        'A hip-hinge movement where you lower the weight while keeping legs mostly straight. Targets hamstrings and lower back.'
    }
  ]

  for (const exercise of exercises) {
    await prisma.exercises.create({
      data: exercise
    })
  }

  console.log(`Database seeded with ${exercises.length} exercises`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
