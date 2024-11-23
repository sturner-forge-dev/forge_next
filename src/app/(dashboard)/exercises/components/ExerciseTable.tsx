'use client'

import TableNavigation from '@/app/components/TableNavigation'
import Link from 'next/link'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import { Exercise, CustomExercise, User } from '@prisma/client'
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
import DifficultyBadge from '@/app/components/DifficultyBadge'

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
  totalPages
}: ExerciseTableProps) {
  const getLink = (field: string) => {
    return getSortLink(field, page, sortBy, order, '/exercises')
  }

  const getPage = (newPage: number) => {
    return getPageLink(newPage, sortBy, order)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <Heading>Exercises</Heading>
      </div>
      <Divider className="my-10 mt-6" />

      <div className="overflow-x-auto w-full">
        <Table striped className="w-full">
          <TableHead className="bg-white/75">
            <TableRow className="text-gray-900">
              <TableHeader className="w-[25%]">
                <Link
                  href={getLink('name')}
                  className="inline-flex items-center"
                >
                  Name
                  <SortIcon currentField="name" sortBy={sortBy} order={order} />
                </Link>
              </TableHeader>
              <TableHeader className="w-[20%]">
                <Link
                  href={getLink('type')}
                  className="inline-flex items-center"
                >
                  Type
                  <SortIcon currentField="type" sortBy={sortBy} order={order} />
                </Link>
              </TableHeader>
              <TableHeader className="w-[20%]">
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
              <TableHeader className="min-w-[20%]">
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
                  <div className="truncate">
                    <DifficultyBadge difficulty={exercise.difficulty} />
                  </div>
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
        getPageLink={getPage}
      />
    </div>
  )
}
