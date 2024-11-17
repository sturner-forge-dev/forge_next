'use client'

import { useState } from 'react'
import CreateCustomExerciseModal from './CreateCustomExerciseModal'
import TableNavigation from '@/app/components/TableNavigation'
import Link from 'next/link'
import {
  type Exercise,
  type ExerciseSortField,
  type SortDirection
} from '@/app/types'
import { CustomExercise, User } from '@prisma/client'
import SortIcon from '@/app/components/SortIcon'

// Catalyst
import { Button } from '@/app/components/catalyst/button'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from '@/app/components/catalyst/table'
import { Heading } from '@/app/components/catalyst/heading'
import { Divider } from '@/app/components/catalyst/divider'

interface ExerciseTableProps {
  exercises: Exercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  page: number
  totalPages: number
  user: User
  createExerciseAction: (
    exercise: CustomExercise,
    user: User
  ) => Promise<CustomExercise>
}

export default function ExerciseTable({
  exercises,
  sortBy,
  order,
  page,
  totalPages,
  user,
  createExerciseAction
}: ExerciseTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getSortLink = (field: string) => {
    if (field !== sortBy) {
      return `?sortBy=${field}&order=asc&page=${page}`
    }

    switch (order) {
      case 'asc':
        return `?sortBy=${field}&order=desc&page=${page}`
      case 'desc':
        return `/exercises?page=${page}`
      default:
        return `?sortBy=${field}&order=asc&page=${page}`
    }
  }

  const getPageLink = (newPage: number) => {
    const baseUrl = `?page=${newPage}`
    return sortBy ? `${baseUrl}&sortBy=${sortBy}&order=${order}` : baseUrl
  }

  return (
    <>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Heading>Exercises</Heading>
          <Button color="indigo" onClick={() => setIsModalOpen(true)}>
            Create Custom Exercise
          </Button>
        </div>
        <Divider className="my-10 mt-6" />

        <div className="overflow-x-auto w-full">
          <Table striped className="w-full">
            <TableHead className="bg-white/75">
              <TableRow className="text-gray-900">
                <TableHeader className="w-[25%]">
                  <Link
                    href={getSortLink('name')}
                    className="inline-flex items-center"
                  >
                    Name
                    <SortIcon
                      currentField="name"
                      sortBy={sortBy}
                      order={order}
                    />
                  </Link>
                </TableHeader>
                <TableHeader className="w-[20%]">
                  <Link
                    href={getSortLink('type')}
                    className="inline-flex items-center"
                  >
                    Type
                    <SortIcon
                      currentField="type"
                      sortBy={sortBy}
                      order={order}
                    />
                  </Link>
                </TableHeader>
                <TableHeader className="w-[20%]">
                  <Link
                    href={getSortLink('equipment')}
                    className="inline-flex items-center"
                  >
                    Equipment
                    <SortIcon
                      currentField="equipment"
                      sortBy={sortBy}
                      order={order}
                    />
                  </Link>
                </TableHeader>
                <TableHeader className="min-w-[20%]">
                  <Link
                    href={getSortLink('difficulty')}
                    className="inline-flex items-center"
                  >
                    Difficulty
                    <SortIcon
                      currentField="difficulty"
                      sortBy={sortBy}
                      order={order}
                    />
                  </Link>
                </TableHeader>
                <TableHeader className="min-w-[5%]" />
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id} href="#">
                  <TableCell className="w-[25%] whitespace-nowrap truncate">
                    <div className="truncate">{exercise.name}</div>
                  </TableCell>
                  <TableCell className="w-[20%] whitespace-nowrap truncate">
                    <div className="truncate">{exercise.type}</div>
                  </TableCell>
                  <TableCell className="w-[20%] whitespace-nowrap truncate">
                    <div className="truncate">{exercise.equipment}</div>
                  </TableCell>
                  <TableCell className="min-w-[20%] whitespace-nowrap truncate">
                    <div className="truncate">{exercise.difficulty}</div>
                  </TableCell>
                  <TableCell className="min-w-[5%] whitespace-nowrap truncate">
                    <div className="text-right">
                      <Button outline>View</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <TableNavigation
          page={page}
          totalPages={totalPages}
          getPageLink={getPageLink}
        />
      </div>

      {isModalOpen && (
        <CreateCustomExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={async (exercise) => {
            await createExerciseAction(exercise, user)
          }}
          user={user}
        />
      )}
    </>
  )
}
