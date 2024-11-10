import Image from 'next/image'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const { getUser } = getKindeServerSession()
const user = await getUser()
import Navigation from './components/Navigations'
import { Suspense } from 'react'
import Loading from './loading'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative bg-black/90 text-white overflow-auto">
      <Navigation user={user ? true : false} />
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-white/50">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <Image
              src={'/favicon.ico'}
              alt="logo"
              width={60}
              height={60}
              className="mt-16 outline outline-1 outline-white/50 rounded-full cursor-pointer"
            />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
