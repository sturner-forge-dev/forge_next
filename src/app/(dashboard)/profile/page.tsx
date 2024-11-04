import { getUser } from '@/app/api/data-layer/user'
import { redirect } from 'next/navigation'
import { UserProfile } from './components/UserProfile'

export default async function Profile() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-6 w-[90%] mx-auto">
      <h1 className="text-xl">Profile</h1>
      <UserProfile user={user} />
    </div>
  )
}
