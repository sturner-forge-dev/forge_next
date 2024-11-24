import { Suspense } from 'react'
import CustomExerciseTable from './components/CustomExerciseTable'
import { type ExerciseSortField, type SortDirection } from '@/app/types'
import Loading from './loading'
import { getCustomExercises } from '@/app/api/data-layer/customExercise'
import { getUser } from '@/app/api/data-layer/user'
import PageLayout from '@/app/components/ui/PageLayout'
import {
  createCustomExerciseAction,
  editCustomExerciseAction
} from '@/app/api/data-layer/customExercise'
import { CustomExercise } from '@prisma/client'

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
  const sortBy = 'createdAt' as ExerciseSortField
  const order = 'desc' as SortDirection
  const currentPage = Number(params?.page) || 1
  const itemsPerPage = 10

  const { exercises } = await getCustomExercises(user.id)

  return (
    <PageLayout>
      <CustomExerciseTable
        exercises={exercises}
        sortBy={sortBy}
        order={order}
        page={currentPage}
        itemsPerPage={itemsPerPage}
        user={user}
        createExerciseAction={async (exercise, user) => {
          'use server'
          await createCustomExerciseAction(exercise, user)
        }}
        editExerciseAction={async (exercise) => {
          'use server'
          return editCustomExerciseAction(exercise as CustomExercise)
        }}
      />
    </PageLayout>
  )
}
