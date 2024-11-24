'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { CustomExercise } from '@prisma/client'
import { useState } from 'react'
import Messaging from '@/app/components/info/Messaging'
import { DarkInput } from '@/app/components/ui/DarkInput'
import Dropdown from '@/app/components/ui/Dropdown'
import {
  difficultyLevels,
  equipmentTypes,
  exerciseTypes,
  muscleGroups
} from '@/app/(dashboard)/exercises/constants/constants'
import { DarkTextarea } from '@/app/components/ui/DarkTextArea'

// Catalyst
import { Heading, Subheading } from '@/app/components/catalyst/heading'
import { Text } from '@/app/components/catalyst/text'
import { Divider } from '@/app/components/catalyst/divider'
import { Button } from '@/app/components/catalyst/button'

interface EditCustomExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (
    exercise: Omit<CustomExercise, 'id' | 'createdAt'>
  ) => Promise<CustomExercise>
  customExercise: CustomExercise
  onSuccess?: () => void
}

export default function EditCustomExerciseModal({
  isOpen,
  onClose,
  onEdit,
  customExercise,
  onSuccess
}: EditCustomExerciseModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>(
    customExercise.primaryMuscles || []
  )
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>(
    customExercise.secondaryMuscles || []
  )
  const [exercise, setExercise] =
    useState<Omit<CustomExercise, 'id' | 'createdAt'>>(customExercise)

  const handleEditExercise = async () => {
    setIsLoading(true)
    try {
      const updatedExercise = {
        ...exercise,
        primaryMuscles,
        secondaryMuscles
      }

      await onEdit(updatedExercise)
      setSuccessMessage('Exercise edited successfully')
      onSuccess?.()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      onClose()
    } catch (error) {
      setErrorMessage('Failed to edit exercise')
      setTimeout(() => setErrorMessage(null), 3000)
      setIsLoading(false)
    }
  }

  const handlePrimaryMuscleChange = (selected: string[]) => {
    setPrimaryMuscles(selected)
  }

  const handleSecondaryMuscleChange = (selected: string[]) => {
    setSecondaryMuscles(selected)
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
            <Heading className="text-white">Edit {customExercise.name}</Heading>
            <Text className="mt-2 text-gray-300">
              Edit the details of your exercise.
            </Text>

            <Divider className="my-6 border-gray-700" />

            <Messaging
              successMessage={successMessage}
              errorMessage={errorMessage}
            />

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleEditExercise()
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
                      name="Exercise Type"
                      value={exercise.type || ''}
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
                      name="Equipment Type"
                      value={exercise.equipment || ''}
                      onChange={(value) =>
                        setExercise({ ...exercise, equipment: value })
                      }
                    />
                    <Dropdown
                      options={difficultyLevels}
                      name="Difficulty Level"
                      value={exercise.difficulty || ''}
                      onChange={(value) =>
                        setExercise({ ...exercise, difficulty: value })
                      }
                    />
                  </div>
                </section>

                <Divider soft className="border-gray-700" />

                <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Subheading className="text-white">
                      Target Muscle Groups
                    </Subheading>
                    <Text className="text-gray-300">
                      What muscle groups are targeted by this exercise?
                    </Text>
                  </div>
                  <div className="space-y-4">
                    <Dropdown
                      options={muscleGroups}
                      name="Primary Muscle Groups"
                      value={primaryMuscles || []}
                      onChange={handlePrimaryMuscleChange}
                      multiple={true as const}
                    />
                    <Dropdown
                      options={muscleGroups}
                      name="Secondary Muscle Groups"
                      value={secondaryMuscles || []}
                      onChange={handleSecondaryMuscleChange}
                      multiple={true as const}
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
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
                    {isLoading ? 'Saving...' : 'Save Changes'}
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
