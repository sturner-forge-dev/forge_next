import { TableBody, TableCell, TableRow } from '@/app/components/catalyst/table'
import { Button } from '@/app/components/catalyst/button'
import { Exercise, CustomExercise } from '@prisma/client'
import DifficultyBadge from '@/app/components/info/DifficultyBadge'

interface ExerciseTableBodyProps {
  paginatedExercises: (Exercise | CustomExercise)[]
  isLoading: boolean
  onClick: (exercise: Exercise | CustomExercise) => void
}

export default function ExerciseTableBody({
  paginatedExercises,
  isLoading,
  onClick
}: ExerciseTableBodyProps) {
  return (
    <TableBody>
      {paginatedExercises.map((exercise: Exercise | CustomExercise) => (
        <TableRow
          key={exercise.id}
          className={`transition-opacity duration-200 ${
            isLoading ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <TableCell className="w-[30%] relative">
            <div className="absolute inset-0 flex items-center pr-8">
              <div className="truncate">{exercise.name}</div>
            </div>
          </TableCell>
          <TableCell className="w-[17.5%]">
            <div className="truncate pr-4">{exercise.type}</div>
          </TableCell>
          <TableCell className="w-[17.5%]">
            <div className="truncate pr-4">{exercise.equipment}</div>
          </TableCell>
          <TableCell className="w-[17.5%]">
            <div className="truncate pr-4">
              <DifficultyBadge difficulty={exercise.difficulty} />
            </div>
          </TableCell>
          {'createdAt' in exercise && (
            <TableCell className="w-[12.5%]">
              <div className="truncate pr-4">
                {new Date(exercise.createdAt).toLocaleDateString()}
              </div>
            </TableCell>
          )}
          <TableCell className="w-[5%]">
            <div className="text-right">
              <Button
                outline
                disabled={isLoading}
                onClick={(e: {
                  preventDefault: () => void
                  stopPropagation: () => void
                }) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClick(exercise)
                }}
              >
                {'createdAt' in exercise ? 'Edit' : 'View'}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
