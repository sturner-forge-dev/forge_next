import clsx from 'clsx'

export default function DifficultyBadge({
  difficulty
}: {
  difficulty: string | null
}) {
  const colors = {
    Beginner:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Intermediate:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        colors[difficulty as keyof typeof colors] ||
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      )}
    >
      {difficulty}
    </span>
  )
}
