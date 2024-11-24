import { Suspense } from 'react'
import ExerciseTable from './components/ExerciseTable'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import Loading from './loading'
import { getExercises } from '@/app/api/data-layer/exercise'
import PageLayout from '@/app/components/ui/PageLayout'

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
  const params = await searchParams
  const sortBy = params?.sortBy as ExerciseSortField
  const order = params?.order as SortDirection
  const currentPage = Number(params?.page) || 1
  const itemsPerPage = 10

  const exercises = await getExercises()

  return (
    <PageLayout>
      <ExerciseTable
        exercises={exercises}
        sortBy={sortBy}
        order={order}
        page={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </PageLayout>
  )
}
