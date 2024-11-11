'use client'

import { useRouter, usePathname } from 'next/navigation'
import { UserProfile } from './UserProfile'
import { User } from '@/app/types'
import {
  ChartBarIcon,
  BookOpenIcon,
  UserIcon,
  PencilSquareIcon
} from '@heroicons/react/20/solid'

const tabs = [
  { name: 'My Profile', value: 'user', icon: UserIcon },
  { name: 'Routines', value: 'routines', icon: BookOpenIcon },
  {
    name: 'Custom Exercises',
    value: 'custom-exercises',
    icon: PencilSquareIcon
  },
  { name: 'History', value: 'history', icon: ChartBarIcon }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface ProfileContentProps {
  user: User
}

export function ProfileContent({ user }: ProfileContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentTab = pathname.split('/').pop() || ''

  const handleTabClick = (tabValue: string) => {
    router.push(`/profile${tabValue ? `/${tabValue}` : ''}`)
  }

  return (
    <div className="justify-center w-[90%] mx-auto mt-12">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only text-white">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => handleTabClick(e.target.value)}
          value={currentTab}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.value}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div>
          <nav
            aria-label="Tabs"
            className="-mb-px flex space-x-8 border-b border-gray-500 w-fit"
          >
            {tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => handleTabClick(tab.value)}
                className={classNames(
                  tab.value === currentTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium cursor-pointer'
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    tab.value === currentTab
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-8">
        {currentTab === 'user' && <UserProfile user={user} />}
        {currentTab === 'routines' && <div>Routines Content</div>}
        {currentTab === 'custom-exercises' && (
          <div>Custom Exercises Content</div>
        )}
        {currentTab === 'history' && <div>History Content</div>}
        {!currentTab && <UserProfile user={user} />}{' '}
        {/* Default to user profile */}
      </div>
    </div>
  )
}
