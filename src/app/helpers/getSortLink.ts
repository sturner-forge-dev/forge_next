import { SortDirection, SortField } from '../types'

export const getSortLink = (
  field: string,
  page: number,
  sortBy: SortField,
  order: SortDirection,
  url: string
) => {
  if (field !== sortBy) {
    return `?sortBy=${field}&order=asc&page=${page}`
  }

  switch (order) {
    case 'asc':
      return `?sortBy=${field}&order=desc&page=${page}`
    case 'desc':
      return `${url}?page=${page}`
    default:
      return `?sortBy=${field}&order=asc&page=${page}`
  }
}
