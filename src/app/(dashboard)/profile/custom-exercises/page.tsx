'use client'

import { useUser } from '../user/UserContext'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from '@/app/components/catalyst/table'
import { Button } from '@/app/components/catalyst/button'
import TableNavigation from '@/app/components/TableNavigation'
import { ExerciseSortField, SortDirection } from '@/app/types'
import PageLayout from '@/app/components/PageLayout'
import { Heading } from '@/app/components/catalyst/heading'
import { Divider } from '@/app/components/catalyst/divider'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ExercisesPage() {
  const {
    paginatedExercises,
    currentPage,
    totalPages,
    sortBy,
    order,
    updatePagination
  } = useUser()

  const searchParams = useSearchParams()

  const SortIcon = ({ currentField }: { currentField: string }) => {
    return (
      <span className="inline-flex w-4 ml-1 justify-center">
        {currentField === sortBy ? (
          order === 'asc' ? (
            <ArrowUpIcon className="text-black size-3.5 font-bold" />
          ) : (
            <ArrowDownIcon className="text-black size-3.5 font-bold" />
          )
        ) : (
          <ArrowUpIcon className="text-transparent size-3.5 font-bold" />
        )}
      </span>
    )
  }
  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const newSortBy = (searchParams.get('sortBy') as ExerciseSortField) || ''
    const newOrder = (searchParams.get('order') as SortDirection) || ''

    updatePagination(page, newSortBy, newOrder)
  }, [page, searchParams, updatePagination])

  const showExerciseTable = paginatedExercises.length > 0

  const getPageLink = (newPage: number) => {
    const baseUrl = `?page=${newPage}`
    return sortBy ? `${baseUrl}&sortBy=${sortBy}&order=${order}` : baseUrl
  }

  const getSortLink = (field: string) => {
    if (field !== sortBy) {
      return `?sortBy=${field}&order=asc&page=${page}`
    }

    switch (order) {
      case 'asc':
        return `?sortBy=${field}&order=desc&page=${page}`
      case 'desc':
        return `/profile/custom-exercises?page=${page}`
      default:
        return `?sortBy=${field}&order=asc&page=${page}`
    }
  }

  return (
    <PageLayout>
      {showExerciseTable ? (
        <div className="space-y-6 max-w-6xl mx-auto">
          <Heading>Custom Exercises</Heading>
          <Divider className="my-10 mt-6" />

          <div className="overflow-x-auto">
            <Table striped className="min-w-full min-h-auto table-fixed">
              <TableHead className="bg-white/75">
                <TableRow className="text-gray-900">
                  <TableHeader className="w-[35%]">
                    <Link
                      href={getSortLink('name')}
                      className="inline-flex items-center"
                    >
                      Name
                      <SortIcon currentField="name" />
                    </Link>
                  </TableHeader>
                  <TableHeader className="w-[20%]">
                    <Link
                      href={getSortLink('type')}
                      className="inline-flex items-center"
                    >
                      Type
                      <SortIcon currentField="type" />
                    </Link>
                  </TableHeader>
                  <TableHeader className="w-[20%]">
                    <Link
                      href={getSortLink('equipment')}
                      className="inline-flex items-center"
                    >
                      Equipment
                      <SortIcon currentField="equipment" />
                    </Link>
                  </TableHeader>
                  <TableHeader className="w-[15%]">
                    <Link
                      href={getSortLink('difficulty')}
                      className="inline-flex items-center"
                    >
                      Difficulty
                      <SortIcon currentField="difficulty" />
                    </Link>
                  </TableHeader>
                  <TableHeader className="w-[10%]">
                    <Link
                      href={getSortLink('createdAt')}
                      className="inline-flex items-center"
                    >
                      Created
                      <SortIcon currentField="createdAt" />
                    </Link>
                  </TableHeader>
                  <TableHeader className="w-[10%]" />
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedExercises.map((exercise) => (
                  <TableRow key={exercise.id} href={'#'}>
                    <TableCell className="truncate">{exercise.name}</TableCell>
                    <TableCell className="truncate">
                      {exercise.type || '-'}
                    </TableCell>
                    <TableCell className="truncate">
                      {exercise.equipment || '-'}
                    </TableCell>
                    <TableCell className="truncate">
                      {exercise.difficulty || '-'}
                    </TableCell>
                    <TableCell className="truncate">
                      {new Date(exercise.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button outline>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <TableNavigation
            page={currentPage}
            totalPages={totalPages}
            getPageLink={getPageLink}
          />
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-500">
          No custom exercises found. Create your first exercise to get started.
        </div>
      )}
    </PageLayout>
  )
}
