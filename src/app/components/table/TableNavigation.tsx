import Link from 'next/link'
import { Button } from '@/app/components/catalyst/button'
import Dropdown from '@/app/components/ui/Dropdown'

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
  const pageOptions = Array.from({ length: totalPages }, (_, i) => ({
    id: i + 1,
    label: `Page ${i + 1}`
  }))

  const handlePageChange = (value: string) => {
    const pageNumber = parseInt(value.replace('Page ', ''))
    window.location.href = getPageLink(pageNumber)
  }

  return (
    <div className="mt-6 flex items-center justify-between w-[50%] mx-auto">
      {page <= 1 ? (
        <Button color="dark/zinc" disabled>
          Previous
        </Button>
      ) : (
        <Link href={getPageLink(page - 1)}>
          <Button color="indigo">Previous</Button>
        </Link>
      )}

      <div className="flex items-center min-w-40">
        <Dropdown
          options={pageOptions}
          onChange={handlePageChange}
          value={`Page ${page} of ${totalPages}`}
        />
      </div>

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
  )
}
