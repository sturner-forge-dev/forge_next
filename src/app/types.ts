export type ExerciseSortField = 'name' | 'type' | 'equipment' | 'difficulty'

export type SortDirection = 'asc' | 'desc'

export type User = {
  id: string
  kindeId: string
  email: string
  phone: string | null
  firstName: string | null
  lastName: string | null
  role: string
}

export type Exercise = {
  id: string
  name: string
  type: string | null
  equipment: string | null
  difficulty: string | null
  description?: string | null
}
