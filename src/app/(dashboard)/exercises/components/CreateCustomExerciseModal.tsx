'use client'

import { CustomExercise, User } from '@prisma/client'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import Dropdown from './Dropdown'
import SubmitButton from '@/app/components/SubmitButton'
import CancelButton from '@/app/components/CancelButton'

interface CreateCustomExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (exercise: CustomExercise) => Promise<void>
  user: User
}

const exerciseTypes = [
  { label: 'Cardio', id: 1 },
  { label: 'Strength', id: 2 },
  { label: 'Flexibility', id: 3 },
  { label: 'Balance', id: 4 },
  { label: 'Endurance', id: 5 },
  { label: 'Full Body', id: 6 },
  { label: 'Upper Body', id: 7 },
  { label: 'Other', id: 8 }
]

const equipmentTypes = [
  { label: 'Bodyweight', id: 1 },
  { label: 'Machine', id: 2 },
  { label: 'Barbell', id: 3 },
  { label: 'Dumbbell', id: 4 },
  { label: 'Kettlebell', id: 5 },
  { label: 'Cable Machine', id: 6 },
  { label: 'None', id: 7 },
  { label: 'Other', id: 8 }
]

const difficultyLevels = [
  { label: 'Beginner', id: 1 },
  { label: 'Intermediate', id: 2 },
  { label: 'Advanced', id: 3 }
]

export default function CreateCustomExerciseModal({
  isOpen,
  onClose,
  onCreate,
  user
}: CreateCustomExerciseModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [exercise, setExercise] = useState<CustomExercise>({
    userId: user.id,
    name: '',
    type: '',
    equipment: '',
    difficulty: '',
    description: '',
    createdAt: new Date(),
    id: ''
  })

  const handleCreateExercise = async () => {
    setIsLoading(true)
    try {
      await onCreate(exercise)
      setSuccessMessage('Exercise created successfully')
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
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Create Custom Exercise
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a custom exercise to add to your workout.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Exercises you create are private to you and are viewable
                      on your profile.
                    </p>
                  </div>
                </div>
              </div>

              <form action="submit">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Exercise Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Exercise Name"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                          value={exercise.name}
                          onChange={(e) =>
                            setExercise({ ...exercise, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <Dropdown
                      options={exerciseTypes}
                      label="Exercise Type"
                      value={exercise.type}
                      onChange={(value) => {
                        setExercise({ ...exercise, type: value })
                      }}
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <Dropdown
                      options={equipmentTypes}
                      label="Equipment Type"
                      value={exercise.equipment}
                      onChange={(value) => {
                        setExercise({ ...exercise, equipment: value })
                      }}
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <Dropdown
                      options={difficultyLevels}
                      label="Difficulty Level"
                      value={exercise.difficulty}
                      onChange={(value) => {
                        setExercise({ ...exercise, difficulty: value })
                      }}
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Add your comment
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        placeholder="Exercise Description"
                        onChange={(e) =>
                          setExercise({
                            ...exercise,
                            description: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <div className="flex justify-end gap-2">
                <CancelButton label="Close" onClick={onClose} />
                <SubmitButton
                  label="Create"
                  onClick={handleCreateExercise}
                  isLoading={isLoading}
                />
              </div>
              {(errorMessage || successMessage) && (
                <div className="mt-2 flex justify-end px-8">
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
