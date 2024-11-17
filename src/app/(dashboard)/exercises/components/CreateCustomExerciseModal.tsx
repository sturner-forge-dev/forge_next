'use client'

import { CustomExercise, User } from '@prisma/client'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import Dropdown from './Dropdown'
import { Button } from '@/app/components/catalyst/button'
import { Divider } from '@/app/components/catalyst/divider'
import { Heading, Subheading } from '@/app/components/catalyst/heading'
import { DarkInput } from '@/app/components/DarkInput'
import { Text } from '@/app/components/catalyst/text'
import { DarkTextarea } from '@/app/components/DarkTextArea'
import {
  exerciseTypes,
  equipmentTypes,
  difficultyLevels
} from '../constants/constants'
import Messaging from '@/app/components/Messaging'
interface CreateCustomExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (
    exercise: Omit<CustomExercise, 'id' | 'createdAt'>
  ) => Promise<void>
  user: User
}

export default function CreateCustomExerciseModal({
  isOpen,
  onClose,
  onCreate,
  user
}: CreateCustomExerciseModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [exercise, setExercise] = useState<
    Omit<CustomExercise, 'id' | 'createdAt'>
  >({
    userId: user.id,
    name: '',
    type: '',
    equipment: '',
    difficulty: '',
    description: ''
  })

  const handleCreateExercise = async () => {
    setIsLoading(true)
    try {
      await onCreate(exercise)
      setSuccessMessage('Exercise created successfully')
      setExercise({
        userId: user.id,
        name: '',
        type: '',
        equipment: '',
        difficulty: '',
        description: ''
      })
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setErrorMessage('Error creating exercise')
      setTimeout(() => setErrorMessage(null), 3000)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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
            <Heading className="text-white">Create Custom Exercise</Heading>
            <Text className="mt-2 text-gray-300">
              Create a custom exercise to add to your workout. Exercises you
              create are private to you and are viewable on your profile.
            </Text>

            <Divider className="my-6 border-gray-700" />

            <Messaging
              successMessage={successMessage}
              errorMessage={errorMessage}
            />

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateExercise()
              }}
            >
              <div className="space-y-8">
                <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Subheading className="text-white">
                      Exercise Details
                    </Subheading>
                    <Text className="text-gray-300">
                      Basic information about your exercise.
                    </Text>
                  </div>
                  <div className="space-y-4">
                    <DarkInput
                      required
                      aria-label="Exercise Name"
                      value={exercise.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExercise({ ...exercise, name: e.target.value })
                      }
                      placeholder="Exercise Name"
                    />
                  </div>
                </section>

                <Divider soft className="border-gray-700" />

                <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Subheading className="text-white">
                      Exercise Type
                    </Subheading>
                    <Text className="text-gray-300">
                      Select the category that best fits this exercise.
                    </Text>
                  </div>
                  <div className="space-y-4">
                    <Dropdown
                      options={exerciseTypes}
                      label="Exercise Type"
                      value={exercise.type}
                      onChange={(value) =>
                        setExercise({ ...exercise, type: value })
                      }
                    />
                  </div>
                </section>

                <Divider soft className="border-gray-700" />

                <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Subheading className="text-white">
                      Equipment & Difficulty
                    </Subheading>
                    <Text className="text-gray-300">
                      Specify the required equipment and skill level.
                    </Text>
                  </div>
                  <div className="space-y-4">
                    <Dropdown
                      options={equipmentTypes}
                      label="Equipment Type"
                      value={exercise.equipment}
                      onChange={(value) =>
                        setExercise({ ...exercise, equipment: value })
                      }
                    />
                    <Dropdown
                      options={difficultyLevels}
                      label="Difficulty Level"
                      value={exercise.difficulty}
                      onChange={(value) =>
                        setExercise({ ...exercise, difficulty: value })
                      }
                    />
                  </div>
                </section>

                <Divider soft className="border-gray-700" />

                <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Subheading className="text-white">Description</Subheading>
                    <Text className="text-gray-300">
                      Provide details about how to perform this exercise.
                    </Text>
                  </div>
                  <div>
                    <DarkTextarea
                      aria-label="Exercise Description"
                      value={exercise.description || ''}
                      onChange={(e) =>
                        setExercise({
                          ...exercise,
                          description: e.target.value
                        })
                      }
                      placeholder="Exercise Description"
                    />
                  </div>
                </section>

                <Divider soft className="border-gray-700" />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    color="dark/zinc"
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    color="indigo"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white"
                  >
                    {isLoading ? 'Creating...' : 'Create Exercise'}
                  </Button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
