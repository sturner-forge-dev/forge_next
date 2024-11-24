import { getUser } from '@/app/api/data-layer/user'
import { redirect } from 'next/navigation'
import {
  ProfileNavigation,
  ProfileNavigationMobile
} from './components/ProfileNavigation'
import React from 'react'

export default async function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="h-full w-full">
      <div className="sm:hidden">
        <ProfileNavigationMobile />
      </div>
      <div className="hidden sm:block">
        <ProfileNavigation />
      </div>

      <div className="mt-8">{children}</div>
    </div>
  )
}
