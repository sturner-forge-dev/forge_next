import UserProfileForm from './components/UserProfile'
import { getUser } from '@/app/api/data-layer/user'
import { redirect } from 'next/navigation'

export default async function UserProfile() {
  const user = await getUser()

  if (!user) redirect('/login')

  return <UserProfileForm user={user} />
}
