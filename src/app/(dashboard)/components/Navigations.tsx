'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components' // Changed this line

const links = [
  { href: '/home', label: 'home' },
  { href: '/exercises', label: 'exercises' },
  { href: '/profile', label: 'profile' },
  { href: '/settings', label: 'settings' },
  { href: '/about', label: 'about' }
]

const Navigation = ({ user }: { user: boolean }) => {
  const pathname = usePathname()

  return (
    <ul>
      {links.map((link) => (
        <li key={link.href} className="px-2 py-6 text-xl">
          <Link
            href={link.href}
            className={
              pathname === link.href
                ? 'bg-blue-500 font-bold p-4 rounded-lg hover:bg-blue-600 border border-white/50'
                : 'hover:bg-gray-500 p-4 rounded-lg'
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
      {user ? (
        <li className="px-2 py-6 text-xl">
          <LogoutLink className="hover:bg-gray-500 p-4 rounded-lg">
            Logout
          </LogoutLink>
        </li>
      ) : null}
    </ul>
  )
}

export default Navigation
