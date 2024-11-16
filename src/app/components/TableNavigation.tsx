import Link from 'next/link'
import { Button } from '@/app/components/catalyst/button'

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
          <Button color="dark/zinc" disabled>
            Previous
          </Button>
        ) : (
          <Link href={getPageLink(page - 1)}>
            <Button color="indigo">Previous</Button>
          </Link>
        )}

        {page >= totalPages ? (
          <Button color="dark/zinc" disabled>
            Next
          </Button>
        ) : (
          <Link href={getPageLink(page + 1)}>
            <Button color="indigo">Next</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
