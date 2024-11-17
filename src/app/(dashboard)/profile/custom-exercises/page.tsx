import { Suspense } from 'react'
import CustomExerciseTable from './components/CustomExerciseTable'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import Loading from './loading'
import { getCustomExercises } from '@/app/api/data-layer/customExercise'
import { getUser } from '@/app/api/data-layer/user'
import PageLayout from '@/app/components/PageLayout'
import { createCustomExerciseAction } from '@/app/api/data-layer/customExercise'

export default async function CustomExercises({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <Suspense fallback={<Loading />}>
      <CustomExercisesContent searchParams={searchParams} />
    </Suspense>
  )
}

async function CustomExercisesContent({
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

  const { exercises, totalCount } = await getCustomExercises(
    currentPage,
    itemsPerPage,
    sortBy,
    order,
    user.id
  )

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <PageLayout>
      <CustomExerciseTable
        exercises={exercises}
        sortBy={sortBy}
        order={order}
        page={currentPage}
        totalPages={totalPages}
        user={user}
        createExerciseAction={createCustomExerciseAction}
      />
    </PageLayout>
  )
}
