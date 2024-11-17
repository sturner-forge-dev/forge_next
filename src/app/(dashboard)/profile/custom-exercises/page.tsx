'use client'

import { useUser } from '../user/UserContext'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TableNavigation from '@/app/components/TableNavigation'
import { ExerciseSortField, SortDirection } from '@/app/types'
import PageLayout from '@/app/components/PageLayout'
import Link from 'next/link'
import SortIcon from '@/app/components/SortIcon'
import CreateCustomExerciseModal from '../../exercises/components/CreateCustomExerciseModal'
import { CustomExercise, User } from '@prisma/client'
import CustomExerciseTableBody from './components/CustomExerciseTableBody'
import { getSortLink, getPageLink } from '@/app/helpers/helpers'
// Catalyst
import { Heading } from '@/app/components/catalyst/heading'
import { Divider } from '@/app/components/catalyst/divider'
import { Button } from '@/app/components/catalyst/button'
import {
  Table,
  TableHead,
  TableRow,
  TableHeader
} from '@/app/components/catalyst/table'

export default function ExercisesPage() {
  const {
    paginatedExercises,
    currentPage,
    totalPages,
    sortBy,
    order,
    updatePagination,
    createCustomExerciseAction,
    user,
    addCustomExercise,
    customExercises
  } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    if (customExercises.length === 0) {
      return
    }

    const fetchData = async () => {
      setIsLoading(true)
      const newSortBy = (searchParams.get('sortBy') as ExerciseSortField) || ''
      const newOrder = (searchParams.get('order') as SortDirection) || ''

      try {
        await updatePagination(page, newSortBy, newOrder)
      } catch (error) {
        console.error('Error updating pagination:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page, searchParams, updatePagination, customExercises.length])

  const getPage = (newPage: number) => {
    return getPageLink(newPage, sortBy, order)
  }

  const getLink = (field: string) => {
    return getSortLink(field, page, sortBy, order, '/profile/custom-exercises')
  }

  const handleCreateExercise = async (
    exercise: Omit<CustomExercise, 'id' | 'createdAt'>
  ) => {
    try {
      const createdExercise = await createCustomExerciseAction(
        exercise,
        user as User
      )
      addCustomExercise(createdExercise)
    } catch (error) {
      console.error('Error creating exercise:', error)
    }
  }

  return (
    <PageLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Heading>Custom Exercises</Heading>
          <Button color="indigo" onClick={() => setIsModalOpen(true)}>
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
                    <SortIcon
                      currentField="name"
                      sortBy={sortBy}
                      order={order}
                    />
                  </Link>
                </TableHeader>
                <TableHeader className="w-[17.5%]">
                  <Link
                    href={getLink('type')}
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
                <TableHeader className="w-[17.5%]">
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
                <TableHeader className="w-[12.5%]">
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
                <TableHeader className="w-[5%]" />
              </TableRow>
            </TableHead>
            <CustomExerciseTableBody
              paginatedExercises={paginatedExercises}
              isLoading={isLoading}
            />
          </Table>
        </div>

        <TableNavigation
          page={currentPage}
          totalPages={totalPages}
          getPageLink={getPage}
        />
      </div>

      {isModalOpen && (
        <CreateCustomExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateExercise}
          user={user}
        />
      )}
    </PageLayout>
  )
}
