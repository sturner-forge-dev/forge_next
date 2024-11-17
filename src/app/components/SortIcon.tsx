import { ArrowUpIcon } from '@heroicons/react/24/outline'
import { SortField, SortDirection } from '../types'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

export default function SortIcon({
  currentField,
  sortBy,
  order
}: {
  currentField: string
  sortBy: SortField
  order: SortDirection
}) {
  const isUnsorted = !sortBy

  return (
    <span className="relative inline-block w-4 ml-1">
      <span className="absolute inset-0 flex items-center justify-center">
        {isUnsorted || currentField !== sortBy ? (
          <ArrowUpIcon className="invisible size-3.5 font-bold" />
        ) : order === 'asc' ? (
          <ArrowUpIcon className="text-black size-3.5 font-bold" />
        ) : (
          <ArrowDownIcon className="text-black size-3.5 font-bold" />
        )}
      </span>
    </span>
  )
}
