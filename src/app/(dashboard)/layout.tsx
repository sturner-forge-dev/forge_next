import Link from 'next/link'
import Image from 'next/image'
import {
  getKindeServerSession,
  LogoutLink
} from '@kinde-oss/kinde-auth-nextjs/server'

const { getUser } = getKindeServerSession()
const user = await getUser()

const links = [
  { href: '/dashboard', label: 'Home' },
  { href: '/exercises', label: 'All Exercises' },
  { href: '/profile', label: 'Profile' },
  { href: '/settings', label: 'Settings' },
  { href: '/about', label: 'About' }
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen relative bg-black text-white">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-white/50 p-4">
        <div className="text-xl">Forge Fitness</div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-6 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          {user ? (
            <li className="px-2 py-6 text-xl">
              <LogoutLink>Logout</LogoutLink>
            </li>
          ) : null}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-white/50">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <Image
              src={'/favicon.ico'}
              alt="logo"
              width={60}
              height={60}
              className="pt-16"
            />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
