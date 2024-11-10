import { Suspense } from 'react'
import ExerciseTable from './components/ExerciseTable'
import { prisma } from '@/app/utils/db'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import Loading from './loading'
import { getExercises } from '@/app/api/data-layer/exercise'
import { getUser } from '@/app/api/data-layer/user'

export default async function Exercises({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <Suspense fallback={<Loading />}>
      <ExercisesContent searchParams={searchParams} />
    </Suspense>
  )
}

async function ExercisesContent({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const user = await getUser()

  if (!user) return null

  const params = await searchParams
  const sortBy = params?.sortBy as ExerciseSortField
  const order = params?.order as SortDirection
  const currentPage = Number(params?.page) || 1
  const itemsPerPage = 10

  const totalExercises = await prisma.exercise.count()
  const totalPages = Math.ceil(totalExercises / itemsPerPage)

  const exercises = await getExercises(currentPage, itemsPerPage, sortBy, order)

  return (
    <ExerciseTable
      exercises={exercises}
      sortBy={sortBy}
      order={order}
      page={currentPage}
      totalPages={totalPages}
      user={user}
    />
  )
}
