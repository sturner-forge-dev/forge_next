'use client'

import { ExerciseSortField, SortDirection } from '@/app/types'
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'
import { User, CustomExercise } from '@prisma/client'
import { getCustomExercises } from '@/app/api/data-layer/customExercise'

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
  createCustomExerciseAction: (
    exercise: Omit<CustomExercise, 'id' | 'createdAt'>,
    user: User
  ) => Promise<CustomExercise>
  addCustomExercise: (exercise: CustomExercise) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({
  children,
  user,
  customExercises: initialExercises,
  sortBy: initialSortBy,
  order: initialOrder,
  currentPage: initialPage,
  totalPages,
  createCustomExerciseAction
}: {
  children: React.ReactNode
  user: User
  customExercises: CustomExercise[]
  sortBy: ExerciseSortField
  order: SortDirection
  currentPage: number
  totalPages: number
  createCustomExerciseAction: (
    exercise: Omit<CustomExercise, 'id' | 'createdAt'>,
    user: User
  ) => Promise<CustomExercise>
}) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [order, setOrder] = useState(initialOrder)
  const [customExercises, setCustomExercises] = useState(initialExercises)

  const itemsPerPage = 10

  const updatePagination = useCallback(
    async (
      page: number,
      newSortBy: ExerciseSortField,
      newOrder: SortDirection
    ) => {
      try {
        const { exercises } = await getCustomExercises(user.id)

        if (exercises.length > 0) {
          setCurrentPage(page)
          setSortBy(newSortBy)
          setOrder(newOrder)
          setCustomExercises(exercises)
        }
      } catch (error) {
        console.error('Error fetching exercises:', error)
        throw error
      }
    },
    [user.id]
  )

  const paginatedExercises = useMemo(() => {
    return customExercises
  }, [customExercises])

  const addCustomExercise = useCallback((exercise: CustomExercise) => {
    setCustomExercises((prev) => [...prev, exercise])
  }, [])

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
        updatePagination,
        createCustomExerciseAction,
        addCustomExercise
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
