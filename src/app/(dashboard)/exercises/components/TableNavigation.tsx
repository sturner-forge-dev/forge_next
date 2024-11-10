import Link from 'next/link'

interface TableNavigationProps {
  page: number
  totalPages: number
  getPageLink: (newPage: number) => string
}

export default function TableNavigation({
  page,
  totalPages,
  getPageLink
}: TableNavigationProps) {
  return (
    <div className="mt-6 flex items-center justify-between w-[85%] mx-auto">
      <div className="flex items-center gap-2">
        <p className="text-md font-semibold text-gray-300">
          Page {page} of {totalPages}
        </p>
      </div>
      <div className="flex gap-2">
        {page <= 1 ? (
          <button
            disabled
            className="px-5 py-3 min-w-40 text-center rounded text-md bg-gray-700 text-gray-400 cursor-not-allowed font-semibold"
          >
            Previous
          </button>
        ) : (
          <Link
            href={getPageLink(page - 1)}
            className="px-5 py-3 min-w-40 text-center rounded text-md bg-indigo-600 text-white hover:bg-indigo-500 font-semibold"
          >
            Previous
          </Link>
        )}

        {page >= totalPages ? (
          <button
            disabled
            className="px-5 py-3 min-w-40 text-center rounded text-md bg-gray-700 text-gray-400 cursor-not-allowed font-semibold"
          >
            Next
          </button>
        ) : (
          <Link
            href={getPageLink(page + 1)}
            className="px-5 py-3 min-w-40 text-center rounded text-md bg-indigo-600 text-white hover:bg-indigo-500 font-semibold"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
