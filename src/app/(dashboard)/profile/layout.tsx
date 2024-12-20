import { getUser } from '@/app/api/data-layer/user'
import { getCustomExercises } from '@/app/api/data-layer/customExercise'
import { redirect } from 'next/navigation'
import {
  ProfileNavigation,
  ProfileNavigationMobile
} from './components/ProfileNavigation'
import React from 'react'
import { UserProvider } from './user/UserContext'
import { SortDirection } from '@/app/types'
import { ExerciseSortField } from '@/app/types'
import { createCustomExerciseAction } from '@/app/api/data-layer/customExercise'

export default async function ProfileLayout({
  children,
  searchParams
}: {
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const sortBy = (searchParams?.sortBy as ExerciseSortField) || ''
  const order = (searchParams?.order as SortDirection) || ''
  const currentPage = Number(searchParams?.page) || 1
  const itemsPerPage = 10

  const { exercises: customExercises, totalCount } = await getCustomExercises(
    currentPage,
    itemsPerPage,
    sortBy,
    order,
    user.id
  )

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <UserProvider
      user={user}
      customExercises={customExercises}
      sortBy={sortBy}
      order={order}
      currentPage={currentPage}
      totalPages={totalPages}
      createCustomExerciseAction={createCustomExerciseAction}
    >
      <div className="h-full w-full">
        <div className="sm:hidden">
          <ProfileNavigationMobile />
        </div>
        <div className="hidden sm:block">
          <ProfileNavigation />
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </UserProvider>
  )
}
