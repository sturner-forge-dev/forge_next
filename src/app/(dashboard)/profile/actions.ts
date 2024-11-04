'use server'

import { updateUser as updateUserDb } from '@/app/api/data-layer/user'
import { User } from '@/app/types'
// import { redirect } from 'next/navigation'

export async function updateUserAction(user: User) {
  const updatedUser = await updateUserDb(user)

  return updatedUser
}
