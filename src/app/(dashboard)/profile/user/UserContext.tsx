'use client'

import { ExerciseSortField, SortDirection, CustomExercise } from '@/app/types'
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'
import { User } from '@prisma/client'
interface UserContextType {
  user: User
  customExercises: CustomExercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  currentPage: number
  totalPages: number
  paginatedExercises: CustomExercise[]
  updatePagination: (
    page: number,
    newSortBy: ExerciseSortField,
    newOrder: SortDirection
  ) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({
  children,
  user,
  customExercises: initialExercises,
  sortBy: initialSortBy,
  order: initialOrder,
  currentPage: initialPage,
  totalPages
}: {
  children: React.ReactNode
  user: User
  customExercises: CustomExercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  currentPage: number
  totalPages: number
}) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [order, setOrder] = useState(initialOrder)
  const [customExercises] = useState(initialExercises)

  const itemsPerPage = 10

  const updatePagination = useCallback(
    (page: number, newSortBy: ExerciseSortField, newOrder: SortDirection) => {
      setCurrentPage(page)
      setSortBy(newSortBy)
      setOrder(newOrder)
    },
    []
  )

  const paginatedExercises = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    const sortedExercises = [...customExercises].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (order === 'asc') {
        return aValue && bValue ? (aValue > bValue ? 1 : -1) : 0
      }
      return aValue && bValue ? (aValue < bValue ? 1 : -1) : 0
    })

    return sortedExercises.slice(start, end)
  }, [customExercises, currentPage, sortBy, order])

  return (
    <UserContext.Provider
      value={{
        user,
        customExercises,
        sortBy,
        order,
        currentPage,
        totalPages,
        paginatedExercises,
        updatePagination
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
