'use client'

import { Heading, Subheading } from '@/app/components/catalyst/heading'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Exercise } from '@prisma/client'

// Catalyst
import { Text } from '@/app/components/catalyst/text'
import { Divider } from '@/app/components/catalyst/divider'
import DifficultyBadge from '@/app/components/info/DifficultyBadge'
import { Button } from '@/app/components/catalyst/button'

interface ViewExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  exercise: Exercise
}

export default function ViewExerciseModal({
  isOpen,
  onClose,
  exercise
}: ViewExerciseModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/70 bg-opacity-75 transition-opacity backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full max-w-2xl transform rounded-lg bg-gray-900 p-6 text-left shadow-xl transition-all"
          >
            <Heading className="text-white">{exercise.name}</Heading>
            <Text className="mt-2 text-gray-300">
              They say the devil is in the details.
            </Text>

            <Divider className="my-6 border-gray-700" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <Subheading className="text-white">Exercise Type</Subheading>
              </div>
              <div className="space-y-4">
                <Text className="text-white">{exercise.type}</Text>
              </div>
            </section>

            <Divider className="my-6 border-gray-700" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <Subheading className="text-white">
                  Exercise Equipment
                </Subheading>
                <Text className="text-gray-300">
                  You might need some things to perform this exercise.
                </Text>
              </div>
              <div className="space-y-4">
                <Text className="text-white">{exercise.equipment}</Text>
              </div>
            </section>
            <Divider className="my-6 border-gray-700" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <Subheading className="text-white">
                  Exercise Difficulty
                </Subheading>
                <Text className="text-gray-300">
                  How hard is it? It's up to you... but here's what we think.
                </Text>
              </div>
              <div className="space-y-4">
                <Text>
                  <DifficultyBadge difficulty={exercise.difficulty} />
                </Text>
              </div>
            </section>

            <Divider className="my-6 border-gray-700" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <Subheading className="text-white">
                  Primary Muscle Groups
                </Subheading>
                <Text className="text-gray-300">
                  You're definitely going to feel it here...
                </Text>
              </div>
              <div className="space-y-4">
                <Text className="text-white">
                  {exercise.primaryMuscles.join(', ')}
                </Text>
              </div>
            </section>

            <Divider className="my-6 border-gray-700" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <Subheading className="text-white">
                  Secondary Muscle Groups
                </Subheading>
                <Text className="text-gray-300">
                  And you might feel it here too.
                </Text>
              </div>
              <div className="space-y-4">
                <Text className="text-white">
                  {exercise.secondaryMuscles.join(', ')}
                </Text>
              </div>
            </section>

            <Divider className="my-6 border-gray-700" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <Subheading className="text-white">
                  Exercise Description
                </Subheading>
                <Text className="text-gray-300">
                  Go slow. And don't forget to breathe.
                </Text>
              </div>
              <div className="space-y-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
                <Text className="text-white">{exercise.description}</Text>
              </div>
            </section>

            <div className="mt-6 flex justify-end">
              <Button outline onClick={onClose}>
                Close
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
