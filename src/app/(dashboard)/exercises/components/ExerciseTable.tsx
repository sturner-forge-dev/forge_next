'use client'

import { useState } from 'react'
import CreateCustomExerciseModal from './CreateCustomExerciseModal'
import TableNavigation from './TableNavigation'
import Link from 'next/link'
import {
  type Exercise,
  type ExerciseSortField,
  type SortDirection
} from '@/app/types'

interface ExerciseTableProps {
  exercises: Exercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  page: number
  totalPages: number
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ExerciseTable({
  exercises,
  sortBy,
  order,
  page,
  totalPages
}: ExerciseTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const SortIcon = ({ currentField }: { currentField: string }) => {
    return (
      <span className="inline-block w-4 ml-1">
        {currentField === sortBy ? (order === 'asc' ? '↑' : '↓') : ''}
      </span>
    )
  }

  const getSortLink = (field: string) => {
    if (field !== sortBy) {
      return `?sortBy=${field}&order=asc`
    }

    switch (order) {
      case 'asc':
        return `?sortBy=${field}&order=desc`
      case 'desc':
        return '/exercises'
      default:
        return `?sortBy=${field}&order=asc`
    }
  }

  const onCreateCustomExercise = (exercise: Exercise) => {
    console.log('exercise', exercise)
  }

  const getPageLink = (newPage: number) => {
    const baseUrl = `?page=${newPage}`
    return sortBy ? `${baseUrl}&sortBy=${sortBy}&order=${order}` : baseUrl
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-12">
      <div className="sm:flex sm:items-center w-[90%] mx-auto">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-200">Exercises</h1>
          <p className="mt-2 text-sm text-gray-300">
            A list of all the exercises in your account.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setIsModalOpen(true)}
          >
            Create Custom Exercise
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root w-[85%] items-center mx-auto">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    <Link
                      href={getSortLink('name')}
                      className="hover:text-gray-800/90 px-2 py-1 rounded"
                    >
                      Name <SortIcon currentField="name" />
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    <Link
                      href={getSortLink('type')}
                      className="hover:text-gray-800/90 px-2 py-1 rounded"
                    >
                      Type <SortIcon currentField="type" />
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    <Link
                      href={getSortLink('equipment')}
                      className="hover:text-gray-800/90 px-2 py-1 rounded"
                    >
                      Equipment <SortIcon currentField="equipment" />
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    <Link
                      href={getSortLink('difficulty')}
                      className="hover:text-gray-800/90 px-2 py-1 rounded"
                    >
                      Difficulty <SortIcon currentField="difficulty" />
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, exerciseIdx) => (
                  <tr key={exercise.id} className="hover:bg-gray-800/90">
                    <td
                      className={classNames(
                        exerciseIdx !== exercises.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-200 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {exercise.name}
                    </td>
                    <td
                      className={classNames(
                        exerciseIdx !== exercises.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-300 sm:table-cell'
                      )}
                    >
                      {exercise.type}
                    </td>
                    <td
                      className={classNames(
                        exerciseIdx !== exercises.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-300 lg:table-cell'
                      )}
                    >
                      {exercise.equipment}
                    </td>
                    <td
                      className={classNames(
                        exerciseIdx !== exercises.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-300'
                      )}
                    >
                      {exercise.difficulty?.toUpperCase()}
                    </td>
                    <td
                      className={classNames(
                        exerciseIdx !== exercises.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}
                    >
                      <a
                        href="#"
                        className="text-indigo-300 hover:text-indigo-500"
                      >
                        View<span className="sr-only">, {exercise.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableNavigation
              page={page}
              totalPages={totalPages}
              getPageLink={getPageLink}
              classNames={classNames}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CreateCustomExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={onCreateCustomExercise}
        />
      )}
    </div>
  )
}
