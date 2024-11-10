import Image from 'next/image'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const { getUser } = getKindeServerSession()
const user = await getUser()
import Navigation from './components/Navigations'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative bg-black/90 text-white overflow-auto">
      <aside className="fixed w-[200px] top-0 left-0 h-screen border-r border-white/50 p-4">
        <div className="text-xl">Forge Fitness</div>
        <Navigation user={user ? true : false} />
      </aside>
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
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
