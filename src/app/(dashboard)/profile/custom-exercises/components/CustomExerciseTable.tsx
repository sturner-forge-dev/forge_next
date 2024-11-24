'use client'

import { CustomExercise, User } from '@prisma/client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { type ExerciseSortField, type SortDirection } from '@/app/types'
import { getSortLink, getPageLink } from '@/app/helpers/helpers'

import SortIcon from '@/app/components/info/SortIcon'
import TableNavigation from '@/app/components/table/TableNavigation'
import ExerciseTableBody from '@/app/components/table/ExerciseTableBody'
import EditCustomExerciseModal from './EditCustomExerciseModal'
import CreateCustomExerciseModal from './CreateCustomExerciseModal'

// Catalyst
import { Button } from '@/app/components/catalyst/button'
import {
  Table,
  TableHead,
  TableRow,
  TableHeader
} from '@/app/components/catalyst/table'
import { Heading } from '@/app/components/catalyst/heading'
import { Divider } from '@/app/components/catalyst/divider'

interface CustomExerciseTableProps {
  exercises: CustomExercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  page: number
  itemsPerPage: number
  user: User
  createExerciseAction: (
    exercise: Omit<CustomExercise, 'id' | 'createdAt'>,
    user: User
  ) => Promise<void>
  editExerciseAction: (exercise: CustomExercise) => Promise<CustomExercise>
}

export default function CustomExerciseTable({
  exercises,
  sortBy,
  order,
  page,
  itemsPerPage,
  user,
  createExerciseAction,
  editExerciseAction
}: CustomExerciseTableProps) {
  const router = useRouter()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] =
    useState<CustomExercise | null>(null)

  const getLink = (field: string) => {
    return getSortLink(field, page, sortBy, order, '/profile/custom-exercises')
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

  const handleEditSuccess = () => {
    // Small delay before refresh to ensure modal closes smoothly
    setTimeout(() => {
      router.refresh()
    }, 100)
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

          <ExerciseTableBody
            paginatedExercises={paginatedExercises}
            isLoading={false}
            onClick={(exercise) => {
              setSelectedExercise(exercise as CustomExercise)
              setIsEditModalOpen(true)
            }}
          />
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
      {isEditModalOpen && selectedExercise && (
        <EditCustomExerciseModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedExercise(null)
          }}
          onEdit={async (exercise) => {
            const updatedExercise = await editExerciseAction(
              exercise as CustomExercise
            )
            router.refresh()
            return updatedExercise as CustomExercise
          }}
          customExercise={selectedExercise}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  )
}
