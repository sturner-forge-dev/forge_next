import { prisma } from '@/app/utils/db'
import Link from 'next/link'
import { type ExerciseSortField, type SortDirection } from '@/app/types'

type Props = {
  searchParams: {
    sortBy?: ExerciseSortField
    order?: SortDirection
  }
}

const Exercises = async ({ searchParams }: Props) => {
  const sortBy = searchParams.sortBy || 'name'
  const order = searchParams.order || 'asc'

  const exercises = await prisma.exercises.findMany({
    orderBy: {
      [sortBy]: order
    }
  })

  const SortIcon = ({ currentField }: { currentField: string }) => {
    if (currentField !== sortBy) return null
    return <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
  }

  const getSortLink = (field: string) => {
    const newOrder = field === sortBy && order === 'asc' ? 'desc' : 'asc'
    return `?sortBy=${field}&order=${newOrder}`
  }

  return (
    <div className="p-6">
      <table className="w-full">
        <thead>
          <tr className="flex justify-between px-4 py-2 border-b border-white/50 mb-6">
            <th className="flex-1 text-center">
              <Link
                href={getSortLink('name')}
                className="hover:text-gray-200/90 px-2 py-1 rounded"
              >
                Name <SortIcon currentField="name" />
              </Link>
            </th>
            <th className="flex-1 text-center">
              <Link
                href={getSortLink('type')}
                className="hover:text-gray-200/90 px-2 py-1 rounded"
              >
                Type <SortIcon currentField="type" />
              </Link>
            </th>
            <th className="flex-1 text-center">
              <Link
                href={getSortLink('equipment')}
                className="hover:text-gray-200/90 px-2 py-1 rounded"
              >
                Equipment <SortIcon currentField="equipment" />
              </Link>
            </th>
            <th className="flex-1 text-center">
              <Link
                href={getSortLink('difficulty')}
                className="hover:text-gray-200/90 px-2 py-1 rounded"
              >
                Difficulty <SortIcon currentField="difficulty" />
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr
              key={exercise.id}
              className="flex justify-between px-4 py-2 even:bg-gray-500/50 even:hover:bg-gray-500/100 odd:bg-black odd:hover:bg-blue-400/50"
            >
              <td className="flex-1 text-center">{exercise.name}</td>
              <td className="flex-1 text-center">{exercise.type}</td>
              <td className="flex-1 text-center">{exercise.equipment}</td>
              <td className="flex-1 text-center">{exercise.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Exercises
