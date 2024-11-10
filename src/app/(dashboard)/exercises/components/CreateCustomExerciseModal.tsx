'use client'

import { User, type CustomExercise } from '@/app/types'
import { useState } from 'react'

interface CreateCustomExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (exercise: CustomExercise) => void
  user: User
}

export default function CreateCustomExerciseModal({
  isOpen,
  onClose,
  onCreate,
  user
}: CreateCustomExerciseModalProps) {
  const [exercise, setExercise] = useState<CustomExercise>({
    user: user,
    name: '',
    type: '',
    equipment: '',
    difficulty: '',
    description: ''
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <dialog
        open={isOpen}
        className="bg-gray-400 p-6 rounded-lg w-full max-w-[50rem] h-[32.5rem] relative mt-[14rem]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-4">Create Custom Exercise</h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onCreate(exercise)
          }}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 rounded bg-white/20 border border-gray-600"
              value={exercise.name}
              onChange={(e) =>
                setExercise({ ...exercise, name: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="type" className="block mb-1">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="w-full p-2 rounded bg-white/20 border border-gray-600"
              value={exercise.type ?? ''}
              onChange={(e) =>
                setExercise({ ...exercise, type: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="equipment" className="block mb-1">
              Equipment
            </label>
            <input
              type="text"
              id="equipment"
              className="w-full p-2 rounded bg-white/20 border border-gray-600"
              value={exercise.equipment ?? ''}
              onChange={(e) =>
                setExercise({ ...exercise, equipment: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block mb-1">
              Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              className="w-full p-2 rounded bg-white/20 border border-gray-600"
              value={exercise.difficulty ?? ''}
              onChange={(e) =>
                setExercise({ ...exercise, difficulty: e.target.value })
              }
            >
              <option value="">Select Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex justify-end mt-12">
            <div className="mt-12 space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-700 text-black text-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-xl"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}
