import { TableBody, TableCell, TableRow } from '@/app/components/catalyst/table'
import { Button } from '@/app/components/catalyst/button'
import { CustomExercise } from '@prisma/client'

interface CustomExerciseTableBodyProps {
  paginatedExercises: CustomExercise[]
  isLoading: boolean
}

export default function CustomExerciseTableBody({
  paginatedExercises,
  isLoading
}: CustomExerciseTableBodyProps) {
  return (
    <TableBody>
      {paginatedExercises.map((exercise: CustomExercise) => (
        <TableRow
          key={exercise.id}
          href={'#'}
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
            <div className="truncate pr-4">{exercise.difficulty}</div>
          </TableCell>
          <TableCell className="w-[12.5%]">
            <div className="truncate pr-4">
              {new Date(exercise.createdAt).toLocaleDateString()}
            </div>
          </TableCell>
          <TableCell className="w-[5%]">
            <div className="text-right">
              <Button outline disabled={isLoading}>
                Edit
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
