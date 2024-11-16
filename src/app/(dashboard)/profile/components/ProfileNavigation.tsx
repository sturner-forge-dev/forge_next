'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  UserIcon,
  BookOpenIcon,
  PencilSquareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

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

export function ProfileNavigation() {
  const pathname = usePathname()

  return (
    <div className="w-[90%] mx-auto pt-4">
      <div>
        <nav
          aria-label="Tabs"
          className="-mb-px flex space-x-8 border-b border-gray-500 w-fit"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={`/profile/${tab.value}`}
              className={classNames(
                tab.value === pathname.split('/').pop()
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium cursor-pointer'
              )}
            >
              <tab.icon
                aria-hidden="true"
                className={classNames(
                  tab.value === pathname.split('/').pop()
                    ? 'text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-0.5 mr-2 h-5 w-5'
                )}
              />
              <span>{tab.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function ProfileNavigationMobile() {
  const pathname = usePathname()
  const [currentTab, setCurrentTab] = useState(pathname.split('/').pop())

  const handleTabClick = (tabValue: string) => {
    setCurrentTab(tabValue)
  }

  return (
    <div>
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
  )
}
