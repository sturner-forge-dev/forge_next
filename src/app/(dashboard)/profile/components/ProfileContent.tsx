'use client'

import { useState } from 'react'
import { UserProfile } from './UserProfile'
import { User } from '@/app/types'
import {
  ChartBarIcon,
  BookOpenIcon,
  UserIcon,
  PencilSquareIcon
} from '@heroicons/react/20/solid'

const tabs = [
  { name: 'My Profile', value: 'profile', icon: UserIcon, current: true },
  {
    name: 'Routines',
    value: 'routines',
    icon: BookOpenIcon,
    current: false
  },
  {
    name: 'Custom Exercises',
    value: 'customExercises',
    icon: PencilSquareIcon,
    current: false
  },
  { name: 'History', value: 'history', icon: ChartBarIcon, current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function ProfileContent({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="justify-center w-[90%] mx-auto mt-12">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only text-white">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          defaultValue={tabs.find((tab) => tab.current)?.name ?? tabs[0].name}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
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
                onClick={() => setActiveTab(tab.value)}
                className={classNames(
                  tab.value === activeTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium cursor-pointer'
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    tab.value === activeTab
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
      <div className="mt-12">
        {activeTab === 'profile' && <UserProfile user={user} />}
        {activeTab === 'routines' && <div>Routines</div>}
        {activeTab === 'customExercises' && <div>Custom Exercises</div>}
        {activeTab === 'history' && <div>History</div>}
      </div>
    </div>
  )
}
