'use client'

import { useState } from 'react'
import TableNavigation from '@/app/components/table/TableNavigation'
import Link from 'next/link'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import { Exercise } from '@prisma/client'
import SortIcon from '@/app/components/info/SortIcon'
import { getSortLink, getPageLink } from '@/app/helpers/helpers'
import ExerciseTableBody from '@/app/components/table/ExerciseTableBody'
import { useMemo } from 'react'
import ViewExerciseModal from './ViewExerciseModal'

// Catalyst
import {
  Table,
  TableHead,
  TableRow,
  TableHeader
} from '@/app/components/catalyst/table'
import { Heading } from '@/app/components/catalyst/heading'
import { Divider } from '@/app/components/catalyst/divider'

interface ExerciseTableProps {
  exercises: Exercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  page: number
  itemsPerPage: number
}

export default function ExerciseTable({
  exercises,
  sortBy,
  order,
  page,
  itemsPerPage
}: ExerciseTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  )

  const getLink = (field: string) => {
    return getSortLink(field, page, sortBy, order, '/exercises')
  }

  const getPage = (newPage: number) => {
    return getPageLink(newPage, sortBy, order)
  }

  // Sort exercises
  const sortedExercises = useMemo(() => {
    if (!sortBy) return exercises

    return [...exercises].sort((a, b) => {
      const compareValue = order === 'asc' ? 1 : -1
      const aVal = a[sortBy] ?? ''
      const bVal = b[sortBy] ?? ''
      return aVal > bVal ? compareValue : -compareValue
    })
  }, [exercises, sortBy, order])

  // Paginate exercises
  const paginatedExercises = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    return sortedExercises.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedExercises, page, itemsPerPage])

  const totalPages = Math.ceil(exercises.length / itemsPerPage)

  const handleOnClick = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setIsModalOpen(true)
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

          <ExerciseTableBody
            paginatedExercises={paginatedExercises}
            isLoading={false}
            onClick={handleOnClick}
          />
        </Table>
      </div>

      <TableNavigation
        page={page}
        totalPages={totalPages}
        getPageLink={getPage}
      />

      {isModalOpen && selectedExercise && (
        <ViewExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          exercise={selectedExercise}
        />
      )}
    </div>
  )
}
