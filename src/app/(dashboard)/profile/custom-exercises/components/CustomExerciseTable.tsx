'use client'

import TableNavigation from '@/app/components/TableNavigation'
import CreateCustomExerciseModal from '@/app/(dashboard)/exercises/components/CreateCustomExerciseModal'
import Link from 'next/link'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import { CustomExercise, User } from '@prisma/client'
import SortIcon from '@/app/components/SortIcon'
import { getSortLink, getPageLink } from '@/app/helpers/helpers'

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
import { useState } from 'react'

interface CustomExerciseTableProps {
  exercises: CustomExercise[]
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

export default function CustomExerciseTable({
  exercises,
  sortBy,
  order,
  page,
  totalPages,
  user,
  createExerciseAction
}: CustomExerciseTableProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const getLink = (field: string) => {
    return getSortLink(field, page, sortBy, order, '/profile/custom-exercises')
  }

  const getPage = (newPage: number) => {
    return getPageLink(newPage, sortBy, order)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <Heading>Custom Exercises</Heading>
        <Button color="indigo" onClick={() => setIsCreateModalOpen(true)}>
          Create Custom Exercise
        </Button>
      </div>
      <Divider className="my-10 mt-6" />

      <div className="w-full">
        <Table striped className="w-full table-fixed">
          <TableHead className="bg-white/75">
            <TableRow className="text-gray-900">
              <TableHeader className="w-[30%]">
                <Link
                  href={getLink('name')}
                  className="inline-flex items-center"
                >
                  Name
                  <SortIcon currentField="name" sortBy={sortBy} order={order} />
                </Link>
              </TableHeader>
              <TableHeader className="w-[17.5%]">
                <Link
                  href={getLink('type')}
                  className="inline-flex items-center"
                >
                  Type
                  <SortIcon currentField="type" sortBy={sortBy} order={order} />
                </Link>
              </TableHeader>
              <TableHeader className="w-[17.5%]">
                <Link
                  href={getLink('equipment')}
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
              <TableHeader className="min-w-[17.5%]">
                <Link
                  href={getLink('difficulty')}
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
              <TableHeader className="min-w-[12.5%]">
                <Link
                  href={getLink('createdAt')}
                  className="inline-flex items-center"
                >
                  Created
                  <SortIcon
                    currentField="createdAt"
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
                <TableCell className="w-[30%] relative">
                  <div className="absolute inset-0 flex items-center pr-8">
                    <div className="truncate">{exercise.name}</div>
                  </div>
                </TableCell>
                <TableCell className="w-[17.5%]">
                  <div className="truncate pr-4">{exercise.type}</div>
                </TableCell>
                <TableCell className="w-[17.5%]">
                  <div className="truncate pr-4">{exercise.equipment}</div>
                </TableCell>
                <TableCell className="w-[17.5%]">
                  <div className="truncate pr-4">{exercise.difficulty}</div>
                </TableCell>
                <TableCell className="w-[12.5%]">
                  <div className="truncate pr-4">
                    {new Date(exercise.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="w-[5%]">
                  <div className="text-right">
                    <Button outline>Edit</Button>
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
        getPageLink={getPage}
      />

      {isCreateModalOpen && (
        <CreateCustomExerciseModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={async (exercise) => {
            await createExerciseAction(exercise as CustomExercise, user)
          }}
          user={user}
        />
      )}
    </div>
  )
}
