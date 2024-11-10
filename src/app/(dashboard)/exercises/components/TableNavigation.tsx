import Link from 'next/link'

interface TableNavigationProps {
  page: number
  totalPages: number
  getPageLink: (newPage: number) => string
  classNames: (...classes: string[]) => string
}

export default function TableNavigation({
  page,
  totalPages,
  getPageLink,
  classNames
}: TableNavigationProps) {
  return (
    <div className="mt-6 flex items-center justify-between w-[85%] mx-auto">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-300">
          Page {page} of {totalPages}
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          href={getPageLink(page - 1)}
          className={classNames(
            'px-3 py-1 rounded text-sm',
            page <= 1
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          )}
          aria-disabled={page <= 1}
          {...(page <= 1 && { tabIndex: -1 })}
        >
          Previous
        </Link>
        <Link
          href={getPageLink(page + 1)}
          className={classNames(
            'px-3 py-1 rounded text-sm',
            page >= totalPages
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          )}
          aria-disabled={page >= totalPages}
          {...(page >= totalPages && { tabIndex: -1 })}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
