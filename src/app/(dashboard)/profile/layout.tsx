import { getUser } from '@/app/api/data-layer/user'
import { redirect } from 'next/navigation'
import {
  ProfileNavigation,
  ProfileNavigationMobile
} from './components/ProfileNavigation'
import React from 'react'
import { UserProvider } from './user/UserContext'

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
    <UserProvider user={user}>
      <div className="justify-center w-[90%] mx-auto mt-12">
        <div className="sm:hidden">
          <ProfileNavigationMobile />
        </div>
        <div className="hidden sm:block">
          <ProfileNavigation />
        </div>

        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </UserProvider>
  )
}
