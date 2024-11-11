'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components' // Changed this line

const links = [
  { href: '/home', label: 'home' },
  { href: '/exercises', label: 'exercises' },
  { href: '/profile/user', label: 'profile' },
  { href: '/settings', label: 'settings' },
  { href: '/about', label: 'about' }
]

const Navigation = ({ user }: { user: boolean }) => {
  const pathname = usePathname()

  return (
    <aside className="fixed w-[200px] top-0 left-0 h-screen border-r border-white/50 p-4">
      <div className="text-xl">Forge Fitness</div>
      <ul>
        {links.map((link) => (
          <li key={link.href} className="px-2 py-6">
            <Link
              href={link.href}
              className={
                pathname === link.href
                  ? 'px-5 py-3 min-w-40 text-center rounded text-md bg-indigo-600 text-white hover:bg-indigo-500 font-semibold'
                  : 'hover:bg-gray-500 px-5 py-3 min-w-40 font-semibold rounded text-center'
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
        {user ? (
          <li className="px-2 py-6">
            <LogoutLink className="hover:bg-gray-500 px-5 py-3 min-w-40 font-semibold rounded text-center">
              logout
            </LogoutLink>
          </li>
        ) : null}
      </ul>
    </aside>
  )
}

export default Navigation
