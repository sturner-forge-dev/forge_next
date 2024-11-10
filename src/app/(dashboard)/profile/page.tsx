import { getUser } from '@/app/api/data-layer/user'
import { redirect } from 'next/navigation'
import { ProfileContent } from './components/ProfileContent'

export default async function Profile() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <ProfileContent user={user} />
}
