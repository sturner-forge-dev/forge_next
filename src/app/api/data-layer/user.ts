import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { prisma } from '@/app/utils/db'
import { User } from '@/app/types'

export const getUser = async () => {
  const { getUser } = getKindeServerSession()
  const authUser = await getUser()

  if (!authUser) return null

  const user = await prisma.user.findUnique({
    where: { kindeId: authUser.id }
  })

  return user
}

export const updateUser = async (user: User) => {
  const { getUser } = getKindeServerSession()
  const authUser = await getUser()

  if (!authUser) return null

  const updatedUser = await prisma.user.update({
    where: { kindeId: authUser.id },
    data: user
  })

  return updatedUser
}
