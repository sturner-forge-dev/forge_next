import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.exercise.deleteMany({})

  const exercises = [
    {
      name: 'Squat',
      type: 'Lower Body',
      equipment: 'Barbell, Squat Rack',
      difficulty: 'Hard',
      description:
        'A compound exercise where you bend your knees and hips to lower your body down, then stand back up. Primarily targets legs and core.'
    },
    {
      name: 'Deadlift',
      type: 'Full Body',
      equipment: 'Barbell',
      difficulty: 'Hard',
      description:
        'Lift a barbell from the ground to hip level while maintaining a straight back. Works almost every major muscle group.'
    },
    {
      name: 'Push-ups',
      type: 'Upper Body',
      equipment: 'None',
      difficulty: 'Easy',
      description:
        'A bodyweight exercise where you lower and raise your body using your arms. Targets chest, shoulders, and triceps.'
    },
    {
      name: 'Dumbbell Rows',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Bend over and pull a dumbbell towards your hip. Great for back and bicep development.'
    },
    {
      name: 'Leg Press',
      type: 'Lower Body',
      equipment: 'Leg Press Machine',
      difficulty: 'Medium',
      description:
        'Push weight away from your body using your legs while seated. Targets quadriceps, hamstrings, and glutes.'
    },
    {
      name: 'Shoulder Press',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Medium',
      description:
        'Press dumbbells overhead from shoulder level. Builds shoulder strength and stability.'
    },
    {
      name: 'Lat Pulldown',
      type: 'Upper Body',
      equipment: 'Cable Machine',
      difficulty: 'Easy',
      description:
        'Pull a bar down to your chest while seated. Targets back muscles, particularly the latissimus dorsi.'
    },
    {
      name: 'Romanian Deadlift',
      type: 'Lower Body',
      equipment: 'Barbell',
      difficulty: 'Medium',
      description:
        'A hip-hinge movement where you lower the weight while keeping legs mostly straight. Targets hamstrings and lower back.'
    },
    {
      name: 'Bench Press',
      type: 'Upper Body',
      equipment: 'Barbell, Bench',
      difficulty: 'Hard',
      description:
        'Lie on a bench and press a barbell up from chest level. Primary chest exercise that also works shoulders and triceps.'
    },
    {
      name: 'Pull-ups',
      type: 'Upper Body',
      equipment: 'Pull-up Bar',
      difficulty: 'Hard',
      description:
        'Hang from a bar and pull yourself up until your chin is over the bar. Excellent for back and bicep development.'
    },
    {
      name: 'Lunges',
      type: 'Lower Body',
      equipment: 'None',
      difficulty: 'Medium',
      description:
        'Step forward and lower your back knee toward the ground. Great for leg strength and balance.'
    },
    {
      name: 'Dips',
      type: 'Upper Body',
      equipment: 'Parallel Bars',
      difficulty: 'Medium',
      description:
        'Lower and raise your body between parallel bars. Works chest, shoulders, and triceps.'
    },
    {
      name: 'Calf Raises',
      type: 'Lower Body',
      equipment: 'None',
      difficulty: 'Easy',
      description:
        'Rise up onto your toes and lower back down. Targets calf muscles.'
    },
    {
      name: 'Face Pulls',
      type: 'Upper Body',
      equipment: 'Cable Machine',
      difficulty: 'Easy',
      description:
        'Pull a rope attachment towards your face. Great for rear deltoids and upper back.'
    },
    {
      name: 'Glute Bridge',
      type: 'Lower Body',
      equipment: 'None',
      difficulty: 'Easy',
      description:
        'Lie on your back and lift your hips toward the ceiling. Targets glutes and lower back.'
    },
    {
      name: 'Tricep Extensions',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Lower weight behind your head and extend arms. Isolates triceps muscles.'
    },
    {
      name: 'Leg Extensions',
      type: 'Lower Body',
      equipment: 'Machine',
      difficulty: 'Easy',
      description:
        'Extend your legs from a seated position. Isolates quadriceps muscles.'
    },
    {
      name: 'Bicep Curls',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Curl weights from hip level to shoulder level. Primary bicep exercise.'
    },
    {
      name: 'Hip Thrust',
      type: 'Lower Body',
      equipment: 'Bench, Barbell',
      difficulty: 'Medium',
      description:
        'Drive hips up while upper back rests on a bench. Excellent glute developer.'
    },
    {
      name: 'Incline Bench Press',
      type: 'Upper Body',
      equipment: 'Bench, Barbell',
      difficulty: 'Hard',
      description:
        'Bench press performed on an inclined bench. Emphasizes upper chest.'
    },
    {
      name: 'Bulgarian Split Squat',
      type: 'Lower Body',
      equipment: 'Bench',
      difficulty: 'Hard',
      description:
        'Single-leg squat with rear foot elevated. Great for leg development and balance.'
    },
    {
      name: 'Cable Flyes',
      type: 'Upper Body',
      equipment: 'Cable Machine',
      difficulty: 'Medium',
      description:
        'Bring cable handles together in front of chest. Isolates chest muscles.'
    },
    {
      name: 'Leg Curls',
      type: 'Lower Body',
      equipment: 'Machine',
      difficulty: 'Easy',
      description:
        'Curl weight using legs from prone position. Targets hamstrings.'
    },
    {
      name: 'Lateral Raises',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Raise arms out to sides until parallel with ground. Works lateral deltoids.'
    },
    {
      name: 'Box Jumps',
      type: 'Lower Body',
      equipment: 'Plyo Box',
      difficulty: 'Medium',
      description:
        'Jump onto raised platform with both feet. Develops explosive power.'
    },
    {
      name: 'Hammer Curls',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Bicep curls with palms facing each other. Works biceps and forearms.'
    },
    {
      name: 'Good Mornings',
      type: 'Lower Body',
      equipment: 'Barbell',
      difficulty: 'Medium',
      description:
        'Bend forward at hips with barbell on shoulders. Targets lower back and hamstrings.'
    },
    {
      name: 'Reverse Flyes',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Bend forward and raise arms out to sides. Works rear deltoids.'
    },
    {
      name: 'Crunches',
      type: 'Core',
      equipment: 'None',
      difficulty: 'Easy',
      description:
        'Lie on back and curl upper body toward knees. Basic abdominal exercise.'
    },
    {
      name: 'Russian Twists',
      type: 'Core',
      equipment: 'Weight Plate',
      difficulty: 'Medium',
      description:
        'Seated twist holding weight, feet off ground. Works obliques and core.'
    },
    {
      name: 'Plank',
      type: 'Core',
      equipment: 'None',
      difficulty: 'Medium',
      description:
        'Hold push-up position on forearms. Builds core stability and endurance.'
    },
    {
      name: 'Cable Woodchops',
      type: 'Core',
      equipment: 'Cable Machine',
      difficulty: 'Medium',
      description:
        'Pull cable diagonally across body. Works core rotation and stability.'
    },
    {
      name: 'Back Extensions',
      type: 'Lower Body',
      equipment: 'Bench',
      difficulty: 'Easy',
      description: 'Extend torso up from bent position. Strengthens lower back.'
    },
    {
      name: 'Front Raises',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description:
        'Raise arms in front of body to shoulder height. Works front deltoids.'
    },
    {
      name: 'Seated Calf Raises',
      type: 'Lower Body',
      equipment: 'Machine',
      difficulty: 'Easy',
      description:
        'Raise heels while seated with weight on knees. Targets soleus muscle.'
    },
    {
      name: 'Decline Push-ups',
      type: 'Upper Body',
      equipment: 'Bench',
      difficulty: 'Medium',
      description:
        'Push-ups with feet elevated. Emphasizes upper chest and front deltoids.'
    },
    {
      name: 'Side Planks',
      type: 'Core',
      equipment: 'None',
      difficulty: 'Medium',
      description:
        'Hold body sideways supported on one forearm. Works obliques and core stability.'
    },
    {
      name: 'Wrist Curls',
      type: 'Upper Body',
      equipment: 'Dumbbells',
      difficulty: 'Easy',
      description: 'Curl weight using just wrists. Develops forearm strength.'
    }
  ]

  for (const exercise of exercises) {
    await prisma.exercise.create({
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
